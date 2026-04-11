'use client'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Städer & byar', href: '/byar' },
  { label: 'Stränder', href: '/strandar' },
  { label: 'Sevärdheter', href: '/sevardheter' },
  { label: 'Mat & Vin', href: '/mat' },
  { label: 'Aktiviteter', href: '/aktiviteter' },
  { label: 'Guider', href: '/guide' },
  { label: 'Flyg', href: '/flyg' },
  { label: 'Väder', href: '/vader' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Stäng meny vid resize till desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Förhindra scroll när meny är öppen
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          height: '72px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between'
        }}>

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

          {/* Desktop nav-länkar */}
          <div className="navbar-desktop-links">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="navbar-desktop-link">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="/kontakt" className="navbar-desktop-cta">
            PLANERA DIN RESA
          </a>

          {/* Hamburger-knapp — endast mobil */}
          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={open}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}/>
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: open ? 0 : 1
            }}/>
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'transform 0.3s',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
            }}/>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown meny */}
      {open && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
          background: 'white', zIndex: 999, overflowY: 'auto'
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '18px 24px',
                fontSize: '1.05rem', fontWeight: 500, color: '#1f2937',
                textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ padding: '20px 24px' }}>
            <a href="/kontakt" onClick={() => setOpen(false)}
              style={{
                display: 'block', textAlign: 'center', background: '#1f2937',
                color: 'white', padding: '14px', borderRadius: '4px',
                textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontSize: '0.85rem'
              }}
            >
              Planera din resa
            </a>
          </div>
        </div>
      )}
    </>
  )
}