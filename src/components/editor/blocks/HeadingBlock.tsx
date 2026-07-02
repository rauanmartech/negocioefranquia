'use client';

import { BlockComponentProps, HeadingData } from '../types';

export function HeadingBlock({
  block,
  onChange,
  onRemove,
  isFocused,
  onFocus,
}: BlockComponentProps<HeadingData>) {
  const levelClass = {
    1: 'text-4xl font-bold mt-8 mb-4',
    2: 'text-3xl font-bold mt-6 mb-3',
    3: 'text-2xl font-bold mt-4 mb-2',
    4: 'text-xl font-bold mt-4 mb-2',
    5: 'text-lg font-bold mt-4 mb-2',
    6: 'text-base font-bold mt-4 mb-2',
  }[block.data.level || 2];

  return (
    <div
      className={`group relative py-2 -mx-4 px-4 rounded-lg transition-colors ${
        isFocused ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onFocus(block.id)}
    >
      {(isFocused || true) && (
        <div className="absolute left-[-2rem] top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <select
            value={block.data.level || 2}
            onChange={(e) =>
              onChange(block.id, {
                ...block.data,
                level: Number(e.target.value) as any,
              })
            }
            className="p-1 text-xs border rounded bg-white text-gray-600"
          >
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <option key={l} value={l}>
                H{l}
              </option>
            ))}
          </select>
          <button
            onClick={() => onRemove(block.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
          >
            x
          </button>
        </div>
      )}

      <input
        type="text"
        value={block.data.text || ''}
        onChange={(e) => onChange(block.id, { ...block.data, text: e.target.value })}
        onFocus={() => onFocus(block.id)}
        placeholder={`Heading ${block.data.level || 2}`}
        className={`w-full outline-none bg-transparent text-gray-900 ${levelClass}`}
      />
    </div>
  );
}
