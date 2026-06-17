import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/lib/api';
import { GridArticleCard } from '@/components/ArticleCard';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Artigo não encontrado' };

  return {
    title: post.title.replace(/<[^>]+>/g, ''),
    description: post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160),
    openGraph: {
      title: post.title.replace(/<[^>]+>/g, ''),
      description: post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160),
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.imageAlt }] : [],
      type: 'article',
    },
  };
}

// ─── Related Posts ────────────────────────────────────────────────────────────
async function RelatedPosts({ categoryIds, excludeId }: { categoryIds: number[]; excludeId: number }) {
  const related = await getRelatedPosts(categoryIds, excludeId, 3);
  if (!related.length) return null;

  return (
    <aside style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--gray-200)' }}>
      <div className="section-label">
        <h2>Leia Também</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.75rem',
        }}
      >
        {related.map((a) => (
          <GridArticleCard key={a.id} article={a} />
        ))}
      </div>
    </aside>
  );
}

// ─── Article body ─────────────────────────────────────────────────────────────
async function ArticleContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const category = post.categories[0];

  return (
    <article>
      {/* Header da matéria */}
      <header style={{ marginBottom: '2rem' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--gray-500)', textDecoration: 'none', fontSize: '0.8rem' }}>Início</Link>
          <span style={{ color: 'var(--gray-300)', fontSize: '0.75rem' }}>›</span>
          {category && (
            <>
              <Link href={`/${category.slug}`} style={{ color: 'var(--gray-500)', textDecoration: 'none', fontSize: '0.8rem' }}>
                {category.name}
              </Link>
              <span style={{ color: 'var(--gray-300)', fontSize: '0.75rem' }}>›</span>
            </>
          )}
          <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '30ch' }}>
            {post.title.replace(/<[^>]+>/g, '')}
          </span>
        </nav>

        {/* Category + title */}
        {category && (
          <Link href={`/${category.slug}`} style={{ textDecoration: 'none' }}>
            <span className="category-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {category.name}
            </span>
          </Link>
        )}

        <h1
          style={{
            fontSize: 'clamp(1.625rem, 4vw, 2.625rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.025em',
            color: 'var(--gray-900)',
            margin: '0 0 1rem',
          }}
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Excerpt / Linha de apoio */}
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--gray-600)',
            lineHeight: 1.6,
            margin: '0 0 1.25rem',
            fontStyle: 'italic',
            borderLeft: '3px solid var(--brand-primary)',
            paddingLeft: '1rem',
          }}
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        {/* Byline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--gray-200)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0,
            }}
          >
            {post.authorName[0]}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: 'var(--gray-800)' }}>
              {post.authorName}
            </p>
            <p style={{ margin: 0, fontSize: '0.775rem', color: 'var(--gray-500)' }}>
              {formatDate(post.date)}
            </p>
          </div>
        </div>
      </header>

      {/* Imagem destacada */}
      {post.imageUrl && (
        <figure style={{ margin: '0 0 2rem', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)' }}>
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          {post.imageAlt && (
            <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)', padding: '0.5rem 1rem' }}>
              {post.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Conteúdo editorial */}
      <div
        className="prose-editorial"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Notícias relacionadas */}
      <Suspense
        fallback={
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--gray-200)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 6 }} />
                  <div className="skeleton" style={{ height: 14, width: '85%' }} />
                  <div className="skeleton" style={{ height: 12, width: '60%' }} />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <RelatedPosts
          categoryIds={post.categories.map((c) => c.id)}
          excludeId={post.id}
        />
      </Suspense>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function NoticiaPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div
        className="container article-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 320px',
          gap: '3rem',
          paddingTop: '2.5rem',
          paddingBottom: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Article */}
        <div style={{ minWidth: 0 }}>
          <Suspense
            fallback={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="skeleton" style={{ height: 20, width: '40%' }} />
                <div className="skeleton" style={{ height: 56, width: '90%' }} />
                <div className="skeleton" style={{ height: 56, width: '75%' }} />
                <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 8 }} />
                <div className="skeleton" style={{ height: 16, width: '100%' }} />
                <div className="skeleton" style={{ height: 16, width: '95%' }} />
                <div className="skeleton" style={{ height: 16, width: '80%' }} />
              </div>
            }
          >
            <ArticleContent slug={slug} />
          </Suspense>
        </div>

        {/* Sidebar */}
        <aside
          style={{
            position: 'sticky',
            top: '5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
          className="article-sidebar"
        >
          {/* Anuncie card */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--brand-primary), var(--background-dark))',
              borderRadius: 8,
              padding: '1.75rem',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', margin: '0 0 0.5rem' }}>
              Publicidade
            </p>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.25, margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>
              Anuncie para o mercado de franquias
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              Alcance executivos, franqueados e investidores do setor.
            </p>
            <Link
              href="/anuncie"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#fff',
                color: 'var(--brand-primary)',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.65rem',
                borderRadius: 4,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Solicitar Proposta
            </Link>
          </div>

          {/* Categories widget */}
          <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '1.5rem', border: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', margin: '0 0 1rem' }}>
              Editorias
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                { label: 'Franquias', href: '/franquias' },
                { label: 'Varejo', href: '/varejo' },
                { label: 'Shopping Centers', href: '/shoppings' },
                { label: 'Gestão', href: '/gestao' },
                { label: 'Mercado', href: '/mercado' },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  style={{
                    padding: '0.6rem 0.75rem',
                    borderRadius: 4,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--gray-700)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 200ms, color 200ms',
                  }}
                  className="cat-link"
                >
                  {cat.label}
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .article-layout {
            grid-template-columns: 1fr !important;
          }
          .article-sidebar {
            display: none !important;
          }
        }
        .cat-link:hover {
          background: var(--gray-100) !important;
          color: var(--brand-primary) !important;
        }
      `}</style>
    </div>
  );
}
