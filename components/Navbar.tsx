'use client'
import { useState, useEffect, useRef, useCallback, type FocusEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

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
      { label: 'B\u00e4sta golfbanorna', href: '/guide/golf-mallorca-guide' },
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
      { label: 'Familjesemester', href: '/guide/mallorca-med-barn' },
      { label: 'B\u00e4sta str\u00e4nderna', href: '/guide/basta-stranderna-mallorca' },
      { label: 'Restauranger Palma', href: '/guide/basta-restauranger-palma' },
      { label: 'B\u00e4sta golfbanorna', href: '/guide/golf-mallorca-guide' },
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

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Synliga, fokuserbara element i en behållare (dolda undermenyer räknas inte). */
function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => el.getClientRects().length > 0,
  )
}

function isCurrent(pathname: string | null, href: string) {
  return pathname === href
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  const closeMobile = useCallback((returnFocus: boolean) => {
    setMobileOpen(false)
    setMobileAccordion(null)
    if (returnFocus) hamburgerRef.current?.focus()
  }, [])

  // Stäng mobilmenyn när fönstret blir desktopbrett
  useEffect(() => {
    if (!mobileOpen) return
    const handleResize = () => {
      if (window.innerWidth > 768) closeMobile(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen, closeMobile])

  // Mobilmenyn är en modal dialog: lås sidans scroll, flytta in fokus och fånga Tab
  useEffect(() => {
    if (!mobileOpen) return
    const menu = mobileMenuRef.current
    const { body, documentElement } = document
    const prevBody = body.style.overflow
    const prevHtml = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'

    if (menu) getFocusable(menu)[0]?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMobile(true)
        return
      }
      if (e.key !== 'Tab' || !menu) return
      const items = getFocusable(menu)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!menu.contains(active)) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      body.style.overflow = prevBody
      documentElement.style.overflow = prevHtml
    }
  }, [mobileOpen, closeMobile])

  // Desktop: stäng dropdown vid klick utanför och med Esc (fokus tillbaka till triggern)
  useEffect(() => {
    if (openDropdown === null) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const wrapper = wrapperRefs.current[openDropdown]
      if (wrapper && wrapper.contains(document.activeElement)) {
        triggerRefs.current[openDropdown]?.focus()
      }
      setOpenDropdown(null)
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [openDropdown])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const handleMouseEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(i)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  // Stäng dropdownen när fokus lämnar den (t.ex. Tab vidare till nästa menypunkt)
  const handleWrapperBlur = (i: number) => (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null
    if (!next || !e.currentTarget.contains(next)) {
      setOpenDropdown(current => (current === i ? null : current))
    }
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
          <Link href="/" onClick={() => closeMobile(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                ref={el => { wrapperRefs.current[i] = el }}
                className="nav-dropdown-wrapper"
                onMouseEnter={item.children ? () => handleMouseEnter(i) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
                onBlur={item.children ? handleWrapperBlur(i) : undefined}
              >
                {item.children ? (
                  <button
                    ref={el => { triggerRefs.current[i] = el }}
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
                  <Link
                    href={item.href}
                    className="navbar-desktop-link nav-dropdown-trigger"
                    aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Alltid i DOM:en (även i SSR) – döljs med hidden när menyn är stängd */}
                {item.children && (
                  <div
                    id={`nav-menu-${i}`}
                    className="nav-dropdown-menu"
                    hidden={openDropdown !== i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="nav-dropdown-item"
                        aria-current={isCurrent(pathname, child.href) ? 'page' : undefined}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            ref={hamburgerRef}
            className="hamburger"
            type="button"
            onClick={() => (mobileOpen ? closeMobile(false) : setMobileOpen(true))}
            aria-controls="mobilmeny"
            aria-haspopup="dialog"
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
            <span aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
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
            {/* Synlig text = tillgängligt namn ("Meny"/"Stäng"), tillståndet anges av aria-expanded */}
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
              {mobileOpen ? 'Stäng' : 'Meny'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobilmenyn: modal dialog. Renderas alltid (SSR-synliga länkar) och döljs med hidden när den är stängd */}
      <div
        id="mobilmeny"
        ref={mobileMenuRef}
        className="mobile-menu-fullscreen"
        role="dialog"
        aria-modal="true"
        aria-label="Meny"
        hidden={!mobileOpen}
      >
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
                      <path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div id={`mobilmeny-${i}`} className="mobile-menu-subitems" hidden={mobileAccordion !== i}>
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="mobile-menu-subitem"
                          aria-current={isCurrent(pathname, child.href) ? 'page' : undefined}
                          onClick={() => closeMobile(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="mobile-menu-link"
                  aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                  onClick={() => closeMobile(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <button type="button" className={styles.closeButton} onClick={() => closeMobile(true)}>
            St&auml;ng menyn
          </button>
      </div>
    </>
  )
}
