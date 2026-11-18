import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import JsonLd from '@/app/components/JsonLd';
import { golfbanor } from '@/data/golf-courses';
import { buildPageMetadata } from '@/app/lib/city-seo';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/aktiviteter/golf`;

export const metadata = {
  ...buildPageMetadata({
  path: '/aktiviteter/golf',
  title: `Golf på Mallorca – ${golfbanor.length} banor med karta`,
  description: `${golfbanor.length} golfbanor på Mallorca på en interaktiv karta med banfakta, prisnivåer och tips – från Alcanada i norr till Andratx i sydväst. Svensk guide.`,
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg',
  imageAlt: 'Green på Pula Golf vid Son Servera med berg i bakgrunden',
  }),
  // Föräldralayouten sätter en vanlig titelsträng, så root-mallen följer inte med hit.
  title: { absolute: `Golf på Mallorca – ${golfbanor.length} banor med karta | MyMallorca` },
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
