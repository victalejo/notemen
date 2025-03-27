export interface Note {
    id: string;
    title: string;
    content: string;
    type: NoteType;
    icon?: string;
    coverImage?: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string | null;
    collectionId?: string | null;
    emoji?: string;
    isTemplate?: boolean;
  }
  
  export type NoteType = 'default' | 'page' | 'todo' | 'table' | 'gallery' | 'template';
  
  export interface Block {
    id: string;
    type: BlockType;
    content: any;
    noteId: string;
    position: number;
  }
  
  export type BlockType = 'text' | 'heading' | 'todo' | 'bulletList' | 'numberedList' | 'image' | 'code' | 'quote' | 'divider';
  
  export interface Category {
    id: string;
    name: string;
    icon?: string;
  }
  
  export interface Collection {
    id: string;
    name: string;
    icon?: string;
    emoji?: string;
  }
  
  export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
  }
  
  export interface Template {
    id: string;
    name: string;
    icon?: string;
    emoji?: string;
    description?: string;
    blocks: Block[];
  }