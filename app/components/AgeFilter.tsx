'use client';

import { Suspense, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AGE_GROUPS, type AgeGroup } from '@/app/lib/barn-activities';
import { parseAgesParam } from '@/app/lib/ages';
import styles from './AgeFilter.module.css';

/**
 * Åldersfilter för /barn och kategorisidorna.
 *
 * Sidorna är statiska: alla aktiviteter serverrenderas i en lista med
 * id={listId}, där varje direkt barn har data-ages="0-3 4-7 …". Filtret läser
 * ?ages= i klienten och döljer de aktiviteter som inte matchar med en genererad
 * <style>-regel. Ett element med id={`${listId}-tom`} och klassen a2-age-empty
 * visas när inget matchar.
 */
export type AgeFilterProps = {
  /** id på listan med aktiviteter. */
  listId: string;
  /** Åldersgrupperna för varje aktivitet i listan (för räknaren). */
  itemAges: AgeGroup[][];
};

export default function AgeFilter(props: AgeFilterProps) {
  return (
    <Suspense fallback={<AgeFilterView {...props} selected={[]} onChange={() => {}} />}>
      <AgeFilterFromUrl {...props} />
    </Suspense>
  );
}

function AgeFilterFromUrl(props: AgeFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = parseAgesParam(searchParams.get('ages'));

  const updateUrl = useCallback(
    (next: AgeGroup[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.length === 0) params.delete('ages');
      else params.set('ages', next.join(','));
      const qs = params.toString();
      // history-API:t uppdaterar useSearchParams utan att hämta sidan från servern.
      window.history.replaceState(null, '', `${qs ? `${pathname}?${qs}` : pathname}${window.location.hash}`);
    },
    [pathname, searchParams],
  );

  return <AgeFilterView {...props} selected={selected} onChange={updateUrl} />;
}

function buildCss(listId: string, selected: AgeGroup[], visibleCount: number): string {
  if (selected.length === 0) return '';
  const notAny = selected.map((age) => `:not([data-ages~="${age}"])`).join('');
  let css = `#${listId} > [data-ages]${notAny} { display: none; }`;
  if (visibleCount === 0) css += `\n#${listId}-tom { display: block; }`;
  return css;
}

function AgeFilterView({
  listId,
  itemAges,
  selected,
  onChange,
}: AgeFilterProps & { selected: AgeGroup[]; onChange: (next: AgeGroup[]) => void }) {
  const totalCount = itemAges.length;
  const visibleCount =
    selected.length === 0
      ? totalCount
      : itemAges.filter((ages) => ages.some((g) => selected.includes(g))).length;
  const css = buildCss(listId, selected, visibleCount);

  const toggle = (age: AgeGroup) => {
    const isActive = selected.includes(age);
    onChange(isActive ? selected.filter((a) => a !== age) : [...selected, age]);
  };

  return (
    <div role="group" aria-label="Filtrera efter åldersgrupp">
      {css && <style>{css}</style>}
      <div className={styles.bar}>
        <div className={styles.options}>
          {AGE_GROUPS.map((g) => {
            const isActive = selected.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggle(g.id)}
                aria-pressed={isActive}
                className={styles.option}
              >
                {g.label}
                <span className={styles.caption}>{g.caption}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.status}>
          {/* "matchar", inte "visar": på /barn under 1024 px syns bara de första korten tills man
              trycker "Visa alla" (app/barn/ShowAllActivities.tsx), så räknaren anger träffarna. */}
          <span className={styles.count} aria-live="polite">
            <strong>{visibleCount}</strong> av {totalCount} aktiviteter matchar
          </span>
          {selected.length > 0 && (
            <button type="button" onClick={() => onChange([])} className="btn btn-secondary">
              Rensa filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
