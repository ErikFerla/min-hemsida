'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AGE_GROUPS, type AgeGroup } from '@/app/lib/barn-activities';
import { parseAgesParam } from '@/app/lib/ages';

export type AgeFilterProps = {
  /** Total activities before filter (for the counter). */
  totalCount: number;
  /** Activities shown after filter (for the counter). */
  visibleCount: number;
};

export default function AgeFilter({ totalCount, visibleCount }: AgeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = useMemo(
    () => parseAgesParam(searchParams.get('ages')),
    [searchParams],
  );

  const updateUrl = useCallback(
    (next: AgeGroup[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.length === 0) params.delete('ages');
      else params.set('ages', next.join(','));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggle = (age: AgeGroup) => {
    const isActive = selected.includes(age);
    const next = isActive ? selected.filter((a) => a !== age) : [...selected, age];
    updateUrl(next);
  };

  const clear = () => updateUrl([]);

  return (
    <div className="age-filter" role="group" aria-label="Filtrera efter åldersgrupp">
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
              onClick={clear}
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
