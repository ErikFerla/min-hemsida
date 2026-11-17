import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/aktiviteter',
  title: 'Aktiviteter på Mallorca – golf, vandring & hav',
  description: 'Golf, vandring i Tramuntana, cykling och vattensport på Mallorca. Vår guide hjälper dig hitta aktiviteter för hela familjen, par och aktiva resenärer.',
  image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Vandrare på en bergstig i Serra de Tramuntana på Mallorca',
});

export default function AktiviteterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Aktiviteter', url: '/aktiviteter' }]} />
      {children}
    </>
  );
}
