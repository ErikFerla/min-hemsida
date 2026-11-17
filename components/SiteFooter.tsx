import Link from 'next/link';
import { IconPalm } from '@/components/Icons';
import SiteFooterAccordion from '@/components/SiteFooterAccordion';
import styles from './SiteFooter.module.css';

export type FooterSection = {
  heading: string;
  links: ReadonlyArray<readonly [label: string, href: string]>;
};

export const FOOTER_SECTIONS: ReadonlyArray<FooterSection> = [
  {
    heading: 'UTFORSKA',
    links: [
      ['Städer & byar', '/byar'],
      ['Stränder', '/strandar'],
      ['Sevärdheter', '/sevardheter'],
      ['Mat & vin', '/mat'],
      ['Vingårdar', '/vingardar'],
      ['Golf', '/aktiviteter/golf'],
      ['Aktiviteter', '/aktiviteter'],
      ['Evenemang', '/evenemang'],
      ['Väder', '/vader'],
    ],
  },
  {
    heading: 'GUIDER',
    links: [
      ['Bästa tiden att resa', '/guide/basta-tid-resa-mallorca'],
      ['Familjesemester', '/guide/mallorca-med-barn'],
      ['Bästa stränderna', '/guide/basta-stranderna-mallorca'],
      ['Restauranger i Palma', '/guide/basta-restauranger-palma'],
      ['Bästa golfbanorna', '/guide/golf-mallorca-guide'],
      ['Alla guider →', '/guider'],
    ],
  },
  {
    heading: 'STÄDER',
    links: [
      ['Palma de Mallorca', '/palma-de-mallorca'],
      ['Sóller', '/soller'],
      ['Valldemossa', '/valldemossa'],
      ['Alcúdia', '/alcudia'],
      ['Pollença', '/pollenca'],
      ['Porto Colom', '/porto-colom'],
      ['Se alla städer →', '/byar'],
    ],
  },
  {
    heading: 'BARNVÄNLIGT',
    links: [
      ['Mallorca med barn', '/barn'],
      ['Vattenparker', '/barn/vattenparker'],
      ['Djurparker & akvarier', '/barn/djurparker-och-akvarier'],
      ['Inomhus & regn', '/barn/inomhus-och-regn'],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      {/* Accentlinje överst */}
      <div className={styles.topLine} />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 — Brand */}
          <div>
            <p className={styles.brand}>
              DIN GUIDE PÅ MALLORCA <IconPalm size={22} />
            </p>
            <p className={styles.about}>
              Din kompletta guide till Mallorca på svenska. Insider-tips, stränder, mat, golf och mycket mer.
            </p>
          </div>

          {/* Columns 2–4 — rendered from shared FOOTER_SECTIONS */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className={styles.heading}>
                {section.heading}
              </p>
              <div className={styles.links}>
                {section.links.map(([label, href]) => (
                  <Link key={`${section.heading}-${href}-${label}`} href={href} className={styles.link}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion — client component, same data */}
        <SiteFooterAccordion sections={FOOTER_SECTIONS} />
      </div>

      <div className={styles.bottom}>
        <p className={styles.small}>© 2026 mymallorca.se</p>
        <p className={styles.small}>
          <Link href="/integritetspolicy" className={styles.legalLink}>Integritetspolicy</Link>
          {' · '}
          <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
        </p>
      </div>
    </footer>
  );
}
