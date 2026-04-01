'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { text: 'Städer', href: '/byar' },
  { text: 'Stränder', href: '/strander' },
  { text: 'Sevärdheter', href: '/sevardheter' },
  { text: 'Mat & Vin', href: '/mat' },
  { text: 'Aktiviteter', href: '/aktiviteter' },
  { text: 'Väder', href: '/vader' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: '#e8e8e8', borderBottom: '1px solid #d0d0d0', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em' }}>
            <span style={{ color: '#c0392b' }}>GRYTES</span>{' '}
            <span style={{ color: '#f5a623' }}>MALLORCA</span>{' '}
            <span style={{ color: '#111' }}>GUIDE</span>
          </span>
        </Link>

        {/* Desktop meny */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', color: '#111', textDecoration: 'none' }}>
              {l.text}
            </Link>
          ))}
          <Link href="/kontakt" style={{ background: '#7a3b00', color: 'white', padding: '8px 20px', borderRadius: '6px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none' }}>
            PLANERA DIN RESA
          </Link>
        </div>

        {/* Hamburgermeny knapp */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', opacity: open ? 0 : 1 }} />
          <span style={{ width: '24px', height: '2px', background: '#111', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </div>

      {/* Mobil dropdown */}
      {open && (
        <div style={{ background: '#e8e8e8', borderTop: '1px solid #d0d0d0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.1em', color: '#111', textDecoration: 'none' }}>
              {l.text}
            </Link>
          ))}
          <Link href="/kontakt" onClick={() => setOpen(false)} style={{ background: '#7a3b00', color: 'white', padding: '12px 20px', borderRadius: '6px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', textDecoration: 'none', textAlign: 'center' }}>
            PLANERA DIN RESA
          </Link>
        </div>
      )}
    </nav>
  );
}

