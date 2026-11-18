#!/usr/bin/env node
/**
 * Korrekturskript för mymallorca.se (åtgärd 3.8, se docs/stilguide.md).
 *
 * Läser alla .ts/.tsx-filer i app/, data/ och components/ med TypeScript-parsern och
 * kontrollerar de strängar som syns för besökaren: JSX-text, textattribut (alt, title,
 * aria-label, placeholder) och strängliteraler/mallsträngar i kod och data.
 *
 * Följande hoppas över, eftersom de inte är synlig text eller får vara på originalspråk:
 * - importer/exporter, objektnycklar, kommentarer och reguljära uttryck
 * - tekniska fält (href, src, slug, url, id, className, key, icon, image, type …)
 *   och strängar utan mellanslag som ser ut som slugs, sökvägar eller URL:er
 * - källor och länktitlar: objekt där en syskonegenskap `href`/`url` pekar på en extern
 *   adress (källornas egna titlar får stå på originalspråk)
 * - rader som slutar med kommentaren `proof-ignore`
 *
 * Avslutar med kod 1 om något hittas. Kör: `npm run proof`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['app', 'data', 'components'];

/** Fält vars värden aldrig är synlig text. */
const TECHNICAL_KEYS = new Set([
  'href', 'src', 'srcSet', 'slug', 'url', 'id', 'className', 'key', 'icon', 'image', 'img',
  'type', 'rel', 'target', 'as', 'method', 'lang', 'locale', 'canonical', 'path', 'route',
  'variant', 'color', 'colour', 'bg', 'size', 'sizes', 'loading', 'decoding', 'fetchPriority',
  'role', 'htmlFor', 'name', 'value', 'mode', 'kind', 'region', 'category', 'regionId',
  'imageUrl', 'heroImage', 'photo', 'credit', 'tag', 'tags', 'filter', 'sameAs', 'logo',
  'mapUrl', 'website', 'googleMaps', 'iso', 'start', 'end', 'date', 'checked', 'updated',
  'changeFrequency', 'strategy', 'crossOrigin', 'referrerPolicy', 'sandbox', 'allow',
  'inputMode', 'autoComplete', 'pattern', 'accept', 'form', 'dateTime', 'cityId', 'emoji',
  '@type', '@context', '@id', 'format', 'sizesAttr', 'objectPosition', 'position',
  'mapQuery', 'query', 'q', 'mapsQuery', 'searchQuery',
]);

/**
 * Egennamn på företag, banor och evenemang som stavas så av ägaren själv – de undantas
 * från ortnamnskontrollen. Lägg bara till namn som verkligen är officiella.
 */
const PROPER_NAMES = [
  'Golf Santa Ponsa', 'Club de Golf Santa Ponsa', 'Pollensa Golf', 'Golf Pollensa',
  'Hidropark Alcudia', 'Jungle Parc Santa Ponsa', 'Aqualand El Arenal',
];
/** JSX-attribut som är synlig (eller uppläst) text. */
const TEXT_ATTRS = new Set(['alt', 'title', 'aria-label', 'placeholder', 'label', 'content', 'description', 'text', 'heading', 'subtitle', 'tip', 'caption']);

