import Link from 'next/link';
import { IconCalendar, IconPin } from '@/components/Icons';
import { kommandeEvenemang } from '@/app/evenemang/data';
import s from './section.module.css';
import styles from './SectionEvents.module.css';

// Startsidans urval: de sex närmaste daterade evenemangen (veckomarknader och
// helårsattraktioner visas på /evenemang). Datumet beräknas vid rendering –
// sidan som använder komponenten bör revalideras dagligen.
export default function SectionEvents() {
  const urval = kommandeEvenemang().filter(e => !e.återkommande).slice(0, 6);

  return (
    <section className={`${s.pageSection} ${s.surface}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={s.label}>På Mallorca</p>
            <h2 className={`${s.title} ${styles.uppercase}`}>Kommande evenemang</h2>
            <div className={s.divider} />
            <p className={styles.intro}>Mallorca är värd för många evenemang under året – fiestor, julmarknader, cykellopp, segelregattor och veckomarknader i byarna.</p>
            <Link href="/evenemang" className={s.btnPrimary}>
              SE ALLA EVENEMANG →
            </Link>
          </div>
          <div className={styles.grid}>
            {urval.map(e => (
              <article key={e.key} className={styles.card}>
                <div className={styles.media}>
                  <img src={e.bild} alt={e.namn} loading="lazy" decoding="async" width={600} height={140} className={styles.image} />
                  <div className={styles.category}>
                    {e.kategori}
                  </div>
                </div>
                <div className={styles.body}>
                  <p className={styles.meta}>
                    <IconCalendar size={12} /> {e.datum} · <IconPin size={12} /> {e.plats}
                  </p>
                  {e.ejFastställt && (
                    <p className={styles.unconfirmed}>Datum ej fastställt</p>
                  )}
                  <h3 className={styles.name}>{e.namn}</h3>
                  <p className={styles.desc}>{e.beskrivning}</p>
                  <a href={e.länk} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Läs mer om {e.namn} →
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
