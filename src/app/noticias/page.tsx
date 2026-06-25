import { Suspense } from 'react';
import Link from 'next/link';
import { getRecentPosts, getPostsByCategory } from '@/lib/api';
import { HeroArticle, SecondaryArticleCard, StandardArticleCard, GridArticleCard } from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { constructMetadata, siteConfig } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata(
  'Notícias | Negócio & Franquia',
  'Acompanhe as últimas notícias e novidades dos mercados de franquias, varejo e shopping centers.',
  undefined,
  `${siteConfig.url}/noticias`
);

// ─── Sections de editorias ────────────────────────────────────────────────────
const EDITORIAL_SECTIONS = [
  { slug: 'franquias', label: 'Franquias' },
  { slug: 'gestao', label: 'Gestão' },
  { slug: 'mercado', label: 'Mercado' },
  { slug: 'negocios', label: 'Negócios' },
  { slug: 'shoppings', label: 'Shopping Centers' },
  { slug: 'varejo', label: 'Varejo' },
  { slug: 'tecnologia-e-inovacao', label: 'Tecnologia e Inovação' },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <div className="skeleton" style={{ borderRadius: 6, aspectRatio: '16/9', minHeight: 340 }} />
  );
}

function CardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 6 }} />
      <div className="skeleton" style={{ height: 14, width: '80%' }} />
      <div className="skeleton" style={{ height: 14, width: '60%' }} />
    </div>
  );
}

// ─── Hero + Secondary grid ────────────────────────────────────────────────────
async function HeroSection() {
  const posts = await getRecentPosts(5);
  if (!posts.length) return null;

  const [hero, ...secondary] = posts;

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.55fr)',
          gap: '1rem',
          alignItems: 'stretch',
        }}
        className="hero-grid"
      >
        {/* Hero */}
        <HeroArticle article={hero} />

        {/* Secondary (2 cards) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {secondary.slice(0, 2).map((a) => (
            <SecondaryArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Últimas notícias + sidebar ───────────────────────────────────────────────
async function LatestSection() {
  const posts = await getRecentPosts(14);
  const latest = posts.slice(5, 13); // slots 6–13

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="section-label">
        <h2>Últimas Notícias</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '0 3rem',
        }}
        className="latest-grid"
      >
        <div>
          {latest.slice(0, 4).map((a) => (
            <StandardArticleCard key={a.id} article={a} />
          ))}
        </div>
        <div>
          {latest.slice(4, 8).map((a) => (
            <StandardArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Seção de editoria ────────────────────────────────────────────────────────
async function EditorialSection({ slug, label }: { slug: string; label: string }) {
  const posts = await getPostsByCategory(slug, 4);
  if (!posts.length) return null;

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="section-label">
        <h2>{label}</h2>
        <Link href={`/${slug}`}>Ver todos →</Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.75rem',
        }}
      >
        {posts.map((a) => (
          <GridArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

// ─── Anuncie CTA ─────────────────────────────────────────────────────────────
function AnuncieCTA() {
  return (
    <section
      style={{
        margin: '3rem 0',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--background-dark) 100%)',
        padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
      }}
    >
      <div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>
          Publicidade
        </p>
        <h2
          style={{
            color: '#fff',
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            fontWeight: 800,
            margin: '0 0 0.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Leve a Autoridade do Negócio & Franquia<br /> para o seu Veículo
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0, maxWidth: '50ch' }}>
          Faça do nosso ecossistema a ponte entre sua marca e o mercado de franquias e varejo.
        </p>
      </div>
      <Link
        href="/anuncie"
        style={{
          background: '#fff',
          color: 'var(--brand-primary)',
          padding: '0.875rem 2rem',
          borderRadius: 4,
          fontWeight: 800,
          fontSize: '0.85rem',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Peço uma Proposta
      </Link>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: 'var(--background-alt)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Banner topo */}
        <section style={{ marginBottom: '2rem' }}>
          <AdBanner width={970} height={250} />
        </section>

        {/* Hero */}
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>

        {/* Últimas notícias */}
        <Suspense
          fallback={
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div className="skeleton" style={{ width: 100, height: 72, borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                    <div className="skeleton" style={{ height: 12, width: '90%' }} />
                    <div className="skeleton" style={{ height: 12, width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <LatestSection />
        </Suspense>

        {/* Editorias */}
        {EDITORIAL_SECTIONS.map((section) => (
          <Suspense
            key={section.slug}
            fallback={
              <section style={{ marginBottom: '3.5rem' }}>
                <div className="section-label"><h2>{section.label}</h2></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.75rem' }}>
                  {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
                </div>
              </section>
            }
          >
            <EditorialSection slug={section.slug} label={section.label} />
          </Suspense>
        ))}

        <AnuncieCTA />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .latest-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
