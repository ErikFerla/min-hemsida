import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/marknader',
  title: 'Veckomarknader på Mallorca – dag för dag',
  description: 'Veckomarknader på Mallorca dag för dag: vilka byar har marknad på måndag, tisdag, onsdag och resten av veckan, ungefärliga tider, vad som säljs och tips.',
  image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=630&fit=crop&q=85',
  imageAlt: 'Frukt och grönsaker på en marknad',
});

export default function MarknaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Veckomarknader', url: '/marknader' }]} />
      {children}
    </>
  );
}
