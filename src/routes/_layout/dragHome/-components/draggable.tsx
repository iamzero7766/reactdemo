import React, {
  createContext,
  useContext,
  cloneElement,
  useMemo,
  forwardRef,
  ReactNode,
  CSSProperties,
  useCallback,
  useState
} from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
  type Active,
  type Over,
  PointerSensor
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';




type DraggableItem = {
  id: UniqueIdentifier;
  [key: string]: any;
};
type DragAndDropListProps<T extends DraggableItem> = {
  items: T[];
  onSort: (sortedItems: T[]) => void;
  children: ReactNode;
  accessibility?: {
    dragHandleLabel?: string;
    containerLabel?: string;
  };
};


function SortableItem({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };
}

export function DragAndDropList<T extends DraggableItem>({
  items,
  onSort,
  children,
  accessibility = {
    dragHandleLabel: 'Drag handle',
    containerLabel: 'Sortable list'
  }
}: DragAndDropListProps<T>) { 

  const [activeItem, setActiveItem] = useState<Active | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  const handleDragStart = useCallback(({ active }: { active: Active }) => {
    setActiveItem(active);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      // if (over && active.id !== over.id) {
      //   const oldIndex = items.findIndex(item => item.id === active.id);
      //   const newIndex = items.findIndex(item => item.id === over.id);
      //   onSort(arrayMove(items, oldIndex, newIndex));
      // }
      // setActiveItem(null);
    },
    [items, onSort]
  );



  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  )
}
