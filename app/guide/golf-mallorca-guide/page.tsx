import Link from 'next/link';
import { IconStar, IconFlag, IconBulb, IconCalendar } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import HubLink from '../HubLink';
import h from '../headings.module.css';
import styles from './page.module.css';

const toppBanor = [
  {
    rank: 1,
    namn: 'Son Gual',
    region: 'Palma (norr)',
    hål: 18,
    par: 71,
    grönAvgift: '120–190 €',
    svårighet: 5,
    beskrivning: 'Son Gual är Mallorcas absolut bästa golfbana och rankas bland de 100 bästa i Europa. Designad av Thomas Himmel med fantastisk utsikt mot Tramuntanabergen och havet. Fairways i perfekt skick.',
    insider: 'Boka tee-time minst 2 veckor i förväg under mars–juni. Banan är lättast tillgänglig tidig morgon. Restaurangen efter rundan är outstanding.',
    bästTid: 'November–april (under 25°C, inga turister)',
  },
  {
    rank: 2,
    namn: 'Arabella Golf Son Vida',
    region: 'Palma (väst)',
    hål: 18,
    par: 72,
    grönAvgift: '95–150 €',
    svårighet: 4,
    beskrivning: 'Tre banor på samma lyxiga resort nära Palma. Son Vida-banan är den äldsta på ön (1964) och har Mallorcas mest imponerande panoramautsikt. Favoritbana för proffsiga resenärer.',
    insider: 'Golfresor till Son Vida inkluderar ofta rabatterade greenfees. Hotellpaketen är värda det – du kan gå till banan direkt från rummet.',
    bästTid: 'Oktober–maj',
  },
  {
    rank: 3,
    namn: 'Son Quint',
    region: 'Palma (sydöst)',
    hål: 9,
    par: 36,
    grönAvgift: '60–80 €',
    svårighet: 3,
    beskrivning: 'En av Mallorcas vackraste 9-hålsbanor, omringad av olivlundar och mandelträd. Perfekt för en halvdags golf med utsikt. Mer avslappnad atmosfär än de stora banorna.',
    insider: 'Ideal för par som vill kombinera golf och sightseeing. Spelat rundan på ca 2,5 timmar – gott om tid för en middag i Palma efteråt.',
    bästTid: 'Hela året – aldrig för trångt',
  },
  {
    rank: 4,
    namn: 'Club de Golf Alcanada',
    region: 'Alcúdia (norr)',
    hål: 18,
    par: 72,
    grönAvgift: '100–160 €',
    svårighet: 4,
    beskrivning: 'Nordens bästa golfupplevelse på Mallorca. Från tee 15 ser du ut över ett litet fyr-ö i havet – ett av öns mest fotograferade golfmotiv. Vindigt och utmanande.',
    insider: 'Hål 15 är "foto-obligatoriskt". Ta med fler bollar än vanligt – vinden tar de flesta amatörers bollar i havet på hål 14–16.',
    bästTid: 'Maj och oktober – juni–september är mycket vindig',
  },
  {
    rank: 5,
    namn: 'Golf Son Servera',
    region: 'Son Servera (östkust)',
    hål: 9,
    par: 36,
    grönAvgift: '45–65 €',
    svårighet: 2,
    beskrivning: 'En av Mallorcas äldsta banor (1967) och favoriten för avslappnad golf. Omgiven av tallar och olivträd med havsutsikt. Bra för nybörjare och de som vill ha en enkel runda.',
    insider: 'Priset är det lägsta bland de bra banorna. Kombinera med en middag i Porto Cristo (15 min). Lokal och vänlig personal – inget snobb.',
    bästTid: 'Hela året – aldrig trångt',
  },
];

