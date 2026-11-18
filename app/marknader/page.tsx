import Link from 'next/link';
import LastChecked from '@/app/components/LastChecked';
import { IconClock, IconPin } from '@/components/Icons';
import { MARKNADSKÄLLOR, marknaderPåDag, VECKODAGAR } from '@/data/markets';
import styles from './marknader.module.css';

export default function MarknaderPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Byarnas marknadsdagar</p>
        <h1 className={styles.title}>Veckomarknader på Mallorca</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          Nästan varje by på Mallorca har sin marknadsdag. Här är de marknader vi har kunnat bekräfta, dag för dag – med ungefärliga tider, vad som säljs och
          några tips.
        </p>
      </header>

      <div className={styles.main}>
        <nav className={styles.dayNav} aria-label="Hoppa till veckodag">
          {VECKODAGAR.map(d => (
            <a key={d.nr} href={`#${d.namn}`} className={styles.dayLink}>
              {d.plural}
            </a>
          ))}
        </nav>

        <section className={styles.tips} aria-labelledby="tips-rubrik">
          <h2 id="tips-rubrik" className={styles.sectionTitle}>Bra att veta</h2>
          <ul>
            <li>Marknaderna pågår på förmiddagen och de flesta stånd packar ihop vid lunch. Kom tidigt – då är utbudet störst och trängseln minst.</li>
            <li>Ha kontanter med dig. Många stånd tar bara kontanter.</li>
            <li>Tiderna nedan är ungefärliga och kan skilja sig mellan sommar och vinter. Fråga gärna på hotellet eller turistbyrån.</li>
            <li>
              Ska du resa? Välj dina datum i <Link href="/evenemang#resekalender">resekalendern</Link> så ser du vilka marknader och evenemang som infaller under din
              resa.
            </li>
          </ul>
        </section>

        {VECKODAGAR.map(d => {
          const lista = marknaderPåDag(d.nr);
          return (
            <section key={d.nr} id={d.namn} className={styles.day} aria-labelledby={`${d.namn}-rubrik`}>
              <h2 id={`${d.namn}-rubrik`} className={styles.sectionTitle}>
                {d.plural}
              </h2>
              {lista.length === 0 ? (
                <p className={styles.empty}>
                  Det finns marknader även den här dagen, men vi har ännu inte kunnat bekräfta någon mot en pålitlig källa. Fråga på hotellet eller turistbyrån.
                </p>
              ) : (
                <div className={styles.grid}>
                  {lista.map(m => (
                    <article key={m.id} id={m.dagar[0] === d.nr ? m.id : undefined} className={styles.card}>
                      <h3 className={styles.cardTitle}>{m.ort}</h3>
                      <p className={styles.meta}>
                        <span className={styles.metaItem}>
                          <IconClock size={13} /> {m.tid}
                        </span>
                        <span className={styles.metaItem}>
                          <IconPin size={13} /> {m.område}
                        </span>
                      </p>
                      {m.dagar.length > 1 && (
                        <p className={styles.alsoOn}>
                          Även på {m.dagar.filter(x => x !== d.nr).map(x => VECKODAGAR[x - 1].plural.toLowerCase()).join(' och ')}.
                        </p>
                      )}
                      <p className={styles.text}>{m.vad}</p>
                      {m.tips && <p className={styles.tip}>Tips: {m.tips}</p>}
                      <a href={m.källa.href} target="_blank" rel="noopener noreferrer" className={styles.source}>
                        Källa: {m.källa.label} ↗
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <section className={styles.more} aria-labelledby="mer-rubrik">
          <h2 id="mer-rubrik" className={styles.sectionTitle}>Mässor och fiestor</h2>
          <p>
            Utöver veckomarknaderna har många byar en årlig mässa, som Dijous Bo i Inca i november och Fira de Sineu i maj. Se alla på sidan{' '}
            <Link href="/evenemang">Evenemang på Mallorca</Link>.
          </p>
        </section>

        <LastChecked
          date="2026-11-18"
          sources={MARKNADSKÄLLOR}
          note="Dag och ort för varje marknad är kontrollerade mot källan som anges på marknaden. Tiderna skiljer sig något mellan källorna och är därför ungefärliga."
        />
      </div>
    </div>
  );
}
