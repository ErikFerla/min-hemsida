'use client';
import { useState } from 'react';
import styles from './MatFilter.module.css';

// Restaurangkorten serverrenderas i page.tsx med data-kategori. Filtret döljer
// bara de kort som inte matchar, via en genererad <style>-regel.

type Props = {
  /** id på listan med restaurangkort */
  listId: string;
  kategorier: string[];
  /** Kategorin för varje restaurang, för räknaren */
  allaKategorier: string[];
};

export default function MatFilter({ listId, kategorier, allaKategorier }: Props) {
  const [filter, setFilter] = useState('Alla');
  const antal = filter === 'Alla' ? allaKategorier.length : allaKategorier.filter((k) => k === filter).length;
  const css = filter === 'Alla' ? '' : `#${listId} > [data-kategori]:not([data-kategori="${filter}"]) { display: none; }`;

  return (
    <>
      {css && <style>{css}</style>}
      <div className={styles.row} role="group" aria-label="Filtrera restauranger">
        {kategorier.map((k) => {
          const active = filter === k;
          return (
            <button key={k} type="button" aria-pressed={active} onClick={() => setFilter(k)} className={styles.button}>
              {k}
            </button>
          );
        })}
      </div>
      <p className={styles.count} aria-live="polite">{antal} restauranger</p>
    </>
  );
}
