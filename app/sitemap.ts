import type { MetadataRoute } from 'next';
import { cities } from '@/data/cities';
import { BASE_URL } from '@/app/lib/city-seo';

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

/**
 * Övriga sidor. `updated` (ÅÅÅÅ-MM-DD) är senaste innehållsändring och blir lastmod –
 * uppdatera datumet när sidans innehåll ändras. Stadssidorna kommer från data/cities.ts.
 */
const pages: { path: string; priority: number; changeFrequency: ChangeFrequency; updated: string }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', updated: '2026-11-17' },
  { path: '/strandar', priority: 0.9, changeFrequency: 'weekly', updated: '2026-11-17' },
  { path: '/byar', priority: 0.9, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/mat', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/aktiviteter', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/aktiviteter/golf', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/sevardheter', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/evenemang', priority: 0.8, changeFrequency: 'weekly', updated: '2026-11-17' },
  { path: '/barn', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/barn/vattenparker', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/barn/djurparker-och-akvarier', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/barn/inomhus-och-regn', priority: 0.8, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/vader', priority: 0.7, changeFrequency: 'daily', updated: '2026-11-17' },
  { path: '/flyg', priority: 0.7, changeFrequency: 'weekly', updated: '2026-11-18' },
  { path: '/vingardar', priority: 0.7, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guider', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guide/basta-stranderna-mallorca', priority: 0.9, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guide/mallorca-med-barn', priority: 0.9, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guide/basta-restauranger-palma', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guide/golf-mallorca-guide', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/guide/basta-tid-resa-mallorca', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-17' },
  { path: '/integritetspolicy', priority: 0.2, changeFrequency: 'yearly', updated: '2026-11-17' },
  { path: '/cookies', priority: 0.2, changeFrequency: 'yearly', updated: '2026-11-17' },
  { path: '/var-ska-man-bo', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-18' },
  { path: '/hyrbil-och-transport', priority: 0.85, changeFrequency: 'monthly', updated: '2026-11-18' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = pages.map((p) => ({
    url: p.path === '/' ? BASE_URL : `${BASE_URL}${p.path}`,
    lastModified: new Date(p.updated),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const cityEntries = cities.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    lastModified: new Date(c.updated),
    changeFrequency: 'monthly' as const,
    priority: c.sitemapPriority,
  }));

  return [...staticEntries, ...cityEntries];
}
