#!/usr/bin/env node
/**
 * Skickar alla URL:er i sitemapen till IndexNow (Bing, Yandex, Seznam m.fl. delar anropen).
 *
 * Körs automatiskt av .github/workflows/indexnow.yml efter varje lyckad produktionsdeploy,
 * men kan också köras för hand:
 *
 *   node scripts/indexnow.mjs            hämtar sitemapen och skickar URL:erna
 *   node scripts/indexnow.mjs --dry-run  visar bara vad som skulle skickas
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

/** Läser <loc> ur en sitemap; följer ett sitemapindex en nivå ned. */
async function readSitemap(url, depth = 0) {
  const xml = await fetchText(url);
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  if (/<sitemapindex[\s>]/.test(xml) && depth === 0) {
    const nested = await Promise.all(locs.map((loc) => readSitemap(loc, 1)));
    return nested.flat();
  }
  return locs;
}

async function main() {
  let urls;
  try {
    urls = await readSitemap(SITEMAP);
  } catch (e) {
    warn(`kunde inte läsa sitemapen ${SITEMAP} (${e.message})`);
    return;
  }
  const own = [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });
  if (own.length === 0) {
    warn(`inga URL:er för ${HOST} i ${SITEMAP}`);
    return;
  }
  if (own.length > MAX_URLS) console.log(`Sitemapen har ${own.length} URL:er; skickar de första ${MAX_URLS}.`);
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
