import Link from 'next/link';
import { IconStar, IconSun, PriceTag } from '@/components/Icons';
import TipBox from '@/components/TipBox';
import HeroImage from '@/components/HeroImage';
import LastChecked from '@/app/components/LastChecked';
import { CLIMATE, CLIMATE_CHECKED, CLIMATE_SOURCES, CLIMATE_STATION, fmt, fmt0, sunPerDay } from '@/data/climate';
import BastaRestid from './BastaRestid';
import { ACTIVITIES, REGIONS, REGION_RULES, RULES, TOURIST_PRESSURE } from './restid';
import h from '../headings.module.css';
import styles from './page.module.css';

// Klimatsiffrorna kommer från data/climate.ts (samma som klimattabellen på /vader).
// Pris och text är redaktionella; turisttrycket delas med verktyget (restid.ts).
const månader: { pris: number; text: string }[] = [
  { pris: 1, text: 'Öns lugna säsong. Få turister, låga priser och ofta fint väder för vandring och kultur – men räkna med kalla nätter. Perfekt för dig som vill se Palma utan köer.' },
  { pris: 1, text: 'Mandelblomningen – en av Mallorcas mest fotogeniska perioder, när mandelträden blommar i vitt och rosa i slutet av vintern. Fortfarande få turister.' },
  { pris: 2, text: 'Ljusa dagar, grön natur och fortfarande få turister. Bra för vandring i Serra de Tramuntana. Kallt för bad men fint för allt annat.' },
  { pris: 2, text: 'En av årets bästa månader för att vara ute: blommande natur, behagliga dagar och de flesta restauranger har öppnat. Påsken kan ge mer folk – boka i god tid.' },
  { pris: 2, text: 'Försäsong med sommarkänsla. Havet är fortfarande friskt – badbart för de tåliga. Priserna är rimliga och det är sällan lika trångt som på sommaren. Favoritperiod för många.' },
  { pris: 3, text: 'Sommarens start. Allt varmare vatten, långa stranddagar och livlig stämning. Antalet turister ökar men når inte juli och augustis nivåer.' },
  { pris: 4, text: 'Högsäsong. Fullt på stränderna, långa köer och höga priser. Samtidigt är havet varmt och kvällarna i Palma fantastiska – boka tidigt och var på stranden tidigt på dagen.' },
  { pris: 4, text: 'Som juli, med årets varmaste hav. Undvik juli och augusti om du vill ha ro på stranden – men om stämning och nattliv är prioritet är detta din månad.' },
  { pris: 3, text: 'Bästa månaden för många. Havet har kvar sin sommarvärme och när skolorna har börjat blir det färre barnfamiljer. Enstaka kraftiga regnskurar kan komma. September är ändå populär – boka i god tid.' },
  { pris: 2, text: 'Höstfärger, fortfarande badbart hav och lugnare än sommaren. Oktober är årets regnigaste månad, men regnet kommer ofta som skurar. Bra för golf, vandring och mat.' },
  { pris: 1, text: 'Lugnt och vackert. Gott om plats på restaurangerna. Många hotell på kustorterna stänger för säsongen, men i Palma och de större orterna finns det mesta öppet.' },
  { pris: 1, text: 'Jul på Mallorca är underskattat. Städerna pyntas, julmarknader öppnar och dagarna är ofta milda. En kulturresa – inte en strandresa.' },
];

