import ReactDOM from 'react-dom';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BEACHES_HERO } from '@/data/beaches';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/strandar`;

export const metadata = buildPageMetadata({
  path: '/strandar',
  title: 'Stränder på Mallorca – 30 vikar & sandstränder',
  description: 'Upptäck Mallorcas 30 bästa stränder – från östkustens turkosa calas till västkustens dramatiska klippor. Handplockad guide från lokalkännare.',
  image: BEACHES_HERO.src,
  imageWidth: 1600,
  imageHeight: 1067,
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
      creditText: 'Chloé Lefleur',
      copyrightNotice: 'Chloé Lefleur / Unsplash',
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
  // Preload hero-bilden som LCP-kandidat – Next 16 / React 19 stöd
  ReactDOM.preload(BEACHES_HERO.src, {
    as: 'image',
    imageSrcSet: BEACHES_HERO.srcSet,
    imageSizes: BEACHES_HERO.sizes,
    fetchPriority: 'high',
  });

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Stränder', url: '/strandar' }]} />
      <TouristAttractionSchema />
      {children}
    </>
  );
}
