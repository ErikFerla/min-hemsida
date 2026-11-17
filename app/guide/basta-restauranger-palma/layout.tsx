import { buildPageMetadata } from '@/app/lib/city-seo';

// Canonical, Open Graph och Twitter för guiden. Titel/beskrivning i page.tsx har företräde om de finns där.
export const metadata = buildPageMetadata({
  path: '/guide/basta-restauranger-palma',
  title: '15 bästa restaurangerna i Palma – lokal guide',
  description: 'Rankade av en lokal: de 15 bästa restaurangerna i Palma de Mallorca. Michelinkrogar, bästa tapas, fisk och skaldjur, och dolda pärlor utan turistpriser.',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80',
  imageAlt: 'Restaurangbord i Palma de Mallorca',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
