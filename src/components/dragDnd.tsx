// DragAndDrop.tsx
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
  type Over
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 类型定义
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

type SortableItemProps = {
  id: UniqueIdentifier;
  children: React.ReactElement;
};

type DragHandleProps = {
  children: React.ReactElement;
  style?: CSSProperties;
  className?: string;
};

// 拖拽上下文
const DragContext = createContext<{
  attributes?: Record<string, any>;
  listeners?: Record<string, any>;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
}>({});

// 可排序项组件
const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const contextValue = useMemo(
    () => ({
      attributes,
      listeners,
      setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative'
  };

  return (
    <DragContext.Provider value={contextValue}>
      {cloneElement(children, {
        ref: setNodeRef,
        style: { ...children.props.style, ...style },
        'data-dragging': isDragging
      })}
    </DragContext.Provider>
  );
};

// 拖拽手柄组件
export const DragHandle = forwardRef<HTMLElement, DragHandleProps>(
  ({ children, style, className }, ref) => {
    const { attributes, listeners, setActivatorNodeRef } = useContext(DragContext);

    return cloneElement(children, {
      ...attributes,
      ...listeners,
      ref: (node: HTMLElement | null) => {
        setActivatorNodeRef?.(node);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      style: {
        ...style,
        cursor: 'grab',
        touchAction: 'none'
      },
      className: `drag-handle ${className || ''}`,
      role: 'button',
      tabIndex: 0
    });
  }
);

// 主组件
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
  const activeData = activeItem ? items.find(item => item.id === activeItem.id) : null;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = useCallback(({ active }: { active: Active }) => {
    setActiveItem(active);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        onSort(arrayMove(items, oldIndex, newIndex));
      }
      setActiveItem(null);
    },
    [items, onSort]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      accessibility={{
        draggable: {
          roleDescription: accessibility.containerLabel
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div role="application" aria-label="Sortable list container">
          {React.Children.map(children, (child, index) => (
            <SortableItem key={items[index].id} id={items[index].id}>
              {child}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeData && (
          <div
            style={{
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transformOrigin: '0 0'
            }}
          >
            {React.Children.toArray(children)[
              items.findIndex(item => item.id === activeItem?.id)
            ]}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}