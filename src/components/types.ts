export type ItemType = 'LIST' | 'GROUP';

export interface DraggableItem {
  id: string;
  type: ItemType;
  parentId?: string;
  children?: string[];
  data?: unknown; // 扩展字段
}