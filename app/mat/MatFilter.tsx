'use client';
import { useState } from 'react';

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
      <div className="mat-filter-scroll" role="group" aria-label="Filtrera restauranger" style={{ display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', padding: '2px 2px 4px', marginBottom: 24 }}>
        {kategorier.map((k) => {
          const active = filter === k;
          return (
            <button key={k} type="button" aria-pressed={active} onClick={() => setFilter(k)} style={{ minHeight: 40, padding: '0 18px', borderRadius: 999, border: active ? '1px solid #383a46' : '1px solid #E2D8C8', background: active ? '#383a46' : 'white', color: active ? 'white' : '#383a46', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.16s ease' }}>
              {k}
            </button>
          );
        })}
      </div>
      <p style={{ color: '#6B7280', fontSize: '0.82rem', margin: '0 0 20px' }} aria-live="polite">{antal} restauranger</p>
    </>
  );
}
