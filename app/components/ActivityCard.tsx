import Image from 'next/image';
import Link from 'next/link';
import { IconPin, IconExternal } from '@/components/Icons';
import AgeGroupChip from './AgeGroupChip';
import styles from './ActivityCard.module.css';
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
    <Link href={href} aria-label={`${activity.name} — läs mer`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={`${activity.imageUrl}?w=960&q=80`}
          alt={activity.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={styles.image}
        />
        {meta && <span className={styles.category}>{meta.label}</span>}
        {activity.indoors && (
          <span title="Inomhus" aria-label="Inomhus" className={styles.indoors}>
            Inomhus
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{activity.name}</h3>

        <div className={styles.chips}>
          {activity.ageGroups.map((age) => (
            <AgeGroupChip key={age} age={age} />
          ))}
        </div>

        <p className={styles.description}>{activity.shortDescription}</p>

        <div className={styles.meta}>
          <span className={styles.location}>
            <IconPin size={12} /> {activity.location}
          </span>
          {typeof activity.priceFrom === 'number' && (
            <span className={styles.price}>från {activity.priceFrom} €</span>
          )}
        </div>

        <span className={styles.more}>
          Läs mer <IconExternal size={12} stroke={1.8} />
        </span>
      </div>
    </Link>
  );
}
