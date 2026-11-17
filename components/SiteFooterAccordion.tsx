'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IconPalm } from '@/components/Icons';
import type { FooterSection } from '@/components/SiteFooter';
import styles from './SiteFooter.module.css';

export default function SiteFooterAccordion({ sections }: { sections: ReadonlyArray<FooterSection> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionIntro}>
        <p className={styles.brand}>
          DIN GUIDE PÅ MALLORCA <IconPalm size={20} />
        </p>
        <p className={styles.accordionAbout}>
          Din kompletta guide till Mallorca på svenska.
        </p>
      </div>
      {sections.map((section, i) => (
        <div key={section.heading} className={styles.section}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`footer-section-${i}`}
            className={styles.toggle}
          >
            {section.heading}
            <span aria-hidden="true" className={styles.toggleIcon}>▼</span>
          </button>
          <div id={`footer-section-${i}`} hidden={open !== i} className={styles.panel}>
              {section.links.map(([label, href]) => (
                <Link
                  key={`${section.heading}-m-${href}-${label}`}
                  href={href}
                  className={styles.panelLink}
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
