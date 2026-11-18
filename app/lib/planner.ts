/**
 * Gemensam logik för resplanerna (3.10).
 *
 * Används av startsidans planerare (app/components/SectionPlanner.tsx) och av den
 * fullständiga resplanen på /resplan, så att de alltid ger samma plan för samma val.
 *
 * Filen är ren data och rena funktioner – inga React-komponenter, ingen DOM och ingen
 * import av data/cities.ts (koordinaterna skickas in från serversidan, så att hela
 * stadsdatan inte hamnar i klientens JavaScript).
 *
 * URL-format (delbar länk):
 *   ?dagar=7&intressen=strand,kultur&plan=es-trenc,ledig,soller-tag,…
 *   - dagar: ett av `dagval`
 *   - intressen: id:n ur `intressen`, kommaseparerade
 *   - plan (valfri): dagarna mellan ankomst och hemresa i den ordning användaren valt,
 *     som förslags-id:n eller "ledig". Saknas den, eller stämmer den inte med antalet
 *     dagar, används den uträknade grundplanen.
 */

/* ------------------------------------------------------------------ *
 * Områden och orter
 * ------------------------------------------------------------------ */

export type Område = 'palma' | 'vast' | 'norr' | 'inland' | 'ost' | 'syd';

export const områdesNamn: Record<Område, string> = {
  palma: 'Palma med omnejd',
  vast: 'Västra Mallorca och Serra de Tramuntana',
  norr: 'Norra Mallorca',
  inland: 'Inlandet',
  ost: 'Östra Mallorca',
  syd: 'Södra Mallorca',
};

// Geografisk ordning för en rundresa: Palma → Tramuntana → norr → inlandet → öst → syd
const områdesOrdning: Record<Område, number> = { palma: 0, vast: 1, norr: 2, inland: 3, ost: 4, syd: 5 };

/**
 * Orter som dagarna utgår från. Varje slug finns i data/cities.ts (kontrolleras när
 * /resplan byggs) och har en egen sida på sajten.
 */
export const ortSlugs = [
  'palma-de-mallorca', 'soller', 'port-de-soller', 'valldemossa', 'deia', 'andratx',
  'alcudia', 'pollenca', 'sineu', 'inca', 'arta', 'capdepera', 'manacor',
  'porto-colom', 'felanitx', 'santanyi', 'porto-petro', 'campos',
] as const;
export type OrtSlug = (typeof ortSlugs)[number];

/** Namn och koordinater för en ort – hämtas från data/cities.ts på servern. */
export type Ort = { slug: OrtSlug; name: string; lat: number; lng: number };
export type Orter = Record<OrtSlug, Ort>;

/* ------------------------------------------------------------------ *
 * Länkar till sajtens sidor
 * ------------------------------------------------------------------ */

export type Länk = { label: string; href: string };

const L = {
  strandar: { label: 'Stränder', href: '/strandar' },
  sevardheter: { label: 'Sevärdheter', href: '/sevardheter' },
  mat: { label: 'Mat & vin', href: '/mat' },
  restauranger: { label: 'Restauranger i Palma', href: '/guide/basta-restauranger-palma' },
  vingardar: { label: 'Vingårdar', href: '/vingardar' },
  golf: { label: 'Golfbanor', href: '/aktiviteter/golf' },
  barn: { label: 'Med barn', href: '/barn' },
  vattenparker: { label: 'Vattenparker', href: '/barn/vattenparker' },
  djurparker: { label: 'Djurparker & akvarier', href: '/barn/djurparker-och-akvarier' },
  inomhus: { label: 'Inomhus & regn', href: '/barn/inomhus-och-regn' },
  palma: { label: 'Palma', href: '/palma-de-mallorca' },
  soller: { label: 'Sóller', href: '/soller' },
  portDeSoller: { label: 'Port de Sóller', href: '/port-de-soller' },
  valldemossa: { label: 'Valldemossa', href: '/valldemossa' },
  deia: { label: 'Deià', href: '/deia' },
  alcudia: { label: 'Alcúdia', href: '/alcudia' },
  pollenca: { label: 'Pollença', href: '/pollenca' },
  arta: { label: 'Artà', href: '/arta' },
  capdepera: { label: 'Capdepera', href: '/capdepera' },
  manacor: { label: 'Manacor', href: '/manacor' },
  santanyi: { label: 'Santanyí', href: '/santanyi' },
  campos: { label: 'Campos', href: '/campos' },
  portoColom: { label: 'Porto Colom', href: '/porto-colom' },
  portoPetro: { label: 'Portopetro', href: '/porto-petro' },
  felanitx: { label: 'Felanitx', href: '/felanitx' },
  sineu: { label: 'Sineu', href: '/sineu' },
  inca: { label: 'Inca', href: '/inca' },
  andratx: { label: 'Andratx', href: '/andratx' },
  vader: { label: 'Väder', href: '/vader' },
  flyg: { label: 'Flyg', href: '/flyg' },
  evenemang: { label: 'Evenemang', href: '/evenemang' },
} satisfies Record<string, Länk>;

/* ------------------------------------------------------------------ *
 * Katalog med dagsförslag
 *
 * Varje intresse pekar ut sina förslag i prioritetsordning. Samma förslag kan höra
 * till flera intressen (t.ex. Coves del Drac för både kultur och familj) och används
 * då bara en gång i planen.
 *
 * Inga öppettider, priser eller exakta tider här – sådant ändras och står på
 * respektive sida. Restider räknas fram med schablonen längre ner.
 * ------------------------------------------------------------------ */

export type Förslag = {
  /** Kort rubrik för dagen. */
  titel: string;
  område: Område;
  /** Orten dagen utgår från – används för karta och körtider. */
  ort: OrtSlug;
  /** Sammanfattning i en mening (startsidans förhandsvisning). */
  text: string;
  förmiddag: string;
  eftermiddag: string;
  kväll: string;
  länkar: Länk[];
};

