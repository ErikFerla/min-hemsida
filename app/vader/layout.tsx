import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Väder på Mallorca 2026 – Månadsguide och prognos | MyMallorca',
  description: 'Koll på vädret på Mallorca. Månadsvis klimatguide, bästa tid att åka och 7-dagars prognos för 7 städer.',
  keywords: 'väder Mallorca, Mallorca klimat, bästa tid resa Mallorca, Mallorca temperatur',
};

export default function VaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Väder', url: '/vader' }]} />
      {children}
    </>
  );
}