/** Felaktiga ortnamn och stavningar: [regex, rätt form]. Matchas skiftlägeskänsligt. */
const L = '\\p{L}';
const NAMES = [
  ['Soller', 'Sóller'], ['Deia', 'Deià'], ['Alcudia', 'Alcúdia'], ['Pollensa', 'Pollença'],
  ['Pollenca', 'Pollença'], ['Porto Petro', 'Portopetro'], ['Portocolom', 'Porto Colom'],
  ['Santanyi', 'Santanyí'], ['Arta', 'Artà'], ['Calo des Moro', 'Caló des Moro'],
  ['Caló del Moro', 'Caló des Moro'], ['Cala Ratjada', 'Cala Rajada'], ['Valldemosa', 'Valldemossa'],
  ['Valdemossa', 'Valldemossa'], ['Andratz', 'Andratx'], ['Lluchmajor', 'Llucmajor'],
  ['Felanitix', 'Felanitx'], ['Capdepara', 'Capdepera'], ['Sineau', 'Sineu'],
  ['Puerto Pollensa', 'Port de Pollença'], ['Puerto de Pollensa', 'Port de Pollença'],
  ['Puerto de Sóller', 'Port de Sóller'], ['Puerto Soller', 'Port de Sóller'],
  ['Puerto de Andratx', "Port d'Andratx"], ['Puerto Andratx', "Port d'Andratx"],
  ['Puerto de Alcúdia', "Port d'Alcúdia"], ['Puerto Alcudia', "Port d'Alcúdia"],
  ['Playa de Muro', 'Platja de Muro'], ['Playa de Palma', 'Platja de Palma'],
  ['Playa de Formentor', 'Platja de Formentor'], ["Playa d'Alcúdia", "Platja d'Alcúdia"],
  ['Santa Ponsa', 'Santa Ponça'], ['Illetas', 'Illetes'], ['Colonia de Sant Jordi', 'Colònia de Sant Jordi'],
  ['Colonia Sant Jordi', 'Colònia de Sant Jordi'], ['Cala Romantica', 'Cala Romàntica'],
  ['Cala Mondrago', 'Cala Mondragó'], ["S'Aramador", "s'Amarador"], ['Tramontana', 'Tramuntana'], ['Cuevas del Drach', 'Coves del Drac'], ['Cuevas dels Hams', 'Coves dels Hams'],
  ['Cuevas de Artà', "Coves d'Artà"],
  ['Portal Vells', 'Portals Vells'], ['Coves del Drach', 'Coves del Drac'], ['Paguera', 'Peguera'],
  ['Deya', 'Deià'], ['Bendinant', 'Bendinat'], ['Calvia', 'Calvià'], ['Alaro', 'Alaró'], ['Montuiri', 'Montuïri'], ['Sant Joan de Deu', 'Sant Joan de Déu'],
];

/** Ord som ska bytas mot svenska (eller skrivas annorlunda): [regex, förslag]. */
const WORDS = [
  [/insider-tips/i, 'insidertips (ett ord, liten bokstav)'],
  [/(?<!\p{L})Insidertips/u, 'insidertips (liten bokstav mitt i mening)', 'midSentence'],
  [/(?<!\p{L})(must-see|must see|hidden gems?|highlights?|vibes?|hotspots?|rooftop|fine dining|day ?trip|roadtrip|dagstrip|sightseeing-tur|feel ?good|all inclusive-känsla|chilla|chillig|hangout|beach ?club|foodie|takeaway)(?!\p{L})/iu, 'svenskt ord'],
  [/(?<!\p{L})(Blåflagg-|blåflagg-)/u, 'Blå flagg / blåflaggad'],
  [/(?<!\p{L})(UNESCO)/u, 'Unesco'],
  [/(?<!\p{L})(ok\.|OK\.?)(?!\p{L})/u, 'okej/bra'],
];

const MONTHS = 'Januari|Februari|Mars|April|Maj|Juni|Juli|Augusti|September|Oktober|November|December|Måndag|Tisdag|Onsdag|Torsdag|Fredag|Lördag|Söndag';

/** Regler för tecken och format. */
const RULES = [
  [/\S {2,}\S/, 'dubbla mellanslag'],
  [/(?<=\p{L}|\d|\)) +[,.;:!?](?=\s|$)/u, 'mellanslag före skiljetecken'],
  [/\d°C|\d° C|° C|\d°(?=$|[,.)–]|\s(?![NSEWÖV](?!\p{L})))/u, 'grader skrivs "25 °C"'],
  [/\d+\.\d{1,2} ?€|€ ?\d+\.\d{2}(?!\d)/, 'decimalkomma i eurobelopp (2,50 €)'],
  [/\d€|€\d/, 'mellanslag mellan belopp och € (8 €)'],
  [/\d(?:km|m|min|cm|mm|kg|h)(?!\p{L}|\d|²)/u, 'mellanslag mellan tal och enhet (12 km)'],
  [/(?<!\p{L})kl (?=\d)/u, 'kl. med punkt'],
  [/(?<!\p{L})ca\.(?=\s)/u, '"ca" utan punkt'],
  [/(?<!\p{L})(t\.ex(?!\.)|t ex|tex\.|bl a|bl\.a(?!\.)|p g a|pga\.)(?!\p{L})/u, 'förkortningen skrivs t.ex., bl.a., p.g.a.'],
  [/—/, 'tankstreck (–), inte långt streck (—)'],
  [/(?<=\d) ?- ?(?=\d+ ?(?:°C|€|km|m|min|år|dagar|timmar|tim|kr)(?!\p{L}))/u, 'intervall skrivs med tankstreck (10–12)'],
  [/(?<![=\\])"|&quot;|“/, 'citattecken skrivs ”…”'],
  [new RegExp(`(?:\\d|\\p{Ll}|–) +(${MONTHS})(?!\\p{L})`, 'u'), 'månader och veckodagar med liten bokstav'],
  [/\p{Emoji_Presentation}/u, 'inga emojis'],
  [/!{2,}|\?{2,}/, 'upprepade skiljetecken'],
];

