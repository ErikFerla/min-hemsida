'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
      { label: 'Ving\u00e5rdar', href: '/vingardar' },
    ],
  },
  {
    label: 'Aktiviteter',
    href: '/aktiviteter',
    children: [
      { label: '\u00d6versikt', href: '/aktiviteter' },
      { label: 'Barnv\u00e4nligt', href: '/barn' },
      { label: 'Golf', href: '/aktiviteter/golf' },
      { label: 'Golfguide', href: '/guide/golf-mallorca-guide' },
      { label: 'Sev\u00e4rdheter', href: '/sevardheter' },
      { label: 'Evenemang', href: '/evenemang' },
    ],
  },
  {
    label: 'Guider',
    href: '/guider',
    children: [
      { label: 'Alla guider', href: '/guider' },
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
      { label: 'B\u00e4sta tiden att resa', href: '/guide/basta-tid-resa-mallorca' },
      { label: 'Evenemang', href: '/evenemang' },
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
      <nav ref={navRef} aria-label="Huvudnavigation" style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: '#eeede4',
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
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22 Q8 14 12 18 Q16 22 20 14 Q24 6 28 10" stroke="#993335" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="28" cy="10" r="3" fill="#993335"/>
            </svg>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: '700', color: '#383a46', letterSpacing: '0.02em', lineHeight: '1' }}>
                MyMallorca
              </div>
              <div style={{ fontSize: '9px', color: '#993335', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>
                Din kompletta reseguide
              </div>
            </div>
          </Link>

          {/* Desktop nav with dropdowns */}
          <div className="navbar-desktop-links">
            {navItems.map((item, i) => (
              <div
                key={item.href}
                className="nav-dropdown-wrapper"
                onMouseEnter={() => item.children ? handleMouseEnter(i) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={`navbar-desktop-link nav-dropdown-trigger${openDropdown === i ? ' active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                    aria-expanded={openDropdown === i}
                    aria-controls={`nav-menu-${i}`}
                  >
                    {item.label}
                    <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transition: 'transform 0.2s', transform: openDropdown === i ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <a href={item.href} className="navbar-desktop-link nav-dropdown-trigger">
                    {item.label}
                  </a>
                )}

                {/* Alltid i DOM:en (\u00e4ven i SSR) \u2013 d\u00f6ljs med hidden n\u00e4r menyn \u00e4r st\u00e4ngd */}
                {item.children && (
                  <div
                    id={`nav-menu-${i}`}
                    className="nav-dropdown-menu"
                    hidden={openDropdown !== i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  >
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

          {/* Hamburger button — mobile only */}
          <button
            className="hamburger"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-controls="mobilmeny"
            aria-label={mobileOpen ? 'St\u00e4ng meny' : '\u00d6ppna meny'}
            aria-expanded={mobileOpen}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: '1.5px solid #993335',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '8px 10px',
              zIndex: 1001,
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <span style={{
                display: 'block', width: '24px', height: '2.5px',
                background: '#993335', borderRadius: '2px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none',
              }}/>
              <span style={{
                display: 'block', width: '24px', height: '2.5px',
                background: '#993335', borderRadius: '2px',
                transition: 'opacity 0.3s',
                opacity: mobileOpen ? 0 : 1,
              }}/>
              <span style={{
                display: 'block', width: '24px', height: '2.5px',
                background: '#993335', borderRadius: '2px',
                transition: 'transform 0.3s',
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
              }}/>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#993335',
              marginTop: '4px',
              fontWeight: 600,
              lineHeight: 1,
            }}>
              {mobileOpen ? 'St\u00e4ng' : 'Meny'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu with accordion */}
      {/* Mobilmenyn renderas alltid (SSR-synliga l\u00e4nkar) och d\u00f6ljs med hidden n\u00e4r den \u00e4r st\u00e4ngd */}
      <div id="mobilmeny" className="mobile-menu-fullscreen" hidden={!mobileOpen}>
          {navItems.map((item, i) => (
            <div key={item.href} className="mobile-menu-group">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="mobile-menu-trigger"
                    onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                    aria-expanded={mobileAccordion === i}
                    aria-controls={`mobilmeny-${i}`}
                  >
                    <span>{item.label}</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: mobileAccordion === i ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l5 5 5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div id={`mobilmeny-${i}`} className="mobile-menu-subitems" hidden={mobileAccordion !== i}>
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
      </div>
    </>
  )
}