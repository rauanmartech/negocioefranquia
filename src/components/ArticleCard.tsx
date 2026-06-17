import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/api';
import { formatDateShort, truncate } from '@/lib/utils';

// ─── Hero Article (manchete principal) ────────────────────────────────────────
export function HeroArticle({ article }: { article: Article }) {
  const category = article.categories[0];

  return (
    <Link
      href={`/noticia/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: '6px', overflow: 'hidden' }}
      className="img-overlay"
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', minHeight: 340, background: 'var(--gray-200)' }}>
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' }} />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,20,40,0.95) 0%, rgba(10,20,40,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(1.25rem, 4vw, 2rem)',
          }}
        >
          {category && (
            <span className="category-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              {category.name}
            </span>
          )}
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              margin: '0 0 0.75rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
            dangerouslySetInnerHTML={{ __html: article.title }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: '65ch',
            }}
          >
            {truncate(article.excerpt, 150)}
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
              Por <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{article.authorName}</strong>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>
              {formatDateShort(article.date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Secondary Article Card (matérias de apoio ao hero) ───────────────────────
export function SecondaryArticleCard({ article }: { article: Article }) {
  const category = article.categories[0];

  return (
    <Link
      href={`/noticia/${article.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', borderRadius: '6px', overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-200)' }}
      className="card-hover"
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)', flexShrink: 0 }} className="img-overlay">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' }} />
        )}
        {category && (
          <span
            className="category-badge"
            style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}
          >
            {category.name}
          </span>
        )}
      </div>
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3
          style={{
            fontSize: '0.925rem',
            fontWeight: 700,
            color: 'var(--gray-900)',
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>
          {formatDateShort(article.date)}
        </p>
      </div>
    </Link>
  );
}

// ─── Standard Article Card (grid de listagem) ─────────────────────────────────
export function StandardArticleCard({ article }: { article: Article }) {
  const category = article.categories[0];

  return (
    <Link
      href={`/noticia/${article.slug}`}
      style={{ textDecoration: 'none', display: 'flex', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--gray-100)' }}
      className="card-hover"
    >
      {/* Thumbnail */}
      <div
        style={{ width: 100, height: 72, borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: 'var(--gray-100)', position: 'relative' }}
        className="img-overlay"
      >
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="100px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--gray-200)' }} />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem', justifyContent: 'center' }}>
        {category && (
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {category.name}
          </span>
        )}
        <h4
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--gray-900)',
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', margin: 0 }}>
          {formatDateShort(article.date)}
        </p>
      </div>
    </Link>
  );
}

// ─── Grid Article Card (grade de categoria) ───────────────────────────────────
export function GridArticleCard({ article }: { article: Article }) {
  const category = article.categories[0];

  return (
    <Link
      href={`/noticia/${article.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
      className="card-hover"
    >
      <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', aspectRatio: '16/9', background: 'var(--gray-100)' }} className="img-overlay">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' }} />
        )}
        {category && (
          <span className="category-badge" style={{ position: 'absolute', top: '0.625rem', left: '0.625rem' }}>
            {category.name}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: 'var(--gray-900)',
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
            {article.authorName}
          </span>
          <span style={{ color: 'var(--gray-300)', fontSize: '0.7rem' }}>·</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
            {formatDateShort(article.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}
