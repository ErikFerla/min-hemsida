import { BreadcrumbSchema, TouristDestinationSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Bästa stränderna på Mallorca 2026 – 30 utvalda stränder | MyMallorca',
  description: 'Upptäck Mallorcas 30 bästa stränder – från turkosa vikar till långa sandstränder. Filtrera på område, typ och familjevänlighet. Med GPS-tips.',
  keywords: 'stränder Mallorca, bästa strand Mallorca, bästa stränderna Mallorca, Es Trenc, Cala Mondragó, familjevänlig strand Mallorca',
  openGraph: {
    title: 'Bästa stränderna på Mallorca 2026',
    description: '30 handplockade stränder med insider-tips från en som bor på ön.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'],
  },
};

function TouristAttractionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Stränder på Mallorca',
    description: 'De 30 bästa stränderna på Mallorca – från turkosa vikar till långa familjesandstränder',
    url: 'https://www.mymallorca.se/strandar',
    touristType: ['Beach', 'Family vacation', 'Snorkeling'],
    isAccessibleForFree: true,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.6953,
      longitude: 3.0176,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function StrandarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Stränder', url: '/strandar' }]} />
      <TouristAttractionSchema />
      {children}
    </>
  );
}
