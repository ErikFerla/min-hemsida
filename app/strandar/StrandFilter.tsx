'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BEACH_REGIONS, BEACH_TYPES, type Beach } from '@/data/beaches';
import { STRAND_FILTER_ID } from './anchors';
import styles from './StrandFilter.module.css';

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
    <div id={STRAND_FILTER_ID} className={styles.panel}>
      {css && <style>{css}</style>}
      <div className={styles.head}>
        <p className={styles.title}>Filtrera stränder</p>
        {hasActiveFilter && (
          <button type="button" onClick={() => { setRegion('Alla'); setTyp('Alla typer'); setFilter(''); }} className={`link-arrow ${styles.reset}`}>Rensa</button>
        )}
      </div>

      <div className={styles.group} role="group" aria-label="Område">
        <p className={styles.label} aria-hidden="true">Område</p>
        <div className={styles.row}>
          {REGIONER.map((r) => <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)} className={styles.chip}>{r}</button>)}
        </div>
      </div>

      <div className={styles.group} role="group" aria-label="Typ">
        <p className={styles.label} aria-hidden="true">Typ</p>
        <div className={styles.row}>
          {TYPER.map((t) => <button key={t} type="button" aria-pressed={typ === t} onClick={() => setTyp(t)} className={styles.chip}>{t}</button>)}
        </div>
      </div>

      <div className={styles.group} role="group" aria-label="Kännetecken">
        <p className={styles.label} aria-hidden="true">Kännetecken</p>
        <div className={styles.row}>
          {KÄNNETECKEN.map(([val, label]) =>
            <button key={val} type="button" aria-pressed={filter === val} onClick={() => setFilter(val)} className={styles.chip}>{label}</button>
          )}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">{antal} stränder visas</p>
    </div>
  );
}
