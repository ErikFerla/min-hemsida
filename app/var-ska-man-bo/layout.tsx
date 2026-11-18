import JsonLd from '@/app/components/JsonLd';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';

const PATH = '/var-ska-man-bo';
const TITLE = 'Var ska man bo på Mallorca?';
const DESCRIPTION =
  'Var ska du bo på Mallorca? Områdena för barnfamiljer, par, aktiva, lugn och stadsliv – med för- och nackdelar och ett ortsquiz som ger dig två–tre förslag.';
const IMAGE = 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=1200&h=630&fit=crop&q=85';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Vita stenhus och Tramuntanabergen på Mallorca',
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
