import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { parseAgesParam } from '@/app/lib/ages';

export const metadata: Metadata = {
  title: 'Mallorca med barn inomhus – 8 aktiviteter när det regnar | MyMallorca',
  description:
    'När det regnar eller solen är för stark – Mallorcas 8 bästa inomhusaktiviteter för barnfamiljer. Trampolinparker, lekland, museer och mer.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/inomhus-och-regn' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/inomhus-och-regn',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Mallorca med barn inomhus – 8 aktiviteter när det regnar | MyMallorca',
    description:
      'När det regnar eller solen är för stark – Mallorcas 8 bästa inomhusaktiviteter för barnfamiljer.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&h=630&fit=crop&q=85',
        width: 1200,
        height: 630,
        alt: 'Barn på en inomhusklätterställning — regndags-aktiviteter på Mallorca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallorca med barn inomhus – 8 aktiviteter när det regnar | MyMallorca',
    description:
      'När det regnar eller solen är för stark – Mallorcas 8 bästa inomhusaktiviteter för barnfamiljer.',
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&h=630&fit=crop&q=85'],
  },
};

type Props = {
  searchParams: Promise<{ ages?: string }>;
};

export default async function InomhusOchRegnPage({ searchParams }: Props) {
  const { ages } = await searchParams;
  const selectedAges = parseAgesParam(ages);

  return (
    <BarnCategoryPageView
      category="inomhus-och-regn"
      selectedAges={selectedAges}
      hero={{
        imageSrc: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
        imageAlt: 'Barn som leker i en färgglad inomhuslekplats med klätterställningar',
        title: 'Inomhus & regn',
        subtitle:
          'Åtta handplockade räddningar när regnet kommer — eller när sommarsolen är för stark för små barn mitt på dagen.',
      }}
      intro={
        <>
          <p style={{ marginTop: 0 }}>
            Mallorca har några sommarveckor där regnet verkligen kommer i skurar — och fler dagar i
            sommaren då solen är för stark för småbarn mellan 12 och 16. Det är då du behöver en kort
            lista med inomhusalternativ som faktiskt funkar.
          </p>
          <p>
            Här är våra åtta testade val: Mallorcas största trampolinpark, ett tre-vånings lekland
            mitt i Palma, Europas mest omfattande akvarium (som är 100% inomhus), en interaktiv
            sportupplevelse vid Rafa Nadals akademi, bowling-centret som är lätt att nå från Palma,
            och tre kulturella alternativ med familjeverkstäder.
          </p>
          <p>
            <strong>Tips:</strong> på regniga dagar bokas Palma Jump och Kids Republik snabbt — kolla
            tillgängliga tider online så fort morgonen visar sig regnig.
          </p>
        </>
      }
    />
  );
}
