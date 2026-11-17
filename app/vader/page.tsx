import { Suspense } from 'react';
import Link from 'next/link';
import WeatherForecast from './WeatherForecast';
import { WEATHER_LOCATIONS } from './locations';
import styles from './vader.module.css';

export default function Vader() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Väder på Mallorca</h1>
          <p className={styles.lead}>
            Här ser du prognosen för de kommande dagarna på sju platser runt ön – från Palma och
            Andratx i sydväst till Port de Sóller och Deià i Tramuntana-bergen, Alcúdia i norr och
            Artà och Porto Colom i öster. Vädret kan skilja en hel del mellan kusten och bergen, så
            välj den ort som ligger närmast dig.
          </p>
          <p className={styles.lead}>
            Planerar du en resa längre fram? I vår{' '}
            <Link href="/guide/basta-tid-resa-mallorca">guide till bästa tiden att resa till Mallorca</Link>{' '}
            går vi igenom väder, badtemperatur och stämning månad för månad.
          </p>
        </header>
        <Suspense
          fallback={
            <div className={styles.loading}>
              <div className={styles.spinner} aria-hidden="true"></div>
              <p>Hämtar prognos...</p>
            </div>
          }
        >
          <WeatherForecast />
        </Suspense>
        <section className={styles.places} aria-labelledby="orter-heading">
          <h2 id="orter-heading">Orterna i prognosen</h2>
          <ul className={styles.placeList}>
            {WEATHER_LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <strong>{loc.name}</strong>
                {loc.fact}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
