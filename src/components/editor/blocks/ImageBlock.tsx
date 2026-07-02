'use client';

import { BlockComponentProps, ImageData } from '../types';

export function ImageBlock({
  block,
  onChange,
  onRemove,
  isFocused,
  onFocus,
}: BlockComponentProps<ImageData>) {
  return (
    <div
      className={`group relative py-4 my-4 -mx-4 px-4 rounded-lg transition-colors ${
        isFocused ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onFocus(block.id)}
    >
      {(isFocused || true) && (
        <div className="absolute left-[-2rem] top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <button
            onClick={() => onRemove(block.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
          >
            x
          </button>
        </div>
      )}

      {block.data.url ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.data.url}
            alt={block.data.alt || 'Imagem'}
            className="w-full h-auto max-h-[600px] object-cover"
          />
          <input
            type="text"
            value={block.data.caption || ''}
            onChange={(e) => onChange(block.id, { ...block.data, caption: e.target.value })}
            placeholder="Escreva uma legenda..."
            className="w-full outline-none bg-gray-50/80 p-2 text-center text-sm text-gray-600 border-t border-gray-200"
          />
        </div>
      ) : (
        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-500">
          <span className="text-sm font-medium mb-2">Upload será implementado depois</span>
          <input
            type="url"
            placeholder="Ou cole a URL da imagem aqui"
            className="px-3 py-1 text-sm border rounded outline-none w-64 text-center"
            value={block.data.url || ''}
            onChange={(e) => onChange(block.id, { ...block.data, url: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
