import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/marknader',
  title: 'Veckomarknader på Mallorca – dag för dag',
  description: 'Veckomarknader på Mallorca dag för dag: vilka byar har marknad på måndag, tisdag, onsdag och resten av veckan, ungefärliga tider, vad som säljs och tips.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Sineu_-_Markt_02_ies.jpg/1920px-Sineu_-_Markt_02_ies.jpg',
  imageAlt: 'Marknadsstånd och besökare på onsdagsmarknaden i Sineu',
});

export default function MarknaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Marknader', url: '/marknader' }]} />
      {children}
    </>
  );
}
