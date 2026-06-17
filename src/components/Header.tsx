'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Notícias', href: '/' },
  { label: 'Franquias', href: '/franquias' },
  { label: 'Varejo', href: '/varejo' },
  { label: 'Shopping Centers', href: '/shoppings' },
  { label: 'Gestão', href: '/gestao' },
  { label: 'Quem Somos', href: '/quem-somos' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        borderBottom: '1px solid var(--gray-200)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'box-shadow 250ms, background 250ms',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: 'var(--brand-primary)',
          padding: '0.35rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.02em' }}>
          O ecossistema de inteligência em franquias, varejo e shopping centers
        </span>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a
            href="https://negocioefranquia.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', textDecoration: 'none', fontWeight: 500 }}
          >
            Site Institucional
          </a>
        </div>
      </div>

      {/* Main header */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          gap: '2rem',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image
            src="/logo.webp"
            alt="Negócio e Franquia"
            width={160}
            height={48}
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--gray-700)',
                padding: '0.5rem 0.85rem',
                borderRadius: '4px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 200ms, background 200ms',
                whiteSpace: 'nowrap',
              }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link
            href="/anuncie"
            style={{
              background: 'var(--brand-primary)',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '0.55rem 1.1rem',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              transition: 'background 200ms',
              whiteSpace: 'nowrap',
            }}
            className="cta-btn"
          >
            Anuncie
          </Link>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Abrir menu"
            id="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: 'var(--gray-800)',
            }}
            className="hamburger"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4L18 18M18 4L4 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--gray-200)',
            background: '#fff',
            padding: '1rem 1.5rem',
          }}
          className="mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--gray-800)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--gray-100)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/anuncie"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: '1rem',
              background: 'var(--brand-primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '0.75rem',
              textAlign: 'center',
              borderRadius: '4px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Anuncie
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu { display: none !important; }
        }
        .nav-link:hover {
          color: var(--brand-primary) !important;
          background: var(--gray-50) !important;
        }
        .cta-btn:hover {
          background: var(--brand-secondary) !important;
        }
      `}</style>
    </header>
  );
}
