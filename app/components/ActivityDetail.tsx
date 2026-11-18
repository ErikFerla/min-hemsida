import Image from 'next/image';
import { cardImageUrl } from '@/app/lib/image-url';
import { IconPin, IconClock, IconExternal, IconMap, IconBulb } from '@/components/Icons';
import AgeGroupChip from './AgeGroupChip';
import styles from './ActivityDetail.module.css';
import type { Activity } from '@/app/lib/barn-activities';

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
    <article id={activity.slug} className={styles.article}>
      <div className={styles.media}>
        <Image
          src={cardImageUrl(activity.imageUrl, 1280)}
          alt={activity.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className={styles.image}
        />
        {activity.indoors && <span className={styles.indoors}>Inomhus</span>}
      </div>

      <div className={styles.content}>
        <header>
          <h2 className={styles.name}>{activity.name}</h2>
          <div className={styles.chips}>
            {activity.ageGroups.map((age) => (
              <AgeGroupChip key={age} age={age} size="md" />
            ))}
          </div>
          <p className={styles.location}>
            <IconPin size={14} /> {activity.location}
          </p>
        </header>

        <p className={styles.text}>
          {activity.longDescription ?? activity.shortDescription}
        </p>

        <dl className={styles.facts}>
          {(typeof activity.priceFrom === 'number' || activity.priceNote) && (
            <div>
              <dt className={styles.term}>Pris</dt>
              <dd className={styles.value}>
                {typeof activity.priceFrom === 'number' && (
                  <strong className={styles.price}>från {activity.priceFrom} €</strong>
                )}
                {activity.priceNote && (
                  <span className={styles.priceNote}>{activity.priceNote}</span>
                )}
              </dd>
            </div>
          )}
          {activity.openingHours && (
            <div>
              <dt className={styles.term}>
                <IconClock size={12} className={styles.termIcon} /> Öppettider
              </dt>
              <dd className={styles.value}>{activity.openingHours}</dd>
            </div>
          )}
          {activity.bestTime && (
            <div>
              <dt className={styles.term}>Bästa tid</dt>
              <dd className={styles.value}>{activity.bestTime}</dd>
            </div>
          )}
        </dl>

        {activity.insiderTip && (
          <div className={styles.tipBox}>
            <p className={styles.tipLabel}>
              <IconBulb size={14} /> Insidertips
            </p>
            <p className={styles.tipText}>{activity.insiderTip}</p>
          </div>
        )}

        <div className={styles.actions}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.primary}`}>
            <IconMap size={14} /> Visa på karta <IconExternal size={12} stroke={1.8} />
          </a>
          {activity.bookingUrl && (
            <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.dark}`}>
              Boka <IconExternal size={12} stroke={1.8} />
            </a>
          )}
          {activity.website && (
            <a href={activity.website} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.outline}`}>
              Hemsida <IconExternal size={12} stroke={1.8} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
