import { IconPin, IconClock, IconExternal, IconMap } from '@/components/Icons';
import AgeGroupChip from './AgeGroupChip';
import type { Activity } from '@/app/lib/barn-activities';

const UNSPLASH_WIDTHS = [480, 640, 960, 1280];

function buildUrl(base: string, w: number) {
  return `${base}?w=${w}&q=80&fm=webp&auto=format`;
}
function buildSrcSet(base: string) {
  return UNSPLASH_WIDTHS.map((w) => `${buildUrl(base, w)} ${w}w`).join(', ');
}

export type ActivityDetailProps = {
  activity: Activity;
};

/**
 * Full activity listing used on category pages. Anchor ID matches slug so the hub
 * can link directly (e.g. /barn/vattenparker#aqualand-el-arenal).
 */
export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activity.mapQuery,
  )}`;

  return (
    <article
      id={activity.slug}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '20px',
        padding: '28px',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        scrollMarginTop: '96px', /* nav offset when jumping via anchor */
      }}
      className="activity-detail"
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: '12px', overflow: 'hidden', background: '#eeede4' }}>
        <img
          src={buildUrl(activity.imageUrl, 960)}
          srcSet={buildSrcSet(activity.imageUrl)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          alt={activity.imageAlt}
          width={960}
          height={600}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {activity.indoors && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '5px 10px',
              background: 'rgba(255,255,255,0.95)',
              color: '#383a46',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Inomhus
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <header>
          <h2
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              letterSpacing: '0.04em',
              margin: '0 0 10px',
              color: '#383a46',
              lineHeight: 1.1,
            }}
          >
            {activity.name}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {activity.ageGroups.map((age) => (
              <AgeGroupChip key={age} age={age} size="md" />
            ))}
          </div>
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: '#6b7280',
              margin: 0,
            }}
          >
            <IconPin size={14} /> {activity.location}
          </p>
        </header>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
          {activity.longDescription ?? activity.shortDescription}
        </p>

        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px 20px',
            margin: 0,
            fontSize: '0.88rem',
            color: '#374151',
          }}
        >
          {(typeof activity.priceFrom === 'number' || activity.priceNote) && (
            <div>
              <dt style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700, marginBottom: '2px' }}>
                Pris
              </dt>
              <dd style={{ margin: 0, lineHeight: 1.5 }}>
                {typeof activity.priceFrom === 'number' && (
                  <strong style={{ color: '#993335' }}>från {activity.priceFrom} €</strong>
                )}
                {activity.priceNote && (
                  <span style={{ display: 'block', color: '#6b7280', fontSize: '0.82rem' }}>
                    {activity.priceNote}
                  </span>
                )}
              </dd>
            </div>
          )}
          {activity.openingHours && (
            <div>
              <dt style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700, marginBottom: '2px' }}>
                <IconClock size={12} style={{ verticalAlign: '-1px', marginRight: 4 }} /> Öppettider
              </dt>
              <dd style={{ margin: 0, lineHeight: 1.5 }}>{activity.openingHours}</dd>
            </div>
          )}
          {activity.bestTime && (
            <div>
              <dt style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700, marginBottom: '2px' }}>
                Bästa tid
              </dt>
              <dd style={{ margin: 0, lineHeight: 1.5 }}>{activity.bestTime}</dd>
            </div>
          )}
        </dl>

        {activity.insiderTip && (
          <div
            style={{
              background: 'rgba(153,51,53,0.06)',
              border: '1px solid rgba(153,51,53,0.16)',
              borderLeft: '4px solid #993335',
              borderRadius: '8px',
              padding: '14px 16px',
            }}
          >
            <p
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#993335',
                fontWeight: 700,
                margin: '0 0 6px',
              }}
            >
              Insider-tips
            </p>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#374151', margin: 0 }}>
              {activity.insiderTip}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: '#993335',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              minHeight: '40px',
            }}
          >
            <IconMap size={14} /> Visa på karta <IconExternal size={12} stroke={1.8} />
          </a>
          {activity.bookingUrl && (
            <a
              href={activity.bookingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                background: '#383a46',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                minHeight: '40px',
              }}
            >
              Boka <IconExternal size={12} stroke={1.8} />
            </a>
          )}
          {activity.website && (
            <a
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                background: 'white',
                color: '#383a46',
                border: '1.5px solid rgba(0,0,0,0.12)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                minHeight: '40px',
              }}
            >
              Hemsida <IconExternal size={12} stroke={1.8} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
