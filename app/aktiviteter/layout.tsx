import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Aktiviteter på Mallorca 2026 – Golf, vandring & vattensport',
  description: 'Hitta de bästa aktiviteterna på Mallorca. Golf på världsklassbanor, vandring i Tramuntana, vattensport och mycket mer. Bokningsguide 2026.',
  keywords: 'aktiviteter Mallorca, golf Mallorca, vandring Mallorca, vattensport Mallorca, cykling Mallorca',
};

export default function AktiviteterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Aktiviteter', url: '/aktiviteter' }]} />
      {children}
    </>
  );
}
