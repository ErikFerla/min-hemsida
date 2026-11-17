import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/vingardar',
  title: 'Vingårdar på Mallorca – öns bästa bodegas',
  description: 'Upptäck Mallorcas vingårdar – från familjedrivna bodegas till ekologiska producenter, med tips om bokning, provning och vem varje vingård passar för.',
  image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Vinrankor och druvklasar i en mallorcansk vingård',
});

export default function VingardarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Vingårdar', url: '/vingardar' }]} />
      {children}
    </>
  );
}
