'use client';

import { Suspense, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AGE_GROUPS, type AgeGroup } from '@/app/lib/barn-activities';
import { parseAgesParam } from '@/app/lib/ages';

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
    <div className="age-filter" role="group" aria-label="Filtrera efter åldersgrupp">
      {css && <style>{css}</style>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {AGE_GROUPS.map((g) => {
            const isActive = selected.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggle(g.id)}
                aria-pressed={isActive}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: isActive ? '#383a46' : 'white',
                  color: isActive ? '#fefefb' : '#383a46',
                  border: `1.5px solid ${isActive ? '#383a46' : 'rgba(0,0,0,0.12)'}`,
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                  minHeight: '44px',
                }}
              >
                {g.label}
                <span style={{ fontSize: '0.72rem', opacity: 0.7, fontWeight: 500 }}>
                  {g.caption}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '0.85rem', color: '#4b5563' }} aria-live="polite">
            Visar <strong>{visibleCount}</strong> av {totalCount} aktiviteter
          </span>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              style={{
                padding: '8px 14px',
                background: 'transparent',
                color: '#993335',
                border: '1px solid #993335',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: '36px',
              }}
            >
              Rensa filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