const förslagsKatalog = {
  // Stränder
  'es-trenc': {
    titel: 'Es Trenc', område: 'syd', ort: 'campos',
    text: 'Es Trenc – lång vit sandstrand i ett naturreservat. Kom tidigt och ta med lunch och parasoll.',
    förmiddag: 'Kör ner till Es Trenc tidigt, innan parkeringarna fylls, och ta en plats längre bort från infarterna.',
    eftermiddag: 'Bad och picknick. Det finns lite skugga på stranden, så ta med parasoll och mycket vatten.',
    kväll: 'Middag i Colònia de Sant Jordi eller i Campos på vägen tillbaka.',
    länkar: [L.strandar, L.campos],
  },
  'calo-des-moro': {
    titel: 'Caló des Moro och Cala Llombards', område: 'syd', ort: 'santanyi',
    text: 'Caló des Moro och Cala Llombards – Grytes favoritstrand. Var på plats före klockan nio på sommaren.',
    förmiddag: 'Caló des Moro tidigt på morgonen, innan viken blir full. Sista biten går du till fots.',
    eftermiddag: 'Fortsätt till Cala Llombards, som har sand, en kiosk och lite mer plats för en lång badeftermiddag.',
    kväll: 'Middag under träden på torget i Santanyí.',
    länkar: [L.strandar, L.santanyi],
  },
  'mondrago': {
    titel: 'Cala Mondragó', område: 'syd', ort: 'porto-petro',
    text: 'Cala Mondragó – sandvikar i en naturpark. Snorkla längs klipporna och gå en bit på kuststigen.',
    förmiddag: 'Bad och snorkling i Cala Mondragó, där två sandvikar ligger inne i naturparken.',
    eftermiddag: 'Gå en bit på kuststigen mot S’Amarador och tillbaka, eller vila i skuggan under tallarna.',
    kväll: 'Middag i den lilla hamnen i Portopetro.',
    länkar: [L.strandar, L.portoPetro],
  },
  'formentor': {
    titel: 'Formentorhalvön', område: 'norr', ort: 'pollenca',
    text: 'Formentorhalvön – utsikten vid Es Colomer och bad på Playa de Formentor.',
    förmiddag: 'Kör ut på Formentorhalvön och stanna vid utsiktsplatsen Es Colomer medan det är lugnt.',
    eftermiddag: 'Bad på Playa de Formentor, en lång sandstrand med tallskog ända ner till vattnet.',
    kväll: 'Promenad längs vattnet och middag i Port de Pollença.',
    länkar: [L.strandar, L.pollenca],
  },
  'muro': {
    titel: 'Playa de Muro och Alcúdia', område: 'norr', ort: 'alcudia',
    text: 'Playa de Muro – långgrunt vatten och fin sand i Alcúdiabukten. Kvällspromenad innanför stadsmuren i Alcúdia.',
    förmiddag: 'Stranddag på Playa de Muro – långgrunt och bra för barn.',
    eftermiddag: 'Fortsätt på stranden eller ta en cykeltur längs bukten när det svalnar.',
    kväll: 'Kvällspromenad innanför stadsmuren i Alcúdia och middag i gamla stan.',
    länkar: [L.strandar, L.alcudia],
  },
  'cala-agulla': {
    titel: 'Cala Agulla och Cala Mesquida', område: 'ost', ort: 'capdepera',
    text: 'Cala Agulla och Cala Mesquida – sanddyner, tallskog och turkost vatten nära Cala Rajada.',
    förmiddag: 'Bad i Cala Agulla, med sanddyner och tallskog bakom stranden.',
    eftermiddag: 'Byt till Cala Mesquida, som ofta är lite lugnare.',
    kväll: 'Middag i hamnen i Cala Rajada eller upp till borgen i Capdepera i solnedgången.',
    länkar: [L.strandar, L.capdepera],
  },
  'cala-varques': {
    titel: 'Cala Varques', område: 'ost', ort: 'manacor',
    text: 'Cala Varques – en vik utan bebyggelse som du når efter en kort promenad. Ta med vatten och skugga.',
    förmiddag: 'Promenera ner till Cala Varques. Det finns inga kiosker, så packa vatten, mat och skugga.',
    eftermiddag: 'Bad och snorkling längs klipporna i viken.',
    kväll: 'Middag i Porto Cristo.',
    länkar: [L.strandar, L.manacor],
  },
  'port-de-soller': {
    titel: 'Port de Sóller', område: 'vast', ort: 'port-de-soller',
    text: 'Port de Sóller – bad i den skyddade hamnviken och middag längs strandpromenaden.',
    förmiddag: 'Bad i den skyddade hamnviken i Port de Sóller.',
    eftermiddag: 'Promenad ut mot fyren eller en båttur längs kusten.',
    kväll: 'Middag längs strandpromenaden och solnedgång över viken.',
    länkar: [L.portDeSoller, L.strandar],
  },
  'sa-calobra': {
    titel: 'Sa Calobra och Torrent de Pareis', område: 'vast', ort: 'port-de-soller',
    text: 'Sa Calobra – båt från Port de Sóller och en promenad in i ravinen Torrent de Pareis, där en liten stenstrand ligger.',
    förmiddag: 'Båt från Port de Sóller längs den branta kusten till Sa Calobra.',
    eftermiddag: 'Gå genom tunnlarna in till mynningen av ravinen Torrent de Pareis och bada från stenstranden.',
    kväll: 'Tillbaka till Port de Sóller för middag vid hamnen.',
    länkar: [L.strandar, L.portDeSoller],
  },
  'cala-sa-nau': {
    titel: 'Cala Sa Nau', område: 'syd', ort: 'porto-colom',
    text: 'Cala Sa Nau – liten sandvik omgiven av tallar på sydöstkusten.',
    förmiddag: 'Bad i Cala Sa Nau, en smal sandvik mellan tallklädda klippor.',
    eftermiddag: 'Vila i viken eller kör vidare och titta på fiskehamnen i Porto Colom.',
    kväll: 'Middag längs kajen i Porto Colom.',
    länkar: [L.strandar, L.portoColom],
  },

  // Kultur
  'palma-gamla-stan': {
    titel: 'Palmas gamla stan', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Palma – katedralen La Seu, Palau de l’Almudaina och gränderna i gamla stan.',
    förmiddag: 'Katedralen La Seu och kungapalatset Palau de l’Almudaina bredvid.',
    eftermiddag: 'Vandra genom gränderna i gamla stan, förbi innergårdarna och Arabiska baden.',
    kväll: 'Tapas i gamla stan eller i Santa Catalina.',
    länkar: [L.palma, L.sevardheter],
  },
  'bellver-miro': {
    titel: 'Bellver och Fundació Miró', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Palma – det runda slottet Bellver med utsikt över bukten och Fundació Miró i Cala Major.',
    förmiddag: 'Slottet Bellver, runt och byggt på en kulle, med utsikt över hela Palmabukten.',
    eftermiddag: 'Fundació Miró i Cala Major, där konstnären hade sin ateljé.',
    kväll: 'Promenad längs Paseo Marítimo och middag i hamnen.',
    länkar: [L.palma, L.sevardheter],
  },
  'valldemossa-deia': {
    titel: 'Valldemossa och Deià', område: 'vast', ort: 'valldemossa',
    text: 'Valldemossa och Deià – klostret där Chopin bodde en vinter och Robert Graves hus i Deià.',
    förmiddag: 'Klostret i Valldemossa, där Chopin och George Sand bodde en vinter, och de branta gatorna i byn.',
    eftermiddag: 'Kör kustvägen till Deià och besök Robert Graves hus.',
    kväll: 'Middag i Deià med utsikt över bergen.',
    länkar: [L.valldemossa, L.deia],
  },
  'soller-tag': {
    titel: 'Tåget till Sóller', område: 'vast', ort: 'soller',
    text: 'Sóller – det gamla tåget från Palma genom bergen och spårvagnen ner till Port de Sóller.',
    förmiddag: 'Det gamla trätåget från Palma genom bergen till Sóller.',
    eftermiddag: 'Torget i Sóller och sedan spårvagnen ner till Port de Sóller för ett dopp.',
    kväll: 'Middag i Sóller eller vid hamnen innan du tar dig tillbaka.',
    länkar: [L.soller, L.portDeSoller],
  },
  'alcudia': {
    titel: 'Alcúdia och Pollentia', område: 'norr', ort: 'alcudia',
    text: 'Alcúdia – stadsmuren, gamla stan och de romerska ruinerna i Pollentia.',
    förmiddag: 'De romerska ruinerna i Pollentia strax utanför stadsmuren.',
    eftermiddag: 'Gå längs muren och genom gamla stan i Alcúdia, sedan bad i bukten.',
    kväll: 'Middag på något av torgen innanför muren.',
    länkar: [L.alcudia, L.sevardheter],
  },
  'pollenca': {
    titel: 'Pollença', område: 'norr', ort: 'pollenca',
    text: 'Pollença – 365 trappsteg upp till Calvari och ett glas på torget Plaça Major.',
    förmiddag: 'Gå de 365 trappstegen upp till kapellet Calvari, helst innan det blir varmt.',
    eftermiddag: 'Kaffe på Plaça Major och sedan bad i Port de Pollença eller Cala Sant Vicenç.',
    kväll: 'Ett glas och middag på torget i Pollença.',
    länkar: [L.pollenca],
  },
  'sineu': {
    titel: 'Sineu och inlandet', område: 'inland', ort: 'sineu',
    text: 'Sineu – öns största marknad på onsdagar. Fortsätt sedan till någon av byarna i inlandet.',
    förmiddag: 'Onsdagsmarknaden i Sineu, med både djurmarknad och stånd med mat och hantverk. Övriga dagar är byn lugn och fin att gå runt i.',
    eftermiddag: 'Fortsätt till någon av byarna i inlandet, till exempel Petra eller Sant Joan.',
    kväll: 'Middag i en by i inlandet eller tillbaka vid boendet.',
    länkar: [L.sineu],
  },
  'arta': {
    titel: 'Artà', område: 'ost', ort: 'arta',
    text: 'Artà – borgen Sant Salvador ovanför byn och den förhistoriska byn Ses Païsses.',
    förmiddag: 'Gå upp till borgen Sant Salvador ovanför Artà för utsikten.',
    eftermiddag: 'Den förhistoriska byn Ses Païsses strax utanför samhället.',
    kväll: 'Middag i Artà.',
    länkar: [L.arta, L.sevardheter],
  },
  'coves-drach': {
    titel: 'Coves del Drac', område: 'ost', ort: 'manacor',
    text: 'Coves del Drac i Porto Cristo – droppstensgrottor med en kort konsert på den underjordiska sjön. Köp biljett i förväg.',
    förmiddag: 'Coves del Drac i Porto Cristo – droppstensgrottor och en kort konsert på den underjordiska sjön. Biljetterna gäller en bestämd tid, så köp i förväg.',
    eftermiddag: 'Lunch och bad i Porto Cristo.',
    kväll: 'Middag i Porto Cristo eller i Manacor.',
    länkar: [L.sevardheter, L.manacor],
  },
  'santanyi': {
    titel: 'Santanyí', område: 'syd', ort: 'santanyi',
    text: 'Santanyí – lördagsmarknad, gallerier och hus i gyllene sandsten.',
    förmiddag: 'Santanyí, med gallerier och hus i gyllene sandsten. På lördagar är det marknad på torget.',
    eftermiddag: 'Bad i någon av vikarna längs kusten, till exempel Cala Santanyí.',
    kväll: 'Middag på torget i Santanyí.',
    länkar: [L.santanyi],
  },

  // Mat & vin
  'palma-mat': {
    titel: 'Mat i Palma', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Palma – frukost eller tapas på Mercat de l’Olivar och en kväll bland restaurangerna i Santa Catalina.',
    förmiddag: 'Frukost eller tapas bland stånden på saluhallen Mercat de l’Olivar.',
    eftermiddag: 'Lugn eftermiddag i gamla stan – glass, kaffe och lite shopping.',
    kväll: 'Middag bland restaurangerna i stadsdelen Santa Catalina.',
    länkar: [L.restauranger, L.mat],
  },
  'palma-middag': {
    titel: 'En fin middag i Palma', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Palma – en riktigt fin middag på någon av stadens bästa restauranger. Boka i god tid.',
    förmiddag: 'Lugn förmiddag – strand eller promenad i Palma.',
    eftermiddag: 'Ett glas på någon av takterrasserna i gamla stan.',
    kväll: 'En riktigt fin middag på någon av stadens bästa restauranger. Boka i god tid.',
    länkar: [L.restauranger],
  },
  'binissalem': {
    titel: 'Vin i Binissalem', område: 'inland', ort: 'inca',
    text: 'Binissalem – vinprovning på en eller två bodegor i vinområdet mitt på ön. Boka besöket i förväg.',
    förmiddag: 'Vinprovning på en bodega i Binissalem. Boka besöket i förväg.',
    eftermiddag: 'Lunch i byn och en andra provning, eller en promenad bland vinodlingarna.',
    kväll: 'Middag i Inca eller tillbaka vid boendet. Bestäm i förväg vem som kör.',
    länkar: [L.vingardar, L.inca],
  },
  'pla-i-llevant': {
    titel: 'Vinområdet Pla i Llevant', område: 'inland', ort: 'felanitx',
    text: 'Vinområdet Pla i Llevant kring Felanitx och Manacor – provning och lunch på landsbygden.',
    förmiddag: 'Vinprovning på en bodega i Pla i Llevant kring Felanitx. Boka i förväg.',
    eftermiddag: 'Lunch på landsbygden och kanske en tur upp till klostret Sant Salvador ovanför Felanitx.',
    kväll: 'Middag i Porto Colom.',
    länkar: [L.vingardar, L.felanitx],
  },
  'soller-mat': {
    titel: 'Mat i Sóllerdalen', område: 'vast', ort: 'soller',
    text: 'Sóller – apelsiner och glass på torget, olivolja från dalen och middag vid hamnen.',
    förmiddag: 'Torget i Sóller med apelsinjuice och glass från dalens apelsiner.',
    eftermiddag: 'Köp olivolja och promenera bland citrusodlingarna i dalen.',
    kväll: 'Middag vid hamnen i Port de Sóller.',
    länkar: [L.soller, L.mat],
  },
  'porto-colom': {
    titel: 'Porto Colom', område: 'syd', ort: 'porto-colom',
    text: 'Porto Colom – fiskehamn med restauranger längs kajen. Fråga efter dagens fisk.',
    förmiddag: 'Promenad längs den naturliga hamnen och fiskebåtarna i Porto Colom.',
    eftermiddag: 'Bad i någon av vikarna i närheten.',
    kväll: 'Middag längs kajen – fråga efter dagens fisk.',
    länkar: [L.portoColom, L.mat],
  },
  'deia-lunch': {
    titel: 'Lunch i Deià', område: 'vast', ort: 'deia',
    text: 'Deià – lång lunch med utsikt över bergen och havet, sedan en promenad genom byn.',
    förmiddag: 'Promenad ner till Cala Deià och ett dopp bland klipporna.',
    eftermiddag: 'Lång lunch med utsikt över bergen och havet, sedan en promenad genom byn.',
    kväll: 'Solnedgång längs kustvägen mot Valldemossa.',
    länkar: [L.deia, L.mat],
  },
  'inca-celler': {
    titel: 'Inca och vinkällarna', område: 'inland', ort: 'inca',
    text: 'Inca – lunch i en av de gamla vinkällarna som serverar mallorkinsk husmanskost.',
    förmiddag: 'Inca, känd för sina läder- och skobutiker. Gå runt i centrum och titta in i butikerna.',
    eftermiddag: 'Lunch i en av de gamla vinkällarna som serverar mallorkinsk husmanskost.',
    kväll: 'Tillbaka vid boendet för en lugn kväll.',
    länkar: [L.inca, L.mat],
  },
  'port-de-pollenca': {
    titel: 'Port de Pollença', område: 'norr', ort: 'pollenca',
    text: 'Port de Pollença – promenad längs tallallén vid vattnet och middag i hamnen.',
    förmiddag: 'Bad på den långgrunda stranden i Port de Pollença.',
    eftermiddag: 'Promenad längs tallallén vid vattnet.',
    kväll: 'Middag i hamnen.',
    länkar: [L.pollenca, L.mat],
  },

  // Natur & äventyr
  'gr221': {
    titel: 'Vandring Deià–Port de Sóller', område: 'vast', ort: 'deia',
    text: 'Vandring på GR 221 mellan Deià och Port de Sóller, räkna med tre till fyra timmar. Ta bussen tillbaka.',
    förmiddag: 'Starta tidigt från Deià på GR 221 mot Port de Sóller. Räkna med tre till fyra timmar plus pauser.',
    eftermiddag: 'Bad och sen lunch i Port de Sóller.',
    kväll: 'Buss tillbaka till Deià eller middag vid hamnen.',
    länkar: [L.deia, L.portDeSoller],
  },
  'kajak': {
    titel: 'Kajak i norr', område: 'norr', ort: 'pollenca',
    text: 'Kajak eller paddelbräda längs klipporna vid Cala Sant Vicenç eller i Pollençabukten.',
    förmiddag: 'Kajak eller paddelbräda längs klipporna vid Cala Sant Vicenç eller i Pollençabukten, när vattnet är lugnast.',
    eftermiddag: 'Bad och vila i Cala Sant Vicenç.',
    kväll: 'Middag i Pollença.',
    länkar: [L.pollenca, L.strandar],
  },
  'formentor-cykel': {
    titel: 'Cykla mot Formentor', område: 'norr', ort: 'pollenca',
    text: 'Cykla vägen ut mot Cap de Formentor – en klassisk tur med utsikt hela vägen. Hyr cykel i Port de Pollença.',
    förmiddag: 'Hyr cykel i Port de Pollença och cykla ut mot Cap de Formentor tidigt, innan trafiken ökar.',
    eftermiddag: 'Bad på Playa de Formentor på vägen tillbaka.',
    kväll: 'Middag i Port de Pollença.',
    länkar: [L.pollenca],
  },
  'albufera': {
    titel: 'S’Albufera', område: 'norr', ort: 'alcudia',
    text: 'S’Albufera – fågelskådning och cykling i våtmarksparken bakom Playa de Muro.',
    förmiddag: 'Fågelskådning i våtmarksparken S’Albufera, gärna tidigt på morgonen.',
    eftermiddag: 'Cykla på stigarna i parken och bada sedan på Playa de Muro.',
    kväll: 'Middag i Alcúdia.',
    länkar: [L.alcudia],
  },
  'talaia-alcudia': {
    titel: 'Talaia d’Alcúdia', område: 'norr', ort: 'alcudia',
    text: 'Vandring upp till Talaia d’Alcúdia – utsikt över både Pollença- och Alcúdiabukten.',
    förmiddag: 'Vandra upp till Talaia d’Alcúdia med utsikt över både Pollença- och Alcúdiabukten.',
    eftermiddag: 'Bad i någon av vikarna på halvön, till exempel Coll Baix.',
    kväll: 'Middag i Alcúdia.',
    länkar: [L.alcudia],
  },
  'dragonera': {
    titel: 'Sa Dragonera', område: 'vast', ort: 'andratx',
    text: 'Båt från Sant Elm till naturreservatet Sa Dragonera och en vandring till fyren.',
    förmiddag: 'Båt från Sant Elm över till naturreservatet Sa Dragonera. Turerna går när vädret tillåter.',
    eftermiddag: 'Vandra till någon av fyrarna på ön och tillbaka till båten.',
    kväll: 'Middag i Sant Elm eller i Port d’Andratx.',
    länkar: [L.andratx],
  },
  'llevant': {
    titel: 'Península de Llevant', område: 'ost', ort: 'arta',
    text: 'Vandring i naturparken Península de Llevant norr om Artà, med bad i Cala Torta.',
    förmiddag: 'Vandring i naturparken Península de Llevant norr om Artà.',
    eftermiddag: 'Bad i Cala Torta eller någon annan av de obebyggda vikarna.',
    kväll: 'Middag i Artà.',
    länkar: [L.arta, L.strandar],
  },
  'randa': {
    titel: 'Puig de Randa', område: 'inland', ort: 'campos',
    text: 'Puig de Randa – kör eller vandra upp till klostren på berget med utsikt över halva ön.',
    förmiddag: 'Kör eller vandra upp till klostren på Puig de Randa, med utsikt över halva ön.',
    eftermiddag: 'Lunch i byn Randa nedanför berget.',
    kväll: 'Middag i Campos eller tillbaka vid boendet.',
    länkar: [L.sevardheter],
  },

  // Familj
  'aquarium': {
    titel: 'Palma Aquarium', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Palma Aquarium – hajar, maneter och lekplats. Fungerar bra även en molnig dag.',
    förmiddag: 'Palma Aquarium – hajar, maneter och lekplats. Bra även en molnig dag.',
    eftermiddag: 'Bad på Platja de Palma eller vila vid boendet.',
    kväll: 'Tidig middag nära boendet.',
    länkar: [L.djurparker, L.barn],
  },
  'aqualand': {
    titel: 'Aqualand El Arenal', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Aqualand El Arenal – vattenrutschkanor och barnpooler hela dagen.',
    förmiddag: 'Var vid Aqualand när det öppnar, då är köerna till rutschkanorna kortast.',
    eftermiddag: 'Fortsätt i parken – barnpoolerna fungerar för de minsta.',
    kväll: 'Tidig middag och en lugn kväll.',
    länkar: [L.vattenparker, L.barn],
  },
  'western': {
    titel: 'Western Water Park', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Western Water Park i Magaluf – vattenpark med vilda västern-tema och ett eget område för de minsta.',
    förmiddag: 'Western Water Park i Magaluf – vattenpark med vilda västern-tema.',
    eftermiddag: 'Fortsätt i parken. Det finns ett eget område för de minsta.',
    kväll: 'Tidig middag och en lugn kväll.',
    länkar: [L.vattenparker, L.barn],
  },
  'hidropark': {
    titel: 'Hidropark i Alcúdia', område: 'norr', ort: 'alcudia',
    text: 'Hidropark i Alcúdia – mindre vattenpark med korta köer, bra om ni bor i norr.',
    förmiddag: 'Hidropark i Alcúdia – en mindre vattenpark som passar om ni bor i norr.',
    eftermiddag: 'Bad på den långgrunda stranden i Alcúdiabukten.',
    kväll: 'Glass och kvällspromenad i Alcúdia.',
    länkar: [L.vattenparker, L.alcudia],
  },
  'safari-zoo': {
    titel: 'Safari Zoo', område: 'ost', ort: 'manacor',
    text: 'Safari Zoo i Sa Coma – kör egen bil genom parken bland giraffer och zebror.',
    förmiddag: 'Safari Zoo i Sa Coma – kör egen bil genom safariområdet. Kör du hyrbil, kontrollera att avtalet tillåter det.',
    eftermiddag: 'Bad på stranden i Sa Coma eller Cala Millor.',
    kväll: 'Tidig middag nära stranden.',
    länkar: [L.djurparker, L.barn],
  },
  'natura-parc': {
    titel: 'Natura Parc', område: 'inland', ort: 'palma-de-mallorca',
    text: 'Natura Parc i Santa Eugènia – djurpark med stor lekplats, lagom för en halvdag.',
    förmiddag: 'Natura Parc i Santa Eugènia – djurpark med stor lekplats, lagom för en halvdag.',
    eftermiddag: 'Vila och bad vid boendet.',
    kväll: 'Middag nära boendet.',
    länkar: [L.djurparker, L.barn],
  },
  'regndag': {
    titel: 'Inomhusdag', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Regnig eller väldigt varm dag? Välj något inomhus – vi har samlat tips för hela familjen.',
    förmiddag: 'Regnig eller väldigt varm dag? Välj något inomhus – vi har samlat tips för hela familjen.',
    eftermiddag: 'Fortsätt inomhus eller ta en promenad i Palma när vädret vänder.',
    kväll: 'Middag i Palma.',
    länkar: [L.inomhus, L.barn],
  },

  // Golf
  'golf-son-gual': {
    titel: 'Golf på Son Gual', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Golf på Son Gual strax utanför Palma, en av öns mest kända banor. Boka starttid i förväg.',
    förmiddag: 'Golf på Son Gual strax utanför Palma. Boka starttid i förväg.',
    eftermiddag: 'Lunch i klubbhuset och vila.',
    kväll: 'Middag i Palma.',
    länkar: [L.golf, L.palma],
  },
  'golf-alcanada': {
    titel: 'Golf på Alcanada', område: 'norr', ort: 'alcudia',
    text: 'Golf på Alcanada vid Alcúdia – banan längs vattnet med utsikt mot fyrön.',
    förmiddag: 'Golf på Alcanada, banan längs vattnet med utsikt mot fyrön.',
    eftermiddag: 'Lunch och bad i Alcúdiabukten.',
    kväll: 'Middag i gamla stan i Alcúdia.',
    länkar: [L.golf, L.alcudia],
  },
  'golf-pula': {
    titel: 'Golf på Pula', område: 'ost', ort: 'capdepera',
    text: 'Golf på Pula Golf Resort vid Son Servera på östkusten.',
    förmiddag: 'Golf på Pula Golf Resort vid Son Servera.',
    eftermiddag: 'Bad i Cala Millor eller vila.',
    kväll: 'Middag i Cala Rajada.',
    länkar: [L.golf, L.capdepera],
  },
  'golf-andratx': {
    titel: 'Golf de Andratx', område: 'vast', ort: 'andratx',
    text: 'Golf de Andratx – kuperad bana i sydväst. Avsluta med middag i Port d’Andratx.',
    förmiddag: 'Golf de Andratx vid Camp de Mar – en kuperad bana i sydväst.',
    eftermiddag: 'Bad i Camp de Mar.',
    kväll: 'Middag i hamnen i Port d’Andratx.',
    länkar: [L.golf, L.andratx],
  },
  'golf-capdepera': {
    titel: 'Capdepera Golf', område: 'ost', ort: 'capdepera',
    text: 'Capdepera Golf – omgiven av berg, nära Cala Rajada.',
    förmiddag: 'Capdepera Golf, omgiven av berg.',
    eftermiddag: 'Borgen i Capdepera och utsikten över kusten.',
    kväll: 'Middag i hamnen i Cala Rajada.',
    länkar: [L.golf, L.capdepera],
  },
  'golf-son-vida': {
    titel: 'Golf i Son Vida', område: 'palma', ort: 'palma-de-mallorca',
    text: 'Son Vida eller Son Muntaner i Palmas utkant – två banor intill varandra.',
    förmiddag: 'Golf på Son Vida eller Son Muntaner i Palmas utkant.',
    eftermiddag: 'Lunch och vila.',
    kväll: 'Middag i Palma.',
    länkar: [L.golf, L.palma],
  },
} satisfies Record<string, Förslag>;

