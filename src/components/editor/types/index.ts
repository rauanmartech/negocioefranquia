export type BlockType = 'paragraph' | 'heading' | 'quote' | 'image' | 'divider';

// Base structure for all blocks
export interface Block<T = any> {
  id: string;
  type: BlockType | string;
  data: T;
}

// Data structures for specific blocks
export interface ParagraphData {
  text: string;
}

export interface HeadingData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface QuoteData {
  text: string;
  author?: string;
}

export interface ImageData {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface DividerData {
  style?: 'solid' | 'dashed' | 'dotted';
}

// Props passed to every block component in the editor
export interface BlockComponentProps<T = any> {
  block: Block<T>;
  onChange: (id: string, newData: T) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFocused: boolean;
  onFocus: (id: string) => void;
  // Opcional: para permitir criar novo bloco ao dar Enter no final
  onInsertBelow?: (id: string) => void;
}

export interface PostFormData {
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  blocks: Block[];
  categoryId: string;
  authorId: string;
  featuredImageId: string;
  tags: string[];
  status: 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  hero: boolean;
  breaking: boolean;
  allowComments: boolean;
  scheduledAt?: Date | null;
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  seoKeywords: string;
}
