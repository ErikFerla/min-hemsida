'use client';
import { useState } from 'react';
import styles from './GolfRegionFilter.module.css';

// Banorna serverrenderas i page.tsx med data-region. Filtret döljer bara de kort
// som inte matchar, via en genererad <style>-regel, så att alla banor finns i HTML:en.

type Props = {
  /** id på listan med golfbanor */
  listId: string;
  regioner: string[];
  /** Regionen för varje bana, för räknaren */
  banregioner: string[];
};

export default function GolfRegionFilter({ listId, regioner, banregioner }: Props) {
  const [aktivRegion, setAktivRegion] = useState('Alla');
  const antal = aktivRegion === 'Alla' ? banregioner.length : banregioner.filter((r) => r === aktivRegion).length;
  const css =
    aktivRegion === 'Alla'
      ? ''
      : `#${listId} > [data-region]:not([data-region="${aktivRegion}"]) { display: none; }`;

  return (
    <div className={styles.filter}>
      {css && <style>{css}</style>}
      <div role="group" aria-label="Filtrera golfbanor efter område" className={styles.group}>
        {regioner.map((r) => (
          <button key={r} type="button" aria-pressed={aktivRegion === r} onClick={() => setAktivRegion(r)} className={styles.button}>
            {r}
          </button>
        ))}
      </div>
      <p aria-live="polite" className={styles.count}>{antal} banor visas</p>
    </div>
  );
}
