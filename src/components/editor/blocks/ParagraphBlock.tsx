'use client';

import { BlockComponentProps, ParagraphData } from '../types';

export function ParagraphBlock({
  block,
  onChange,
  onRemove,
  isFocused,
  onFocus,
}: BlockComponentProps<ParagraphData>) {
  return (
    <div
      className={`group relative py-2 -mx-4 px-4 rounded-lg transition-colors ${
        isFocused ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onFocus(block.id)}
    >
      {/* Opções de bloco (aparecem no hover ou foco) */}
      {(isFocused || true) && (
        <div className="absolute left-[-2rem] top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <button
            onClick={() => onRemove(block.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
            title="Remover bloco"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      )}

      <textarea
        value={block.data.text || ''}
        onChange={(e) => {
          onChange(block.id, { text: e.target.value });
          // Auto-resize simples
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onFocus={() => onFocus(block.id)}
        placeholder="Digite algo ou digite '/' para comandos"
        className="w-full resize-none outline-none bg-transparent text-gray-800 leading-relaxed min-h-[1.5rem]"
        rows={1}
      />
    </div>
  );
}
