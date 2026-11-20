import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

export const metadata: Metadata = {
  title: 'Inomhus och regn – barnaktiviteter på Mallorca',
  description:
    'När det regnar eller solen är för stark – inomhusaktiviteter för barnfamiljer på Mallorca: trampolinpark, lekland, akvarium, museer och grottor.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/inomhus-och-regn' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/inomhus-och-regn',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Inomhus och regn – barnaktiviteter på Mallorca',
    description:
      'När det regnar eller solen är för stark – inomhusaktiviteter för barnfamiljer på Mallorca.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Palma_Aquarium-La_jungla.jpg/1920px-Palma_Aquarium-La_jungla.jpg',
        width: 1920,
        height: 1280,
        alt: 'Vattenfall i inomhusdjungeln på Palma Aquarium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inomhus och regn – barnaktiviteter på Mallorca',
    description:
      'När det regnar eller solen är för stark – inomhusaktiviteter för barnfamiljer på Mallorca.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Palma_Aquarium-La_jungla.jpg/1920px-Palma_Aquarium-La_jungla.jpg'],
  },
};

export default function InomhusOchRegnPage() {
  return (
    <BarnCategoryPageView
      category="inomhus-och-regn"
      hero={{
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Palma_Aquarium-La_jungla.jpg/1920px-Palma_Aquarium-La_jungla.jpg',
        imageAlt: 'Vattenfall i inomhusdjungeln på Palma Aquarium',
        title: 'Inomhus & regn',
        subtitle:
          'Handplockade räddningar när regnet kommer – eller när sommarsolen är för stark för små barn mitt på dagen.',
      }}
      intro={
        <>
          <p>
            Hösten har några veckor då regnet kommer i kraftiga skurar – och på sommaren finns många
            dagar då solen är för stark för småbarn mellan kl. 12 och 16. Det är då du behöver en lista
            med inomhusalternativ som faktiskt fungerar.
          </p>
          <p>
            Här är våra val: Mallorcas största trampolinpark, ett lekland i tre våningar
            mitt i Palma, ett av Europas största akvarier (helt inomhus), en interaktiv
            sportupplevelse vid Rafa Nadals akademi, bowlinghallen som är lätt att nå från Palma,
            kulturella alternativ med familjeverkstäder – och grottorna, där vädret aldrig spelar någon roll.
            Bor ni i Palma ligger de små grottorna Coves de Gènova bara några minuter från centrum, och
            i Katmandu Park i Magaluf är många av attraktionerna inomhus.
          </p>
          <p>
            <strong>Tips:</strong> på regniga dagar bokas Palma Jump och Kids Republik snabbt – kolla
            tillgängliga tider online så fort morgonen visar sig regnig.
          </p>
        </>
      }
      lastChecked={{
        date: BARN_CHECKED,
        sources: BARN_SOURCES['inomhus-och-regn'] ?? [],
        note: 'Priser och öppettider ändras ofta – kontrollera alltid på respektive webbplats före besöket.',
      }}
    />
  );
}
