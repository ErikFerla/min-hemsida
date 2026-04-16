'use client';
import { useState } from 'react';
import { IconPalm } from '@/components/Icons';

const grupper = [
  {
    rubrik: 'UTFORSKA',
    länkar: [['Städer & Byar', '/byar'], ['Stränder', '/strandar'], ['Sevärdheter', '/sevardheter'], ['Mat & Vin', '/mat'], ['Barnvänligt', '/barn']],
  },
  {
    rubrik: 'POPULÄRT',
    länkar: [['Väder', '/vader'], ['Evenemang', '/evenemang'], ['Sevärdheter', '/sevardheter'], ['Planera din resa', '/kontakt'], ['Se alla stränder', '/strandar']],
  },
  {
    rubrik: 'STÄDER',
    länkar: [['Palma de Mallorca', '/palma-de-mallorca'], ['Sóller', '/soller'], ['Porto Colom', '/porto-colom'], ['Santanyí', '/santanyi'], ['Se alla städer', '/byar']],
  },
];

export default function FooterAccordion() {
  const [öppen, setÖppen] = useState<number | null>(null);

  return (
    <div className="footer-accordion">
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.1em', color: '#fefefb', margin: '0 0 8px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>DIN GUIDE PÅ MALLORCA <IconPalm size={20} /></p>
        <p style={{ color: 'rgba(254,254,251,0.7)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>Din kompletta guide till Mallorca på svenska.</p>
      </div>
      {grupper.map((g, i) => (
        <div key={i} style={{ borderTop: '1px solid rgba(254,254,251,0.14)' }}>
          <button
            onClick={() => setÖppen(öppen === i ? null : i)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.05rem', letterSpacing: '0.1em',
              color: '#e86c7f', minHeight: '44px',
            }}
          >
            {g.rubrik}
            <span style={{ color: 'rgba(254,254,251,0.6)', fontSize: '0.75rem', transform: öppen === i ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
          </button>
          {öppen === i && (
            <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {g.länkar.map(([text, href]) => (
                <a key={href} href={href} style={{ color: 'rgba(254,254,251,0.85)', fontSize: '0.95rem', textDecoration: 'none', padding: '4px 0', minHeight: '44px', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e86c7f')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(254,254,251,0.85)')}
                >
                  {text}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
