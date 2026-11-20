import JsonLd from '@/app/components/JsonLd';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';

const PATH = '/hyrbil-och-transport';
const TITLE = 'Hyrbil och transport på Mallorca';
const DESCRIPTION =
  'Hyrbil på Mallorca utan överraskningar – försäkring, självrisk och parkering – plus bussar, tåg, taxi, cykel och båt. Med ungefärliga priser för 2026.';
const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sa_Calobra_%282016.05.17%29.jpg/1920px-Sa_Calobra_%282016.05.17%29.jpg';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Den slingrande vägen ner till Sa Calobra genom Tramuntanabergen',
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
      // Samma namn som den synliga brödsmulan i page.tsx
      { '@type': 'ListItem', position: 2, name: 'Hyrbil och transport', item: `${BASE_URL}${PATH}` },
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
