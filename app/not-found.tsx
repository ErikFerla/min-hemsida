import Link from 'next/link';
import type { Metadata } from 'next';
import { IconPalm } from '@/components/Icons';
import styles from './status.module.css';

export const metadata: Metadata = {
  title: 'Sidan kunde inte hittas',
  description: 'Vi hittar inte sidan du letar efter. Utforska våra guider till stränder, städer och aktiviteter på Mallorca i stället.',
  robots: { index: false, follow: true },
};

const popularaLankar: { label: string; href: string; beskrivning: string }[] = [
  { label: 'Förstasidan', href: '/', beskrivning: 'Börja om från startsidan' },
  { label: 'Städer & byar', href: '/byar', beskrivning: '18 orter och byar på ön' },
  { label: 'Stränder', href: '/strandar', beskrivning: 'Från Es Trenc till dolda vikar' },
  { label: 'Guider', href: '/guider', beskrivning: 'Restid, barn, stränder, restauranger och golf' },
  { label: 'Aktiviteter', href: '/aktiviteter', beskrivning: 'Barnaktiviteter, golf, sevärdheter och evenemang' },
];

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.icon}>
          <IconPalm size={44} />
        </div>

        <p className={styles.kicker}>Felkod 404</p>

        <h1 className={styles.title}>Sidan kunde inte hittas</h1>

        <p className={styles.intro}>
          Vi hittar inte sidan du letar efter. Den kan ha flyttats eller aldrig ha funnits. Här är några populära sidor att fortsätta med i stället.
        </p>

        <nav aria-label="Populära sidor på MyMallorca">
          <ul className={styles.links}>
            {popularaLankar.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.card}>
                  <span className={styles.cardTitle}>{l.label}</span>
                  <span className={styles.cardText}>{l.beskrivning}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
