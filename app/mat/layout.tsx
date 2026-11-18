import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/mat',
  title: 'Mat och restauranger på Mallorca',
  description: 'Mallorcas bästa restauranger, tapasbarer, marknader och lokala specialiteter – från Michelinkrogar till enkla favoriter. Handplockat av en Mallorcaälskare.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg',
  imageWidth: 1920,
  imageHeight: 1440,
  imageAlt: 'Pa amb oli – mallorkinskt bröd med skinka, ost, tomat och oliver',
});

export default function MatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Mat & restauranger', url: '/mat' }]} />
      {children}
    </>
  );
}
