import Link from 'next/link';
import { LogoLockup } from '@/components/Logo';
import SiteFooterAccordion from '@/components/SiteFooterAccordion';
import styles from './SiteFooter.module.css';

export type FooterSection = {
  heading: string;
  links: ReadonlyArray<readonly [label: string, href: string]>;
};

// Samma grupper och namn som huvudmenyn (components/Navbar.tsx), en länk per sida.
export const FOOTER_SECTIONS: ReadonlyArray<FooterSection> = [
  {
    heading: 'Med barn',
    links: [
      ['Översikt', '/barn'],
      ['Vattenparker', '/barn/vattenparker'],
      ['Djurparker & akvarier', '/barn/djurparker-och-akvarier'],
      ['Inomhus & regn', '/barn/inomhus-och-regn'],
      ['Grottor', '/barn/grottor'],
      ['Äventyrsparker', '/barn/aventyrsparker'],
      ['Museer & kultur', '/barn/museer-och-kultur'],
      ['Natur & utomhus', '/barn/natur-och-utomhus'],
      ['Aktiv dag', '/barn/aktivitet-och-rorelse'],
      ['Familjesemester', '/guide/mallorca-med-barn'],
    ],
  },
  {
    heading: 'Utforska',
    links: [
      ['Stränder', '/strandar'],
      ['Städer & byar', '/byar'],
      ['Mat & vin', '/mat'],
      ['Vingårdar', '/vingardar'],
      ['Aktiviteter', '/aktiviteter'],
      ['Golf', '/aktiviteter/golf'],
      ['Vandring & cykling', '/vandring-och-cykling'],
      ['Båtutflykter & Cabrera', '/batutflykter-och-cabrera'],
      ['Sevärdheter', '/sevardheter'],
      ['Evenemang', '/evenemang'],
      ['Marknader', '/marknader'],
    ],
  },
  {
    heading: 'Guider',
    links: [
      ['Översikt', '/guider'],
      ['Mallorca för par', '/mallorca-for-par'],
      ['Mallorca på vintern', '/mallorca-pa-vintern'],
      ['Dagsturer utan bil', '/dagsturer-utan-bil'],
      ['Bästa stränderna', '/guide/basta-stranderna-mallorca'],
      ['Restauranger i Palma', '/guide/basta-restauranger-palma'],
      ['Bästa golfbanorna', '/guide/golf-mallorca-guide'],
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
      ['Bästa tiden att resa', '/guide/basta-tid-resa-mallorca'],
      ['Väder', '/vader'],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
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

          {/* Kolumnerna 2–5 – från FOOTER_SECTIONS (samma data som mobilens accordion) */}
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