const allabanor = [
  { namn: 'Son Gual', region: 'Palma', hål: 18, grönAvgift: '120–190 €', svårighet: 5 },
  { namn: 'Arabella Golf Son Vida', region: 'Palma', hål: 18, grönAvgift: '95–150 €', svårighet: 4 },
  { namn: 'Son Quint', region: 'Palma', hål: 9, grönAvgift: '60–80 €', svårighet: 3 },
  { namn: 'Club de Golf Alcanada', region: 'Alcúdia', hål: 18, grönAvgift: '100–160 €', svårighet: 4 },
  { namn: 'Golf Son Servera', region: 'Son Servera', hål: 9, grönAvgift: '45–65 €', svårighet: 2 },
  { namn: 'Golf Pollença', region: 'Pollença', hål: 9, grönAvgift: '40–55 €', svårighet: 2 },
  { namn: 'Vall d\'Or Golf', region: 'Felanitx', hål: 9, grönAvgift: '50–70 €', svårighet: 3 },
  { namn: 'Club de Golf Santa Ponsa', region: 'Santa Ponsa', hål: 18, grönAvgift: '55–90 €', svårighet: 3 },
  { namn: 'Golf Poniente', region: 'Santa Ponsa', hål: 18, grönAvgift: '60–85 €', svårighet: 3 },
  { namn: 'Real Golf de Bendinat', region: 'Calviá', hål: 18, grönAvgift: '70–100 €', svårighet: 3 },
  { namn: 'Capdepera Golf', region: 'Capdepera', hål: 18, grönAvgift: '60–90 €', svårighet: 3 },
  { namn: 'Son Antem Golf', region: 'Llucmajor', hål: 36, grönAvgift: '55–80 €', svårighet: 3 },
  { namn: 'Golf Maioris', region: 'Llucmajor', hål: 18, grönAvgift: '50–75 €', svårighet: 3 },
  { namn: 'Pula Golf', region: 'Son Servera', hål: 18, grönAvgift: '60–95 €', svårighet: 4 },
  { namn: 'Golf Son Muntaner', region: 'Palma', hål: 18, grönAvgift: '85–130 €', svårighet: 4 },
  { namn: 'T Golf Poniente', region: 'Magaluf', hål: 18, grönAvgift: '50–70 €', svårighet: 2 },
  { namn: 'Golf de Andratx', region: 'Andratx', hål: 18, grönAvgift: '100–160 €', svårighet: 4 },
  { namn: 'Son Gual Pitch & Putt', region: 'Palma', hål: 9, grönAvgift: '20–30 €', svårighet: 1 },
  { namn: 'Golf Costa de los Pinos', region: 'Son Servera', hål: 9, grönAvgift: '40–55 €', svårighet: 2 },
  { namn: 'Canyamel Golf', region: 'Artà', hål: 18, grönAvgift: '55–85 €', svårighet: 3 },
  { namn: 'Rotana Golf', region: 'Manacor', hål: 9, grönAvgift: '35–50 €', svårighet: 2 },
  { namn: 'Son Floriana Golf', region: 'Cala Millor', hål: 9, grönAvgift: '30–45 €', svårighet: 2 },
];

