import styles from '../page.module.css';
import Link from 'next/link';

const events = [
  { name: 'Mallorca 312 Cykellopp', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { name: 'Copa del Rey Segelregatta', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
  { name: 'Fira de Sineu Marknad', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80' },
  { name: 'Palma International Boat Show', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80' },
  { name: 'Magaluf Half Marathon', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80' },
  { name: 'PalmaVela Regatta', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&q=80' },
];

export default function SectionEvents() {
  return (
    <section className={styles.eventsSection}>
      <div className={styles.eventsLeft}>
        <h2 className={styles.eventsTitle}>KOMMANDE EVENEMANG</h2>
        <p className={styles.eventsText}>Mallorca ar host till manga evenemang under aret - jordbruksmarknader pa varen och hosten, livlig musik och DJ pa sommaren, religiosa fiestor och internationella sportevenemang.</p>
        <Link href="/evenemang" className={styles.eventsBtn}>Se alla evenemang</Link>
      </div>
      <div className={styles.eventsGrid}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <img src={event.image} alt={event.name} />
            <a href="#" className={styles.eventName}>{event.name}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
