import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Mat och restauranger på Mallorca 2026 – Bästa ställena | MyMallorca',
  description: 'Guide till Mallorcas bästa restauranger, tapasställen och vingårdar. Från Michelin-stjärnor till lokala favoriter. Uppdaterad 2026.',
  keywords: 'restauranger Mallorca, mat Mallorca, Mallorca vin, vingårdar Mallorca, Michelinkrog Mallorca',
  openGraph: {
    title: 'Mat och restauranger på Mallorca 2026 – Bästa ställena',
    description: 'Från Michelinkrogar till lokala marknader – handplockade av en insider.',
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80'],
  },
};

export default function MatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Mat & restauranger', url: '/mat' }]} />
      {children}
    </>
  );
}
