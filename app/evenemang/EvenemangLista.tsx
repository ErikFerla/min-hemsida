'use client';
import { useState } from 'react';
import { KATEGORIER, type Evenemang, type Kategori } from './data';
import EvenemangKort from './EvenemangKort';
import styles from './EvenemangLista.module.css';

const MÅNADER = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

function månadsrubrik(iso: string) {
  return `${MÅNADER[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
}

/** Hela evenemangslistan, grupperad per månad och filtrerbar per kategori. All text finns i SSR-HTML. */
export default function EvenemangLista({ evenemang }: { evenemang: Evenemang[] }) {
  const [aktiv, setAktiv] = useState<Kategori | 'Alla'>('Alla');
  const filtrerade = aktiv === 'Alla' ? evenemang : evenemang.filter(e => e.kategori === aktiv);

  const grupper: { rubrik: string; items: Evenemang[] }[] = [];
  for (const e of filtrerade) {
    const rubrik = månadsrubrik(e.start);
    const sista = grupper[grupper.length - 1];
    if (sista && sista.rubrik === rubrik) sista.items.push(e);
    else grupper.push({ rubrik, items: [e] });
  }

  return (
    <div>
      <div className={styles.filterRow} role="group" aria-label="Filtrera på kategori">
        {(['Alla', ...KATEGORIER] as const).map(k => (
          <button key={k} type="button" className={styles.filterButton} onClick={() => setAktiv(k)} aria-pressed={aktiv === k}>
            {k}
          </button>
        ))}
        <span className={styles.count} aria-live="polite">
          {filtrerade.length} evenemang
        </span>
      </div>

      {grupper.length === 0 ? (
        <p className={styles.empty}>Inga kommande evenemang i den här kategorin just nu.</p>
      ) : (
        grupper.map(g => (
          <section key={g.rubrik} className={styles.month} aria-labelledby={`m-${g.items[0].start.slice(0, 7)}`}>
            <h3 id={`m-${g.items[0].start.slice(0, 7)}`} className={styles.monthTitle}>
              {g.rubrik}
            </h3>
            <div className={styles.grid}>
              {g.items.map(e => (
                <EvenemangKort key={e.key} e={e} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
