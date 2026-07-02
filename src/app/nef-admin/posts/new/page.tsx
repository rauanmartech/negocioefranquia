import { Editor } from '@/components/editor/Editor';
import { PostService } from '@/lib/services/post.service';
import { createPostAction } from '@/app/actions/post.actions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Nova Notícia | Negócio & Franquia',
};

export default async function NewPostPage() {
  const auxiliaryData = await PostService.getAuxiliaryData();

  const handleSave = async (data: any) => {
    'use server';
    
    // Convert arrays into appropriate format for DB/Action payload if needed
    // The action already accepts the shape we defined.
    
    const res = await createPostAction({
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.blocks, // Store blocks array directly into JSONB
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
      tags: data.tags, // array de string (IDs)
    });

    if (res.success && res.post) {
      redirect(`/nef-admin/posts/${res.post.id}/edit`);
    } else {
      throw new Error(res.error || 'Failed to save post');
    }
  };

  return (
    <Editor 
      auxiliaryData={auxiliaryData} 
      onSave={handleSave} 
    />
  );
}
