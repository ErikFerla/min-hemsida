'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { AgeGroup } from '@/app/lib/barn-activities';
import { parseAgesParam } from '@/app/lib/ages';
import styles from './barn.module.css';

/**
 * Kortar aktivitetslistan på /barn under 1024 px: de första `limit` aktiviteterna som matchar
 * åldersfiltret visas, resten döljs med en genererad <style>-regel tills man trycker
 * "Visa alla N aktiviteter". Alla kort finns i den serverrenderade HTML:en (utan JS visar
 * <noscript>-regeln i page.tsx hela listan). N är samma tal som filtrets räknare.
 *
 * Listan med id={listId} ska ha direkta barn med data-slug (och data-ages för AgeFilter).
 */
export type ShowAllActivitiesProps = {
  listId: string;
  items: { slug: string; ages: AgeGroup[] }[];
  limit: number;
};

export default function ShowAllActivities(props: ShowAllActivitiesProps) {
  return (
    <Suspense fallback={<ShowAllView {...props} selected={[]} />}>
      <ShowAllFromUrl {...props} />
    </Suspense>
  );
}

function ShowAllFromUrl(props: ShowAllActivitiesProps) {
  const selected = parseAgesParam(useSearchParams().get('ages'));
  return <ShowAllView {...props} selected={selected} />;
}

function ShowAllView({ listId, items, limit, selected }: ShowAllActivitiesProps & { selected: AgeGroup[] }) {
  const [expanded, setExpanded] = useState(false);
  const focusSlug = useRef<string | null>(null);

  const matching = selected.length === 0 ? items : items.filter((i) => i.ages.some((a) => selected.includes(a)));
  const hidden = expanded ? [] : matching.slice(limit).map((i) => i.slug);

  // Efter "Visa alla": flytta fokus till det första kortet som just blev synligt.
  useEffect(() => {
    if (!expanded || !focusSlug.current) return;
    const link = document.querySelector<HTMLElement>(`#${listId} > [data-slug="${focusSlug.current}"] a`);
    link?.focus();
    focusSlug.current = null;
  }, [expanded, listId]);

  if (hidden.length === 0) return null;

  const css = `@media (max-width: 1023px) { ${hidden
    .map((slug) => `#${listId} > [data-slug="${slug}"]`)
    .join(', ')} { display: none; } }`;

  return (
    <div className={styles.showAll}>
      <style>{css}</style>
      <button
        type="button"
        className="btn btn-secondary"
        aria-controls={listId}
        aria-expanded={false}
        onClick={() => {
          focusSlug.current = hidden[0];
          setExpanded(true);
        }}
      >
        Visa alla {matching.length} aktiviteter
      </button>
    </div>
  );
}
