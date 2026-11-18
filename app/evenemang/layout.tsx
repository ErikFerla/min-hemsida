import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/evenemang',
  title: 'Evenemang på Mallorca 2026–2027',
  description: 'Fiestor, mässor, festivaler och sport på Mallorca 2026–2027. Välj dina resdatum och se vad som händer och vilka byar som har marknad under din resa.',
  image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Palma de Mallorca, där många av öns evenemang äger rum',
});

export default function EvenemangLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Evenemang', url: '/evenemang' }]} />
      {children}
    </>
  );
}
