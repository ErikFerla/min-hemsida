import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import JsonLd from '@/app/components/JsonLd';
import { golfbanor } from '@/data/golf-courses';
import { buildPageMetadata } from '@/app/lib/city-seo';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/aktiviteter/golf`;

export const metadata = {
  ...buildPageMetadata({
  path: '/aktiviteter/golf',
  title: 'Golf på Mallorca – 22 banor med karta',
  description: 'Mallorcas 22 golfbanor på en interaktiv karta med banfakta, greenfee-nivåer och tips – från Alcanada i norr till Andratx i sydväst. Svensk guide.',
  image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=630&fit=crop&q=80',
  imageAlt: 'Golfbana på Mallorca med havsutsikt',
  }),
  // Föräldralayouten sätter en vanlig titelsträng, så root-mallen följer inte med hit.
  title: { absolute: 'Golf på Mallorca – 22 banor med karta | MyMallorca' },
};

function GolfItemListSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Golfbanor på Mallorca',
    numberOfItems: golfbanor.length,
    itemListElement: golfbanor.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'GolfCourse',
        name: b.namn,
        url: `${PAGE_URL}#${b.slug}`,
        description: b.beskrivning,
        image: b.bild,
        address: {
          '@type': 'PostalAddress',
          addressLocality: b.plats,
          addressRegion: 'Mallorca',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: b.lat,
          longitude: b.lng,
        },
        ...(b.webb ? { sameAs: b.webb } : {}),
      },
    })),
  };
  return <JsonLd data={schema} />;
}

export default function GolfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Hem', url: '/' },
        { name: 'Aktiviteter', url: '/aktiviteter' },
        { name: 'Golf', url: '/aktiviteter/golf' },
      ]} />
      <GolfItemListSchema />
      {children}
    </>
  );
}
