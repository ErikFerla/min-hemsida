import Link from 'next/link';
import { IconCalendar, IconPin } from '@/components/Icons';
import { kommandeEvenemang, type Kategori } from '@/app/evenemang/data';
import s from './section.module.css';
import styles from './SectionEvents.module.css';

// Dekorativa stämningsbilder per kategori (inte bilder från själva evenemangen – därför alt="").
const kategoriBild: Record<Kategori, string> = {
  'Sport': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'Musik': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  'Kultur': 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=600&q=80',
  'Mat & dryck': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80',
  'Marknad': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80',
  'Familj': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
};

// Startsidans urval: de sex närmaste evenemangen. Datumet beräknas vid rendering –
// sidan som använder komponenten bör revalideras dagligen.
export default function SectionEvents() {
  const urval = kommandeEvenemang().slice(0, 6);

  return (
    <section className={`${s.pageSection} ${s.surface}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={s.label}>På Mallorca</p>
            <h2 className={`${s.title} ${styles.uppercase}`}>Kommande evenemang</h2>
            <div className={s.divider} />
            <p className={styles.intro}>
              Fiestor, mässor, cykellopp och regattor året runt. Välj dina resdatum på evenemangssidan så ser du vad som händer – och vilka byar som har marknad – under just din resa.
            </p>
            <Link href="/evenemang#resekalender" className={s.btnPrimary}>
              SE VAD SOM HÄNDER UNDER DIN RESA →
            </Link>
          </div>
          <div className={styles.grid}>
            {urval.map(e => (
              <article key={e.key} className={styles.card}>
                <div className={styles.media}>
                  <img src={kategoriBild[e.kategori]} alt="" loading="lazy" decoding="async" width={600} height={140} className={styles.image} />
                  <div className={styles.category}>{e.kategori}</div>
                </div>
                <div className={styles.body}>
                  <p className={styles.meta}>
                    <IconCalendar size={12} /> {e.datum} · <IconPin size={12} /> {e.plats}
                  </p>
                  {e.status === 'preliminärt' && <p className={styles.unconfirmed}>Preliminärt datum</p>}
                  <h3 className={styles.name}>{e.namn}</h3>
                  <p className={styles.desc}>{e.beskrivning}</p>
                  <a href={e.källa.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {e.källa.label} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
