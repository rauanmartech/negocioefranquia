import { constructMetadata, siteConfig } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata(
  'Na Lata | Negócio & Franquia',
  'A voz dos franqueados: Experiências reais, erros, acertos e a pura autenticidade de quem vive o franchising na pele.',
  undefined,
  `${siteConfig.url}/na-lata`
);

export default function NaLataPage() {
  const quadros = [
    'O que ninguém me contou',
    'Meu maior erro',
    'Valeu a pena?',
    'O que eu faria diferente',
    'O conselho que eu daria',
    'Minha história na franquia'
  ];

  return (
    <div style={{ background: '#fcfcfc', color: 'var(--gray-900)', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Cabeçalho Editorial */}
      <section className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem', textAlign: 'center', borderBottom: '1px solid var(--gray-200)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', margin: '0 0 1rem', color: 'var(--brand-primary)' }}>
          Na Lata
        </h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          A voz dos franqueados: Experiências reais, erros, acertos e a pura autenticidade de quem vive o franchising na pele.
        </p>
      </section>

      {/* 2. Destaque Principal (Capa Confessional) */}
      <section className="container" style={{ marginTop: '4rem', marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', background: '#fff', borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid var(--gray-100)' }}>
          
          {/* Lado A: Avatar/Foto */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '350px', aspectRatio: '1/1', background: 'var(--gray-100)', borderRadius: '50%', border: '8px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
          </div>

          {/* Lado B: Aspa e Texto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ color: 'var(--brand-primary)', fontSize: '4rem', lineHeight: 0.5, fontFamily: 'serif', marginTop: '1rem' }}>
              &ldquo;
            </div>
            
            {/* Título/Aspa Skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ height: '2.5rem', width: '100%', background: 'var(--gray-200)', borderRadius: '6px' }} />
              <div style={{ height: '2.5rem', width: '85%', background: 'var(--gray-200)', borderRadius: '6px' }} />
              <div style={{ height: '2.5rem', width: '60%', background: 'var(--gray-200)', borderRadius: '6px' }} />
            </div>

            {/* Autor Skeleton */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brand-primary)', opacity: 0.1 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ height: '1rem', width: '150px', background: 'var(--gray-300)', borderRadius: '4px' }} />
                <div style={{ height: '0.8rem', width: '100px', background: 'var(--gray-200)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Mosaico de Experiências (Quadros Temáticos) */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)' }}>Histórias e Relatos</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {quadros.map((quadro, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--gray-200)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Tag do Quadro */}
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', background: 'rgba(var(--brand-primary-rgb), 0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px', width: 'fit-content' }}>
                {quadro}
              </span>

              {/* Corpo da aspa/história skeleton */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ height: '1.25rem', width: '100%', background: 'var(--gray-100)', borderRadius: '4px' }} />
                <div style={{ height: '1.25rem', width: '90%', background: 'var(--gray-100)', borderRadius: '4px' }} />
                <div style={{ height: '1.25rem', width: '60%', background: 'var(--gray-100)', borderRadius: '4px' }} />
              </div>

              {/* Rodapé (Avatar + Nome) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--gray-200)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gray-200)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ height: '0.8rem', width: '120px', background: 'var(--gray-300)', borderRadius: '3px' }} />
                  <div style={{ height: '0.6rem', width: '80px', background: 'var(--gray-200)', borderRadius: '3px' }} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