const problems = [];

function walkDir(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkDir(p));
    else if (/\.(tsx?|mjs)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) out.push(p);
  }
  return out;
}

const looksTechnical = (s) =>
  // Korta värden som börjar med en siffra ("40m", "8€", "kl 9") är text – utom rena tal och datum.
  /^\d/.test(s.trim()) && !/^[\d\s.,:\-+/T]+$/.test(s.trim()) ? false :
  !/\s/.test(s.trim()) && /[+=/]/.test(s) ||
  !/\s/.test(s.trim()) && /^[\w\-./:?=&#%@+~,()[\]{}|*!$';]*$/.test(s.trim()) && !/[A-ZÅÄÖ]/.test(s.trim()[0] ?? '')
  || /^(https?:|mailto:|tel:|\/|#|\.\/|@\/)/.test(s.trim())
  || /^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(s.trim())
  || /^\s*(?:[\w-]+:\s*[^;]+;\s*)+$/.test(s); // inline-CSS

function propName(node) {
  const n = node.name;
  if (!n) return undefined;
  if (ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isPrivateIdentifier?.(n)) return n.text;
  return undefined;
}

/** Är objektet en källa/länk till en extern sajt? Då får texterna i det stå på originalspråk. */
function isExternalLinkObject(obj) {
  if (!obj || !ts.isObjectLiteralExpression(obj)) return false;
  return obj.properties.some((p) =>
    ts.isPropertyAssignment(p) && ['href', 'url'].includes(propName(p)) &&
    (ts.isStringLiteralLike(p.initializer)) && /^https?:/.test(p.initializer.text));
}

function check(text, file, sf, pos, kind) {
  const lineNo = sf.getLineAndCharacterOfPosition(pos).line;
  const lineText = sf.text.split('\n')[lineNo] ?? '';
  if (/proof-ignore/.test(lineText)) return;
  const report = (msg, match) => problems.push({ file, line: lineNo + 1, msg, excerpt: excerpt(text, match) });

  const nameText = PROPER_NAMES.reduce((t, n) => t.split(n).join(''), text);
  for (const [wrong, right] of NAMES) {
    const re = new RegExp(`(?<!${L}|[-/_.])${wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!${L}|[-/_.]\\w)`, 'u');
    const reCompound = new RegExp(`(?<!${L}|[-/_.])${wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=(?:s|bukten|halvön|dalen|bergen|vägen)?(?!${L}))`, 'u');
    const m = nameText.match(re) || nameText.match(reCompound);
    if (m) report(`ortnamn: "${wrong}" ska vara "${right}"`, m);
  }
  for (const [re, msg, mode] of WORDS) {
    const m = text.match(re);
    if (!m) continue;
    if (mode === 'midSentence') {
      const before = text.slice(0, m.index).trimEnd();
      if (before === '' || /[.!?:–]$/.test(before)) continue;
    }
    report(`ord: "${m[0]}" → ${msg}`, m);
  }
  for (const [re, msg] of RULES) {
    if (kind === 'jsx' && msg === 'dubbla mellanslag') continue; // JSX-text slås ihop av React
    // HTML-/CSS-attribut i mallsträngar (style="…", [data-x="…"]) är inte citat.
    const t = msg.startsWith('citattecken') ? text.replace(/[\w-]+="[^"]*"/g, '') : text;
    const m = t.match(re);
    if (m) report(msg, m);
  }
}

function excerpt(text, m) {
  const i = m?.index ?? 0;
  return text.slice(Math.max(0, i - 30), i + 40).replace(/\s+/g, ' ');
}

function visit(node, file, sf) {
  // Hoppa över hela deklarationer som aldrig är synlig text.
  if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isRegularExpressionLiteral(node)) return;
  if (ts.isCallExpression(node)) {
    const callee = node.expression.getText(sf);
    if (/^(require|import|console\.\w+|fetch|new URL|URL|encodeURIComponent|redirect|notFound|permanentRedirect|RegExp|Intl\.\w+|document\.\w+|window\.\w+|\w+\.(startsWith|endsWith|includes|split|replace|replaceAll|match|test|join|toLocaleDateString|toLocaleString|getElementById|querySelector|querySelectorAll|setAttribute|getAttribute|addEventListener|removeEventListener|setItem|getItem|removeItem|padStart|localeCompare|indexOf|searchParams\.\w+))$/.test(callee)) {
      // Argumenten till dessa anrop är tekniska, men titta ändå på ev. arrow-funktioner.
      node.arguments.forEach((a) => { if (ts.isFunctionLike(a)) ts.forEachChild(a, (c) => visit(c, file, sf)); });
      return;
    }
  }
  if (ts.isJsxAttribute(node)) {
    const name = node.name.getText(sf);
    if (!TEXT_ATTRS.has(name) && !/^aria-/.test(name)) {
      // Uttryck i andra attribut kan innehålla text (t.ex. {`…`}) – gå bara ner i uttryck, inte i literaler.
      if (node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression &&
        !ts.isStringLiteralLike(node.initializer.expression)) {
        if (!['className', 'href', 'src', 'srcSet', 'style', 'key', 'id', 'sizes', 'rel', 'target'].includes(name)) visit(node.initializer.expression, file, sf);
      }
      return;
    }
  }
  if (ts.isPropertyAssignment(node)) {
    const key = propName(node);
    if (key && TECHNICAL_KEYS.has(key)) return;
    if (isExternalLinkObject(node.parent) && ['label', 'title', 'name', 'text', 'source', 'publisher'].includes(key)) return;
    visit(node.initializer, file, sf);
    return;
  }
  if (ts.isNewExpression(node) && /Error$/.test(node.expression.getText(sf))) return; // felmeddelanden för utvecklare
  if (ts.isThrowStatement(node)) return;
  if (ts.isElementAccessExpression(node)) { visit(node.expression, file, sf); return; }
  if (ts.isBinaryExpression(node) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.InKeyword].includes(node.operatorToken.kind)) return;
  if (ts.isCaseClause(node)) { node.statements.forEach((s) => visit(s, file, sf)); return; }
  if (ts.isTypeNode(node) && !ts.isFunctionLike(node)) return;
  if (ts.isJsxText(node)) {
    const t = node.text.replace(/\s*\n\s*/g, ' ');
    if (t.trim()) check(t, file, sf, node.getStart(sf), 'jsx');
    return;
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    const parent = node.parent;
    if (parent && (ts.isPropertyAssignment(parent) && parent.name === node)) return;
    if (parent && ts.isLiteralTypeNode(parent)) return;
    if (!looksTechnical(node.text)) check(node.text, file, sf, node.getStart(sf), 'str');
    return;
  }
  if (ts.isTemplateExpression(node)) {
    const parts = [node.head.text, ...node.templateSpans.map((s) => s.literal.text)];
    const joined = parts.join('{x}');
    if (!looksTechnical(joined.replace(/\{x\}/g, ''))) check(joined, file, sf, node.getStart(sf), 'str');
    node.templateSpans.forEach((s) => visit(s.expression, file, sf));
    return;
  }
  ts.forEachChild(node, (c) => visit(c, file, sf));
}

const files = DIRS.flatMap((d) => (fs.existsSync(path.join(ROOT, d)) ? walkDir(path.join(ROOT, d)) : []));
for (const abs of files) {
  const file = path.relative(ROOT, abs);
  const src = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  visit(sf, file, sf);
}

if (problems.length) {
  for (const p of problems) console.log(`${p.file}:${p.line}  ${p.msg}\n    …${p.excerpt}…`);
  console.log(`\n${problems.length} träffar i ${new Set(problems.map((p) => p.file)).size} filer. Se docs/stilguide.md.`);
  process.exit(1);
}
console.log(`Korrektur: 0 träffar i ${files.length} filer.`);
