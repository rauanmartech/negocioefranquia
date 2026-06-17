'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FOOTER_MENU = [
  {
    title: 'Editorias',
    links: [
      { label: 'Franquias', href: '/franquias' },
      { label: 'Varejo', href: '/varejo' },
      { label: 'Shopping Centers', href: '/shoppings' },
      { label: 'Gestão', href: '/gestao' },
      { label: 'Mercado', href: '/mercado' },
    ],
  },
  {
    title: 'Portal',
    links: [
      { label: 'Início', href: '/' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Anuncie', href: '/anuncie' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  {
    title: 'Links Úteis',
    links: [
      { label: 'Trabalhe Conosco', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos de Uso', href: '#' },
      { label: 'NEF Seguros', href: '#' },
    ],
  },
];

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer style={{ background: 'var(--background-dark)', color: 'rgba(255,255,255,0.85)', marginTop: 'auto' }}>
      {/* Newsletter strip */}
      <div
        style={{
          background: 'var(--brand-primary)',
          padding: '2.5rem 1.5rem',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
              Inscreva-se em nossa Newsletter
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
              Receba os principais conteúdos sobre franchising e mercado.
            </p>
          </div>
          <form
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Seu nome"
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
                minWidth: '140px',
              }}
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
                minWidth: '200px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '4px',
                background: '#fff',
                color: 'var(--brand-primary)',
                fontWeight: 700,
                fontSize: '0.825rem',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div
        className="container"
        style={{
          padding: '3rem 1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }}>
          <Image
            src="/logo.webp"
            alt="Negócio e Franquia"
            width={140}
            height={42}
            style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '1rem' }}
          />
          <p style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>
            A Negócio e Franquia é a maior referência mineira e nacional em conteúdo sobre franquias, varejo e gestão.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            {['instagram', 'linkedin', 'youtube', 'facebook'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 200ms',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
                className="social-icon"
              >
                {s[0].toUpperCase()}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ margin: '0 0 0.25rem' }}>📞 (11) 99991-1777</p>
            <p style={{ margin: 0 }}>Seg–Sex: 08h–18h</p>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_MENU.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
                margin: '0 0 1rem',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 200ms',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
          © {year} Negócio e Franquia. Todos os direitos reservados.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textDecoration: 'none' }}>Política de Privacidade</Link>
          <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textDecoration: 'none' }}>Termos de Uso</Link>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: rgba(255,255,255,0.9) !important; }
        .social-icon:hover { background: rgba(255,255,255,0.2) !important; }
      `}</style>
    </footer>
  );
}
