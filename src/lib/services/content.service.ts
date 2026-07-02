/**
 * ContentService
 *
 * Coração da arquitetura dual-source.
 *
 * Implementa o fluxo de consulta definido em 01-arquitetura-geral.md:
 *   1. Consulta o CMS próprio (Supabase/PostgreSQL)
 *   2. Se encontrou → retorna
 *   3. Se não encontrou → consulta WordPress
 *   4. Retorna resposta unificada para o frontend
 *
 * O frontend NUNCA acessa os repositórios diretamente.
 * Toda a lógica de roteamento entre as fontes fica aqui.
 *
 * Quando a migração estiver concluída, basta remover as chamadas ao
 * wordpress.repository.ts — sem alterar nenhuma página ou componente.
 */

import {
  cmsGetRecentPosts,
  cmsGetPostsByCategory,
  cmsGetPostBySlug,
  cmsGetRelatedPosts,
} from '@/lib/repositories/cms.repository';

import {
  wpGetRecentPosts,
  wpGetPostsByCategory,
  wpGetPostBySlug,
  wpGetRelatedPosts,
} from '@/lib/repositories/wordpress.repository';

import type { Article } from '@/lib/types/content';

// ─── Merge Helper ─────────────────────────────────────────────────────────────
// Combina resultados de CMS e WP removendo slugs duplicados.
// Artigos do CMS têm prioridade (aparecem primeiro).

function mergeArticles(cmsArticles: Article[], wpArticles: Article[]): Article[] {
  const seen = new Set(cmsArticles.map((a) => a.slug));
  const unique = wpArticles.filter((a) => !seen.has(a.slug));
  return [...cmsArticles, ...unique];
}

// ─── Public Service Methods ───────────────────────────────────────────────────

/**
 * Retorna as notícias mais recentes de ambas as fontes.
 * O CMS aparece primeiro, WP preenche o restante sem duplicatas.
 */
export async function getRecentPosts(count = 10): Promise<Article[]> {
  const [cmsArticles, wpArticles] = await Promise.all([
    cmsGetRecentPosts(count),
    wpGetRecentPosts(count),
  ]);

  const merged = mergeArticles(cmsArticles, wpArticles);
  return merged.slice(0, count);
}

/**
 * Retorna notícias de uma categoria de ambas as fontes.
 */
export async function getPostsByCategory(
  categorySlug: string,
  count = 12
): Promise<Article[]> {
  const [cmsArticles, wpArticles] = await Promise.all([
    cmsGetPostsByCategory(categorySlug, count),
    wpGetPostsByCategory(categorySlug, count),
  ]);

  const merged = mergeArticles(cmsArticles, wpArticles);
  return merged.slice(0, count);
}

/**
 * Retorna um artigo pelo slug.
 * Prioridade: CMS → WordPress.
 */
export async function getPostBySlug(slug: string): Promise<Article | null> {
  // Tenta CMS primeiro
  const cmsArticle = await cmsGetPostBySlug(slug);
  if (cmsArticle) return cmsArticle;

  // Fallback para WordPress
  return wpGetPostBySlug(slug);
}

/**
 * Retorna artigos relacionados de ambas as fontes.
 * Prioridade: CMS → WordPress. Sem duplicatas.
 */
export async function getRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  count = 3
): Promise<Article[]> {
  const [cmsArticles, wpArticles] = await Promise.all([
    cmsGetRelatedPosts(categoryIds, excludeId, count),
    wpGetRelatedPosts(categoryIds, excludeId, count),
  ]);

  const merged = mergeArticles(cmsArticles, wpArticles);
  return merged.slice(0, count);
}
