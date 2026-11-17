import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CategoryHero from '@/app/components/CategoryHero';
import AgeFilter from '@/app/components/AgeFilter';
import ActivityCard from '@/app/components/ActivityCard';
import InsiderTipBox from '@/app/components/InsiderTipBox';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { ACTIVITIES, CATEGORIES } from '@/app/lib/barn-activities';
import { buildItemListJsonLd, buildBreadcrumbJsonLd } from '@/app/lib/barn-jsonld';

const AVAILABLE_CATEGORIES = CATEGORIES.filter((c) => c.available);

const META_TITLE = `Mallorca med barn – ${ACTIVITIES.length} barnaktiviteter`;
const META_DESCRIPTION =
  'Barnaktiviteter på Mallorca som inte handlar om stranden – vattenparker, djurparker, akvarier och tips för regniga dagar. Filtrera efter ålder. Svensk guide.';

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
  'Transport: Tren de Sóller är en aktivitet i sig — billigare än många "riktiga" attraktioner och barn älskar det.',
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
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <CategoryHero
        imageSrc="https://images.unsplash.com/photo-1530870110042-98b2cb110834"
        imageAlt="Barnfamilj vid en vattenpark på Mallorca"
        kicker="Familjeresan"
        title="Mallorca med barn"
        subtitle="Handplockade aktiviteter utöver stranden – vattenparker, djurparker och planer för regniga dagar"
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px)',
        }}
      >
        <Breadcrumbs items={breadcrumbs} />

        {/* ========== INTRO ========== */}
        <section style={{ margin: 'clamp(24px, 4vw, 40px) 0 clamp(40px, 6vw, 64px)' }}>
          <div
            style={{
              maxWidth: '72ch',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: '#374151',
            }}
          >
            <p style={{ marginTop: 0 }}>
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
        <section style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }} aria-labelledby="kategorier-heading">
          <h2
            id="kategorier-heading"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              letterSpacing: '0.04em',
              color: '#383a46',
              margin: '0 0 24px',
            }}
          >
            Utforska efter kategori
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
            }}
          >
            {countsByCategory.map((c) => {
              return (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      height: '100%',
                    }}
                  >
                    {c.heroImage && (
                      <div
                        style={{
                          aspectRatio: '16 / 10',
                          background: '#eeede4',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={`${c.heroImage}?w=960&q=80`}
                          alt={`${c.label} – barnaktiviteter på Mallorca`}
                          width={640}
                          height={400}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '18px 22px 20px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: '8px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '1.25rem',
                            letterSpacing: '0.04em',
                            color: '#383a46',
                          }}
                        >
                          {c.label}
                        </span>
                        <span style={{ color: '#993335', fontSize: '0.9rem', fontWeight: 600 }}>
                          ({c.count})
                        </span>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.9rem',
                          lineHeight: 1.55,
                          color: '#4b5563',
                        }}
                      >
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
        <section style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }} aria-labelledby="insider-tips-heading">
          <h2
            id="insider-tips-heading"
            style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
          >
            Insider-tips från lokalkännare
          </h2>
          <InsiderTipBox
            heading="5 råd från en lokalbo"
            tips={INSIDER_TIPS}
          />
        </section>

        {/* ========== ACTIVITY LIST WITH FILTER ========== */}
        <section aria-labelledby="alla-aktiviteter-heading">
          <h2
            id="alla-aktiviteter-heading"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              letterSpacing: '0.04em',
              color: '#383a46',
              margin: '0 0 12px',
            }}
          >
            Alla aktiviteter
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: '0 0 24px', maxWidth: '60ch' }}>
            {ACTIVITIES.length} handplockade aktiviteter i {AVAILABLE_CATEGORIES.length} kategorier. Filtrera efter ålder
            eller klicka dig vidare till respektive kategorisida för mer detaljer.
          </p>

          <div
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
            <AgeFilter listId={LIST_ID} itemAges={ACTIVITIES.map((a) => a.ageGroups)} />
          </div>

          <div
            id={`${LIST_ID}-tom`}
            className="a2-age-empty"
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
          <ul
            id={LIST_ID}
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
            }}
          >
            {ACTIVITIES.map((a) => (
              <li key={a.slug} data-ages={a.ageGroups.join(' ')}>
                <ActivityCard activity={a} cardCategory={a.categories[0]} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
