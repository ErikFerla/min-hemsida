import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/mat',
  title: 'Mat och restauranger på Mallorca',
  description: 'Mallorcas bästa restauranger, tapasbarer, marknader och lokala specialiteter – från Michelinkrogar till enkla favoriter. Handplockat av en Mallorcaälskare.',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80',
  imageAlt: 'Dukat restaurangbord på Mallorca',
});

export default function MatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Mat & restauranger', url: '/mat' }]} />
      {children}
    </>
  );
}
