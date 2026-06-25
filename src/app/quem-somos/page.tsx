import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/hero-section.webp';
import pqNosEscolherBg from '@/assets/pq-nos-escolher.png';
import corporateHandshake from '@/assets/corporate_handshake.png';
import { constructMetadata, siteConfig } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata(
  'Quem Somos | Negócio & Franquia',
  'Conheça a Negócio & Franquia, o ecossistema de inteligência em franquias, varejo e shopping centers.',
  undefined,
  `${siteConfig.url}/quem-somos`
);

// ─── Componentes Originais (Banners) ──────────────────────────────────────────

function HeroInstitucional() {
  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', display: 'flex', minHeight: '500px' }}>
        <Image 
          src={heroBg} 
          alt="Negócios e Franquias Banner" 
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
          priority
        />
        <div 
          className="container"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 2,
            margin: '0 auto',
            width: '100%'
          }}
        >
          <div style={{ maxWidth: '50%' }}>
            <div style={{ marginBottom: '2rem' }}>
              <Image 
                src="/logo.webp" 
                alt="Logo Negócios e Franquias" 
                width={320} 
                height={100} 
                style={{ objectFit: 'contain', background: 'transparent' }} 
                priority
              />
            </div>
            
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--gray-800)', margin: '0 0 2.5rem', fontWeight: 600 }}>
              Conteúdo, mídia e relacionamento para os mercados de franquias, varejo e shopping centers.
            </p>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.95)', 
              backdropFilter: 'blur(12px)', 
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--gray-200)', 
              borderRadius: '12px', 
              display: 'flex',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
            }}>
              <div style={{ width: '140px', position: 'relative', flexShrink: 0 }}>
                <Image 
                  src={corporateHandshake} 
                  alt="Anuncie na Negócio e Franquia" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                <div>
                  <h3 style={{ color: 'var(--brand-primary)', fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Anuncie na Negócio & Franquia
                  </h3>
                  <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem', fontWeight: 600 }}>
                    www.negocioefranquia.com.br
                  </span>
                </div>
                <Link href="/anuncie" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--brand-primary)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: 'fit-content',
                  transition: 'background 200ms',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                }}>
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PqNosEscolher() {
  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      overflow: 'hidden',
      color: 'var(--gray-900)',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ position: 'relative', width: '100%', display: 'flex', minHeight: '600px' }}>
        <Image 
          src={pqNosEscolherBg} 
          alt="Por Que Nos Escolher" 
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 45%, transparent 65%)',
          zIndex: 1
        }} />
        <div 
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            padding: '5rem 0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ maxWidth: '55%' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 1rem', display: 'block', color: 'var(--brand-primary)' }}>
              Por Que Nos Escolher?
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 1.5rem', color: 'var(--gray-900)' }}>
              A Parceria Estratégica que Seu<br/>Negócio Precisa
            </h2>
            <div style={{ 
              width: '50px', 
              height: '3px', 
              background: 'var(--brand-primary)', 
              margin: '0 0 1.5rem' 
            }} />
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, margin: '0 0 3rem', color: 'var(--gray-700)', fontWeight: 500 }}>
              Em um mercado complexo, experiência não é um diferencial: é uma necessidade. Nascemos em 2002 da vivência real em gestão de shoppings e varejo e entendemos a dor de quem empreende, portanto, entregamos a estratégia, a segurança e a autoridade que só a maior referência do setor pode proporcionar.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {[
                { title: 'Pioneirismo e Autoridade', text: 'Somos a referência do setor desde 2002 com conhecimento do ecossistema.' },
                { title: 'Metodologia Exclusiva', text: 'Não usamos "achismos" e desenvolvemos processos pioneiros e comprovados.' },
                { title: 'Visão 360º do Varejo', text: 'Nascemos da experiência real de quem já esteve do outro lado do balcão.' },
                { title: 'Foco em Segurança', text: 'Nosso objetivo é proteger seu patrimônio e maximizar seus resultados.' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand-primary)', 
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.2rem'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--gray-900)' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--gray-600)', lineHeight: 1.5 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Novos Componentes Baseados no JSON ───────────────────────────────────────

function SecaoHeroTexto() {
  return (
    <section className="container" style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-primary)', display: 'block', marginBottom: '1rem' }}>
          O NEGÓCIO & FRANQUIA
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--gray-900)', margin: '0 0 1rem' }}>
          QUEM SOMOS
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-700)', margin: '0 0 2rem' }}>
          A NEGÓCIO & FRANQUIA NASCEU EM 2002
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'var(--brand-primary)', margin: '0 auto 2.5rem' }} />
        
        <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
          Quando o palestrante Rodrigo Campelo — então superintendente de shoppings centers — lidava diariamente com um desafio comum: <em>"Preciso reduzir o meu aluguel."</em>
        </p>
        <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.7, margin: 0 }}>
          Ao investigar o problema, descobriu que a raiz da dificuldade não estava no shopping, mas na gestão dos negócios. A partir dessa percepção, surgiu o desejo de ajudar empreendedores com informação, educação e estratégia.
        </p>
      </div>
    </section>
  );
}

