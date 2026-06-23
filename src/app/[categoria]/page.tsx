import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, CATEGORY_IDS, CATEGORY_LABELS } from '@/lib/api';
import { GridArticleCard } from '@/components/ArticleCard';
import type { Metadata } from 'next';

// ─── Valid category slugs ─────────────────────────────────────────────────────
const VALID_SLUGS = Object.keys(CATEGORY_IDS);

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const label = CATEGORY_LABELS[categoria];
  if (!label) return { title: 'Negócios e Franquias' };
  return {
    title: `${label} | Negócios e Franquias`,
    description: `Todas as notícias sobre ${label} no portal Negócios e Franquias.`,
  };
}

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ categoria: slug }));
}

// ─── Card skeleton ────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 6 }} />
      <div className="skeleton" style={{ height: 14, width: '80%' }} />
      <div className="skeleton" style={{ height: 14, width: '60%' }} />
    </div>
  );
}

// ─── Articles list ────────────────────────────────────────────────────────────
async function ArticlesList({ slug }: { slug: string }) {
  const posts = await getPostsByCategory(slug, 24);
  if (!posts.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-500)' }}>
        <p style={{ fontSize: '1.1rem' }}>Nenhuma notícia encontrada nesta categoria ainda.</p>
        <Link href="/" style={{ color: 'var(--brand-primary)', fontWeight: 700, textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          Voltar à Home →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
      {posts.map((a) => (
        <GridArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;

  if (!VALID_SLUGS.includes(categoria)) {
    notFound();
  }

  const label = CATEGORY_LABELS[categoria];

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        style={{
          background: 'var(--brand-primary)',
          padding: '3rem 0',
          marginBottom: '3rem',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '1rem' }}>
            <Link
              href="/"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}
            >
              Home
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0.5rem' }}>/</span>
            <Link
              href="/noticias"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}
            >
              Notícias
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0.5rem' }}>/</span>
            <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>{label}</span>
          </nav>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0.75rem 0 0', fontSize: '1rem' }}>
            Todas as notícias sobre {label}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        <Suspense
          fallback={
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ArticlesList slug={categoria} />
        </Suspense>
      </div>
    </div>
  );
}
