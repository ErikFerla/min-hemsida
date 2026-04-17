import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Golf på Mallorca 2026 – 22 banor, bokningsguide & tips',
  description: 'Allt om golf på Mallorca. Guide till 22 golfbanor, bästa perioden, priser och var du bokar. Från nybörjare till proffs.',
  keywords: 'golf Mallorca, golfbanor Mallorca, Mallorca golf guide, golf Palma',
};

export default function GolfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Aktiviteter', url: '/aktiviteter' }, { name: 'Golf', url: '/aktiviteter/golf' }]} />
      {children}
    </>
  );
}
