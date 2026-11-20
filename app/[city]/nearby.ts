/**
 * Kopplingar från en ortsida vidare in på sajten (layoutgranskningen punkt 10):
 * närmaste orter (fågelvägen från lat/lng i data/cities.ts), strandregion, barnaktiviteter
 * nära orten och fotokrediten för heron. Allt beräknas vid bygget – ingen ny redaktionell text.
 */
import { cities, cityPath, type City } from '@/data/cities';
import { beaches, type BeachRegion } from '@/data/beaches';
import { allCredits } from '@/data/credits';
import { LICENSE_LABEL } from '@/data/credits/types';
import { ACTIVITIES, getCategoryMeta } from '@/app/lib/barn-activities';

/** Avstånd fågelvägen i km (haversine). */
function distanceKm(a: Pick<City, 'lat' | 'lng'>, b: Pick<City, 'lat' | 'lng'>): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export type NearbyCity = { city: City; href: string; km: number };

/** De `count` närmaste orterna med egen sida, närmast först. */
export function nearbyCities(city: City, count = 4): NearbyCity[] {
  return cities
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({ city: c, href: cityPath(c), km: Math.max(1, Math.round(distanceKm(city, c))) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

const BEACH_REGIONS = new Set<string>(beaches.map((b) => b.region));
const BEACH_REGION_BY_NAME = new Map(beaches.map((b) => [b.namn, b.region]));

/**
 * Strandregionen för orten: ortens egen region om /strandar har den, annars den region som
 * flest av ortens stränder (guide.beaches) ligger i. Inlandsorter utan stränder → undefined.
 */
export function beachRegion(city: City): BeachRegion | undefined {
  if (BEACH_REGIONS.has(city.region)) return city.region as BeachRegion;
  const counts = new Map<BeachRegion, number>();
  for (const n of city.guide?.beaches?.names ?? []) {
    const r = BEACH_REGION_BY_NAME.get(n);
    if (r) counts.set(r, (counts.get(r) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0];
}

export type KidsLink = { name: string; href: string };

/** Barnaktiviteterna i city.kidsNearby som länkar till kategorisidan (#slug). Okänd slug stoppar bygget. */
export function kidsNearby(city: City): KidsLink[] {
  return (city.kidsNearby ?? []).map((slug) => {
    const a = ACTIVITIES.find((x) => x.slug === slug);
    if (!a) throw new Error(`${city.slug}: okänd barnaktivitet ${slug} i kidsNearby`);
    const meta = getCategoryMeta(a.categories[0]);
    return { name: a.name, href: meta ? `${meta.href}#${a.slug}` : '/barn' };
  });
}

/** Commons-thumbs finns i flera bredder – jämför på filen, inte hela URL:en. */
function imageKey(src: string): string {
  const thumb = src.split('/thumb/')[1];
  return thumb ? thumb.split('/').slice(0, 3).join('/') : src.split('?')[0];
}

function sourceLabel(sourceUrl: string): string {
  if (sourceUrl.includes('wikimedia.org')) return 'Wikimedia Commons';
  if (sourceUrl.includes('unsplash.com')) return 'Unsplash';
  if (sourceUrl.includes('pexels.com')) return 'Pexels';
  return '';
}

/** "Foto: Namn / Wikimedia Commons (CC BY-SA 4.0)" för heron, från posten i data/credits. */
export function heroCredit(city: City): string {
  const key = imageKey(city.hero.image);
  const c = allCredits.find((x) => imageKey(x.src) === key);
  if (!c) throw new Error(`${city.slug}: hero-bilden saknar post i data/credits`);
  const role = c.roll ? c.roll[0].toUpperCase() + c.roll.slice(1) : 'Foto';
  const source = sourceLabel(c.sourceUrl);
  const license = `${LICENSE_LABEL[c.license].label}${c.licenseVersion ? ` ${c.licenseVersion}` : ''}`;
  return `${role}: ${c.fotograf}${source ? ` / ${source}` : ''} (${license})`;
}
