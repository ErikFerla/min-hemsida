import { buildPageMetadata } from '@/app/lib/city-seo';

export const metadata = buildPageMetadata({
  path: '/aktiviteter',
  title: 'Aktiviteter på Mallorca – golf, vandring & hav',
  description: 'Golf, vandring i Tramuntana, cykling och vattensport på Mallorca. Vår guide hjälper dig hitta aktiviteter för hela familjen, par och aktiva resenärer.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Serra_de_Tramuntana_Valldemossa_01.jpg/1920px-Serra_de_Tramuntana_Valldemossa_01.jpg',
  imageAlt: 'Serra de Tramuntana sedd från Camí de s\'Arxiduc vid Valldemossa',
});

export default function AktiviteterLayout({ children }: { children: React.ReactNode }) {
  // Brödsmulorna (BreadcrumbList) ligger i page.tsx, så att /aktiviteter/golf inte får två.
  return children;
}
