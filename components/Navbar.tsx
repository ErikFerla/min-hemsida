'use client'
import { useState, useEffect, useLayoutEffect, useRef, useCallback, type FocusEvent, type PointerEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'
import { LogoMark } from '@/components/Logo'

interface NavLink {
  label: string
  href: string
}

interface NavItem {
  label: string
  /** Områdets översiktssida. Finns den blir menypunkten en länk med en separat knapp för undermenyn. */
  href?: string
  children: NavLink[]
  /** Valfri andra grupp med egen rubrik (t.ex. familjeguiderna under Med barn) – egen kolumn på dator */
  extra?: { heading: string; links: NavLink[] }
}

// En länk per sida (inga dubbletter mellan grupperna). Översiktslänken heter "Översikt" i alla grupper.
const navItems: NavItem[] = [
  {
    label: 'Med barn',
    href: '/barn',
    children: [
      { label: '\u00d6versikt', href: '/barn' },
      { label: 'Vattenparker', href: '/barn/vattenparker' },
      { label: 'Djurparker & akvarier', href: '/barn/djurparker-och-akvarier' },
      { label: 'Inomhus & regn', href: '/barn/inomhus-och-regn' },
      { label: 'Grottor', href: '/barn/grottor' },
      { label: '\u00c4ventyrsparker', href: '/barn/aventyrsparker' },
      { label: 'Museer & kultur', href: '/barn/museer-och-kultur' },
      { label: 'Natur & utomhus', href: '/barn/natur-och-utomhus' },
      { label: 'Aktiv dag', href: '/barn/aktivitet-och-rorelse' },
    ],
    extra: {
      heading: 'Familjeguider',
      links: [
        { label: 'Familjesemester', href: '/guide/mallorca-med-barn' },
        { label: 'M\u00e5nad f\u00f6r m\u00e5nad', href: '/guide/mallorca-med-barn-manad-for-manad' },
        { label: 'Str\u00e4nderna f\u00f6r barn', href: '/guide/stranderna-for-barn' },
        { label: 'Regniga dagar', href: '/guide/regniga-dagar-med-barn' },
      ],
    },
  },
  {
    label: 'Str\u00e4nder',
    href: '/strandar',
    children: [
      { label: '\u00d6versikt', href: '/strandar' },
      { label: 'B\u00e4sta str\u00e4nderna', href: '/guide/basta-stranderna-mallorca' },
      { label: 'B\u00e5tutflykter & Cabrera', href: '/batutflykter-och-cabrera' },
    ],
  },
  {
    label: 'St\u00e4der & byar',
    href: '/byar',
    children: [
      { label: '\u00d6versikt', href: '/byar' },
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
    label: 'Mat & vin',
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
      { label: 'Golf', href: '/aktiviteter/golf' },
      { label: 'B\u00e4sta golfbanorna', href: '/guide/golf-mallorca-guide' },
      { label: 'Vandring & cykling', href: '/vandring-och-cykling' },
      { label: 'Sev\u00e4rdheter', href: '/sevardheter' },
      { label: 'Evenemang', href: '/evenemang' },
      { label: 'Marknader', href: '/marknader' },
    ],
  },
  {
    label: 'Guider',
    href: '/guider',
    children: [
      { label: '\u00d6versikt', href: '/guider' },
      { label: 'Mallorca f\u00f6r par', href: '/mallorca-for-par' },
      { label: 'Mallorca p\u00e5 vintern', href: '/mallorca-pa-vintern' },
      { label: 'Dagsturer utan bil', href: '/dagsturer-utan-bil' },
    ],
  },
  {
    // Ingen översiktssida – hela menypunkten öppnar undermenyn
    label: 'Planera',
    children: [
      { label: 'Resplan dag f\u00f6r dag', href: '/resplan' },
      { label: 'Var ska man bo?', href: '/var-ska-man-bo' },
      { label: 'Flyg', href: '/flyg' },
      { label: 'Hyrbil & transport', href: '/hyrbil-och-transport' },
      { label: 'Budget & priser', href: '/budget-och-priser' },
      { label: 'Praktiskt & s\u00e4kerhet', href: '/praktiskt' },
      { label: 'B\u00e4sta tiden att resa', href: '/guide/basta-tid-resa-mallorca' },
      { label: 'V\u00e4der', href: '/vader' },
    ],
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

/**
 * aria-current för en länk i en undermeny: inte på "Översikt" när den pekar på samma sida som
 * menypunktens egen länk (då bär redan menypunkten aria-current, och sidan ska bara markeras en gång).
 */
function childCurrent(pathname: string | null, item: NavItem, href: string) {
  return href !== item.href && isCurrent(pathname, href) ? 'page' : undefined
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Öppnades den öppna undermenyn av muspekaren (hover)? Då ska ett klick på pilen inte stänga den.
  const openedByHover = useRef(false)
  const navRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const menuRefs = useRef<(HTMLDivElement | null)[]>([])

  // Stäng menyerna när adressen ändras, även via webbläsarens bakåt-/framåtknapp
  // (justering under rendering i stället för setState i en effekt).
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
    setMobileAccordion(null)
    setOpenDropdown(null)
  }

  const closeMobile = useCallback((returnFocus: boolean) => {
    setMobileOpen(false)
    setMobileAccordion(null)
    if (returnFocus) hamburgerRef.current?.focus()
  }, [])

  // Stäng mobilmenyn när fönstret blir desktopbrett
  useEffect(() => {
    if (!mobileOpen) return
    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMobile(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen, closeMobile])

  // Mobilmenyn är en modal dialog: lås sidans scroll, flytta in fokus och fånga Tab
  useEffect(() => {
    if (!mobileOpen) return
    const menu = mobileMenuRef.current
    // Lås bara <html>: overflow på <body> gör body till scrollcontainer (html/body har
    // overflow-x: clip), och då slutar den sticky navbaren fungera när sidan är scrollad.
    const { documentElement } = document
    const prevHtml = documentElement.style.overflow
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

  // Undermenyn får aldrig hamna utanför fönstret: de sista menypunkterna högerjusteras i CSS,
  // och här mäts den öppna menyn och vänds åt andra hållet om den ändå sticker ut (t.ex. vid zoom).
  useLayoutEffect(() => {
    if (openDropdown === null) return
    const menu = menuRefs.current[openDropdown]
    if (!menu) return
    menu.style.left = ''
    menu.style.right = ''
    const margin = 8
    const rect = menu.getBoundingClientRect()
    const viewport = document.documentElement.clientWidth
    if (rect.right > viewport - margin) {
      menu.style.left = 'auto'
      menu.style.right = '0'
      if (menu.getBoundingClientRect().left < margin) {
        // Får inte plats åt något håll: lägg den så långt till höger det går utan att klippas
        menu.style.right = `${menu.getBoundingClientRect().left - margin}px`
      }
    } else if (rect.left < margin) {
      menu.style.left = '0'
      menu.style.right = 'auto'
    }
  }, [openDropdown])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Hover öppnar bara för mus: på pekskärm skickar webbläsaren mushändelser direkt före klicket,
  // och då skulle klicket på pilen stänga menyn som hovern just öppnat.
  const handlePointerEnter = (i: number) => (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openDropdown !== i) {
      openedByHover.current = true
      setOpenDropdown(i)
    }
  }

  const handlePointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  // Klick/tryck/Enter på pilen: öppnar, eller stänger en meny som redan var öppnad med klick.
  // En meny som just öppnats av hover stannar öppen (klicket "låser" den i stället för att stänga).
  const handleToggle = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openDropdown === i && !openedByHover.current) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(i)
    }
    openedByHover.current = false
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
      <nav ref={navRef} aria-label="Huvudnavigation" className={styles.nav}>
        <div className={styles.bar}>

          {/* Logo */}
          <Link href="/" onClick={() => closeMobile(false)} className={styles.logo}>
            <LogoMark className={styles.logoMark} />
            <span className={styles.logoName}>MyMallorca</span>
          </Link>

          {/* Desktop nav with dropdowns */}
          <div className={styles.links}>
            {navItems.map((item, i) => {
              const chevron = (
                <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
              const toggleProps = {
                ref: (el: HTMLButtonElement | null) => { triggerRefs.current[i] = el },
                type: 'button' as const,
                onClick: () => handleToggle(i),
                'aria-expanded': openDropdown === i,
                'aria-controls': `nav-menu-${i}`,
              }
              return (
                <div
                  key={item.label}
                  ref={el => { wrapperRefs.current[i] = el }}
                  className={styles.dropdown}
                  onPointerEnter={handlePointerEnter(i)}
                  onPointerLeave={handlePointerLeave}
                  onBlur={handleWrapperBlur(i)}
                >
                  {item.href ? (
                    // Områden med översiktssida: namnet är en länk, pilen en egen knapp för undermenyn
                    <div className={styles.split} data-open={openDropdown === i || undefined}>
                      <Link
                        href={item.href}
                        className={`${styles.link} ${styles.hubLink}`}
                        aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                      <button {...toggleProps} className={styles.toggle} aria-label={`Undermeny: ${item.label}`}>
                        {chevron}
                      </button>
                    </div>
                  ) : (
                    <button {...toggleProps} className={styles.link}>
                      {item.label}
                      {chevron}
                    </button>
                  )}

                  {/* Alltid i DOM:en (även i SSR) – döljs med hidden när menyn är stängd */}
                  <div
                    id={`nav-menu-${i}`}
                    ref={el => { menuRefs.current[i] = el }}
                    className={item.extra ? `${styles.menu} ${styles.menuWide}` : styles.menu}
                    hidden={openDropdown !== i}
                  >
                    <div className={styles.menuCol}>
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.menuItem}
                          aria-current={childCurrent(pathname, item, child.href)}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    {item.extra && (
                      <div className={styles.menuCol} role="group" aria-labelledby={`nav-menu-${i}-rubrik`}>
                        <p id={`nav-menu-${i}-rubrik`} className={styles.menuHeading}>{item.extra.heading}</p>
                        {item.extra.links.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={styles.menuItem}
                            aria-current={childCurrent(pathname, item, child.href)}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            ref={hamburgerRef}
            className={styles.hamburger}
            type="button"
            onClick={() => (mobileOpen ? closeMobile(false) : setMobileOpen(true))}
            aria-controls="mobilmeny"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
          >
            <span aria-hidden="true" className={styles.bars}>
              <span className={styles.barLine}/>
              <span className={styles.barLine}/>
              <span className={styles.barLine}/>
            </span>
            {/* Synlig text = tillgängligt namn ("Meny"/"Stäng"), tillståndet anges av aria-expanded */}
            <span className={styles.hamburgerLabel}>
              {mobileOpen ? 'Stäng' : 'Meny'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobilmenyn: modal dialog. Renderas alltid (SSR-synliga länkar) och döljs med hidden när den är stängd */}
      <div
        id="mobilmeny"
        ref={mobileMenuRef}
        className={styles.mobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Meny"
        hidden={!mobileOpen}
      >
          {navItems.map((item, i) => {
            const subLink = (child: NavLink) => (
              <Link
                key={child.href}
                href={child.href}
                className={styles.mobileSubitem}
                aria-current={childCurrent(pathname, item, child.href)}
                onClick={() => closeMobile(false)}
              >
                {child.label}
              </Link>
            )
            const chevron = (
              <svg className={styles.mobileChevron} width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )
            const toggleProps = {
              type: 'button' as const,
              onClick: () => setMobileAccordion(mobileAccordion === i ? null : i),
              'aria-expanded': mobileAccordion === i,
              'aria-controls': `mobilmeny-${i}`,
            }
            return (
              <div key={item.label} className={styles.mobileGroup}>
                {item.href ? (
                  // Namnet går direkt till översikten, pilen fäller ut undersidorna
                  <div className={styles.mobileRow}>
                    <Link
                      href={item.href}
                      className={styles.mobileLink}
                      aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                      onClick={() => closeMobile(false)}
                    >
                      {item.label}
                    </Link>
                    <button {...toggleProps} className={styles.mobileToggle} aria-label={`Undermeny: ${item.label}`}>
                      {chevron}
                    </button>
                  </div>
                ) : (
                  <button {...toggleProps} className={styles.mobileTrigger}>
                    <span>{item.label}</span>
                    {/* Samma 56 px breda ruta som pilknapparna ovan, så att alla pilar står i linje */}
                    <span className={styles.mobileChevronBox}>{chevron}</span>
                  </button>
                )}
                <div id={`mobilmeny-${i}`} className={styles.mobileSubitems} hidden={mobileAccordion !== i}>
                  {item.children.map(subLink)}
                  {item.extra && (
                    <div role="group" aria-labelledby={`mobilmeny-${i}-rubrik`}>
                      <p id={`mobilmeny-${i}-rubrik`} className={styles.mobileHeading}>{item.extra.heading}</p>
                      {item.extra.links.map(subLink)}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <button type="button" className={styles.closeButton} onClick={() => closeMobile(true)}>
            St&auml;ng menyn
          </button>
      </div>
    </>
  )
}
