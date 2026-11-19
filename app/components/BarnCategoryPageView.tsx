import type { ReactNode } from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';
import CategoryHero from './CategoryHero';
import Breadcrumbs from './Breadcrumbs';
import AgeFilter from './AgeFilter';
import ActivityDetail from './ActivityDetail';
import LastChecked, { type Source } from './LastChecked';
import {
  getActivitiesByCategory,
  getCategoryMeta,
  CATEGORIES,
  type Category,
} from '@/app/lib/barn-activities';
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from '@/app/lib/barn-jsonld';
import styles from './BarnCategoryPageView.module.css';

export type BarnCategoryPageViewProps = {
  category: Category;
  hero: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
  };
  intro: ReactNode;
  /** Faktagranskning (3.7): datum och källor som visas längst ner. */
  lastChecked?: { date: string; sources: Source[] };
};

/**
 * Shared layout for the /barn/<slug> category pages.
 * Hub (/barn) does NOT use this – it has its own compose.
 */
export default function BarnCategoryPageView({
  category,
  hero,
  intro,
  lastChecked,
}: BarnCategoryPageViewProps) {
  const meta = getCategoryMeta(category);
  if (!meta) {
    // Defensive – caller should guarantee a valid category
    throw new Error(`Unknown category: ${category}`);
  }
  const allActivities = getActivitiesByCategory(category);
  const listId = `aktiviteter-${category}`;

  const breadcrumbs = [
    { name: 'Hem', url: '/' },
    { name: 'Barnvänligt', url: '/barn' },
    { name: meta.label, url: meta.href },
  ];

  const relatedCategories = CATEGORIES.filter(
    (c) => c.available && c.slug !== category,
  );

  const itemListJsonLd = buildItemListJsonLd(
    allActivities,
    category,
    `${meta.label} på Mallorca`,
  );
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className={styles.page}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <CategoryHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <section className={styles.introSection}>
          <div className={styles.intro}>{intro}</div>
        </section>

        {/* Åldersfiltret ligger kvar under sidhuvudet när man skrollar */}
        <div className={styles.filter}>
          <AgeFilter listId={listId} itemAges={allActivities.map((a) => a.ageGroups)} />
        </div>

        <div id={`${listId}-tom`} className={`a2-age-empty ${styles.empty}`} role="status">
          Inga aktiviteter matchar valda åldersgrupper. Prova att rensa filtret.
        </div>
        <div id={listId} className={styles.list}>
          {allActivities.map((a) => (
            <div key={a.slug} data-ages={a.ageGroups.join(' ')}>
              <ActivityDetail activity={a} />
            </div>
          ))}
        </div>

        {lastChecked && <LastChecked date={lastChecked.date} sources={lastChecked.sources} />}

        {/* Avslutande länkar till navsidan och övriga kategorier */}
        <section className={styles.more} aria-labelledby="fler-aktiviteter-heading">
          <h2 id="fler-aktiviteter-heading" className={styles.moreTitle}>
            Utforska fler barnaktiviteter
          </h2>
          <p className={styles.moreText}>
            Hitta fler aktiviteter för hela familjen – filtrera efter ålder och kategori på översiktssidan.
          </p>
          <Link href="/barn" className="btn btn-primary">
            Alla barnaktiviteter
          </Link>
          <ul className={styles.links}>
            {relatedCategories.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className="link-arrow">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
