import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/flyg',
  title: 'Flyg till Mallorca från Sverige',
  description: 'Direktflyg till Mallorca från Arlanda, Landvetter, Kastrup m.fl. – flygbolag, säsong och flygtid, och hur du tar dig från flygplatsen i Palma till din ort.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Palma_de_Mallorca_Airport_%2836705997953%29.jpg/1920px-Palma_de_Mallorca_Airport_%2836705997953%29.jpg',
  imageAlt: 'Palmas flygplats Son Sant Joan med terminalen och flygplan',
});

export default function FlygLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Flyg', url: '/flyg' }]} />
      {children}
    </>
  );
}
