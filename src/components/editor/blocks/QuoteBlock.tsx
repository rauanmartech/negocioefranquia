'use client';

import { BlockComponentProps, QuoteData } from '../types';

export function QuoteBlock({
  block,
  onChange,
  onRemove,
  isFocused,
  onFocus,
}: BlockComponentProps<QuoteData>) {
  return (
    <div
      className={`group relative py-4 my-4 -mx-4 px-4 rounded-lg transition-colors border-l-4 border-gray-900 bg-gray-50/50 ${
        isFocused ? 'bg-gray-100/50' : 'hover:bg-gray-100/50'
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

      <textarea
        value={block.data.text || ''}
        onChange={(e) => {
          onChange(block.id, { ...block.data, text: e.target.value });
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onFocus={() => onFocus(block.id)}
        placeholder="Citação..."
        className="w-full resize-none outline-none bg-transparent text-gray-800 text-lg italic leading-relaxed min-h-[2rem]"
        rows={1}
      />
      <input
        type="text"
        value={block.data.author || ''}
        onChange={(e) => onChange(block.id, { ...block.data, author: e.target.value })}
        onFocus={() => onFocus(block.id)}
        placeholder="Autor da citação (opcional)"
        className="w-full outline-none bg-transparent text-gray-500 text-sm mt-2 font-medium"
      />
    </div>
  );
}
