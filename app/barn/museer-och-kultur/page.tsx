import Link from 'next/link';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945';

export const metadata = buildPageMetadata({
  path: '/barn/museer-och-kultur',
  title: 'Museer och kultur för barn på Mallorca',
  description:
    'Castell de Bellver, Es Baluard, CaixaForum och Rafa Nadal Museum – museer och kultur som fungerar för barn på Mallorca, med priser och öppettider.',
  image: `${IMAGE}?w=1200&h=630&fit=crop&q=85`,
  imageAlt: 'Modernistisk byggnad i centrala Palma',
});

export default function MuseerOchKulturPage() {
  return (
    <BarnCategoryPageView
      category="museer-och-kultur"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Modernistisk byggnad i centrala Palma',
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
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES['museer-och-kultur'] ?? [] }}
    />
  );
}
