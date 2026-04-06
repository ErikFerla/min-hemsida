'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  {
    text: 'Städer',
    href: '/byar',
    submenu: [
      { text: 'Palma de Mallorca', href: '/palma-de-mallorca' },
      { text: 'Sóller', href: '/soller' },
      { text: 'Porto Colom', href: '/porto-colom' },
      { text: 'Port de Sóller', href: '/soller' },
      { text: 'Alcúdia', href: '/byar' },
      { text: 'Andratx', href: '/byar' },
      { text: 'Deià', href: '/byar' },
      { text: 'Artà', href: '/byar' },
      { text: 'Se alla städer →', href: '/byar' },
    ],
  },
  {
    text: 'Stränder',
    href: '/strandar',
    submenu: [
      { text: 'Norra Mallorca', href: '/strandar' },
      { text: 'Östra Mallorca', href: '/strandar' },
      { text: 'Södra Mallorca', href: '/strandar' },
      { text: 'Västra Mallorca', href: '/strandar' },
      { text: 'Se alla stränder', href: '/strandar' },
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
    text: 'Flyg',
    href: '/flyg',
    submenu: [
      { text: '✈️ Från Landvetter (GOT)', href: '/flyg' },
      { text: '✈️ Från Arlanda (ARN)', href: '/flyg' },
      { text: '✈️ Från Malmö (MMX)', href: '/flyg' },
      { text: '✈️ Från Oslo (OSL)', href: '/flyg' },
      { text: 'Sök alla flyg →', href: '/flyg' },
    ],
  },
  {
    text: 'Väder',
    href: '/vader',
    submenu: [
      { text: 'Palma', href: '/vader?stad=Palma' },
      { text: 'Porto Colom', href: '/vader?stad=Porto Colom' },
      { text: 'Port de Sóller', href: '/vader?stad=Port de Soller' },
      { text: 'Alcúdia', href: '/vader?stad=Alcudia' },
      { text: 'Andratx', href: '/vader?stad=Andratx' },
      { text: 'Deià', href: '/vader?stad=Deia' },
      { text: 'Artà', href: '/vader?stad=Arta' },
      { text: 'Se väderprognos →', href: '/vader' },
    ],
  },
];

function MobileMenuItem({ item, onClose }: { item: typeof navItems[0], onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ede5da' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.15rem', letterSpacing: '0.1em',
          color: '#1F2937', minHeight: '44px', textAlign: 'left',
        }}
      >
        {item.text}
        <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', color: '#0E7490' }}>▼</span>
      </button>
      {open && (
        <div style={{ background: '#F0EBE3', paddingBottom: '8px' }}>
          {item.submenu.map(sub => (
            <Link
              key={sub.text}
              href={sub.href}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '13px 32px',
                fontSize: '1rem', color: sub.text.includes('Se alla') || sub.text.includes('Se ') ? '#0E7490' : '#374151',
                fontWeight: sub.text.includes('Se alla') || sub.text.includes('Se ') ? '700' : '400',
                textDecoration: 'none', minHeight: '44px',
                borderTop: '1px solid #e5ddd3',
              }}
            >
              {sub.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav style={{ background: '#FDF8F2', borderBottom: '1px solid #ede5da', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box' }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22 Q8 14 12 18 Q16 22 20 14 Q24 6 28 10" stroke="#0E7490" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx="28" cy="10" r="3" fill="#F59E0B"/>
          </svg>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: '700', color: '#1F2937', letterSpacing: '0.02em', lineHeight: '1' }}>
              MyMallorca
            </div>
            <div style={{ fontSize: '9px', color: '#0E7490', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>
              Din guide på ön
            </div>
          </div>
        </a>

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
            background: '#F59E0B',
            color: '#1F2937',
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

      {/* Mobil slide-in meny */}
      {menuOpen && (
        <>
          {/* Overlay bakom menyn */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9998 }}
          />
          {/* Slide-in meny */}
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '85%', maxWidth: '360px',
            height: '100vh', background: '#FDF8F2', zIndex: 9999,
            overflowY: 'auto', display: 'flex', flexDirection: 'column',
            boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
          }}>
            {/* Menyheader */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #ede5da' }}>
              <a href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path d="M4 22 Q8 14 12 18 Q16 22 20 14 Q24 6 28 10" stroke="#0E7490" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="28" cy="10" r="3" fill="#F59E0B"/>
                </svg>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>MyMallorca</span>
              </a>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#555', padding: '4px' }}>✕</button>
            </div>

            {/* CTA knapp */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #ede5da' }}>
              <Link href="/kontakt" onClick={() => setMenuOpen(false)} style={{
                display: 'block', textAlign: 'center', padding: '14px 20px',
                background: '#F59E0B', color: '#1F2937', borderRadius: '8px',
                fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.15rem',
                letterSpacing: '0.1em', textDecoration: 'none', fontWeight: '700',
              }}>
                PLANERA DIN RESA
              </Link>
            </div>

            {/* Accordion-meny */}
            <div style={{ flex: 1, padding: '8px 0' }}>
              {navItems.map(item => (
                <MobileMenuItem key={item.text} item={item} onClose={() => setMenuOpen(false)} />
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

