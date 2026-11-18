// Evenemangsdata för /evenemang, resekalendern och startsidans "Kommande evenemang".
//
// Varje evenemang har en officiell eller pålitlig källa (`källa`), ett datum för när
// uppgifterna kontrollerades (`checked`) och ett eller flera tillfällen med ISO-datum.
// Ett tillfälle har en av tre statusar:
//   - 'publicerat'  arrangören (eller flera samstämmiga källor) har publicerat datumet,
//   - 'fast'        datumet följer en fast regel eller tradition (t.ex. 16–17 januari varje år),
//   - 'preliminärt' datumet är inte publicerat – `period` beskriver ungefär när och
//                   start/slut är ett ungefärligt fönster som bara används för sortering
//                   och för att visa evenemanget i resekalendern med en tydlig markering.
// Hitta aldrig på datum. Uppdatera `checked` när ett evenemang kontrolleras på nytt.

export type Kategori = 'Sport' | 'Musik' | 'Kultur' | 'Mat & dryck' | 'Marknad' | 'Familj';
export type Status = 'publicerat' | 'fast' | 'preliminärt';
export type Källa = { label: string; href: string };

type Tillfälle = {
  start: string;
  slut: string;
  status: Status;
  /** Ungefärlig period i klartext, krävs för preliminära tillfällen ("slutet av april 2027"). */
  period?: string;
  /** Kort notis som gäller just det här tillfället. */
  not?: string;
};

type EvenemangPost = {
  id: string;
  namn: string;
  plats: string;
  kategori: Kategori;
  beskrivning: string;
  källa: Källa;
  checked: string;
  tillfällen: Tillfälle[];
};

/** Ett visningsbart tillfälle – serialiserbart så att det kan skickas till klientkomponenter. */
export type Evenemang = {
  key: string;
  id: string;
  namn: string;
  plats: string;
  kategori: Kategori;
  beskrivning: string;
  källa: Källa;
  checked: string;
  start: string;
  slut: string;
  status: Status;
  /** Visningstext för datumet, t.ex. "16–17 januari 2027" eller "slutet av april 2027". */
  datum: string;
  not?: string;
  /** Sökväg till kalenderfilen (.ics) – bara för tillfällen med känt datum. */
  ics?: string;
};

export const KATEGORIER: Kategori[] = ['Sport', 'Musik', 'Kultur', 'Mat & dryck', 'Marknad', 'Familj'];

export const STATUSTEXT: Record<Status, string> = {
  publicerat: 'Datum publicerat',
  fast: 'Fast datum',
  preliminärt: 'Preliminärt',
};

const C = '2026-11-18';

