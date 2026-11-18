import Link from 'next/link';
import { IconStar, IconFlag, IconBulb, IconCalendar, PriceTag, tierFromPris } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import HubLink from '../HubLink';
import LastChecked from '@/app/components/LastChecked';
import { golfbanor } from '@/data/golf-courses';
import h from '../headings.module.css';
import styles from './page.module.css';

type ToppBana = {
  rank: number;
  namn: string;
  /** slug i data/golf-courses.ts – därifrån hämtas prisnivån */
  slug: string;
  region: string;
  hål: number;
  par?: number;
  svårighet: number;
  beskrivning: string;
  insider: string;
  bästTid: string;
};

const toppBanor: ToppBana[] = [
  {
    rank: 1,
    namn: 'Son Gual',
    slug: 'son-gual-golf',
    region: 'Palma (norr)',
    hål: 18,
    par: 72,
    svårighet: 5,
    beskrivning: 'Son Gual är vår favorit bland Mallorcas golfbanor. Den ritades av Thomas Himmel, invigdes 2007 och har fin utsikt mot Tramuntanabergen. Fairways i mycket gott skick.',
    insider: 'Boka starttid minst två veckor i förväg i mars–juni. Det är lättast att få tid tidigt på morgonen. Restaurangen är utmärkt efter rundan.',
    bästTid: 'November–april (svalare och lugnare)',
  },
  {
    rank: 2,
    namn: 'Arabella Golf Son Vida',
    slug: 'son-vida-golf',
    region: 'Palma (väst)',
    hål: 18,
    par: 71,
    svårighet: 4,
    beskrivning: 'Arabella har tre banor nära Palma: Son Vida, Son Muntaner och Son Quint. Son Vida är öns äldsta bana (1964) och har en av de vackraste utsikterna över Palmabukten. En favorit bland vana golfresenärer.',
    insider: 'Golfresor till Son Vida inkluderar ofta rabatterade greenfees. Hotellen i Son Vida ligger alldeles intill banorna.',
    bästTid: 'Oktober–maj',
  },
  {
    rank: 3,
    namn: 'Son Quint',
    slug: 'son-quint-golf',
    region: 'Palma (Son Vida)',
    hål: 18,
    par: 72,
    svårighet: 3,
    beskrivning: 'Den nyaste av Arabellas tre banor, invigd 2007, med olivlundar och mandelträd runt fairways. Mer avslappnad atmosfär än de stora tävlingsbanorna.',
    insider: 'Passar par som vill kombinera golf och sightseeing – banan ligger bara en kort bilresa från Palmas centrum.',
    bästTid: 'Hela året',
  },
  {
    rank: 4,
    namn: 'Club de Golf Alcanada',
    slug: 'club-de-golf-alcanada',
    region: 'Alcúdia (norr)',
    hål: 18,
    par: 72,
    svårighet: 4,
    beskrivning: 'Norra Mallorcas bästa golfupplevelse. Från flera hål ser du ut över den lilla ön Alcanada med sin fyr – ett av öns mest fotograferade golfmotiv. Ofta blåsigt och utmanande.',
    insider: 'Ta med fler bollar än vanligt – vinden från havet gör flera av kusthålen svåra.',
    bästTid: 'Vår och höst',
  },
  {
    rank: 5,
    namn: 'Golf Son Servera',
    slug: 'club-de-golf-son-servera',
    region: 'Son Servera (östkust)',
    hål: 18,
    svårighet: 2,
    beskrivning: 'En av Mallorcas äldsta banor (1967), byggd ut från nio till 18 hål 2012. Favoriten för avslappnad golf, omgiven av tallar och olivträd. Bra för nybörjare och för dig som vill ha en enkel runda.',
    insider: 'Kombinera med en middag i Porto Cristo, en kort bilresa söderut. Lokal och vänlig personal – inget snobberi.',
    bästTid: 'Hela året',
  },
];

const prisnivå = (slug: string) => golfbanor.find(b => b.slug === slug)?.pris ?? '€€';

