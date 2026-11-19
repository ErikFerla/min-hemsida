import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CategoryHero from '@/app/components/CategoryHero';
import AgeFilter from '@/app/components/AgeFilter';
import ActivityCard from '@/app/components/ActivityCard';
import TipBox from '@/components/TipBox';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked from '@/app/components/LastChecked';
import { ACTIVITIES, BARN_CHECKED, BARN_SOURCES, CATEGORIES } from '@/app/lib/barn-activities';
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from '@/app/lib/barn-jsonld';
import styles from './barn.module.css';

const AVAILABLE_CATEGORIES = CATEGORIES.filter((c) => c.available);

const META_TITLE = `Mallorca med barn – ${ACTIVITIES.length} barnaktiviteter`;
const META_DESCRIPTION =
  'Barnaktiviteter på Mallorca utöver stranden – vattenparker, djurparker, grottor, äventyrsparker, museer, natur och regndagstips. Filtrera efter ålder.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: 'https://www.mymallorca.se/barn' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/S%C3%B3ller_train_station_15.jpg/1920px-S%C3%B3ller_train_station_15.jpg',
        width: 1920,
        height: 1280,
        alt: 'Det gamla trätåget till Sóller vid stationen i Sóller',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/S%C3%B3ller_train_station_15.jpg/1920px-S%C3%B3ller_train_station_15.jpg'],
  },
};

const INSIDER_TIPS: string[] = [
  'Bokning: vattenparker och Palma Aquarium – köp biljetterna online, ofta blir det billigare och ni slipper köerna.',
  'Bästa tid: besök Katmandu-parken efter lunch – morgonen är packad med bussgrupper.',
  'Regnplan: när det regnar, boka Palma Jump eller Kids Republik samma morgon – tiderna tar slut snabbt.',
  'Småbarn: Hidropark i norr är mycket lugnare än parkerna i Palma – värt 45 min bilresa om ni har 2–5-åringar.',
  'Transport: tåget till Sóller är en aktivitet i sig – och spårvagnen ner till Port de Sóller gör dagen komplett.',
];

const LIST_ID = 'barn-aktiviteter';

export default function BarnHubPage() {
  const breadcrumbs = [
    { name: 'Hem', url: '/' },
    { name: 'Barnvänligt', url: '/barn' },
  ];

  const itemListJsonLd = buildItemListJsonLd(
    ACTIVITIES,
    'hub',
    'Mallorca med barn – alla aktiviteter',
  );
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  // Visa bara kategorier som har innehåll – tomma "Kommer snart"-kategorier döljs.
  const countsByCategory = AVAILABLE_CATEGORIES.map((c) => ({
    ...c,
    count: ACTIVITIES.filter((a) => a.categories.includes(c.slug)).length,
  }));

  return (
    <div className={styles.page}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <CategoryHero
        imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/S%C3%B3ller_train_station_15.jpg/1920px-S%C3%B3ller_train_station_15.jpg"
        imageAlt="Det gamla trätåget till Sóller vid stationen i Sóller"
        kicker="Familjeresan"
        title="Mallorca med barn"
        subtitle="Handplockade aktiviteter utöver stranden – vattenparker, djurparker, grottor, äventyr, museer och natur"
      />

      <div className={styles.inner}>
        <Breadcrumbs items={breadcrumbs} />

        {/* ========== ÅLDERSFILTER – högst upp, fäst under sidhuvudet på mobil ========== */}
        <section className={styles.filterBox} aria-labelledby="alder-heading">
          <div className={styles.filterHead}>
            <p className={styles.kicker}>Börja här</p>
            <h2 id="alder-heading" className={styles.filterTitle}>Hur gamla är barnen?</h2>
          </div>
          <AgeFilter listId={LIST_ID} itemAges={ACTIVITIES.map((a) => a.ageGroups)} />
        </section>

        {/* ========== INTRO + RÅD ========== */}
        <div className={styles.introRow}>
          <div className={styles.introText}>
            <p>
              Mallorca är ett av Europas mest barnvänliga resmål, och ön har gott om aktiviteter för
              familjer som inte har med stranden att göra. Vattenparker, akvarier, trampolinparker,
              äventyrsparker, grottor, djurparker, museer och historiska tåg – det finns något för
              alla åldrar.
            </p>
            <p>
              Här har vi samlat Mallorcas bästa barnaktiviteter, sorterade efter typ och åldersgrupp.
              Oavsett om ni är ute efter en regnig reservplan, en hel dag med äventyr eller lugna
              inomhusaktiviteter med småbarn – använd filtret nedan för att hitta det som passar just
              er familj.
            </p>
          </div>
          <TipBox heading="5 råd från en som bor här" as="h2" signature="Erik">
            <ol>
              {INSIDER_TIPS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </TipBox>
        </div>

        {/* ========== KATEGORIER ========== */}
        <section className={styles.block} aria-labelledby="kategorier-heading">
          <h2 id="kategorier-heading">Utforska efter kategori</h2>
          <ul className={styles.categoryGrid}>
            {countsByCategory.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className={styles.categoryCard}>
                  {c.heroImage && (
                    <Image
                      src={`${c.heroImage}?w=960&q=80`}
                      alt={c.heroImageAlt ?? ''}
                      width={640}
                      height={480}
                      sizes="(max-width: 1023px) 200px, 300px"
                      className={styles.categoryImage}
                    />
                  )}
                  <span className={styles.categoryName}>
                    {c.label} <span className={styles.categoryCount}>({c.count})</span>
                  </span>
                  <span className={styles.categoryTagline}>{c.shortTagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ========== ALLA AKTIVITETER (filtreras av åldersfiltret ovan) ========== */}
        <section className={styles.block} aria-labelledby="alla-aktiviteter-heading">
          <h2 id="alla-aktiviteter-heading">Alla aktiviteter</h2>
          <p className={styles.listIntro}>
            {ACTIVITIES.length} handplockade aktiviteter i {AVAILABLE_CATEGORIES.length} kategorier. Filtrera efter ålder
            eller klicka dig vidare till respektive kategorisida för mer detaljer.
          </p>

          <div
            id={`${LIST_ID}-tom`}
            className={`a2-age-empty ${styles.empty}`}
            role="status"
          >
            Inga aktiviteter matchar valda åldersgrupper. Prova att rensa filtret.
          </div>
          <ul id={LIST_ID} className={styles.activityGrid}>
            {ACTIVITIES.map((a) => (
              <li key={a.slug} data-ages={a.ageGroups.join(' ')}>
                <ActivityCard activity={a} cardCategory={a.categories[0]} />
              </li>
            ))}
          </ul>
        </section>

        <LastChecked
          date={BARN_CHECKED}
          note="Datumet gäller grottor, äventyrsparker, museer och natur. Priser och öppettider ändras ofta – kontrollera alltid på respektive webbplats före besöket."
          sources={Object.values(BARN_SOURCES).flat()}
        />
      </div>
    </div>
  );
}
