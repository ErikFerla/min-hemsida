import Link from 'next/link';
import { LogoLockup } from '@/components/Logo';
import SiteFooterAccordion from '@/components/SiteFooterAccordion';
import styles from './SiteFooter.module.css';

export type FooterSection = {
  heading: string;
  links: ReadonlyArray<readonly [label: string, href: string]>;
};

// Samma sidor, namn och ordning som huvudmenyn (components/Navbar.tsx), en länk per sida.
// Med barn, Guider och Planera motsvarar menyns grupper (familjeguiderna sist under Med barn).
// "Utforska" samlar menyns Stränder, Städer & byar, Mat & vin och Aktiviteter – med deras
// undersidor utom de enskilda orterna, som nås via Städer & byar.
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
      ['Månad för månad', '/guide/mallorca-med-barn-manad-for-manad'],
      ['Stränderna för barn', '/guide/stranderna-for-barn'],
      ['Regniga dagar', '/guide/regniga-dagar-med-barn'],
    ],
  },
  {
    heading: 'Utforska',
    links: [
      ['Stränder', '/strandar'],
      ['Bästa stränderna', '/guide/basta-stranderna-mallorca'],
      ['Båtutflykter & Cabrera', '/batutflykter-och-cabrera'],
      ['Städer & byar', '/byar'],
      ['Mat & vin', '/mat'],
      ['Bästa restauranger i Palma', '/guide/basta-restauranger-palma'],
      ['Vingårdar', '/vingardar'],
      ['Aktiviteter', '/aktiviteter'],
      ['Golf', '/aktiviteter/golf'],
      ['Bästa golfbanorna', '/guide/golf-mallorca-guide'],
      ['Vandring & cykling', '/vandring-och-cykling'],
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
              Mallorca på svenska: stränder, byar, barnaktiviteter, mat, golf och vin.
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
