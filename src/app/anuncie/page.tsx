import Link from 'next/link';
import type { Metadata } from 'next';
import anuncieBanner from '@/assets/anuncie-banner.png';

export const metadata: Metadata = {
  title: 'Anuncie | Negócios & Franquias',
  description:
    'Conecte sua marca a uma audiência altamente qualificada dos mercados de franquias, varejo e shopping centers.',
};

// ─── Dados ────────────────────────────────────────────────────────────────────

const NUMEROS = [
  {
    numeral: '+300 mil',
    titulo: 'Leitores únicos por mês',
    descricao: 'Uma base consolidada de leitores ativos nos mercados de franquias, varejo e shopping centers.',
  },
  {
    numeral: null,
    titulo: 'Audiência Qualificada',
    descricao: 'Líderes, executivos e tomadores de decisão do ecossistema de franquias e varejo.',
  },
  {
    numeral: null,
    titulo: 'Alcance Nacional',
    descricao: 'Presença em todo o Brasil, com cobertura regional e foco nos principais mercados do país.',
  },
  {
    numeral: null,
    titulo: 'Conteúdo Segmentado',
    descricao: 'Editorias especializadas em franquias, varejo, gestão, shopping centers e negócios.',
  },
];

const PERFIS_AUDIENCIA = [
  'Franqueadores',
  'Franqueados',
  'CEOs',
  'Diretores',
  'Executivos',
  'Investidores',
  'Gestores de Shopping Centers',
  'Lojistas',
  'Fornecedores',
  'Agências de Publicidade',
];

const SOLUCOES = [
  {
    nome: 'Banner',
    descricao:
      'Exposição de marca em posições estratégicas no portal, com segmentação por editoria e alta visibilidade.',
  },
  {
    nome: 'Branded Content',
    descricao:
      'Conteúdo editorial produzido em parceria com a redação do portal, alinhado à linha editorial do veículo.',
  },
  {
    nome: 'Podcast Patrocinado',
    descricao:
      'Associação da marca a programas de áudio produzidos pela N&F, com alto engajamento da audiência especializada.',
  },
  {
    nome: 'Vídeo Patrocinado',
    descricao:
      'Produção e distribuição de conteúdo audiovisual patrocinado nos canais multimídia do portal.',
  },
  {
    nome: 'Newsletter',
    descricao:
      'Presença na comunicação direta com os assinantes da newsletter, uma audiência de alta recorrência e interesse ativo.',
  },
  {
    nome: 'Séries Especiais',
    descricao:
      'Publicações aprofundadas de caráter editorial — rankings, anuários e dossiês — com oportunidade de co-patrocínio.',
  },
  {
    nome: 'Projetos Customizados',
    descricao:
      'Soluções desenvolvidas sob medida para objetivos específicos de comunicação e relacionamento com o mercado.',
  },
  {
    nome: 'Cobertura de Eventos',
    descricao:
      'Cobertura editorial e multimídia de eventos do setor, com distribuição pelo portal e redes sociais.',
  },
];

