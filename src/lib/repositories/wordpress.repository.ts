/**
 * WordPress Repository
 *
 * Encapsula toda a comunicação com a REST API do WordPress.
 * Esta é a ÚNICA camada que conhece os detalhes do WordPress.
 * O restante da aplicação nunca deve importar deste arquivo diretamente
 * — tudo deve passar pelo ContentService.
 */

import { cacheTag, cacheLife } from 'next/cache';
import type { Article } from '@/lib/types/content';

const WP_API = 'https://noticias.negocioefranquia.com.br/wp-json/wp/v2';

// ─── WordPress Raw Types ───────────────────────────────────────────────────────

interface WPImage {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      medium?: { source_url: string };
      large?: { source_url: string };
    };
  };
}

interface WPAuthor {
  id: number;
  name: string;
  slug: string;
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
    author?: WPAuthor[];
    'wp:term'?: WPCategory[][];
  };
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizePost(post: WPPost): Article {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];
  const terms = post._embedded?.['wp:term'] ?? [];
  const categories = terms[0] ?? [];

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    imageUrl:
      media?.media_details?.sizes?.large?.source_url ??
      media?.media_details?.sizes?.medium?.source_url ??
      media?.source_url ??
      null,
    imageAlt: media?.alt_text ?? post.title.rendered,
    authorName: author?.name ?? 'Redação',
    authorSlug: author?.slug ?? '',
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })),
    source: 'wordpress',
  };
}

// ─── Internal Fetcher ─────────────────────────────────────────────────────────

async function fetchWP<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_API}${path}`);
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} — ${path}`);
  }
  return res.json() as Promise<T>;
}

// ─── Category ID Map ───────────────────────────────────────────────────────────

export const WP_CATEGORY_IDS: Record<string, number> = {
  franquias: 10,
  gestao: 12,
  mercado: 15,
  negocios: 14,
  shoppings: 13,
  'tecnologia-e-inovacao': 1,
  varejo: 11,
};

// ─── Public Repository Methods ────────────────────────────────────────────────

export async function wpGetRecentPosts(count = 10): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', 'wp-posts');

  try {
    const posts = await fetchWP<WPPost[]>(
      `/posts?per_page=${count}&_embed&orderby=date&order=desc`
    );
    return posts.map(normalizePost);
  } catch (err) {
    console.error('[WP Repository] getRecentPosts failed:', err);
    return [];
  }
}

export async function wpGetPostsByCategory(
  categorySlug: string,
  count = 12
): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', `cat-${categorySlug}`, 'wp-posts');

  const categoryId = WP_CATEGORY_IDS[categorySlug];
  if (!categoryId) return [];

  try {
    const posts = await fetchWP<WPPost[]>(
      `/posts?categories=${categoryId}&per_page=${count}&_embed&orderby=date&order=desc`
    );
    return posts.map(normalizePost);
  } catch (err) {
    console.error('[WP Repository] getPostsByCategory failed:', err);
    return [];
  }
}

export async function wpGetPostBySlug(slug: string): Promise<Article | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', `post-${slug}`, 'wp-posts');

  try {
    const posts = await fetchWP<WPPost[]>(`/posts?slug=${slug}&_embed`);
    if (!posts.length) return null;
    return normalizePost(posts[0]);
  } catch (err) {
    console.error('[WP Repository] getPostBySlug failed:', err);
    return null;
  }
}

export async function wpGetRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  count = 3
): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', 'wp-posts');

  if (!categoryIds.length) return [];

  try {
    const posts = await fetchWP<WPPost[]>(
      `/posts?categories=${categoryIds.join(',')}&exclude=${excludeId}&per_page=${count}&_embed&orderby=date&order=desc`
    );
    return posts.map(normalizePost);
  } catch (err) {
    console.error('[WP Repository] getRelatedPosts failed:', err);
    return [];
  }
}
