import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Städer och byar på Mallorca 2026 – Guide till Palma, Sóller & mer',
  description: 'Utforska Mallorcas vackraste städer och bergbyar. Komplett guide till Palma, Sóller, Valldemossa, Alcúdia och 14 andra destinationer.',
  keywords: 'städer Mallorca, byar Mallorca, Palma guide, Valldemossa, Deià, Sóller Mallorca',
  openGraph: {
    title: 'Mallorcas vackraste städer och byar – Guide 2026',
    description: '18 destinationer med lokala tips, top 3 och praktisk info.',
    images: ['https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85'],
  },
};

export default function ByarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Städer & byar', url: '/byar' }]} />
      {children}
    </>
  );
}
