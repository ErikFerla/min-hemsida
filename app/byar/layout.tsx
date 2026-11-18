import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/byar',
  title: 'Mallorcas städer och byar – Palma, Sóller m.fl.',
  description: 'Utforska Mallorcas städer och bergsbyar – Palma, Sóller, Valldemossa, Deià, Alcúdia och fler. Lokala tips, sevärdheter och praktisk info för varje ort.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg/1280px-Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg',
  imageAlt: 'Utsikt över takåsarna i Pollença från Calvari-trappan',
  imageWidth: 1280,
  imageHeight: 960,
});

export default function ByarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Städer & byar', url: '/byar' }]} />
      {children}
    </>
  );
}
