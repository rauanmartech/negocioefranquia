import { Block } from '../types';

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function moveBlockUp(blocks: Block[], id: string): Block[] {
  const index = blocks.findIndex((b) => b.id === id);
  if (index <= 0) return blocks;
  
  const newBlocks = [...blocks];
  [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
  return newBlocks;
}

export function moveBlockDown(blocks: Block[], id: string): Block[] {
  const index = blocks.findIndex((b) => b.id === id);
  if (index === -1 || index >= blocks.length - 1) return blocks;
  
  const newBlocks = [...blocks];
  [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
  return newBlocks;
}

export function removeBlock(blocks: Block[], id: string): Block[] {
  return blocks.filter((b) => b.id !== id);
}

export function updateBlockData(blocks: Block[], id: string, newData: any): Block[] {
  return blocks.map((b) => (b.id === id ? { ...b, data: newData } : b));
}
