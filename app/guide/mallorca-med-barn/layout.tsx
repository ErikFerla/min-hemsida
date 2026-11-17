import { buildPageMetadata } from '@/app/lib/city-seo';

// Canonical, Open Graph och Twitter för guiden. Titel/beskrivning i page.tsx har företräde om de finns där.
export const metadata = buildPageMetadata({
  path: '/guide/mallorca-med-barn',
  title: 'Mallorca med barn – guide för barnfamiljer',
  description: 'Allt du behöver veta för en lyckad semester med barn på Mallorca – barnvänliga stränder, vattenparker, boende och aktiviteter för barn 0–15 år.',
  image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Barnfamilj på semester på Mallorca',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
