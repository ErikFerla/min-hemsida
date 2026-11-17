import { buildPageMetadata } from '@/app/lib/city-seo';

// Canonical, Open Graph och Twitter för guiden. Titel/beskrivning i page.tsx har företräde om de finns där.
export const metadata = buildPageMetadata({
  path: '/guide/basta-stranderna-mallorca',
  title: 'De 15 bästa stränderna på Mallorca',
  description: 'Vi har besökt och rankat Mallorcas 15 bästa stränder. Från dolda paradisvikar till barnvänliga sandstränder – med GPS, parkering och insider-tips.',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Turkost vatten och vit sandstrand på Mallorca',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
