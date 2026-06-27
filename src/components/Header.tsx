'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';import { PROJETOS_ESPECIAIS } from '@/lib/especiais';

const NEWS_CATEGORIES = [
  { label: 'Franquias', href: '/franquias' },
  { label: 'Gestão', href: '/gestao' },
  { label: 'Mercado', href: '/mercado' },
  { label: 'Negócios', href: '/negocios' },
  { label: 'Shopping Centers', href: '/shoppings' },
  { label: 'Varejo', href: '/varejo' },
  { label: 'Tecnologia e Inovação', href: '/tecnologia-e-inovacao' },
];

const NAV_LINKS = [
  { label: 'N&F Play', href: '/play' },
  { label: 'Na Lata', href: '/na-lata' },
  { label: 'Anuncie', href: '/anuncie' },
  { label: 'Quem Somos', href: '/quem-somos' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsMobileOpen, setNewsMobileOpen] = useState(false);
  const [especiaisMobileOpen, setEspeciaisMobileOpen] = useState(false);

  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--gray-200)',
        position: 'relative',
        zIndex: 50
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
        className="container main-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.25rem 1.5rem',
          position: 'relative',
          minHeight: '140px',
        }}
      >
        {/* Hamburger (left) */}
        <button
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            color: 'var(--gray-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
          className="hamburger-main"
        >
          {menuOpen ? (
            <svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4L18 18M18 4L4 18" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h16M3 11h16M3 16h16" />
            </svg>
          )}
        </button>

        {/* Logo (centered) */}
        <div className="logo-container" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <Link href="/quem-somos" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.webp"
              alt="Negócio e Franquia"
              width={385}
              height={105}
              style={{ height: '96px', width: 'auto', objectFit: 'contain' }}
              className="logo-img"
              priority
            />
          </Link>
        </div>

        {/* CTA + Search (right) */}
        <div className="right-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
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

          {/* Search Button */}
          <button
            aria-label="Pesquisar"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--gray-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem',
              borderRadius: '50%',
              transition: 'color 200ms, background 200ms',
            }}
            className="search-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main navigation menu (bottom) */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid var(--gray-200)',
          background: '#fff',
          overflow: 'visible',
        }}
        className="bottom-nav"
      >
        {/* Link Home */}
        <Link
          href="/"
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--gray-800)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'color 200ms',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
          className="nav-link"
        >
          <div style={{ width: '6px', height: '6px', background: 'var(--brand-primary)', transform: 'rotate(45deg)' }} />
          Home
        </Link>

        {/* Dropdown Notícias */}
        <div className="dropdown" style={{ position: 'relative', padding: '0.5rem 0' }}>
          <Link
            href="/noticias"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--gray-800)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 200ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
            className="nav-link"
          >
            <div style={{ width: '6px', height: '6px', background: 'var(--brand-primary)', transform: 'rotate(45deg)' }} />
            Notícias
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </Link>
          <div className="dropdown-content">
            {NEWS_CATEGORIES.map((cat) => (
              <Link key={cat.href} href={cat.href} className="dropdown-item">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Dropdown Especiais */}
        <div className="dropdown" style={{ position: 'relative', padding: '0.5rem 0' }}>
          <Link
            href="/especiais"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--gray-800)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 200ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
            className="nav-link"
          >
            <div style={{ width: '6px', height: '6px', background: 'var(--brand-primary)', transform: 'rotate(45deg)' }} />
            Especiais
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </Link>
          <div className="dropdown-content">
            {PROJETOS_ESPECIAIS.map((projeto) => (
              <Link key={projeto.slug} href={`/especiais/${projeto.slug}`} className="dropdown-item">
                {projeto.nome}
              </Link>
            ))}
          </div>
        </div>

        {/* Outros Links */}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--gray-800)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 200ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            className="nav-link"
          >
            <div style={{ width: '6px', height: '6px', background: 'var(--brand-primary)', transform: 'rotate(45deg)' }} />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu (Dropdown from hamburger) */}
      {menuOpen && (
        <div
          style={{
            background: '#fff',
            padding: '1rem 1.5rem',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            zIndex: 100,
            borderTop: '1px solid var(--gray-200)',
          }}
        >
          {/* Home Mobile */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--gray-800)',
              padding: '0.75rem 0',
              borderBottom: '1px solid var(--gray-100)',
              textDecoration: 'none',
            }}
          >
            Home
          </Link>

          {/* Notícias Mobile */}
          <div>
            <button
              onClick={() => setNewsMobileOpen(!newsMobileOpen)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--gray-800)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--gray-100)',
                cursor: 'pointer'
              }}
            >
              Notícias
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: newsMobileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {newsMobileOpen && (
              <div style={{ paddingLeft: '1rem', background: 'var(--gray-50)' }}>
                {NEWS_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--gray-700)',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--gray-100)',
                      textDecoration: 'none',
                    }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Especiais Mobile */}
          <div>
            <button
              onClick={() => setEspeciaisMobileOpen(!especiaisMobileOpen)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--gray-800)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--gray-100)',
                cursor: 'pointer'
              }}
            >
              Especiais
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: especiaisMobileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {especiaisMobileOpen && (
              <div style={{ paddingLeft: '1rem', background: 'var(--gray-50)' }}>
                {PROJETOS_ESPECIAIS.map((projeto) => (
                  <Link
                    key={projeto.slug}
                    href={`/especiais/${projeto.slug}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--gray-700)',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--gray-100)',
                      textDecoration: 'none',
                    }}
                  >
                    {projeto.nome}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontSize: '0.95rem',
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
        </div>
      )}

      <style>{`
        .nav-link:hover {
          color: var(--brand-primary) !important;
        }
        .cta-btn:hover {
          background: var(--brand-secondary) !important;
        }
        .search-btn:hover {
          color: var(--brand-primary) !important;
          background: var(--gray-50) !important;
        }

        /* Dropdown CSS */
        .dropdown-content {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          background-color: #fff;
          min-width: 200px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
          z-index: 100;
          top: 100%;
          left: 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--gray-200);
          transform: translateY(10px);
          transition: all 0.2s ease-in-out;
        }
        .dropdown:hover .dropdown-content {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }
        .dropdown-item {
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          color: var(--gray-800);
          font-size: 0.85rem;
          font-weight: 600;
          border-bottom: 1px solid var(--gray-100);
          transition: background 0.2s, color 0.2s;
        }
        .dropdown-item:last-child {
          border-bottom: none;
        }
        .dropdown-item:hover {
          background-color: var(--gray-50);
          color: var(--brand-primary);
        }

        @media (max-width: 900px) {
          .bottom-nav { display: none !important; }
          .main-header {
            padding: 1rem 1rem !important;
            min-height: auto !important;
            display: grid !important;
            grid-template-columns: auto 1fr auto;
            grid-template-areas: 
              "hamburger logo search"
              "anuncie anuncie anuncie";
            gap: 1rem;
            align-items: center;
          }
          .hamburger-main {
            grid-area: hamburger;
            padding: 0 !important;
          }
          .logo-container {
            grid-area: logo;
            position: relative !important;
            left: auto !important;
            transform: none !important;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .logo-img {
            height: 42px !important;
            width: auto !important;
          }
          .right-actions {
            display: contents !important;
          }
          .search-btn {
            grid-area: search;
            justify-self: end;
          }
          .cta-btn {
            grid-area: anuncie;
            display: flex !important;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
