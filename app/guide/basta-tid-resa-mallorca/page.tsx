import Link from 'next/link';
import { IconStar, IconSun, PriceTag, IconSparkle } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import h from '../headings.module.css';
import styles from './page.module.css';

const månader = [
  { namn: 'Januari', temp: '14°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Öns lugna säsong. Nästan inga turister, låga priser och behagligt väder för vandring och kultur. Perfekt för dig som vill se Palma utan köer.' },
  { namn: 'Februari', temp: '15°C', sol: '7h/dag', turisttryck: 1, pris: 1, text: 'Mandelblomsningen – Mallorcas mest fotogeniska månad. Tusentals mandelträd blommar i vitt och rosa, oftast från slutet av januari till mitten av februari. Fortfarande få turister.' },
  { namn: 'Mars', temp: '17°C', sol: '7h/dag', turisttryck: 2, pris: 2, text: 'Vackra dagar, grön natur och nästan tomt på turister. Bra för vandring i Tramuntana. Kallt för bad men perfekt för allt annat.' },
  { namn: 'April', temp: '19°C', sol: '8h/dag', turisttryck: 3, pris: 2, text: 'En av årets bästa månader. Stabilt väder, blommig natur, öppna restauranger. Påsk kan ge köer – boka i god tid. Magisk stämning.' },
  { namn: 'Maj', temp: '22°C', sol: '9h/dag', turisttryck: 3, pris: 2, text: 'Försäsong med sommarkänsla i luften. Havet är fortfarande friskt (omkring 18–19 °C) – badbart för de tåliga. Priserna är rimliga och det är sällan trångt. Favoritperiod för många.' },
  { namn: 'Juni', temp: '27°C', sol: '10h/dag', turisttryck: 4, pris: 3, text: 'Sommarens start. Varmt vatten, perfekta stranddagar och livlig stämning. Antalet turister ökar men når inte juli och augustis nivåer. Bra balans.' },
  { namn: 'Juli', temp: '32°C', sol: '11h/dag', turisttryck: 5, pris: 4, text: 'Högsäsong. Full beläggning, långa köer och höga priser. Samtidigt är vattnet ljummet och kvällarna i Palma fantastiska – boka tidigt och var på stranden tidigt på dagen.' },
  { namn: 'Augusti', temp: '33°C', sol: '11h/dag', turisttryck: 5, pris: 4, text: 'Som juli men hetare. Undvik juli och augusti om du vill ha ro på stranden. Men om stämning och nattliv är prioritet – detta är din månad.' },
  { namn: 'September', temp: '28°C', sol: '9h/dag', turisttryck: 3, pris: 3, text: 'Bästa månaden för många. Havet håller fortfarande sommarvärme (omkring 25–26 °C) och när skolorna har börjat blir det färre barnfamiljer. September är ändå en populär månad – boka i god tid.' },
  { namn: 'Oktober', temp: '23°C', sol: '7h/dag', turisttryck: 2, pris: 2, text: 'Höstens vackraste nyanser, relativt varmt hav och lugnt. Regnskurar kan förekomma. Bra för golf, vandring och kulinariska resor.' },
  { namn: 'November', temp: '17°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Lugnt och vackert. Inga badturister och gott om plats på restaurangerna. Många hotell på kustorterna stänger för säsongen, men i Palma och de större orterna finns det mesta öppet. Regn förekommer men sällan flera dagar i rad. Promenad i Palma en soldag i november – total harmoni.' },
  { namn: 'December', temp: '14°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Jul på Mallorca är en dold upplevelse. Städerna dekoreras, lokala marknader öppnar och dagstemperaturen ligger ofta kring 14–16 °C. Perfekt kulturresa – inte strandresa.' },
];

export default function BästaTidResaMallorca() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Solig strand och turkost vatten på Mallorca – klassisk badsäsong"
        kicker="Reseplanering · Månad för månad"
        title="Bästa tiden att resa till Mallorca"
        subtitle="Månadsguide med temperatur, turisttryck och prisnivå. Hitta din perfekta period."
        height="55vh"
      />

      <div className={styles.container}>

        {/* Beslutsmatris */}
        <div className={styles.matrix}>
          <p className={styles.matrixTitle}><IconSparkle size={18} /> Vad söker du? → Vår rekommendation</p>
          <div className={styles.matrixBody}>
            <div className={styles.matrixGrid}>
              <div><strong>Strand + bad:</strong><br />Juni, september</div>
              <div><strong>Lugn + inga turister:</strong><br />Januari, februari, november</div>
              <div><strong>Familj med barn:</strong><br />Juni, september</div>
              <div><strong>Golf:</strong><br />November – april</div>
              <div><strong>Vandring:</strong><br />Mars, april, oktober</div>
              <div><strong>Bäst pris:</strong><br />November – mars</div>
              <div><strong>Nattliv + stämning:</strong><br />Juli, augusti</div>
              <div><strong>Mat & kultur:</strong><br />Oktober, november, april</div>
            </div>
          </div>
        </div>

        {/* Säsongsöversikt */}
        <section className={styles.section}>
          <h2 className={`${h.h2} ${styles.sectionTitle}`}>Säsongernas logik</h2>
          <div className={styles.seasons}>
            {[
              { label: 'Lågsäsong', period: 'Nov – Mar', hög: false, text: 'Lägsta priser, minst turister. Bra för kultur, vandring, golf.' },
              { label: 'Skuldersäsong', period: 'Apr–Maj / Sep–Okt', hög: false, text: 'Bästa valet för de flesta. Varmt nog för bad, inga köer.' },
              { label: 'Högsäsong', period: 'Jun – Aug', hög: true, text: 'Fullt, dyrt, varmt. Välj om stämning är viktigare än ro.' },
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
          <p className={styles.scaleNote}>Prisskala: 1 € = budget, 4 € = maxtryck. Turisttryck: 1 stjärna = lugnt, 5 stjärnor = fullt.</p>
          <div className={styles.months}>
            {månader.map((m, i) => (
              <div key={i} className={styles.month}>
                <div>
                  <p className={styles.monthName}>{m.namn}</p>
                  <p className={styles.monthFact}>{m.temp}</p>
                  <p className={styles.monthSun}><IconSun size={12} /> {m.sol}</p>
                  <p className={styles.monthStars}>{Array.from({ length: m.turisttryck }).map((_, j) => <IconStar key={j} size={10} />)}</p>
                  <p className={styles.monthPrice}><PriceTag tier={m.pris} /></p>
                </div>
                <p className={styles.monthText}>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* September-sektionen */}
        <div className={styles.tip}>
          <h2 className={`${h.h2} ${styles.tipTitle}`}><IconSparkle size={22} /> Vårt tips: Åk i september</h2>
          <p className={styles.tipText}>
            Havet håller fortfarande sommarvärme (omkring 25–26 °C), barnfamiljerna har åkt hem när skolorna börjat och priserna brukar vara lägre än i juli och augusti. Det är fortfarande en välbesökt månad, men lugnare än högsommaren – särskilt mot slutet av månaden. Om du kan välja fritt och inte är bunden till skollov – välj september.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.ctaGrid}>
          <Link href="/vader" className={styles.ctaCard}>
            <p className={styles.ctaTitle}>Se väderprognos</p>
            <p className={styles.ctaText}>10-dagarsprognos för 7 städer</p>
          </Link>
          <Link href="/evenemang" className={styles.ctaCard}>
            <p className={styles.ctaTitle}>Evenemang på Mallorca</p>
            <p className={styles.ctaText}>Festivaler, marknader och sport</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
