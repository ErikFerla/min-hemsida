'use client';
import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  {
    text: 'Städer',
    href: '/byar',
    submenu: [
      { text: 'Palma', href: '/palma-de-mallorca' },
      { text: 'Sóller', href: '/soller' },
      { text: 'Porto Colom', href: '/porto-colom' },
      { text: 'Santanyi', href: '/santanyi' },
      { text: 'Porto Petro', href: '/porto-petro' },
      { text: 'Se alla städer', href: '/byar' },
    ],
  },
  {
    text: 'Stränder',
    href: '/strandar',
    submenu: [
      { text: '🧭 Norra Mallorca', href: '/strandar' },
      { text: '🧭 Östra Mallorca', href: '/strandar' },
      { text: '🧭 Södra Mallorca', href: '/strandar' },
      { text: '🧭 Västra Mallorca', href: '/strandar' },
      { text: '🏖️ Se alla stränder', href: '/strandar' },
    ],
  },
  {
    text: 'Sevärdheter',
    href: '/sevardheter',
    submenu: [
      { text: 'La Seu katedralen', href: '/sevardheter' },
      { text: 'Valldemossa', href: '/sevardheter' },
      { text: 'Bellver slott', href: '/sevardheter' },
      { text: 'Serra de Tramuntana', href: '/sevardheter' },
      { text: 'Se alla sevärdheter', href: '/sevardheter' },
    ],
  },
  {
    text: 'Mat & Vin',
    href: '/mat',
    submenu: [
      { text: 'Restauranger', href: '/mat' },
      { text: 'Vingårdar', href: '/mat' },
      { text: 'Michelinkrogar', href: '/mat' },
      { text: 'Lokala marknader', href: '/mat' },
      { text: 'Se allt om mat & vin', href: '/mat' },
    ],
  },
  {
    text: 'Aktiviteter',
    href: '/aktiviteter',
    submenu: [
      { text: 'Golf', href: '/aktiviteter/golf' },
      { text: 'Vandring', href: '/aktiviteter' },
      { text: 'Vattensport', href: '/aktiviteter' },
      { text: 'Barn & Familj', href: '/barn' },
      { text: 'Se alla aktiviteter', href: '/aktiviteter' },
    ],
  },
  {
    text: 'Väder',
    href: '/vader',
    submenu: [
      { text: 'Palma', href: '/vader' },
      { text: 'Alcúdia', href: '/vader' },
      { text: 'Sóller', href: '/vader' },
      { text: 'Se väderprognos', href: '/vader' },
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav style={{ background: '#e8e8e8', borderBottom: '1px solid #d0d0d0', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: '#111' }}>
            DIN GUIDE PÅ MALLORCA 🌴
          </span>
        </Link>

        {/* Desktop meny */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navItems.map(item => (
            <div
              key={item.text}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown(item.text)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  color: '#111',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '18px 0',
                }}
              >
                {item.text}
                <span style={{ fontSize: '0.6rem', marginTop: '2px' }}>▼</span>
              </Link>

              {activeDropdown === item.text && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                  padding: '8px 0',
                  minWidth: '200px',
                  zIndex: 2000,
                }}>
                  {item.submenu.map(sub => (
                    <Link
                      key={sub.text}
                      href={sub.href}
                      style={{
                        display: 'block',
                        padding: '10px 20px',
                        fontSize: '0.9rem',
                        color: sub.text.startsWith('Se alla') || sub.text.includes('Se ') ? '#c0392b' : '#111',
                        fontWeight: sub.text.startsWith('Se alla') || sub.text.includes('Se ') ? '700' : '400',
                        textDecoration: 'none',
                        borderTop: sub.text.startsWith('Se alla') || sub.text.includes('Se ') ? '1px solid #eee' : 'none',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {sub.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/kontakt" style={{
            background: '#7a3b00',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '6px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            PLANERA DIN RESA
          </Link>

          {/* Hamburgermeny knapp */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              display: 'none',
              flexDirection: 'column' as const,
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobil dropdown */}
      {menuOpen && (
        <div style={{ background: '#e8e8e8', borderTop: '1px solid #d0d0d0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.1em', color: '#111', textDecoration: 'none' }}>
              {item.text}
            </Link>
          ))}
          <Link href="/kontakt" onClick={() => setMenuOpen(false)} style={{ background: '#7a3b00', color: 'white', padding: '12px 20px', borderRadius: '6px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', textDecoration: 'none', textAlign: 'center' }}>
            PLANERA DIN RESA
          </Link>
        </div>
      )}
    </nav>
  );
}

