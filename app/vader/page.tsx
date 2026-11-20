import { Suspense } from 'react';
import Link from 'next/link';
import WeatherForecast from './WeatherForecast';
import ClimateTable from './ClimateTable';
import LastChecked from '@/app/components/LastChecked';
import { CLIMATE, CLIMATE_CHECKED, CLIMATE_SOURCES, MET_NO_SOURCE, fmt0 } from '@/data/climate';
import { WEATHER_LOCATIONS } from './locations';
import styles from './vader.module.css';
import h from '../guide/headings.module.css';
import t from '@/components/TextHero.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const byMonth = (n: number) => CLIMATE[n - 1];

export default function Vader() {
  const jul = byMonth(7);
  const jan = byMonth(1);
  const okt = byMonth(10);
  return (
    <div className={styles.page}>
      <header className={t.hero}>
        <div className={t.inner}>
          <div className={t.crumbs}>
            <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: 'Väder', url: '/vader' }]} />
          </div>
          <h1 className={t.title}>Väder på Mallorca</h1>
          <p className={t.lead}>
            Här ser du prognosen för de kommande dagarna på sju platser runt ön – från Palma och
            Andratx i sydväst till Port de Sóller och Deià i Tramuntanabergen, Alcúdia i norr och
            Artà och Porto Colom i öster. Vädret kan skilja en hel del mellan kusten och bergen, så
            välj den ort som ligger närmast dig.
          </p>
          <p className={t.lead}>
            Planerar du en resa längre fram? I vår{' '}
            <Link href="/guide/basta-tid-resa-mallorca">guide till bästa tiden att resa till Mallorca</Link>{' '}
            går vi igenom väder, badtemperatur och stämning månad för månad. Längre ner på sidan finns en klimattabell för hela året.
          </p>
        </div>
      </header>
      <div className={styles.container}>
        <Suspense
          fallback={
            <div className={styles.loading}>
              <div className={styles.spinner} aria-hidden="true"></div>
              <p>Hämtar prognosen …</p>
            </div>
          }
        >
          <WeatherForecast />
        </Suspense>
        <section className={styles.climate} aria-labelledby="klimat-heading">
          <h2 id="klimat-heading" className={h.h2}>Klimatet månad för månad</h2>
          <p className={styles.climateLead}>
            Prognosen ovan gäller de närmaste dagarna. Planerar du längre fram ger normalvärdena en bättre bild:
            i juli och augusti ligger dagens högsta temperatur kring {fmt0(jul.max)} °C i Palma och
            havet är som varmast, medan januari ger runt {fmt0(jan.max)} °C på dagen och kalla nätter. Mest regn
            faller under hösten – oktober är den blötaste månaden med i snitt {okt.rainMm} mm.
          </p>
          <ClimateTable />
          <p className={styles.climateNote}>
            Siffrorna kommer från flygplatsen strax öster om Palma. Vid kusten är nätterna ofta något mildare, och i
            Serra de Tramuntana är det svalare och regnar mer. Vill du veta vilken månad som passar just det du vill
            göra? Testa verktyget i{' '}
            <Link href="/guide/basta-tid-resa-mallorca#basta-restid">guiden till bästa tiden att resa</Link>.
          </p>
        </section>
        <section className={styles.places} aria-labelledby="orter-heading">
          <h2 id="orter-heading" className={h.h2}>Orterna i prognosen</h2>
          <ul className={styles.placeList}>
            {WEATHER_LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <strong>{loc.name}</strong>
                {loc.fact}
              </li>
            ))}
          </ul>
        </section>
        <LastChecked
          date={CLIMATE_CHECKED}
          sources={[...CLIMATE_SOURCES, MET_NO_SOURCE]}
          note="Klimattabellen bygger på AEMET:s normalvärden 1981–2010. Prognosen hämtas löpande från met.no."
        />
      </div>
    </div>
  );
}
