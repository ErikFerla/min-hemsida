import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { golfbanor } from '@/data/golf-courses';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/aktiviteter/golf`;

export const metadata: Metadata = {
  title: 'Golf på Mallorca – 22 banor i världsklass | MyMallorca',
  description: 'Komplett guide till Mallorcas 22 golfbanor. Interaktiv karta, banfakta, priser och tips – från Alcanada i norr till Andratx i sydväst.',
  keywords: 'golf Mallorca, golfbanor Mallorca, Mallorca golf guide, golf Palma, Son Gual, Alcanada, Andratx golf',
  alternates: { canonical: '/aktiviteter/golf' },
  openGraph: {
    title: 'Golf på Mallorca – 22 banor i världsklass',
    description: 'Interaktiv karta och komplett guide till alla 22 golfbanor på Mallorca – banfakta, priser och insider-tips.',
    url: PAGE_URL,
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    type: 'website',
    images: [{
      url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
      width: 1200,
      height: 630,
      alt: 'Golfbana på Mallorca med havsutsikt',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf på Mallorca – 22 banor i världsklass',
    description: 'Interaktiv karta och guide till alla 22 golfbanor på Mallorca.',
  },
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
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