export type FörslagsId = keyof typeof förslagsKatalog;
export const förslag: Record<FörslagsId, Förslag> = förslagsKatalog;
const förslagsIds = Object.keys(förslag) as FörslagsId[];
export const ärFörslagsId = (id: string): id is FörslagsId => Object.prototype.hasOwnProperty.call(förslag, id);

/* ------------------------------------------------------------------ *
 * Intressen och dagval
 * ------------------------------------------------------------------ */

export const intressen = [
  { id: 'strand', label: 'Strand', förslag: ['es-trenc', 'calo-des-moro', 'formentor', 'mondrago', 'cala-agulla', 'muro', 'port-de-soller', 'cala-varques', 'sa-calobra', 'cala-sa-nau'] },
  { id: 'kultur', label: 'Kultur', förslag: ['palma-gamla-stan', 'valldemossa-deia', 'soller-tag', 'alcudia', 'sineu', 'coves-drach', 'arta', 'pollenca', 'bellver-miro', 'santanyi'] },
  { id: 'mat', label: 'Mat & vin', förslag: ['palma-mat', 'binissalem', 'soller-mat', 'porto-colom', 'santanyi', 'deia-lunch', 'pla-i-llevant', 'port-de-pollenca', 'inca-celler', 'palma-middag'] },
  { id: 'aventyr', label: 'Äventyr', förslag: ['gr221', 'kajak', 'sa-calobra', 'formentor-cykel', 'mondrago', 'llevant', 'dragonera', 'talaia-alcudia', 'albufera', 'randa'] },
  { id: 'familj', label: 'Familj', förslag: ['aquarium', 'aqualand', 'muro', 'coves-drach', 'safari-zoo', 'hidropark', 'soller-tag', 'natura-parc', 'western', 'regndag'] },
  { id: 'golf', label: 'Golf', förslag: ['golf-son-gual', 'golf-alcanada', 'golf-pula', 'golf-andratx', 'golf-capdepera', 'golf-son-vida'] },
] as const satisfies ReadonlyArray<{ id: string; label: string; förslag: readonly FörslagsId[] }>;

