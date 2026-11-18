// Veckomarknader på Mallorca – används av /marknader och av resekalendern på /evenemang.
//
// Dag och ort är kontrollerade 2026-11-18 mot källan i `källa`. Tiderna skiljer sig
// något mellan källorna, därför anges de bara ungefärligt ("ca 8–13"). Lägg bara
// till en marknad när dagen går att belägga – hellre en kortare lista än en gissad.

export type Veckodag = 1 | 2 | 3 | 4 | 5 | 6 | 7; // ISO: 1 = måndag … 7 = söndag

export type Källa = { label: string; href: string };

export type Marknad = {
  id: string;
  ort: string;
  /** Kort lägesbeskrivning, t.ex. "Nordost" – används för gruppering och sökning. */
  område: 'Norr' | 'Nordost' | 'Öst' | 'Syd' | 'Inlandet' | 'Nordväst' | 'Väst';
  dagar: Veckodag[];
  tid: string;
  vad: string;
  tips?: string;
  källa: Källa;
  checked: string;
};

export const VECKODAGAR: { nr: Veckodag; namn: string; plural: string }[] = [
  { nr: 1, namn: 'måndag', plural: 'Måndagar' },
  { nr: 2, namn: 'tisdag', plural: 'Tisdagar' },
  { nr: 3, namn: 'onsdag', plural: 'Onsdagar' },
  { nr: 4, namn: 'torsdag', plural: 'Torsdagar' },
  { nr: 5, namn: 'fredag', plural: 'Fredagar' },
  { nr: 6, namn: 'lördag', plural: 'Lördagar' },
  { nr: 7, namn: 'söndag', plural: 'Söndagar' },
];

const CHECKED = '2026-11-18';

