import { IconPalm } from '@/components/Icons';
import SiteFooterAccordion from '@/components/SiteFooterAccordion';

export type FooterSection = {
  heading: string;
  links: ReadonlyArray<readonly [label: string, href: string]>;
};

export const FOOTER_SECTIONS: ReadonlyArray<FooterSection> = [
  {
    heading: 'UTFORSKA',
    links: [
      ['Städer & Byar', '/byar'],
      ['Stränder', '/strandar'],
      ['Sevärdheter', '/sevardheter'],
      ['Mat & Vin', '/mat'],
      ['Golf', '/aktiviteter/golf'],
      ['Aktiviteter', '/aktiviteter'],
    ],
  },
  {
    heading: 'POPULÄRT',
    links: [
      ['Väder', '/vader'],
      ['Evenemang', '/evenemang'],
      ['Sevärdheter', '/sevardheter'],
      ['Planera din resa', '/kontakt'],
      ['Se alla stränder', '/strandar'],
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
    <footer style={{ background: '#383a46', color: '#fefefb', padding: '0' }}>
      {/* Gold top line */}
      <div style={{ borderTop: '1px solid #993335' }} />

      <div className="footer-inner">
        <div className="footer-desktop-grid">
          {/* Column 1 — Brand */}
          <div>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', color: '#fefefb', margin: '0 0 12px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              DIN GUIDE PÅ MALLORCA <IconPalm size={22} />
            </p>
            <p style={{ color: 'rgba(254,254,251,0.75)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 0 }}>
              Din kompletta guide till Mallorca på svenska. Insider-tips, stränder, mat, golf och mycket mer.
            </p>
          </div>

          {/* Columns 2–4 — rendered from shared FOOTER_SECTIONS */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#993335', fontWeight: 600, margin: '0 0 16px' }}>
                {section.heading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {section.links.map(([label, href]) => (
                  <a key={`${section.heading}-${href}-${label}`} href={href} className="footer-nav-link">{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion — client component, same data */}
        <SiteFooterAccordion sections={FOOTER_SECTIONS} />
      </div>

      <div className="footer-bottom">
        <p style={{ color: 'rgba(254,254,251,0.7)', fontSize: '13px', margin: 0 }}>© 2026 mymallorca.se</p>
        <p style={{ color: 'rgba(254,254,251,0.7)', fontSize: '13px', margin: 0 }}>Integritetspolicy · Cookies</p>
      </div>
    </footer>
  );
}