export default function GolfMallorcaGuide() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg"
        alt="Green på Pula Golf vid Son Servera med Mallorcas berg i bakgrunden"
        photoCredit="Foto: Olaf Tausch / Wikimedia Commons (CC BY 3.0)"
        kicker="Golfguide · Uppdaterad 2026"
        title="De 5 bästa golfbanorna på Mallorca"
        subtitle="Vårt urval med motivering, prisnivå och insidertips – och när på året det är bäst att spela."
        height="55vh"
      />

      <div className={styles.container}>

        <HubLink
          text={`Här är våra fem favoriter. Alla ${golfbanor.length} banor på en karta, med banfakta och tips för varje bana, finns på golfsidan.`}
          href="/aktiviteter/golf"
          label="Se alla golfbanor på Mallorca"
        />

        {/* Snabbfakta */}
        <div className={styles.facts}>
          <p className={styles.factsTitle}><IconFlag size={18} /> Golfinfo Mallorca – snabbfakta</p>
          <div className={styles.factsGrid}>
            <div><strong>Antal banor:</strong> drygt 20</div>
            <div><strong>Bästa säsong:</strong> November–april</div>
            <div><strong>Greenfee:</strong> varierar stort mellan banor och säsonger – se banans webbplats</div>
            <div><strong>Äldsta banan:</strong> Son Vida (1964)</div>
          </div>
        </div>

        {/* Topp 5 */}
        <h2 className={`${h.h2} ${styles.heading}`}>De 5 bästa banorna i detalj</h2>

        {toppBanor.map((bana) => (
          <article key={bana.rank} className={styles.course}>
            <div className={styles.courseHead}>
              <span className={styles.rank}>{bana.rank}.</span>
              <div>
                <h3 className={`${h.h3} ${styles.courseTitle}`}>{bana.namn}</h3>
                <p className={styles.courseMeta}>{bana.region} · {bana.hål} hål{bana.par ? ` · Par ${bana.par}` : ''} · <span className={styles.stars}>{Array.from({ length: bana.svårighet }).map((_, j) => <IconStar key={j} size={12} />)}</span></p>
              </div>
            </div>
            <p className={styles.courseText}>{bana.beskrivning}</p>
            <div className={styles.boxes}>
              <div className={styles.boxTip}>
                <p className={`${styles.boxLabel} ${styles.boxLabelAccent}`}><IconBulb size={12} /> INSIDERTIPS</p>
                <p className={styles.boxText}>{bana.insider}</p>
              </div>
              <div className={styles.boxFee}>
                <p className={styles.boxLabel}>PRISNIVÅ · BÄSTA TID</p>
                <p className={styles.fee}><PriceTag tier={tierFromPris(prisnivå(bana.slug))} /></p>
                <p className={styles.bestTime}>{bana.bästTid}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Alla banor – kompaktlista */}
        <section className={styles.section}>
          <h2 className={`${h.h2} ${styles.heading}`}>Alla {golfbanor.length} golfbanor i vår lista</h2>
          <p className={styles.tableNote}>
            Prisnivån är en ungefärlig jämförelse mellan banorna – kontrollera alltid aktuell greenfee hos banan. Karta och mer om varje bana finns på <Link href="/aktiviteter/golf">golfsidan</Link>.
          </p>
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tabell över golfbanorna på Mallorca (går att skrolla i sidled)">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bana</th>
                  <th>Ort</th>
                  <th className={styles.center}>Hål</th>
                  <th>Prisnivå</th>
                  <th className={styles.center}>Svårighet</th>
                </tr>
              </thead>
              <tbody>
                {golfbanor.map((b) => (
                  <tr key={b.slug}>
                    <td className={styles.name}>{b.namn}</td>
                    <td>{b.plats}</td>
                    <td className={styles.center}>{b.hål}</td>
                    <td className={styles.price}><PriceTag tier={tierFromPris(b.pris)} /></td>
                    <td className={styles.center}>{b.svårighet}</td>
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
              { period: 'November–februari', rating: 5, text: 'Perfekt. Dagstemperatur kring 15–19 °C. Lugnt på banorna.' },
              { period: 'Mars–april', rating: 5, text: 'Högsäsong för golf. Dagstemperatur kring 17–20 °C. Boka tidigt.' },
              { period: 'Maj–juni', rating: 4, text: 'Fortfarande bra. Varmare men hanterbart. Fler turister.' },
              { period: 'Juli–augusti', rating: 2, text: 'För varmt för de flesta – dagstemperaturen ligger kring 31 °C. Spela tidigt på morgonen.' },
              { period: 'September–oktober', rating: 4, text: 'Bra alternativ. Varmt hav och svalare luft än på sommaren.' },
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
          <p className={styles.ctaText}>Se alla banor på kartan, med banfakta och tips för varje bana.</p>
          <Link href="/aktiviteter/golf" className={styles.ctaButton}>SE ALLA BANOR PÅ KARTAN →</Link>
        </div>

        <LastChecked
          date="2026-11-18"
          sources={[
            { label: 'Arabella Golf Mallorca: banguide 2026', href: 'https://arabellagolfmallorca.com/wp-content/uploads/2026/04/GSV_CourseGuide2026_low.pdf' },
            { label: 'Golf Son Gual', href: 'https://www.golfsongual.com' },
            { label: '1golf.eu: Club de Golf Son Servera', href: 'https://www.1golf.eu/en/club/club-de-golf-de-son-servera' },
            { label: 'AEMET: klimatvärden Palma', href: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos' },
          ]}
        />
      </div>
    </div>
  );
}
