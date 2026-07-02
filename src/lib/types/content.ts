/**
 * Content Types
 *
 * Contrato unificado entre WordPress e CMS próprio.
 * Nenhum componente do frontend deve importar tipos do WordPress ou do Supabase
 * diretamente — apenas este arquivo.
 */

export interface Article {
  /** ID numérico. Para WP é o post ID; para CMS é o ID da tabela articles. */
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
  /** Indica a origem do conteúdo. Útil para debug e futura migração. */
  source: 'wordpress' | 'cms';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
}
