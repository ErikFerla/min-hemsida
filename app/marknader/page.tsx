import Link from 'next/link';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import { IconClock, IconPin } from '@/components/Icons';
import { MARKNADSKÄLLOR, marknaderPåDag, VECKODAGAR } from '@/data/markets';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import t from '@/components/TextHero.module.css';
import styles from './marknader.module.css';

export default function MarknaderPage() {
  return (
    <div className={styles.page}>
      <header className={t.hero}>
        <div className={t.inner}>
          <div className={t.crumbs}>
            <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: 'Veckomarknader', url: '/marknader' }]} />
          </div>
          <p className={t.kicker}>Byarnas marknadsdagar</p>
          <h1 className={t.title}>Veckomarknader på Mallorca</h1>
          <p className={t.lead}>
            Nästan varje by på Mallorca har sin marknadsdag. Här är de marknader vi har kunnat bekräfta, dag för dag – med ungefärliga tider, vad som säljs och
            några tips.
          </p>
        </div>
      </header>

      <div className={styles.main}>
        <nav className={styles.dayNav} aria-label="Hoppa till veckodag">
          {VECKODAGAR.map(d => (
            <a key={d.nr} href={`#${d.namn}`} className={styles.dayLink}>
              {d.plural}
            </a>
          ))}
        </nav>

        <TipBox heading="Bra att veta" as="h2" className={styles.tips}>
          <ul>
            <li>Marknaderna pågår på förmiddagen och de flesta stånd packar ihop vid lunch. Kom tidigt – då är utbudet störst och trängseln minst.</li>
            <li>Ha kontanter med dig. Många stånd tar bara kontanter.</li>
            <li>Tiderna nedan är ungefärliga och kan skilja sig mellan sommar och vinter. Fråga gärna på hotellet eller turistbyrån.</li>
            <li>
              Ska du resa? Välj dina datum i <Link href="/evenemang#resekalender">resekalendern</Link> så ser du vilka marknader och evenemang som infaller under din
              resa.
            </li>
          </ul>
        </TipBox>

        {VECKODAGAR.map(d => {
          const lista = marknaderPåDag(d.nr);
          return (
            <section key={d.nr} id={d.namn} className={styles.day} aria-labelledby={`${d.namn}-rubrik`}>
              <h2 id={`${d.namn}-rubrik`} className={styles.sectionTitle}>
                {d.plural}
              </h2>
              {lista.length === 0 ? (
                <p className={styles.empty}>
                  Det finns marknader även den här dagen, men ingen vi kan ge säkra uppgifter om. Fråga på hotellet eller turistbyrån.
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
          date="2026-11-20"
          sources={MARKNADSKÄLLOR}
          note="Dag och ort för varje marknad är kontrollerade mot källan som anges på marknaden. Tiderna skiljer sig något mellan källorna och är därför ungefärliga."
        />
      </div>
    </div>
  );
}
