import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CategoryHero from '@/app/components/CategoryHero';
import AgeFilter from '@/app/components/AgeFilter';
import ActivityCard from '@/app/components/ActivityCard';
import InsiderTipBox from '@/app/components/InsiderTipBox';
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
        url: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85',
        width: 1200,
        height: 630,
        alt: 'Familj på en vattenpark på Mallorca – barnaktiviteter för hela familjen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85'],
  },
};

const INSIDER_TIPS: string[] = [
  'Bokning: vattenparker och Palma Aquarium — köp biljetterna online, ofta blir det billigare och ni slipper köerna.',
  'Bästa tid: besök Katmandu-parken efter lunch — morgonen är packad med bussgrupper.',
  'Regnplan: när det regnar, boka Palma Jump eller Kids Republik samma morgon — tiderna tar slut snabbt.',
  'Småbarn: Hidropark i norr är mycket lugnare än parkerna i Palma — värt 45 min bilresa om ni har 2–5-åringar.',
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
    'Mallorca med barn — alla aktiviteter',
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
        imageSrc="https://images.unsplash.com/photo-1530870110042-98b2cb110834"
        imageAlt="Barnfamilj vid en vattenpark på Mallorca"
        kicker="Familjeresan"
        title="Mallorca med barn"
        subtitle="Handplockade aktiviteter utöver stranden – vattenparker, djurparker, grottor, äventyr, museer och natur"
      />

      <div className={styles.inner}>
        <Breadcrumbs items={breadcrumbs} />

        {/* ========== INTRO ========== */}
        <section className={styles.introSection}>
          <div className={styles.introText}>
            <p>
              Mallorca är ett av Europas mest barnvänliga resmål, och ön har gott om aktiviteter för
              familjer som inte har med stranden att göra. Vattenparker, akvarier, trampolinparker,
              äventyrsparker, grottor, djurparker, museer och historiska tåg — det finns något för
              alla åldrar.
            </p>
            <p>
              Här har vi samlat Mallorcas bästa barnaktiviteter, sorterade efter typ och åldersgrupp.
              Oavsett om ni är ute efter en regnig reservplan, en hel dag med äventyr eller lugna
              inomhusaktiviteter med småbarn — använd filtret nedan för att hitta det som passar just
              er familj.
            </p>
          </div>
        </section>

        {/* ========== CATEGORY GRID ========== */}
        <section className={styles.block} aria-labelledby="kategorier-heading">
          <h2 id="kategorier-heading" className={styles.sectionTitle}>
            Utforska efter kategori
          </h2>
          <ul className={styles.categoryGrid}>
            {countsByCategory.map((c) => {
              return (
                <li key={c.slug}>
                  <Link href={c.href} className={styles.categoryCard}>
                    {c.heroImage && (
                      <div className={styles.categoryMedia}>
                        <Image
                          src={`${c.heroImage}?w=960&q=80`}
                          alt={`${c.label} – barnaktiviteter på Mallorca`}
                          width={640}
                          height={400}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className={styles.categoryImage}
                        />
                      </div>
                    )}
                    <div className={styles.categoryBody}>
                      <div className={styles.categoryTitleRow}>
                        <span className={styles.categoryName}>
                          {c.label}
                        </span>
                        <span className={styles.categoryCount}>
                          ({c.count})
                        </span>
                      </div>
                      <p className={styles.categoryTagline}>
                        {c.shortTagline}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ========== INSIDER TIPS (before activity list per spec) ========== */}
        <section className={styles.block} aria-labelledby="insider-tips-heading">
          <h2 id="insider-tips-heading" className="sr-only">
            Insider-tips från lokalkännare
          </h2>
          <InsiderTipBox
            heading="5 råd från en lokalbo"
            tips={INSIDER_TIPS}
          />
        </section>

        {/* ========== ACTIVITY LIST WITH FILTER ========== */}
        <section className={styles.activities} aria-labelledby="alla-aktiviteter-heading">
          <h2 id="alla-aktiviteter-heading" className={styles.sectionTitle}>
            Alla aktiviteter
          </h2>
          <p className={styles.listIntro}>
            {ACTIVITIES.length} handplockade aktiviteter i {AVAILABLE_CATEGORIES.length} kategorier. Filtrera efter ålder
            eller klicka dig vidare till respektive kategorisida för mer detaljer.
          </p>

          <div className={styles.filterBar}>
            <AgeFilter listId={LIST_ID} itemAges={ACTIVITIES.map((a) => a.ageGroups)} />
          </div>

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
