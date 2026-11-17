import Image from 'next/image';
import Link from 'next/link';
import { IconPin, IconExternal } from '@/components/Icons';
import AgeGroupChip from './AgeGroupChip';
import type { Activity, Category } from '@/app/lib/barn-activities';
import { getCategoryMeta } from '@/app/lib/barn-activities';

export type ActivityCardProps = {
  activity: Activity;
  /** Which category page we are rendering inside — used to build the anchor href. */
  cardCategory: Category;
};

export default function ActivityCard({ activity, cardCategory }: ActivityCardProps) {
  const meta = getCategoryMeta(cardCategory);
  const href = meta ? `${meta.href}#${activity.slug}` : `#${activity.slug}`;

  return (
    <Link
      href={href}
      aria-label={`${activity.name} — läs mer`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          background: '#eeede4',
          overflow: 'hidden',
        }}
      >
        <Image
          src={`${activity.imageUrl}?w=960&q=80`}
          alt={activity.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={{ objectFit: 'cover' }}
        />
        {meta && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '4px 10px',
              background: 'rgba(56, 58, 70, 0.92)',
              color: 'white',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}
          >
            {meta.label}
          </span>
        )}
        {activity.indoors && (
          <span
            title="Inomhus"
            aria-label="Inomhus"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '4px 8px',
              background: 'rgba(255,255,255,0.95)',
              color: '#383a46',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Inomhus
          </span>
        )}
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            letterSpacing: '0.03em',
            margin: 0,
            color: '#383a46',
            lineHeight: 1.15,
          }}
        >
          {activity.name}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {activity.ageGroups.map((age) => (
            <AgeGroupChip key={age} age={age} />
          ))}
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.55,
            color: '#4b5563',
            margin: 0,
            flexGrow: 1,
          }}
        >
          {activity.shortDescription}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <IconPin size={12} /> {activity.location}
          </span>
          {typeof activity.priceFrom === 'number' && (
            <span style={{ fontSize: '0.78rem', color: '#993335', fontWeight: 700 }}>
              från {activity.priceFrom} €
            </span>
          )}
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#993335',
            marginTop: '2px',
          }}
        >
          Läs mer <IconExternal size={12} stroke={1.8} />
        </span>
      </div>
    </Link>
  );
}
