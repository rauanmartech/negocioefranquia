'use server';

import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';
import { PostCreateInput, PostService, PostUpdateInput } from '@/lib/services/post.service';
import { revalidatePath } from 'next/cache';

// ----- Auth Helper -----------------------------------------------------------
// CORRECAO CRITICA: O Supabase retorna user.id = supabase_id (UUID do Auth).
// O campo createdById no Post e FK para User.id (UUID interno da tabela users).
// Usar supabase_id diretamente causava FK constraint violation -> digest error.
async function getAuthenticatedUserId(): Promise<string> {
  console.log('[auth] Iniciando getAuthenticatedUserId...');

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('[auth] Erro ao buscar usuario Supabase:', error.message);
    throw new Error(`Auth error: ${error.message}`);
  }

  if (!user) {
    console.error('[auth] Nenhum usuario autenticado encontrado.');
    throw new Error('Unauthorized: no session');
  }

  console.log('[auth] Supabase user.id (supabase_id):', user.id);

  // Buscar o ID interno da tabela users pelo supabaseId
  const internalUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { id: true },
  });

  if (!internalUser) {
    console.error(
      '[auth] Usuario interno NAO encontrado na tabela users para supabaseId:',
      user.id,
      '-- O usuario precisa ter um perfil criado na tabela users com supabase_id correspondente.'
    );
    throw new Error(
      `User not found in database for supabaseId: ${user.id}. ` +
      'Certifique-se de que existe um registro na tabela users com este supabase_id.'
    );
  }

  console.log('[auth] User interno encontrado -> id:', internalUser.id);
  return internalUser.id;
}

// ----- Serializer ------------------------------------------------------------
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

// ----- Validação de payload --------------------------------------------------
function validatePostPayload(data: PostCreateInput | PostUpdateInput): string | null {
  if (!data.title?.trim())      return 'O título é obrigatório.';
  if (!data.slug?.trim())       return 'O slug é obrigatório.';
  if (!data.authorId?.trim())   return 'Selecione um autor. Não há autores cadastrados ou ativos no sistema — cadastre um autor antes de criar um post.';
  if (!data.categoryId?.trim()) return 'Selecione uma categoria. Não há categorias cadastradas ou ativas no sistema.';
  return null;
}

// ----- Create Post -----------------------------------------------------------
export async function createPostAction(data: PostCreateInput) {
  console.log('[createPostAction] Iniciando criacao de post...');
  console.log('[createPostAction] Payload:', JSON.stringify({
    title: data.title,
    slug: data.slug,
    status: data.status,
    authorId: data.authorId,
    categoryId: data.categoryId,
    featuredImageId: data.featuredImageId,
    tagsCount: data.tags?.length ?? 0,
    hasSeoTitle: !!data.seoTitle,
  }));

  // Validação antes de tocar no banco — evita FK violation mascarado como digest
  const validationError = validatePostPayload(data);
  if (validationError) {
    console.error('[createPostAction] Validacao falhou:', validationError);
    return { success: false, error: validationError };
  }

  try {
    console.log('[createPostAction] -> Etapa 1: Autenticacao');
    const userId = await getAuthenticatedUserId();
    console.log('[createPostAction] OK userId interno:', userId);

    console.log('[createPostAction] -> Etapa 2: PostService.createPost');
    const post = await PostService.createPost(data, userId);
    console.log('[createPostAction] OK Post criado, id:', post.id);

    revalidatePath('/nef-admin');
    revalidatePath('/nef-admin/posts');

    return { success: true, post: serializePost(post) };
  } catch (error: any) {
    console.error('[createPostAction] ERRO CAPTURADO:');
    console.error('  message:', error?.message);
    console.error('  code (Prisma):', error?.code);
    console.error('  meta (Prisma):', JSON.stringify(error?.meta));
    console.error('  stack:', error?.stack);
    return {
      success: false,
      error: error?.meta
        ? `Erro de banco [${error.code}]: ${error.message} | meta: ${JSON.stringify(error.meta)}`
        : error?.message ?? 'Erro desconhecido ao criar post',
    };
  }
}

// ----- Update Post -----------------------------------------------------------
export async function updatePostAction(id: string, data: PostUpdateInput) {
  console.log('[updatePostAction] Iniciando atualizacao do post:', id);

  const validationError = validatePostPayload(data);
  if (validationError) {
    console.error('[updatePostAction] Validacao falhou:', validationError);
    return { success: false, error: validationError };
  }

  try {
    console.log('[updatePostAction] -> Etapa 1: Autenticacao');
    const userId = await getAuthenticatedUserId();
    console.log('[updatePostAction] OK userId interno:', userId);

    console.log('[updatePostAction] -> Etapa 2: PostService.updatePost');
    const post = await PostService.updatePost(id, data, userId);
    console.log('[updatePostAction] OK Post atualizado, slug:', post.slug);

    revalidatePath('/nef-admin');
    revalidatePath('/nef-admin/posts');
    revalidatePath(`/noticias/${post.slug}`);

    return { success: true, post: serializePost(post) };
  } catch (error: any) {
    console.error('[updatePostAction] ERRO CAPTURADO:');
    console.error('  message:', error?.message);
    console.error('  code (Prisma):', error?.code);
    console.error('  meta (Prisma):', JSON.stringify(error?.meta));
    console.error('  stack:', error?.stack);
    return {
      success: false,
      error: error?.meta
        ? `Erro de banco [${error.code}]: ${error.message} | meta: ${JSON.stringify(error.meta)}`
        : error?.message ?? 'Erro desconhecido ao atualizar post',
    };
  }
}
