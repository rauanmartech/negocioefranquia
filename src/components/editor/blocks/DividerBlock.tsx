'use client';

import { BlockComponentProps, DividerData } from '../types';

export function DividerBlock({
  block,
  onChange,
  onRemove,
  isFocused,
  onFocus,
}: BlockComponentProps<DividerData>) {
  return (
    <div
      className={`group relative py-4 my-4 -mx-4 px-4 rounded-lg transition-colors ${
        isFocused ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onFocus(block.id)}
    >
      {(isFocused || true) && (
        <div className="absolute left-[-2rem] top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <select
            value={block.data.style || 'solid'}
            onChange={(e) => onChange(block.id, { style: e.target.value as any })}
            className="p-1 text-xs border rounded bg-white text-gray-600"
          >
            <option value="solid">Sólido</option>
            <option value="dashed">Tracejado</option>
            <option value="dotted">Pontilhado</option>
          </select>
          <button
            onClick={() => onRemove(block.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
          >
            x
          </button>
        </div>
      )}

      <div className="w-full flex items-center justify-center py-4">
        <div
          className={`w-full border-t-2 ${
            block.data.style === 'dashed'
              ? 'border-dashed'
              : block.data.style === 'dotted'
              ? 'border-dotted'
              : 'border-solid'
          } border-gray-300`}
        />
      </div>
    </div>
  );
}
