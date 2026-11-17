'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IconPalm } from '@/components/Icons';
import type { FooterSection } from '@/components/SiteFooter';

export default function SiteFooterAccordion({ sections }: { sections: ReadonlyArray<FooterSection> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="footer-accordion">
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em', color: '#fefefb', margin: '0 0 8px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          DIN GUIDE PÅ MALLORCA <IconPalm size={20} />
        </p>
        <p style={{ color: 'rgba(254,254,251,0.7)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
          Din kompletta guide till Mallorca på svenska.
        </p>
      </div>
      {sections.map((section, i) => (
        <div key={section.heading} style={{ borderTop: '1px solid rgba(254,254,251,0.14)' }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`footer-section-${i}`}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: '1.05rem', letterSpacing: '0.1em',
              color: '#f08a9a', minHeight: '44px',
            }}
          >
            {section.heading}
            <span aria-hidden="true" style={{ color: 'rgba(254,254,251,0.6)', fontSize: '0.75rem', transform: open === i ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
          </button>
          <div id={`footer-section-${i}`} hidden={open !== i} style={{ paddingBottom: '16px', display: open === i ? 'flex' : 'none', flexDirection: 'column', gap: '12px' }}>
              {section.links.map(([label, href]) => (
                <Link
                  key={`${section.heading}-m-${href}-${label}`}
                  href={href}
                  style={{ color: 'rgba(254,254,251,0.85)', fontSize: '0.95rem', textDecoration: 'none', padding: '4px 0', minHeight: '44px', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e86c7f')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(254,254,251,0.85)')}
                >
                  {label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
