import { useSortable, verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DraggableItem } from './types';

const SortableItem: React.FC<{
  item: DraggableItem;
  listStyle: React.CSSProperties;
  groupStyle: React.CSSProperties;
  handleComponent: React.ReactElement;
  items: DraggableItem[];
}> = ({ item, listStyle, groupStyle, handleComponent, items }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(item.type === 'LIST' ? listStyle : groupStyle),
    margin: '8px 0'
  };

  // 递归查找子项（网页7嵌套优化）
  const getChildren = (parentId: string) => 
    items.filter(i => i.parentId === parentId);

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners}>
        {handleComponent}
      </div>
      
      {item.type === 'GROUP' && (
        <SortableContext 
          items={item.children || []}
          strategy={verticalListSortingStrategy}
        >
          {getChildren(item.id).map(child => (
            <SortableItem
              key={child.id}
              item={child}
              listStyle={listStyle}
              groupStyle={groupStyle}
              handleComponent={handleComponent}
              items={items}
            />
          ))}
        </SortableContext>
      )}
    </div>
  );
};

export default SortableItem;