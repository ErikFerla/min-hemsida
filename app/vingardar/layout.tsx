import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/vingardar',
  title: 'Vingårdar på Mallorca – öns bästa bodegas',
  description: 'Upptäck Mallorcas vingårdar – från familjedrivna bodegas till ekologiska producenter, med tips om bokning, provning och vem varje vingård passar för.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg',
  imageAlt: 'Vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen i bakgrunden',
});

export default function VingardarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Vingårdar', url: '/vingardar' }]} />
      {children}
    </>
  );
}
