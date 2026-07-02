'use client';

import { blockRegistry } from '../registry';

interface ToolbarProps {
  onAddBlock: (type: string) => void;
}

export function Toolbar({ onAddBlock }: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm w-max mb-6">
      <span className="text-xs font-semibold text-gray-400 mr-2 uppercase">Adicionar:</span>
      {Object.entries(blockRegistry).map(([type, config]) => (
        <button
          key={type}
          onClick={() => onAddBlock(type)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title={`Adicionar ${config.label}`}
        >
          <span>{config.icon}</span>
          <span className="hidden sm:inline">{config.label}</span>
        </button>
      ))}
    </div>
  );
}
