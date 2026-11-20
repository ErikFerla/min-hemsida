import Image from 'next/image';
import { cardImageUrl } from '@/app/lib/image-url';
import { IconPin, IconExternal, IconMap } from '@/components/Icons';
import CardTip from '@/components/CardTip';
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

  const hasPrice = typeof activity.priceFrom === 'number' || Boolean(activity.priceNote);
  const hasFacts = hasPrice || Boolean(activity.openingHours) || Boolean(activity.bestTime);

  return (
    <article id={activity.slug} className={styles.article}>
      <div className={styles.media}>
        <Image
          src={cardImageUrl(activity.imageUrl, 960)}
          alt={activity.imageAlt}
          fill
          sizes="(max-width: 1023px) 100vw, 480px"
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

        {hasFacts && (
          <dl className={styles.facts}>
            {hasPrice && (
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
                <dt className={styles.term}>Öppettider</dt>
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
        )}

        {activity.insiderTip && (
          <CardTip label="Insidertips">{activity.insiderTip}</CardTip>
        )}

        <div className={styles.actions}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <IconMap size={14} /> Visa på karta <IconExternal size={12} stroke={1.8} />
          </a>
          {activity.bookingUrl && (
            <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Boka <IconExternal size={12} stroke={1.8} />
            </a>
          )}
          {activity.website && (
            <a href={activity.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Hemsida <IconExternal size={12} stroke={1.8} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
