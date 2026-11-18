import JsonLd from '@/app/components/JsonLd';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';

const PATH = '/hyrbil-och-transport';
const TITLE = 'Hyrbil och transport på Mallorca';
const DESCRIPTION =
  'Hyrbil på Mallorca utan överraskningar – försäkring, självrisk och parkering – plus bussar, tåg, taxi, cykel och båt. Med ungefärliga priser för 2026.';
const IMAGE = 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1200&h=630&fit=crop&q=85';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Palma de Mallorca med katedralen La Seu',
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

export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
