/**
 * api.ts — Ponto de entrada público da camada de dados
 *
 * Este arquivo re-exporta tudo do ContentService e mantém os tipos públicos
 * para que nenhuma página ou componente existente precise ser alterado.
 *
 * Toda a lógica de dual-source (CMS + WordPress) está em:
 *   src/lib/services/content.service.ts
 *   src/lib/repositories/cms.repository.ts
 *   src/lib/repositories/wordpress.repository.ts
 */

// ─── Re-exporta o tipo Article com o campo `source` adicionado ────────────────
export type { Article } from '@/lib/types/content';

// ─── Re-exporta os fetchers do ContentService ─────────────────────────────────
// Assinaturas idênticas às originais — nenhuma página precisa mudar.
export {
  getRecentPosts,
  getPostsByCategory,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/services/content.service';

// ─── Category maps (mantidos para retrocompatibilidade) ───────────────────────
export { WP_CATEGORY_IDS as CATEGORY_IDS } from '@/lib/repositories/wordpress.repository';

export const CATEGORY_LABELS: Record<string, string> = {
  franquias: 'Franquias',
  gestao: 'Gestão',
  mercado: 'Mercado',
  negocios: 'Negócios',
  shoppings: 'Shopping Centers',
  'tecnologia-e-inovacao': 'Tecnologia e Inovação',
  varejo: 'Varejo',
};

// ─── WordPress raw types (mantidos para retrocompatibilidade) ─────────────────
// Páginas que dependem destes tipos continuam funcionando normalmente.
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

// ─── getCategories (direto do WordPress por enquanto) ─────────────────────────
import { cacheTag, cacheLife } from 'next/cache';

const WP_API = 'https://noticias.negocioefranquia.com.br/wp-json/wp/v2';

export async function getCategories(): Promise<WPCategory[]> {
  'use cache';
  cacheLife('days');
  cacheTag('categories');

  const res = await fetch(`${WP_API}/categories?per_page=100`);
  if (!res.ok) return [];
  return res.json() as Promise<WPCategory[]>;
}