const evenemangData: EvenemangPost[] = [
  // ── Höst och vinter 2026–2027 ──
  {
    id: 'dijous-bo',
    namn: 'Dijous Bo',
    plats: 'Inca',
    kategori: 'Marknad',
    beskrivning: 'Mallorcas mest kända mässa. Hela Inca fylls av stånd och folk, och festen börjar redan kvällen före med Dimecres Bo.',
    källa: { label: 'Ajuntament d’Inca', href: 'https://incaciutat.com' },
    checked: C,
    tillfällen: [
      { start: '2026-11-19', slut: '2026-11-19', status: 'publicerat' },
      { start: '2027-11-11', slut: '2027-11-25', status: 'preliminärt', period: 'mitten av november 2027' },
    ],
  },
  {
    id: 'fira-de-soliva',
    namn: 'Fira de s’Oliva',
    plats: 'Caimari (Selva)',
    kategori: 'Mat & dryck',
    beskrivning: 'Olivfest i bergsbyn Caimari i Serra de Tramuntana, med olivolja, oliver, lokal mat och gamla traditioner. Hålls tredje helgen i november.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://illesbalears.travel/en/mallorca/events-fira-de-loliva-de-caimari' },
    checked: C,
    tillfällen: [
      { start: '2026-11-21', slut: '2026-11-22', status: 'publicerat' },
      { start: '2027-11-20', slut: '2027-11-21', status: 'preliminärt', period: 'tredje helgen i november 2027' },
    ],
  },
  {
    id: 'fira-de-mancor',
    namn: 'Biniarrels – Sa Fira de Mancor',
    plats: 'Mancor de la Vall',
    kategori: 'Mat & dryck',
    beskrivning: 'Höstmässa kring svamp och bergen i Mancor de la Vall. Hette tidigare Fira de l’Esclata-Sang, efter den svamp som plockas i bergen på hösten.',
    källa: { label: 'mallorca.com: mässan 2026', href: 'https://www.mallorca.com/en/events/fira-de-lesclata-sang-i-de-la-muntanya-mancor-de-la-vall-2026-e52f1c' },
    checked: C,
    tillfällen: [
      { start: '2026-11-20', slut: '2026-11-30', status: 'preliminärt', period: 'slutet av november 2026' },
    ],
  },
  {
    id: 'julmarknad-palma',
    namn: 'Julmarknaden i Palma',
    plats: 'Palma',
    kategori: 'Marknad',
    beskrivning: 'Julmarknad med stånd på Plaça Major och fler platser i centrum. Förra säsongen pågick den från slutet av november till 7 januari.',
    källa: { label: 'Mallorcadiario: julmarknaden 2025–2026', href: 'https://www.mallorcadiario.com/cort-adelanta-esta-ano-el-mercadillo-de-navidad-al-23-de-noviembre' },
    checked: C,
    tillfällen: [
      { start: '2026-11-23', slut: '2027-01-07', status: 'preliminärt', period: 'slutet av november 2026 – början av januari 2027' },
    ],
  },
  {
    id: 'festa-de-lestendard',
    namn: 'Festa de l’Estendard',
    plats: 'Palma',
    kategori: 'Kultur',
    beskrivning: 'Palmas fest till minne av Jaume I:s intåg i staden 31 december 1229. Fanan hissas på Plaça de Cort och bärs i procession till katedralen La Seu.',
    källa: { label: 'Visit Palma', href: 'https://visitpalma.com/en/event/fiesta-de-lestendard/' },
    checked: C,
    tillfällen: [
      { start: '2026-12-31', slut: '2026-12-31', status: 'fast' },
      { start: '2027-12-31', slut: '2027-12-31', status: 'fast' },
    ],
  },
  {
    id: 'cavalcada-dels-reis',
    namn: 'Cavalcada dels Reis',
    plats: 'Palma',
    kategori: 'Familj',
    beskrivning: 'De tre vise männen kommer med båt till Moll Vell i Palma kvällen den 5 januari och paraderar sedan genom staden. En stor kväll för barnen.',
    källa: { label: 'El Debate: kortegen i Palma 2026', href: 'https://www.eldebate.com/espana/baleares/20260105/reyes-magos-lucen-cabalgata-ambiciosa-hasta-fecha-palma_370837.html' },
    checked: C,
    tillfällen: [{ start: '2027-01-05', slut: '2027-01-05', status: 'fast' }],
  },
  {
    id: 'sant-antoni',
    namn: 'Sant Antoni',
    plats: 'Sa Pobla, Artà, Manacor m.fl.',
    kategori: 'Kultur',
    beskrivning: 'Vinterns stora eldfest till djurens skyddshelgon. Kvällen 16 januari tänds brasor (foguerons) och dansande djävlar (dimonis) drar genom gatorna, den 17 januari välsignas djuren. Störst i Sa Pobla, Artà och Manacor.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://www.illesbalears.travel/experience/en/mallorca/sant-antoni-and-sant-sebastia' },
    checked: C,
    tillfällen: [{ start: '2027-01-16', slut: '2027-01-17', status: 'fast' }],
  },
  {
    id: 'sant-sebastia',
    namn: 'Sant Sebastià',
    plats: 'Palma',
    kategori: 'Kultur',
    beskrivning: 'Palmas skyddshelgon firas 20 januari. Kvällen före, Revetla de Sant Sebastià, brukar bjuda på konserter på flera torg i gamla stan.',
    källa: { label: 'Visit Palma', href: 'https://visitpalma.com/ca/dir/festes-de-sant-sebastia/' },
    checked: C,
    tillfällen: [{ start: '2027-01-19', slut: '2027-01-20', status: 'fast', not: 'De officiella festligheterna 2026 ställdes in. Kontrollera programmet för 2027.' }],
  },
  {
    id: 'challenge-ciclista',
    namn: 'Challenge Ciclista Mallorca',
    plats: 'Hela ön',
    kategori: 'Sport',
    beskrivning: 'Proffscyklisterna inleder säsongen med flera endagslopp på Mallorcas vägar. Räkna med avstängda vägar när loppen passerar. Damloppet är planerat till 23 januari 2027.',
    källa: { label: 'mallorca.com: Challenge 2027', href: 'https://www.mallorca.com/en/events/challenge-ciclista-mallorca-femenina-2027-8ec6f8' },
    checked: C,
    tillfällen: [{ start: '2027-01-20', slut: '2027-02-07', status: 'preliminärt', period: 'slutet av januari 2027' }],
  },
  {
    id: 'sa-rua',
    namn: 'Sa Rua – karnevalen i Palma',
    plats: 'Palma',
    kategori: 'Familj',
    beskrivning: 'Palmas karnevalståg med utklädda grupper och vagnar en söndag före fastan. Barnens tåg, Sa Rueta, går söndagen innan.',
    källa: { label: 'Majorca Daily Bulletin: Sa Rua 2026', href: 'https://www.majorcadailybulletin.com/holiday/attractions/2026/02/12/140171/palma-carnival-spirit-rua-2026.html' },
    checked: C,
    tillfällen: [{ start: '2027-01-31', slut: '2027-02-14', status: 'preliminärt', period: 'början av februari 2027' }],
  },
  {
    id: 'fira-del-ram',
    namn: 'Fira del Ram',
    plats: 'Palma (Son Fusteret)',
    kategori: 'Familj',
    beskrivning: 'Mallorcas stora tivoli med karuseller, berg- och dalbana och sockervadd på mässområdet Son Fusteret, varje vår sedan 1948. År 2026 var det öppet från slutet av februari till mitten av april.',
    källa: { label: 'Visit Palma', href: 'https://visitpalma.com/en/event/fira-del-ram-palma-2026/' },
    checked: C,
    tillfällen: [{ start: '2027-02-20', slut: '2027-04-15', status: 'preliminärt', period: 'slutet av februari – april 2027' }],
  },
  {
    id: 'fira-del-fang',
    namn: 'Fira del Fang',
    plats: 'Marratxí (Sant Marçal)',
    kategori: 'Marknad',
    beskrivning: 'Keramikmässa i Sant Marçal i Marratxí med lergods och keramik från verkstäder runt om på Mallorca. År 2026 pågick den 5–15 mars.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://illesbalears.travel/en/mallorca/events-fira-del-fang-de-marratxi' },
    checked: C,
    tillfällen: [{ start: '2027-02-26', slut: '2027-03-15', status: 'preliminärt', period: 'början av mars 2027' }],
  },
  {
    id: 'setmana-santa',
    namn: 'Setmana Santa – påskveckan',
    plats: 'Palma och hela ön',
    kategori: 'Kultur',
    beskrivning: 'Påskveckan med processioner i Palma och i många byar, från palmsöndagen till påskdagen.',
    källa: { label: 'Visit Palma', href: 'https://visitpalma.com/en/' },
    checked: C,
    tillfällen: [{ start: '2027-03-21', slut: '2027-03-28', status: 'fast' }],
  },
  {
    id: 'princesa-sofia',
    namn: 'Trofeo Princesa Sofía',
    plats: 'Palma',
    kategori: 'Sport',
    beskrivning: 'Internationell regatta i de olympiska seglingsklasserna i Palmabukten.',
    källa: { label: 'Spain.info (officiell turistsajt)', href: 'https://spain.info/en/calendar/trofeo-princesa-sofia-sailing-regatta' },
    checked: C,
    tillfällen: [{ start: '2027-03-26', slut: '2027-04-03', status: 'preliminärt', period: '26 mars – 3 april 2027 (enligt seglingsförbund, ej bekräftat av arrangören)' }],
  },
  {
    id: 'mallorca-312',
    namn: 'Mallorca 312',
    plats: 'Playa de Muro',
    kategori: 'Sport',
    beskrivning: 'Motionslopp på cykel med start och mål i Playa de Muro och sträckor på 312, 225 och 167 km. Startplatserna för 2027 sålde slut på några minuter. Räkna med avstängda vägar under dagen.',
    källa: { label: 'Mallorca 312', href: 'https://www.mallorca312.com' },
    checked: C,
    tillfällen: [{ start: '2027-04-24', slut: '2027-04-25', status: 'preliminärt', period: 'lördag 24 april 2027 enligt de flesta källor' }],
  },
  {
    id: 'palmavela',
    namn: 'PalmaVela',
    plats: 'Palma',
    kategori: 'Sport',
    beskrivning: 'Seglingsvecka i Palmabukten som arrangeras av Real Club Náutico de Palma, med bland annat havskappseglingen La Larga. År 2026 pågick den 23 april–3 maj.',
    källa: { label: 'PalmaVela', href: 'https://www.palmavela.com' },
    checked: C,
    tillfällen: [{ start: '2027-04-20', slut: '2027-05-09', status: 'preliminärt', period: 'slutet av april – början av maj 2027' }],
  },
  {
    id: 'fira-de-sineu',
    namn: 'Fira de Sineu',
    plats: 'Sineu',
    kategori: 'Marknad',
    beskrivning: 'Sineus årliga stora mässa, betydligt större än den vanliga onsdagsmarknaden. Hålls traditionellt första onsdagen efter första söndagen i maj.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://illesbalears.travel/en/mallorca/events-fira-de-sineu' },
    checked: C,
    tillfällen: [{ start: '2027-05-05', slut: '2027-05-05', status: 'preliminärt', period: 'onsdag 5 maj 2027 enligt traditionen' }],
  },
  {
    id: 'ironman-703',
    namn: 'Ironman 70.3 Alcúdia-Mallorca',
    plats: 'Alcúdia',
    kategori: 'Sport',
    beskrivning: 'Triathlon på halvdistans: 1,9 km simning, 90 km cykling och 21,1 km löpning. Simstarten går från stranden i Port d’Alcúdia.',
    källa: { label: 'Ironman', href: 'https://www.ironman.com/races/im703-mallorca' },
    checked: C,
    tillfällen: [{ start: '2027-05-08', slut: '2027-05-08', status: 'publicerat' }],
  },
  {
    id: 'firo-soller',
    namn: 'Es Firó – Moros i Cristians',
    plats: 'Sóller',
    kategori: 'Kultur',
    beskrivning: 'Sóller återskapar segern över pirater som landsteg i hamnen 11 maj 1561, med högljudda strider mellan ”moros” och ”cristians”. Huvuddagen är andra måndagen i maj, festligheterna börjar några dagar innan.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://illesbalears.travel/en/mallorca/enjoy-the-acclaimed-es-firo-party-in-soller' },
    checked: C,
    tillfällen: [{ start: '2027-05-10', slut: '2027-05-10', status: 'fast' }],
  },
  {
    id: 'mallorca-live',
    namn: 'Mallorca Live Festival',
    plats: 'Calvià',
    kategori: 'Musik',
    beskrivning: 'Öns stora musikfestival med spanska och internationella artister. År 2027 är det tionde gången – programmet och biljettpriserna är inte släppta ännu.',
    källa: { label: 'Mallorca Live Festival', href: 'https://mallorcalivefestival.com' },
    checked: C,
    tillfällen: [{ start: '2027-06-11', slut: '2027-06-12', status: 'publicerat' }],
  },
  {
    id: 'nit-de-sant-joan',
    namn: 'Nit de Sant Joan – midsommarnatten',
    plats: 'Palma och hela ön',
    kategori: 'Kultur',
    beskrivning: 'Midsommarnatten firas med brasa, correfoc (eldparad med djävlar och trummor), folkdans och konsert i Parc de la Mar nedanför katedralen i Palma, och med fester på stränder och torg runt ön.',
    källa: { label: 'Mallorca Global Mag: programmet 2026', href: 'https://mallorcaglobalmag.es/nit-sant-joan-2026-palma/' },
    checked: C,
    tillfällen: [{ start: '2027-06-23', slut: '2027-06-23', status: 'fast' }],
  },
  {
    id: 'sant-jaume-alcudia',
    namn: 'Festes de Sant Jaume',
    plats: 'Alcúdia',
    kategori: 'Kultur',
    beskrivning: 'Alcúdias stadsfest med en veckas program i gamla stan. Huvuddagen 25 juli bjuder på mässa, procession, konsert och fyrverkerier.',
    källa: { label: 'Ajuntament d’Alcúdia', href: 'https://www.alcudia.net' },
    checked: C,
    tillfällen: [{ start: '2027-07-25', slut: '2027-07-25', status: 'fast' }],
  },
  {
    id: 'festival-pollenca',
    namn: 'Festival de Pollença',
    plats: 'Pollença',
    kategori: 'Musik',
    beskrivning: 'Anrik sommarfestival med främst klassisk musik i klostret Sant Domingo i Pollença, som har hållits sedan början av 1960-talet.',
    källa: { label: 'Festival de Pollença', href: 'https://festivalpollenca.com' },
    checked: C,
    tillfällen: [{ start: '2027-07-01', slut: '2027-08-31', status: 'preliminärt', period: 'juli–augusti 2027' }],
  },
  {
    id: 'copa-del-rey',
    namn: 'Copa del Rey MAPFRE',
    plats: 'Palma',
    kategori: 'Sport',
    beskrivning: 'En av Medelhavets mest kända kappseglingar, arrangerad av Real Club Náutico de Palma i Palmabukten.',
    källa: { label: 'Copa del Rey MAPFRE', href: 'https://www.regatacopadelrey.com' },
    checked: C,
    tillfällen: [{ start: '2027-07-31', slut: '2027-08-07', status: 'preliminärt', period: '31 juli – 7 augusti 2027 (en källa, ej bekräftat av arrangören)' }],
  },
  {
    id: 'moros-pollenca',
    namn: 'Moros i Cristians i Pollença',
    plats: 'Pollença',
    kategori: 'Kultur',
    beskrivning: 'Höjdpunkten i Festes de la Patrona: på kvällen 2 augusti återskapas försvaret mot piraten Dragut 1550 i en högljudd strid genom byn.',
    källa: { label: 'Illes Balears (officiell turistsajt)', href: 'https://illesbalears.travel/en/mallorca/mallorca-re-enacts-the-most-popular-battles-of-the-moors-and-christians' },
    checked: C,
    tillfällen: [{ start: '2027-08-02', slut: '2027-08-02', status: 'fast' }],
  },
  {
    id: 'festival-chopin',
    namn: 'Festival Internacional Chopin',
    plats: 'Valldemossa',
    kategori: 'Musik',
    beskrivning: 'Pianokonserter kring Chopin och hans tid i Valldemossa, bland annat i kartusianklostret.',
    källa: { label: 'Majorca Daily Bulletin: festivalen 2026', href: 'https://www.majorcadailybulletin.com/news/local/2026/09/07/145441/pianist-kevin-kenner-mastery-comes-the-2026-chopin-festival.html' },
    checked: C,
    tillfällen: [{ start: '2027-08-01', slut: '2027-08-31', status: 'preliminärt', period: 'augusti 2027' }],
  },
  {
    id: 'festival-deia',
    namn: 'Festival Internacional de Música de Deià',
    plats: 'Deià',
    kategori: 'Musik',
    beskrivning: 'Klassiska konserter under sommaren, bland annat på herrgården Son Marroig med utsikt över havet.',
    källa: { label: 'mallorca.com: festivalen 2026', href: 'https://www.mallorca.com/es/eventos/xlviii-festival-internacional-de-musica-de-deia-deia-2026-faf22a' },
    checked: C,
    tillfällen: [{ start: '2027-06-01', slut: '2027-09-30', status: 'preliminärt', period: 'sommaren 2027' }],
  },
  {
    id: 'mare-de-deu-dagost',
    namn: 'Mare de Déu d’Agost',
    plats: 'Hela ön, bl.a. Campos och Sineu',
    kategori: 'Kultur',
    beskrivning: 'Jungfru Marie himmelsfärd 15 augusti är helgdag i hela Spanien. Många byar har sina sommarfester kring dagen, och i kyrkorna visas de utsmyckade ”llits de la Mare de Déu”.',
    källa: { label: 'Mallorcadiario', href: 'https://www.mallorcadiario.com/mallorca-celebra-mare-deu-agost-fiesta-8-siglos-historia' },
    checked: C,
    tillfällen: [{ start: '2027-08-15', slut: '2027-08-15', status: 'fast' }],
  },
  {
    id: 'fira-del-melo',
    namn: 'Festa i Fira del Meló',
    plats: 'Vilafranca de Bonany',
    kategori: 'Mat & dryck',
    beskrivning: 'Melonfest i jordbruksbyn Vilafranca de Bonany med tävling om öns största och tyngsta melon. Brukar hållas första helgen i september.',
    källa: { label: 'Mallorca Magazin', href: 'https://www.mallorcamagazin.com/veranstaltungen/feste-freizeit-events/melonenfest-vilafranca-bonany.html' },
    checked: C,
    tillfällen: [{ start: '2027-09-04', slut: '2027-09-05', status: 'preliminärt', period: 'första helgen i september 2027' }],
  },
  {
    id: 'festa-des-vermar',
    namn: 'Festa des Vermar',
    plats: 'Binissalem',
    kategori: 'Mat & dryck',
    beskrivning: 'Vinbyn Binissalem firar skörden under flera veckor i september. Sista helgen bjuder på druvtrampning, druvkrig, kvällsmiddag på gatan och parad.',
    källa: { label: 'Ajuntament de Binissalem: programmet 2026', href: 'https://www.ajbinissalem.net/wp-content/uploads/2026/09/Programa-Vermar-2026_web.pdf' },
    checked: C,
    tillfällen: [{ start: '2027-09-01', slut: '2027-09-30', status: 'preliminärt', period: 'september 2027' }],
  },
  {
    id: 'nit-de-lart',
    namn: 'Nit de l’Art',
    plats: 'Palma',
    kategori: 'Kultur',
    beskrivning: 'Galleriernas kväll: ett trettiotal gallerier och kulturhus i Palma har öppet på kvällen med fri entré. År 2026 hölls den 19 september.',
    källa: { label: 'Visit Palma', href: 'https://visitpalma.com/en/event/nit-de-lart-2026/' },
    checked: C,
    tillfällen: [{ start: '2027-09-10', slut: '2027-09-26', status: 'preliminärt', period: 'september 2027' }],
  },
  {
    id: 'palma-marathon',
    namn: 'Palma Marathon Mallorca',
    plats: 'Palma',
    kategori: 'Sport',
    beskrivning: 'Maraton, halvmaraton och 10 km med start vid katedralen i Parc de la Mar.',
    källa: { label: 'TUI Palma Marathon', href: 'https://tui-mml.com/palma-marathon/' },
    checked: C,
    tillfällen: [{ start: '2027-10-17', slut: '2027-10-17', status: 'publicerat' }],
  },
];

const MÅNADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

function delar(iso: string) {
  const [å, m, d] = iso.split('-').map(Number);
  return { å, m, d };
}

/** "19 november 2026", "16–17 januari 2027", "31 juli–7 augusti 2027", "23 november 2026–7 januari 2027". */
export function formateraPeriod(start: string, slut: string): string {
  const a = delar(start);
  const b = delar(slut);
  if (start === slut) return `${a.d} ${MÅNADER[a.m - 1]} ${a.å}`;
  if (a.å !== b.å) return `${a.d} ${MÅNADER[a.m - 1]} ${a.å}–${b.d} ${MÅNADER[b.m - 1]} ${b.å}`;
  if (a.m !== b.m) return `${a.d} ${MÅNADER[a.m - 1]}–${b.d} ${MÅNADER[b.m - 1]} ${b.å}`;
  return `${a.d}–${b.d} ${MÅNADER[a.m - 1]} ${a.å}`;
}

/** Dagens datum på Mallorca som YYYY-MM-DD. */
export function idagPåMallorca(nu: Date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(nu);
}

function tillfälleKey(e: EvenemangPost, t: Tillfälle) {
  return `${e.id}-${t.start.slice(0, 4)}`;
}

/** Alla tillfällen, sorterade efter startdatum. */
export function allaEvenemang(): Evenemang[] {
  const lista: Evenemang[] = [];
  for (const e of evenemangData) {
    for (const t of e.tillfällen) {
      const key = tillfälleKey(e, t);
      lista.push({
        key,
        id: e.id,
        namn: e.namn,
        plats: e.plats,
        kategori: e.kategori,
        beskrivning: e.beskrivning,
        källa: e.källa,
        checked: e.checked,
        start: t.start,
        slut: t.slut,
        status: t.status,
        datum: t.status === 'preliminärt' ? (t.period ?? formateraPeriod(t.start, t.slut)) : formateraPeriod(t.start, t.slut),
        not: t.not,
        ics: t.status === 'preliminärt' ? undefined : `/evenemang/kalender/${key}.ics`,
      });
    }
  }
  return lista.sort((a, b) => a.start.localeCompare(b.start) || a.namn.localeCompare(b.namn, 'sv'));
}

