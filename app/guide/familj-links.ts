import { ACTIVITIES, getCategoryMeta } from '@/app/lib/barn-activities';

/**
 * Länk till en befintlig barnaktivitet (7.2): kategorisidan + ankare för aktiviteten, samma
 * format som ActivityCard. Namn och kategori hämtas från app/lib/barn-activities.ts så att
 * guiderna följer med om en aktivitet byter namn. Finns sluggen inte längre länkas /barn.
 */
export function aktivitet(slug: string): { label: string; href: string } {
  const a = ACTIVITIES.find((x) => x.slug === slug);
  if (!a) return { label: 'Barnaktiviteter', href: '/barn' };
  const meta = a.categories.map((c) => getCategoryMeta(c)).find((m) => m?.available);
  return { label: a.name, href: meta ? `${meta.href}#${a.slug}` : '/barn' };
}
