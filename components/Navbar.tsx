'use client'
import { useState, useEffect, useRef } from 'react'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Str\u00e4nder',
    href: '/strandar',
    children: [
      { label: 'Alla str\u00e4nder', href: '/strandar' },
      { label: 'B\u00e4sta str\u00e4nderna', href: '/guide/basta-stranderna-mallorca' },
    ],
  },
  {
    label: 'St\u00e4der & byar',
    href: '/byar',
    children: [
      { label: 'Alla st\u00e4der', href: '/byar' },
      { label: 'Palma de Mallorca', href: '/palma-de-mallorca' },
      { label: 'S\u00f3ller', href: '/soller' },
      { label: 'Valldemossa', href: '/valldemossa' },
      { label: 'Alc\u00fadia', href: '/alcudia' },
      { label: 'Pollen\u00e7a', href: '/pollenca' },
      { label: 'Dei\u00e0', href: '/deia' },
      { label: 'Santany\u00ed', href: '/santanyi' },
    ],
  },
  {
    label: 'Mat & Vin',
    href: '/mat',
    children: [
      { label: '\u00d6versikt', href: '/mat' },
      { label: 'B\u00e4sta restauranger i Palma', href: '/guide/basta-restauranger-palma' },
    ],
  },
  {
    label: 'Aktiviteter',
    href: '/aktiviteter',
    children: [
      { label: '\u00d6versikt', href: '/aktiviteter' },
      { label: 'Golf', href: '/aktiviteter/golf' },
      { label: 'Golfguide', href: '/guide/golf-mallorca-guide' },
    ],
  },
  {
    label: 'Guider',
    href: '/guide/basta-tid-resa-mallorca',
    children: [
      { label: 'B\u00e4sta restid', href: '/guide/basta-tid-resa-mallorca' },
      { label: 'Mallorca med barn', href: '/guide/mallorca-med-barn' },
      { label: 'B\u00e4sta str\u00e4nderna', href: '/guide/basta-stranderna-mallorca' },
      { label: 'Restauranger Palma', href: '/guide/basta-restauranger-palma' },
      { label: 'Golfguide', href: '/guide/golf-mallorca-guide' },
    ],
  },
  {
    label: 'Planera',
    href: '/flyg',
    children: [
      { label: 'Flyg', href: '/flyg' },
      { label: 'Evenemang', href: '/evenemang' },
      { label: 'Sevärdheter', href: '/sevardheter' },
    ],
  },
  {
    label: 'Väder',
    href: '/vader',
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false)
        setMobileAccordion(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Close desktop dropdown on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const handleMouseEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(i)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          height: '72px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
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
                Din guide p\u00e5 \u00f6n
              </div>
            </div>
          </a>

          {/* Desktop nav with dropdowns */}
          <div className="navbar-desktop-links">
            {navItems.map((item, i) => (
              <div
                key={item.href}
                className="nav-dropdown-wrapper"
                onMouseEnter={() => item.children ? handleMouseEnter(i) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                <button
                  className={`navbar-desktop-link nav-dropdown-trigger${openDropdown === i ? ' active' : ''}`}
                  onClick={() => {
                    if (item.children) {
                      setOpenDropdown(openDropdown === i ? null : i)
                    } else {
                      window.location.href = item.href
                    }
                  }}
                  aria-expanded={item.children ? openDropdown === i : undefined}
                  aria-haspopup={item.children ? 'true' : undefined}
                >
                  {item.label}
                  {item.children && (
                    <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '4px', transition: 'transform 0.2s', transform: openDropdown === i ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {item.children && openDropdown === i && (
                  <div className="nav-dropdown-menu" onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                    {item.children.map(child => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="nav-dropdown-item"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="/kontakt" className="navbar-desktop-cta">
            PLANERA DIN RESA
          </a>

          {/* Hamburger button — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'St\u00e4ng meny' : '\u00d6ppna meny'}
            aria-expanded={mobileOpen}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}/>
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }}/>
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#1f2937', borderRadius: '2px',
              transition: 'transform 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}/>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu with accordion */}
      {mobileOpen && (
        <div className="mobile-menu-fullscreen">
          {navItems.map((item, i) => (
            <div key={item.href} className="mobile-menu-group">
              {item.children ? (
                <>
                  <button
                    className="mobile-menu-trigger"
                    onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                    aria-expanded={mobileAccordion === i}
                  >
                    <span>{item.label}</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ transition: 'transform 0.2s', transform: mobileAccordion === i ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l5 5 5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {mobileAccordion === i && (
                    <div className="mobile-menu-subitems">
                      {item.children.map(child => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="mobile-menu-subitem"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="mobile-menu-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <div style={{ padding: '20px 24px' }}>
            <a href="/kontakt" onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', textAlign: 'center', background: '#1f2937',
                color: 'white', padding: '14px', borderRadius: '4px',
                textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontSize: '0.85rem',
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