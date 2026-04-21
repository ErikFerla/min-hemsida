import type { ReactNode } from 'react';
import CategoryHero from './CategoryHero';
import Breadcrumbs from './Breadcrumbs';
import AgeFilter from './AgeFilter';
import ActivityDetail from './ActivityDetail';
import {
  getActivitiesByCategory,
  getCategoryMeta,
  filterByAge,
  CATEGORIES,
  type AgeGroup,
  type Category,
} from '@/app/lib/barn-activities';
import {
  buildItemListJsonLd,
  buildBreadcrumbJsonLd,
  stringifyJsonLd,
} from '@/app/lib/barn-jsonld';

export type BarnCategoryPageViewProps = {
  category: Category;
  selectedAges: AgeGroup[];
  hero: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
  };
  intro: ReactNode;
};

/**
 * Shared layout for the three /barn/<slug> category pages.
 * Hub (/barn) does NOT use this — it has its own compose.
 */
export default function BarnCategoryPageView({
  category,
  selectedAges,
  hero,
  intro,
}: BarnCategoryPageViewProps) {
  const meta = getCategoryMeta(category);
  if (!meta) {
    // Defensive — caller should guarantee a valid category
    throw new Error(`Unknown category: ${category}`);
  }
  const allActivities = getActivitiesByCategory(category);
  const visibleActivities = filterByAge(allActivities, selectedAges);

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
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbJsonLd) }}
      />

      <CategoryHero
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px)',
        }}
      >
        <Breadcrumbs items={breadcrumbs} />

        <section style={{ margin: 'clamp(24px, 4vw, 40px) 0' }}>
          <div style={{ maxWidth: '68ch', fontSize: '1.02rem', lineHeight: 1.7, color: '#374151' }}>
            {intro}
          </div>
        </section>

        <div
          className="age-filter-wrapper"
          style={{
            position: 'sticky',
            top: '72px',
            zIndex: 40,
            background: 'rgba(254, 254, 251, 0.94)',
            backdropFilter: 'blur(8px)',
            padding: '14px 0',
            marginBottom: '28px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <AgeFilter
            totalCount={allActivities.length}
            visibleCount={visibleActivities.length}
          />
        </div>

        {visibleActivities.length === 0 ? (
          <div
            role="status"
            style={{
              padding: '32px',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.06)',
              textAlign: 'center',
              color: '#6b7280',
            }}
          >
            Inga aktiviteter matchar valda åldersgrupper. Prova att rensa filtret.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {visibleActivities.map((a) => (
              <ActivityDetail key={a.slug} activity={a} />
            ))}
          </div>
        )}

        {/* Bottom CTA — links to hub + related categories */}
        <section
          style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            padding: 'clamp(24px, 4vw, 40px)',
            background: '#eeede4',
            borderRadius: '16px',
          }}
          aria-labelledby="fler-aktiviteter-heading"
        >
          <h2
            id="fler-aktiviteter-heading"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              letterSpacing: '0.04em',
              margin: '0 0 12px',
              color: '#383a46',
            }}
          >
            Utforska fler barnaktiviteter
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#4b5563', margin: '0 0 20px', lineHeight: 1.6 }}>
            Hitta fler aktiviteter för hela familjen — filtrera efter ålder och kategori på hub-sidan.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a
              href="/barn"
              style={{
                padding: '12px 20px',
                background: '#993335',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Alla barnaktiviteter
            </a>
            {relatedCategories.map((c) => (
              <a
                key={c.slug}
                href={c.href}
                style={{
                  padding: '12px 20px',
                  background: 'white',
                  color: '#383a46',
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
