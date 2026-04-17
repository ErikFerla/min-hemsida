import type { Metadata } from 'next';
import ReactDOM from 'react-dom';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

const SITE = 'https://www.mymallorca.se';
const PAGE_URL = `${SITE}/strandar`;

// Samma bas som används i strandar/page.tsx för hero. Måste hållas i synk.
// TODO: Byt till Chloé Lefleurs canonical-URL (Unsplash F0ZUIUeW490) när den är bekräftad.
const HERO_BASE = 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08';
const HERO_Q = 'q=80&auto=format&fm=webp&fit=crop';
const HERO_1600 = `${HERO_BASE}?w=1600&${HERO_Q}`;
const HERO_SRCSET = [640, 960, 1280, 1600, 2000]
  .map(w => `${HERO_BASE}?w=${w}&${HERO_Q} ${w}w`)
  .join(', ');

export const metadata: Metadata = {
  title: 'Stränder på Mallorca 2026 – 30 bästa vikarna & sandstränderna | MyMallorca',
  description: 'Upptäck Mallorcas 30 bästa stränder – från ostkustens turkosa calas till västkustens dramatiska klippor. Handplockad guide från lokalkännare.',
  keywords: 'stränder Mallorca, bästa strand Mallorca, bästa stränderna Mallorca, Es Trenc, Cala Mondragó, familjevänlig strand Mallorca, Caló des Moro',
  alternates: { canonical: '/strandar' },
  openGraph: {
    title: 'Stränder på Mallorca 2026 – 30 bästa vikarna & sandstränderna',
    description: 'Upptäck Mallorcas 30 bästa stränder – från ostkustens turkosa calas till västkustens dramatiska klippor. Handplockad guide från lokalkännare.',
    url: PAGE_URL,
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    type: 'website',
    images: [{
      url: HERO_1600,
      width: 1600,
      height: 1067,
      alt: 'Caló des Moro på södra Mallorca – turkost vatten, kalkstensklippor och pinjeskog vid en dold vik',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stränder på Mallorca 2026 – 30 bästa vikarna & sandstränderna',
    description: 'Upptäck Mallorcas 30 bästa stränder – handplockad guide från lokalkännare.',
    images: [HERO_1600],
  },
};

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
      url: HERO_1600,
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function StrandarLayout({ children }: { children: React.ReactNode }) {
  // Preload hero-bilden som LCP-kandidat – Next 16 / React 19 stöd
  ReactDOM.preload(HERO_1600, {
    as: 'image',
    imageSrcSet: HERO_SRCSET,
    imageSizes: '100vw',
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
