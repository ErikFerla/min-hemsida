import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/vader',
  title: 'Väder på Mallorca – prognos och klimat',
  description: 'Vädret på Mallorca: prognos för sju orter och en klimattabell med temperatur, havstemperatur, sol och regn för varje månad enligt AEMET.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Beach_in_Port_de_S%C3%B3ller_01.jpg/1920px-Beach_in_Port_de_S%C3%B3ller_01.jpg',
  imageAlt: 'Sol och blå himmel över stranden i Port de Sóller en februarimorgon',
});

export default function VaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Väder', url: '/vader' }]} />
      {children}
    </>
  );
}
