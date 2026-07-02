'use client';

import { useState, useEffect } from 'react';
import { Block, PostFormData } from './types';
import { blockRegistry } from './registry';
import { Sidebar } from './sidebar/Sidebar';
import { Toolbar } from './toolbar/Toolbar';
import { generateId, moveBlockDown, moveBlockUp, removeBlock, updateBlockData } from './utils/editorActions';
import { slugify } from '@/lib/utils';
import { BlockRenderer } from './renderers/BlockRenderer';

interface EditorProps {
  initialData?: Partial<PostFormData>;
  auxiliaryData: {
    categories: { id: string; name: string }[];
    authors: { id: string; name: string }[];
    tags: { id: string; name: string }[];
  };
  onSave: (data: PostFormData) => Promise<any>;
}

export function Editor({ initialData, auxiliaryData, onSave }: EditorProps) {
  const [post, setPost] = useState<PostFormData>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    blocks: initialData?.blocks || [],
    categoryId: initialData?.categoryId || '',
    authorId: initialData?.authorId || '',
    featuredImageId: initialData?.featuredImageId || '',
    tags: initialData?.tags || [],
    status: initialData?.status || 'DRAFT',
    featured: initialData?.featured || false,
    hero: initialData?.hero || false,
    breaking: initialData?.breaking || false,
    allowComments: initialData?.allowComments ?? true,
    scheduledAt: initialData?.scheduledAt || null,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    canonicalUrl: initialData?.canonicalUrl || '',
    ogImage: initialData?.ogImage || '',
    seoKeywords: initialData?.seoKeywords || '',
  });

  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-slugify
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setPost((prev) => ({
      ...prev,
      title: newTitle,
      // Only auto-update slug if the user hasn't explicitly edited it or it's new
      slug: !initialData?.slug ? slugify(newTitle) : prev.slug,
    }));
  };

  const updatePost = (updates: Partial<PostFormData>) => {
    setPost((prev) => ({ ...prev, ...updates }));
  };

  // Block handlers
  const handleAddBlock = (type: string) => {
    const config = blockRegistry[type];
    if (!config) return;
    const newBlock: Block = { id: generateId(), type, data: { ...config.defaultData } };
    updatePost({ blocks: [...post.blocks, newBlock] });
    setFocusedBlockId(newBlock.id);
  };

  const handleBlockChange = (id: string, newData: any) => {
    updatePost({ blocks: updateBlockData(post.blocks, id, newData) });
  };
  const handleBlockRemove = (id: string) => updatePost({ blocks: removeBlock(post.blocks, id) });
  const handleMoveUp = (id: string) => updatePost({ blocks: moveBlockUp(post.blocks, id) });
  const handleMoveDown = (id: string) => updatePost({ blocks: moveBlockDown(post.blocks, id) });

  const handleSave = async (status: PostFormData['status']) => {
    setIsSaving(true);
    await onSave({ ...post, status });
    setIsSaving(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar post={post} updatePost={updatePost} auxiliaryData={auxiliaryData} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header (Topbar) */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-gray-800">
              {initialData?.title ? 'Editar Notícia' : 'Nova Notícia'}
            </h1>
            {isSaving && <span className="text-xs text-blue-500 animate-pulse">Salvando...</span>}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            >
              {isPreview ? 'Voltar para Edição' : 'Visualizar'}
            </button>
            <button 
              onClick={() => handleSave('DRAFT')}
              disabled={isSaving}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Salvar Rascunho
            </button>
            <button 
              onClick={() => handleSave('PUBLISHED')}
              disabled={isSaving}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              Publicar
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {isPreview ? (
            <div className="max-w-3xl mx-auto py-12 px-8">
              <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
              <BlockRenderer blocks={post.blocks} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-12 px-8">
              <textarea
                value={post.title}
                onChange={handleTitleChange}
                placeholder="Título Principal da Notícia"
                className="w-full text-5xl font-extrabold text-gray-900 outline-none bg-transparent resize-none leading-tight mb-8"
                rows={1}
                onInput={(e) => {
                  (e.target as HTMLTextAreaElement).style.height = 'auto';
                  (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight + 'px';
                }}
              />
              
              <Toolbar onAddBlock={handleAddBlock} />

              <div className="space-y-1">
                {post.blocks.map((block) => {
                  const BlockComponent = blockRegistry[block.type]?.component;
                  if (!BlockComponent) return <div key={block.id}>Erro</div>;
                  return (
                    <BlockComponent
                      key={block.id}
                      block={block}
                      onChange={handleBlockChange}
                      onRemove={handleBlockRemove}
                      onMoveUp={handleMoveUp}
                      onMoveDown={handleMoveDown}
                      isFocused={focusedBlockId === block.id}
                      onFocus={setFocusedBlockId}
                    />
                  );
                })}
              </div>

              {post.blocks.length === 0 && (
                <div className="text-gray-400 text-center py-20 border-2 border-dashed rounded-lg mt-8">
                  Comece adicionando um bloco pela barra acima.
                </div>
              )}
              
              <div className="h-64" onClick={() => setFocusedBlockId(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
