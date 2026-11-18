import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://images.unsplash.com/photo-1533105079780-92b9be482077';

export const metadata = buildPageMetadata({
  path: '/barn/aventyrsparker',
  title: 'Äventyrsparker på Mallorca för barn',
  description:
    'Klätterbanor och linbanor bland träden på Mallorca: Jungle Parc i Santa Ponça och Tirolinas Go nära Palma – längdgränser, säsong och tips.',
  image: `${IMAGE}?w=1200&h=630&fit=crop&q=85`,
  imageAlt: 'Linbana mellan träd i en äventyrspark på Mallorca',
});

export default function AventyrsparkerPage() {
  return (
    <BarnCategoryPageView
      category="aventyrsparker"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Linbana mellan träd i en äventyrspark på Mallorca',
        title: 'Äventyrsparker på Mallorca',
        subtitle: 'Klätterbanor och linbanor bland trädtopparna – för barn från ungefär fyra år.',
      }}
      intro={
        <>
          <p>
            På Mallorca finns två större äventyrsparker med banor i träden: Jungle Parc i Santa Ponça
            och Tirolinas Go Mallorca, tidigare Forestal Park, nära Palma. Båda har enklare banor för
            barn och svårare banor för tonåringar och vuxna, och alla bär sele hela vägen.
          </p>
          <p>
            Det är barnets längd, inte åldern, som avgör vilka banor det får gå. Mät barnen hemma och
            jämför med gränserna nedan. Parkerna har säsongsöppet och stänger vissa veckodagar, så
            kontrollera öppetdagarna innan ni åker.
          </p>
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES.aventyrsparker ?? [] }}
    />
  );
}
