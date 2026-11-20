#!/usr/bin/env node
/**
 * Skickar ändrade URL:er i sitemapen till IndexNow (Bing, Yandex, Seznam m.fl. delar anropen).
 * Som ändrad räknas en URL vars <lastmod> ligger inom de senaste dygnen (se --days). URL:er
 * utan <lastmod> skickas bara med --all. Matchar ingen URL skickas inget.
 *
 * Körs automatiskt av .github/workflows/indexnow.yml efter varje lyckad produktionsdeploy,
 * men kan också köras för hand:
 *
 *   node scripts/indexnow.mjs            skickar URL:er med lastmod inom de senaste 3 dygnen
 *   node scripts/indexnow.mjs --days=7   samma, men med lastmod inom de senaste 7 dygnen
 *   node scripts/indexnow.mjs --all      skickar alla URL:er i sitemapen
 *   node scripts/indexnow.mjs --dry-run  visar bara vad som skulle skickas (går att kombinera)
 *
 * Nyckeln är publik (den ligger i public/<nyckel>.txt och serveras på sajten), så inga
 * hemligheter behövs. Byter du nyckel: byt filnamn och innehåll i public/ och KEY nedan.
 *
 * Miljövariabler:
 *   INDEXNOW_SITEMAP  Annan sitemap att läsa (t.ex. http://localhost:3000/sitemap.xml för test).
 *                     URL:erna skickas ändå bara om de hör till HOST.
 *
 * Ett misslyckat anrop loggas och ger slutkod 1, men gör inget annat.
 * Protokollet: https://www.indexnow.org/documentation
 */

const HOST = 'www.mymallorca.se';
const KEY = '349e1ed01c8ac659a5d262af1f488538';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = process.env.INDEXNOW_SITEMAP || `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // protokollets gräns per anrop
const TIMEOUT_MS = 20000;
const DRY_RUN = process.argv.includes('--dry-run');
const ALL = process.argv.includes('--all');
const DAYS_ARG = process.argv.find((a) => a.startsWith('--days='));
const DAYS = DAYS_ARG ? Number(DAYS_ARG.slice('--days='.length)) : 3;
const DAY_MS = 24 * 60 * 60 * 1000;

// Svarskoder enligt protokollet.
const STATUS_TEXT = {
  200: 'OK – URL:erna är mottagna',
  202: 'Accepterat – nyckeln valideras ännu',
  400: 'Felaktig förfrågan',
  403: 'Nyckeln är ogiltig (hittades inte eller fel innehåll i nyckelfilen)',
  422: 'URL:erna hör inte till host eller nyckeln matchar inte protokollet',
  429: 'För många anrop (möjlig spam)',
};

const inActions = process.env.GITHUB_ACTIONS === 'true';
function warn(msg) {
  console.error(inActions ? `::warning title=IndexNow::${msg}` : `IndexNow: ${msg}`);
  process.exitCode = 1;
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} gav ${res.status}`);
  return res.text();
}

/**
 * Läser <loc> och <lastmod> ur en sitemap; följer ett sitemapindex en nivå ned.
 * Ger [{ loc, lastmod }] där lastmod är en tidpunkt i ms eller null.
 */
async function readSitemap(url, depth = 0) {
  const xml = await fetchText(url);
  if (/<sitemapindex[\s>]/.test(xml) && depth === 0) {
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
    const nested = await Promise.all(locs.map((loc) => readSitemap(loc, 1)));
    return nested.flat();
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].flatMap((m) => {
    const loc = m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/);
    if (!loc) return [];
    const mod = m[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/);
    const t = mod ? Date.parse(mod[1]) : NaN;
    return [{ loc: loc[1].replace(/&amp;/g, '&'), lastmod: Number.isNaN(t) ? null : t }];
  });
}

async function main() {
  if (!ALL && !(DAYS > 0)) {
    warn(`ogiltigt värde för --days (${DAYS_ARG}); ange ett positivt tal`);
    return;
  }
  let entries;
  try {
    entries = await readSitemap(SITEMAP);
  } catch (e) {
    warn(`kunde inte läsa sitemapen ${SITEMAP} (${e.message})`);
    return;
  }
  const latest = new Map();
  for (const { loc, lastmod } of entries) {
    let host;
    try {
      host = new URL(loc).host;
    } catch {
      continue;
    }
    if (host !== HOST) continue;
    const prev = latest.get(loc);
    latest.set(loc, prev == null || (lastmod != null && lastmod > prev) ? lastmod : prev);
  }
  if (latest.size === 0) {
    warn(`inga URL:er för ${HOST} i ${SITEMAP}`);
    return;
  }

  let own;
  if (ALL) {
    own = [...latest.keys()];
    console.log(`--all: skickar alla ${own.length} URL:er i sitemapen.`);
  } else {
    const since = Date.now() - DAYS * DAY_MS;
    own = [...latest].filter(([, t]) => t != null && t >= since).map(([loc]) => loc);
    const cutoff = new Date(since).toISOString().slice(0, 10);
    console.log(`${own.length} av ${latest.size} URL:er har lastmod från ${cutoff} eller senare (senaste ${DAYS} dygnen).`);
    if (own.length === 0) {
      console.log('Inga ändrade URL:er – inget skickas. Använd --all för att skicka alla.');
      return;
    }
  }
  if (own.length > MAX_URLS) console.log(`Skickar de första ${MAX_URLS} av ${own.length} URL:er.`);
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: own.slice(0, MAX_URLS) };

  if (DRY_RUN) {
    console.log(`Torrkörning: skulle skicka ${body.urlList.length} URL:er till ${ENDPOINT}`);
    console.log(JSON.stringify(body, null, 2));
    return;
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const text = (await res.text()).slice(0, 500);
    const label = STATUS_TEXT[res.status] || 'oväntat svar';
    if (res.status === 200 || res.status === 202) {
      console.log(`IndexNow: ${res.status} ${label}. ${body.urlList.length} URL:er skickade.`);
    } else {
      warn(`${res.status} ${label}${text ? `: ${text}` : ''}`);
    }
  } catch (e) {
    warn(`anropet till ${ENDPOINT} misslyckades (${e.message})`);
  }
}

await main();
