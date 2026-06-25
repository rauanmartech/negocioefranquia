import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Negócio & Franquia',
  title: 'Negócio & Franquia | Conteúdo, mídia e relacionamento para franquias, varejo e shopping centers',
  description: 'Mais de 300 mil leitores acompanham diariamente as transformações dos mercados de franquias, varejo e shopping centers no Brasil.',
  url: 'https://negocioefranquia.com.br',
  locale: 'pt_BR',
  author: 'Negócio & Franquia',
  publisher: 'Negócio & Franquia',
  ogImage: '/og-image.webp',
  themeKeywords: ['Franquias', 'Varejo', 'Shopping Centers', 'Negócios', 'Mercado', 'Gestão', 'Tecnologia e Inovação'],
};

/**
 * Helper to generate default metadata with Open Graph and Twitter Cards.
 * It merges the provided custom metadata with the defaults.
 */
export function constructMetadata(
  customTitle?: string,
  customDescription?: string,
  image?: string,
  canonicalUrl?: string,
  noIndex?: boolean
): Metadata {
  const title = customTitle || siteConfig.title;
  const description = customDescription || siteConfig.description;
  const rawOgImageUrl = image || siteConfig.ogImage;
  const url = canonicalUrl || siteConfig.url;

  // Garantir URL absoluta para a imagem OG (exigência estrita do WhatsApp e iMessage)
  const ogImageUrl = rawOgImageUrl.startsWith('http') 
    ? rawOgImageUrl 
    : `${siteConfig.url.replace(/\/$/, '')}${rawOgImageUrl.startsWith('/') ? '' : '/'}${rawOgImageUrl}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.author }],
    publisher: siteConfig.publisher,
    keywords: siteConfig.themeKeywords,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Generate Organization JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.webp`,
    sameAs: [
      // Add social URLs here if available
    ],
  };
}

/**
 * Generate WebSite JSON-LD Schema
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/**
 * Generate NewsArticle JSON-LD Schema
 */
export function getNewsArticleSchema(post: {
  title: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string | null;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  slug: string;
}) {
  const description = post.excerpt
    ? post.excerpt.replace(/<[^>]+>/g, '').trim()
    : post.content
    ? post.content.replace(/<[^>]+>/g, '').trim().substring(0, 150) + '...'
    : siteConfig.description;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title.replace(/<[^>]+>/g, '').trim(),
    description: description,
    image: post.imageUrl ? [post.imageUrl] : [`${siteConfig.url}${siteConfig.ogImage}`],
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${post.slug}`,
    },
  };
}
