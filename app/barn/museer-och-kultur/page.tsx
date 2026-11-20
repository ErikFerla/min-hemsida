import Link from 'next/link';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/035_2015_06_02_Castell_de_Bellver.jpg/1920px-035_2015_06_02_Castell_de_Bellver.jpg';

export const metadata = buildPageMetadata({
  path: '/barn/museer-och-kultur',
  title: 'Museer och kultur för barn på Mallorca',
  description:
    'Castell de Bellver, Fundació Miró, Castell de Capdepera, Els Calderers och fler – museer och kultur som fungerar för barn på Mallorca.',
  image: IMAGE,
  imageWidth: 1920,
  imageHeight: 1136,
  imageAlt: 'Den runda borggården med arkader i Castell de Bellver i Palma',
});

export default function MuseerOchKulturPage() {
  return (
    <BarnCategoryPageView
      category="museer-och-kultur"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Den runda borggården med arkader i Castell de Bellver i Palma',
        title: 'Museer och kultur för barn',
        subtitle: 'Ett runt slott, konst i en gammal stadsmur och sport i Manacor – kultur som barnen orkar med.',
      }}
      intro={
        <>
          <p>
            De flesta av öns museer för barnfamiljer ligger i Palma och går att kombinera med en
            promenad i gamla stan. Castell de Bellver är det självklara förstavalet: ett runt slott med
            vallgrav och utsikt, gratis för barn under 14 år och för alla på söndagar.
          </p>
          <p>
            Es Baluard och CaixaForum har växlande utställningar och återkommande familjeaktiviteter,
            och i Manacor finns Rafa Nadals interaktiva sportmuseum. Flera av dem passar också en
            regnig dag – se även <Link href="/barn/inomhus-och-regn">inomhus och regn</Link>.
          </p>
          <p>
            Utanför Palma kan barnen gå på murarna i Castell de Capdepera i nordost, se hur en stor
            gård fungerade förr på Els Calderers mitt på ön och besöka klostret i Lluc uppe i bergen.
            I Cala Major, strax väster om centrum, ligger Joan Mirós gamla ateljéer – gratis för barn
            och unga under 16 år.
          </p>
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES['museer-och-kultur'] ?? [] }}
    />
  );
}
