'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const subpages = [
  { label: 'Porto Colom', href: '/porto-colom' },
  { label: 'Santanyi', href: '/santanyi' },
  { label: 'Porto Petro', href: '/porto-petro' },
  { label: 'Soller', href: '/soller' },
  { label: 'Palma de Mallorca', href: '/palma-de-mallorca' },
];

const strandLinks = [
  { label: 'Barnvänliga stränder', href: '/strander#barnvanliga' },
  { label: 'Högst betyg', href: '/strander#hogst-betyg' },
  { label: 'Kräver promenad', href: '/strander#promenad' },
  { label: 'Minst besökare', href: '/strander#minst-besokare' },
];

const aktivitetLinks = [
  { label: 'Golf', href: '/aktiviteter/golf' },
  { label: 'Barn på Mallorca', href: '/barn' },
  { label: 'Vandring', href: '/aktiviteter#vandring' },
  { label: 'Vattensport', href: '/aktiviteter#vattensport' },
  { label: 'Cykling', href: '/aktiviteter#cykling' },
];

const navLinks = [
  { label: 'Städer', href: '/byar', dropdown: subpages },
  { label: 'Stränder', href: '/strander', dropdown: strandLinks },
  { label: 'Sevärdheter', href: '/sevardheter' },
  { label: 'Mat', href: '/mat' },
  { label: 'Aktiviteter', href: '/aktiviteter', dropdown: aktivitetLinks },
  { label: 'Väder', href: '/vader' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span style={{color: '#c60b1e'}}>GRYTES&nbsp;</span>
          <span style={{color: '#ffc400'}}>MALLORCA&nbsp;</span>
          <span style={{color: '#c60b1e'}}>GUIDE</span>
        </Link>
        <ul className={styles.links + (menuOpen ? ' ' + styles.mobileOpen : '')}>
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.href} className={styles.hasDropdown}
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <span className={styles.link}>{link.label}</span>
                {openDropdown === link.label && (
                  <ul className={styles.dropdown}>
                    {link.dropdown.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className={styles.dropdownLink}>{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>{link.label}</Link>
              </li>
            )
          )}
        </ul>
        <Link href="/kontakt" className={styles.ctaBtn}>Planera din resa</Link>
        <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
