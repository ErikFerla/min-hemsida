import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/evenemang',
  title: 'Evenemang på Mallorca 2026–2027',
  description: 'Fiestor, mässor, festivaler och sport på Mallorca 2026–2027. Välj dina resdatum och se vad som händer och vilka byar som har marknad under din resa.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/AtiarFoc_2011_%285380513659%29.jpg/1920px-AtiarFoc_2011_%285380513659%29.jpg',
  imageWidth: 1920,
  imageHeight: 1280,
  imageAlt: 'Dimoni med fyrverkeri under en correfoc i Palma – eldfesterna hör till öns största evenemang',
});

export default function EvenemangLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Evenemang', url: '/evenemang' }]} />
      {children}
    </>
  );
}
