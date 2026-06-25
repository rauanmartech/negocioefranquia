import { cacheTag, cacheLife } from 'next/cache';

const WP_API = 'https://noticias.negocioefranquia.com.br/wp-json/wp/v2';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WPImage {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: {
      medium?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: { [key: string]: string };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPPost {
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
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: { url: string }[];
  };
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
    author?: WPAuthor[];
    'wp:term'?: WPCategory[][];
  };
}

export interface Article {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  imageAlt: string;
  authorName: string;
  authorSlug: string;
  categories: { id: number; name: string; slug: string }[];
}

// ─── Category ID Map ───────────────────────────────────────────────────────────

export const CATEGORY_IDS: Record<string, number> = {
  franquias: 10,
  gestao: 12,
  mercado: 15,
  negocios: 14,
  shoppings: 13,
  'tecnologia-e-inovacao': 1,
  varejo: 11,
};

export const CATEGORY_LABELS: Record<string, string> = {
  franquias: 'Franquias',
  gestao: 'Gestão',
  mercado: 'Mercado',
  negocios: 'Negócios',
  shoppings: 'Shopping Centers',
  'tecnologia-e-inovacao': 'Tecnologia e Inovação',
  varejo: 'Varejo',
};

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
  };
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function fetchWP<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_API}${path}`);
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} — ${path}`);
  }
  return res.json() as Promise<T>;
}

// Get recent posts (home feed)
export async function getRecentPosts(count = 10): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts');

  const posts = await fetchWP<WPPost[]>(
    `/posts?per_page=${count}&_embed&orderby=date&order=desc`
  );
  return posts.map(normalizePost);
}

// Get posts by category slug
export async function getPostsByCategory(
  categorySlug: string,
  count = 12
): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', `cat-${categorySlug}`);

  const categoryId = CATEGORY_IDS[categorySlug];
  if (!categoryId) return [];

  const posts = await fetchWP<WPPost[]>(
    `/posts?categories=${categoryId}&per_page=${count}&_embed&orderby=date&order=desc`
  );
  return posts.map(normalizePost);
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Article | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts', `post-${slug}`);

  const posts = await fetchWP<WPPost[]>(`/posts?slug=${slug}&_embed`);
  if (!posts.length) return null;
  return normalizePost(posts[0]);
}

// Get all categories
export async function getCategories(): Promise<WPCategory[]> {
  'use cache';
  cacheLife('days');
  cacheTag('categories');

  return fetchWP<WPCategory[]>('/categories?per_page=100');
}

// Get related posts (same categories, exclude current)
export async function getRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  count = 3
): Promise<Article[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts');

  if (!categoryIds.length) return [];

  const posts = await fetchWP<WPPost[]>(
    `/posts?categories=${categoryIds.join(',')}&exclude=${excludeId}&per_page=${count}&_embed&orderby=date&order=desc`
  );
  return posts.map(normalizePost);
}
