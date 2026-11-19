import { IconCalendar, IconPin } from '@/components/Icons';
import { STATUSTEXT, type Evenemang } from './data';
import styles from './EvenemangLista.module.css';

/** Ett evenemangskort. Används både i listan och i resekalendern (kompakt). */
export default function EvenemangKort({ e, kompakt = false }: { e: Evenemang; kompakt?: boolean }) {
  return (
    <article className={kompakt ? `${styles.card} ${styles.cardCompact}` : styles.card}>
      <div className={styles.tags}>
        <span className={styles.label}>{e.kategori}</span>
        <span className={e.status === 'preliminärt' ? `${styles.status} ${styles.statusPrel}` : styles.status}>
          {STATUSTEXT[e.status]}
        </span>
      </div>
      <h4 className={styles.cardTitle}>{e.namn}</h4>
      <p className={styles.meta}>
        <span className={styles.metaItem}>
          <IconCalendar size={13} /> {e.datum}
        </span>
        <span className={styles.metaItem}>
          <IconPin size={13} /> {e.plats}
        </span>
      </p>
      {!kompakt && <p className={styles.description}>{e.beskrivning}</p>}
      {e.not && <p className={styles.note}>{e.not}</p>}
      <div className={styles.actions}>
        <a href={e.källa.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
          {kompakt ? 'Källa' : e.källa.label} ↗
        </a>
        {e.ics ? (
          <a href={e.ics} download className="link-arrow" aria-label={`Lägg till i kalender: ${e.namn} (.ics)`}>
            Lägg till i kalender
          </a>
        ) : (
          <span className={styles.icsMissing}>Kalenderfil när datumet är klart</span>
        )}
      </div>
    </article>
  );
}
