import { Editor } from '@/components/editor/Editor';
import { PostService } from '@/lib/services/post.service';
import { updatePostAction } from '@/app/actions/post.actions';
import { notFound, redirect } from 'next/navigation';
import { PostFormData } from '@/components/editor/types';

export const metadata = {
  title: 'Editar Notícia | Negócio & Franquia',
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const [post, auxiliaryData] = await Promise.all([
    PostService.getPostForEdit(id),
    PostService.getAuxiliaryData(),
  ]);

  if (!post) {
    notFound();
  }

  // Converter os dados do banco para o estado unificado do formulário
  const initialData: Partial<PostFormData> = {
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    excerpt: post.excerpt || '',
    blocks: (post.content as any) || [], // JSONB guardando o array
    categoryId: post.categoryId,
    authorId: post.authorId,
    featuredImageId: post.featuredImageId || '',
    status: post.status,
    scheduledAt: post.scheduledAt,
    allowComments: post.allowComments,
    hero: post.hero,
    featured: post.featured,
    breaking: post.breaking,
    tags: post.tags.map(t => t.tagId),
    seoTitle: post.seo?.seoTitle || '',
    seoDescription: post.seo?.seoDescription || '',
    canonicalUrl: post.seo?.canonicalUrl || '',
    ogImage: post.seo?.ogImage || '',
    seoKeywords: post.seo?.seoKeywords || '',
  };

  const handleSave = async (data: any) => {
    'use server';
    
    const res = await updatePostAction(id, {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.blocks,
      categoryId: data.categoryId,
      authorId: data.authorId,
      featuredImageId: data.featuredImageId || undefined,
      status: data.status,
      scheduledAt: data.scheduledAt,
      allowComments: data.allowComments,
      hero: data.hero,
      featured: data.featured,
      breaking: data.breaking,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      canonicalUrl: data.canonicalUrl,
      ogImage: data.ogImage,
      seoKeywords: data.seoKeywords,
      tags: data.tags,
    });

    if (!res.success) {
      throw new Error(res.error || 'Failed to update post');
    }
  };

  return (
    <Editor 
      initialData={initialData}
      auxiliaryData={auxiliaryData} 
      onSave={handleSave} 
    />
  );
}
