/**
 * CMS Repository (Supabase / PostgreSQL via Prisma)
 *
 * Encapsula toda a comunicação com o banco de dados próprio do portal.
 * Usa o Supabase client para queries — alinhado com o schema Prisma completo.
 *
 * Todos os métodos retornam array vazio / null em caso de falha,
 * para nunca quebrar o site enquanto o banco ainda estiver vazio.
 */

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import type { Article } from '@/lib/types/content';

// ─── Helper ───────────────────────────────────────────────────────────────────

async function getSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

// ─── Select fragment reutilizável ─────────────────────────────────────────────
// Espelha os campos do model Post do Prisma schema

const POST_SELECT = `
  id,
  slug,
  title,
  subtitle,
  excerpt,
  published_at,
  created_at,
  views,
  featured,
  hero,
  breaking,
  authors ( name, slug ),
  categories ( id, name, slug ),
  media:featured_image_id ( url, alt )
` as const;

// ─── Row → Article normalizer ─────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeRow(row: any): Article {
  const author = Array.isArray(row.authors) ? row.authors[0] : row.authors;
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const image = Array.isArray(row.media) ? row.media[0] : row.media;

  return {
    id: row.id,
    slug: row.slug,
    date: row.published_at ?? row.created_at,
    title: row.title ?? '',
    excerpt: row.excerpt ?? '',
    content: '', // Content só é carregado na página individual (pesado)
    imageUrl: image?.url ?? null,
    imageAlt: image?.alt ?? row.title ?? '',
    authorName: author?.name ?? 'Redação',
    authorSlug: author?.slug ?? '',
    categories: category
      ? [{ id: category.id, name: category.name, slug: category.slug }]
      : [],
    source: 'cms',
  };
}

// ─── Public Repository Methods ────────────────────────────────────────────────

export async function cmsGetRecentPosts(count = 10): Promise<Article[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .eq('status', 'PUBLISHED')
      .order('published_at', { ascending: false })
      .limit(count);

    if (error || !data) return [];
    return data.map(normalizeRow);
  } catch (err) {
    console.error('[CMS Repository] getRecentPosts failed:', err);
    return [];
  }
}

export async function cmsGetPostsByCategory(
  categorySlug: string,
  count = 12
): Promise<Article[]> {
  try {
    const supabase = await getSupabase();
    // Primeiro busca o ID da categoria pelo slug
    const { data: catData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (!catData?.id) return [];

    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .eq('status', 'PUBLISHED')
      .eq('category_id', catData.id)
      .order('published_at', { ascending: false })
      .limit(count);

    if (error || !data) return [];
    return data.map(normalizeRow);
  } catch (err) {
    console.error('[CMS Repository] getPostsByCategory failed:', err);
    return [];
  }
}

export async function cmsGetPostBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('posts')
      .select(`
        ${POST_SELECT},
        content,
        post_seo ( seo_title, seo_description, og_image, robots, schema_type )
      `)
      .eq('slug', slug)
      .eq('status', 'PUBLISHED')
      .maybeSingle();

    if (error || !data) return null;
    const article = normalizeRow(data);
    // Inclui conteúdo completo na página individual
    article.content = data.content ? JSON.stringify(data.content) : '';
    return article;
  } catch (err) {
    console.error('[CMS Repository] getPostBySlug failed:', err);
    return null;
  }
}

export async function cmsGetRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  count = 3
): Promise<Article[]> {
  if (!categoryIds.length) return [];

  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .eq('status', 'PUBLISHED')
      .in('category_id', categoryIds)
      .neq('id', excludeId)
      .order('published_at', { ascending: false })
      .limit(count);

    if (error || !data) return [];
    return data.map(normalizeRow);
  } catch (err) {
    console.error('[CMS Repository] getRelatedPosts failed:', err);
    return [];
  }
}
