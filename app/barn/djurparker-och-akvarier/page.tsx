import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';

export const metadata: Metadata = {
  title: 'Djurparker & akvarier på Mallorca för barn',
  description:
    'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn. Priser, tips och åldersrekommendationer.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/djurparker-och-akvarier' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/djurparker-och-akvarier',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Djurparker & akvarier på Mallorca för barn',
    description:
      'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG/1920px-Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG',
        width: 1920,
        height: 1275,
        alt: 'Svartfenad revhaj som simmar i en bassäng på Palma Aquarium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djurparker & akvarier på Mallorca för barn',
    description:
      'Palma Aquarium, Marineland, Natura Parc och Safari Zoo – Mallorcas bästa djurupplevelser för barn.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG/1920px-Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG'],
  },
};

export default function DjurparkerPage() {
  return (
    <BarnCategoryPageView
      category="djurparker-och-akvarier"
      hero={{
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG/1920px-Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG',
        imageAlt: 'Svartfenad revhaj som simmar i en bassäng på Palma Aquarium',
        title: 'Djurparker & akvarier på Mallorca',
        subtitle:
          'Fyra djurupplevelser: ett av Europas största akvarier, en klassisk delfinshow, en djurpark med över 500 djur och en bilsafari.',
      }}
      intro={
        <>
          <p>
            Mallorca har två akvarier och tre djurparker värda en dagsutflykt. Palma Aquarium är
            störst, med hajtanken Big Blue och 700 arter; Marineland är den klassiska familjefavoriten
            med delfinshow och papegojor; Natura Parc passar särskilt småbarn som vill ha en lugnare
            dag; och i Safari Zoo i Sa Coma kör ni er egen bil
            bland giraffer och strutsar.
          </p>
          <p>
            Använd åldersfiltret för att hitta den bästa kombinationen för era barn – vi har testat
            varje plats och noterat vilka åldersgrupper som får ut mest av besöket.
          </p>
        </>
      }
    />
  );
}
