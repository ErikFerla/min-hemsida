// Klimatdata för Mallorca (3.3). Används av klimattabellen på /vader och av
// /guide/basta-tid-resa-mallorca (månadsguiden och verktyget Bästa restid),
// så att sidorna aldrig visar motstridiga siffror.
//
// Luft, nederbörd och sol: AEMET:s normalvärden 1981–2010 för stationen
// Palma de Mallorca, Aeropuerto (klimatindex B278, 5 m ö.h.). AEMET har ännu
// inte publicerat normalvärden 1991–2020 för stationen på sin stationssida.
// Havstemperatur: månadsmedel för Palma enligt seatemperature.org (avrundat till
// hela grader). AEMET publicerar inga normalvärden för havstemperatur.

import type { Source } from '@/app/components/LastChecked';

export type MonthClimate = {
  /** 1–12 */
  month: number;
  name: string;
  short: string;
  /** Medeltemperatur, °C (AEMET T) */
  mean: number;
  /** Medelvärde av dygnets högsta temperatur, °C (AEMET TM) */
  max: number;
  /** Medelvärde av dygnets lägsta temperatur, °C (AEMET Tm) */
  min: number;
  /** Nederbörd, mm (AEMET R) */
  rainMm: number;
  /** Dagar med minst 1 mm nederbörd (AEMET DR) */
  rainDays: number;
  /** Soltimmar per månad (AEMET I) */
  sunHours: number;
  /** Havstemperatur vid Palma, ca °C */
  sea: number;
};

const DAYS_IN_MONTH = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const CLIMATE: MonthClimate[] = [
  { month: 1, name: 'Januari', short: 'jan', mean: 9.5, max: 15.2, min: 3.8, rainMm: 37, rainDays: 5.7, sunHours: 163, sea: 14 },
  { month: 2, name: 'Februari', short: 'feb', mean: 9.8, max: 15.4, min: 4.0, rainMm: 32, rainDays: 5.1, sunHours: 166, sea: 14 },
  { month: 3, name: 'Mars', short: 'mar', mean: 11.3, max: 17.5, min: 5.2, rainMm: 26, rainDays: 4.5, sunHours: 202, sea: 14 },
  { month: 4, name: 'April', short: 'apr', mean: 13.6, max: 19.8, min: 7.4, rainMm: 34, rainDays: 4.8, sunHours: 234, sea: 16 },
  { month: 5, name: 'Maj', short: 'maj', mean: 17.5, max: 23.7, min: 11.3, rainMm: 32, rainDays: 3.8, sunHours: 283, sea: 19 },
  { month: 6, name: 'Juni', short: 'jun', mean: 21.7, max: 28.1, min: 15.4, rainMm: 12, rainDays: 1.8, sunHours: 316, sea: 23 },
  { month: 7, name: 'Juli', short: 'jul', mean: 24.8, max: 31.2, min: 18.3, rainMm: 5, rainDays: 0.5, sunHours: 342, sea: 25 },
  { month: 8, name: 'Augusti', short: 'aug', mean: 25.1, max: 31.3, min: 18.9, rainMm: 17, rainDays: 1.7, sunHours: 315, sea: 26 },
  { month: 9, name: 'September', short: 'sep', mean: 22.2, max: 27.9, min: 16.5, rainMm: 50, rainDays: 4.3, sunHours: 222, sea: 25 },
  { month: 10, name: 'Oktober', short: 'okt', mean: 18.5, max: 23.9, min: 13.1, rainMm: 62, rainDays: 6.1, sunHours: 203, sea: 23 },
  { month: 11, name: 'November', short: 'nov', mean: 13.7, max: 19.0, min: 8.3, rainMm: 55, rainDays: 6.1, sunHours: 162, sea: 20 },
  { month: 12, name: 'December', short: 'dec', mean: 10.8, max: 16.1, min: 5.4, rainMm: 48, rainDays: 6.4, sunHours: 152, sea: 16 },
];

/** Årsvärden enligt AEMET (B278, 1981–2010). */
export const CLIMATE_YEAR = { mean: 16.5, rainMm: 411, rainDays: 50.9, sunHours: 2756 };

/** Genomsnittliga soltimmar per dag, avrundat till en decimal. */
export function sunPerDay(m: MonthClimate): number {
  return Math.round((m.sunHours / DAYS_IN_MONTH[m.month - 1]) * 10) / 10;
}

const num = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 1, minimumFractionDigits: 0 });
/** Svenskt talformat med decimalkomma, t.ex. 15,2 */
export const fmt = (n: number) => num.format(n);
/** Heltal, t.ex. 15 */
export const fmt0 = (n: number) => String(Math.round(n));

export const CLIMATE_STATION = {
  name: 'Palma de Mallorca, Aeropuerto',
  id: 'B278',
  period: '1981–2010',
};

export const CLIMATE_CHECKED = '2026-11-18';

export const CLIMATE_SOURCES: Source[] = [
  {
    label: 'AEMET – normalvärden Palma de Mallorca, Aeropuerto 1981–2010',
    href: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=B278&k=bal',
  },
  { label: 'seatemperature.org – havstemperatur i Palma', href: 'https://www.seatemperature.org/europe/spain/palma.htm' },
];

/** Prognoskälla för /vader och Dagens strand. */
export const MET_NO_SOURCE: Source = {
  label: 'Meteorologisk institutt (met.no) – prognos',
  href: 'https://api.met.no/weatherapi/locationforecast/2.0/documentation',
};
