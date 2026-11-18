import Link from 'next/link';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cala_Mondrag%C3%B3_02.jpg/1920px-Cala_Mondrag%C3%B3_02.jpg';

export const metadata = buildPageMetadata({
  path: '/barn/natur-och-utomhus',
  title: 'Natur och utomhus med barn på Mallorca',
  description:
    'Naturparkerna s’Albufera och Mondragó, och tåget till Sóller genom Serra de Tramuntana – natur och utflykter för barnfamiljer på Mallorca.',
  image: IMAGE,
  imageWidth: 1920,
  imageHeight: 1440,
  imageAlt: 'Segelbåtar i viken Cala Mondragó i Parc Natural de Mondragó',
});

export default function NaturOchUtomhusPage() {
  return (
    <BarnCategoryPageView
      category="natur-och-utomhus"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Segelbåtar i viken Cala Mondragó i Parc Natural de Mondragó',
        title: 'Natur och utomhus med barn',
        subtitle: 'Fågeltorn, skyltade slingor och ett hundraårigt tåg över bergen.',
      }}
      intro={
        <>
          <p>
            Mallorca har gott om natur som går att uppleva med barn utan långa vandringar. I
            naturparken s&apos;Albufera i norr är stigarna platta och entrén gratis, och i Mondragó
            på sydöstra kusten kan ni kombinera korta slingor med bad i skyddade vikar.
          </p>
          <p>
            Tåget mellan Palma och Sóller är en upplevelse i sig, och från Port de Sóller går det
            båtar längs kusten. Mer om det på sidorna om{' '}
            <Link href="/dagsturer-utan-bil">dagsturer utan bil</Link> och{' '}
            <Link href="/batutflykter-och-cabrera">båtutflykter och Cabrera</Link>.
          </p>
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES['natur-och-utomhus'] ?? [] }}
    />
  );
}
