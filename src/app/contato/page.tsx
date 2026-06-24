import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import contatoImg from '@/assets/contato.png';

export const metadata: Metadata = {
  title: 'Contato | Negócio e Franquia',
  description: 'Entre em contato com a equipe da Negócio e Franquia. Nossa equipe está à disposição para conversar sobre franquias, varejo e gestão.',
};

export default function ContatoPage() {
  const unidades = [
    {
      cidade: 'Belo Horizonte - MG',
      endereco: 'Avenida Getúlio Vargas, 671, Sala 500, Edifício Paraúna - Savassi'
    },
    {
      cidade: 'São Paulo - SP',
      endereco: 'Av. Eng. Luiz Carlos Berrini, 1681, Ed. Berrini - Cidade Monções'
    },
    {
      cidade: 'Brasília - DF',
      endereco: 'Setor Comercial Norte, Qd 04, Bl B, Sala 702, 7º Andar - Asa Norte'
    }
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: 'var(--gray-900)' }}>
      {/* Seção Principal */}
      <section className="container" style={{ padding: '6rem 0' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          
          {/* Left Column - Image */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              width: '80%', 
              height: '80%', 
              background: 'var(--gray-100)', 
              borderRadius: '80px 0 80px 0', 
              zIndex: 1,
              top: '10%',
              left: '10%'
            }} />
            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '500px', aspectRatio: '3/4', borderRadius: '80px 0 80px 0', overflow: 'hidden' }}>
              <Image 
                src={contatoImg} 
                alt="Contato Negócio e Franquia" 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
                priority
              />
            </div>
          </div>

          {/* Right Column - Text & Contact Info */}
          <div style={{ flex: '1 1 500px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-primary)', display: 'block', marginBottom: '1.5rem' }}>
              FALE CONOSCO
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--gray-900)', margin: '0 0 1.5rem', lineHeight: 1.15 }}>
              Utilize os Canais de Atendimento e Conecte-se com quem Entende
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.6, margin: '0 0 3rem' }}>
              Nossa equipe de especialistas está à sua disposição para conversar sobre o mercado de franquias, varejo e gestão no Brasil.
            </p>

            {/* Channels (Phone / Email) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem', color: 'var(--gray-900)' }}>Telefone/WhatsApp</h3>
                  <a href="https://wa.me/5511999911777" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>
                    (11) 99991-1777
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem', color: 'var(--gray-900)' }}>E-mail</h3>
                  <a href="mailto:contato@negocioefranquia.com.br" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>
                    contato@negocioefranquia.com.br
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Address Cards (Rectangular) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {unidades.map((unidade, idx) => (
            <div key={idx} className="card-hover" style={{ 
              background: 'var(--background)',
              border: '1px solid var(--gray-200)',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--gray-900)' }}>{unidade.cidade}</h3>
                <p style={{ color: 'var(--gray-600)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{unidade.endereco}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Seção Final - Vamos Conversar */}
      <section style={{ background: 'var(--gray-50)', padding: '6rem 0', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gray-900)', margin: '0 0 1.5rem' }}>
              Vamos conversar?
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.7, margin: '0 0 2.5rem' }}>
              Estamos sempre abertos a novas conexões, pautas, parcerias, oportunidades comerciais e iniciativas que contribuam para o fortalecimento dos mercados de franquias, varejo e shopping centers no Brasil.
            </p>
            <Link href="https://wa.me/5511999911777" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--brand-primary)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 20px rgba(14, 77, 122, 0.2)'
            }}
            className="card-hover">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