export type IntresseId = (typeof intressen)[number]['id'];

// Om valda intressen inte räcker till alla dagar fylls planen på med klassiker
const reserv: FörslagsId[] = ['palma-gamla-stan', 'valldemossa-deia', 'soller-tag', 'muro', 'alcudia', 'es-trenc', 'santanyi', 'sineu', 'arta', 'pollenca', 'palma-mat', 'binissalem'];

export const dagval = ['3', '5', '7', '10', '14'] as const;
export type Dagar = (typeof dagval)[number];

/* ------------------------------------------------------------------ *
 * Fasta dagar
 * ------------------------------------------------------------------ */

export const LEDIG = 'ledig';
/** En dag mitt i resan: ett förslag eller en ledig dag. */
export type MittDag = FörslagsId | typeof LEDIG;

type FastDag = Omit<Förslag, 'område' | 'ort'> & { ort: OrtSlug | null };

export const ankomst: FastDag = {
  titel: 'Ankomst',
  ort: 'palma-de-mallorca',
  text: 'Ankomst och incheckning. Ta det lugnt första kvällen med en promenad och middag nära boendet.',
  förmiddag: 'Landning på flygplatsen strax utanför Palma. Hämta hyrbilen eller ta dig till boendet med buss, transfer eller taxi.',
  eftermiddag: 'Incheckning, handla det nödvändigaste och kolla väderprognosen för veckan.',
  kväll: 'Ta det lugnt med en promenad och middag nära boendet.',
  länkar: [L.flyg, L.vader],
};

