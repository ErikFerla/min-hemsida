/**
 * Områdena på /var-ska-man-bo och poängen för ortsquizet (3.5).
 *
 * Länkarna går till stadssidorna i data/cities.ts. Sakuppgifter (marknadsdagar, flygbussar, tåg)
 * stämmer med stadssidorna och data/transport.ts – ändra dem där om något ändras.
 */

export type ResenarId = 'familj' | 'par' | 'aktiv' | 'lugn' | 'stad' | 'utanBil' | 'lange';

export const resenarer: { id: ResenarId; rubrik: string }[] = [
  { id: 'familj', rubrik: 'Barnfamilj' },
  { id: 'par', rubrik: 'Par' },
  { id: 'aktiv', rubrik: 'Aktiva' },
  { id: 'lugn', rubrik: 'Lugn och ro' },
  { id: 'stad', rubrik: 'Stadsliv' },
  { id: 'utanBil', rubrik: 'Utan bil' },
  { id: 'lange', rubrik: 'Bo länge eller sommarställe' },
];

/* ------------------------------ Quizet ------------------------------ */

export const fragor = [
  {
    id: 'vilka',
    fraga: 'Vilka reser?',
    val: [
      { id: 'familj', text: 'Familj med barn' },
      { id: 'par', text: 'Vi är två' },
      { id: 'vanner', text: 'Vänner eller ensam' },
    ],
  },
  {
    id: 'gora',
    fraga: 'Vad vill ni helst göra?',
    val: [
      { id: 'strand', text: 'Bada och sola' },
      { id: 'aktiv', text: 'Vandra eller cykla' },
      { id: 'stad', text: 'Mat, kultur och stadsliv' },
      { id: 'lugn', text: 'Varva ner i lugn miljö' },
    ],
  },
  {
    id: 'bil',
    fraga: 'Hyr ni bil?',
    val: [
      { id: 'ja', text: 'Ja, hela tiden' },
      { id: 'nej', text: 'Nej, vi åker buss, tåg och taxi' },
    ],
  },
  {
    id: 'tempo',
    fraga: 'Hur vill ni ha det runt boendet?',
    val: [
      { id: 'livligt', text: 'Livligt, med restauranger runt hörnet' },
      { id: 'lagom', text: 'Lagom – lite liv men inte trångt' },
      { id: 'lugnt', text: 'Helt lugnt' },
    ],
  },
  {
    id: 'nar',
    fraga: 'När och hur länge?',
    val: [
      { id: 'sommar', text: 'En vecka eller två på sommaren' },
      { id: 'varhost', text: 'Vår eller höst' },
      { id: 'lange', text: 'Vintern, en längre period eller ett sommarställe' },
    ],
  },
] as const;

type Fraga = (typeof fragor)[number];
export type FragaId = Fraga['id'];
/** "fråga:val", t.ex. "vilka:familj". */
export type SvarNyckel = { [F in Fraga as F['id']]: `${F['id']}:${F['val'][number]['id']}` }[FragaId];

/* ----------------------------- Områdena ----------------------------- */

export type Omrade = {
  id: string;
  namn: string;
  region: string;
  /** Länkar till stadssidorna. */
  orter: { namn: string; href: string }[];
  passarFor: ResenarId[];
  beskrivning: string;
  fordelar: string[];
  nackdelar: string[];
  /** Poäng och motivering per svar i quizet. Saknas ett svar ger det 0 poäng. */
  quiz: Partial<Record<SvarNyckel, { poang: number; varfor?: string }>>;
};

