import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'N&F Play | Multimídia',
  description: 'Hub de conteúdo multimídia da Negócios e Franquias.',
};

export default function NFPlayPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* 1. Header da Seção */}
      <section className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--brand-primary)' }}>▶</span> N&F Play
        </h1>
        
        {/* Filtros Skeleton */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
          {['Todos', 'Podcasts', 'Entrevistas', 'Programas', 'Coberturas', 'Shorts'].map((filter, idx) => (
            <div 
              key={filter} 
              style={{ 
                background: idx === 0 ? '#fff' : 'rgba(255,255,255,0.1)', 
                color: idx === 0 ? '#000' : '#fff',
                padding: '0.5rem 1.25rem', 
                borderRadius: '30px', 
                fontWeight: 600,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {filter}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Destaque Principal (Hero Multimídia) */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', background: '#1a1a1a', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Fundo simulando um vídeo */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, transparent 60%)', zIndex: 1 }} />
          
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ background: 'var(--brand-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 0.8rem', borderRadius: '4px', textTransform: 'uppercase', width: 'fit-content' }}>
              Formato Skeleton
            </span>
            <div style={{ height: '3rem', width: '80%', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }} />
            <div style={{ height: '1rem', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
            <div style={{ height: '1rem', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Play
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trilhos de Conteúdo */}
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Trilho 1: Em Alta (16:9) */}
        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem', color: '#fff' }}>Em Alta / Recomendados</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: '#222', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>00:00</div>
                </div>
                <div style={{ height: '1.2rem', width: '90%', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
                <div style={{ height: '0.9rem', width: '50%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Trilho 2: Podcasts (1:1) */}
        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem', color: '#fff' }}>Podcasts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', background: '#333', borderRadius: '12px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Ícone de Audio Placeholder */}
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} />
                  </div>
                </div>
                <div style={{ height: '1rem', width: '80%', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
                <div style={{ height: '0.8rem', width: '40%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Trilho 3: Shorts (9:16) */}
        <section>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem', color: '#fff' }}>Shorts & Pílulas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ width: '100%', aspectRatio: '9/16', background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }} />
                <div style={{ height: '0.9rem', width: '90%', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', marginTop: '0.25rem' }} />
              </div>
            ))}
          </div>
        </section>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
