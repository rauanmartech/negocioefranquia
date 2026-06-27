"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { postsRepository } from "@/lib/data/postsRepository";
import { Post } from "@/types/post";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const resolvedParams = use(params);

  useEffect(() => {
    const data = postsRepository.getPostById(resolvedParams.id);
    if (!data) {
      alert("Notícia não encontrada!");
      router.push("/nef-admin");
    } else {
      setPost(data);
    }
    setIsLoading(false);
  }, [resolvedParams.id, router]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Carregando...</div>;
  }

  if (!post) {
    return null;
  }

  return <PostForm initialData={post} />;
}