function MissaoVisaoValores() {
  const blocos = [
    { imgSrc: '/photo-missao.png', titulo: 'Missão', texto: 'Conectar informação, gestão e oportunidade, ajudando empreendedores a tomar decisões inteligentes com segurança e propósito.' },
    { imgSrc: '/photo-visao.png', titulo: 'Visão', texto: 'Ser a principal agência de conteúdo e assessoria do Brasil, transformando o mercado com nossa plataforma inovadora de repasse.' },
    { imgSrc: corporateHandshake, titulo: 'Valores', texto: 'Credibilidade, ética, transparência e segurança. Informação de qualidade e estratégia focada em resultados reais para nossos clientes.' }
  ];

  return (
    <section style={{ background: 'var(--gray-50)', padding: '5rem 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-primary)', display: 'block', marginBottom: '0.5rem' }}>
            Nossa Essência e Direção
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gray-900)', margin: 0 }}>
            Missão, Visão e Valores
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {blocos.map((bloco, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid var(--gray-100)', textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--gray-100)', position: 'relative', background: '#fff' }}>
                <Image src={bloco.imgSrc} alt={bloco.titulo} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)', margin: '0 0 1rem' }}>{bloco.titulo}</h3>
              <p style={{ fontSize: '1rem', color: 'var(--gray-600)', lineHeight: 1.6, margin: 0 }}>{bloco.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NossaEvolucao() {
  const timeline = [
    { ano: '2002', desc: 'Nasce um blog pioneiro e especializado no mercado de franquias.' },
    { ano: '2010', desc: 'Consolidação como o portal de referência em franquias, gestão e varejo.' },
    { ano: '2025', desc: 'Tornamo-nos a principal agência de conteúdo e assessoria do país.' }
  ];

  return (
    <section className="container" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gray-900)', margin: 0 }}>Nossa Evolução</h2>
        <div style={{ width: '50px', height: '4px', background: 'var(--brand-primary)', margin: '1rem auto 0' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {timeline.map((item, idx) => (
          <div key={idx} style={{ flex: '1 1 250px', maxWidth: '350px', background: 'var(--gray-900)', color: '#fff', padding: '2.5rem', borderRadius: '16px', position: 'relative' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--brand-primary)', lineHeight: 1, marginBottom: '1rem' }}>
              {item.ano}
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Especialidades() {
  const cards = [
    { titulo: 'Repasse de Franquias' },
    { titulo: 'Gestão de Crises' },
    { titulo: 'Agência de Conteúdo' }
  ];

  return (
    <section style={{ background: 'var(--brand-primary)', padding: '5rem 0', color: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>Especialidades</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{ background: '#fff', color: 'var(--gray-900)', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '200px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.5rem' }}>{card.titulo}</h3>
              <Link href="#" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Saiba Mais <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function QuemSomosPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <HeroInstitucional />
      <SecaoHeroTexto />
      <MissaoVisaoValores />
      <PqNosEscolher />
      <NossaEvolucao />
      <Especialidades />
    </div>
  );
}
