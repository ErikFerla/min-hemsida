import JsonLd from '@/app/components/JsonLd';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';

const PATH = '/var-ska-man-bo';
const TITLE = 'Var ska man bo på Mallorca?';
const DESCRIPTION =
  'Var ska du bo på Mallorca? Områdena för barnfamiljer, par, aktiva, lugn och stadsliv – med för- och nackdelar och ett ortsquiz som ger dig två–tre förslag.';
const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Portocolom-view-to-lighthouse.jpg/1280px-Portocolom-view-to-lighthouse.jpg';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Naturhamnen i Porto Colom på östkusten',
  imageWidth: 1280,
  imageHeight: 960,
});

const publisher = { '@type': 'Organization', name: 'MyMallorca', url: BASE_URL };

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    image: [IMAGE],
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
    inLanguage: 'sv-SE',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${PATH}` },
    url: `${BASE_URL}${PATH}`,
    author: publisher,
    publisher,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: TITLE, item: `${BASE_URL}${PATH}` },
    ],
  },
];

export default function VarSkaManBoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
