import Link from 'next/link';
import { LogoLockup } from '@/components/Logo';
import SiteFooterAccordion from '@/components/SiteFooterAccordion';
import styles from './SiteFooter.module.css';

export type FooterSection = {
  heading: string;
  links: ReadonlyArray<readonly [label: string, href: string]>;
};

export const FOOTER_SECTIONS: ReadonlyArray<FooterSection> = [
  {
    heading: 'Utforska',
    links: [
      ['Städer & byar', '/byar'],
      ['Stränder', '/strandar'],
      ['Sevärdheter', '/sevardheter'],
      ['Mat & vin', '/mat'],
      ['Vingårdar', '/vingardar'],
      ['Golf', '/aktiviteter/golf'],
      ['Aktiviteter', '/aktiviteter'],
      ['Vandring & cykling', '/vandring-och-cykling'],
      ['Båtutflykter & Cabrera', '/batutflykter-och-cabrera'],
      ['Evenemang', '/evenemang'],
      ['Marknader', '/marknader'],
      ['Väder', '/vader'],
    ],
  },
  {
    heading: 'Guider',
    links: [
      ['Bästa tiden att resa', '/guide/basta-tid-resa-mallorca'],
      ['Familjesemester', '/guide/mallorca-med-barn'],
      ['Bästa stränderna', '/guide/basta-stranderna-mallorca'],
      ['Restauranger i Palma', '/guide/basta-restauranger-palma'],
      ['Bästa golfbanorna', '/guide/golf-mallorca-guide'],
      ['Mallorca för par', '/mallorca-for-par'],
      ['Mallorca på vintern', '/mallorca-pa-vintern'],
      ['Dagsturer utan bil', '/dagsturer-utan-bil'],
      ['Alla guider →', '/guider'],
    ],
  },
  {
    heading: 'Planera',
    links: [
      ['Resplan dag för dag', '/resplan'],
      ['Var ska man bo?', '/var-ska-man-bo'],
      ['Flyg', '/flyg'],
      ['Hyrbil & transport', '/hyrbil-och-transport'],
      ['Budget & priser', '/budget-och-priser'],
      ['Praktiskt & säkerhet', '/praktiskt'],
      ['Städer & byar →', '/byar'],
    ],
  },
  {
    heading: 'Barnvänligt',
    links: [
      ['Mallorca med barn', '/barn'],
      ['Vattenparker', '/barn/vattenparker'],
      ['Djurparker & akvarier', '/barn/djurparker-och-akvarier'],
      ['Inomhus & regn', '/barn/inomhus-och-regn'],
      ['Grottor', '/barn/grottor'],
      ['Äventyrsparker', '/barn/aventyrsparker'],
      ['Museer & kultur', '/barn/museer-och-kultur'],
      ['Natur & utomhus', '/barn/natur-och-utomhus'],
      ['Aktiv dag', '/barn/aktivitet-och-rorelse'],
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
            <Link href="/" className={styles.brandLink}>
              <LogoLockup className={styles.brand} markClassName={styles.brandMark} nameClassName={styles.brandName} />
            </Link>
            <p className={styles.about}>
              Din kompletta guide till Mallorca på svenska. Insidertips, stränder, mat, golf och mycket mer.
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
          {' · '}
          <Link href="/bildkrediter" className={styles.legalLink}>Bildkrediter</Link>
          {' · '}
          <a href="mailto:info@mymallorca.se" className={styles.legalLink}>info@mymallorca.se</a>
        </p>
      </div>
    </footer>
  );
}