export const hemresa: FastDag = {
  titel: 'Hemresa',
  ort: 'palma-de-mallorca',
  text: 'Hemresa. Hinner du, ta ett sista dopp eller en lång frukost innan flyget.',
  förmiddag: 'Hinner du, ta ett sista dopp eller en lång frukost innan flyget.',
  eftermiddag: 'Ge dig av till flygplatsen i god tid – på sommaren kan det bli kö både på vägarna och vid säkerhetskontrollen.',
  kväll: 'Hemresa.',
  länkar: [L.flyg],
};

/** Ledig dag – orten blir densamma som dagen före. */
export const ledig: FastDag = {
  titel: 'Ledig dag',
  ort: null,
  text: 'Ledig dag utan plan – poolen, närmaste stranden eller en lång lunch. Bra att ha i reserv om vädret slår om.',
  förmiddag: 'Sov länge och ta det lugnt vid poolen eller närmaste stranden.',
  eftermiddag: 'En lång lunch eller en kort utflykt i närheten. Bra att ha i reserv om vädret slår om.',
  kväll: 'Se vad som händer i trakten – det kan vara en byfest eller en marknad.',
  länkar: [L.strandar, L.vader, L.evenemang],
};

/* ------------------------------------------------------------------ *
 * Planen
 * ------------------------------------------------------------------ */

