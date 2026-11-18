import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/sevardheter',
  title: 'Sevärdheter på Mallorca – slott & grottor',
  description: 'Mallorcas främsta sevärdheter – La Seu, Bellver, klostret i Valldemossa, Coves del Drach och fler. Öppettider, bästa besökstid och lokala tips.',
  image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'La Seu-katedralen i Palma – en av Mallorcas mest ikoniska sevärdheter',
});

export default function SevardheterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Sevärdheter', url: '/sevardheter' }]} />
      {children}
    </>
  );
}
