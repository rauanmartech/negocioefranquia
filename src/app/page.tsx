import { Suspense } from 'react';
import Link from 'next/link';
import { getRecentPosts, getPostsByCategory } from '@/lib/api';
import { HeroArticle, SecondaryArticleCard, StandardArticleCard, GridArticleCard } from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Negócios e Franquias | Plataforma de Negócios',
  description: 'Conteúdo, mídia e relacionamento para os mercados de franquias, varejo e shopping centers.',
};

// ─── Skeletons ────────────────────────────────────────────────────────────────
function SectionSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.75rem' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 6 }} />
          <div className="skeleton" style={{ height: 14, width: '80%' }} />
          <div className="skeleton" style={{ height: 14, width: '60%' }} />
        </div>
      ))}
    </div>
  );
}

// ─── Section 2: Destaques (Hero + 4 Secundárias) ─────────────────────────────
async function DestaquesNoticias() {
  const posts = await getRecentPosts(5);
  if (!posts.length) return null;

  const [hero, ...secundarias] = posts;

  return (
    <section style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '2rem' }}>
        <div>
          <HeroArticle article={hero} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {secundarias.map((a) => (
            <SecondaryArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Banner Premium ────────────────────────────────────────────────
function BannerPremium() {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <AdBanner width={970} height={250} />
    </section>
  );
}

// ─── Section 4: Últimas Notícias ─────────────────────────────────────────────
async function UltimasNoticias() {
  const allPosts = await getRecentPosts(13);
  const latest = allPosts.slice(5);

  if (!latest.length) return null;

  return (
    <section style={{ marginBottom: '4rem', padding: '2rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <div className="section-label" style={{ borderBottom: '2px solid var(--brand-primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Últimas Notícias</h2>
        <Link href="/noticias" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}>Ver todas →</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {latest.map((a) => (
          <StandardArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

// ─── Editorias com Banner Lateral ─────────────────────────────────────────────
async function EditoriaComBanner({ slug, title }: { slug: string, title: string }) {
  const posts = await getPostsByCategory(slug, 6);
  if (!posts.length) return null;

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div className="section-label" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gray-900)', borderLeft: '4px solid var(--brand-primary)', paddingLeft: '1rem' }}>{title}</h2>
        <Link href={`/${slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)', textDecoration: 'none' }}>
          Ver todos →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem', alignItems: 'start' }} className="editoria-grid">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.75rem' }}>
          {posts.map((a) => (
            <GridArticleCard key={a.id} article={a} />
          ))}
        </div>

        <div style={{ 
          background: 'var(--gray-100)', 
          minHeight: '600px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px dashed var(--gray-300)'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 700, letterSpacing: '0.1em' }}>Banner Lateral</span>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>300x600 px</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: N&F Play ────────────────────────────────────────────────────────
function NFPlay() {
  return (
    <section style={{ marginBottom: '4rem', background: '#0a0a0a', color: '#fff', padding: '4rem 2rem', borderRadius: '16px' }}>
      <div className="section-label" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>N&F Play</h2>
        <span style={{ fontSize: '0.9rem', color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase' }}>Vídeos e Podcasts</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }} className="play-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ aspectRatio: '16/9', background: '#222', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #fff', marginLeft: '6px' }} />
              </div>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Em breve: Conteúdo multimídia exclusivo</h3>
            <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>Série Especial • 15 min</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Na Lata ─────────────────────────────────────────────────────────
function NaLata() {
  return (
    <section style={{ marginBottom: '4rem', padding: '3rem', background: 'var(--brand-primary)', color: '#fff', borderRadius: '12px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>NA LATA</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0, opacity: 0.9 }}>Informação direta, sem rodeios e com opinião forte.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: '#fff', color: 'var(--gray-900)', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray-200)' }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>Opinião Especialista</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Colunista Convidado</span>
              </div>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', lineHeight: 1.3 }}>Aguarde novidades exclusivas nesta seção</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: 0 }}>Análises profundas sobre o mercado em breve.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Especiais ───────────────────────────────────────────────────────
function Especiais() {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <div className="section-label" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Projetos Especiais</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="especiais-grid">
        {[1, 2].map((i) => (
          <div key={i} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', minHeight: '300px', background: 'var(--gray-800)', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ background: '#fff', color: 'var(--gray-900)', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 0.8rem', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>Patrocinado</span>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem', maxWidth: '80%' }}>Conteúdo Especial Premium (Em breve)</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>Uma área dedicada a projetos de alto valor e profundidade.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Artigos e Agenda ────────────────────────────────────────────────
function ArtigosEAgenda() {
  return (
    <section style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="artigos-agenda-grid">
      <div>
        <div className="section-label" style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Artigos e Colunas</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gray-200)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem', color: 'var(--gray-900)' }}>Título do Artigo Opinião (Em breve)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: '0 0 0.25rem' }}>Por Nome do Autor</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="section-label" style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Agenda de Eventos</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { dia: '15', mes: 'OUT', titulo: 'ABF Franchising Expo', local: 'São Paulo, SP' },
            { dia: '22', mes: 'OUT', titulo: 'Latam Retail Show', local: 'São Paulo, SP' },
            { dia: '05', mes: 'NOV', titulo: 'Fórum de Varejo', local: 'Online' }
          ].map((evento, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'var(--gray-50)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
              <div style={{ textAlign: 'center', minWidth: '50px', background: '#fff', borderRadius: '6px', padding: '0.5rem', border: '1px solid var(--gray-200)' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>{evento.mes}</span>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 900, color: 'var(--gray-900)' }}>{evento.dia}</span>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-900)', margin: '0 0 0.25rem' }}>{evento.titulo}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>📍 {evento.local}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Mais Lidas ──────────────────────────────────────────────────────
async function MaisLidas() {
  const allPosts = await getRecentPosts(20);
  const lidas = allPosts.slice(10, 16);

  if (!lidas.length) return null;

  return (
    <section style={{ marginBottom: '4rem', padding: '3rem 0', borderTop: '1px solid var(--gray-200)' }}>
      <div className="section-label" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Mais Lidas</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem' }}>
        {lidas.map((a, index) => (
          <Link key={a.id} href={`/noticia/${a.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="card-hover">
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: a.title }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {a.categories[0]?.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function NewHomePage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        <BannerPremium />

        <Suspense fallback={<SectionSkeleton />}>
          <DestaquesNoticias />
        </Suspense>

        <BannerPremium />

        <Suspense fallback={<SectionSkeleton />}>
          <UltimasNoticias />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EditoriaComBanner slug="franquias" title="Franquias" />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EditoriaComBanner slug="varejo" title="Varejo" />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EditoriaComBanner slug="shoppings" title="Shopping Centers" />
        </Suspense>

        <NFPlay />
        <NaLata />
        <Especiais />
        <ArtigosEAgenda />

        <Suspense fallback={<SectionSkeleton />}>
          <MaisLidas />
        </Suspense>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .editoria-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .play-grid, .especiais-grid, .artigos-agenda-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

