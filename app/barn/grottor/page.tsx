import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7';

export const metadata = buildPageMetadata({
  path: '/barn/grottor',
  title: 'Grottor på Mallorca med barn – 4 att besöka',
  description:
    'Coves del Drac, Coves dels Hams, Coves d’Artà och Coves de Campanet – öppettider, ungefärliga priser 2026 och tips för barnfamiljer.',
  image: `${IMAGE}?w=1200&h=630&fit=crop&q=85`,
  imageAlt: 'Droppstensgrotta på Mallorca',
});

export default function GrottorPage() {
  return (
    <BarnCategoryPageView
      category="grottor"
      hero={{
        imageSrc: IMAGE,
        imageAlt: 'Droppstensgrotta på Mallorcas östkust',
        title: 'Grottor på Mallorca',
        subtitle: 'Fyra grottor som fungerar för barnfamiljer – svalt på sommaren och torrt när det regnar.',
      }}
      intro={
        <>
          <p>
            Mallorcas kalkberg är fulla av grottor, och fyra av dem är öppna för besökare med guidade
            visningar. Coves del Drac och Coves dels Hams ligger nära varandra vid Porto Cristo på
            östkusten, Coves d&apos;Artà ligger i klippan vid Canyamel och Coves de Campanet i
            inlandet på norra Mallorca.
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