export default function BästaTidResaMallorca() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Platja_de_Formentor.JPG/1920px-Platja_de_Formentor.JPG"
        alt="Platja de Formentor en solig dag – turkost vatten, sandstrand och tallskog under bergen"
        photoCredit="Foto: HejaSverige! / Wikimedia Commons (CC BY-SA 3.0)"
        kicker="Reseplanering · Månad för månad"
        title="Bästa tiden att resa till Mallorca"
        subtitle="Månadsguide med temperatur, turisttryck och prisnivå. Hitta din perfekta period."
        height="55vh"
      />

      <div className={styles.container}>

        {/* Verktyget Bästa restid (3.3) */}
        <section id="basta-restid" className={styles.section} aria-labelledby="restid-heading">
          <h2 id="restid-heading" className={`${h.h2} ${styles.sectionTitle}`}>Bästa restid för det du vill göra</h2>
          <p className={styles.toolIntro}>
            Välj vad du vill göra och gärna var på ön, så rangordnar vi årets tolv månader. Rankningen bygger på
            klimatdatan längre ner på sidan och på reglerna under verktyget. Valet sparas i adressen, så du kan dela
            resultatet.
          </p>
          <BastaRestid />
          <details className={styles.rules}>
            <summary className={styles.rulesSummary}>Så rangordnar vi månaderna</summary>
            <dl className={styles.rulesList}>
              {ACTIVITIES.map((a) => (
                <div key={a.key}>
                  <dt>{a.label}</dt>
                  <dd>{RULES[a.key]}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.rulesSub}>Region</p>
            <dl className={styles.rulesList}>
              {REGIONS.map((r) => (
                <div key={r.key}>
                  <dt>{r.label}</dt>
                  <dd>{REGION_RULES[r.key]}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.rulesNote}>
              Temperatur, regn och sol är AEMET:s normalvärden för {CLIMATE_STATION.name} ({CLIMATE_STATION.period}).
              Havstemperaturen är ett ungefärligt månadsmedel. Turisttrycket är vår egen bedömning. Normalvärden är
              genomsnitt – ett enskilt år kan bli både varmare och blötare.
            </p>
          </details>
        </section>

        {/* Säsongsöversikt */}
        <section className={styles.section}>
          <h2 className={`${h.h2} ${styles.sectionTitle}`}>Säsongernas logik</h2>
          <div className={styles.seasons}>
            {[
              { label: 'Lågsäsong', period: 'Nov–mars', hög: false, text: 'Lägsta priser, minst turister. Bra för kultur, vandring och golf.' },
              { label: 'Mellansäsong', period: 'Apr–maj och sep–okt', hög: false, text: 'Bästa valet för många. Behagligt att vara ute – i maj är havet friskt, i september och oktober fortfarande varmt.' },
              { label: 'Högsäsong', period: 'Juni–aug', hög: true, text: 'Fullt, dyrt, varmt. Välj om stämning är viktigare än ro.' },
            ].map((s, i) => (
              <div key={i} className={s.hög ? `${styles.season} ${styles.seasonHigh}` : styles.season}>
                <p className={styles.seasonLabel}>{s.label}</p>
                <p className={styles.seasonPeriod}>{s.period}</p>
                <p className={styles.seasonText}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Månadsguide */}
        <section className={styles.sectionLast}>
          <h2 className={`${h.h2} ${styles.sectionTitle}`}>Månad för månad</h2>
          <p className={styles.scaleNote}>
            Dag = normal högsta temperatur och natt = normal lägsta temperatur i Palma. Havet är ett ungefärligt månadsmedel.
            Prisskala: € = budget, €€€€ = högsta prisnivå. Turisttryck: 1 stjärna = lugnt, 5 stjärnor = fullt. Hela
            tabellen finns på <Link href="/vader#klimat-heading">vädersidan</Link>.
          </p>
          <div className={styles.months}>
            {CLIMATE.map((c, i) => {
              const m = månader[i];
              const tryck = TOURIST_PRESSURE[i];
              return (
                <div key={c.month} className={styles.month}>
                  <div>
                    <h3 className={styles.monthName}>{c.name}</h3>
                    <p className={styles.monthFact}>
                      {fmt0(c.max)} °C dag · {fmt0(c.min)} °C natt
                      <br />
                      Hav {fmt0(c.sea)} °C · {fmt(c.rainDays)} regndagar
                    </p>
                    <p className={styles.monthSun}><IconSun size={12} /> {fmt(sunPerDay(c))} tim sol/dag</p>
                    <p className={styles.monthStars}>
                      {Array.from({ length: tryck }).map((_, j) => <IconStar key={j} size={10} />)}
                      <span className="sr-only">Turisttryck {tryck} av 5</span>
                    </p>
                    <p className={styles.monthPrice}><PriceTag tier={m.pris} /></p>
                  </div>
                  <p className={styles.monthText}>{m.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* September-sektionen */}
        <TipBox heading="Vårt tips: Åk i september" as="h2" className={styles.tip}>
          <p>
            Havet håller fortfarande sommarvärme (omkring {fmt0(CLIMATE[8].sea)} °C), dagarna ligger kring {fmt0(CLIMATE[8].max)} °C i stället för högsommarens {fmt0(CLIMATE[7].max)} °C, barnfamiljerna har åkt hem när skolorna börjat och priserna brukar vara lägre än i juli och augusti. Det är fortfarande en välbesökt månad, men lugnare än högsommaren – särskilt mot slutet av månaden. Om du kan välja fritt och inte är bunden till skollov – välj september.
          </p>
        </TipBox>

        {/* Läs vidare */}
        <div className={styles.ctaGrid}>
          <Link href="/vader" className={styles.ctaCard}>
            <p className={styles.ctaTitle}>Väder och klimat</p>
            <p className={styles.ctaText}>Prognos för sju orter och klimattabell</p>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
          <Link href="/evenemang" className={styles.ctaCard}>
            <p className={styles.ctaTitle}>Evenemang på Mallorca</p>
            <p className={styles.ctaText}>Festivaler, marknader och sport</p>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        <LastChecked
          date={CLIMATE_CHECKED}
          sources={CLIMATE_SOURCES}
          note="Klimatsiffrorna är AEMET:s normalvärden 1981–2010 för Palma flygplats. Turisttryck och prisnivå är vår egen bedömning."
        />
      </div>
    </div>
  );
}