export type Val = { dagar: Dagar | ''; intressen: IntresseId[]; plan: MittDag[] | null };

/** Korta resor (3 dagar) har ingen separat ankomst- eller hemresedag. */
export const harAnkomstOchHemresa = (dagar: Dagar) => Number(dagar) > 3;

function antalMittdagar(dagar: Dagar) {
  const n = Number(dagar);
  return harAnkomstOchHemresa(dagar) ? n - 2 : n;
}

/** Bygger grundförslaget för dagarna mellan ankomst och hemresa. Blandar alla valda intressen. */
export function grundplan(dagar: Dagar, valda: readonly IntresseId[]): MittDag[] {
  const n = Number(dagar);
  const lediga = n >= 14 ? 2 : n >= 10 ? 1 : 0;
  const antal = antalMittdagar(dagar) - lediga;

  // Round robin över intressena i fast ordning, utan dubbletter
  const listor = intressen.filter(i => valda.includes(i.id));
  const valt: FörslagsId[] = [];
  const lägg = (id: FörslagsId) => {
    if (valt.includes(id)) return false;
    valt.push(id);
    return true;
  };
  const pekare = listor.map(() => 0);
  let fler = true;
  while (valt.length < antal && fler) {
    fler = false;
    listor.forEach((intresse, li) => {
      while (valt.length < antal && pekare[li] < intresse.förslag.length) {
        const id = intresse.förslag[pekare[li]++];
        fler = true;
        if (lägg(id)) break;
      }
    });
  }
  for (const id of reserv) {
    if (valt.length >= antal) break;
    lägg(id);
  }

  // Ordna efter område så att resan blir en rundtur i stället för fram och tillbaka
  const ordnade: MittDag[] = valt
    .map((id, i) => ({ id, i }))
    .sort((a, b) => områdesOrdning[förslag[a.id].område] - områdesOrdning[förslag[b.id].område] || a.i - b.i)
    .map(v => v.id);

  // Lägg in vilodagar ungefär var femte dag
  const aktivitetsdagar = ordnade.length;
  for (let k = 1; k <= lediga; k++) {
    const plats = Math.round((k * aktivitetsdagar) / (lediga + 1));
    ordnade.splice(plats + (k - 1), 0, LEDIG);
  }
  return ordnade;
}

