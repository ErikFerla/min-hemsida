import JsonLd from '@/app/components/JsonLd';
import type { City } from '@/data/cities';
import { BASE_URL, cityOgImage, cityUrl } from './city-seo';

/** Brödsmulor för stadssidorna – samma steg i den synliga listan och i JSON-LD. */
export function cityBreadcrumbs(city: City) {
  return [
    { name: 'Hem', url: '/' },
    { name: 'Städer & byar', url: '/byar' },
    { name: city.name, url: `/${city.slug}` },
  ];
}

/** TouristDestination + BreadcrumbList för en stadssida. */
export function CityJsonLd({ city }: { city: City }) {
  const url = cityUrl(city);
  const destination = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${url}#destination`,
    name: city.name,
    description: city.seo.description,
    url,
    image: cityOgImage(city),
    geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
    hasMap: `https://maps.google.com/?q=${city.mapsQuery}`,
    touristType: ['Family', 'Couple', 'Solo traveler'],
    containedInPlace: {
      '@type': 'Island',
      name: 'Mallorca',
      containedInPlace: { '@type': 'Country', name: 'Spain' },
    },
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: cityBreadcrumbs(city).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
  return (
    <>
      <JsonLd data={destination} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}
