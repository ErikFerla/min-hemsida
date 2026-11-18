import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/sevardheter',
  title: 'Sevärdheter på Mallorca – slott & grottor',
  description: 'Mallorcas främsta sevärdheter – La Seu, Bellver, klostret i Valldemossa, Coves del Drac och fler. Öppettider, bästa besökstid och lokala tips.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/0057-Catedral_von_Palma_de_Mallorca.JPG/1920px-0057-Catedral_von_Palma_de_Mallorca.JPG',
  imageWidth: 1920,
  imageHeight: 1440,
  imageAlt: 'La Seu, Palmas katedral, reser sig över hamnen – en av Mallorcas mest ikoniska sevärdheter',
});

export default function SevardheterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Sevärdheter', url: '/sevardheter' }]} />
      {children}
    </>
  );
}
