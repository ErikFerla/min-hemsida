import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Coves_del_Drac_21.jpg/1920px-Coves_del_Drac_21.jpg';

export const metadata = buildPageMetadata({
  path: '/barn/grottor',
  title: 'Grottor på Mallorca med barn – 5 att besöka',
  description:
    'Coves del Drac, Coves dels Hams, Coves d’Artà, Coves de Campanet och Coves de Gènova i Palma – öppettider, priser 2026 och tips för barnfamiljer.',
  image: IMAGE,
  imageWidth: 1920,
  imageHeight: 1080,
  imageAlt: 'Droppstenar och underjordisk sjö i Coves del Drac',
});

export default function GrottorPage() {
  return (
    <BarnCategoryPageView
      category="grottor"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Droppstenar och underjordisk sjö i Coves del Drac',
        title: 'Grottor på Mallorca',
        subtitle: 'Fem grottor som fungerar för barnfamiljer – svalt på sommaren och torrt när det regnar.',
      }}
      intro={
        <>
          <p>
            Mallorcas kalkberg är fulla av grottor, och flera av dem är öppna för besökare med guidade
            visningar. Coves del Drac och Coves dels Hams ligger nära varandra vid Porto Cristo på
            östkusten, Coves d&apos;Artà ligger i klippan vid Canyamel och Coves de Campanet i
            inlandet på norra Mallorca. Bor ni i Palma är de små Coves de Gènova närmast – en kort
            visning bara några minuter från centrum.
          </p>
          <p>
            Under jord är det svalt året runt, ungefär 17–20 °C. Det gör grottorna till ett bra
            val både en het eftermiddag i juli och en regnig dag i november. Ta med en tunn tröja till
            barnen och skor som sitter fast – det kan vara fuktigt och trappigt.
          </p>
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES.grottor ?? [] }}
    />
  );
}
