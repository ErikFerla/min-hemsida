'use client';
import { useEffect, useState } from 'react';
import type { Beach, Väderstreck } from '@/data/beaches';
import styles from './DagensStrand.module.css';

// Dagens strand (3.11). Hämtar vindprognosen från /api/weather (met.no) för mitten av ön,
// räknar ut dagens rådande vindriktning och föreslår stränder som vetter bort från vinden –
// där blåser vinden från land och vattnet är oftast lugnast. Visar ingenting om prognosen
// inte går att hämta; allt övrigt innehåll på /strandar är serverrenderat och påverkas inte.

export type DagensStrandBeach = Pick<Beach, 'namn' | 'region' | 'typ' | 'vetterMot' | 'maps'>;

// Mitt på ön (mellan Montuïri och Sant Joan), så att prognosen inte domineras av en enskild kust.
const POINT = { lat: 39.62, lon: 3.0 };
const TIME_ZONE = 'Europe/Madrid';
/** Dagtid som räknas: kl. 10–18 lokal tid. */
const DAY_START = 10;
const DAY_END = 18;
const MAX_BEACHES = 4;

const DEG: Record<Väderstreck, number> = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
const ORDER: Väderstreck[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const FRÅN: Record<Väderstreck, string> = {
  N: 'norr', NE: 'nordost', E: 'öster', SE: 'sydost', S: 'söder', SW: 'sydväst', W: 'väster', NW: 'nordväst',
};
const KUST: Record<Väderstreck, string> = {
  N: 'norra', NE: 'nordöstra', E: 'östra', SE: 'sydöstra', S: 'södra', SW: 'sydvästra', W: 'västra', NW: 'nordvästra',
};
const MOT: Record<Väderstreck, string> = {
  N: 'norr', NE: 'nordost', E: 'öster', SE: 'sydost', S: 'söder', SW: 'sydväst', W: 'väster', NW: 'nordväst',
};

type Entry = { time: string; data: { instant: { details: { wind_speed?: number; wind_from_direction?: number } } } };
type Wind = { from: Väderstreck; speed: number; tomorrow: boolean };

const toSector = (deg: number): Väderstreck => ORDER[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
const angleDiff = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

const partsFormatter = new Intl.DateTimeFormat('sv-SE', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
});
function local(date: Date) {
  const parts = partsFormatter.formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return { day: `${get('year')}-${get('month')}-${get('day')}`, hour: parseInt(get('hour'), 10) % 24 };
}

/** Vektormedel av vinden under dagtid i dag – eller i morgon om dagen redan är slut. */
function dayWind(series: Entry[]): Wind | null {
  const now = local(new Date());
  const tomorrow = now.hour >= DAY_END - 1;
  const days = [...new Set(series.map((e) => local(new Date(e.time)).day))];
  const targetDay = tomorrow ? days.find((d) => d > now.day) : now.day;
  if (!targetDay) return null;

  let x = 0;
  let y = 0;
  let speedSum = 0;
  let n = 0;
  for (const e of series) {
    const t = local(new Date(e.time));
    if (t.day !== targetDay || t.hour < DAY_START || t.hour > DAY_END) continue;
    const { wind_speed: s, wind_from_direction: d } = e.data.instant.details;
    if (typeof s !== 'number' || typeof d !== 'number') continue;
    const rad = (d * Math.PI) / 180;
    x += s * Math.sin(rad);
    y += s * Math.cos(rad);
    speedSum += s;
    n++;
  }
  if (n === 0) return null;
  const meanDir = (Math.atan2(x, y) * 180) / Math.PI;
  return { from: toSector(meanDir), speed: speedSum / n, tomorrow };
}

function pickBeaches(beaches: DagensStrandBeach[], wind: Väderstreck) {
  const lee = (DEG[wind] + 180) % 360;
  const ranked = beaches
    .map((b, i) => ({ b, i, diff: angleDiff(DEG[b.vetterMot], lee) }))
    .sort((p, q) => p.diff - q.diff || p.i - q.i);
  let chosen = ranked.filter((r) => r.diff <= 45);
  if (chosen.length < 2) chosen = ranked.filter((r) => r.diff <= 67.5);
  return { lee: toSector(lee), list: chosen.slice(0, MAX_BEACHES).map((r) => r.b) };
}

export default function DagensStrand({ beaches }: { beaches: DagensStrandBeach[] }) {
  const [wind, setWind] = useState<Wind | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/weather?lat=${POINT.lat}&lon=${POINT.lon}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const series: Entry[] | undefined = data?.properties?.timeseries;
        if (Array.isArray(series)) setWind(dayWind(series));
      })
      .catch(() => {
        // Ingen prognos: komponenten visas inte.
      });
    return () => controller.abort();
  }, []);

  if (!wind) return null;

  const { lee, list } = pickBeaches(beaches, wind.from);
  if (list.length === 0) return null;
  const speed = Math.round(wind.speed);
  const dag = wind.tomorrow ? 'i morgon' : 'i dag';
  const calm = wind.speed < 3;

  return (
    <section className={styles.box} aria-labelledby="dagens-strand-heading">
      <p className={styles.kicker}>Dagens strand</p>
      <h2 id="dagens-strand-heading" className={styles.title}>
        {calm ? `Svag vind ${dag}` : `${capitalize(KUST[lee])} kusten ligger i lä ${dag}`}
      </h2>
      <p className={styles.explain}>
        {calm ? (
          <>
            Vind från {FRÅN[wind.from]}, {speed} m/s – svagt nästan överallt, så de flesta stränder bör vara lugna. Mest
            lä har {KUST[lee]} kusten.
          </>
        ) : (
          <>
            Vind från {FRÅN[wind.from]}, {speed} m/s – {KUST[lee]} kusten ligger i lä. Där blåser vinden från land,
            så vattnet är oftast lugnast.
            {wind.speed >= 10 && ' Det blåser friskt, så även i lä kan det vara byigt.'}
          </>
        )}
      </p>
      <ul className={styles.list}>
        {list.map((b) => (
          <li key={b.namn} className={styles.item}>
            <span className={styles.name}>{b.namn}</span>
            <span className={styles.meta}>
              {b.region} · {b.typ} · vetter mot {MOT[b.vetterMot]}
            </span>
            <a href={b.maps} target="_blank" rel="noopener noreferrer" className={styles.map}>
              Visa på karta <span className="sr-only">för {b.namn} (öppnas i ny flik)</span>↗
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Förslaget bygger på met.no:s vindprognos för mitten av ön kl. 10–18. Sjöbris kan vrida vinden vid kusten under
        eftermiddagen, och sjögång från tidigare blåst kan ligga kvar.
      </p>
    </section>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
