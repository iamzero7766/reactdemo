import React, {useState} from 'react';
import {closestCenter, DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface DragGroupProps {
  items: PriceInfo[]
  onSort: (newItems: PriceInfo[]) => void;
}

interface SortableItemProps { 
  content: PriceInfo
  id: string
}

interface CustomListItemProp {
  item: PriceInfo
  defaultExpanded: boolean
  handleChange: (value: PriceInfo) => void
  dragComponent:React.ReactNode
}





const SortableItem = ({content }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: content.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };



  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className='p-2 border-1 border-gray-300 rounded-md m-1'>
      <div {...attributes} {...listeners}>
        #
      </div>
      <div>{ content.name}</div>
    </div>
  );
}


const DragGroup = ({ items, onSort }: DragGroupProps) => {


  const findItem = (id: string) => 
    items.find(i => i.id === id) || items.flatMap(i => i.children || []).find(i => i.id === id);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeItem = findItem(active.id);
    const overItem = findItem(over.id);

    // 平级排序
    if (activeItem?.groupName === overItem?.groupName) {
      const ids = items.filter(i => !i.parentId).map(i => i.id);
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);
      onSort(arrayMove(items, oldIndex, newIndex));
      return;
    }

    // 拖入组内
    if (overItem?.type === 'GROUP') {
      const newItems = items.map(item => {
        if (item.id === active.id) {
          return { ...item, parentId: over.id };
        }
        if (item.id === over.id) {
          return {
            ...item,
            children: [...(item.children || []), active.id]
          };
        }
        return item;
      });
      onSort(newItems);
    }
  };



  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(item => { 
          if (item.type === 'GROUP') {
            return (
              <div key={item.id} className='bg-grey-100 m-1 p-2 border-1 border-gray-300 rounded-md'>
                <input type="text" defaultValue={item.name} className='border-1 p-1' />
                <SortableContext id={item.id} items={item.children} strategy={verticalListSortingStrategy}>
                  {item.children?.map(child => (
                    <SortableItem key={child.id} id={child.id} content={ child } />
                  ))}
                </SortableContext>
              </div>
            )
          } else {
            return (
              <SortableItem key={item.id} id={item.id} content={ item} />
            )
          }
        })}
      </SortableContext>
    </DndContext>
  );
}


export default DragGroup