export const omraden: Omrade[] = [
  {
    id: 'palma',
    namn: 'Palma',
    region: 'Sydväst',
    orter: [{ namn: 'Palma de Mallorca', href: '/palma-de-mallorca' }],
    passarFor: ['stad', 'utanBil', 'par', 'lange'],
    beskrivning:
      'Öns huvudstad har gamla stan, katedralen La Seu, marknadshallar och restauranger i alla prisklasser. Här är det liv året runt, och alla bussar och tåg utgår härifrån.',
    fordelar: [
      'Nära flygplatsen – stadsbussen A1 går direkt in till centrum',
      'Levande året runt, även på vintern',
      'Bussnav och tågstation – du klarar dig utan bil',
    ],
    nackdelar: [
      'Stadsstränderna är inte öns vackraste',
      'Svårt och dyrt att parkera i centrum',
      'Livligt och trångt i gamla stan under högsäsong',
    ],
    quiz: {
      'gora:stad': { poang: 3, varfor: 'Bäst på ön för mat, kultur och stadsliv.' },
      'bil:nej': { poang: 3, varfor: 'Här utgår alla bussar och tåg, och flygbussen går direkt hit.' },
      'tempo:livligt': { poang: 2 },
      'nar:lange': { poang: 3, varfor: 'Levande året runt – restaurangerna och butikerna har öppet även på vintern.' },
      'nar:varhost': { poang: 2 },
      'vilka:par': { poang: 1 },
      'vilka:vanner': { poang: 2 },
    },
  },
  {
    id: 'alcudia',
    namn: 'Alcúdia och Alcúdiabukten',
    region: 'Norr',
    orter: [{ namn: 'Alcúdia', href: '/alcudia' }],
    passarFor: ['familj', 'utanBil'],
    beskrivning:
      'Den gamla stadsmuren i Alcúdia och den långa sandstranden i bukten nedanför. Vattnet är grunt långt ut, vilket gör stranden till en av öns bästa för små barn.',
    fordelar: [
      'Lång sandstrand med grunt vatten – perfekt för barn',
      'Flygbuss direkt från flygplatsen (A32 på sommaren, A33 på vintern)',
      'Platt terräng för cykel och promenader, marknad tisdag och söndag',
    ],
    nackdelar: [
      'Stora hotellområden längs stranden',
      'Lång väg till sydkusten och Palma',
      'Lugnt på vintern när många hotell och restauranger håller stängt',
    ],
    quiz: {
      'vilka:familj': { poang: 3, varfor: 'Den grunda sandstranden är en av öns bästa för små barn.' },
      'gora:strand': { poang: 3, varfor: 'Kilometerlång sandstrand precis utanför dörren.' },
      'bil:nej': { poang: 2, varfor: 'Flygbussen går direkt hit, och bussar går längs hela bukten.' },
      'tempo:livligt': { poang: 1 },
      'tempo:lagom': { poang: 1 },
      'nar:sommar': { poang: 2 },
      'gora:aktiv': { poang: 1 },
    },
  },
  {
    id: 'pollenca',
    namn: 'Pollença och Port de Pollença',
    region: 'Norr',
    orter: [{ namn: 'Pollença', href: '/pollenca' }],
    passarFor: ['aktiv', 'par', 'familj'],
    beskrivning:
      'Pollença är en levande småstad med söndagsmarknad och trapporna upp till Calvari. Port de Pollença ligger vid en skyddad bukt med sandstrand och strandpromenad, och nära Cap de Formentor.',
    fordelar: [
      'Bra bas för vandring och cykling i norra Tramuntana',
      'Skyddad bukt med lugnt vatten',
      'Småstad med söndagsmarknad på torget',
    ],
    nackdelar: [
      'Långt från flygplatsen',
      'Vägen från Platja de Formentor ut till fyren är stängd för privatbil dagtid på sommaren',
      'Fullbokat tidigt under juli och augusti',
    ],
    quiz: {
      'gora:aktiv': { poang: 3, varfor: 'En av öns bästa baser för cykling och vandring.' },
      'vilka:par': { poang: 2, varfor: 'Småstadsmiljö med torgliv och restauranger.' },
      'vilka:familj': { poang: 2, varfor: 'Den skyddade bukten i Port de Pollença har lugnt vatten.' },
      'tempo:lagom': { poang: 2 },
      'nar:varhost': { poang: 2 },
      'gora:strand': { poang: 1 },
    },
  },
  {
    id: 'soller',
    namn: 'Sóller och Port de Sóller',
    region: 'Nordväst',
    orter: [
      { namn: 'Sóller', href: '/soller' },
      { namn: 'Port de Sóller', href: '/port-de-soller' },
    ],
    passarFor: ['aktiv', 'par', 'utanBil', 'lange'],
    beskrivning:
      'En dalgång full av apelsinodlingar mitt i Serra de Tramuntana. Från Sóller går spårvagnen ner till hamnen i Port de Sóller, och det gamla trätåget går över bergen till Palma.',
    fordelar: [
      'Utgångspunkt för många av vandringslederna i Tramuntana',
      'Tåg, spårvagn, buss och båt – det går att klara sig utan bil',
      'Sóller är en levande stad även utanför säsong',
    ],
    nackdelar: [
      'Stränderna är små jämfört med norra och södra kusten',
      'Mycket dagsturister mitt på dagen',
      'Högre prisnivå än i inlandet',
    ],
    quiz: {
      'gora:aktiv': { poang: 3, varfor: 'Mitt i Serra de Tramuntana, med vandringsleder direkt från byn.' },
      'bil:nej': { poang: 2, varfor: 'Tåget, spårvagnen och bussen tar dig till Palma och hamnen.' },
      'vilka:par': { poang: 2, varfor: 'Romantisk dalgång med apelsinodlingar och hamnpromenad.' },
      'tempo:lagom': { poang: 2 },
      'nar:varhost': { poang: 2 },
      'nar:lange': { poang: 2, varfor: 'Sóller är en riktig stad som lever året runt.' },
    },
  },
  {
    id: 'deia-valldemossa',
    namn: 'Deià och Valldemossa',
    region: 'Nordväst',
    orter: [
      { namn: 'Deià', href: '/deia' },
      { namn: 'Valldemossa', href: '/valldemossa' },
    ],
    passarFor: ['lugn', 'par'],
    beskrivning:
      'Två bergsbyar i stenhus högt över havet längs Tramuntanakusten. Valldemossa har klostret där Chopin bodde, Deià har länge lockat konstnärer och författare.',
    fordelar: [
      'Dramatisk natur och stillhet på kvällen när dagsturisterna åkt',
      'Nära Palma men ändå en helt annan värld',
      'Fina små hotell och restauranger',
    ],
    nackdelar: [
      'Inga sandstränder – bara små stenvikar',
      'Få boenden och hög prisnivå',
      'Smala vägar och ont om parkering',
    ],
    quiz: {
      'bil:nej': { poang: -2 },
      'gora:lugn': { poang: 3, varfor: 'Bergsby med utsikt över havet – stillsamt när dagsturisterna åkt hem.' },
      'vilka:par': { poang: 3, varfor: 'Romantiska byar med små hotell och restauranger.' },
      'tempo:lugnt': { poang: 2 },
      'bil:ja': { poang: 1 },
      'gora:aktiv': { poang: 1 },
      'nar:varhost': { poang: 1 },
    },
  },
  {
    id: 'sydost',
    namn: 'Santanyí, Portopetro och sydöstra kusten',
    region: 'Syd',
    orter: [
      { namn: 'Santanyí', href: '/santanyi' },
      { namn: 'Portopetro', href: '/porto-petro' },
    ],
    passarFor: ['par', 'lugn'],
    beskrivning:
      'Honungsgula sandstenshus i Santanyí och små vikar med turkost vatten längs kusten, som Caló des Moro och Cala Mondragó. Portopetro är en lugn liten marinaby.',
    fordelar: [
      'Några av öns vackraste vikar inom kort bilavstånd',
      'Marknad i Santanyí onsdag och lördag',
      'Lugnare än de stora badorterna',
    ],
    nackdelar: [
      'Du behöver bil för att ta dig mellan vikarna',
      'De populäraste vikarna är fulla mitt på dagen på sommaren',
      'Ingen direktbuss från flygplatsen',
    ],
    quiz: {
      'bil:nej': { poang: -2 },
      'vilka:par': { poang: 3, varfor: 'Små vikar, marinor och byar som passar bra för två.' },
      'gora:strand': { poang: 2, varfor: 'Några av öns vackraste vikar finns här.' },
      'gora:lugn': { poang: 2 },
      'bil:ja': { poang: 2, varfor: 'Med bil når du en ny vik varje dag.' },
      'tempo:lugnt': { poang: 1 },
      'tempo:lagom': { poang: 1 },
      'nar:varhost': { poang: 1 },
    },
  },
  {
    id: 'campos',
    namn: 'Campos och Es Trenc',
    region: 'Syd',
    orter: [{ namn: 'Campos', href: '/campos' }],
    passarFor: ['lugn', 'familj'],
    beskrivning:
      'Lantligt i söder med saltängar och Es Trenc, en lång orörd sandstrand utan hotell. Campos är en vardaglig småstad med marknad torsdag och lördag.',
    fordelar: [
      'Es Trenc – lång naturstrand med ljus sand',
      'Ganska nära flygplatsen, med flygbuss (A51) året runt',
      'Lantliga fincor och lokal vardag',
    ],
    nackdelar: [
      'Du behöver bil',
      'Få restauranger och lite kvällsliv',
      'Lite skugga och få bekvämligheter på stranden',
    ],
    quiz: {
      'bil:nej': { poang: -2 },
      'gora:strand': { poang: 2, varfor: 'Nära Es Trenc, en av öns längsta orörda sandstränder.' },
      'gora:lugn': { poang: 2 },
      'tempo:lugnt': { poang: 2, varfor: 'Lantligt och lugnt, långt från de stora badorterna.' },
      'bil:ja': { poang: 1 },
      'vilka:familj': { poang: 1 },
      'nar:lange': { poang: 1 },
    },
  },
  {
    id: 'ost',
    namn: 'Cala Rajada, Capdepera och Artà',
    region: 'Öst',
    orter: [
      { namn: 'Capdepera', href: '/capdepera' },
      { namn: 'Artà', href: '/arta' },
    ],
    passarFor: ['familj', 'aktiv'],
    beskrivning:
      'Nordöstra hörnet av ön, med badorten Cala Rajada, borgen i Capdepera och den gamla staden Artà med tisdagsmarknad. Bakom kusten ligger naturparken på Llevant-halvön.',
    fordelar: [
      'Sandvikar runt Cala Rajada',
      'Borgen i Capdepera och tisdagsmarknaden i Artà',
      'Vandring och cykling i ett glest bebyggt landskap',
    ],
    nackdelar: [
      'Längst från flygplatsen på ön',
      'Cala Rajada är mycket säsongsbetonat',
      'Du behöver bil för att se mer av området',
    ],
    quiz: {
      'bil:nej': { poang: -2 },
      'vilka:familj': { poang: 2, varfor: 'Sandvikar och badorter som passar barnfamiljer.' },
      'gora:strand': { poang: 2 },
      'gora:aktiv': { poang: 2, varfor: 'Glest landskap med vandring och cykling bakom kusten.' },
      'tempo:lagom': { poang: 1 },
      'nar:sommar': { poang: 1 },
    },
  },
  {
    id: 'porto-colom',
    namn: 'Porto Colom och Felanitx',
    region: 'Öst',
    orter: [
      { namn: 'Porto Colom', href: '/porto-colom' },
      { namn: 'Felanitx', href: '/felanitx' },
    ],
    passarFor: ['lugn', 'lange'],
    beskrivning:
      'Porto Colom är en fiskeby kring en djup naturhamn. Felanitx en bit upp i landet är en vardaglig stad med vin, keramik och söndagsmarknad.',
    fordelar: [
      'Lokal vardag med fiskebåtar och bykänsla',
      'Bra för en längre vistelse – det finns liv även utanför högsäsong',
      'Små vikar i närheten',
    ],
    nackdelar: [
      'Få hotell – mest lägenheter och hus',
      'Du behöver bil',
      'Begränsat med sandstrand i själva byn',
    ],
    quiz: {
      'bil:nej': { poang: -2 },
      'gora:lugn': { poang: 3, varfor: 'Fiskeby med lokal vardag i stället för hotellområden.' },
      'tempo:lugnt': { poang: 2 },
      'nar:lange': { poang: 3, varfor: 'Passar bra för den som vill hyra ett hus en längre tid eller ha sommarställe.' },
      'vilka:par': { poang: 1 },
      'bil:ja': { poang: 1 },
    },
  },
  {
    id: 'inlandet',
    namn: 'Inlandet: Sineu, Inca och byarna på slätten',
    region: 'Inland',
    orter: [
      { namn: 'Sineu', href: '/sineu' },
      { namn: 'Inca', href: '/inca' },
    ],
    passarFor: ['lange', 'lugn', 'utanBil'],
    beskrivning:
      'Mitt på ön ligger småstäder och byar bland mandel- och olivodlingar. Här bor mallorkinerna, och här finns många fincor att hyra. Sineu har onsdagsmarknad, Inca torsdagsmarknad.',
    fordelar: [
      'Tåget går till Palma från både Inca och Sineu',
      'Lägre priser och mer lokalt liv än vid kusten',
      'Nära till hela ön – du kan nå både norra och södra kusten',
    ],
    nackdelar: [
      'Inget hav utanför dörren',
      'Lugnt på kvällarna',
      'Bil behövs för att ta sig till stränderna',
    ],
    quiz: {
      'nar:lange': { poang: 3, varfor: 'Lokalt vardagsliv och fincor att hyra för en längre tid.' },
      'gora:lugn': { poang: 2, varfor: 'Landsbygd bland mandel- och olivodlingar.' },
      'tempo:lugnt': { poang: 2 },
      'bil:nej': { poang: 1, varfor: 'Tåget går till Palma från både Inca och Sineu.' },
      'gora:aktiv': { poang: 1 },
    },
  },
  {
    id: 'sydvast',
    namn: 'Andratx och sydvästkusten',
    region: 'Sydväst',
    orter: [{ namn: 'Andratx', href: '/andratx' }],
    passarFor: ['par', 'familj'],
    beskrivning:
      'Port d’Andratx är en exklusiv hamn med segelbåtar och restauranger, och byn Andratx ligger lugnt i dalen ovanför. Närmare Palma ligger badorterna Santa Ponça och Palmanova med sandstränder och flygbuss.',
    fordelar: [
      'Nära Palma och flygplatsen',
      'Flygbuss (A11) året runt till badorterna längs kusten',
      'Fina solnedgångar över havet',
    ],
    nackdelar: [
      'Port d’Andratx har hög prisnivå',
      'Badorterna närmast Palma kan vara mycket livliga på sommaren',
      'Badorterna vid kusten har lite kvar av den gamla bykänslan',
    ],
    quiz: {
      'vilka:par': { poang: 2, varfor: 'Hamnen i Port d’Andratx är en klassiker för en middag i solnedgången.' },
      'vilka:familj': { poang: 1 },
      'gora:strand': { poang: 1 },
      'tempo:livligt': { poang: 1 },
      'tempo:lagom': { poang: 1 },
      'bil:nej': { poang: 1, varfor: 'Flygbussen A11 går året runt längs sydvästkusten.' },
      'nar:sommar': { poang: 1 },
    },
  },
];
