import { Suspense } from 'react';
import Link from 'next/link';
import LastChecked from '@/app/components/LastChecked';
import EvenemangLista from './EvenemangLista';
import Resekalender, { ResekalenderStatisk } from './Resekalender';
import styles from './evenemang.module.css';
import { EVENEMANGSKÄLLOR, idagPåMallorca, kommandeEvenemang, årsintervall } from './data';

// Listan visar bara kommande tillfällen utifrån dagens datum – bygg om sidan en gång per dygn.
export const revalidate = 86400;

export default function EvenemangPage() {
  const idag = idagPåMallorca();
  const kommande = kommandeEvenemang(idag);
  const intervall = årsintervall(idag);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Mallorca {intervall}</p>
        <h1 className={styles.title}>Evenemang på Mallorca {intervall}</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          Fiestor, mässor, festivaler och sport – välj dina resdatum och se vad som händer på ön och vilka byar som har marknad medan du är där.
        </p>
      </header>

      <div className={styles.main}>
        <section id="resekalender" className={styles.planner} aria-labelledby="resekalender-rubrik">
          <h2 id="resekalender-rubrik" className={styles.sectionTitle}>Vad händer under din resa?</h2>
          <Suspense fallback={<ResekalenderStatisk evenemang={kommande} />}>
            <Resekalender evenemang={kommande} />
          </Suspense>
        </section>

        <section className={styles.listSection} aria-labelledby="alla-rubrik">
          <h2 id="alla-rubrik" className={styles.sectionTitle}>Alla kommande evenemang</h2>
          <div className={styles.legend}>
            <p><strong>Datum publicerat</strong> – arrangören har gått ut med datumet.</p>
            <p><strong>Fast datum</strong> – firas samma dag varje år, eller enligt en fast regel.</p>
            <p><strong>Preliminärt</strong> – nästa datum är inte publicerat. Vi anger ungefär när det brukar vara och lägger in datumet när det är klart.</p>
            <p>Program och datum kan ändras. Kontrollera alltid hos arrangören innan du åker – länken finns på varje evenemang.</p>
          </div>
          <EvenemangLista evenemang={kommande} />
        </section>

        <section className={styles.more} aria-labelledby="mer-rubrik">
          <h2 id="mer-rubrik" className={styles.sectionTitle}>Mer att göra</h2>
          <p>
            Nästan varje by har en veckomarknad – se <Link href="/marknader">veckomarknaderna dag för dag</Link>. Söker du nöjen för barnen året runt, som
            vattenparker och djurparker, finns de under <Link href="/barn">Mallorca med barn</Link>.
          </p>
        </section>

        <LastChecked
          date="2026-11-18"
          sources={EVENEMANGSKÄLLOR}
          note="Varje evenemang länkar till sin egen källa. Datum som inte är publicerade är markerade som preliminära."
        />
      </div>
    </div>
  );
}
