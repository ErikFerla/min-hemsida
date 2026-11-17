import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/vader',
  title: 'Väder på Mallorca – prognos för sju orter',
  description: 'Vädret på Mallorca: prognos för de kommande dagarna i Palma, Port de Sóller, Alcúdia, Deià och fler orter – med högsta och lägsta temperatur, regn och vind.',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Soligt väder över en strand på Mallorca',
});

export default function VaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Väder', url: '/vader' }]} />
      {children}
    </>
  );
}
