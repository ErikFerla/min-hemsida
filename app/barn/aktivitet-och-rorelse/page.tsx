import Link from 'next/link';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Via_Verda_Manacor-Art%C3%A0_01.jpg/1920px-Via_Verda_Manacor-Art%C3%A0_01.jpg';
const IMAGE_ALT = 'Skylt vid en gammal station längs cykelvägen Via Verda mellan Manacor och Artà';

export const metadata = buildPageMetadata({
  path: '/barn/aktivitet-och-rorelse',
  title: 'Aktiv dag med barn på Mallorca',
  description:
    'Trampolinpark, bowling, karting, äventyrsgolf, ridning, cykling på Via Verda och vandring till Castell d’Alaró – aktiva dagar för barnfamiljer på Mallorca.',
  image: IMAGE,
  imageWidth: 1920,
  imageHeight: 1440,
  imageAlt: IMAGE_ALT,
});

export default function AktivitetOchRorelsePage() {
  return (
    <BarnCategoryPageView
      category="aktivitet-och-rorelse"
      hero={{
        imageSrc: IMAGE,
        imageAlt: IMAGE_ALT,
        title: 'Aktiv dag med barn',
        subtitle: 'När barnen behöver röra på sig – från trampoliner och bowling till ridning och cykling.',
      }}
      intro={
        <>
          <p>
            Ibland behöver barnen göra något annat än att bada. Här har vi samlat aktiviteter där hela
            familjen rör på sig: trampolinparken Palma Jump och bowlinghallen i Festival Park när det
            regnar, karting och äventyrsgolf en sen eftermiddag, och ridning, cykling och en kort
            bergsvandring för dagar med lagom väder.
          </p>
          <p>
            På sommaren är det för varmt mitt på dagen för det mesta som görs utomhus. Lägg cykling,
            ridning och vandring tidigt på morgonen eller sent på eftermiddagen. Mer natur för
            barnfamiljer finns under <Link href="/barn/natur-och-utomhus">natur och utomhus</Link>.
          </p>
        </>
      }
      lastChecked={{ date: BARN_CHECKED, sources: BARN_SOURCES['aktivitet-och-rorelse'] ?? [] }}
    />
  );
}
