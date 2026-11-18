import styles from './LastChecked.module.css';

export type Source = { label: string; href: string };

const formatter = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * Faktagranskning (3.7): visar när sidans uppgifter senast kontrollerades och mot vilka källor.
 * `date` är ett ISO-datum (ÅÅÅÅ-MM-DD). Uppdatera det bara när uppgifterna faktiskt kontrollerats.
 */
export default function LastChecked({ date, sources = [], note }: { date: string; sources?: Source[]; note?: string }) {
  return (
    <aside className={styles.box} aria-label="Om uppgifterna på sidan">
      <p className={styles.date}>
        Senast kontrollerad <time dateTime={date}>{formatter.format(new Date(`${date}T00:00:00Z`))}</time>
      </p>
      {note && <p className={styles.note}>{note}</p>}
      {sources.length > 0 && (
        <p className={styles.sources}>
          Källor:{' '}
          {sources.map((s, i) => (
            <span key={s.href}>
              {i > 0 && ', '}
              <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </span>
          ))}
        </p>
      )}
    </aside>
  );
}
