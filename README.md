# MyMallorca – mymallorca.se

En svensk guide till Mallorca, skriven av passion för ön. Sajten riktar sig till barnfamiljer
(barnaktiviteterna är särdraget), par i alla åldrar (vingårdar, golf, stränder, restauranger)
och dig som bor på ön eller har sommarställe där.

Sajten är byggd med [Next.js](https://nextjs.org) (App Router), React och TypeScript och ligger på Vercel.
Läs `AGENTS.md`: Next.js-versionen här skiljer sig från äldre versioner, och dokumentationen
för den installerade versionen finns i `node_modules/next/dist/docs/`.

## Riktlinjer

- Inga affiliatelänkar, inga provisionstexter och inga hårdkodade priser för att sälja.
- Inget kontaktformulär och ingen personlig guide eller reseplanering.
- Kort, saklig svenska med du-tilltal. Ortnamn skrivs med accent: Sóller, Deià, Santanyí,
  Pollença, Artà, Alcúdia, Felanitx, Capdepera. Allt om språk, ortnamn, enheter och källor
  finns i [stilguiden](docs/stilguide.md).
- Personliga inslag (som "Grytes favoritstrand") behålls.
- Ändra inte befintliga URL:er utan att lägga in en 301 i `next.config.ts`.

## Struktur

```
app/                  Sidor och routes (App Router)
  layout.tsx          Rotlayout: fonter, metadata, sidhuvud, sidfot, Organization/WebSite-schema
  page.tsx            Startsidan
  <ort>/              Stadssidor (t.ex. palma-de-mallorca, soller, deia)
  strandar/, barn/, aktiviteter/, evenemang/, vader/, mat/, vingardar/, flyg/ ...
  guide/<slug>/       Guider, med översikten på /guider
  api/weather/        Proxy mot met.no (endast koordinater på Mallorca, cachas 30 min)
  components/         Sektions- och sidkomponenter (se nedan)
  lib/                Hjälpfunktioner och data för SEO, JSON-LD och barnaktiviteter
  fonts/              Self-hostade fonter (woff2, SIL OFL)
  error.tsx           Felsida för fel inne i en sida
  global-error.tsx    Felsida om rotlayouten själv fallerar
  not-found.tsx       404-sida
  sitemap.ts, robots.ts
components/           Delade layout- och UI-komponenter (se nedan)
data/                 Typad innehållsdata (städer, golfbanor m.m.)
public/               Statiska filer
docs/stilguide.md     Stilguide för alla texter (ton, ortnamn, enheter, källor)
scripts/smoke.mjs     Röktestet
scripts/proof.mjs     Korrekturskriptet (se stilguiden)
```

### Var ska en komponent ligga?

- **`components/`** – det som är gemensamt för hela sajten och inte hör till en viss sida:
  sidhuvud (`Navbar`), sidfot (`SiteFooter`), ikoner (`Icons`), hero-komponenter och kartorna.
- **`app/components/`** – komponenter som bygger upp sidornas innehåll: startsidans sektioner
  (`Section*`), kort och vyer för barnaktiviteter, brödsmulor, tipsrutor och strukturerad data
  (`JsonLd`, `SchemaOrg`).
- Komponenter som bara används av en enda route kan ligga i den routens mapp.
- Strukturerad data (JSON-LD) renderas alltid via `app/components/JsonLd.tsx` (`<JsonLd data={...} />`),
  som escapar innehållet säkert.

## Datakällor

- **Text och urval:** redaktionellt, skrivet för sajten. Fakta kontrolleras mot officiella källor
  (kommuner, AEMET, Ibestat, arrangörernas egna sajter).
- **Väder:** [MET Norway Locationforecast](https://api.met.no/) via `app/api/weather/route.ts`.
- **Kartor:** [Leaflet](https://leafletjs.com/) med kartbrickor från [OpenStreetMap](https://www.openstreetmap.org/copyright).
- **Bilder:** Unsplash, Pexels och Wikimedia Commons, med fotograf angiven där det krävs.
  Externa bildvärdar måste finnas både i `images.remotePatterns` och i CSP:ns `img-src` i `next.config.ts`.
- **Fonter:** Inter, Playfair Display och Bebas Neue, self-hostade från Fontsource (SIL Open Font License).

## Kommandon

Kräver Node.js 22 (minst 20.9).

| Kommando | Vad det gör |
|---|---|
| `npm ci` | Installerar beroenden enligt `package-lock.json` |
| `npm run dev` | Utvecklingsserver på http://localhost:3000 |
| `npm run build` | Produktionsbygge |
| `npm run start` | Startar produktionsbygget |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`, med `noUnusedLocals`/`noUnusedParameters`) |
| `npm run proof` | Korrekturskript: ortnamn, enheter, tecken och ord enligt [stilguiden](docs/stilguide.md) |
| `npm run smoke` | Röktest mot produktionsbygget (kräver `npm run build` först) |
| `npm run ci` | Allt ovan i ordning: lint, typecheck, build, smoke |
| `npm run knip` | Letar efter oanvända filer, exporter och beroenden |

### Röktestet

`scripts/smoke.mjs` startar `next start` på port 3199 (ändra med `SMOKE_PORT`) och

1. hämtar `/sitemap.xml` och kontrollerar att varje URL (omskriven till localhost) svarar 200
   utan omdirigering, har exakt en `<h1>` i den serverrenderade HTML:en och har säkerhetsheaders,
2. kontrollerar att `/robots.txt` svarar 200 och att en okänd URL ger 404,
3. öppnar några sidor (`/`, `/strandar`, `/barn`, `/vader`, `/palma-de-mallorca`, `/guider`,
   `/aktiviteter/golf`) i Chromium i mobilstorlek, scrollar igenom dem och kräver 0 konsolfel,
   0 JavaScript-fel och 0 CSP-överträdelser.

Externa resurser besvaras lokalt i Chromium-delen, så testet beror inte på nätet.
Använd `SMOKE_BASE_URL=http://localhost:3000` för att testa en server som redan körs, och
`SMOKE_SKIP_BROWSER=1` för att bara köra HTTP-kontrollerna. Chromium installeras med
`npx playwright install chromium` om den inte redan finns.

## CI

`.github/workflows/ci.yml` kör `npm ci`, lint, typkontroll, bygge och röktest vid varje push och pull request.
För att CI ska vara obligatoriskt före merge behöver en branch protection-regel (eller ruleset) för
`main` slås på i GitHub: *Settings → Branches → Require status checks to pass*, med kontrollen
"Lint, typer, bygge och röktest".

Dependabot (`.github/dependabot.yml`) föreslår uppdateringar av npm-paket och GitHub Actions varje vecka,
med minor- och patchuppdateringar grupperade.

## Säkerhetsheaders

Sätts i `next.config.ts` för alla sidor: CSP i Report-Only-läge (överträdelser syns i webbläsarens konsol),
`frame-ancestors 'none'` och `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` och HSTS. Laddar sajten
något från en ny extern domän måste domänen läggas till i CSP:n, annars fäller röktestet.

## Deploy

Sajten deployas på Vercel. Varje push till `main` går ut i produktion och varje pull request får en
förhandsversion. Inga miljövariabler krävs för bygget.
