// Regler för verktyget "Bästa restid" (3.3). Rena funktioner utan React, så att
// både serverrenderade regelbeskrivningar och klientkomponenten använder samma logik.
//
// Varje aktivitet får en poäng 0–100 per månad. Poängen bygger på klimatdatan i
// data/climate.ts (AEMET-normalvärden och havstemperatur) och – för "lugn" och
// i viss mån "stadsliv" och "barn" – på turisttrycket, som är vår egen bedömning.
// Gränserna står i klartext i RULES så att sidan kan visa exakt hur rankningen görs.

import { CLIMATE, fmt, fmt0, sunPerDay, type MonthClimate } from '@/data/climate';

export type ActivityKey = 'bad' | 'vandring' | 'cykling' | 'golf' | 'stad' | 'lugn' | 'barn';
export type RegionKey = 'hela' | 'palma' | 'tramuntana' | 'norr' | 'ost';

export const ACTIVITIES: { key: ActivityKey; label: string }[] = [
  { key: 'bad', label: 'Bad och strand' },
  { key: 'vandring', label: 'Vandring' },
  { key: 'cykling', label: 'Cykling' },
  { key: 'golf', label: 'Golf' },
  { key: 'stad', label: 'Stadsliv och kultur' },
  { key: 'lugn', label: 'Lugn och få turister' },
  { key: 'barn', label: 'Resa med barn' },
];

export const REGIONS: { key: RegionKey; label: string }[] = [
  { key: 'hela', label: 'Hela ön' },
  { key: 'palma', label: 'Palma och sydvästra kusten' },
  { key: 'tramuntana', label: 'Serra de Tramuntana och västkusten' },
  { key: 'norr', label: 'Norra kusten (Alcúdia, Pollença)' },
  { key: 'ost', label: 'Öst- och sydkusten' },
];

/**
 * Turisttryck 1–5 per månad (januari först). Redaktionell bedömning, inte statistik:
 * högsäsong juli–augusti, lugnast november–februari.
 */
export const TOURIST_PRESSURE = [1, 1, 2, 3, 4, 4, 5, 5, 4, 3, 1, 1];

/** Lågsäsong då många hotell och restauranger i kustorterna (men inte Palma) håller stängt. */
const COASTAL_CLOSED = new Set([11, 12, 1, 2, 3]);

/** Regler i klartext – visas på sidan och motsvarar poängsättningen nedan. */
export const RULES: Record<ActivityKey, string> = {
  bad: 'Havstemperaturen väger tyngst (bäst från 25 °C, behagligt från 23 °C, svalt under 21 °C), därefter dagstemperatur, regndagar och soltimmar.',
  vandring: 'Bäst när dagens högsta temperatur ligger mellan 17 och 24 °C. Varje grad över drar ner mer än varje grad under – över 28 °C blir långa turer tunga. Färre regndagar och fler soltimmar ger pluspoäng.',
  cykling: 'Bäst mellan 17 och 25 °C på dagen, med få regndagar. Värme över 28 °C och blöta månader drar ner.',
  golf: 'Bäst mellan 17 och 26 °C på dagen och med få regndagar. Högsommarens värme drar ner.',
  stad: 'Behaglig dagstemperatur (18–28 °C) och lite regn. Många turister drar ner något, mest i juli och augusti.',
  lugn: 'Turisttrycket väger tyngst, därefter att vädret är milt nog för att vara ute.',
  barn: 'Badtemperaturen väger tyngst (från 23 °C), men över 30 °C på dagen blir det varmt för små barn. Få regndagar ger pluspoäng.',
};

export const REGION_RULES: Record<RegionKey, string> = {
  hela: 'Klimatdatan gäller Palma. Den ger en bra bild av kusten runt ön.',
  palma: 'Palma har öppet året runt, så även vintermånaderna fungerar för stadsliv.',
  tramuntana: 'I bergen är det svalare och regnar mer än i Palma, särskilt under vinterhalvåret. Det ger sommaren lite pluspoäng och vintern minuspoäng för vandring och cykling.',
  norr: 'Från november till mars har många hotell och restauranger i kustorterna stängt, vilket drar ner stadsliv och resor med barn.',
  ost: 'Från november till mars har många hotell och restauranger i kustorterna stängt, vilket drar ner stadsliv och resor med barn.',
};

export type MonthResult = {
  month: MonthClimate;
  score: number;
  verdict: string;
  reasons: string[];
};

const VERDICTS: [number, string][] = [
  [80, 'Mycket bra'],
  [60, 'Bra'],
  [40, 'Möjligt'],
  [0, 'Mindre lämpligt'],
];

export function verdictFor(score: number): string {
  return VERDICTS.find(([min]) => score >= min)?.[1] ?? 'Mindre lämpligt';
}

/** Regnpoäng: full poäng vid 1 regndag eller färre, noll vid 7 eller fler. */
function rainPoints(days: number, full: number): number {
  return full * Math.max(0, Math.min(1, (7 - days) / 6));
}

