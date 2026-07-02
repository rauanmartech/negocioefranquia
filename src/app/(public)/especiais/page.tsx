import Link from 'next/link';
import type { Metadata } from 'next';
import {
  PROJETOS_ESPECIAIS,
  getProjetoDestaque,
  type ProjetoEspecial,
  type StatusEspecial,
} from '@/lib/especiais';
import especiaisBanner from '@/assets/especiais-banner.png';

import { constructMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = constructMetadata(
  'Especiais | Publicações de Referência do Mercado',
  'Análises, rankings e anuários editoriais que documentam e referenciam o ecossistema de franquias, varejo e shopping centers no Brasil.',
  undefined,
  `${siteConfig.url}/especiais`
);

// ─── Label de status ──────────────────────────────────────────────────────────
function BadgeStatus({ status, edicao }: { status: StatusEspecial; edicao: string | null }) {
  if (status === 'publicado' && edicao) {
    return (
      <span style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        padding: '0.25em 0.7em',
        borderRadius: '2px',
        background: 'var(--brand-primary)',
        color: '#fff',
        lineHeight: 1.6,
      }}>
        Edição {edicao}
      </span>
    );
  }
  if (status === 'em_breve') {
    return (
      <span style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        padding: '0.25em 0.7em',
        borderRadius: '2px',
        background: 'var(--gray-200)',
        color: 'var(--gray-500)',
        lineHeight: 1.6,
      }}>
        Em Breve
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.68rem',
      fontWeight: 800,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      padding: '0.25em 0.7em',
      borderRadius: '2px',
      background: 'var(--gray-100)',
      color: 'var(--gray-400)',
      lineHeight: 1.6,
    }}>
      Encerrado
    </span>
  );
}

// ─── Bloco visual do card (substitui imagem de notícia) ───────────────────────
function BlocoVisual({
  projeto,
  height = 148,
  fontSize = '3.5rem',
}: {
  projeto: ProjetoEspecial;
  height?: number;
  fontSize?: string;
}) {
  const palavras = projeto.nome.split(' ');
  const linha1 = palavras.slice(0, 2).join(' ').toUpperCase();
  const linha2 = palavras.slice(2).join(' ').toUpperCase();

  return (
    <div style={{
      background: projeto.corFundo,
      height,
      borderRadius: '8px 8px 0 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Número/ano decorativo */}
      {projeto.edicaoAtual && (
        <span style={{
          position: 'absolute',
          top: '50%',
          right: '1.25rem',
          transform: 'translateY(-50%)',
          fontSize,
          fontWeight: 900,
          color: projeto.corTexto,
          opacity: 0.18,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {projeto.edicaoAtual}
        </span>
      )}

      {/* Categoria */}
      <span style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
      }}>
        {projeto.categoria}
      </span>

      {/* Nome tipográfico */}
      <div>
        <div style={{
          fontSize: '0.95rem',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}>
          {linha1}
        </div>
        {linha2 && (
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 900,
            color: projeto.corTexto === '#fff' ? 'rgba(255,255,255,0.6)' : projeto.corTexto,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            opacity: 0.85,
          }}>
            {linha2}
          </div>
        )}
        {/* Colofão */}
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          marginTop: '0.4rem',
        }}>
          N&amp;F Especiais
        </div>
      </div>
    </div>
  );
}

