'use client';
import { useState } from 'react';

// Banorna serverrenderas i page.tsx med data-region. Filtret döljer bara de kort
// som inte matchar, via en genererad <style>-regel, så att alla banor finns i HTML:en.

type Props = {
  /** id på listan med golfbanor */
  listId: string;
  regioner: string[];
  /** Regionen för varje bana, för räknaren */
  banregioner: string[];
};

const knappAktiv = {
  padding: '8px 20px',
  borderRadius: '20px',
  border: '2px solid #993335',
  background: '#993335',
  color: 'white',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '0.9rem',
} as const;

const knappInaktiv = {
  ...knappAktiv,
  border: '2px solid #ccc',
  background: 'white',
  color: '#444',
} as const;

export default function GolfRegionFilter({ listId, regioner, banregioner }: Props) {
  const [aktivRegion, setAktivRegion] = useState('Alla');
  const antal = aktivRegion === 'Alla' ? banregioner.length : banregioner.filter((r) => r === aktivRegion).length;
  const css =
    aktivRegion === 'Alla'
      ? ''
      : `#${listId} > [data-region]:not([data-region="${aktivRegion}"]) { display: none; }`;

  return (
    <div style={{ display: 'flex', gap: '8px 16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px' }}>
      {css && <style>{css}</style>}
      <div role="group" aria-label="Filtrera golfbanor efter område" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {regioner.map((r) => (
          <button key={r} type="button" aria-pressed={aktivRegion === r} onClick={() => setAktivRegion(r)} style={aktivRegion === r ? knappAktiv : knappInaktiv}>
            {r}
          </button>
        ))}
      </div>
      <p aria-live="polite" style={{ color: '#666', margin: 0 }}>{antal} banor visas</p>
    </div>
  );
}