/** Tillfällen som pågår eller ligger framåt i tiden, sorterade efter datum. */
export function kommandeEvenemang(idag: string = idagPåMallorca()): Evenemang[] {
  return allaEvenemang().filter(e => e.slut >= idag);
}

/** Tillfällen med känt datum – underlag för kalenderfilerna (.ics). */
export function evenemangMedKalenderfil(): Evenemang[] {
  return allaEvenemang().filter(e => e.ics);
}

/** Rullande årsintervall för rubriker, t.ex. "2026–2027". */
export function årsintervall(idag: string = idagPåMallorca()): string {
  const år = Number(idag.slice(0, 4));
  return `${år}–${år + 1}`;
}

/** De viktigaste källorna för LastChecked på /evenemang. */
export const EVENEMANGSKÄLLOR: Källa[] = [
  { label: 'Illes Balears (Govern de les Illes Balears)', href: 'https://illesbalears.travel/en/mallorca' },
  { label: 'Visit Palma', href: 'https://visitpalma.com/en/' },
  { label: 'Ajuntament d’Inca', href: 'https://incaciutat.com' },
  { label: 'Ajuntament d’Alcúdia', href: 'https://www.alcudia.net' },
  { label: 'Ajuntament de Binissalem', href: 'https://www.ajbinissalem.net' },
];
