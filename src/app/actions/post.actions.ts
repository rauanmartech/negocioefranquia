'use server';

import { createClient } from '@/utils/supabase/server';
import { PostCreateInput, PostService, PostUpdateInput } from '@/lib/services/post.service';
import { revalidatePath } from 'next/cache';

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error('Unauthorized');
  }
  
  return user.id;
}

// DTO / Mapper para garantir que o objeto retornado seja 100% serializável
// Remove o protótipo do Prisma e converte campos de Date para string
function serializePost(post: any) {
  if (!post) return null;
  
  return {
    ...post,
    createdAt: post.createdAt ? post.createdAt.toISOString() : undefined,
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    scheduledAt: post.scheduledAt ? post.scheduledAt.toISOString() : null,
  };
}

export async function createPostAction(data: PostCreateInput) {
  try {
    const userId = await getAuthenticatedUserId();
    
    // Validação extra poderia ocorrer aqui (ex: Zod)
    
    const post = await PostService.createPost(data, userId);
    
    // Revalidar rotas (opcional)
    revalidatePath('/nef-admin/posts');
    
    return { success: true, post: serializePost(post) };
  } catch (error: any) {
    console.error('Error in createPostAction:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePostAction(id: string, data: PostUpdateInput) {
  try {
    const userId = await getAuthenticatedUserId();
    
    const post = await PostService.updatePost(id, data, userId);
    
    // Revalidar rotas
    revalidatePath('/nef-admin/posts');
    revalidatePath(`/noticias/${post.slug}`);
    
    return { success: true, post: serializePost(post) };
  } catch (error: any) {
    console.error('Error in updatePostAction:', error);
    return { success: false, error: error.message };
  }
}
