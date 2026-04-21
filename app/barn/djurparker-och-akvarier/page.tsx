import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { parseAgesParam } from '@/app/lib/ages';

export const metadata: Metadata = {
  title: 'Djurparker & akvarier på Mallorca – 4 bästa för barn | MyMallorca',
  description:
    'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn. Priser, tips och åldersrekommendationer.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/djurparker-och-akvarier' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/djurparker-och-akvarier',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Djurparker & akvarier på Mallorca – 4 bästa för barn | MyMallorca',
    description:
      'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&q=85',
        width: 1200,
        height: 630,
        alt: 'Akvarietunnel med haj och tropiska fiskar på Mallorca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djurparker & akvarier på Mallorca – 4 bästa för barn | MyMallorca',
    description:
      'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn.',
    images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&q=85'],
  },
};

type Props = {
  searchParams: Promise<{ ages?: string }>;
};

export default async function DjurparkerPage({ searchParams }: Props) {
  const { ages } = await searchParams;
  const selectedAges = parseAgesParam(ages);

  return (
    <BarnCategoryPageView
      category="djurparker-och-akvarier"
      selectedAges={selectedAges}
      hero={{
        imageSrc: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
        imageAlt: 'Akvarietunnel med hajar och tropiska fiskar — djurupplevelser på Mallorca',
        title: 'Djurparker & akvarier på Mallorca',
        subtitle:
          'Fyra djurparksupplevelser: Europas mest omfattande akvarium, traditionell delfinshow, zoologisk park med 500+ djur och en unik bilsafari.',
      }}
      intro={
        <>
          <p style={{ marginTop: 0 }}>
            Mallorca har två akvarier och tre djurparker värda en dagsutflykt. Palma Aquarium är
            flaggskeppet med hajtanken Big Blue och 700 arter; Marineland är den klassiska familjefavoriten
            med delfinshow och papegojor; Natura Parc passar särskilt småbarn som vill ha en lugnare
            dag; och Safari Zoo i Sa Coma erbjuder en helt unik upplevelse där man kör sin egen bil
            bland giraffer och strutsar.
          </p>
          <p>
            Använd åldersfiltret för att hitta den bästa kombinationen för era barn — vi har testat
            varje plats och noterat vilka åldersgrupper som får ut mest av besöket.
          </p>
        </>
      }
    />
  );
}
