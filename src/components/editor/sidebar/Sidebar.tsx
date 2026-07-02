'use client';

import { PostFormData } from '../types';

interface SidebarProps {
  post: PostFormData;
  updatePost: (updates: Partial<PostFormData>) => void;
  auxiliaryData: {
    categories: { id: string; name: string }[];
    authors: { id: string; name: string }[];
    tags: { id: string; name: string }[];
  };
}

export function Sidebar({ post, updatePost, auxiliaryData }: SidebarProps) {
  const { categories, authors, tags } = auxiliaryData;

  const handleCheckbox = (field: keyof PostFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePost({ [field]: e.target.checked });
  };

  const handleChange = (field: keyof PostFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updatePost({ [field]: e.target.value });
  };

  // Simplificação: apenas ID único ou vazio para testar sem componente complexo de autocomplete
  const handleTagToggle = (tagId: string) => {
    const isSelected = post.tags.includes(tagId);
    if (isSelected) {
      updatePost({ tags: post.tags.filter(t => t !== tagId) });
    } else {
      updatePost({ tags: [...post.tags, tagId] });
    }
  };

  return (
    <div className="w-80 border-r border-gray-200 bg-gray-50/50 h-full overflow-y-auto flex flex-col p-6 shadow-sm hidden md:flex shrink-0">
      <h3 className="text-sm font-bold uppercase text-gray-500 mb-6 tracking-wider">
        Metadados
      </h3>

      <div className="space-y-6">
        
        {/* Subtítulo */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Subtítulo</label>
          <textarea 
            value={post.subtitle} 
            onChange={handleChange('subtitle')} 
            className="w-full p-2 text-sm border rounded bg-white outline-none resize-none" 
            rows={2} 
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Slug (URL)</label>
          <input 
            type="text" 
            value={post.slug} 
            onChange={handleChange('slug')} 
            className="w-full p-2 text-sm border rounded bg-white outline-none" 
          />
        </div>

        {/* Resumo */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Resumo (Excerpt)</label>
          <textarea 
            value={post.excerpt} 
            onChange={handleChange('excerpt')} 
            className="w-full p-2 text-sm border rounded bg-white outline-none resize-none" 
            rows={3} 
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Categoria</label>
          <select 
            value={post.categoryId} 
            onChange={handleChange('categoryId')} 
            className="w-full p-2 text-sm border rounded bg-white outline-none"
          >
            <option value="">Selecione...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Autor</label>
          <select 
            value={post.authorId} 
            onChange={handleChange('authorId')} 
            className="w-full p-2 text-sm border rounded bg-white outline-none"
          >
            <option value="">Selecione...</option>
            {authors.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        {/* Imagem Destacada (MVP: apenas Input do ID ou URL se ajustarmos no futuro) */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">ID da Imagem Destacada</label>
          <input 
            type="text" 
            value={post.featuredImageId} 
            onChange={handleChange('featuredImageId')} 
            placeholder="ID da media..."
            className="w-full p-2 text-sm border rounded bg-white outline-none" 
          />
        </div>

        {/* Flags */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Destaques e Opções</label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={post.hero} onChange={handleCheckbox('hero')} /> Hero (Manchete principal)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={post.featured} onChange={handleCheckbox('featured')} /> Featured (Destaque comum)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={post.breaking} onChange={handleCheckbox('breaking')} /> Breaking News
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <input type="checkbox" checked={post.allowComments} onChange={handleCheckbox('allowComments')} /> Permitir Comentários
          </label>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto border p-2 rounded bg-white">
            {tags.map(t => (
              <button
                key={t.id}
                onClick={() => handleTagToggle(t.id)}
                className={`text-xs px-2 py-1 rounded border ${post.tags.includes(t.id) ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
              >
                {t.name}
              </button>
            ))}
            {tags.length === 0 && <span className="text-xs text-gray-400">Nenhuma tag cadastrada no banco.</span>}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* SEO */}
        <div>
          <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">SEO</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">SEO Title</label>
              <input type="text" value={post.seoTitle} onChange={handleChange('seoTitle')} className="w-full p-2 text-xs border rounded bg-white outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">SEO Description</label>
              <textarea value={post.seoDescription} onChange={handleChange('seoDescription')} className="w-full p-2 text-xs border rounded bg-white outline-none resize-none" rows={3} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Keywords</label>
              <input type="text" value={post.seoKeywords} onChange={handleChange('seoKeywords')} className="w-full p-2 text-xs border rounded bg-white outline-none" placeholder="Termo 1, Termo 2" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Canonical URL</label>
              <input type="text" value={post.canonicalUrl} onChange={handleChange('canonicalUrl')} className="w-full p-2 text-xs border rounded bg-white outline-none" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
