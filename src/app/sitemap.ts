import { siteConfig } from '@/lib/seo';
import { getRecentPosts } from '@/lib/api';
import { CATEGORY_IDS } from '@/lib/api';
import { PROJETOS_ESPECIAIS } from '@/lib/especiais';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getRecentPosts(100); // fetch latest 100 posts for the sitemap

  const postsSitemap = posts.map((post) => ({
    url: `${siteConfig.url}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const categoriesSitemap = Object.keys(CATEGORY_IDS).map((slug) => ({
    url: `${siteConfig.url}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const especiaisSitemap = PROJETOS_ESPECIAIS.map((p) => ({
    url: `${siteConfig.url}/especiais/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/noticias',
    '/especiais',
    '/play',
    '/anuncie',
    '/contato',
    '/quem-somos',
    '/na-lata',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'hourly' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages, ...categoriesSitemap, ...especiaisSitemap, ...postsSitemap];
}
