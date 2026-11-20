import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BEACHES_HERO } from '@/data/beaches';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/strandar`;

export const metadata = buildPageMetadata({
  path: '/strandar',
  title: 'Stränder på Mallorca – 30 vikar & sandstränder',
  description: '30 stränder på Mallorca – från östkustens turkosa vikar till västkustens klippor – med parkering, service, väderstreck och när du ska komma.',
  image: BEACHES_HERO.src,
  imageWidth: 1920,
  imageHeight: 1276,
  imageAlt: BEACHES_HERO.alt,
});

function TouristAttractionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Stränder på Mallorca',
    description: 'De 30 bästa stränderna på Mallorca – från turkosa vikar till långa familjesandstränder',
    url: PAGE_URL,
    touristType: ['Beach', 'Family vacation', 'Snorkeling'],
    isAccessibleForFree: true,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: BEACHES_HERO.src,
      caption: 'Caló des Moro, södra Mallorca',
      creditText: 'Tommie Hansen',
      copyrightNotice: 'Tommie Hansen / Wikimedia Commons (CC BY 2.0)',
      license: 'https://creativecommons.org/licenses/by/2.0/',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.6953,
      longitude: 3.0176,
    },
  };
  return <JsonLd data={schema} />;
}

export default function StrandarLayout({ children }: { children: React.ReactNode }) {
  // Hjältebilden förladdas av SSR via <EagerImage> i page.tsx (en ReactDOM.preload här hamnade även
  // i RSC-datat och laddade bilden när andra sidor förhämtade /strandar).
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Stränder', url: '/strandar' }]} />
      <TouristAttractionSchema />
      {children}
    </>
  );
}