/** Är en sparad plan från URL:en giltig för det här antalet dagar? */
function giltigPlan(plan: MittDag[] | null, dagar: Dagar): plan is MittDag[] {
  if (!plan || plan.length !== antalMittdagar(dagar)) return false;
  const förslagIPlan = plan.filter(d => d !== LEDIG);
  return new Set(förslagIPlan).size === förslagIPlan.length;
}

/** Mittdagarna som ska visas: användarens ändrade plan om den är giltig, annars grundplanen. */
export function mittdagar(val: Val & { dagar: Dagar }): MittDag[] {
  return giltigPlan(val.plan, val.dagar) ? val.plan : grundplan(val.dagar, val.intressen);
}

/** Har användaren ändrat ordningen eller bytt ut någon dag? */
export function ärÄndrad(val: Val & { dagar: Dagar }): boolean {
  return giltigPlan(val.plan, val.dagar) && val.plan.join() !== grundplan(val.dagar, val.intressen).join();
}

export type PlanDag = {
  typ: 'ankomst' | 'hemresa' | 'ledig' | 'förslag';
  /** Förslagets id, eller "ledig". Saknas för ankomst och hemresa. */
  id: MittDag | null;
  innehåll: FastDag & { område: Område | null };
  /** Orten dagen utgår från (för ledig dag: samma som dagen före). */
  ort: OrtSlug;
  /** Valda intressen som förslaget hör till. */
  taggar: string[];
};

