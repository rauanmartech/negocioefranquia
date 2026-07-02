import { notFound } from "next/navigation";
import { PostService } from "@/lib/services/post.service";
import PostForm from "@/components/admin/PostForm";
import { Suspense } from "react";

async function EditPostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, { categories, authors, tags }] = await Promise.all([
    PostService.getPostForEdit(id),
    PostService.getAuxiliaryData(),
  ]);

  if (!post) notFound();

  return (
    <PostForm
      authors={authors}
      categories={categories}
      tags={tags}
      initialData={{
        id: post.id,
        title: post.title,
        subtitle: post.subtitle,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: post.status,
        authorId: post.authorId,
        categoryId: post.categoryId,
        featuredImageId: post.featuredImageId,
        hero: post.hero,
        featured: post.featured,
        breaking: post.breaking,
        allowComments: post.allowComments,
        seo: post.seo
          ? {
              seoTitle: post.seo.seoTitle,
              seoDescription: post.seo.seoDescription,
              ogImage: post.seo.ogImage,
              seoKeywords: post.seo.seoKeywords,
            }
          : null,
        tags: post.tags,
      }}
    />
  );
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Carregando post...</div>}>
      <EditPostContent params={params} />
    </Suspense>
  );
}
