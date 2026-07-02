import { PostService } from "@/lib/services/post.service";
import PostForm from "@/components/admin/PostForm";
import { Suspense } from "react";

async function NewPostContent() {
  const { categories, authors, tags } = await PostService.getAuxiliaryData();

  return (
    <PostForm
      authors={authors}
      categories={categories}
      tags={tags}
    />
  );
}

export default function NewPostPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Carregando formulário...</div>}>
      <NewPostContent />
    </Suspense>
  );
}
