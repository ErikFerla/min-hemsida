#!/usr/bin/env node
/**
 * Röktest för mymallorca.se.
 *
 * 1. Startar `next start` på en ledig port (eller använder SMOKE_BASE_URL om satt).
 * 2. Hämtar /sitemap.xml och kontrollerar för varje URL (omskriven till localhost):
 *    - status 200 (ingen omdirigering)
 *    - exakt en <h1> i den serverrenderade HTML:en
 *    - säkerhetsheaders finns (nosniff, CSP, frame-ancestors)
 * 3. Öppnar några sidor i Chromium (Playwright) och kräver 0 konsolfel och
 *    0 okontrollerade JS-fel. CSP Report-Only-överträdelser räknas som fel –
 *    lägg i så fall till värden i next.config.ts.
 *
 * Kräver ett färdigt bygge (`npm run build`).
 *
 * Miljövariabler:
 *   SMOKE_BASE_URL   Testa en redan körande server i stället för att starta en.
 *   SMOKE_PORT       Port för den egna servern (standard 3199).
 *   SMOKE_SKIP_BROWSER=1  Hoppa över Chromium-delen (bara HTTP-kontroller).
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.SMOKE_PORT || 3199);
const BROWSER_PATHS = ['/', '/strandar', '/barn', '/vader', '/palma-de-mallorca', '/guider', '/aktiviteter/golf'];
const CONCURRENCY = 6;

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.error(`  FEL: ${msg}`);
};

async function startServer() {
  if (!existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) {
    console.error('Inget bygge hittades (.next/BUILD_ID). Kör `npm run build` först.');
    process.exit(1);
  }
  const nextBin = path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
  const child = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', (d) => (output += d));
  child.stderr.on('data', (d) => (output += d));

  const base = `http://localhost:${PORT}`;
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) break;
    try {
      const res = await fetch(`${base}/robots.txt`);
      if (res.ok) return { base, stop: () => child.kill('SIGTERM') };
    } catch {
      // servern har inte startat än
    }
    await sleep(500);
  }
  child.kill('SIGTERM');
  console.error(`next start kom inte igång på port ${PORT}.\n${output}`);
  process.exit(1);
}

async function mapLimit(items, limit, fn) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

async function checkSitemap(base) {
  console.log('\n== Sitemap och SSR-HTML ==');
  const res = await fetch(`${base}/sitemap.xml`);
  if (res.status !== 200) {
    fail(`/sitemap.xml gav ${res.status}`);
    return [];
  }
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('sitemap.xml innehåller inga <loc>');

  const paths = locs.map((loc) => {
    const u = new URL(loc);
    return u.pathname + u.search;
  });
  const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
  if (dupes.length) fail(`dubbletter i sitemap: ${[...new Set(dupes)].join(', ')}`);

  await mapLimit(paths, CONCURRENCY, async (p) => {
    let r;
    try {
      r = await fetch(base + p, { redirect: 'manual' });
    } catch (e) {
      fail(`${p}: kunde inte hämtas (${e.message})`);
      return;
    }
    if (r.status !== 200) {
      fail(`${p}: status ${r.status}${r.headers.get('location') ? ` -> ${r.headers.get('location')}` : ''}`);
      return;
    }
    const html = await r.text();
    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) fail(`${p}: ${h1} st <h1> i SSR-HTML (ska vara exakt 1)`);
    if (r.headers.get('x-content-type-options') !== 'nosniff') fail(`${p}: saknar X-Content-Type-Options: nosniff`);
    if (!r.headers.get('content-security-policy-report-only')) fail(`${p}: saknar Content-Security-Policy-Report-Only`);
    if (!/frame-ancestors 'none'/.test(r.headers.get('content-security-policy') || '')) {
      fail(`${p}: saknar frame-ancestors 'none' i Content-Security-Policy`);
    }
    console.log(`  ok  ${p} (h1: ${h1})`);
  });
  return paths;
}

async function checkMisc(base) {
  console.log('\n== Övrigt ==');
  const robots = await fetch(`${base}/robots.txt`);
  if (robots.status !== 200) fail(`/robots.txt gav ${robots.status}`);
  else console.log('  ok  /robots.txt');
  const missing = await fetch(`${base}/den-har-sidan-finns-inte-${Date.now()}`);
  if (missing.status !== 404) fail(`okänd URL gav ${missing.status} (ska vara 404)`);
  else console.log('  ok  okänd URL ger 404');
}

async function checkBrowser(base, sitemapPaths) {
  if (process.env.SMOKE_SKIP_BROWSER === '1') {
    console.log('\n== Chromium hoppas över (SMOKE_SKIP_BROWSER=1) ==');
    return;
  }
  console.log('\n== Chromium: konsolfel ==');
  const { chromium } = await import('@playwright/test');
  const browser = await chromium.launch();
  const local = new URL(base);
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    // Externa resurser (bilder, kartbrickor) och bildoptimeringen (/_next/image, som
    // själv hämtar från Unsplash m.fl.) besvaras med 204 så att testet inte beror på
    // nätet. CSP kontrolleras ändå, eftersom överträdelser rapporteras innan
    // förfrågan skickas.
    await context.route(
      (url) => url.host !== local.host || url.pathname === '/_next/image',
      (route) => route.fulfill({ status: 204, body: '' }),
    );

    const targets = BROWSER_PATHS.filter((p) => p === '/' || sitemapPaths.includes(p));
    for (const p of targets) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', (msg) => {
        // CSP Report-Only-överträdelser och ogiltiga Permissions-Policy-värden loggas
        // som info/warning, inte error – de ska ändå fälla testet.
        const headerProblem = /Content Security Policy|Permissions-Policy/.test(msg.text());
        if (msg.type() !== 'error' && !headerProblem) return;
        // /api/weather hämtar från met.no; når servern inte ut (t.ex. i en sandlåda)
        // blir det 502. Det är miljön, inte sidan – sidan ska bara inte krascha.
        const src = msg.location()?.url || '';
        if (msg.text().startsWith('Failed to load resource') && src.includes('/api/weather')) return;
        errors.push(`${msg.text()}${src ? ` [${src}]` : ''}`);
      });
      page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
      try {
        const res = await page.goto(base + p, { waitUntil: 'load', timeout: 30000 });
        if (!res || res.status() !== 200) fail(`${p} (chromium): status ${res ? res.status() : 'okänd'}`);
        // Scrolla igenom sidan så att lat laddade delar (kartor, bilder) aktiveras.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 100));
          }
        });
        await page.waitForTimeout(1000);
      } catch (e) {
        errors.push(`navigering misslyckades: ${e.message}`);
      }
      if (errors.length) {
        for (const e of errors) fail(`${p} (chromium): ${e.split('\n')[0].slice(0, 300)}`);
      } else {
        console.log(`  ok  ${p}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  let server = null;
  let base = process.env.SMOKE_BASE_URL?.replace(/\/$/, '');
  if (!base) {
    server = await startServer();
    base = server.base;
  }
  console.log(`Röktest mot ${base}`);
  try {
    const paths = await checkSitemap(base);
    await checkMisc(base);
    await checkBrowser(base, paths);
  } finally {
    server?.stop();
  }

  if (failures.length) {
    console.error(`\nRöktestet misslyckades: ${failures.length} fel.`);
    process.exit(1);
  }
  console.log('\nRöktestet gick igenom.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
