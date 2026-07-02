"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPostAction, updatePostAction } from "@/app/actions/post.actions";
import { PostStatus } from "@prisma/client";
import TiptapEditor from "./TiptapEditor";
import ImageUploader from "./ImageUploader";

interface Author { id: string; name: string }
interface Category { id: string; name: string }
interface Tag { id: string; name: string }

interface PostFormProps {
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  initialData?: {
    id: string;
    title: string;
    subtitle?: string | null;
    slug: string;
    excerpt?: string | null;
    content: any;
    status: PostStatus;
    authorId: string;
    categoryId: string;
    featuredImageId?: string | null;
    hero: boolean;
    featured: boolean;
    breaking: boolean;
    allowComments: boolean;
    seo?: {
      seoTitle?: string | null;
      seoDescription?: string | null;
      ogImage?: string | null;
      seoKeywords?: string | null;
    } | null;
    tags?: { tagId: string }[];
    // Para exibir a imagem de capa atual
    featuredImageUrl?: string | null;
  };
}

export default function PostForm({ authors, categories, tags, initialData }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    status: initialData?.status || PostStatus.DRAFT,
    authorId: initialData?.authorId || (authors[0]?.id ?? ""),
    categoryId: initialData?.categoryId || (categories[0]?.id ?? ""),
    hero: initialData?.hero || false,
    featured: initialData?.featured || false,
    breaking: initialData?.breaking || false,
    allowComments: initialData?.allowComments ?? true,
    selectedTagIds: initialData?.tags?.map(t => t.tagId) || [],
    // Imagem de capa — guardamos a URL localmente para preview
    coverImageUrl: initialData?.featuredImageUrl || "",
    // featuredImageId: ID do registro na tabela media
    featuredImageId: initialData?.featuredImageId || "",
  });

  const [seoData, setSeoData] = useState({
    seoTitle: initialData?.seo?.seoTitle || "",
    seoDescription: initialData?.seo?.seoDescription || "",
    ogImage: initialData?.seo?.ogImage || "",
    seoKeywords: initialData?.seo?.seoKeywords || "",
  });

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !initialData ? generateSlug(title) : prev.slug,
    }));
    if (!seoData.seoTitle) {
      setSeoData((prev) => ({ ...prev, seoTitle: title }));
    }
  };

  const handleCoverUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, coverImageUrl: url }));
    if (!seoData.ogImage) {
      setSeoData((prev) => ({ ...prev, ogImage: url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Converter content para objeto JSON se for string HTML
    const contentValue = typeof formData.content === "string"
      ? { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: formData.content }] }] }
      : formData.content;

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle || undefined,
      slug: formData.slug,
      excerpt: formData.excerpt || undefined,
      content: contentValue,
      status: formData.status,
      authorId: formData.authorId,
      categoryId: formData.categoryId,
      featuredImageId: formData.featuredImageId || undefined,
      hero: formData.hero,
      featured: formData.featured,
      breaking: formData.breaking,
      allowComments: formData.allowComments,
      tags: formData.selectedTagIds,
      seoTitle: seoData.seoTitle || undefined,
      seoDescription: seoData.seoDescription || undefined,
      ogImage: seoData.ogImage || undefined,
      seoKeywords: seoData.seoKeywords || undefined,
    };

    try {
      let result;
      if (initialData?.id) {
        result = await updatePostAction(initialData.id, payload);
      } else {
        result = await createPostAction(payload);
      }

      if (!result.success) {
        setSubmitError(result.error || "Erro ao salvar");
        return;
      }

      router.push("/nef-admin");
      router.refresh();
    } catch (err: any) {
      setSubmitError(err.message || "Erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTagIds: prev.selectedTagIds.includes(tagId)
        ? prev.selectedTagIds.filter((id) => id !== tagId)
        : [...prev.selectedTagIds, tagId],
    }));
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

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Conteúdo Principal</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL amigável) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Excerpt)</label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <TiptapEditor
                content={typeof formData.content === "string" ? formData.content : ""}
                onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">SEO</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={seoData.seoTitle}
                onChange={(e) => setSeoData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: até 60 caracteres ({seoData.seoTitle.length}/60)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={seoData.seoDescription}
                onChange={(e) => setSeoData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: até 160 caracteres ({seoData.seoDescription.length}/160)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (separadas por vírgula)</label>
              <input
                type="text"
                value={seoData.seoKeywords}
                onChange={(e) => setSeoData((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="franquia, negócios, empreendedorismo"
              />
            </div>
          </div>
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6">
          {/* Publicação */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Publicação</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as PostStatus }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={PostStatus.DRAFT}>Rascunho</option>
                <option value={PostStatus.REVIEW}>Em Revisão</option>
                <option value={PostStatus.PUBLISHED}>Publicado</option>
                <option value={PostStatus.ARCHIVED}>Arquivado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
              <select
                required
                value={formData.authorId}
                onChange={(e) => setFormData((prev) => ({ ...prev, authorId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {authors.length === 0 && <option value="">Nenhum autor cadastrado</option>}
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.length === 0 && <option value="">Nenhuma categoria cadastrada</option>}
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {[
                { key: "hero", label: "Manchete principal" },
                { key: "featured", label: "Destaque na home" },
                { key: "breaking", label: "Breaking news" },
                { key: "allowComments", label: "Permitir comentários" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Imagem de Capa */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Imagem de Capa</h2>
            <ImageUploader
              currentUrl={formData.coverImageUrl}
              onUpload={handleCoverUpload}
              onRemove={() => setFormData((prev) => ({ ...prev, coverImageUrl: "", featuredImageId: "" }))}
              bucket="news-images"
              folder="covers"
              label="Imagem de capa"
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = formData.selectedTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
