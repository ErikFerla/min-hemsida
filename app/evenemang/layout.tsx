import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata = {
  title: 'Evenemang på Mallorca 2026 – Festivaler, sport & kultur',
  description: 'Komplett guide till evenemang på Mallorca 2026 – från total solförmörkelse 12 augusti till Mallorca Live Festival, festivaler, marknader och sport. Svensk guide.',
  keywords: 'evenemang Mallorca 2026, solförmörkelse Mallorca 2026, Mallorca Live Festival, festival Mallorca, marknad Mallorca',
};

const solarEclipseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Total solförmörkelse över Mallorca',
  description:
    'Den första totala solförmörkelsen synlig från Spanien sedan 1905. Totalitet i 1 minut 36 sekunder vid solnedgång (kl 20:31 lokal tid). Mallorca ligger nästan exakt på centrumlinjen.',
  startDate: '2026-08-12T20:31:00+02:00',
  endDate: '2026-08-12T20:33:00+02:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Mallorca, Spanien',
    address: { '@type': 'PostalAddress', addressRegion: 'Balearerna', addressCountry: 'ES' },
    geo: { '@type': 'GeoCoordinates', latitude: 39.6953, longitude: 3.0176 },
  },
  image: 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=1200&q=80',
  url: 'https://www.timeanddate.com/eclipse/in/spain/palma?iso=20260812',
  organizer: { '@type': 'Organization', name: 'MyMallorca', url: 'https://www.mymallorca.se' },
};

export default function EvenemangLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Evenemang', url: '/evenemang' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solarEclipseSchema) }}
      />
      {children}
    </>
  );
}
