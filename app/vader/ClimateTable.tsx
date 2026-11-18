import { CLIMATE, CLIMATE_STATION, CLIMATE_YEAR, fmt, fmt0, sunPerDay } from '@/data/climate';
import styles from './ClimateTable.module.css';

/**
 * Klimattabell per månad (3.3). Serverrenderad, data från data/climate.ts.
 * Rubrikceller med scope, caption och en rullbar behållare som går att nå med tangentbordet.
 */
export default function ClimateTable({ headingId }: { headingId: string }) {
  const yearSunPerDay = Math.round((CLIMATE_YEAR.sunHours / 365) * 10) / 10;
  return (
    <div className={styles.scroller} role="region" aria-labelledby={headingId} tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Normalvärden per månad för AEMET:s station {CLIMATE_STATION.name} ({CLIMATE_STATION.period}). Högsta
          och lägsta är medelvärden av dygnets högsta och lägsta temperatur. Regndagar är dagar med minst 1 mm.
          Havstemperaturen är ett ungefärligt månadsmedel utanför Palma.
        </caption>
        <thead>
          <tr>
            <th scope="col">Månad</th>
            <th scope="col">Högsta <span className={styles.unit}>°C</span></th>
            <th scope="col">Lägsta <span className={styles.unit}>°C</span></th>
            <th scope="col">Hav <span className={styles.unit}>°C</span></th>
            <th scope="col">Sol <span className={styles.unit}>tim/dag</span></th>
            <th scope="col">Regn <span className={styles.unit}>dagar</span></th>
            <th scope="col">Regn <span className={styles.unit}>mm</span></th>
          </tr>
        </thead>
        <tbody>
          {CLIMATE.map((m) => (
            <tr key={m.month}>
              <th scope="row">{m.name}</th>
              <td>{fmt(m.max)}</td>
              <td>{fmt(m.min)}</td>
              <td>{fmt0(m.sea)}</td>
              <td>{fmt(sunPerDay(m))}</td>
              <td>{fmt(m.rainDays)}</td>
              <td>{m.rainMm}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Året</th>
            <td colSpan={3} className={styles.yearNote}>
              Medeltemperatur {fmt(CLIMATE_YEAR.mean)} °C
            </td>
            <td>{fmt(yearSunPerDay)}</td>
            <td>{fmt(CLIMATE_YEAR.rainDays)}</td>
            <td>{CLIMATE_YEAR.rainMm}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
