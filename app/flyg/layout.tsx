import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/flyg',
  title: 'Flyg till Mallorca från Sverige',
  description: 'Flyg till Mallorca från Stockholm, Göteborg och Malmö – sök och jämför avgångar, se restid och säsong och få tips om när det lönar sig att boka.',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Flygplan över moln på väg till Palma de Mallorca',
});

export default function FlygLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Flyg', url: '/flyg' }]} />
      {children}
    </>
  );
}
