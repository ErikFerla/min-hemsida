import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/vingardar',
  title: 'Vingårdar på Mallorca – 15 att besöka',
  description: 'Mallorcas vingårdar – från gamla familjegods till ekologiska producenter, med tips om bokning, provning, vem gården passar och hur du tar dig dit utan bil.',
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
