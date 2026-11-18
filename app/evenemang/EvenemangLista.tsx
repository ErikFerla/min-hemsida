'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IconCalendar, IconPin } from '@/components/Icons';
import type { Evenemang, Kategori } from './data';
import styles from './EvenemangLista.module.css';

const kategorier = ['Alla', 'Sport', 'Musik', 'Kultur', 'Mat & Dryck', 'Marknad', 'Familj'];

// Etikettfärg per kategori – nyanserna i modulen klarar AA-kontrast mot vit text.
const kategoriKlass: Record<Kategori, string> = {
  'Sport': styles.kat_Sport,
  'Musik': styles.kat_Musik,
  'Kultur': styles.kat_Kultur,
  'Mat & Dryck': styles.kat_Mat,
  'Marknad': styles.kat_Marknad,
  'Familj': styles.kat_Familj,
};

const sektioner: { rubrik: string; kategorier: string[] }[] = [
  { rubrik: 'Sport', kategorier: ['Sport'] },
  { rubrik: 'Musik & Kultur', kategorier: ['Musik', 'Kultur'] },
  { rubrik: 'Mat & Dryck', kategorier: ['Mat & Dryck'] },
  { rubrik: 'Marknader', kategorier: ['Marknad'] },
  { rubrik: 'Familj', kategorier: ['Familj'] },
];

export default function EvenemangLista({ kommande, passerade }: { kommande: Evenemang[]; passerade: Evenemang[] }) {
  const [aktiv, setAktiv] = useState('Alla');
  const filtrera = (lista: Evenemang[]) => (aktiv === 'Alla' ? lista : lista.filter(e => e.kategori === aktiv));
  const filtrerade = filtrera(kommande);
  const filtreradeArkiv = filtrera(passerade);

  return (
    <div className={styles.main}>
      <div className={styles.filterRow}>
        {kategorier.map(k => (
          <button
            key={k}
            type="button"
            className={styles.filterButton}
            onClick={() => setAktiv(k)}
            aria-pressed={aktiv === k}
          >
            {k}
          </button>
        ))}
        <span className={styles.count} aria-live="polite">
          {filtrerade.length} kommande evenemang
        </span>
      </div>

      {aktiv === 'Alla' ? (
        sektioner.map(sektion => {
          const items = kommande.filter(e => sektion.kategorier.includes(e.kategori));
          if (items.length === 0) return null;
          return (
            <section key={sektion.rubrik} className={styles.section}>
              <h2 className={styles.sectionTitle}>{sektion.rubrik}</h2>
              <EventGrid items={items} />
            </section>
          );
        })
      ) : filtrerade.length > 0 ? (
        <EventGrid items={filtrerade} />
      ) : (
        <p className={styles.empty}>Inga kommande evenemang i den här kategorin just nu.</p>
      )}

      {filtreradeArkiv.length > 0 && (
        <section className={styles.archive}>
          <details>
            <summary className={styles.archiveSummary}>
              Har redan varit ({filtreradeArkiv.length})
            </summary>
            <p className={styles.archiveText}>
              Evenemang som redan har ägt rum. Många återkommer varje år – bra att känna till när du planerar nästa resa.
            </p>
            <EventGrid items={filtreradeArkiv} passerad />
          </details>
        </section>
      )}
    </div>
  );
}

function EventGrid({ items, passerad = false }: { items: Evenemang[]; passerad?: boolean }) {
  return (
    <div className={styles.grid}>
      {items.map(e => (
        <article key={e.key} className={styles.card}>
          <div className={styles.media}>
            <Image src={e.bild} alt={e.namn} width={600} height={180} sizes="(max-width: 700px) 100vw, 440px" className={passerad ? `${styles.image} ${styles.imagePast}` : styles.image} />
            <span className={`${styles.label} ${kategoriKlass[e.kategori] ?? ''}`}>
              {e.kategori}
            </span>
            {(passerad || e.ejFastställt) && (
              <span className={styles.status}>
                {passerad ? 'Har varit' : 'Datum ej fastställt'}
              </span>
            )}
          </div>
          <div className={styles.body}>
            <div className={styles.meta}>
              <span className={styles.metaItem}><IconCalendar size={12} /> {e.datum}</span>
              <span className={styles.metaItem}><IconPin size={12} /> {e.plats}</span>
            </div>
            <h3 className={styles.cardTitle}>{e.namn}</h3>
            <p className={styles.description}>{e.beskrivning}</p>
            <a
              href={e.länk}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Läs mer ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
