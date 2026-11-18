import Link from 'next/link';
import { featureItems as cards } from '@/app/components/FeatureCards';
import styles from '@/app/components/FeatureCards.module.css';

// Samma kort som desktop (FeatureCards) så att mobil och desktop visar samma innehåll.
export default function MobileFeatureCards() {
  return (
    <div className={styles.mGrid}>
      {cards.map(card => (
        <Link key={card.href} href={card.href} className={styles.mCard}>
          <span aria-hidden="true" className={styles.mIcon}>
            {card.icon}
          </span>
          <div>
            <div className={styles.mTitle}>{card.title}</div>
            <div className={styles.mDesc}>{card.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
