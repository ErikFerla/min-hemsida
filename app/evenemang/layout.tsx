import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/evenemang',
  title: 'Evenemang på Mallorca 2026–2027',
  description: 'Festivaler, marknader, fiestor och sportevenemang på Mallorca 2026–2027. Se vad som händer under din vistelse – för barnfamiljer, par och öbor.',
  image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Palma de Mallorca, där många av öns evenemang äger rum',
});

export default function EvenemangLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Evenemang', url: '/evenemang' }]} />
      {children}
    </>
  );
}
