"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post, PostSeo } from "@/types/post";
import { postsRepository } from "@/lib/data/postsRepository";
import TiptapEditor from "./TiptapEditor";

interface PostFormProps {
  initialData?: Post;
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    status: initialData?.status || "draft",
    gallery: initialData?.gallery || [],
  });

  const [seoData, setSeoData] = useState<PostSeo>({
    metaTitle: initialData?.seo?.metaTitle || "",
    metaDescription: initialData?.seo?.metaDescription || "",
    ogImage: initialData?.seo?.ogImage || "",
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !initialData ? generateSlug(title) : prev.slug, // Auto-generate on new post only
    }));
    
    // Auto fill SEO title if empty
    if (!seoData.metaTitle) {
      setSeoData((prev) => ({ ...prev, metaTitle: title }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postPayload = {
        ...formData,
        seo: seoData,
      } as any; // Cast for now, TS will be fine since structure matches Omit<Post, id, createdAt, updatedAt>

      if (initialData?.id) {
        postsRepository.updatePost(initialData.id, postPayload);
      } else {
        postsRepository.createPost(postPayload);
      }
      
      router.push("/nef-admin");
      router.refresh();
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
      alert("Ocorreu um erro ao salvar o post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverUploadMock = () => {
    const url = window.prompt("Insira a URL da imagem de capa:");
    if (url) {
      setFormData((prev) => ({ ...prev, coverImage: url }));
      if (!seoData.ogImage) {
        setSeoData((prev) => ({ ...prev, ogImage: url }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Editar Notícia" : "Criar Notícia"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : "Salvar Notícia"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Conteúdo Principal</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Nova Franquia de Sucesso..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL amigável)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Excerpt)</label>
              <textarea
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <TiptapEditor
                content={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
            </div>
          </div>
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Publicação</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "draft" | "published" }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>
              {formData.coverImage ? (
                <div className="mb-2 relative rounded overflow-hidden border border-gray-200 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.coverImage} alt="Capa" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCoverUploadMock}
                  className="w-full py-8 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Adicionar Imagem de Capa (URL)
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">SEO</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={seoData.metaTitle}
                onChange={(e) => setSeoData(prev => ({ ...prev, metaTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: até 60 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={seoData.metaDescription}
                onChange={(e) => setSeoData(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: até 160 caracteres</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Image (URL)</label>
              <input
                type="text"
                value={seoData.ogImage}
                onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
