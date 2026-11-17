import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/byar',
  title: 'Mallorcas städer och byar – Palma, Sóller m.fl.',
  description: 'Utforska Mallorcas städer och bergsbyar – Palma, Sóller, Valldemossa, Deià, Alcúdia och fler. Lokala tips, sevärdheter och praktisk info för varje ort.',
  image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Palma de Mallorca med katedralen La Seu',
});

export default function ByarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Städer & byar', url: '/byar' }]} />
      {children}
    </>
  );
}