export const marknader: Marknad[] = [
  {
    id: 'manacor',
    ort: 'Manacor',
    område: 'Öst',
    dagar: [1],
    tid: 'förmiddag, ca 8–13',
    vad: 'Klassisk stadsmarknad med frukt, grönt och vardagsvaror.',
    tips: 'En av få marknader på måndagar – passar bra om du bor på östkusten.',
    källa: { label: 'mallorca.com: Manacor', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-manacor' },
    checked: CHECKED,
  },
  {
    id: 'arta',
    ort: 'Artà',
    område: 'Nordost',
    dagar: [2],
    tid: 'förmiddag, ca 8–13',
    vad: 'Färska råvaror och lokala produkter, och längre ut kläder, blommor, smycken och hantverk.',
    tips: 'Kom tidigt – det blir trångt framåt förmiddagen under sommaren.',
    källa: { label: 'mallorca.com: Artà', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-arta' },
    checked: CHECKED,
  },
  {
    id: 'alcudia',
    ort: 'Alcúdia',
    område: 'Norr',
    dagar: [2, 7],
    tid: 'förmiddag, ca 8–13.30',
    vad: 'Stor marknad vid stadsmuren i gamla stan med mat, kläder, väskor och souvenirer.',
    tips: 'Kombinera med en promenad på stadsmuren och i den gamla stadskärnan.',
    källa: { label: 'mallorca.com: Alcúdia', href: 'https://www.mallorca.com/ca/directori/empresa/mercadillo-de-alcudia-alcudia-d9yqi-ug' },
    checked: CHECKED,
  },
  {
    id: 'sineu',
    ort: 'Sineu',
    område: 'Inlandet',
    dagar: [3],
    tid: 'förmiddag, ca 8–13',
    vad: 'Mallorcas mest kända marknad, med anor från 1300-talet. Mat, hantverk, kläder och en del med levande djur.',
    tips: 'En gång om året, i maj, hålls den mycket större årsmässan Fira de Sineu – se evenemangen.',
    källa: { label: 'mallorca.com: Sineu', href: 'https://www.mallorca.com/en/agenda/mercats/wochenmarkt-sineu' },
    checked: CHECKED,
  },
  {
    id: 'santanyi',
    ort: 'Santanyí',
    område: 'Syd',
    dagar: [3, 6],
    tid: 'förmiddag, ca 8–14',
    vad: 'Stånd längs huvudgatorna och runt kyrkan och torget: frukt, ost, korv, keramik och textil.',
    tips: 'Kommunen har begränsat biltrafiken in till byn på marknadsdagar – parkera i utkanten och gå in.',
    källa: { label: 'Última Hora: Santanyí på marknadsdagar', href: 'https://www.ultimahora.es/noticias/part-forana/2019/07/10/1093333/santanyi-limita-acceso-vehiculos-para-evitar-colapsos-dia-mercado.html' },
    checked: CHECKED,
  },
  {
    id: 'port-de-pollenca',
    ort: 'Port de Pollença',
    område: 'Norr',
    dagar: [3],
    tid: 'förmiddag, ca 8–13',
    vad: 'Semestermarknad med kläder, smycken och souvenirer och en del frukt och grönt.',
    källa: { label: 'mallorca.com: Port de Pollença', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-port-de-pollenca' },
    checked: CHECKED,
  },
  {
    id: 'andratx',
    ort: 'Andratx',
    område: 'Väst',
    dagar: [3],
    tid: 'förmiddag, ca 8–13',
    vad: 'Byns veckomarknad med frukt, grönt, kläder och husgeråd.',
    källa: { label: 'mallorca.com: Andratx', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-andratx' },
    checked: CHECKED,
  },
  {
    id: 'capdepera',
    ort: 'Capdepera',
    område: 'Nordost',
    dagar: [3],
    tid: 'förmiddag, ca 8–13',
    vad: 'Liten och lokal marknad i byn ovanför Cala Rajada.',
    källa: { label: 'mallorca.com: Capdepera', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-capdepera' },
    checked: CHECKED,
  },
  {
    id: 'inca',
    ort: 'Inca',
    område: 'Inlandet',
    dagar: [4],
    tid: 'förmiddag, ca 8–13',
    vad: 'Öns största veckomarknad. Inca är känt för läder, så här finns gott om skor, väskor och jackor, men också mat och kläder.',
    tips: 'Infaller torsdagen på juldagen eller nyårsdagen hålls marknaden på onsdagen i stället.',
    källa: { label: 'Ajuntament d’Inca', href: 'https://incaciutat.com/wp-content/uploads/Pla-de-treball-per-a-la-modernitzaci%C3%B3-del-mercat-dels-dijous-dInca.pdf' },
    checked: CHECKED,
  },
  {
    id: 'campos',
    ort: 'Campos',
    område: 'Syd',
    dagar: [4],
    tid: 'förmiddag, ca 8–13',
    vad: 'Lokal marknad med frukt, grönt och vardagsvaror.',
    tips: 'Ligger nära stränderna i söder – passar en torsdag före en eftermiddag vid Es Trenc.',
    källa: { label: 'mallorca.com: Campos', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-campos' },
    checked: CHECKED,
  },
  {
    id: 'ses-salines',
    ort: 'Ses Salines',
    område: 'Syd',
    dagar: [4],
    tid: 'förmiddag, ca 8–13',
    vad: 'Liten marknad mest för ortsborna, med fokus på frukt och grönt.',
    källa: { label: 'mallorca.com: Ses Salines', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-ses-salines' },
    checked: CHECKED,
  },
  {
    id: 'soller',
    ort: 'Sóller',
    område: 'Nordväst',
    dagar: [6],
    tid: 'förmiddag, ca 8–13.30',
    vad: 'Marknad på Plaça de la Constitució och gatorna runt saluhallen: apelsiner, oliver, ost, hantverk.',
    källa: { label: 'mallorca.com: Sóller', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-soller' },
    checked: CHECKED,
  },
  {
    id: 'pollenca',
    ort: 'Pollença',
    område: 'Norr',
    dagar: [7],
    tid: 'förmiddag, ca 8–13.30',
    vad: 'Stor söndagsmarknad på Plaça Major och i gränderna runt omkring: mat, blommor, hantverk och kläder.',
    källa: { label: 'mallorca.com: Pollença', href: 'https://www.mallorca.com/ca/directori/empresa/wochenmarkt-pollenca-pollenca-akomf9yq' },
    checked: CHECKED,
  },
  {
    id: 'felanitx',
    ort: 'Felanitx',
    område: 'Syd',
    dagar: [7],
    tid: 'förmiddag, ca 8–13',
    vad: 'Stor och folklig söndagsmarknad runt kyrkan Sant Miquel med mat, kryddor och hantverk.',
    tips: 'Bästa utbudet finns tidigt på morgonen.',
    källa: { label: 'mallorca.com: Felanitx', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-felanitx' },
    checked: CHECKED,
  },
  {
    id: 'santa-maria',
    ort: 'Santa Maria del Camí',
    område: 'Inlandet',
    dagar: [7],
    tid: 'förmiddag, ca 8–13',
    vad: 'Populär söndagsmarknad med lokala råvaror, ost, korv, bröd och hantverk.',
    tips: 'Ligger nära vinbyarna kring Binissalem – passar ihop med ett vingårdsbesök.',
    källa: { label: 'mallorca.com: Santa Maria del Camí', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-santa-maria' },
    checked: CHECKED,
  },
  {
    id: 'sa-pobla',
    ort: 'Sa Pobla',
    område: 'Norr',
    dagar: [7],
    tid: 'förmiddag',
    vad: 'Söndagsmarknad med frukt och grönt från traktens odlingar, och mer därtill.',
    källa: { label: 'mallorca.com: Sa Pobla', href: 'https://www.mallorca.com/en/directory/business/mercat-de-diumenge-fresh-fruit-and-vegetables-and-more-sa-pobla-wetda-hq' },
    checked: CHECKED,
  },
];

/** ISO-veckodag (1 = måndag … 7 = söndag) för ett datum ÅÅÅÅ-MM-DD. */
export function veckodag(iso: string): Veckodag {
  const d = new Date(`${iso}T12:00:00Z`).getUTCDay();
  return (d === 0 ? 7 : d) as Veckodag;
}

export function marknaderPåDag(dag: Veckodag): Marknad[] {
  return marknader.filter(m => m.dagar.includes(dag));
}

/** Källor för LastChecked på /marknader. */
export const MARKNADSKÄLLOR: Källa[] = [
  { label: 'mallorca.com: veckomarknader', href: 'https://www.mallorca.com/ca/agenda/mercats' },
  { label: 'Ajuntament d’Inca', href: 'https://incaciutat.com' },
  { label: 'Visit Palma: veckomarknader', href: 'https://visitpalma.com/es/dir-cat/mercados/mercados-semanales/' },
];