export default function GolfMallorcaGuide() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b"
        alt="Golfbana på Mallorca med välklippt green, palmer och havsutsikt"
        kicker="Golfguide · Uppdaterad 2026"
        title="De 5 bästa golfbanorna på Mallorca"
        subtitle="Vårt urval med motivering, greenfee-nivå och insidertips – och när på året det är bäst att spela."
        height="55vh"
      />

      <div className={styles.container}>

        <HubLink
          text="Här är våra fem favoriter. Alla 22 banor på en karta, med banfakta och tips för varje bana, finns på golfsidan."
          href="/aktiviteter/golf"
          label="Se alla golfbanor på Mallorca"
        />

        {/* Snabbfakta */}
        <div className={styles.facts}>
          <p className={styles.factsTitle}><IconFlag size={18} /> Golfinfo Mallorca – snabbfakta</p>
          <div className={styles.factsGrid}>
            <div><strong>Antal banor:</strong> 22</div>
            <div><strong>Bästa säsong:</strong> November–april</div>
            <div><strong>Billigaste banan:</strong> från 20 €</div>
            <div><strong>Dyraste banan:</strong> upp till 190 €</div>
            <div><strong>Snitt greenfee:</strong> 65–90 €</div>
            <div><strong>Utrustningsuthyrning:</strong> finns på alla banor</div>
          </div>
        </div>

        {/* Topp 5 */}
        <h2 className={`${h.h2} ${styles.heading}`}>De 5 bästa banorna – djupanalys</h2>

        {toppBanor.map((bana) => (
          <article key={bana.rank} className={styles.course}>
            <div className={styles.courseHead}>
              <span className={styles.rank}>#{bana.rank}</span>
              <div>
                <h3 className={`${h.h3} ${styles.courseTitle}`}>{bana.namn}</h3>
                <p className={styles.courseMeta}>{bana.region} · {bana.hål} hål · Par {bana.par} · <span className={styles.stars}>{Array.from({ length: bana.svårighet }).map((_, j) => <IconStar key={j} size={12} />)}</span></p>
              </div>
            </div>
            <p className={styles.courseText}>{bana.beskrivning}</p>
            <div className={styles.boxes}>
              <div className={styles.boxTip}>
                <p className={`${styles.boxLabel} ${styles.boxLabelAccent}`}><IconBulb size={12} /> INSIDER-TIPS</p>
                <p className={styles.boxText}>{bana.insider}</p>
              </div>
              <div className={styles.boxFee}>
                <p className={styles.boxLabel}>GREENFEE · BÄSTA TID</p>
                <p className={styles.fee}>{bana.grönAvgift}</p>
                <p className={styles.bestTime}>{bana.bästTid}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Alla 22 banor – kompaktlista */}
        <section className={styles.section}>
          <h2 className={`${h.h2} ${styles.heading}`}>Alla 22 golfbanor på Mallorca</h2>
          <p className={styles.tableNote}>
            Greenfee är ungefärliga prisnivåer – kontrollera alltid aktuellt pris hos banan. Karta och mer om varje bana finns på <Link href="/aktiviteter/golf">golfsidan</Link>.
          </p>
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tabell över golfbanorna på Mallorca (går att skrolla i sidled)">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bana</th>
                  <th>Region</th>
                  <th className={styles.center}>Hål</th>
                  <th>Greenfee</th>
                  <th className={styles.center}>Svårighet</th>
                </tr>
              </thead>
              <tbody>
                {allabanor.map((b, i) => (
                  <tr key={i}>
                    <td className={styles.name}>{b.namn}</td>
                    <td>{b.region}</td>
                    <td className={styles.center}>{b.hål}</td>
                    <td className={styles.price}>{b.grönAvgift}</td>
                    <td className={styles.rating}><span className={styles.stars}>{Array.from({ length: b.svårighet }).map((_, j) => <IconStar key={j} size={12} />)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips om säsong */}
        <section className={styles.section}>
          <h2 className={`${h.h2} ${styles.headingIcon}`}><IconCalendar size={22} /> Bästa tid att spela golf på Mallorca</h2>
          <div className={styles.seasons}>
            {[
              { period: 'Nov – Februari', rating: 5, text: 'Perfekt. Behaglig 15–20°C. Inga köer. 30–40% lägre priser.' },
              { period: 'Mars – April', rating: 5, text: 'Toppsäsong. Mandelblomningstid, 18–23°C. Boka tidigt.' },
              { period: 'Maj – Juni', rating: 4, text: 'Fortfarande bra. Varmare men hanterbart. Fler turister.' },
              { period: 'Juli – Augusti', rating: 2, text: 'För varmt (33–36°C). Spela bara tidigt 07:00–09:30.' },
              { period: 'September – Oktober', rating: 4, text: 'Bra alternativ. Varmt hav, svalare luft. Bra priser.' },
            ].map((s, i) => (
              <div key={i} className={styles.season}>
                <p className={styles.seasonPeriod}>{s.period}</p>
                <p className={styles.seasonStars}>{Array.from({ length: s.rating }).map((_, j) => <IconStar key={j} size={12} />)}</p>
                <p className={styles.seasonText}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className={styles.cta}>
          <h2 className={h.h2}>Mer om golf på Mallorca</h2>
          <p className={styles.ctaText}>Se alla 22 banor på kartan, med banfakta och tips för varje bana.</p>
          <Link href="/aktiviteter/golf" className={styles.ctaButton}>SE ALLA BANOR PÅ KARTAN →</Link>
        </div>
      </div>
    </div>
  );
}
