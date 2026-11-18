import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zip_Line_Canopy_Tour_Costa_Rica.jpg/1920px-Zip_Line_Canopy_Tour_Costa_Rica.jpg';

export const metadata = buildPageMetadata({
  path: '/barn/aventyrsparker',
  title: 'Äventyrsparker på Mallorca för barn',
  description:
    'Klätterbanor och linbanor bland träden på Mallorca: Jungle Parc i Santa Ponça och Tirolinas Go nära Palma – längdgränser, säsong och tips.',
  image: IMAGE,
  imageWidth: 1920,
  imageHeight: 1440,
  imageAlt: 'Linbana mellan trädtopparna – genrebild, inte från parkerna på Mallorca',
});

export default function AventyrsparkerPage() {
  return (
    <BarnCategoryPageView
      category="aventyrsparker"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Linbana mellan trädtopparna – genrebild, inte från parkerna på Mallorca',
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