function taggarFör(id: FörslagsId, valda: readonly IntresseId[]) {
  return intressen
    .filter(i => valda.includes(i.id) && (i.förslag as readonly FörslagsId[]).includes(id))
    .map(i => i.label);
}

/** Hela resan dag för dag, med ankomst och hemresa. */
export function byggPlan(val: Val & { dagar: Dagar }): PlanDag[] {
  const mitt = mittdagar(val);
  const dagar: PlanDag[] = [];
  let föregåendeOrt: OrtSlug = 'palma-de-mallorca';
  const lägg = (d: Omit<PlanDag, 'ort'> & { ort: OrtSlug | null }) => {
    const ort = d.ort ?? föregåendeOrt;
    föregåendeOrt = ort;
    dagar.push({ ...d, ort });
  };
  const fasta = harAnkomstOchHemresa(val.dagar);
  if (fasta) lägg({ typ: 'ankomst', id: null, innehåll: { ...ankomst, område: 'palma' }, ort: ankomst.ort, taggar: [] });
  for (const id of mitt) {
    if (id === LEDIG) {
      lägg({ typ: 'ledig', id, innehåll: { ...ledig, område: null }, ort: null, taggar: ['Vila'] });
    } else {
      lägg({ typ: 'förslag', id, innehåll: förslag[id], ort: förslag[id].ort, taggar: taggarFör(id, val.intressen) });
    }
  }
  if (fasta) lägg({ typ: 'hemresa', id: null, innehåll: { ...hemresa, område: 'palma' }, ort: hemresa.ort, taggar: [] });
  return dagar;
}

/**
 * Förslag som kan ersätta en dag: först de som passar valda intressen, sedan de i samma
 * område, sist övriga. Förslag som redan finns i planen räknas inte med.
 */
export function alternativ(plan: readonly MittDag[], index: number, valda: readonly IntresseId[]) {
  const nuvarande = plan[index];
  const område = nuvarande && nuvarande !== LEDIG ? förslag[nuvarande].område : null;
  const används = new Set(plan);
  const lediga = förslagsIds.filter(id => !används.has(id));
  const passar = lediga.filter(id => taggarFör(id, valda).length > 0);
  const sammaOmråde = lediga.filter(id => !passar.includes(id) && område !== null && förslag[id].område === område);
  const övriga = lediga.filter(id => !passar.includes(id) && !sammaOmråde.includes(id));
  return { passar, sammaOmråde, övriga };
}

/* ------------------------------------------------------------------ *
 * URL
 * ------------------------------------------------------------------ */

export function läsVal(search: string): Val {
  const params = new URLSearchParams(search);
  const d = params.get('dagar') ?? '';
  const valda = (params.get('intressen') ?? '').split(',');
  const planParam = params.get('plan');
  const plan = planParam
    ? planParam.split(',').filter((id): id is MittDag => id === LEDIG || ärFörslagsId(id))
    : null;
  return {
    dagar: (dagval as readonly string[]).includes(d) ? (d as Dagar) : '',
    intressen: intressen.map(i => i.id).filter(id => valda.includes(id)),
    // En plan med okända id:n kastas hellre än att visa en annan plan än den som delades
    plan: plan && planParam && plan.length === planParam.split(',').length ? plan : null,
  };
}

/** Frågesträng utan "?" för valen. Planen tas bara med om den skiljer sig från grundförslaget. */
export function valTillSök(val: Val): string {
  const params = new URLSearchParams();
  if (val.dagar) params.set('dagar', val.dagar);
  params.set('intressen', val.intressen.join(','));
  if (val.dagar && val.plan && ärÄndrad({ ...val, dagar: val.dagar })) params.set('plan', val.plan.join(','));
  // Kommatecken behöver inte kodas och gör länken lättare att läsa
  return params.toString().replace(/%2C/g, ',');
}

/* ------------------------------------------------------------------ *
 * Avstånd och körtider (schablon)
 *
 * Avståndet räknas fågelvägen mellan orternas koordinater i data/cities.ts och
 * multipliceras med en vägfaktor. Tiden räknas med en snittfart. Schablonen är
 * stämd mot ruttplanerare för Palma–Sóller (ca 25–30 km, ca 25–30 min),
 * Palma–Alcúdia (ca 55–65 km, ca 45–55 min) och Palma–Santanyí (ca 50–55 km,
 * ca 40–55 min). På bergsvägarna i Serra de Tramuntana tar det längre tid.
 * ------------------------------------------------------------------ */

export const VÄGFAKTOR = 1.2;
export const SNITTFART_KMH = 65;

/** Fågelvägen i km (haversine). */
export function fågelväg(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type Körning = { km: number; minuter: number };

/** Ungefärlig körning enligt schablonen, avrundad till 5 km och 5 min. Under 3 km fågelvägen räknas som samma ort. */
export function körning(a: { lat: number; lng: number }, b: { lat: number; lng: number }): Körning | null {
  const luft = fågelväg(a, b);
  if (luft < 3) return null;
  const väg = luft * VÄGFAKTOR;
  const avrunda = (x: number) => Math.max(5, Math.round(x / 5) * 5);
  return { km: avrunda(väg), minuter: avrunda((väg / SNITTFART_KMH) * 60) };
}

export function formateraMinuter(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
