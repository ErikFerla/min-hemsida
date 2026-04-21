import { AGE_GROUPS, type AgeGroup } from './barn-activities';

export const VALID_AGE_GROUPS: readonly AgeGroup[] = AGE_GROUPS.map((g) => g.id);

/** Parse the ?ages=a,b,c query string into a validated AgeGroup[]. Empty → []. */
export function parseAgesParam(raw: string | string[] | undefined | null): AgeGroup[] {
  if (!raw) return [];
  const str = Array.isArray(raw) ? raw.join(',') : raw;
  const parts = str.split(',').map((s) => s.trim()).filter(Boolean);
  return parts.filter((p): p is AgeGroup => (VALID_AGE_GROUPS as readonly string[]).includes(p));
}