const rainText = (m: MonthClimate) => `${fmt(m.rainDays)} regndagar`;
const maxText = (m: MonthClimate) => `ca ${fmt0(m.max)} °C på dagen`;
const seaText = (m: MonthClimate) => `havet ca ${fmt0(m.sea)} °C`;
const sunText = (m: MonthClimate) => `${fmt(sunPerDay(m))} soltimmar per dag`;

/**
 * Poäng för behaglig aktivitetstemperatur: full poäng när dagens högsta ligger i [lo, hi],
 * minus 10 % per grad under och minus 18 % per grad över (värme sliter mer än svalka).
 */
function comfortPoints(max: number, lo: number, hi: number, full: number): { pts: number; note?: string } {
  if (max >= lo && max <= hi) return { pts: full };
  if (max < lo) {
    const below = lo - max;
    return { pts: full * Math.max(0, 1 - 0.1 * below), note: below > 2.5 ? 'svalt' : undefined };
  }
  const above = max - hi;
  const note = max > 29 ? 'hett mitt på dagen' : above > 2 ? 'varmt mitt på dagen' : undefined;
  return { pts: full * Math.max(0, 1 - 0.18 * above), note };
}

function scoreBase(a: ActivityKey, m: MonthClimate): { score: number; reasons: string[] } {
  const sun = sunPerDay(m);
  const crowd = TOURIST_PRESSURE[m.month - 1];
  switch (a) {
    case 'bad':
    case 'barn': {
      const seaPts = m.sea >= 25 ? 50 : m.sea >= 23 ? 42 : m.sea >= 21 ? 28 : m.sea >= 19 ? 14 : 0;
      let airPts = m.max >= 26 ? 25 : m.max >= 23 ? 18 : m.max >= 20 ? 8 : 0;
      const reasons = [seaText(m), maxText(m)];
      if (a === 'barn' && m.max > 30) {
        airPts = 12;
        reasons[1] = `${maxText(m)} – varmt för små barn mitt på dagen`;
      }
      const sunPts = sun >= 10 ? 10 : sun >= 8 ? 6 : 2;
      reasons.push(rainText(m));
      return { score: seaPts + airPts + rainPoints(m.rainDays, 15) + sunPts, reasons };
    }
    case 'vandring':
    case 'cykling':
    case 'golf': {
      const hi = a === 'vandring' ? 24 : a === 'cykling' ? 25 : 26;
      const c = comfortPoints(m.max, 17, hi, 55);
      const sunPts = sun >= 7 ? 15 : sun >= 6 ? 10 : 5;
      const reasons = [c.note ? `${maxText(m)} – ${c.note}` : maxText(m), rainText(m), sunText(m)];
      return { score: c.pts + rainPoints(m.rainDays, 30) + sunPts, reasons };
    }
    case 'stad': {
      const c = comfortPoints(m.max, 18, 28, 55);
      const crowdPts = crowd >= 5 ? -10 : crowd === 4 ? -5 : 0;
      const reasons = [c.note ? `${maxText(m)} – ${c.note}` : maxText(m), rainText(m)];
      if (crowdPts) reasons.push(crowd >= 5 ? 'högsäsong med mycket folk' : 'många turister');
      return { score: 15 + c.pts + rainPoints(m.rainDays, 30) + crowdPts, reasons };
    }
    case 'lugn': {
      const crowdPts = (5 - crowd) * 16;
      const mild = m.max >= 17 ? 20 : 8;
      const crowdWord = ['mycket få turister', 'få turister', 'en del turister', 'många turister', 'högsäsong'][crowd - 1];
      return { score: crowdPts + mild + rainPoints(m.rainDays, 16), reasons: [crowdWord, maxText(m), rainText(m)] };
    }
  }
}

function regionAdjust(a: ActivityKey, r: RegionKey, m: MonthClimate): { delta: number; reason?: string } {
  if ((r === 'norr' || r === 'ost') && COASTAL_CLOSED.has(m.month) && (a === 'stad' || a === 'barn')) {
    return { delta: -12, reason: 'många hotell och restauranger i kustorterna har stängt' };
  }
  if (r === 'tramuntana' && (a === 'vandring' || a === 'cykling')) {
    if ([11, 12, 1, 2].includes(m.month)) return { delta: -8, reason: 'mer regn i bergen än i Palma' };
    if ([6, 7, 8, 9].includes(m.month)) return { delta: 6, reason: 'något svalare på höjden' };
  }
  return { delta: 0 };
}

export function rankMonths(a: ActivityKey, r: RegionKey): MonthResult[] {
  return CLIMATE.map((m) => {
    const base = scoreBase(a, m);
    const adj = regionAdjust(a, r, m);
    const score = Math.max(0, Math.min(100, Math.round(base.score + adj.delta)));
    const reasons = adj.reason ? [...base.reasons, adj.reason] : base.reasons;
    return { month: m, score, verdict: verdictFor(score), reasons };
  }).sort((x, y) => y.score - x.score || x.month.month - y.month.month);
}

export function isActivity(v: string | null): v is ActivityKey {
  return !!v && ACTIVITIES.some((a) => a.key === v);
}

export function isRegion(v: string | null): v is RegionKey {
  return !!v && REGIONS.some((r) => r.key === v);
}
