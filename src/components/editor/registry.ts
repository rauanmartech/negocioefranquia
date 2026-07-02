import { ComponentType } from 'react';
import { BlockComponentProps, BlockType } from './types';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { HeadingBlock } from './blocks/HeadingBlock';
import { QuoteBlock } from './blocks/QuoteBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { DividerBlock } from './blocks/DividerBlock';

// Define the configuration for each block type
export interface BlockConfig {
  component: ComponentType<BlockComponentProps>;
  label: string;
  icon: string; // Emoji ou classe do lucide-react (simplificado por agora)
  defaultData: any;
}

export const blockRegistry: Record<string, BlockConfig> = {
  paragraph: {
    component: ParagraphBlock,
    label: 'Texto',
    icon: '📝',
    defaultData: { text: '' },
  },
  heading: {
    component: HeadingBlock,
    label: 'Título',
    icon: 'H',
    defaultData: { text: '', level: 2 },
  },
  quote: {
    component: QuoteBlock,
    label: 'Citação',
    icon: '❞',
    defaultData: { text: '', author: '' },
  },
  image: {
    component: ImageBlock,
    label: 'Imagem',
    icon: '🖼️',
    defaultData: { url: '', alt: '', caption: '' },
  },
  divider: {
    component: DividerBlock,
    label: 'Divisor',
    icon: '➖',
    defaultData: { style: 'solid' },
  },
};