// ─── Card de projeto ──────────────────────────────────────────────────────────
function CardProjeto({ projeto }: { projeto: ProjetoEspecial }) {
  const isPublicado = projeto.status === 'publicado';

  return (
    <Link
      href={`/especiais/${projeto.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{
        background: '#fff',
        border: '1px solid var(--gray-200)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
      }} className="especial-card">
        <BlocoVisual projeto={projeto} />

        <div style={{ padding: '1.25rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          <div>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--gray-900)',
              margin: '0 0 0.375rem',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>
              {projeto.nome}
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--gray-500)',
              margin: 0,
              lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}>
              {projeto.descricao}
            </p>
          </div>

          <div style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--gray-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <BadgeStatus status={projeto.status} edicao={projeto.edicaoAtual} />
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: isPublicado ? 'var(--brand-primary)' : 'var(--gray-400)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}>
              {isPublicado ? 'Ver publicação' : 'Saiba mais'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Destaque principal ───────────────────────────────────────────────────────
function DestaqueEspecial({ projeto }: { projeto: ProjetoEspecial }) {
  const isPublicado = projeto.status === 'publicado';

  return (
    <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--gray-200)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }} className="destaque-grid">

          {/* Texto */}
          <div>
            <BadgeStatus status={projeto.status} edicao={projeto.edicaoAtual} />

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--gray-900)',
              margin: '1.25rem 0 0',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}>
              {projeto.nome}
            </h2>

            <div style={{
              width: '50px',
              height: '3px',
              background: 'var(--brand-primary)',
              margin: '1.5rem 0',
            }} />

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--gray-600)',
              lineHeight: 1.7,
              margin: '0 0 2rem',
              maxWidth: '48ch',
            }}>
              {projeto.descricao}
            </p>

            <Link
              href={`/especiais/${projeto.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: isPublicado ? 'var(--brand-primary)' : 'var(--gray-400)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
              className="destaque-link"
            >
              {isPublicado ? 'Ver publicação' : 'Saiba mais'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Visual editorial clicável */}
          <Link href={`/especiais/${projeto.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: projeto.corFundo,
              borderRadius: '16px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '280px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'opacity 200ms',
            }} className="destaque-visual">
              {/* Numeral decorativo grande */}
              {projeto.edicaoAtual && (
                <span style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '1.5rem',
                  fontSize: '9rem',
                  fontWeight: 900,
                  color: projeto.corTexto,
                  opacity: 0.15,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  userSelect: 'none',
                }}>
                  {projeto.edicaoAtual}
                </span>
              )}

              {/* Categoria */}
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {projeto.categoria}
              </span>

              {/* Nome */}
              <div>
                <div style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}>
                  {projeto.nome}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                }}>
                  N&amp;F Especiais
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

// ─── CTA de patrocínio ────────────────────────────────────────────────────────
function CTAPatrocinio() {
  return (
    <section style={{ padding: '4rem 0', borderTop: '1px solid var(--gray-200)', background: '#fff' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}>
          <div style={{ maxWidth: '55ch' }}>
            <span style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--brand-primary)',
              marginBottom: '0.75rem',
            }}>
              Publicações Especiais
            </span>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 800,
              color: 'var(--gray-900)',
              margin: '0 0 0.75rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}>
              Associe sua marca às publicações de maior prestígio do setor.
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-500)',
              margin: 0,
              lineHeight: 1.6,
            }}>
              Nossos especiais são co-produzidos com marcas que lideram o mercado de franquias e varejo.
            </p>
          </div>
          <Link
            href="/anuncie"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--brand-primary)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              flexShrink: 0,
              borderBottom: '2px solid var(--brand-primary)',
              paddingBottom: '2px',
            }}
          >
            Fale sobre patrocínio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EspeciaisPage() {
  const destaque = getProjetoDestaque();
  const demais = PROJETOS_ESPECIAIS.filter((p) => p.slug !== destaque.slug);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Hero editorial */}
      <section style={{
        borderBottom: '1px solid var(--gray-200)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        {/* Imagem de fundo com máscara de fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '55%',
          backgroundImage: `url('${especiaisBanner.src}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
        }} className="hero-bg-mobile" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'block',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-primary)',
            marginBottom: '1rem',
          }}>
            Especiais N&amp;F
          </span>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'var(--gray-900)',
            margin: '0 0 1.5rem',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}>
            Publicações de Referência<br />do Mercado
          </h1>
          <div style={{
            width: '50px',
            height: '4px',
            background: 'var(--brand-primary)',
            marginBottom: '1.75rem',
          }} />
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--gray-500)',
            maxWidth: '60ch',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Análises, rankings e anuários editoriais que documentam e referenciam
            o ecossistema de franquias, varejo e shopping centers no Brasil.
          </p>
        </div>
      </section>

      {/* Destaque */}
      <DestaqueEspecial projeto={destaque} />

      {/* Grid de projetos */}
      <section style={{
        background: 'var(--background-alt)',
        padding: '5rem 0',
        borderTop: '1px solid var(--gray-200)',
      }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: '2.5rem' }}>
            <h2>Todos os Especiais</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}>
            {demais.map((projeto) => (
              <CardProjeto key={projeto.slug} projeto={projeto} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA de patrocínio */}
      <CTAPatrocinio />

      <style>{`
        .especial-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(14, 77, 122, 0.10);
        }
        .destaque-link:hover {
          opacity: 0.75 !important;
        }
        .destaque-visual:hover {
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .destaque-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
