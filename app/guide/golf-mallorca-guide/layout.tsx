import { buildPageMetadata } from '@/app/lib/city-seo';

// Canonical, Open Graph och Twitter för guiden. Titel/beskrivning i page.tsx har företräde om de finns där.
export const metadata = buildPageMetadata({
  path: '/guide/golf-mallorca-guide',
  title: 'Golfguide Mallorca – alla 22 banor',
  description: 'Golfguide för Mallorca: de 5 bästa banorna i detalj och en komplett lista över alla 22 banor med greenfee, svårighetsgrad och kontaktuppgifter.',
  image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=630&fit=crop&q=80',
  imageAlt: 'Golfbana på Mallorca med havsutsikt',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
