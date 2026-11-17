import { buildPageMetadata } from '@/app/lib/city-seo';

// Canonical, Open Graph och Twitter för guiden. Titel/beskrivning i page.tsx har företräde om de finns där.
export const metadata = buildPageMetadata({
  path: '/guide/basta-tid-resa-mallorca',
  title: 'Bästa tiden att resa till Mallorca',
  description: 'Månad-för-månad-guide till Mallorcas klimat, turisttryck och priser. Hitta din bästa reseperiod utifrån vad du söker – strand, avkoppling eller aktiviteter.',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Strand på Mallorca i solsken',
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
