import { Block } from '../types';

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <article className="prose prose-lg max-w-none text-gray-800">
      {blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} className="whitespace-pre-wrap">
                {block.data.text}
              </p>
            );
          
          case 'heading': {
            const Tag = `h${block.data.level || 2}` as keyof JSX.IntrinsicElements;
            return (
              <Tag key={block.id} className="font-bold text-gray-900 mt-8 mb-4">
                {block.data.text}
              </Tag>
            );
          }
          
          case 'quote':
            return (
              <blockquote key={block.id} className="border-l-4 border-gray-900 pl-4 py-1 my-6 bg-gray-50/50 italic">
                <p className="text-xl text-gray-800">{block.data.text}</p>
                {block.data.author && (
                  <footer className="text-sm font-semibold text-gray-500 mt-2">
                    — {block.data.author}
                  </footer>
                )}
              </blockquote>
            );
          
          case 'image':
            return (
              <figure key={block.id} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={block.data.url} 
                  alt={block.data.alt || 'Imagem'} 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );
          
          case 'divider': {
            const style = block.data.style || 'solid';
            return (
              <hr 
                key={block.id} 
                className={`my-8 border-t-2 ${
                  style === 'dashed' ? 'border-dashed' : style === 'dotted' ? 'border-dotted' : 'border-solid'
                } border-gray-200`} 
              />
            );
          }

          default:
            console.warn(`Block type not supported by renderer: ${block.type}`);
            return null;
        }
      })}
    </article>
  );
}
