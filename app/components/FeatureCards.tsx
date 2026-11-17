import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './FeatureCards.module.css';

const svgProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const featureItems: { icon: ReactNode; title: string; desc: string; href: string }[] = [
  { icon: <svg {...svgProps}><path d="M2 12c0-5.5 4-10 10-10s10 4.5 10 10"/><path d="M4.5 17.5C6 16 8 15 10 16s4 2 6 1 4-2 4-2"/></svg>, title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
  { icon: <svg {...svgProps}><circle cx="9" cy="7" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 21v-2a6 6 0 0112 0v2M15 21v-1.5a4 4 0 016-3.4"/></svg>, title: 'Med barn', desc: 'Grunda stränder, grottor, djurparker och vattenparker för hela familjen', href: '/barn' },
  { icon: <svg {...svgProps}><path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4a3 3 0 016 0v4"/><rect x="9" y="10" width="2" height="3"/><rect x="13" y="10" width="2" height="3"/></svg>, title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
  { icon: <svg {...svgProps}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>, title: 'Mat & vin', desc: 'Restaurangtips, vingårdar att besöka och lokala smaker', href: '/mat' },
  { icon: <svg {...svgProps}><path d="M12 2v20M12 2l8 4-8 4"/><ellipse cx="12" cy="21" rx="9" ry="1.5"/></svg>, title: 'Golf', desc: '22 banor i världsklass – hitta rätt bana för din nivå', href: '/aktiviteter/golf' },
  { icon: <svg {...svgProps}><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2 2-6.3z"/></svg>, title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
];

export default function FeatureCards() {
  // Visas bara på desktop (.desktopOnly i app/page.tsx). Mobil använder MobileFeatureCards.
  return (
    <div className={styles.grid}>
      {featureItems.map((item) => (
        <Link key={item.title} href={item.href} className={styles.card}>
          {/* Ikon */}
          <div aria-hidden="true" className={styles.icon}>{item.icon}</div>

          {/* Titel + beskrivning */}
          <div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.desc}>{item.desc}</div>
          </div>

          <div aria-hidden="true" className={styles.more}>LÄS MER →</div>
        </Link>
      ))}
    </div>
  );
}
