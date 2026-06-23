import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjetoBySlug, PROJETOS_ESPECIAIS } from '@/lib/especiais';
import type { Metadata } from 'next';

// ─── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return PROJETOS_ESPECIAIS.map((p) => ({ slug: p.slug }));
}

// ─── Metadata dinâmica ────────────────────────────────────────────────────────
export async function generateMetadata(
  props: PageProps<'/especiais/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params;
  const projeto = getProjetoBySlug(slug);
  if (!projeto) return {};

  return {
    title: projeto.nome,
    description: projeto.descricao,
  };
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ nome }: { nome: string }) {
  return (
    <nav aria-label="Navegação estrutural" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.8rem',
      color: 'var(--gray-400)',
      marginBottom: '2.5rem',
      flexWrap: 'wrap',
    }}>
      <Link href="/" style={{ color: 'var(--gray-400)', textDecoration: 'none' }} className="breadcrumb-link">
        Negócios &amp; Franquias
      </Link>
      <span aria-hidden>›</span>
      <Link href="/especiais" style={{ color: 'var(--gray-400)', textDecoration: 'none' }} className="breadcrumb-link">
        Especiais
      </Link>
      <span aria-hidden>›</span>
      <span style={{ color: 'var(--gray-600)', fontWeight: 600 }}>{nome}</span>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function EspecialSlugPage(props: PageProps<'/especiais/[slug]'>) {
  const { slug } = await props.params;
  const projeto = getProjetoBySlug(slug);

  if (!projeto) notFound();

  const isPublicado = projeto.status === 'publicado';

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Cabeçalho editorial do projeto */}
      <section style={{
        borderBottom: '1px solid var(--gray-200)',
        padding: '4rem 0 3.5rem',
      }}>
        <div className="container">
          <Breadcrumb nome={projeto.nome} />

          {/* Categoria */}
          <span style={{
            display: 'block',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-primary)',
            marginBottom: '1rem',
          }}>
            {projeto.categoria} · Especiais N&amp;F
          </span>

          {/* Grid: texto + visual */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '3rem',
            alignItems: 'flex-start',
          }} className="header-grid">

            {/* Texto */}
            <div>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 900,
                color: 'var(--gray-900)',
                margin: '0 0 1.25rem',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}>
                {projeto.nome}
              </h1>
              <div style={{
                width: '50px',
                height: '4px',
                background: 'var(--brand-primary)',
                marginBottom: '1.5rem',
              }} />
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--gray-500)',
                maxWidth: '55ch',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {projeto.descricao}
              </p>
            </div>

            {/* Bloco visual editorial */}
            <div style={{
              background: projeto.corFundo,
              borderRadius: '12px',
              padding: '2rem 2.5rem',
              minWidth: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem',
            }}>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {projeto.categoria}
              </span>
              <div>
                {projeto.edicaoAtual && (
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: projeto.corTexto,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.25rem',
                  }}>
                    {projeto.edicaoAtual}
                  </div>
                )}
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                }}>
                  N&amp;F Especiais
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      {isPublicado ? (
        <section className="container" style={{ padding: '5rem 0' }}>
          {/* Conteúdo real da edição — a ser implementado por projeto */}
          <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>
            Conteúdo da edição disponível em breve.
          </p>
        </section>
      ) : (
        /* Estado: Em Breve */
        <section style={{
          padding: '6rem 0',
          background: 'var(--background-alt)',
          borderTop: '1px solid var(--gray-200)',
        }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>

            {/* Ícone editorial */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--gray-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>

            <h2 style={{
              fontSize: '1.625rem',
              fontWeight: 800,
              color: 'var(--gray-900)',
              margin: '0 0 1rem',
              letterSpacing: '-0.02em',
            }}>
              Publicação em preparação
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--gray-500)',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
            }}>
              Esta edição do <strong style={{ color: 'var(--gray-700)' }}>{projeto.nome}</strong> está sendo produzida.
              Acompanhe o portal para ser o primeiro a acessar quando for publicada.
            </p>

            <Link
              href="/especiais"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ver todos os Especiais
            </Link>
          </div>
        </section>
      )}

      <style>{`
        .breadcrumb-link:hover {
          color: var(--brand-primary) !important;
        }
        @media (max-width: 640px) {
          .header-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
