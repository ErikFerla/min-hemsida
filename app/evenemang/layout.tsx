import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Evenemang på Mallorca 2026 – Festivaler, sport & kultur',
  description: 'Komplett guide till evenemang på Mallorca 2026. Festivaler, marknader, sportevenemang och kulturupplevelser. Planera din resa.',
  keywords: 'evenemang Mallorca 2026, festival Mallorca, marknad Mallorca, Mallorca 312',
};

export default function EvenemangLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Evenemang', url: '/evenemang' }]} />
      {children}
    </>
  );
}
