'use client';
import { Suspense, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'next/navigation';
import { BEACH_REGIONS, BEACH_TYPES, type Beach } from '@/data/beaches';

// Filtret äger inte strandkorten – de serverrenderas i page.tsx med data-attribut.
// Här väljs bara vad som ska döljas, via en genererad <style>-regel, så att allt
// innehåll finns i HTML:en även utan JavaScript.

type Kännetecken = '' | 'familj' | 'snorkling' | 'nudist';
type FilterBeach = Pick<Beach, 'region' | 'typ' | 'familj' | 'snorkling' | 'nudist'>;

const REGIONER = ['Alla', ...BEACH_REGIONS];
const TYPER = ['Alla typer', ...BEACH_TYPES];
const KÄNNETECKEN: [Kännetecken, string][] = [
  ['', 'Visa alla'],
  ['familj', 'Familjevänlig'],
  ['snorkling', 'Snorkling'],
  ['nudist', 'Nudistsektion'],
];

type Props = {
  /** id på listan med strandkort (varje kort har data-region, data-typ och data-<kännetecken>). */
  listId: string;
  beaches: FilterBeach[];
};

export default function StrandFilter(props: Props) {
  return (
    <Suspense fallback={<FilterPanel {...props} initialRegion="Alla" />}>
      <FilterFromUrl {...props} />
    </Suspense>
  );
}

function FilterFromUrl(props: Props) {
  const regionParam = useSearchParams().get('region');
  const initialRegion = regionParam && REGIONER.includes(regionParam) ? regionParam : 'Alla';
  // Ny ?region= (t.ex. från menyn) startar om filtret med den regionen.
  return <FilterPanel key={initialRegion} {...props} initialRegion={initialRegion} />;
}

const chipStyle = (aktiv: boolean): CSSProperties => ({
  minHeight: '40px',
  padding: '0 16px',
  borderRadius: '999px',
  border: aktiv ? '1px solid #383a46' : '1px solid #E2D8C8',
  background: aktiv ? '#383a46' : '#FFFFFF',
  color: aktiv ? '#FFFFFF' : '#383a46',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '0.88rem',
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  transition: 'all 0.16s ease',
});

const scrollRowStyle: CSSProperties = {
  display: 'flex',
  gap: '8px',
  overflowX: 'auto',
  overflowY: 'hidden',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '2px 2px 4px',
};

const filterLabelStyle: CSSProperties = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#6B7280',
  margin: '0 0 10px',
};

function FilterPanel({ listId, beaches, initialRegion }: Props & { initialRegion: string }) {
  const [region, setRegion] = useState(initialRegion);
  const [typ, setTyp] = useState('Alla typer');
  const [filter, setFilter] = useState<Kännetecken>('');

  const antal = beaches.filter((s) => {
    if (region !== 'Alla' && s.region !== region) return false;
    if (typ !== 'Alla typer' && s.typ !== typ) return false;
    if (filter && !s[filter]) return false;
    return true;
  }).length;

  const item = `#${listId} > [data-region]`;
  const regler: string[] = [];
  if (region !== 'Alla') regler.push(`${item}:not([data-region="${region}"])`);
  if (typ !== 'Alla typer') regler.push(`${item}:not([data-typ="${typ}"])`);
  if (filter) regler.push(`${item}:not([data-${filter}])`);
  const css = regler.length > 0 ? `${regler.join(',\n')} { display: none; }` : '';

  const hasActiveFilter = region !== 'Alla' || typ !== 'Alla typer' || filter !== '';

  return (
    <div style={{ marginBottom: '32px', background: 'white', border: '1px solid #ede5da', borderRadius: '16px', padding: 'clamp(16px,4vw,22px)', boxShadow: '0 4px 14px rgba(31,41,55,0.03)' }}>
      {css && <style>{css}</style>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', gap: 12 }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#383a46', margin: 0 }}>Filtrera stränder</p>
        {hasActiveFilter && (
          <button type="button" onClick={() => { setRegion('Alla'); setTyp('Alla typer'); setFilter(''); }} style={{ background: 'none', border: 'none', color: '#993335', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 6, minHeight: 32 }}>Rensa</button>
        )}
      </div>

      <div style={{ marginBottom: '18px' }} role="group" aria-label="Område">
        <p style={filterLabelStyle} aria-hidden="true">Område</p>
        <div className="strand-scroll-row" style={scrollRowStyle}>
          {REGIONER.map((r) => <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)} style={chipStyle(region === r)}>{r}</button>)}
        </div>
      </div>

      <div style={{ marginBottom: '18px' }} role="group" aria-label="Typ">
        <p style={filterLabelStyle} aria-hidden="true">Typ</p>
        <div className="strand-scroll-row" style={scrollRowStyle}>
          {TYPER.map((t) => <button key={t} type="button" aria-pressed={typ === t} onClick={() => setTyp(t)} style={chipStyle(typ === t)}>{t}</button>)}
        </div>
      </div>

      <div style={{ marginBottom: '18px' }} role="group" aria-label="Kännetecken">
        <p style={filterLabelStyle} aria-hidden="true">Kännetecken</p>
        <div className="strand-scroll-row" style={scrollRowStyle}>
          {KÄNNETECKEN.map(([val, label]) =>
            <button key={val} type="button" aria-pressed={filter === val} onClick={() => setFilter(val)} style={chipStyle(filter === val)}>{label}</button>
          )}
        </div>
      </div>

      <p style={{ marginTop: '12px', color: '#6B5D4F', fontSize: '0.9rem', fontWeight: 600 }} aria-live="polite">{antal} stränder visas</p>
    </div>
  );
}