// ─── Seção Hero ───────────────────────────────────────────────────────────────
function HeroAnuncie() {
  return (
    <section style={{
      background: '#fff',
      borderBottom: '1px solid var(--gray-200)',
      padding: '5rem 0 4.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Imagem de fundo com máscara de fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '55%',
        backgroundImage: `url('${anuncieBanner.src}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--brand-primary)',
          marginBottom: '1.25rem',
        }}>
          Anuncie
        </span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          fontWeight: 900,
          color: 'var(--gray-900)',
          margin: '0 0 1.75rem',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}>
          Anuncie na<br />Negócios &amp; Franquias
        </h1>

        <div style={{
          width: '50px',
          height: '4px',
          background: 'var(--brand-primary)',
          marginBottom: '2rem',
        }} />

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--gray-500)',
          maxWidth: '55ch',
          lineHeight: 1.7,
          margin: '0 0 2.5rem',
        }}>
          Conecte sua marca a uma audiência altamente qualificada dos mercados
          de franquias, varejo e shopping centers.
        </p>

        <a
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--brand-primary)',
            color: '#fff',
            fontSize: '0.82rem',
            fontWeight: 800,
            padding: '0.9rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            transition: 'background 200ms',
          }}
          className="cta-primary"
        >
          Solicitar mídia kit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ─── Seção Números ────────────────────────────────────────────────────────────
function SecaoNumeros() {
  return (
    <section style={{
      background: 'var(--background-alt)',
      borderTop: '1px solid var(--gray-200)',
      borderBottom: '1px solid var(--gray-200)',
      padding: '4rem 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: '#fff',
          border: '1px solid var(--gray-200)',
          borderRadius: '8px',
          overflow: 'hidden',
        }} className="numeros-grid">
          {NUMEROS.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem 2rem',
                borderLeft: idx === 0 ? 'none' : '1px solid var(--gray-200)',
              }}
            >
              {item.numeral && (
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'var(--gray-900)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {item.numeral}
                </div>
              )}
              <div style={{
                fontSize: item.numeral ? '0.875rem' : '1rem',
                fontWeight: 700,
                color: 'var(--gray-900)',
                marginBottom: '0.625rem',
                lineHeight: 1.3,
              }}>
                {item.titulo}
              </div>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--gray-500)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Seção Audiência ──────────────────────────────────────────────────────────
function SecaoAudiencia() {
  return (
    <section style={{
      background: '#fff',
      padding: '5rem 0',
    }}>
      <div className="container">
        <span style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--brand-primary)',
          marginBottom: '1.25rem',
        }}>
          Perfis da Audiência
        </span>

        <h2 style={{
          fontSize: '2.25rem',
          fontWeight: 900,
          color: 'var(--gray-900)',
          margin: '0 0 1.5rem',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
        }}>
          Quem nos lê
        </h2>

        <div style={{
          width: '50px',
          height: '4px',
          background: 'var(--brand-primary)',
          marginBottom: '3rem',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          border: '1px solid var(--gray-200)',
          borderRadius: '8px',
          overflow: 'hidden',
        }} className="audiencia-grid">
          {PERFIS_AUDIENCIA.map((perfil, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.5rem 1.75rem',
                borderRight: '1px solid var(--gray-100)',
                borderBottom: '1px solid var(--gray-100)',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 180ms, color 180ms',
              }}
              className="perfil-item"
            >
              <div style={{
                width: '6px',
                height: '6px',
                background: 'var(--brand-primary)',
                borderRadius: '50%',
                flexShrink: 0,
                opacity: 0.5,
              }} />
              <span style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--gray-800)',
                lineHeight: 1.3,
              }}>
                {perfil}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Seção Soluções ───────────────────────────────────────────────────────────
function SecaoSolucoes() {
  return (
    <section style={{
      background: 'var(--background-alt)',
      borderTop: '1px solid var(--gray-200)',
      borderBottom: '1px solid var(--gray-200)',
      padding: '5rem 0',
    }}>
      <div className="container">
        <span style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--brand-primary)',
          marginBottom: '1.25rem',
        }}>
          Formatos de Mídia
        </span>

        <h2 style={{
          fontSize: '2.25rem',
          fontWeight: 900,
          color: 'var(--gray-900)',
          margin: '0 0 1.5rem',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
        }}>
          Soluções para sua marca
        </h2>

        <div style={{
          width: '50px',
          height: '4px',
          background: 'var(--brand-primary)',
          marginBottom: '3rem',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {SOLUCOES.map((solucao, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '1px solid var(--gray-200)',
                borderRadius: '8px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
                position: 'relative',
              }}
              className="solucao-card"
            >
              {/* Barra de topo no hover — via CSS */}
              <div className="solucao-barra" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'var(--brand-primary)',
                borderRadius: '8px 8px 0 0',
                opacity: 0,
                transition: 'opacity 200ms',
              }} />

              {/* Índice */}
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--gray-400)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Nome */}
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--gray-900)',
                margin: 0,
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}>
                {solucao.nome}
              </h3>

              {/* Separador */}
              <div style={{
                width: '24px',
                height: '2px',
                background: 'var(--gray-200)',
              }} />

              {/* Descrição */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-500)',
                margin: 0,
                lineHeight: 1.65,
                flex: 1,
              }}>
                {solucao.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chamada Final ────────────────────────────────────────────────────────────
function ChamadaFinal() {
  return (
    <section style={{
      background: 'var(--background-dark)',
      padding: '6rem 0',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '1.5rem',
        }}>
          Negócios &amp; Franquias
        </span>

        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
          fontWeight: 900,
          color: '#fff',
          margin: '0 0 1.75rem',
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
        }}>
          A plataforma de mídia especializada<br />
          nos mercados que movem o Brasil.
        </h2>

        <div style={{
          width: '50px',
          height: '3px',
          background: 'var(--brand-secondary)',
          margin: '0 auto 2rem',
        }} />

        <p style={{
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '55ch',
          margin: '0 auto 3rem',
          lineHeight: 1.7,
        }}>
          Em um ecossistema de informação, relacionamento e conteúdo sobre
          franquias, varejo e shopping centers, sua marca alcança quem decide.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--brand-primary)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 800,
              padding: '0.9rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background 200ms',
            }}
            className="cta-primary"
          >
            Solicitar mídia kit
          </a>

          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '0.875rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'border-color 200ms, color 200ms',
            }}
            className="cta-outline"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AnunciePage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <HeroAnuncie />
      <SecaoNumeros />
      <SecaoAudiencia />
      <SecaoSolucoes />
      <ChamadaFinal />

      <style>{`
        .cta-primary:hover {
          background: var(--brand-secondary) !important;
        }
        .cta-outline:hover {
          border-color: rgba(255,255,255,0.6) !important;
          color: #fff !important;
        }
        .perfil-item:hover {
          background: var(--gray-50) !important;
        }
        .perfil-item:hover span {
          color: var(--brand-primary) !important;
        }
        .solucao-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(14, 77, 122, 0.08);
        }
        .solucao-card:hover .solucao-barra {
          opacity: 1 !important;
        }
        @media (max-width: 900px) {
          .numeros-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .numeros-grid > div:nth-child(1),
          .numeros-grid > div:nth-child(2) {
            border-bottom: 1px solid var(--gray-200);
          }
          .numeros-grid > div:nth-child(odd) {
            border-left: none !important;
          }
        }
        @media (max-width: 560px) {
          .numeros-grid {
            grid-template-columns: 1fr !important;
          }
          .numeros-grid > div {
            border-left: none !important;
            border-bottom: 1px solid var(--gray-200);
          }
        }
      `}</style>
    </div>
  );
}
