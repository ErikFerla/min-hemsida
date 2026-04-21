import type { Activity } from './barn-activities';

const BASE_URL = 'https://www.mymallorca.se';

/**
 * Build a schema.org ItemList with one TouristAttraction per activity.
 * categorySlug is used to construct the anchor URL (/barn/<cat>#<slug>).
 * For the hub (/barn) pass `hub` which will use the canonical category of each activity
 * (its first category entry).
 */
export function buildItemListJsonLd(
  activities: Activity[],
  categorySlug: string | 'hub',
  listName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: activities.length,
    itemListElement: activities.map((a, i) => {
      const cat = categorySlug === 'hub' ? a.categories[0] : categorySlug;
      const url = `${BASE_URL}/barn/${cat}#${a.slug}`;
      const image = `${a.imageUrl}?w=1200&q=80&fm=webp&auto=format`;
      const item: Record<string, unknown> = {
        '@type': 'TouristAttraction',
        name: a.name,
        url,
        image,
        description: a.shortDescription,
        address: {
          '@type': 'PostalAddress',
          addressLocality: a.location.split(',')[0].trim(),
          addressCountry: 'ES',
          addressRegion: 'Illes Balears',
        },
        isAccessibleForFree: typeof a.priceFrom === 'number' ? a.priceFrom === 0 : undefined,
      };
      if (typeof a.latitude === 'number' && typeof a.longitude === 'number') {
        item.geo = {
          '@type': 'GeoCoordinates',
          latitude: a.latitude,
          longitude: a.longitude,
        };
      }
      if (typeof a.priceFrom === 'number') {
        item.offers = {
          '@type': 'Offer',
          price: a.priceFrom,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url,
        };
      }
      return {
        '@type': 'ListItem',
        position: i + 1,
        item,
      };
    }),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/** Serialize any JSON-LD object for inline <script> injection. */
export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data);
}
