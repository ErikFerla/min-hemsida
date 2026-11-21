/**
 * EN datakälla för alla städer och byar på mymallorca.se.
 *
 * Allt som visas om en ort hämtas härifrån:
 *  - stadssidan /<slug> (app/[city]/page.tsx + app/[city]/CityTemplate.tsx)
 *  - metadata, canonical och JSON-LD (app/lib/city-seo.ts, app/lib/CityJsonLd.tsx)
 *  - kortet på /byar (app/byar/page.tsx)
 *  - kartan på startsidan (cityMapMarkers nedan)
 *  - sitemapen (app/sitemap.ts)
 *
 * En ny stad = ett nytt objekt i `cities`. Inget annat behöver ändras.
 * Uppdatera `updated` (ÅÅÅÅ-MM-DD) när sidans innehåll ändras – det blir lastmod i sitemapen.
 */

import type { Source } from '@/app/components/LastChecked';

export type CityRegion = 'Sydväst' | 'Nordväst' | 'Norr' | 'Inland' | 'Öst' | 'Syd';

/** Ett insidertips. Kan avslutas med en intern länk. */
export type CityTip = string | { text: string; link: { href: string; label: string } };

/** Ett textstycke i de utbyggda sektionerna. Kan avslutas med en intern länk, precis som CityTip. */
export type CityText = CityTip;

/** Ett sätt att ta sig till orten ("Ta sig dit"). */
export type CityTransport = {
  mode: 'Bil' | 'Buss' | 'Tåg' | 'Spårvagn' | 'Från flygplatsen' | 'Båt';
  text: CityText;
};

/**
 * Utbyggda, valfria sektioner (åtgärd 3.2). Varje sakuppgift ska vara kontrollerad mot
 * en källa i `sources` – skriv hellre mindre än gissa. Visas i den här ordningen i mallen.
 */
export type CityGuide = {
  /** "Bo": vilka delar/kvarter som passar vem. Inga hotellnamn eller bokningslänkar. */
  stay?: { intro?: string; areas: { name: string; text: string }[] };
  /** "Äta": typiska rätter och områden. */
  eat?: { intro: string; dishes?: string[]; tips?: CityText[] };
  /** "Ta sig dit": bil, buss, tåg och flygplatsen. */
  getThere?: CityTransport[];
  /** "Stränder i närheten": namnen måste finnas i data/beaches.ts (kontrolleras vid bygget). */
  beaches?: { names: string[]; text?: string };
  /** "Marknad": veckodag(ar) i `days`, detaljer i `text`. */
  market?: { days: string; text: CityText[] };
  /** "Bästa tid": kort, kopplat till ortens karaktär. */
  bestTime?: CityText[];
  /** "För barnfamiljer". */
  families?: CityText[];
  /** "För par". */
  couples?: CityText[];
};

export type City = {
  /** URL-segment: sidan ligger på /<slug>. */
  slug: string;
  /** Ortnamn med accent, t.ex. "Sóller". */
  name: string;
  region: CityRegion;
  lat: number;
  lng: number;
  /** Huvudort – större markör på kartan. */
  capital?: boolean;
  /** Senaste innehållsändring (ÅÅÅÅ-MM-DD) – lastmod i sitemapen. */
  updated: string;
  /** Prioritet i sitemapen (0–1). */
  sitemapPriority: number;
  /** Kort beskrivning för kartans popup och listan under kartan. */
  tagline: string;
  seo: {
    /** Titel utan sajtnamn. Standard: "<name> på Mallorca – reseguide". */
    title?: string;
    /** 120–160 tecken. Används i meta description, Open Graph och JSON-LD. */
    description: string;
  };
  hero: {
    /**
     * Bild som visar just den här orten: Commons-thumb-URL (…/1920px-Fil.jpg), Unsplash-URL utan
     * query string eller lokal fil (/bilder/…). Används även som OG-bild. Licens i data/credits/d1.ts.
     */
    image: string;
    alt: string;
    kicker: string;
    subtitle: string;
  };
  /** Brödtextstycken under "Om <name>". */
  about: string[];
  tips: CityTip[];
  /**
   * Tre höjdpunkter (t.ex. "Topp 3 i …"), visas som numrerad lista i högerspalten under
   * "Praktisk info". `variant` styr inte längre utseendet (5.4). Valfri.
   */
  highlights?: { variant: 'list' | 'cards'; heading: string; items: [string, string, string] };
  /** Rader i rutan "Praktisk info". */
  practical: { label: string; value: string }[];
  /** Sökfras till Google Maps-länken "Visa på karta". */
  mapsQuery: string;
  /**
   * Barnaktiviteter i eller precis vid orten (slugs i app/lib/barn-activities.ts, kontrolleras vid
   * bygget). Bara aktiviteter vars `location` nämner orten. Visas i rutan "Mer i närheten";
   * utan listan länkar rutan till /barn.
   */
  kidsNearby?: string[];
  /** Valfri ruta med kartlänkar till platser i orten. */
  places?: { heading: string; items: { text: string; href: string }[] };
  /** Utbyggda sektioner: bo, äta, ta sig dit, stränder, marknad, bästa tid, barnfamiljer, par. */
  guide?: CityGuide;
  /** Datum (ÅÅÅÅ-MM-DD) då uppgifterna senast kontrollerades mot källorna – visas i <LastChecked>. */
  checked?: string;
  /** De viktigaste källorna för sidans sakuppgifter. */
  sources?: Source[];
  /** Kortet på /byar. */
  card: {
    description: string;
    /** Kortbild (Commons-thumb 960px, Unsplash ?w=600 eller lokal fil). Licens i data/credits/d1.ts. */
    image: string;
    tip: string;
    top3: [string, string, string];
  };
};

/** Datum då ortsidornas uppgifter senast kontrollerades mot källorna (textgranskningen 8.1, 2026-11-20). */
const CHECKED = '2026-11-20';

export const cities: City[] = [
  {
    slug: 'palma-de-mallorca',
    name: 'Palma de Mallorca',
    region: 'Sydväst',
    lat: 39.5696,
    lng: 2.6502,
    capital: true,
    updated: CHECKED,
    sitemapPriority: 0.85,
    tagline: 'Huvudstaden med katedral, gamla stan och marknadshallar',
    seo: {
      title: 'Palma de Mallorca – komplett reseguide',
      description: 'Palma de Mallorca – huvudstaden med katedralen La Seu, gamla stans gränder, Santa Catalina och marknadshallarna. Bara 15 minuter från flygplatsen.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg/1920px-Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg',
      alt: 'Katedralen La Seu i Palma de Mallorca i kvällsljus, med stadsmuren och vattenspegeln i Parc de la Mar framför',
      kicker: 'Mallorcas hjärta · Huvudstaden',
      subtitle: 'Huvudstaden vid bukten med katedralen La Seu, gränderna i gamla stan och marknadshallen i Santa Catalina',
    },
    about: [
      'Palma är huvudstaden och den ort på ön som fungerar bäst året runt – museerna och restaurangerna har öppet även på vintern. Börja förmiddagen i marknadshallen i Santa Catalina, promenera eller cykla längs havet på Passeig Marítim och ät middag i gamla stan när dagsturisterna har åkt.',
      'Katedralen La Seu står på den gamla stadsmuren alldeles vid vattnet. Den började byggas efter erövringen 1229 och blev färdig först 1601, och från 1904 arbetade Antoni Gaudí med koret och kyrkorummet. Bakom katedralen tar gamla stan vid: smala gränder med stadspalats och innergårdar, små gallerier och restauranger med en handfull bord.',
    ],
    tips: [
      'Kom till La Seu när katedralen öppnar kl. 10 en vardag – då är kön kortast. På lördagar stänger den tidigare, och på söndagar är den stängd för turistbesök',
      'Santa Catalina-kvarteret är det bästa för mat och nattliv – gå dit på kvällen',
      'Promenera eller cykla längs Passeig Marítim i solnedgången',
      'Mercat de l’Olivar är bäst på fredags- och lördagsmorgon för färska råvaror',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Palma',
      items: [
        'Katedralen La Seu – gotisk katedral på den gamla stadsmuren vid vattnet',
        'Gamla stan (Casc Antic) – gå vilse i gränderna och hitta dolda barer',
        'Castell de Bellver – bästa utsikten över Palma, kom sent på eftermiddagen (stängt måndagar)',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Sydvästra Mallorca, huvudstad' },
      { label: 'Flyg', value: '15 min från PMI-flygplatsen' },
      { label: 'Bästa tid', value: 'Maj, juni, september' },
      { label: 'Känd för', value: 'La Seu, gamla stan, restauranger' },
      { label: 'Stränder i närheten', value: 'Platja de Palma, Cala Major' },
    ],
    guide: {
      getThere: [
        { mode: 'Från flygplatsen', text: 'Stadsbussen EMT A1 går mellan flygplatsen och centrum, bland annat Plaça d’Espanya, ungefär var 15:e minut dagtid. Resan tar ca 20 min och kostar ca 5 € kontant (2026). Taxi finns utanför ankomsthallen.' },
        { mode: 'Buss', text: 'Estació Intermodal under Plaça d’Espanya är navet för TIB-bussarna ut på ön. Härifrån når du i stort sett alla orter på den här sajten, ofta utan byte.' },
        { mode: 'Tåg', text: 'Från Estació Intermodal går tågen till Inca, Sa Pobla och Manacor. Det historiska trätåget till Sóller avgår från en egen station alldeles intill.' },
        { mode: 'Bil', text: 'Ringleden Ma-20 runt staden ansluter till motorvägarna mot flygplatsen, mot Inca och Alcúdia (Ma-13) och mot Andratx (Ma-1). I centrum är gatorna smala och parkering kostar – lämna hellre bilen i ett parkeringshus och gå.' },
      ],
      stay: {
        intro: 'Palma är stort nog för att valet av kvarter ska spela roll. Så här skiljer sig de vanligaste områdena åt:',
        areas: [
          { name: 'Gamla stan (Casc Antic).', text: 'Mitt bland katedralen, gränderna och restaurangerna. Här finns små hotell i gamla stadspalats och lägenheter. Passar par och dig som vill gå överallt – men räkna inte med parkering.' },
          { name: 'Santa Catalina.', text: 'Restaurang- och barkvarteret väster om centrum, runt marknadshallen. Mest lägenheter och mindre hotell. Bra för matintresserade och för dig som vill ha kvällslivet nära.' },
          { name: 'Portixol och Es Molinar.', text: 'Gamla fiskarkvarter öster om centrum med strandpromenad, små stränder och restauranger vid vattnet. Lugnare än gamla stan, och du kan promenera eller cykla längs havet in till katedralen. Fungerar för både par och familjer.' },
          { name: 'Platja de Palma och Can Pastilla.', text: 'Den långa stadsstranden öster om staden, nära flygplatsen, med stora strandhotell och lägenhetshotell. Praktiskt för barnfamiljer som vill ha både sand och stad. Den östra delen mot S’Arenal är känd för festturism.' },
        ],
      },
      eat: {
        intro: 'Palma är öns matstad, med allt från marknadshallar och enkla tapasbarer till kockdrivna restauranger. Börja med de mallorkinska klassikerna:',
        dishes: [
          'Pa amb oli – rostat bröd med tomat, olivolja och ost eller lufttorkad skinka',
          'Ensaïmada – det spiralformade bakverket som mallorkinerna äter till frukost',
          'Sobrassada – kryddig, bredbar korv med paprika, gärna med honung',
          'Tumbet – gratäng av aubergine, potatis och paprika i tomatsås',
        ],
        tips: [
          'Marknadshallarna Mercat de l’Olivar och Mercat de Santa Catalina är perfekta för lunch: köp råvaror eller ät vid barerna mellan stånden.',
          { text: 'Konkreta restaurangtips har vi samlat i en egen guide.', link: { href: '/guide/basta-restauranger-palma', label: 'Bästa restaurangerna i Palma →' } },
        ],
      },
      beaches: {
        names: ['Platja de Palma', 'Cala Xinxell'],
        text: 'Närmast staden ligger den långa Platja de Palma. Vill du hellre ha en liten vik med klart vatten finns Cala Xinxell vid Illetes, en kort bit väster om Palma.',
      },
      market: {
        days: 'Marknadshallar måndag–lördag · gatumarknad tisdag, torsdag och lördag',
        text: [
          'Mercat de l’Olivar och Mercat de Santa Catalina har öppet måndag till lördag från tidig morgon till tidig eftermiddag och är stängda på söndagar. Kom på förmiddagen, då är utbudet störst.',
          'Gatumarknaden på Plaça de Pere Garau, öster om centrum, hålls tisdagar, torsdagar och lördagar.',
        ],
      },
      bestTime: [
        'Palma är en stad för hela året. Våren och hösten är bäst för långa promenader i gamla stan, medan högsommaren kan vara het och trång kring katedralen mitt på dagen.',
        { text: 'Vintern är lugn och mild med öppna museer och restauranger – ett bra tillfälle för en ren stadsresa.', link: { href: '/vader', label: 'Vädret just nu →' } },
      ],
      families: [
        { text: 'Palma Aquarium vid Platja de Palma är stadens stora barnfavorit, och det fungerar även en regnig dag.', link: { href: '/barn/djurparker-och-akvarier#palma-aquarium', label: 'Om Palma Aquarium →' } },
        'Castell de Bellver är en rund borg med vallgrav som barn brukar gilla, och från taket ser ni hela bukten. April–september är det öppet tisdag–lördag 10–19 och söndag 10–15, stängt på måndagar.',
        { text: 'Regnig dag? CaixaForum och konstmuseet Es Baluard har aktiviteter för barn.', link: { href: '/barn/inomhus-och-regn', label: 'Inomhus och regn →' } },
      ],
      couples: [
        'Ta en kvällspromenad längs havet från katedralen mot Portixol, ät middag i Santa Catalina och gå tillbaka genom gamla stan när dagsturisterna har åkt hem.',
        { text: 'Tåget mot Inca stannar i Binissalem, centrum för vinodlingen i inlandet – en enkel halvdagstur utan bil.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'Palma Airport info: buss A1', href: 'https://www.palmaairport.info/taking-the-bus-from-palma-airport' },
      { label: 'TIB: tåglinje T1', href: 'https://www.tib.org/ca/linies-i-horaris/metro/-/linia/T1' },
      { label: 'Mallorca.com: Mercat de l’Olivar', href: 'https://www.mallorca.com/es/eventos/mercados/mercat-de-lolivar' },
      { label: 'Mallorca.com: Mercat de Santa Catalina', href: 'https://www.mallorca.com/es/eventos/mercados/mercat-de-santa-catalina' },
      { label: 'Mercadillos.org: marknader på tisdagar', href: 'https://mercadillos.org/es/mallorca/martes' },
      { label: 'Visit Palma: Castell de Bellver', href: 'https://visitpalma.com/es/dir/castillo-de-bellver/' },
      { label: 'Catedral de Mallorca: öppettider', href: 'https://catedraldemallorca.org/en/visits/opening-hours/' },
      { label: 'Gran Enciclopèdia Catalana: catedral de Mallorca', href: 'https://www.enciclopedia.cat/gran-enciclopedia-catalana/catedral-de-mallorca' },
      { label: 'Fundación Antoni Gaudí: Gaudí, restorer of the Cathedral of Mallorca', href: 'https://en.fundacionantoniogaudi.org/gaudi-restorer-the-cathedral-of-mallorca/' },
    ],
    mapsQuery: 'Palma+de+Mallorca',
    kidsNearby: ['palma-aquarium', 'castell-de-bellver', 'palma-jump'],
    places: {
      heading: 'På kartan',
      items: [
        { text: 'La Seu – katedralen', href: 'https://maps.google.com/?q=La+Seu+Catedral+de+Mallorca+Palma' },
        { text: 'Castell de Bellver', href: 'https://maps.google.com/?q=Castell+de+Bellver+Palma' },
        { text: "Mercat de l'Olivar", href: 'https://maps.google.com/?q=Mercat+de+l%27Olivar+Palma' },
      ],
    },
    card: {
      description: 'Huvudstaden med katedralen La Seu, gränderna i gamla stan och marknadshallarna',
      image: '/bilder/palma/david-vives-12cqhQNVUIg-unsplash.jpg',
      tip: 'Bästa utsikten från Castell de Bellver',
      top3: ['Katedralen La Seu', 'Gamla stan (Casc Antic)', 'Castell de Bellver'],
    },
  },
  {
    slug: 'soller',
    name: 'Sóller',
    region: 'Nordväst',
    lat: 39.767,
    lng: 2.7153,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Småstad i apelsindalen med tåg från Palma',
    seo: {
      description: 'Sóller – småstad i Tramuntana med apelsinlundar, lördagsmarknad, spårvagn ner till hamnen och vandringen till Biniaraix. Tåget vilar till 31 januari.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Vista_de_S%C3%B3ller.jpg/1920px-Vista_de_S%C3%B3ller.jpg',
      alt: 'Sóller med kyrktornet och stenhusen i dalen under Serra de Tramuntanas berg',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Småstad i Sóllerdalen bland apelsinlundar, med trätåget från Palma och spårvagnen ner till havet',
    },
    about: [
      'Sóller ligger i en dal omgiven av Tramuntanabergen. Under 1800-talet skeppades dalens apelsiner från hamnen till Marseille och Sète, många sóllerbor flyttade till Frankrike, och pengarna som kom tillbaka syns i de modernistiska husen runt torget.',
      'Trätåget från Palma har gått sedan 1912 och tar ungefär en timme (utom under vinteruppehållet). Spårvagnen tar dig sedan på en halvtimme ner till Port de Sóller. Kom en lördagsförmiddag, när marknaden fyller torget, och ät middag i hamnen.',
    ],
    tips: [
      'Ta det historiska trätåget från Palma och köp biljett i förväg på sommaren. Vintern 2026/27 står tåget still 23 november–31 januari',
      'Kom en lördagsförmiddag, då fyller veckomarknaden torget Plaça de la Constitució',
      'Vandringen till grannbyn Biniaraix är en av öns bästa korta leder',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Sóller',
      items: [
        'Historiska spårvagnen ner till Port de Sóller – åk tur och retur',
        'Apelsinlundarna – köp färskpressad juice direkt från bönderna',
        'Firó-festivalen i maj – unikt historiskt skådespel på gatorna',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 30 km från Palma' },
      { label: 'Tåg', value: 'Från Palma (Ferrocarril de Sóller)' },
      { label: 'Bästa tid', value: 'April–juni, september' },
      { label: 'Känd för', value: 'Spårvagn, apelsiner, Tramuntana' },
      { label: 'Stränder i närheten', value: 'Port de Sóller, Platja d’en Repic' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tren de Sóller har gått mellan Palma och Sóller sedan 1912 och tar ungefär en timme genom bergen. Det är en upplevelse snarare än en transport: enkel resa kostar ca 23 € (2026), och sommartid blir tågen fulla – åk tidigt eller sent på dagen. Vintern 2026/27 står tåget still för underhåll från 23 november 2026 och går igen från 1 februari 2027; då tar du TIB-buss 204 från Palma.' },
        { mode: 'Buss', text: 'TIB-linje 204 är det snabba och billiga alternativet: den går från Palma via Ma-11 och tunneln till Sóller och vidare till Port de Sóller. Linje 203 tar den vackra vägen via Valldemossa och Deià. Sommartid går också linje 231 från Port de Sóller över bergen via Lluc och Pollença till Alcúdia.' },
        { mode: 'Bil', text: 'Ma-11 från Palma går genom Sóllertunneln och är den snabbaste vägen. Den slingriga bergsvägen Ma-10 förbinder Sóller med Deià och Valldemossa åt ena hållet och Lluc åt andra. Parkering i centrum är begränsad – ställ bilen i utkanten.' },
        { mode: 'Från flygplatsen', text: 'Det finns ingen direktbuss. Ta buss A1 in till Palma och byt till buss 204 eller tåget vid Plaça d’Espanya.' },
        { mode: 'Spårvagn', text: 'Den gamla spårvagnen går genom Sóllers centrum ner till Port de Sóller – ett enkelt sätt att ta sig mellan byn och havet.' },
      ],
      stay: {
        intro: 'De flesta väljer mellan byn och hamnen – de ligger nära varandra och binds ihop av spårvagnen.',
        areas: [
          { name: 'Sóller centrum.', text: 'Små hotell i gamla stadshus runt torget Plaça de la Constitució. Passar par och dig som vill ha bylivet, kaféerna och vandringslederna utanför dörren.' },
          { name: 'Dalen runt byn.', text: 'Agroturismer och fincor bland apelsin- och olivlundar. Lugnast av allt, men du behöver bil eller ben som tål backar.' },
          { name: 'Port de Sóller.', text: 'Hotell och lägenheter längs den skyddade viken. Bäst för barnfamiljer och för dig som vill bada varje dag – och se solen gå ned över viken.' },
        ],
      },
      eat: {
        intro: 'Sóller lever på sin dal och sitt hav. Apelsinerna och citronerna från lundarna runt byn dyker upp överallt, från färskpressad juice på torget till glass och marmelad.',
        dishes: [
          'Färskpressad apelsinjuice från dalens egna frukter – beställ den på torget',
          'Fisk och skaldjur i Port de Sóller, där fiskebåtarna fortfarande lägger till',
          'Pa amb oli och ensaïmada på kaféerna runt torget',
        ],
        tips: ['Ät gärna lunch i byn och middag nere i hamnen – då får du både torglivet och solnedgången.'],
      },
      beaches: {
        names: ['Port de Sóller', 'Sa Calobra', 'Cala Tuent'],
        text: 'Närmast ligger sandstranden i Port de Sóller, med lugnt vatten i den skyddade viken. Längre norrut ligger Sa Calobra och Cala Tuent, som du når med bil via bergsvägen Ma-10 och de branta avtagsvägarna ner mot havet.',
      },
      market: {
        days: 'Lördagar, förmiddag',
        text: ['Veckomarknaden fyller torget Plaça de la Constitució och gatorna runt omkring på lördagar på förmiddagen. Här finns frukt och grönt från dalen, oliver, ostar och hantverk. Kombinera gärna med en tur med spårvagnen.'],
      },
      bestTime: [
        'Våren är Sóllers bästa tid: dalen är grön, apelsinträden blommar och det är behagligt att vandra. I maj firas Firó, då byn spelar upp ett historiskt slag mot pirater på gatorna.',
        'Hösten är också fin för vandring. Under högsommaren blir tåget och bergsvägen fulla av dagsturister – bo gärna kvar över natten, så har du byn för dig själv på morgonen och kvällen.',
      ],
      families: [
        'Tåget genom bergen och spårvagnen ner till havet är ett äventyr i sig för barn. Viken i Port de Sóller är skyddad med lugnt vatten, och stranden passar mindre barn.',
        { text: 'Fler idéer för barnfamiljer över hela ön hittar du i vår barnguide.', link: { href: '/guide/mallorca-med-barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Ta trätåget ena vägen och bussen tillbaka, promenera ut till bergsbyarna Biniaraix och Fornalutx och avsluta med middag i hamnen när solen går ned över viken.',
      ],
    },
    checked: '2026-11-20',
    sources: [
      { label: 'Fibwi Diario: Sóllertågets och spårvagnens vinteruppehåll 2026/27', href: 'https://www.fibwidiario.com/baleares/mallorca/tren-tranvia-soller-paran-lunes-son-fechas-regreso/20261118112127327898.html' },
      { label: 'Wikipedia: Ferrocarril de Sóller', href: 'https://en.wikipedia.org/wiki/Ferrocarril_de_S%C3%B3ller' },
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'TIB: sommartidtabeller 2026 (linje 204 och 231)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Mercadillos.org: marknaden i Sóller', href: 'https://mercadillos.org/mercadillo-soller' },
      { label: 'Gran Enciclopèdia Catalana: Sóller', href: 'https://www.enciclopedia.cat/gran-enciclopedia-catalana/soller-0' },
      { label: 'Cercles (Universitat de Barcelona): emigrationen från Sóller', href: 'https://revistes.ub.edu/index.php/cercles/article/download/16513/19478' },
    ],
    mapsQuery: 'Soller+Mallorca',
    kidsNearby: ['tren-de-soller', 'jardi-botanic-de-soller'],
    card: {
      description: 'Småstad bland apelsinlundar, med trätåg från Palma och spårvagn ner till havet',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Vista_de_S%C3%B3ller.jpg/960px-Vista_de_S%C3%B3ller.jpg',
      tip: 'Ta spårvagnen till Port de Sóller',
      top3: ['Historiska spårvagnen', 'Apelsinlundarna', 'Firó-festivalen i maj'],
    },
  },
  {
    slug: 'porto-colom',
    name: 'Porto Colom',
    region: 'Öst',
    lat: 39.4181,
    lng: 3.2628,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Fiskeby kring en stor naturhamn',
    seo: {
      description: 'Porto Colom på östkusten – fiskeby vid en stor naturhamn, med båthusen längs kajen, dagens fisk på krogarna vid hamnen och Cala Marçal för barnen.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Hafen_Porto_Colom_Mallorca.jpg/1920px-Hafen_Porto_Colom_Mallorca.jpg',
      alt: 'Hamnen i Porto Colom med fiskebåtar i den skyddade naturhamnen',
      kicker: 'Östkusten · Mallorca',
      subtitle: 'Fiskeby i Felanitx kommun, med båthus längs en stor och skyddad naturhamn',
    },
    about: [
      'Porto Colom är en fiskeby där folk bor året runt, inte bara en semesterort. Fiskebåtarna ligger kvar vid kajen, husen är låga och vita, och de flesta restaurangerna finns längs hamnen eller en gata in. Byn hör till Felanitx kommun och ligger ca 13 km från staden, så det är lätt att kombinera med söndagsmarknaden där.',
      'Naturhamnen är stor och skyddad, och längs vattnet står hus i ockra och rosa. Titta efter escars, de gamla båthusen med valvtak där fiskarna drar upp sina träbåtar – de är skyddade som kulturarv. Kom tidigt på morgonen, när fiskebåtarna kommer in till kajen.',
      'Den äldsta delen av byn ligger på en udde i hamnen. Längst ut vid inloppet står fyren på Punta de ses Crestes, som tändes första gången 1863. Dit går du längs Carrer del Far från hamnen.',
    ],
    tips: [
      'Gå gärna en gata in från hamnen – där är det ofta lugnare och billigare',
      'Den lilla veckomarknaden hålls på Plaça del Comerç på tisdag- och lördagsförmiddagar',
      'Gå ut till fyren på Punta de ses Crestes en kväll – därifrån ser du hela naturhamnen och byn',
      'Parkera vid kyrkan – parkeringen vid hamnen är alltid full',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Porto Colom',
      items: [
        'Naturhamnen – en av Mallorcas vackraste, perfekt för kvällspromenad',
        'Dagens fisk på krogarna vid hamnen – fråga efter ”el peix del dia”',
        'Cala Marçal – fin sandstrand precis utanför byn',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Östkusten, 60 km från Palma' },
      { label: 'Bil', value: 'Ca 50 min från Palma' },
      { label: 'Bästa tid', value: 'Maj–oktober' },
      { label: 'Känd för', value: 'Fiske, autentisk atmosfär' },
      { label: 'Stränder i närheten', value: 'Cala Marçal, Cala Sa Nau' },
    ],
    guide: {
      stay: {
        intro: 'Porto Colom är litet, så de flesta bor nära vattnet. Välj efter om du vill ha hamnen eller stranden närmast:',
        areas: [
          { name: 'Kring hamnen.', text: 'Lägenheter och små hotell längs naturhamnen och i den gamla delen av byn. Promenadavstånd till restaurangerna och kvällspromenaden längs kajen. Passar par.' },
          { name: 'Cala Marçal.', text: 'Bostadsområdet söder om hamnen, runt byns största sandstrand. Det enklaste valet för barnfamiljer som vill gå till stranden.' },
          { name: 'Felanitx och landsbygden.', text: 'Fincor och lägenheter i inlandet, ca 13 km bort. Lugnare och närmare vingårdarna, men du behöver bil.' },
        ],
      },
      eat: {
        intro: 'Fisk och skaldjur är det självklara valet i Porto Colom. Restaurangerna ligger längs hamnen och i gatorna bakom – fråga efter dagens fångst. Annars äter du mallorkinsk husmanskost:',
        dishes: [
          'Dagens fisk – grillad eller ugnsbakad, ofta med potatis och grönsaker',
          'Arròs brut – mallorkinsk kryddig risgryta med kött och grönsaker',
          'Frit mallorquí – stekt lamm- eller grisinnanmat med potatis, paprika och fänkål',
          'Ensaïmada – det spiralformade bakverket, till frukost på ett kafé vid hamnen',
        ],
      },
      getThere: [
        { mode: 'Bil', text: 'Kör via Felanitx, som ligger en kort bit inåt land, och vidare på Ma-4010 ner till kusten, ca 13 km. Parkeringen vid hamnen fylls snabbt – ställ bilen en bit upp i byn.' },
        { mode: 'Buss', text: 'TIB-linje 512 går mellan Porto Colom och Felanitx. I Felanitx byter du till linje 501, som går via Campos och Llucmajor till Palma åt ena hållet och till Manacor åt det andra. På vardagar finns dessutom en tidig direkttur till Palma på linje 512.' },
      ],
      beaches: {
        names: ['Cala Marçal', 'Cala Sa Nau'],
        text: "Cala Marçal är byns största sandstrand, med lugnt, barnvänligt vatten och service – den största och mest lättillgängliga stranden i Felanitx kommun. Nära hamnen ligger de två små och lugnare stränderna s'Arenal Gran och s'Arenal Petit. Cala Sa Nau, söderut mot Cala d'Or, är en liten vik med klart vatten. Den orörda Cala Brafi, ca 2,5 km söder om byn, når du bara till fots eller från sjön.",
      },
      market: {
        days: 'Tisdagar och lördagar, förmiddag',
        text: [
          'Den lilla veckomarknaden hålls på Plaça del Comerç på tisdag- och lördagsförmiddagar, med frukt, grönt, kläder och vardagsvaror.',
          { text: 'Den stora söndagsmarknaden i Felanitx ligger en kort biltur bort.', link: { href: '/felanitx', label: 'Felanitx →' } },
        ],
      },
      bestTime: [
        'Maj–oktober för bad. Porto Colom är en fiskeby där folk bor året runt, så den har liv även utanför högsäsongen. En tidig morgon vid hamnen är bästa sättet att uppleva den.',
        'Kring den 16 juli firar byn fiskarnas skyddshelgon Mare de Déu del Carme, med bland annat en kvällsmarknad vid hamnen. Då är Porto Colom som livligast.',
      ],
      families: [
        'Cala Marçal har sand, lugnt vatten och service på stranden – byns bästa val med små barn. Promenaden ut mot fyren går längs hamnen och är lagom lång för barn som orkar gå en stund; titta på båthusen och fiskebåtarna på vägen.',
        { text: 'Fler idéer för barnfamiljer hittar du i vår barnguide.', link: { href: '/barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Kvällspromenad längs naturhamnen, middag med dagens fisk och en tidig morgon vid fyren innan värmen kommer – Porto Colom är gjort för långsamma dagar.',
        { text: 'Kombinera gärna med en eftermiddag på en vingård kring Felanitx.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: Porto Colom–Felanitx', href: 'https://www.tib.org/en/linies-i-horaris/autobus/-/linia/512' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'TIB: expressturer från Porto Colom och Campos', href: 'https://www.tib.org/en/w/tib-improves-the-bus-connection-with-the-joan-march-hospital-and-adds-express-services-to-palma-from-portocolom-and-campos' },
      { label: 'Mercadillos.org: marknaden i Porto Colom', href: 'https://mercadillos.org/es/portocolom/mercadillo-portocolom' },
      { label: 'Mercadillos.org: Feria Marinera 16 juli', href: 'https://mercadillos.org/es/portocolom/feria-marinera-portocolom' },
      { label: 'Reskyt (Felanitx): marknader', href: 'https://reskyt.com/en/administration/felanitx/fairs-festivals-and-markets/markets/164001.html' },
      { label: 'Mallorca.com: fyren på Punta de ses Crestes', href: 'https://www.mallorca.com/en/guide/sights/punta-de-ses-crestes' },
      { label: 'Mallorca.com: Cala Marçal', href: 'https://www.mallorca.com/ca/guia/playas/cala-marcal' },
      { label: 'Mallorca.com: Cala Brafi', href: 'https://www.mallorca.com/ca/guia/playas/cala-brafi' },
      { label: 'Ultima Hora: båthusen (escars) i hamnen', href: 'https://www.ultimahora.es/noticias/part-forana/2018/07/28/1016099/renovacion-concesiones-escars-portocolom-obliga-restaurarlos.html' },
    ],
    mapsQuery: 'Porto+Colom+Mallorca',
    card: {
      description: 'Fiskeby med båthus längs en stor naturhamn och sandstranden Cala Marçal',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Hafen_Porto_Colom_Mallorca.jpg/960px-Hafen_Porto_Colom_Mallorca.jpg',
      tip: 'Fiskebåtarna kommer in till kajen på morgonen',
      top3: ['Naturhamnen', 'Fiskebåtarna på morgonen', 'Kvällspromenaden längs vattnet'],
    },
  },
  {
    slug: 'santanyi',
    name: 'Santanyí',
    region: 'Syd',
    lat: 39.358,
    lng: 3.1273,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Marknadsby i gul sandsten',
    seo: {
      description: 'Santanyí i södra Mallorca – honungsgul sandsten, marknad på onsdagar och lördagar, konstgallerier och Cala Llombards en kort biltur söderut.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Mallorca-Santany%C3%AD_%28city%29-14.jpg/1920px-Mallorca-Santany%C3%AD_%28city%29-14.jpg',
      alt: 'Åkrar och lantbruksmark vid Santanyí en mulen dag, med byns hustak vid horisonten',
      kicker: 'Södra Mallorca · Marknadsby',
      subtitle: 'Marknadsby i gul sandsten, med marknad onsdag och lördag och en kort biltur till Cala Llombards',
    },
    about: [
      'Santanyí är byggd i marès, den gulbruna sandsten som ger husen, kyrkan och arkaderna runt torget deras färg. Byn lever året runt med kaféer, gallerier och hantverksbutiker, och den är en bra bas för hela sydöstra hörnet – vikarna ligger en kort biltur bort.',
      'På onsdagar och lördagar fyller marknaden torget och gränderna runt kyrkan med grönsaker, ost och korv, keramik, korgar och konsthantverk. Parkera i utkanten och kom tidigt. På sommaren ger arkaderna skugga när du tar kaffet på torget efteråt.',
    ],
    tips: [
      'Onsdagsmarknaden är bättre än lördagens – mindre folk, fler som bor här',
      'Cala Llombards, en kort biltur söderut, är en av öns vackraste vikar – kom tidigt, parkeringen är liten',
      'Beställ ”pa amb oli” på baren vid kyrkan – en klassisk mallorkinsk smårätt',
    ],
    practical: [
      { label: 'Plats', value: 'Södra Mallorca, ca 55 km från Palma' },
      { label: 'Bil', value: 'Ca 55 min från Palma' },
      { label: 'Marknad', value: 'Onsdag och lördag förmiddag' },
      { label: 'Känd för', value: 'Marknad, sandstensarkitektur' },
      { label: 'Stränder i närheten', value: 'Cala Llombards, Cala Santanyí' },
    ],
    guide: {
      getThere: [
        { mode: 'Bil', text: 'Ta Ma-19 från Palma förbi flygplatsen och Llucmajor och vidare via Campos till Santanyí. Med bil är det enkelt att nå vikarna längs kusten – men parkeringarna vid de populäraste fylls tidigt på sommaren.' },
        { mode: 'Buss', text: 'TIB:s expresslinje 515e går mellan Palma och Santanyí och vidare till Portopetro och Cala d’Or, utan byte i Campos. Övriga förbindelser går via Campos, med byte till linje 501 mot Palma. Expresslinjen går främst under sommarsäsongen – se aktuell tidtabell på tib.org; utbudet är också mindre på helger.' },
        { mode: 'Från flygplatsen', text: 'Flygplatsen ligger på vägen söderut, så med hyrbil är du snabbt framme. Med buss tar du dig först in till Palma.' },
      ],
      stay: {
        intro: 'Santanyí är en bra bas för hela sydöstra hörnet. Välj efter om du vill ha byliv eller havsutsikt:',
        areas: [
          { name: 'Santanyí by.', text: 'Små hotell och lägenheter i sandstenshusen runt torget. Levande året runt, med kaféer, gallerier och marknad. Passar par och dig som har bil för stranddagarna.' },
          { name: 'Kustorterna.', text: 'Cala Figuera med sin lilla fiskehamn, Cala Santanyí och Cala d’Or längre norrut har hotell och lägenheter nära vattnet. Bättre för barnfamiljer som vill gå till stranden.' },
          { name: 'Landsbygden.', text: 'Agroturismer och fincor mellan mandel- och olivlundarna. Lugnt och vackert, men bil är ett måste.' },
        ],
      },
      eat: {
        intro: 'Runt torget finns kaféer och restauranger där du kan sitta under arkaderna och se byn passera, och marknadsdagarna är det bästa tillfället att handla ost, korv, oliver och olivolja direkt från producenterna. Ute vid kusten väntar fisk och skaldjur.',
      },
      beaches: {
        names: ['Caló des Moro', 'Cala Llombards', 'Cala Mondragó / s\'Amarador', 'Es Trenc'],
        text: 'Några av Mallorcas mest kända vikar ligger bara en kort biltur från byn. Cala Mondragó ligger i ett naturreservat och har grunt vatten, medan Caló des Moro kräver en promenad och blir snabbt full. Es Trenc ligger en bit västerut.',
      },
      market: {
        days: 'Onsdagar och lördagar, förmiddag',
        text: ['Marknaden fyller torget och gränderna runt kyrkan två gånger i veckan. Här blandas grönsaker, ost och korv med keramik, korgar, kläder och konsthantverk. Den är populär – parkera i utkanten och kom tidigt.'],
      },
      bestTime: [
        'Maj, juni och september är bäst: varmt nog för bad i vikarna men utan högsommarens kamp om parkeringsplatserna. På vintern är byn lugn, men den lever även utanför badsäsongen.',
      ],
      families: [
        'Välj stränder med grunt vatten och enkel väg ner, som Cala Mondragó. Caló des Moro passar sämre med små barn – dit får ni gå en bit och det finns ingen service.',
        { text: 'Fler familjestränder hittar du på strandsidan, där du kan filtrera på barnvänligt.', link: { href: '/strandar', label: 'Stränder på Mallorca →' } },
      ],
      couples: [
        'Marknadsförmiddag i byn, en eftermiddag i en vik och middag i Cala Figueras lilla hamn – Santanyí är som gjort för en långsam vecka för två.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: ny expresslinje 515e', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-d-or-amb-palma-a-partir-de-dimarts-24-de-juny' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'Mercadillos.org: marknaden i Santanyí', href: 'https://mercadillos.org/en/santanyi/santanyi-market' },
    ],
    mapsQuery: 'Santany%C3%AD+Mallorca',
    kidsNearby: ['parc-natural-de-mondrago'],
    card: {
      description: 'Marknadsby i gul sandsten med marknad onsdag och lördag, nära Cala Llombards',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Mallorca-Santany%C3%AD_%28city%29-14.jpg/960px-Mallorca-Santany%C3%AD_%28city%29-14.jpg',
      tip: 'Onsdagsmarknaden är bättre än lördagsmarknaden',
      // Våg 1 ersatte "(5 min)" med "en kort biltur" på stadssidan – samma här.
      top3: ['Onsdagsmarknaden', 'Cala Llombards (kort biltur)', 'Gallerierna i gamla stan'],
    },
  },
  {
    slug: 'porto-petro',
    name: 'Portopetro',
    region: 'Syd',
    lat: 39.3639,
    lng: 3.2111,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'Liten hamnby vid Mondragó',
    seo: {
      description: 'Portopetro i södra Mallorca – lugn marinaby med segelbåtar, kajak i viken på morgonen och Cala Mondragó med naturparken en kort biltur bort.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Portopetro_Bay_01.jpg/1920px-Portopetro_Bay_01.jpg',
      alt: 'Klippkusten vid inloppet till Portopetro med fyren och strandpromenaden',
      kicker: 'Sydkusten · Mallorca',
      subtitle: 'Liten hamnby i sydost med skyddad vik, segelbåtar och Mondragó intill',
    },
    about: [
      'Portopetro är en liten hamnby i Santanyí kommun, byggd kring en skyddad vik där fiskebåtar och segelbåtar delar på hamnbassängen. Kvällslivet består av ett par restauranger och en bar längs kajen och promenaden runt viken.',
      "Vattnet i viken är klart och oftast stilla, och tallskogen går ner mot klipporna. Paddla kajak på morgonen, ät dagens fisk på kajen och se solen gå ned med ett glas cava. Vill du ha mer utbud ligger Cala d'Or strax norrut.",
      "Direkt söder om byn börjar Mondragó naturpark. Kustpromenaden dit går längs klipporna till Cala Mondragó och s'Amarador, där vattnet är grunt och passar barn.",
    ],
    tips: [
      'Paddla kajak runt viken på morgonen – vattnet är spegelblankt',
      'Cala Mondragó ligger en kort biltur bort – hyr ett parasoll och ta en öl i baren vid stranden',
      'Parkera ute vid landsvägen och promenera ner – det sparar frustration',
      'Ett glas cava på kajen i solnedgången är det bästa du kan göra i Portopetro',
    ],
    practical: [
      { label: 'Plats', value: 'Sydkusten, 65 km från Palma' },
      { label: 'Bil', value: 'Ca 55 min från Palma' },
      { label: 'Bästa tid', value: 'Maj–september' },
      { label: 'Känd för', value: 'Marinan, lugn, snorkling' },
      { label: 'Stränder i närheten', value: 'Cala Mondragó, Cala Egos' },
    ],
    guide: {
      stay: {
        intro: 'Portopetro är litet, så valet står mellan byn och grannorterna:',
        areas: [
          { name: 'Portopetro by.', text: 'Lägenheter och några hotell kring hamnen och på höjderna runt viken. Tyst på kvällarna och nära Mondragó. Passar par och dig som vill ha lugn.' },
          { name: 'Cala d\'Or.', text: 'Grannorten norrut har betydligt fler hotell, restauranger och små sandvikar. Bättre om ni vill ha mer liv, eller om barnen vill ha stranden runt hörnet.' },
          { name: 'Santanyí och landsbygden.', text: 'Sandstenshus och fincor i inlandet. En bra bas för hela sydöstra hörnet, men du behöver bil.' },
        ],
      },
      eat: {
        intro: 'Restaurangerna ligger samlade längs kajen, och fisk och skaldjur dominerar. Ställena är få, så boka bord på sommarkvällarna eller ät tidigt. Vill du ha större utbud finns det i Cala d\'Or och Santanyí. Typiskt på menyn:',
        dishes: [
          'Dagens fisk – grillad eller bakad i salt',
          'Arròs negre – ris med bläckfisk, färgat svart av bläcket',
          'Pa amb oli – rostat bröd med tomat, olivolja och ost eller lufttorkad skinka, en klassisk lunch',
        ],
      },
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 515e går mellan Palma och Cala d\'Or och stannar i Santanyí, S\'Alqueria Blanca, Portopetro och Cala Egos. Under sommarsäsongen går också linje 521 mellan Cala d\'Or och Cala Mondragó via Portopetro. Flera linjer går bara på sommaren – kontrollera på tib.org att linjen går när du reser.' },
        { mode: 'Bil', text: 'Ta Ma-19 från Palma via Llucmajor och Campos mot Santanyí och fortsätt mot Cala d\'Or. Parkera ovanför hamnen och promenera ner.' },
      ],
      beaches: {
        names: ['Cala Mondragó / s\'Amarador', 'Cala Ferrera', 'Caló des Moro'],
        text: 'Cala Mondragó och s\'Amarador i naturparken söder om byn har grunt, barnvänligt vatten och nås med bil, sommarbuss eller till fots längs kusten. Norrut ligger vikarna i Cala d\'Or, och Caló des Moro nås via Santanyí.',
      },
      market: {
        days: 'Onsdagar och lördagar i Santanyí',
        text: [
          { text: 'Portopetro har ingen egen veckomarknad. Närmast är marknaden i Santanyí på onsdagar och lördagar.', link: { href: '/santanyi', label: 'Santanyí →' } },
        ],
      },
      bestTime: [
        'Maj, juni och september – varmt, lugnt och ljust långt in på kvällen. Portopetro är en stilla marinaby, så den passar dig som vill undvika högsommarens fester och trängsel.',
        'I slutet av juni firar byn Sant Joan med fest i flera dagar, och många av aktiviteterna är gratis.',
      ],
      families: [
        'Mondragó naturpark är den stora utflykten: grunt vatten i Cala Mondragó och s\'Amarador, en picknickplats och flera skyltade promenadslingor. Informationscentret vid parkeringen ses Fonts de n\'Alis kan tipsa om vilken slinga som passar era barn – kontrollera öppettiderna. Barnvagn går bra till stränderna men inte på stigarna.',
        { text: 'Mondragó finns med i vår barnguide bland utflykterna i naturen.', link: { href: '/barn/natur-och-utomhus', label: 'Natur och utomhus med barn →' } },
      ],
      couples: [
        'Morgondopp i en vik i Mondragó, lunch i Santanyí och ett glas cava på kajen i solnedgången. Den lätta kustpromenaden från Portopetro mot Cala Mondragó och s\'Amarador går längs klipporna och är fin tidigt på dagen.',
        { text: 'Fler idéer för två hittar du i vår guide för par.', link: { href: '/mallorca-for-par', label: 'Mallorca för par →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: ny expresslinje 515e', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-d-or-amb-palma-a-partir-de-dimarts-24-de-juny' },
      { label: 'TIB: linje 521 Cala d\'Or–Cala Mondragó', href: 'https://www.tib.org/en/linies-i-horaris/autobus/-/linia/521' },
      { label: 'Govern de les Illes Balears: Mondragó naturpark', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_mondrago/' },
      { label: 'Mallorca.com: kustpromenaden mot Cala Mondragó', href: 'https://www.mallorca.com/en/guide/sights/ca-na-martina' },
      { label: 'Mallorca.com: Portopetro', href: 'https://www.mallorca.com/en/guide/places/portopetro' },
      { label: 'Ajuntament de Santanyí: Sant Joan i Portopetro 2026', href: 'https://ajsantanyi.net/sites/cilma_santanyi/files/2026-06/SANT_JOAN_PORTOPETRO.pdf' },
      { label: 'Mercadillos.org: marknaden i Santanyí', href: 'https://mercadillos.org/en/santanyi/santanyi-market' },
    ],
    mapsQuery: 'Porto+Petro+Mallorca',
    kidsNearby: ['parc-natural-de-mondrago'],
    card: {
      description: 'Liten hamnby i sydost med skyddad vik och Mondragó naturpark intill',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Portopetro_Bay_01.jpg/960px-Portopetro_Bay_01.jpg',
      tip: 'Hamnen passar bra för en kvällspromenad',
      // 3.2: "10 min" krockade med "5 min" i tipsen – båda nu "kort biltur".
      top3: ['Marinan med lyxbåtar', 'Kvällspromenaden', 'Cala Mondragó (kort biltur)'],
    },
  },
  {
    slug: 'alcudia',
    name: 'Alcúdia',
    region: 'Norr',
    lat: 39.8527,
    lng: 3.1214,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Medeltida murar och lång sandstrand',
    seo: {
      description: 'Alcúdia i norra Mallorca – kuststad med medeltida murar, romerska Pollentia, marknad tisdagar och söndagar och en lång, grund sandstrand för barnen.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Alcudia_City_Walls_R01.jpg/1920px-Alcudia_City_Walls_R01.jpg',
      alt: 'De medeltida stadsmurarna i Alcúdia',
      kicker: 'Norra Mallorca · Historisk kuststad',
      subtitle: 'Gamla stan innanför 1300-talsmurarna, romerska Pollentia och en lång, grund sandstrand vid hamnen',
    },
    about: [
      'Alcúdias gamla stan ligger innanför en ringmur som började byggas 1298 under kung Jaume II. Strax utanför murarna ligger ruinerna av den romerska staden Pollentia, med teatern.',
      'Delar av muren går att gå på, och två stadsportar står kvar, bland dem Porta de Mallorca. Innanför murarna finns butiker, restauranger och kyrkan Sant Jaume, och på tisdagar och söndagar fyller marknaden gatorna. Vid hamnen börjar Platja d’Alcúdia, som fortsätter söderut som Platja de Muro – grunt och barnvänligt nästan hela vägen.',
    ],
    tips: [
      'Gå hela vägen runt stadsmurarna – tar ca 30 min och ger fin utsikt',
      'Marknaden på tisdagar och söndagar är stor och populär – kom tidigt och parkera utanför stan',
      'Vattenparken Hidropark i Port d’Alcúdia är en bra eftermiddag med barn',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Topp 3 i Alcúdia',
      items: [
        'Medeltida stadsmurarna från 1300-talet',
        'Romerska staden Pollentia med teatern',
        'Platja d\'Alcúdia – lång, grund sandstrand som börjar vid hamnen',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Norra Mallorca, 54 km från Palma' },
      { label: 'Bil', value: 'Ca 50 min från Palma' },
      { label: 'Marknad', value: 'Tisdag och söndag' },
      { label: 'Känd för', value: 'Medeltida murar, strand, historia' },
      { label: 'Stränder i närheten', value: "Platja de Muro, Platja d'Alcúdia" },
    ],
    guide: {
      getThere: [
        { mode: 'Bil', text: 'Motorvägen Ma-13 går från Palma förbi Inca nästan hela vägen till Alcúdia – den enklaste långkörningen på ön. Gamla stan upplever du bäst till fots – parkera utanför murarna.' },
        { mode: 'Buss', text: 'TIB-linje 302 går mellan Palma och Alcúdia via Inca och vidare till Port d’Alcúdia och Can Picafort. Från Alcúdia går också bland annat linje 322 till Pollença och, under säsongen, linje 334 ut på Formentorhalvön och linje 325 till Cala Rajada.' },
        { mode: 'Tåg', text: 'Tåget från Palma går till Sa Pobla (linje T2), som ligger en bit inåt land. Bussen är oftast smidigare hela vägen.' },
        { mode: 'Från flygplatsen', text: 'Flygbussen A32 går direkt från flygplatsen till Alcúdia, Port d’Alcúdia, Platja de Muro och Can Picafort på sommaren. På vintern går A33 via Inca och Sa Pobla till Port d’Alcúdia. Alternativt tar du buss A1 till Plaça d’Espanya och linje 302 från Estació Intermodal.' },
      ],
      stay: {
        intro: 'Alcúdia är egentligen tre platser: den medeltida staden, hamnen och den långa stranden.',
        areas: [
          { name: 'Gamla stan innanför murarna.', text: 'Små hotell i gamla stenhus, restauranger på torgen och lugnt när dagsbesökarna har gått. Passar par och dig som gillar historia.' },
          { name: 'Port d’Alcúdia.', text: 'Hamnen med strandpromenad, restauranger och båtturer. Praktisk bas om du vill blanda strand, utflykter och lite kvällsliv.' },
          { name: 'Längs Platja d’Alcúdia och Platja de Muro.', text: 'Stora strandhotell och lägenhetshotell vid den långa sandstranden. Det klassiska valet för barnfamiljer.' },
        ],
      },
      eat: {
        intro: 'I gamla stan äter du mallorkinskt på torgen och i gränderna; i hamnen dominerar fisk, skaldjur och paella med utsikt över båtarna. Marknadsdagarna är bästa tillfället att köpa ost, oliver och korv till en picknick på stranden.',
      },
      beaches: {
        names: ["Platja d'Alcúdia", 'Platja de Muro', 'Platja de Formentor'],
        text: 'Den långa sandstranden börjar vid hamnen och fortsätter som Platja de Muro söderut – grunt och barnvänligt nästan hela vägen. Formentor nås med bil eller buss ut på halvön.',
      },
      market: {
        days: 'Tisdagar och söndagar, förmiddag',
        text: ['Marknaden hålls längs stadsmuren och i gamla stan på tisdagar och söndagar, ungefär 8–13.30. Den är en av de större på norra Mallorca, med både mat och kläder och hantverk – kom tidigt, och parkera utanför stan.'],
      },
      bestTime: [
        'Maj, juni och september passar bäst: varmt i vattnet, behagligt för att gå på murarna och utforska Pollentia, och mindre trångt än i juli och augusti. Under högsäsongen är stranden barnfamiljernas – då är tidiga morgnar och sena eftermiddagar bäst.',
      ],
      families: [
        'Grunt vatten och lång sandstrand gör Alcúdia till en av öns bästa familjeorter. Barn brukar också gilla att gå på stadsmuren.',
        { text: 'Vattenparken Hidropark ligger i Port d’Alcúdia.', link: { href: '/barn/vattenparker#hidropark-alcudia', label: 'Om Hidropark →' } },
      ],
      couples: [
        'Gå runt murarna i kvällsljuset, utforska den romerska staden Pollentia och ät middag i gamla stan. Golfbanan i Alcanada ligger vid havet strax utanför.',
        { text: 'Mer om golf på ön hittar du i vår golfguide.', link: { href: '/aktiviteter/golf', label: 'Golf på Mallorca →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: bättre förbindelser Pollença och Alcúdia', href: 'https://www.tib.org/en/w/els-usuaris-del-bus-tib-milloren-la-connectivitat-amb-la-zona-de-pollen%C3%A7a-i-la-badia-d-alc%C3%BAdia-a-partir-del-1-d-abril' },
      { label: 'TIB: linje 302 (tidtabell)', href: 'https://www.tib.org/documents/20124/420689/L302,+des+de+2025.11.01.pdf/6df03742-ab31-72b9-8711-5f53bacc33d8?version=1.0&t=1761566914618' },
      { label: 'TIB: tåglinje T2', href: 'https://www.tib.org/es/lineas-y-horarios/metro/-/linia/T2' },
      { label: 'TIB: flygbussarna (Aerotib)', href: 'https://www.tib.org/es/web/ctm/autobus/aerotib' },
      { label: 'Mercadillos.org: marknaden i Alcúdia', href: 'https://mercadillos.org/en/alcudia/alcudia-market' },
      { label: "Illes Balears: Walls (Muralles d'Alcúdia)", href: 'https://www.illesbalears.travel/en/mallorca/walls-muralles-dalcudia' },
      { label: 'Mallorca.com: Porta de Mallorca', href: 'https://www.mallorca.com/en/guide/sights/porta-de-mallorca' },
    ],
    mapsQuery: 'Alcudia+Mallorca',
    kidsNearby: ['hidropark-alcudia', 'glasbottenbat-alcudia', 's-albufera'],
    card: {
      description: 'Medeltida stad med ringmur, romerska Pollentia och lång, grund sandstrand',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Alcudia_City_Walls_R01.jpg/960px-Alcudia_City_Walls_R01.jpg',
      tip: 'Besök den romerska teatern och gamla stan',
      top3: ['Medeltida stadsmurarna', 'Romerska staden Pollentia', "Platja d'Alcúdia"],
    },
  },
  {
    slug: 'valldemossa',
    name: 'Valldemossa',
    region: 'Nordväst',
    lat: 39.7117,
    lng: 2.6225,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Bergsbyn med Chopins kloster, närmast Palma',
    seo: {
      // Våg 1: världsarvet är Serra de Tramuntana, inte själva byn.
      description: 'Valldemossa i världsarvet Serra de Tramuntana – bergsby med kartusianklostret där Chopin bodde, la Beatas kakelplattor och 25 minuter med bil från Palma.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg/1920px-The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg',
      alt: 'Valldemossa med kartusianklostret och stenhusen i Tramuntanas bergsdal',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bergsby i världsarvet Serra de Tramuntana med klostret där Chopin och George Sand bodde vintern 1838–39',
    },
    about: [
      'Valldemossa är den Tramuntanaby som ligger närmast Palma, 18 km bort. Byn blev känd när den polske tonsättaren Frédéric Chopin och författaren George Sand tillbringade vintern 1838–39 i kartusianklostret Real Cartuja. Gränderna är branta och smala och stenhusen har krukväxter vid dörrarna – mitt på dagen är de fulla av dagsturister, så kom tidigt eller stanna till kvällen.',
      'I klostret ser du Chopins piano, George Sands handskrifter och kyrkan med keramikkupoler. På bagerierna köper du coca de patata, ett fluffigt potatisbakverk pudrat med socker, som du äter med en kaffe på torget.',
      'Valldemossa är också födelseort för Santa Catalina Thomàs (född 1531), Mallorcas första helgon och öns enda kvinnliga, som här kallas la Beata. Hennes födelsehus på Carrer de la Rectoria bakom kyrkan Sant Bartomeu är i dag ett litet kapell. Titta efter de målade kakelplattorna vid husens ytterdörrar – många föreställer henne, med en bön på katalanska.',
    ],
    tips: [
      'Kom tidigt på morgonen – turistbussarna anländer efter 10',
      'Prova coca de patata vid torgets bageri – en mallorkinsk klassiker',
      'Promenera ut ur byn norrut för fin utsikt över bergen',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Valldemossa',
      items: [
        'Kartusianklostret – Chopins piano och George Sands handskrifter',
        'La Beatas kakelplattor – målade plattor vid husdörrarna med byns helgon',
        'Utsikten från byn – bergen och havet i samma vy',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 18 km från Palma' },
      { label: 'Bil', value: 'Ca 25 min från Palma' },
      { label: 'Klostret', value: 'Kortare öppettider på vintern – kontrollera' },
      { label: 'Känd för', value: 'Chopin, kloster, bergsby' },
      { label: 'Tips', value: 'Parkera utanför byn och gå in' },
    ],
    guide: {
      getThere: [
        { mode: 'Bil', text: 'Valldemossa är den Tramuntanaby som ligger närmast Palma: följ vägen Ma-1110 norrut från staden upp i bergen. Parkeringarna vid infarten fylls på förmiddagen – kom tidigt.' },
        { mode: 'Buss', text: 'TIB-linje 203 går från Palma till Valldemossa och fortsätter längs bergsvägen Ma-10 till Deià, Sóller och Port de Sóller. Sommartid blir bussarna fulla, så räkna med att köa vid hållplatsen.' },
        { mode: 'Från flygplatsen', text: 'Ingen direktbuss – ta buss A1 in till Palma och byt till linje 203.' },
      ],
      stay: {
        intro: 'De flesta besöker Valldemossa på en dagsutflykt, men det är när bussarna har åkt som byn är som vackrast.',
        areas: [
          { name: 'I byn.', text: 'Ett fåtal små hotell och lägenheter i stenhusen. Passar par som vill ha lugna kvällar och tidiga morgnar i gränderna.' },
          { name: 'Fincor i bergen.', text: 'Agroturismer och lantgårdshotell på sluttningarna runt byn, ofta med utsikt mot havet. Bil behövs.' },
          { name: 'Palma som bas.', text: 'Valldemossa är den Tramuntanaby som går lättast att besöka från Palma – med bil eller buss 203 är du uppe i bergen på en kort stund. Bra för barnfamiljer som vill ha stranden och stadens utbud nära.' },
        ],
      },
      eat: {
        intro: 'Valldemossas specialitet är coca de patata – ett lätt, fluffigt bakverk gjort på potatis och pudrat med socker. Köp ett på något av bagerierna och ät det med en kaffe på torget. Till lunch passar mallorkinska klassiker som pa amb oli.',
        dishes: [
          'Coca de patata med en kaffe på torget',
          'Pa amb oli – bröd med olivolja, tomat, ost och korv – till lunch',
          'Fisk och skaldjur nere vid havet i Port de Valldemossa',
        ],
        tips: ['Restaurangerna längs huvudgatan fylls mitt på dagen när bussarna kommer. Ät tidig lunch eller vänta till eftermiddagen.'],
      },
      beaches: {
        names: ['Cala Estellencs', 'Port de Sóller'],
        text: 'Byns egen badplats är Port de Valldemossa, en liten stenstrand nere vid havet. Vägen dit är smal, brant och kurvig, och parkeringsplatserna är få. Längre söderut längs kusten ligger Cala Estellencs, och den närmaste sandstranden finns i Port de Sóller.',
      },
      market: {
        days: 'Söndagar, förmiddag',
        text: ['Den lilla söndagsmarknaden hålls vid klostret, ungefär kl. 8–13.'],
      },
      bestTime: [
        'Kom tidigt på morgonen eller sent på eftermiddagen, oavsett årstid – mitt på dagen fylls byn av dagsturister. Våren och hösten är bäst för vandring i bergen runt byn.',
        'Real Cartuja håller normalt stängt på söndagar och har kortare öppettider på vintern. Kontrollera öppettiderna på klostrets sajt innan du åker.',
        { text: 'I slutet av juli firar byn la Beata med en vecka av fest. Den 28 juli rullar Carro Triomfal, en blomstersmyckad vagn med musik och dans, genom gatorna. I augusti hålls Festival Chopin med pianokonserter i klostret. Fler evenemang hittar du i vår kalender.', link: { href: '/evenemang', label: 'Evenemang på Mallorca →' } },
      ],
      families: [
        'Klosterbesöket är lagom långt för barn, och gränderna med de målade kakelplattorna blir en skattjakt – vem hittar flest bilder av la Beata? Festen den 28 juli, med vagnen och musiken genom byn, är en stor upplevelse för barn.',
        'Någon barnstrand finns inte här: stenstranden i Port de Valldemossa passar inte små barn. Kombinera hellre bergsbyn med en eftermiddag på stranden i Port de Sóller.',
        { text: 'Fler idéer för barnfamiljer hittar du i vår barnguide.', link: { href: '/barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Kombinera Valldemossa med Deià längs Ma-10, en av öns vackraste bilvägar, och stanna vid utsiktsplatserna över havet. Avsluta dagen i Sóller eller Port de Sóller.',
        'I klostret hålls korta pianokonserter i kungapalatset Palau del Rei Sanç flera gånger om dagen, och i augusti spelas Chopin på kvällarna under Festival Chopin. Boka festivalbiljetter i god tid – konserterna har få platser.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'Mallorca.com: marknaden i Valldemossa', href: 'https://www.mallorca.com/es/agenda/mercats/wochenmarkt-valldemossa' },
      { label: 'Cartoixa de Valldemossa: öppettider och biljetter', href: 'https://cartoixadevalldemossa.com/en/' },
      { label: 'Spain.info: Festival de piano Frédéric Chopin', href: 'https://www.spain.info/es/agenda/festival-piano-frederic-chopin/' },
      { label: 'Planomato: pianokonserter i Cartuja de Valldemossa', href: 'https://planomato.com/es/palma-de-mallorca/n/recitales-piano-musica-clasica-tramuntana' },
      { label: 'Mallorca.com: Casa natal de Santa Catalina Thomàs', href: 'https://www.mallorca.com/en/guide/sights/casa-natal-de-santa-catalina-thomas' },
      { label: 'Mallorca.com: Missa i processó solemne Valldemossa 2026', href: 'https://www.mallorca.com/ca/agenda/missa-i-processo-solemne-valldemossa-2026-1c03aa' },
      { label: 'Spain.info: Port de Valldemossa', href: 'https://www.spain.info/es/playa/port-valldemossa/' },
    ],
    mapsQuery: 'Valldemossa+Mallorca',
    card: {
      description: 'Bergsby i världsarvet Serra de Tramuntana, känd för Chopins och George Sands vintervistelse',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg/960px-The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg',
      tip: 'Besök kartusianklostret tidigt på morgonen',
      top3: ['Kartusianklostret', 'La Beatas kakelplattor', 'Utsikten från byn'],
    },
  },
  {
    slug: 'deia',
    name: 'Deià',
    region: 'Nordväst',
    lat: 39.748,
    lng: 2.648,
    updated: CHECKED,
    sitemapPriority: 0.75,
    tagline: 'Konstnärsby vid nordvästkusten',
    seo: {
      description: 'Deià – konstnärsby i Tramuntana med havsutsikt, Robert Graves hus som i dag är museum och Cala Deià 20–30 minuter till fots nedanför byn.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Dei%C3%A0%2C_Mallorca_%2813333982693%29.jpg/1920px-Dei%C3%A0%2C_Mallorca_%2813333982693%29.jpg',
      alt: 'Deià – stenhusen på sluttningen i Tramuntanabergen',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bergsby ovanför havet där Robert Graves bodde, med stig ner till Cala Deià',
    },
    about: [
      'Deià ligger på en sluttning i Tramuntanabergen, med olivterrasser ner mot havet. Den brittiske poeten Robert Graves bosatte sig här 1929, och efter honom har konstnärer, författare och musiker fortsatt att söka sig hit. Byn är liten men har många restauranger, och prisnivån är högre än på de flesta håll på ön.',
      'Nedanför byn ligger Cala Deià, en stenig vik med klart vatten. Stigen ner följer bäckfåran Torrent Major och tar 20–30 minuter. Gå tidigt – på eftermiddagen är det fullt, och vägen upp igen är brant.',
      'Graves lät bygga huset Ca n\'Alluny i utkanten av byn 1932, och sedan 2006 är det museum. Han ligger begravd på den lilla kyrkogården vid kyrkan Sant Joan Baptista uppe på kullen mitt i byn – gå upp dit för utsikten över dalen och havet.',
    ],
    tips: [
      'Robert Graves hus är museum i dag – kontrollera öppettiderna innan du åker',
      'Promenera ner till Cala Deià tidigt – på eftermiddagen är det fullt',
      'Flera restauranger i byn har terrasser med utsikt över dalen – boka bord till solnedgången på sommaren',
      'Parkera utanför byn – gatorna är mycket smala',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Deià',
      items: [
        'Robert Graves museum – hem och arbetsstugan för den berömde poeten',
        'Cala Deià – en av öns vackraste klippbadplatser, orörd och fridfull',
        'Utsikten från kyrkan – panorama över bergen och Medelhavet',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 30 km från Palma' },
      { label: 'Bil', value: 'Ca 35 min från Palma' },
      { label: 'Cala Deià', value: '20–30 min till fots från byn' },
      { label: 'Känd för', value: 'Robert Graves, konst, natur' },
      { label: 'Bästa tid', value: 'Vår och tidig höst' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB-linje 203 går från Palma via Valldemossa till Deià och vidare till Sóller och Port de Sóller. Sommartid är bussarna ofta fulla. Bussen passar också bra ihop med vandringsleden GR 221, som går mellan Deià och Sóller via småbyn Llucalcari: räkna med 3–4 timmar till fots i lugn takt och ta bussen tillbaka.' },
        { mode: 'Bil', text: 'Kör via Valldemossa och följ bergsvägen Ma-10 längs kusten, eller kom från Sóller åt andra hållet. Vägen är smal och kurvig, och parkeringen i byn är mycket begränsad. Nere vid Cala Deià är platserna få och avgiftsbelagda – ställ hellre bilen på någon av byns parkeringar och gå ner.' },
        { mode: 'Från flygplatsen', text: 'Ingen direktbuss – ta buss A1 in till Palma och byt till linje 203.' },
      ],
      stay: {
        intro: 'Deià är litet, och boendet är därefter: få och ofta dyra rum. Bestäm dig för om du vill ha bylivet eller lugnet utanför.',
        areas: [
          { name: 'I byn.', text: 'Små hotell och rum i gamla stenhus längs huvudgatan och sluttningen upp mot kyrkan. Passar par som vill gå till middagen och ha byn för sig själva när dagsturisterna har åkt.' },
          { name: 'Fincor och lantställen i dalen.', text: 'Lugnt bland olivterrasserna, ofta med havsutsikt, men du behöver bil – och vägarna är smala.' },
          { name: 'Sóller som bas.', text: 'Vill du ha större utbud, bättre bussförbindelser och en sandstrand för barnen bor du i Sóller eller Port de Sóller, en kort bit bort längs Ma-10.' },
        ],
      },
      eat: {
        intro: 'För att vara en så liten by har Deià många restauranger, och flera har terrasser med utsikt över dalen. Prisnivån är högre än på de flesta håll på ön. Vill du äta enklare tar du pa amb oli – bröd med olivolja, tomat och pålägg – på ett av kaféerna längs huvudgatan.',
        dishes: [
          'Fisk och skaldjur från kusten, bland annat den röda räkan gamba de Sóller som fiskas på djupt vatten utanför den här delen av Tramuntana',
          'Pa amb oli med oliver och ost från ön',
          'Olivolja från terrasserna runt byn',
        ],
      },
      beaches: {
        names: ['Port de Sóller', 'Cala Tuent', 'Sa Calobra'],
        text: 'Byns egen badplats är Cala Deià, en stenig vik med klart vatten nedanför byn. Stigen ner går längs bäckfåran Torrent Major. Närmaste sandstrand ligger i Port de Sóller, och längre norrut längs Tramuntanakusten finns Cala Tuent och Sa Calobra.',
      },
      bestTime: [
        'Våren och tidig höst är bäst: behagligt för vandring längs bergsstigarna och fortfarande varmt nog för ett dopp i Cala Deià. Under högsommaren är det trångt både i byn och nere vid viken – gå ner tidigt.',
        'Vintertid är byn stilla och många restauranger håller stängt, men det är fint vandringsväder längs GR 221 och du har utsikten för dig själv.',
      ],
      families: [
        'Deià passar bäst för en dagsutflykt med barn. Gränderna är branta och smala, och Cala Deià är en stenig vik utan sand – ta med badskor. Promenaden ner tar 20–30 minuter, och vägen upp igen tar längre tid för små ben.',
        { text: 'Vill ni ha sandstrand och grunt vatten är Port de Sóller närmast. Fler tips för barnfamiljer hittar du i vår barnguide.', link: { href: '/barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Deià är en av Mallorcas mest romantiska byar. Kombinera ett besök i Robert Graves hus med lunch på en terrass med havsutsikt och kvällen i Sóller.',
        'Mellan Deià och Valldemossa ligger Son Marroig, ärkehertigen Ludwig Salvators gamla gård, i dag ett litet museum med utsikt mot klippudden Sa Foradada. Stanna där på vägen, eller vandra GR 221 till Sóller och åk buss tillbaka.',
        { text: 'Fler idéer för en resa på tu man hand hittar du i vår guide för par.', link: { href: '/mallorca-for-par', label: 'Mallorca för par →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'Serra de Tramuntana (Consell de Mallorca): Robert Graves a Deià', href: 'https://serradetramuntana.net/en/-/robert-graves-a-deia' },
      { label: 'Illes Balears: Museum Ca n\'Alluny – Casa Museo de Robert Graves', href: 'https://illesbalears.travel/en/mallorca/museum-ca-nalluny-casa-museo-de-robert-graves' },
      { label: 'Mallorca.com: Cala Deià', href: 'https://www.mallorca.com/en/guide/beaches/cala-deia' },
      { label: 'Serra de Tramuntana (Consell de Mallorca): Son Marroig', href: 'https://serradetramuntana.net/-/sonmarroig' },
      { label: 'Consell de Mallorca: GR 221, etapp Can Boi–Muleta', href: 'https://caminsdepedra.conselldemallorca.cat/-/etapa-4-can-boi-muletta' },
      { label: 'Illes Balears: la gamba de Sóller', href: 'https://illesbalears.travel/en/mallorca/local-product-la-gamba-de-soller' },
      { label: 'Fundació Robert Graves: Arrival in Deià (1929–1936)', href: 'https://fundaciorobertgraves.org/en/arrival-deia' },
    ],
    mapsQuery: 'Deia+Mallorca',
    card: {
      description: 'Bergsby där Robert Graves bodde, med havsutsikt och stig ner till Cala Deià',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Dei%C3%A0%2C_Mallorca_%2813333982693%29.jpg/960px-Dei%C3%A0%2C_Mallorca_%2813333982693%29.jpg',
      tip: 'Besök Robert Graves hus, i dag museum',
      top3: ['Robert Graves museum', 'Cala Deià (bad)', 'Utsikten från kyrkan'],
    },
  },
  {
    slug: 'arta',
    name: 'Artà',
    region: 'Öst',
    lat: 39.6958,
    lng: 3.35,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'By under den befästa helgedomen Sant Salvador',
    seo: {
      description: "Artà – medeltida bergsstad i östra Mallorca med borgen Santuari de Sant Salvador, tisdagsmarknad, fornbyn Ses Païsses och Coves d'Artà nära.",
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mallorca_Blick_auf_Arta_%2831907486476%29.jpg/1920px-Mallorca_Blick_auf_Arta_%2831907486476%29.jpg',
      alt: 'Artà sett från ovan – stenhusen och kyrkan i bergsstaden på östra Mallorca',
      kicker: 'Östra Mallorca · Llevant',
      subtitle: 'Småstad under den befästa helgedomen Sant Salvador, med tisdagsmarknad och vandring i Llevant',
    },
    about: [
      // Tidigare "ett fort och kloster" – det är en vallfartskyrka innanför en medeltida befästningsmur. Rättat 2026-11-18.
      'Ovanför Artà ligger Santuari de Sant Salvador, en vallfartskyrka omgiven av en befästningsmur med torn. Trappan med 180 steg börjar vid församlingskyrkan Transfiguració del Senyor, och uppifrån muren ser du ut över östra Mallorca och havet. Entrén är gratis. Nedanför ligger gamla stan med stensatta gränder och små torg – parkera i utkanten och gå.',
      "Tisdagsmarknaden på och runt Plaça del Conqueridor är veckans livligaste förmiddag i byn. Droppstensgrottorna Coves d'Artà vid Canyamel ligger ca 15 minuter bort med bil – ett bra mål en regnig dag.",
      'Strax utanför byn ligger Ses Païsses, en fornby från talaiotisk tid som är omkring 3 000 år gammal. Norr om Artà tar naturparken Península de Llevant vid – orörda berg och kust med många vandringsleder, ner till vikar som Cala Torta och s\'Arenalet des Verger. Till kommunen hör också Colònia de Sant Pere, ett lugnt kustsamhälle ungefär tio kilometer bort.',
    ],
    tips: [
      'Fornbyn Ses Païsses strax utanför byn är lagom stor för barn – kontrollera öppettiderna, de varierar med säsong',
      'Vandra i naturparken Península de Llevant ner till Cala Torta',
      'Cyklar ni, går Via Verda längs den gamla järnvägen mellan Artà och Manacor',
      'Restaurangerna runt torget serverar klassisk mallorkinsk mat – prova frit mallorquí',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Artà',
      items: [
        'Santuari de Sant Salvador – befäst vallfartskyrka med panoramautsikt, fri entré',
        "Coves d'Artà – en av öns vackraste grottor, kort biltur från byn",
        'Tisdagsmarknaden – en äkta bymarknad, en av öns bästa',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Öst, ca 70–80 km från Palma' },
      { label: 'Bil', value: 'Ca 60 min från Palma' },
      { label: 'Marknad', value: 'Tisdagar' },
      { label: "Coves d'Artà", value: '15 min med bil' },
      { label: 'Sant Salvador', value: 'Fri entré, 180 trappsteg upp' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 411e går mellan Palma och Cala Rajada via Sant Llorenç, Artà och Capdepera. Flera expresslinjer går bara under sommarsäsongen – kontrollera på tib.org att linjen går när du reser. Den vanliga linje 411 går mellan Cala Rajada, Artà och Manacor, där du kan byta till tåget mot Palma. Under säsongen förbinder linje 325 Artà med Alcúdiabukten – Port d\'Alcúdia, Platja de Muro och Can Picafort – och med Capdepera och Cala Rajada.' },
        { mode: 'Bil', text: 'Följ Ma-15 från Palma via Manacor till Artà. Parkera i utkanten – gränderna i den gamla stadskärnan är smala.' },
        { mode: 'Tåg', text: 'Tåget från Palma (linje T3) går till Manacor. Därifrån tar du buss 411 vidare till Artà.' },
      ],
      stay: {
        intro: 'Artà passar dig som vill ha byliv och natur snarare än badort:',
        areas: [
          { name: 'Artà by.', text: 'Små hotell i gamla stenhus och byhus att hyra i gränderna under Sant Salvador. Lugnt på kvällarna och levande på tisdagar. Passar par, vandrare och cyklister.' },
          { name: 'Colònia de Sant Pere.', text: 'Ett litet kustsamhälle med hamn, strandpromenad och en kort sandstrand med grunt vatten. Bra för barnfamiljer som vill ha det lugnt.' },
          { name: 'Landsbygden.', text: 'Fincor och agroturismer vid foten av bergen mot Llevant. Vackert och tyst, men bil är ett måste.' },
        ],
      },
      eat: {
        intro: 'Runt Plaça del Conqueridor och längs huvudgatan ligger kaféer och restauranger med mallorkinsk mat, och i den täckta marknadshallen handlar du färska råvaror på tisdagarna. Ute vid kusten i Colònia de Sant Pere äter du fisk vid hamnen.',
        dishes: [
          'Frit mallorquí – stekt innanmäte, potatis och grönsaker',
          'Sobrassada och lufttorkad korv från marknaden',
          'Ensaïmada till förmiddagskaffet',
        ],
      },
      beaches: {
        names: ['Cala Torta', 'Cala Mesquida', 'Cala Agulla'],
        text: 'Norr om Artà ligger de orörda naturstränderna Cala Torta och Cala Mesquida. Cala Agulla vid Cala Rajada har mer service och passar barnfamiljer. Vill du bada nära byn är den lilla stranden i Colònia de Sant Pere grund och skyddad bakom vågbrytaren.',
      },
      market: {
        days: 'Tisdagar, förmiddag',
        text: [
          'Tisdagsmarknaden hålls på och runt Plaça del Conqueridor på förmiddagen. Det är en levande bymarknad med råvaror, kläder och hantverk – ett bra tillfälle att se byn när den är som mest vaken.',
        ],
      },
      bestTime: [
        'Våren och hösten passar Artà bäst: då är det skönt att gå upp till Sant Salvador och vandra i naturparken Península de Llevant. Sommartid är förmiddagen bäst för promenaden upp till borgen.',
        'I mitten av januari firar Artà Sant Antoni med brasor och dansande djävlar – en av öns största vinterfester och en bra anledning att komma utanför säsong.',
      ],
      families: [
        'Räkna trappstegen upp till Sant Salvador tillsammans och gå runt på muren däruppe. Ses Païsses är lagom stor för barn – en riktig fornby att gå runt i, och barn upp till tio år går gratis. Kontrollera öppettiderna, de varierar med säsong.',
        "Coves d'Artà vid Canyamel är ett bra regnvädersalternativ för lite större barn.",
        { text: 'Grottorna på östkusten jämförda för barnfamiljer.', link: { href: '/barn/grottor', label: 'Grottor för barn →' } },
      ],
      couples: [
        'Tisdagsmarknad och lunch på torget, en vandring i Llevant ner till Cala Torta och kvällen i byn när dagsbesökarna har åkt. Cyklar ni, går Via Verda längs den gamla järnvägen mellan Artà och Manacor.',
        { text: 'Grannbyn Capdepera har borgen med utsikt över havet och badorten Cala Rajada.', link: { href: '/capdepera', label: 'Capdepera och Cala Rajada →' } },
        { text: 'Leder och säsonger för vandring och cykling.', link: { href: '/vandring-och-cykling', label: 'Vandring och cykling →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: expresslinje 411e Cala Rajada–Palma', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-rajada-amb-palma-a-partir-de-dimecres-11-de-juny?redirect=%2Fen%2Fnoticies%2F-%2Fasset_publisher%2FNIwXxcBhaMlh%2Frss' },
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/tren/-/linia/T3' },
      { label: 'Mercadillos.org: marknaden i Artà', href: 'https://mercadillos.org/mercadillo-arta' },
      { label: 'Artà Mallorca (turism): Sant Salvador', href: 'https://artamallorca.travel/en/santSalvador' },
      { label: 'CAIB: Parc Natural de la Península de Llevant', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/ca/parc_natural_de_la_penansula_de_llevant/' },
      { label: 'CAIB: Refugi de s\'Arenalet', href: 'https://www.caib.es/sites/ibanat/ca/sarenalet/' },
      { label: 'Turisme Petit: Poblado talayótico de Ses Païsses', href: 'https://www.turismepetit.com/lugares-de-interes-mallorca/poblado-talayotico-de-ses-paises-en-arta/' },
      { label: 'Mallorca.com: Poblat talaiòtic de Ses Païsses', href: 'https://www.mallorca.com/en/guide/sights/poblat-talaiotic-de-ses-paisses' },
      { label: 'Mallorca.com: Platja de Colònia de Sant Pere', href: 'https://www.mallorca.com/en/guide/beaches/playa-de-colonia-de-sant-pere' },
      { label: 'TIB: linje 325 Alcúdia–Cala Rajada (2026)', href: 'https://www.tib.org/en/w/el-bus-del-tib-amplia-el-servei-a-partir-de-divendres-amb-la-reactivaci%C3%B3-de-l%C3%ADnies-a-la-zona-d-alc%C3%BAdia-i-de-ponent' },
    ],
    mapsQuery: 'Arta+Mallorca',
    kidsNearby: ['via-verda-manacor-arta'],
    card: {
      description: 'Småstad under befästa Sant Salvador, med tisdagsmarknad',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mallorca_Blick_auf_Arta_%2831907486476%29.jpg/960px-Mallorca_Blick_auf_Arta_%2831907486476%29.jpg',
      tip: 'Besök borgen Santuari de Sant Salvador',
      top3: ['Santuari de Sant Salvador', "Coves d'Artà (nära)", 'Tisdagsmarknaden'],
    },
  },
  {
    slug: 'andratx',
    name: 'Andratx',
    region: 'Sydväst',
    lat: 39.5742,
    lng: 2.42,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: "By i dalen ovanför Port d'Andratx",
    seo: {
      description: "Andratx i sydvästra Mallorca – lugn stadskärna med onsdagsmarknad, Port d'Andratx marina och Camp de Mar nära. Båt till Sa Dragonera från Sant Elm.",
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Andratx%2C_Placa_Espa%C3%B1a.jpg/1920px-Andratx%2C_Placa_Espa%C3%B1a.jpg',
      alt: 'Plaça d\'Espanya i Andratx',
      kicker: 'Sydvästra Mallorca · Tramuntana',
      subtitle: "By i sydväst med onsdagsmarknad, nära hamnen Port d'Andratx och Sa Dragonera",
    },
    about: [
      "Andratx är två platser: byn uppe i dalen och hamnen Port d'Andratx nere vid havet, ca 7 minuter bort med bil. I byn pågår vardagslivet året runt, med onsdagsmarknad runt torget och billigare kaféer. I hamnen ligger segelbåtar och motorbåtar längs kajen, och restaurangerna med fisk och skaldjur är dyrare – kom dit till solnedgången.",
      'Konstcentret CCA Andratx visar samtidskonst med nya utställningar flera gånger om året. Närmaste sandstrand är Camp de Mar, mellan hamnen och Peguera, med oftast lugnt vatten och en träbro ut till en liten ö med restaurang.',
      'Längst ut mot väster ligger fiskeläget Sant Elm med utsikt mot ön Sa Dragonera, i dag naturpark. Härifrån går båtar över till ön, och vandringsleden upp till ruinerna av klostret Sa Trapa, där trappistmunkar en gång odlade terrasserna, är en av de finaste i sydväst.',
    ],
    tips: [
      "Port d'Andratx vid solnedgång – bäst sett från kajen med ett glas cava",
      'Vandra från Sant Elm upp till Sa Trapa – ca 9 km tur och retur, runt fyra timmar',
      'Båtturen från Sant Elm till Sa Dragonera är kort – ta med vatten och matsäck, service är det ont om på ön',
      'Onsdagsmarknad i stadskärnan – mindre känd men värd besöket',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Andratx',
      items: [
        "Port d'Andratx marina – en av öns snyggaste hamnar med lyxbåtar och terrasser",
        'Camp de Mar-stranden – lugn och vacker sandstrand öster om hamnen',
        'Centre Cultural Andratx – samtidskonst i en vacker miljö',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Sydväst, 30 km från Palma' },
      { label: 'Bil', value: 'Ca 30 min från Palma' },
      { label: "Port d'Andratx", value: '7 min med bil' },
      { label: 'Marknad', value: 'Onsdagar i stadskärnan' },
      { label: 'Bästa tid', value: 'Maj–juni, september' },
    ],
    guide: {
      getThere: [
        { mode: 'Bil', text: 'Följ Ma-1 från Palma längs sydvästkusten till Andratx. Port d\'Andratx ligger en kort bit nedanför byn vid havet.' },
        { mode: 'Buss', text: 'TIB-linje 101 går från Palma längs motorvägen Ma-1 till Camp de Mar, Andratx och Port d\'Andratx. Linje 102 går till Peguera. Inom kommunen går linje 121 mellan Andratx, Port d\'Andratx, S\'Arracó och Sant Elm, och linje 131 binder ihop Andratx med bergsbyarna Estellencs och Banyalbufar. Tidtabeller finns på tib.org.' },
        { mode: 'Från flygplatsen', text: 'Sommartid går flygbussen A11 från flygplatsen via Palmanova, Santa Ponça och Peguera till Camp de Mar. Vintertid vänder den i Peguera. Till byn Andratx och hamnen byter du till linje 101, eller tar buss A1 in till Palma och byter där.' },
      ],
      stay: {
        intro: 'Kommunen Andratx rymmer flera olika orter. Välj efter vad du vill göra om dagarna:',
        areas: [
          { name: 'Port d\'Andratx.', text: 'Lägenheter och hotell runt den skyddade hamnen, med restauranger och kvällspromenad längs kajen. Passar par och den som vill ha båtliv och solnedgångar.' },
          { name: 'Camp de Mar.', text: 'En liten badort med sandstrand och lugnt vatten. Det självklara valet för barnfamiljer, och flygbussen stannar här på sommaren.' },
          { name: 'Andratx by.', text: 'Bymiljö med torg, onsdagsmarknad och vardagsliv året runt, en kort bit upp från kusten. Bra för dig som vill bo mallorkinskt och har bil.' },
          { name: 'Sant Elm.', text: 'Litet och lugnt fiskeläge längst i väster, med båtarna till Sa Dragonera och vandringsleder utanför dörren.' },
        ],
      },
      eat: {
        intro: 'I Port d\'Andratx är det fisk och skaldjur vid kajen som gäller, ofta med utsikt över segelbåtarna. Uppe i byn Andratx äter du enklare och billigare på kaféerna och barerna runt torget.',
        dishes: [
          'Den röda räkan gamba de Sóller, som fiskas på djupt vatten längs kusten mellan Sóller och Port d\'Andratx – dyr, men en mallorkinsk delikatess',
          'Dagens fångst och paella vid hamnen',
          'Pa amb oli och tapas på torget i Andratx by',
        ],
        tips: [{ text: 'Planera lunch och marknad i byn på onsdagen och middag vid hamnen på kvällen. Fler mattips för hela ön hittar du i vår matguide.', link: { href: '/mat', label: 'Mat på Mallorca →' } }],
      },
      beaches: {
        names: ['Cala Estellencs', 'Portals Vells'],
        text: 'Närmast ligger sandstranden i Camp de Mar, där en träbro leder ut till en liten ö med restaurang. I Sant Elm finns en liten sandstrand med utsikt mot Sa Dragonera. Längre bort ligger Cala Estellencs norrut längs Tramuntanakusten och Portals Vells på Calvià-halvön österut.',
      },
      market: {
        days: 'Onsdagar, förmiddag',
        text: [
          'Veckomarknaden hålls i byn Andratx uppe i dalen, runt torget och gatorna i centrum – inte nere i Port d\'Andratx.',
          'Enligt kommunens marknadsföreskrifter (2025) finns också en mindre marknad i Port d\'Andratx på måndagar och en i S\'Arracó på lördagar. Kontrollera på plats innan du åker.',
        ],
      },
      bestTime: [
        'Maj, juni och september är bäst – varmt och lugnt, och Port d\'Andratx är som vackrast vid solnedgången.',
        'Våren och hösten är också bästa tiden för vandringen till Sa Trapa och en tur till Sa Dragonera. Naturparken har kortare öppettider på vintern, november–april.',
        'I mitten av juli firar Port d\'Andratx fiskarnas skyddshelgon Mare de Déu del Carme. Den 16 juli går en procession ut på vattnet med pyntade båtar och musik.',
      ],
      families: [
        'Camp de Mar har fin sand och oftast lugnt vatten, och kommunen själv lyfter fram stranden som bra för barn. Gå ut över träbron till den lilla ön – det gillar de flesta barn.',
        'Båtturen från Sant Elm till Sa Dragonera är kort. Ta med vatten och matsäck – service är det ont om på ön.',
        { text: 'Fler idéer för barnfamiljer hittar du i vår barnguide.', link: { href: '/barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Börja dagen med marknaden eller konsten på Centre Cultural Andratx, ät lunch i Camp de Mar och se solen gå ned över hamnen i Port d\'Andratx.',
        'Vandra från Sant Elm upp till Sa Trapa – leden är ca 9 km tur och retur och tar runt fyra timmar, med en brant bit på slutet och utsikt över Sa Dragonera.',
        { text: 'Fler vandringsleder hittar du i vår guide till vandring och cykling.', link: { href: '/vandring-och-cykling', label: 'Vandring och cykling →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: Port d\'Andratx–Palma (tidtabell 2026)', href: 'https://www.tib.org/documents/20124/420683/L101,+des+de+2026.03.27.pdf/2f0109aa-6618-2b15-9617-172fb8a7a774?version=1.0&t=1774262193975' },
      { label: 'TIB: linje 101 Port d\'Andratx–Palma', href: 'https://www.tib.org/en/linies-i-horaris/autobus/-/linia/101' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
      { label: 'BOIB 2025: marknadsföreskrifter Andratx', href: 'https://intranet.caib.es/eboibfront/pdf/es/2025/155/1206461' },
      { label: 'TIB: linje 121 Sant Elm–Andratx', href: 'https://www.tib.org/en/w/el-govern-i-l-ajuntament-d-andratx-col%C2%B7laboren-en-la-millora-de-la-l%C3%ADnia-de-sant-elm-del-tib-amb-un-nou-bus-que-incrementa-la-capacitat-del-servei' },
      { label: 'TIB: linje 131 Banyalbufar–Estellencs–Andratx', href: 'https://www.tib.org/en/w/el-bus-del-tib-connecta-amb-la-l%C3%ADnia-131-els-pobles-de-banyalbufar-i-estellencs-amb-andratx-i-la-costa-de-calvia-1' },
      { label: 'TIB: sommartidtabeller 2026 (A11)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Govern de les Illes Balears: Parc natural de sa Dragonera', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/ca/parc_natural_de_sa_dragonera/' },
      { label: 'Mallorca.com: Playa de Camp de Mar', href: 'https://www.mallorca.com/es/guia/playas/playa-de-camp-de-mar' },
      { label: 'Mallorca.com: La Trapa', href: 'https://www.mallorca.com/es/guia/lugares-de-interes/la-trapa' },
      { label: 'Click Mallorca: vandringen till La Trapa', href: 'https://www.click-mallorca.com/blog/visitar/rutas/excursion-la-trapa' },
      { label: 'The Calendar Mallorca: Festes de la Mare de Déu del Carme 2026, Port d\'Andratx', href: 'https://thecalendarmallorca.com/events/festes-de-la-mare-de-deu-del-carme-2026-port-dandratx/' },
      { label: 'Mallorca.com: CCA Andratx 2026', href: 'https://www.mallorca.com/en/agenda/nothing-to-declare-cca_andratx-2026-95cb4d' },
      { label: 'Illes Balears: la gamba de Sóller', href: 'https://illesbalears.travel/en/mallorca/local-product-la-gamba-de-soller' },
      { label: 'Ultima Hora: la gamba vuelve a Sóller y Andratx', href: 'https://www.ultimahora.es/noticias/part-forana/2016/09/02/217934/gamba-vuelve-soller-andratx-forma-tan-repentina-como-desaparecio.html' },
    ],
    mapsQuery: 'Andratx+Mallorca',
    kidsNearby: ['sa-dragonera'],
    card: {
      description: "By i sydväst med onsdagsmarknad, nära marinan i Port d'Andratx",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Andratx%2C_Placa_Espa%C3%B1a.jpg/960px-Andratx%2C_Placa_Espa%C3%B1a.jpg',
      tip: "Port d'Andratx har öns snyggaste marina",
      top3: ["Port d'Andratx marina", 'Camp de Mar-stranden', 'Centre Cultural Andratx'],
    },
  },
  {
    slug: 'pollenca',
    name: 'Pollença',
    region: 'Norr',
    lat: 39.8767,
    lng: 3.0161,
    updated: CHECKED,
    sitemapPriority: 0.7,
    tagline: 'Småstad med Calvaritrappan och söndagsmarknad',
    seo: {
      // Våg 1 rättade evenemanget till Festival de Pollença (klassisk musik i klostret Sant Domingo).
      description: 'Pollença i norra Mallorca – småstad med 365 trappsteg till Calvari, söndagsmarknad på Plaça Major, sommarfestival i klostret och Port de Pollença nära.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Pollenca_desde_El_Calvari%2C_02.jpg/1920px-Pollenca_desde_El_Calvari%2C_02.jpg',
      alt: 'Takåsar och kyrka i Pollença sedda från Calvari-kullen',
      kicker: 'Norra Mallorca · Tramuntana',
      subtitle: 'Småstad med 365 cypresskantade trappsteg, söndagsmarknad och anrik sommarfestival',
    },
    about: [
      'Pollença ligger en bit in från Pollençabukten, vid foten av Tramuntanabergen. Från stan går 365 cypresskantade trappsteg upp till kapellet på Calvari – gå tidigt på morgonen, så har du utsikten över stan och bukten för dig själv. På söndagar fyller marknaden Plaça Major och gatorna runt omkring. I norra kanten av gamla stan går stenbron Pont Romà över bäckfåran – trots namnet är den troligen medeltida.',
      'Under Festival de Pollença i juli–augusti hålls konserter, främst klassisk musik, i klostret Sant Domingo. Boka biljetter i god tid – konserterna blir ofta fullsatta. Port de Pollença med sin långa, grunda sandstrand ligger ca 8 minuter bort med bil.',
    ],
    tips: [
      'Gå upp för Calvaritrappan tidigt på morgonen, innan värmen och dagsbesökarna kommer',
      'I Port de Pollença hålls en mindre marknad på onsdagar',
      'Åk ut till Platja de Formentor tidigt – sommartid dagtid släpps bilar in bara tills parkeringen är full, och vägen vidare mot fyren är stängd för privatbilar',
      'Port de Pollença 8 min bort – lång sandstrand med familjekänsla',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Pollença',
      items: [
        '365 trappsteg till Calvari – en av öns bästa utsiktspunkter, gratis',
        'Söndagsmarknaden – äkta och levande, en av öns bästa marknader',
        'Festival de Pollença i juli–augusti – klassisk musik i klostret Sant Domingo',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Norr, 55 km från Palma' },
      { label: 'Bil', value: 'Ca 50 min från Palma' },
      { label: 'Marknad', value: 'Söndagar kl. 8–13' },
      { label: 'Festival de Pollença', value: 'Juli–augusti – boka tidigt' },
      { label: 'Strand', value: 'Port de Pollença 8 min' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB-linje 301 går från Palma via Inca till Pollença och vidare till Port de Pollença. Dessutom går linje 321 mellan Port de Pollença och Cala Sant Vicenç och linje 322 mellan Pollença och Port d’Alcúdia. Sommartid går linje 231 över bergen via Lluc till Sóller.' },
        { mode: 'Bil', text: 'Ta motorvägen Ma-13 från Palma mot Alcúdia och vik av mot Pollença. Vill du ha en vackrare väg kan du köra över Tramuntana via Lluc. I byn är gatorna smala – parkera i utkanten och gå in till torget.' },
        { mode: 'Från flygplatsen', text: 'Ta buss A1 in till Palma och byt till linje 301 vid Estació Intermodal.' },
      ],
      stay: {
        intro: 'Välj mellan bylivet uppe i Pollença och havet nere vid bukten:',
        areas: [
          { name: 'Pollença by.', text: 'Små hotell i gamla stenhus och lägenheter runt Plaça Major. Tyst på kvällarna, nära Calvari och marknaden. Passar par och dig som vill vandra eller cykla.' },
          { name: 'Port de Pollença.', text: 'Hotell och lägenheter längs den långa, grunda stranden och strandpromenaden. Det självklara valet för barnfamiljer, och bra utgångspunkt för Formentor.' },
          { name: 'Cala Sant Vicenç.', text: 'En liten badort med några vikar och klart vatten mellan bergen. Lugn och avskild – för dig som vill bada mer än gå på restaurang.' },
        ],
      },
      eat: {
        intro: 'Runt Plaça Major i Pollença sitter du på uteserveringarna med kaffe, tapas eller en lång lunch, och söndagsmarknaden fyller korgen med ost, oliver, korv och frukt. I Port de Pollença är det fisk, skaldjur och paella vid vattnet som gäller.',
      },
      beaches: {
        names: ['Port de Pollença', 'Platja de Formentor', 'Cala Figuera (Formentor)'],
        text: 'Stranden i Port de Pollença är lång, smal och grund. Ute på Formentorhalvön ligger den vita sandstranden Formentor och snorkelviken Cala Figuera.',
      },
      market: {
        days: 'Söndagar i Pollença · onsdagar i Port de Pollença',
        text: [
          'Söndagsmarknaden fyller Plaça Major och gatorna runt omkring på förmiddagen, med råvaror från trakten, hantverk och kläder. Ta en kaffe på torget efteråt.',
          'I Port de Pollença hålls en mindre marknad på onsdagar.',
        ],
      },
      bestTime: [
        'Våren och hösten är perfekta för vandring och cykling i bergen runt Pollença, och Calvaritrappan är skönast att gå tidigt på morgonen.',
        { text: 'Under Festival de Pollença i juli och augusti fylls klostret Sant Domingo av klassisk musik – boka biljetter i god tid. Fler evenemang hittar du i vår kalender.', link: { href: '/evenemang', label: 'Evenemang på Mallorca →' } },
      ],
      families: [
        'Port de Pollença har grunt, lugnt vatten och en lång strandpromenad för barnvagn och cykel. De 365 trappstegen upp till Calvari är en bra utmaning för större barn – räkna dem tillsammans.',
      ],
      couples: [
        'Söndagsmarknad och lunch på Plaça Major, en kväll på Festival de Pollença och en tidig morgon på Formentor innan bilarna kommer – Pollença är en av öns bästa orter för par.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 301', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/301' },
      { label: 'TIB: bättre förbindelser Pollença och Alcúdia', href: 'https://www.tib.org/en/w/els-usuaris-del-bus-tib-milloren-la-connectivitat-amb-la-zona-de-pollen%C3%A7a-i-la-badia-d-alc%C3%BAdia-a-partir-del-1-d-abril' },
      { label: 'TIB: sommartidtabeller 2026 (linje 231)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Mercadillos.org: marknaden i Pollença', href: 'https://mercadillos.org/en/pollenca/pollenca-market' },
      { label: 'Mercadillos.org: marknaden i Port de Pollença', href: 'https://mercadillos.org/en/puerto-de-pollensa/port-de-pollenca-market' },
      { label: 'DGT: trafik till Formentor 2026', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
      { label: 'Mallorca.com: Pont Romà', href: 'https://www.mallorca.com/en/guide/sights/pont-roma' },
      { label: 'BOIB 2022: Pont Romà de Pollença', href: 'https://intranet.caib.es/eboibfront/pdf/ca/2022/94/1115853' },
    ],
    mapsQuery: 'Pollenca+Mallorca',
    card: {
      description: 'Småstad med Calvaritrappan, söndagsmarknad och stenbron Pont Romà',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Pollenca_desde_El_Calvari%2C_02.jpg/960px-Pollenca_desde_El_Calvari%2C_02.jpg',
      tip: 'Gå upp till Calvari för den fina utsikten',
      top3: ['365 trappsteg till Calvari', 'Söndagsmarknaden', 'Festival de Pollença i juli–augusti'],
    },
  },
  {
    slug: 'sineu',
    name: 'Sineu',
    region: 'Inland',
    lat: 39.6432,
    lng: 3.0187,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'Marknadsbyn mitt på ön, med tåg från Palma',
    seo: {
      // Församlingskyrkan heter Santa Maria (Mare de Déu dels Àngels är Pollenças kyrka) – rättat 2026-11-18.
      description: 'Sineu i Mallorcas geografiska hjärta – öns äldsta marknad sedan 1306, djurhandel på onsdagar, kyrkan Santa Maria och tåget från Palma på ca 50 minuter.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sineu_2022_06_germanes_caritat.jpg/1920px-Sineu_2022_06_germanes_caritat.jpg',
      alt: 'Gammal fasad med gröna fönsterluckor i Sineus centrum',
      kicker: 'Centrala Mallorca · Inlandet',
      subtitle: 'Mallorcas geografiska hjärta med öns äldsta marknad – sedan kung Jaume II år 1306',
    },
    about: [
      'Sineu ligger mitt på Mallorca, och tåget från Palma tar ungefär 50 minuter. Onsdagsmarknaden har pågått sedan kung Jaume II utfärdade privilegiet år 1306, vilket gör den till öns äldsta. Levande djur, produkter från trakten, hantverk och grönsaker säljs sida vid sida på byns torg.',
      'Församlingskyrkan Santa Maria dominerar byn. Den byggdes upp på nytt efter en brand 1505, och det kraftiga klocktornet från 1549 står separat bredvid kyrkan. Framför den vaktar en bevingad lejonstaty – symbolen för Sant Marc, byns skyddshelgon. Runt Sa Plaça ligger barer och enkla restauranger med mallorkinsk vardagsmat. På marknadsdagen är de fulla redan vid lunch, så sätt dig tidigt.',
      'Sineu var också kungligt. Mellan 1309 och 1349 hade Mallorcas kungar sitt andra palats här, efter Palma. Palatset gick senare till koncepcionistnunnor, som bodde i det i över 400 år, fram till 2016. I dag bor en ny kommunitet där igen. Gå runt i gränderna bakom torget, så ser du hur mycket av den gamla byn som finns kvar.',
    ],
    tips: [
      'Djurhandeln på onsdagsmarknaden hålls på Plaça des Fossar – kom före kl. 9, då är den som livligast',
      'Ta tåget – på marknadsdagen är parkeringen i byn full',
      'Kombinera gärna med ett stopp i Petra eller Inca samma dag',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Sineu',
      items: [
        'Onsdagsmarknaden – öns äldsta marknad sedan 1306, kom tidigt',
        'Sa Plaça-torget – hjärtat av byn med kaféer och äkta mallorkinsk stämning',
        // Kyrkan är en församlingskyrka, inte en katedral.
        'Kyrkan Santa Maria – med separat klocktorn och Sant Marcs bevingade lejon framför',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Centrala Mallorca, drygt 30 km från Palma' },
      { label: 'Tåg', value: 'T3 från Palma, ca 50 min' },
      { label: 'Marknad', value: 'Onsdagar kl. 8–13' },
      { label: 'Fira de Sineu', value: 'Första söndagen i maj' },
      { label: 'Känd för', value: 'Öns äldsta marknad' },
      { label: 'Parkering', value: 'Utanför stadskärnan' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåglinje T3 mellan Palma och Manacor stannar i Sineu, och resan från Estació Intermodal tar ungefär 50 minuter. Bra på marknadsdagen, då parkeringen i byn är full.' },
        { mode: 'Bil', text: 'Kör motorvägen Ma-13 mot Inca och fortsätt på landsvägarna genom inlandet. Parkera i utkanten av byn – på onsdagar är centrum fullt av marknadsstånd.' },
        { mode: 'Från flygplatsen', text: 'Ta buss A1 in till Palma och byt till tåget T3 vid Estació Intermodal.' },
      ],
      stay: {
        intro: 'Sineu är ingen badort, utan en bas för dig som vill bo mitt på ön och nå båda kusterna:',
        areas: [
          { name: 'I byn.', text: 'Några små hotell och byhus att hyra i gränderna runt Sa Plaça. Tyst på kvällarna, levande på onsdagar. Passar par och dig som vill åka tåg i stället för att köra.' },
          { name: 'På landsbygden.', text: 'Runt Sineu ligger fincor och agroturismer bland åkrar, mandel- och fikonträd. Lugnt och plats för barn att springa, men bil är ett måste.' },
          { name: 'Som dagsutflykt.', text: 'De flesta besöker Sineu över dagen, från Palma eller kusten. Med tåget kommer du fram före marknadens rusning.' },
        ],
      },
      eat: {
        intro: 'Runt Sa Plaça och längs gatorna mot kyrkan ligger barer och enkla restauranger med mallorkinsk vardagsmat. På marknadsdagen är det fullt redan vid lunch – sätt dig tidigt eller ät lite senare. Köp gärna med dig ost, korv och bakverk från stånden.',
        dishes: [
          'Frit mallorquí – stekt innanmäte, potatis och grönsaker',
          'Porcella – ugnsstekt spädgris',
          'Sobrassada – mjuk, kryddig korv med paprika',
          'Ensaïmada – det spiralformade sockerbakverket, gott till frukostkaffet',
        ],
      },
      market: {
        days: 'Onsdagar, förmiddag',
        text: [
          'Onsdagsmarknaden fyller torgen och gatorna runt kyrkan. Kom tidigt, gärna med tåget – den är populär och blir trång framåt förmiddagen.',
          'En gång om året, traditionellt första söndagen i maj, hålls årsmässan Fira de Sineu, som är betydligt större än den vanliga marknaden.',
        ],
      },
      bestTime: [
        'En onsdag, året runt. Våren är extra fin, när landsbygden runt byn är grön – och första söndagen i maj kan du se Fira de Sineu. Sommartid blir det varmt på torgen, så gå hellre tidigt på förmiddagen.',
      ],
      families: [
        'För barn är djuren det roliga: en del av marknaden säljer levande djur. Låt dem leta upp lejonet framför kyrkan. Själva tågresan genom inlandet är också en upplevelse för de minsta.',
        { text: 'Tåget till Sineu är en av våra dagsutflykter utan bil.', link: { href: '/dagsturer-utan-bil#sineu', label: 'Dagsturer utan bil →' } },
      ],
      couples: [
        'Ta tåget en onsdagsmorgon, gå marknaden innan det blir trångt och sätt er sedan på torget med en lång lunch. Vill ni se mer av inlandet ligger Petra längre österut på samma tåglinje, och vinbyn Binissalem ligger på tåglinjen mellan Palma och Inca.',
        { text: 'Om vingårdarna i inlandet och hur du besöker dem.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/tren/-/linia/T3' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
      { label: 'Mallorca.com: Weekly market Sineu', href: 'https://www.mallorca.com/en/guide/sights/weekly-market-sineu' },
      { label: 'Mallorcaweb: Market and fair of Sineu', href: 'https://mallorcaweb.com/reports/fairs-and-markets/market-and-fair-of-sineu' },
      { label: 'Illes Balears: Church of Santa Maria, Sineu', href: 'https://illesbalears.travel/en/mallorca/church-santa-maria-sineu' },
      { label: 'Lonely Planet: Convent de la Concepció (Palau dels Reis)', href: 'https://www.lonelyplanet.com/points-of-interest/convent-de-la-concepcio/1164673' },
      { label: 'Última Hora: Palau de Sineu (2021)', href: 'https://www.ultimahora.es/noticias/part-forana/2021/05/31/1270367/llegada-grupo-monjas-permite-reabrir-palau-sineu.html' },
    ],
    mapsQuery: 'Sineu+Mallorca',
    card: {
      description: 'Mallorcas geografiska hjärta med öns äldsta marknad sedan 1306',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sineu_2022_06_germanes_caritat.jpg/960px-Sineu_2022_06_germanes_caritat.jpg',
      tip: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen',
      top3: ['Onsdagsmarknaden (sedan 1306)', 'Sa Plaça-torget', 'Kyrkan Santa Maria'],
    },
  },
  {
    slug: 'felanitx',
    name: 'Felanitx',
    region: 'Öst',
    lat: 39.4683,
    lng: 3.1481,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'Marknads- och vinstad i öst',
    seo: {
      description: 'Felanitx i östra Mallorca – traditionell stad känd för keramik, vin och stor söndagsmarknad, med Castell de Santueri och Porto Colom nära.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Felanitx%2C_Balearic_Islands%2C_Spain_-_panoramio.jpg/1920px-Felanitx%2C_Balearic_Islands%2C_Spain_-_panoramio.jpg',
      alt: 'Skogsklädda kullar och slätten kring Felanitx på östra Mallorca',
      kicker: 'Östra Mallorca · Keramik och marknad',
      subtitle: 'Inlandsstad med söndagsmarknad, vingårdar i Pla i Llevant och utsikten från Sant Salvador',
    },
    about: [
      'Felanitx är en inlandsstad där folk bor och arbetar året runt. På söndagar fyller marknaden centrum kring kyrkan Sant Miquel med grönsaker, ost, korv, keramik och hantverk. Fiskebyn Porto Colom vid kusten hör till samma kommun, ca 13 km bort, så marknaden går lätt att kombinera med en eftermiddag vid havet.',
      'Uppe på Puig de Sant Salvador (509 m), ca 5 km sydost om staden, ligger helgedomen Sant Salvador. Vägen slingrar sig ända upp, och från toppen ser du ut över östra Mallorca och havet. Nere i staden leder en bred trappa från kyrkan Sant Miquel ner till Font de Santa Margalida, den gamla brunnen som länge var stadens viktigaste vattenkälla.',
      'Felanitx är också vinbygd. Ursprungsbeteckningen Pla i Llevant har sitt kontor i staden, och flera av östra Mallorcas vingårdar ligger i kommunen. Konstnären Miquel Barceló föddes här 1957.',
    ],
    tips: [
      'Söndagsmarknaden startar tidigt – bäst är att komma vid öppning kl. 8',
      'Köp keramiken direkt från hantverkarna i stan, priserna är rimliga',
      'Kör upp till Castell de Santueri för panoramautsikt – kontrollera först att borgen är öppen för besök',
      'Kombinera med Porto Colom vid kusten för en hel dagsutflykt',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Topp 3 i Felanitx',
      items: [
        'Söndagsmarknaden med keramik från trakten',
        'Castell de Santueri med panoramautsikt',
        'Vin från vingårdarna runt Felanitx',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Östra Mallorca, 46 km från Palma' },
      { label: 'Bil', value: 'Ca 45 min från Palma' },
      { label: 'Marknad', value: 'Söndag' },
      { label: 'Känd för', value: 'Keramik, vin, medeltida borg' },
      { label: 'Stränder i närheten', value: "Cala d'Or, Porto Colom" },
    ],
    guide: {
      stay: {
        intro: 'Kommunen sträcker sig från inlandet ner till kusten, så du kan välja mellan stad, landsbygd och hav:',
        areas: [
          { name: 'Felanitx stad.', text: 'Lägenheter och små hotell i stenhusen i centrum. Vardagligt och levande året runt, nära marknaden, kyrkan och vingårdarna. Passar dig som har bil och vill se ett Mallorca där folk bor och arbetar.' },
          { name: 'Landsbygden.', text: 'Fincor och agroturismer bland vinodlingar och mandelträd. Lugnt och vackert, men bil är ett måste.' },
          { name: 'Porto Colom.', text: 'Kommunens fiskeby vid kusten, ca 13 km bort, med naturhamn och sandstrand. Bättre för barnfamiljer som vill bada varje dag.' },
        ],
      },
      eat: {
        intro: 'Felanitx är en mat- och vinstad utan krusiduller. Runt torget och kyrkan finns barer och kaféer, och på söndagsmarknaden handlar du direkt av odlarna. Paprikapulvret pebre bord, som ger sobrassadan dess färg, har en egen mässa i staden varje höst. Smaka det här:',
        dishes: [
          'Sobrassada – kryddig, bredbar korv färgad av pebre bord',
          'Pa amb oli – rostat bröd med tomat, olivolja och ost eller lufttorkad skinka',
          'Tumbet – gratäng av aubergine, potatis och paprika i tomatsås',
          'Ett glas vin från Pla i Llevant – distriktet som omfattar Felanitx',
        ],
        tips: [
          { text: 'Vingårdarna kring Felanitx tar ofta bara emot besök efter förfrågan – hör av dig i god tid, särskilt på sommaren.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
        ],
      },
      getThere: [
        { mode: 'Buss', text: 'TIB-linje 501 går mellan Palma och Manacor via Llucmajor, Campos och Felanitx. Linje 512 går mellan Felanitx och Porto Colom, och på vardagar finns en tidig direkttur från Porto Colom till Palma. Se aktuella tider på tib.org.' },
        { mode: 'Bil', text: 'Felanitx ligger i inlandet mellan Campos och Manacor. Till Porto Colom fortsätter du på Ma-4010, ca 13 km. På söndagar tar marknaden centrum i anspråk – parkera i utkanten och gå in.' },
      ],
      beaches: {
        names: ['Cala Marçal', 'Cala Sa Nau', "Cala d'Or"],
        text: "Felanitx ligger i inlandet, men kommunen når ner till kusten. Cala Marçal i Porto Colom är den största och mest lättillgängliga stranden, Cala Sa Nau är en liten vik med klart vatten, och vikarna i Cala d'Or ligger lite längre söderut.",
      },
      market: {
        days: 'Söndagar, ca kl. 8–13',
        text: ['Söndagsmarknaden fyller centrum kring kyrkan Sant Miquel och gatorna runt omkring, bland annat Carrer del 31 de Març. Här finns grönsaker, ost, korv, kryddor, keramik och hantverk. Kom tidigt – då är utbudet störst och det är svalare.'],
      },
      bestTime: [
        'En söndag för marknaden. Våren och hösten passar bäst för en tur upp till Sant Salvador och Castell de Santueri – då är det svalt nog att gå en bit.',
        { text: 'I slutet av augusti firar Felanitx Festes de Sant Agustí, med huvuddagen den 28 augusti, och i oktober hålls paprikamässan Fira del Pebre Bord. Fler fester och evenemang hittar du i vår kalender.', link: { href: '/evenemang', label: 'Evenemang på Mallorca →' } },
      ],
      families: [
        'Ta med barnen upp till Sant Salvador: vägen slingrar sig ända upp till toppen, och från utsiktsplatsen ser ni ut över östra Mallorca och havet. Borgen Castell de Santueri på en klippa utanför staden är spännande för större barn – kontrollera i förväg att den är öppen.',
        { text: 'För baddagar åker ni ner till Cala Marçal i Porto Colom, en sandstrand med lugnt vatten och service.', link: { href: '/porto-colom', label: 'Porto Colom →' } },
      ],
      couples: [
        'Söndagsmarknad och lunch i Felanitx, en eftermiddag på en vingård i Pla i Llevant och kvällsljuset från Sant Salvador. I den gamla helgedomen på toppen finns i dag ett litet hotell, om ni vill vakna med utsikt över halva ön.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'TIB: expressturer från Porto Colom och Campos', href: 'https://www.tib.org/en/w/tib-improves-the-bus-connection-with-the-joan-march-hospital-and-adds-express-services-to-palma-from-portocolom-and-campos' },
      { label: 'Mercadillos.org: marknader på söndagar', href: 'https://mercadillos.org/es/mallorca/domingo' },
      { label: 'Mallorca.com: marknaden i Felanitx', href: 'https://www.mallorca.com/ca/agenda/mercats/wochenmarkt-felanitx' },
      { label: 'Ajuntament de Felanitx: Festes de Sant Agustí 2026', href: 'https://felanitx.org/sites/cilma_felanitx/files/2026-08/FESTES%20FELANITX%202026.pdf' },
      { label: 'Reskyt (Felanitx): kyrkan Sant Miquel', href: 'https://reskyt.com/en/administration/felanitx/places-of-interest/parroquia-de-sant-miquel/162004.html' },
      { label: 'Lonely Planet: Santuari de Sant Salvador', href: 'https://www.lonelyplanet.com/spain/felanitx/attractions/santuari-de-sant-salvador/a/poi-sig/1468222/1320014' },
      { label: 'DOP Pla i Llevant: årsrapport 2024', href: 'https://doplaillevant.com/wp-content/uploads/pdfs/MEMORIA%202024%20DOP%20PLA%20I%20LLEVANT.pdf' },
      { label: 'The Calendar Mallorca: Fira del Pebre Bord 2026', href: 'https://thecalendarmallorca.com/es/events/fira-del-pebre-bord-2026-felanitx/' },
    ],
    mapsQuery: 'Felanitx+Mallorca',
    card: {
      description: 'Inlandsstad med söndagsmarknad, keramik och vingårdar',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Felanitx%2C_Balearic_Islands%2C_Spain_-_panoramio.jpg/960px-Felanitx%2C_Balearic_Islands%2C_Spain_-_panoramio.jpg',
      tip: 'Köp keramik som görs i Felanitx direkt från hantverkarna',
      top3: ['Keramik och hantverk från trakten', 'Söndagsmarknaden', 'Castell de Santueri (nära)'],
    },
  },
  {
    slug: 'manacor',
    name: 'Manacor',
    region: 'Öst',
    lat: 39.57,
    lng: 3.209,
    updated: CHECKED,
    sitemapPriority: 0.7,
    tagline: 'Pärlor, Rafa Nadal och tåg från Palma',
    seo: {
      description: 'Manacor – Mallorcas näst största stad, i östra inlandet: Majorica-pärlor, Rafa Nadals museum, måndagsmarknad och ca 20 minuter till Coves del Drac.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Panorama_Manacor_2007.JPG/1920px-Panorama_Manacor_2007.JPG',
      alt: 'Panorama över Manacor med kyrktornet över hustaken',
      kicker: 'Östra Mallorca · Näst största staden',
      subtitle: 'Näst största staden, med Majoricas pärlor, Rafa Nadals museum och nära till Coves del Drac',
    },
    about: [
      'Manacor är Mallorcas näst största stad och ligger i inlandet på öns östra sida, ungefär en timme från Palma med tåget. Det är en arbetsstad med rötter i hantverk, möbeltillverkning och jordbruk, och de flesta turister bor ute vid kusten i Porto Cristo. Det märks på måndagsmarknaden på Plaça Ramon Llull, där det mest är de som bor här som handlar.',
      // "av fiskfjäll" ströks 2026-11-18 – källorna beskriver glaskärnor som täcks lager på lager.
      'Staden är Rafa Nadals hemstad – här ligger hans tennisakademi och museet Rafa Nadal Museum Xperience. Den är också Majoricas stad: pärlföretaget som tysken Eduard Heusch grundade 1890 och som tillverkar i Manacor sedan början av 1900-talet. Pärlorna är konstgjorda, glaskärnor som täcks lager på lager tills de är svåra att skilja från äkta. Coves del Drac och vikarna på östkusten ligger ca 20 minuter bort, så med bil fungerar Manacor bra som bas.',
      'Mitt i stan reser sig klocktornet på kyrkan Nostra Senyora dels Dolors. Det blev färdigt 1923 efter 18 års bygge och är med sina 75 meter det högsta kyrktornet på Mallorca. Strax utanför centrum ligger stadens historiska museum i Torre dels Enagistes, ett välbevarat befäst gods från 1300-talet, med fynd från förhistorisk tid och mosaiker från den tidigkristna basilikan Son Peretó. Entrén är gratis.',
    ],
    tips: [
      'Åk tåget från Palma till Manacor – ungefär en timme, och du slipper bilköerna på östkustens småvägar',
      'Kombinera morgon i Manacor (marknaden på måndagar) med eftermiddag i Coves del Drac, 20 minuter bort',
      {
        text: 'Rafa Nadal Museum Xperience lönar sig om ni gillar sport.',
        link: { href: '/barn/inomhus-och-regn#rafa-nadal-museum-xperience', label: 'Museet för barnfamiljer →' },
      },
      'Flera vingårdar i Pla i Llevant tar emot besök efter bokning – små produktioner och personlig provning',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Manacor',
      items: [
        'Majoricas pärlfabrik – se hur pärlorna tillverkas för hand, handla direkt från fabriksbutiken',
        'Rafa Nadal Museum Xperience – interaktivt sportmuseum med VR-simulatorer, troféer och personliga föremål',
        'Kyrkan Nostra Senyora dels Dolors – neogotisk med Mallorcas högsta klocktorn, syns långt in över slätten',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Östra Mallorca, inland' },
      { label: 'Från flygplatsen', value: 'Flygbuss A42 på sommaren, A43 på vintern' },
      { label: 'Tåg', value: 'Direktlinje T3 från Palma (ca 1 timme)' },
      { label: 'Bästa tid', value: 'April–juni, september–oktober' },
      { label: 'Känd för', value: 'Majorica-pärlor, Rafa Nadal, Coves del Drac' },
      { label: 'I närheten', value: 'Porto Cristo (ca 14 km), Cala Varques, Coves del Drac' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåglinje T3 går från Estació Intermodal i Palma via Inca, Sineu och Petra till Manacor och tar ungefär en timme.' },
        { mode: 'Buss', text: 'Från Manacor går linje 411 till Artà och Cala Rajada och linje 501 via Felanitx och Campos till Palma.' },
        { mode: 'Från flygplatsen', text: 'Sommartid går flygbussen A42 till Manacor, Porto Cristo och Cala Millor. Vintertid (från 1 november) går A43 mellan flygplatsen och Manacor. Kontrollera på tib.org.' },
        { mode: 'Bil', text: 'Ma-15 går från Palma till Manacor och vidare mot Artà. Till Porto Cristo och grottorna kör du vägen mot kusten öster om stan.' },
      ],
      stay: {
        intro: 'Få turister bor i själva Manacor – men kommunen sträcker sig ut till kusten:',
        areas: [
          { name: 'Manacor stad.', text: 'Några stadshotell och lägenheter, vardagsliv och tåg till Palma. Passar dig som vill bo billigare och ha bil för utflykterna.' },
          { name: 'Porto Cristo.', text: 'Hamnstad med en skyddad strand mitt i stan och nära till Coves del Drac. Det givna valet för barnfamiljer i trakten.' },
          { name: 'Landsbygden.', text: 'Fincor och agroturismer mellan Manacor och kusten, ofta med pool. Lugnt, men du behöver bil.' },
        ],
      },
      eat: {
        intro: 'Manacor är en matstad för vardagsbruk: barer med tapas och dagens meny, bagerier och marknaden på måndagar. I Porto Cristo vid kusten handlar det mer om fisk och skaldjur med utsikt över hamnen.',
        dishes: [
          'Sobrassada och ost från marknaden',
          'Frit mallorquí och andra mallorkinska husmansrätter',
          'Fisk och skaldjur i Porto Cristo',
        ],
        tips: [
          { text: 'Vinområdet Pla i Llevant har flera vingårdar i och runt Manacor – boka besöket i förväg.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
        ],
      },
      beaches: {
        names: ['Porto Cristo', 'Cala Varques', 'Cala Millor'],
        text: 'Manacor ligger inåt land, men kommunen sträcker sig ut till kusten med Porto Cristo och dess skyddade stadsvik och den orörda Cala Varques. Lite längre norrut ligger den långa stranden i Cala Millor.',
      },
      market: {
        days: 'Måndagar, förmiddag',
        text: ['Måndagsmarknaden hålls på Plaça Ramon Llull i centrum – en vardagsmarknad med produkter från trakten, mer för dem som bor här än för turister.'],
      },
      bestTime: [
        'April–juni och september–oktober passar bäst för att kombinera staden med grottor och vikar på östkusten. En regnig dag är Manacor ett bra alternativ till stranden.',
        { text: 'Rafa Nadal Museum Xperience är ett bra inomhusalternativ.', link: { href: '/barn/inomhus-och-regn#rafa-nadal-museum-xperience', label: 'Om museet →' } },
        'I mitten av januari firar Manacor Sant Antoni med brasor och dansande djävlar i gatorna – en av öns största vinterfester.',
      ],
      families: [
        'Kombinera Rafa Nadal Museum Xperience med en grotta: Coves del Drac och Coves dels Hams ligger utanför Porto Cristo och fungerar även när det regnar. Välj en grotta per dag, så orkar de minsta hela visningen.',
        { text: 'Våra tips om grottorna – längd, trappor och vad som passar vilken ålder.', link: { href: '/barn/grottor', label: 'Grottor för barn →' } },
      ],
      couples: [
        'Hyr cyklar och ta Via Verda, den gamla järnvägen mellan Manacor och Artà som i dag är en knappt 30 km lång cykel- och gångväg. Avsluta med vinprovning på en vingård i Pla i Llevant eller middag i hamnen i Porto Cristo.',
        { text: 'Fler tips för par – vin, golf och lugna vikar.', link: { href: '/mallorca-for-par', label: 'Mallorca för par →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/tren/-/linia/T3' },
      { label: 'Última Hora: restid med tåg Palma–Manacor (2024)', href: 'https://www.ultimahora.es/noticias/local/2024/10/09/2256315/transporte-mallorca-retrasos-saturacion-tren-inca.html' },
      { label: 'TIB: flygbussen A42 och andra linjer', href: 'https://www.tib.org/es/w/el-govern-mejora-el-servicio-de-autobus-interurbano-tib-para-adaptarse-aumento-usuarios' },
      { label: 'TIB: vintertidtabell från 1 november 2026 (A33, A43)', href: 'https://www.tib.org/es/w/el-servei-de-bus-tib-repr%C3%A8n-els-horaris-d-hivern-l-1-de-novembre-amb-millores-en-diverses-l%C3%ADnies-de-la-xarxa' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'Mercadillos.org: marknaden i Manacor', href: 'https://mercadillos.org/mercadillo-manacor' },
      { label: 'Visit Manacor: Església Nostra Senyora dels Dolors', href: 'https://visitmanacor.com/en/patrimonio/iglesia-de-nostra-senyora-dels-dolors/' },
      { label: 'Última Hora: el campanario dels Dolors, un siglo (2023)', href: 'https://www.ultimahora.es/noticias/part-forana/2023/12/29/2076693/manacor-campanario-dels-dolors-siglo-del-simbolo-pueblo.html' },
      { label: 'Illes Balears: Museu d\'Història de Manacor – Torre dels Enagistes', href: 'https://illesbalears.travel/en/mallorca/museum-museu-dhistoria-de-manacor-torre-dels-enagistes' },
      { label: 'elDiario.es: Majorica, auge, caída y resurrección', href: 'https://www.eldiario.es/illes-balears/sociedad/perlas-espana-mujeres-mundo-auge-caida-resurrecion-majorica_1_10808525.html' },
      { label: 'Visit Manacor: Porto Cristo', href: 'https://visitmanacor.com/en/?p=1146' },
      { label: 'Mallorca Global Mag: Via Verda Manacor–Artà', href: 'https://mallorcaglobalmag.es/ruta-en-bicicleta-por-llevant-la-via-verde-manacor-arta/' },
    ],
    mapsQuery: 'Manacor+Mallorca',
    kidsNearby: ['rafa-nadal-museum-xperience', 'coves-dels-hams', 'via-verda-manacor-arta'],
    places: {
      heading: 'På kartan',
      items: [
        { text: 'Coves del Drac, Porto Cristo', href: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca' },
        { text: 'Rafa Nadal Museum Xperience', href: 'https://maps.google.com/?q=Rafa+Nadal+Museum+Xperience+Manacor' },
        { text: 'Nostra Senyora dels Dolors', href: 'https://maps.google.com/?q=Nostra+Senyora+dels+Dolors+Manacor' },
      ],
    },
    card: {
      description: 'Näst största staden – Majoricas pärlor, Rafa Nadal och måndagsmarknad',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Panorama_Manacor_2007.JPG/960px-Panorama_Manacor_2007.JPG',
      tip: 'Besök en pärlfabrik och se hur pärlorna tillverkas',
      // Stavningen följer stadssidan och varumärket: Majorica.
      top3: ['Majoricas pärlfabrik', 'Rafa Nadal Museum Xperience', 'Måndagsmarknaden'],
    },
  },
  {
    slug: 'inca',
    name: 'Inca',
    region: 'Inland',
    lat: 39.7211,
    lng: 2.9111,
    updated: CHECKED,
    sitemapPriority: 0.65,
    // Tidigare "Mallorcas tredje stad" – stämmer inte med folkmängden.
    tagline: 'Läderstaden i inlandet',
    seo: {
      description: 'Inca – läderstaden i inlandet med torsdagsmarknad, cellers (källarrestauranger) och höstmässan Dijous Bo. Drygt en halvtimme med tåg från Palma.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Inca%2C_en_Baleares_%28Espa%C3%B1a%29.jpg/1920px-Inca%2C_en_Baleares_%28Espa%C3%B1a%29.jpg',
      alt: 'Utsikt över Inca och slätten från Puig de Santa Magdalena',
      kicker: 'Centrala Mallorca · Raiguer',
      subtitle: 'Skostaden i inlandet med torsdagsmarknad, källarrestauranger och tåg från Palma på drygt en halvtimme',
    },
    about: [
      // Tidigare "Mallorcas näst folkrikaste stad" – krockade med Manacor (näst största) och stämmer inte.
      // Påståendet om skopriser jämfört med Stockholm ströks 2026-11-18 (ingen källa); skoindustrin har krympt kraftigt.
      'Inca är Mallorcas skostad. Här startade Antoni Fluxà öns första industriella skofabrik 1877, och hans barnbarn grundade Camper i Inca 1975. Det mesta av tillverkningen har flyttat utomlands, men skobutikerna och läderaffärerna finns kvar, och torsdagsmarknaden – en av öns största – fyller gatorna i centrum varje vecka. Tåget från Palma tar drygt en halvtimme.',
      'Staden är känd för sina cellers: stora källarvalv i gamla hus som började som vinförråd och i dag serverar mallorkinsk husmanskost. I november ordnas Dijous Bo, Incas stora marknadsdag och höstmässa.',
      'Ovanför staden reser sig Puig de Santa Magdalena, 307 meter högt, med en eremitkyrka med medeltida rötter och vid utsikt över slätten och Tramuntanabergen. Nere i stan kan du titta in i Claustre de Sant Domingo, den barocka klostergården från dominikanernas tid, och i kyrkan Santa Maria la Major.',
    ],
    tips: [
      'Torsdagsmarknaden – kom kl. 8.30 för bästa urvalet av skor och läder',
      'På söndagar finns en loppmarknad på Plaça del Bestiar',
      'Dijous Bo börjar redan kvällen före med Dimecres Bo – boka hotell tidigt',
      'Ta tåget från Palma – du slipper leta parkering',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Inca',
      items: [
        'Torsdagsmarknaden – en av öns största, stort urval av läderskor',
        'Cellers – traditionella källarrestauranger med äkta mallorkinska rätter',
        'Dijous Bo i november – en av Mallorcas största marknadsdagar',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Centrala Mallorca, 30 km från Palma' },
      { label: 'Tåg', value: 'Direktlinje T1 från Palma (ca 35–40 min)' },
      { label: 'Marknad', value: 'Torsdagar' },
      { label: 'Dijous Bo', value: 'En torsdag i mitten av november (2027: 18 november)' },
      { label: 'Känd för', value: 'Läder, skor, celler-mat' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåget är det enklaste sättet: linje T1 går från Estació Intermodal i Palma till Inca på drygt en halvtimme, med täta avgångar. Linjerna T2 mot Sa Pobla och T3 mot Manacor stannar också i Inca.' },
        { mode: 'Buss', text: 'TIB-bussarna 301 (mot Pollença) och 302 (mot Alcúdia) går från Palma via Inca.' },
        { mode: 'Bil', text: 'Motorvägen Ma-13 går från Palma förbi Inca. På marknadsdagen är det svårt att hitta parkering i centrum – ta hellre tåget.' },
        { mode: 'Från flygplatsen', text: 'Ta buss A1 in till Palma och tåget T1 vidare. Sommaren 2026 började flygbussen A32 (flygplatsen–Can Picafort) även trafikera Inca – kontrollera på tib.org om den går när du reser.' },
      ],
      stay: {
        intro: 'Inca är en praktisk bas mitt på ön, med tåg till Palma och nära till bergen:',
        areas: [
          { name: 'Centrum.', text: 'Några stadshotell och lägenheter nära tågstationen och marknadsgatorna. Bra för dig som vill resa runt utan bil och äta på cellers på kvällen.' },
          { name: 'Byarna vid bergen.', text: 'Selva, Caimari och Mancor de la Vall ligger vid foten av Tramuntana, bara en kort bilresa norr om Inca. Stenhus och utsikt, och nära till vandringslederna.' },
          { name: 'Landsbygden.', text: 'Fincor och agroturismer bland olivlundar och vingårdar på slätten. Lugnt och bra för familjer med bil.' },
        ],
      },
      eat: {
        intro: 'Ät åtminstone en måltid på en celler: de största källarvalven har funnits sedan 1700-talet och serverar mallorkinsk husmanskost. Boka gärna bord på helger och på Dijous Bo. Torsdagsmarknaden är också ett bra tillfälle att köpa ost, oliver och sobrassada.',
        dishes: [
          'Frit mallorquí – stekt innanmäte, potatis och grönsaker',
          'Porcella al forn – ugnsstekt spädgris',
          'Sèpia amb sobrassada – bläckfisk med kryddig korv',
          'Ensaïmada och andra bakverk från byns bagerier',
        ],
        tips: [
          { text: 'Vinbyn Binissalem ligger på tåglinjen mellan Palma och Inca, och flera vingårdar tar emot besök.', link: { href: '/vingardar', label: 'Vingårdar på Mallorca →' } },
        ],
      },
      market: {
        days: 'Torsdagar, förmiddag',
        text: [
          'Torsdagsmarknaden är en av Mallorcas största och fyller gatorna i centrum, bland annat Carrer d\'en Jaume Armengol, med allt från frukt och grönt till skor, läder och kläder.',
          'I november ordnas Dijous Bo, Incas stora marknadsdag och mässa. Festen börjar kvällen före med Dimecres Bo. På söndagar finns också en loppmarknad på Plaça del Bestiar.',
        ],
      },
      bestTime: [
        'Kom på en torsdag – det är då Inca visar sig från sin livligaste sida. Vill du uppleva Dijous Bo i november, räkna med mycket folk och ta tåget.',
        'Vår och höst är bäst för en promenad eller cykeltur upp till Santa Magdalena. Inca är en stad där folk bor och arbetar, så den lever även på vintern.',
      ],
      families: [
        'Gör en dag av tåget: åk från Palma till marknaden och ta sedan med barnen upp till Puig de Santa Magdalena, där ni ser ut över hela slätten. Det går också att köra upp.',
        { text: 'Inca är en av våra dagsutflykter med tåg.', link: { href: '/dagsturer-utan-bil#inca', label: 'Dagsturer utan bil →' } },
      ],
      couples: [
        'Torsdagsmarknad på förmiddagen, en lång lunch i en celler och en vingård i Binissalem eller på slätten på eftermiddagen. Vill ni hellre ha berg tar buss 312 er vidare via Selva och Caimari upp till Lluc.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T1', href: 'https://www.tib.org/ca/linies-i-horaris/metro/-/linia/T1' },
      { label: 'TIB: linje 301', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/301' },
      { label: 'Mercadillos.org: marknader på tisdagar och torsdagar', href: 'https://mercadillos.org/es/mallorca/martes' },
      { label: 'The Calendar Mallorca: torsdagsmarknader', href: 'https://thecalendarmallorca.com/es/events/thursday-markets-mallorca/' },
      { label: 'The Calendar Mallorca: Dimecres Bo och Dijous Bo 2026', href: 'https://thecalendarmallorca.com/events/dimecres-bo-dijous-bo-2026/' },
      { label: 'iCalendario: Dijous Bo 2026, 2027 och 2028', href: 'https://icalendario.net/fiestas-populares/dijous-bo' },
      { label: 'Ara: the Mallorcan shoemaker who planted the seed of Camper', href: 'https://en.ara.cat/business/the-story-of-the-restless-mallorcan-shoemaker-who-planted-the-seed-of-camper_1_5320205.html' },
      { label: 'Illes Balears: Hermitage Santa Magdalena', href: 'https://illesbalears.travel/en/mallorca/hermitage-santa-magdalena' },
      { label: 'Majorca Daily Bulletin: cellers på Mallorca (2025)', href: 'https://www.majorcadailybulletin.com/news/did-you-know/2025/10/22/137479/map-reveals-mallorca-most-iconic-restaurants-and-traditional-cellers.html' },
      { label: 'Majorca Daily Bulletin: linje 312 Muro–Inca–Lluc (2025)', href: 'https://www.majorcadailybulletin.com/news/did-you-know/2025/09/23/136649/new-timetables-mallorca-buses-linking-sencelles-with-palma-and-muro-with-lluc.html' },
      { label: 'Última Hora: A32 trafikerar Inca (2026)', href: 'https://www.ultimahora.es/noticias/local/2026/07/21/2674271/linea-del-tib-a32-can-picafort-aeropuerto-permitira-partir-este-miercoles-viajar-entre-alcudia-inca.html' },
    ],
    mapsQuery: 'Inca+Mallorca',
    card: {
      description: 'Skostaden med torsdagsmarknad, källarrestauranger (cellers) och tåg från Palma',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Inca%2C_en_Baleares_%28Espa%C3%B1a%29.jpg/960px-Inca%2C_en_Baleares_%28Espa%C3%B1a%29.jpg',
      tip: 'I november: höstmässan Dijous Bo',
      top3: ['Torsdagsmarknaden', 'Läderskor och väskor till rea', 'Cellers (källarrestauranger)'],
    },
  },
  {
    slug: 'capdepera',
    name: 'Capdepera',
    region: 'Öst',
    lat: 39.7019,
    lng: 3.4356,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'By under en medeltida borg, nära Cala Rajada',
    seo: {
      description: 'Capdepera i nordöstra Mallorca – medeltida borg med murar att gå på och utsikt över havet, Cala Rajada fem minuter bort och Cala Agulla för barnen.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Capdepera_with_Castle.jpg/1920px-Capdepera_with_Castle.jpg',
      alt: 'Capdepera med den medeltida borgen på kullen ovanför byn',
      kicker: 'Nordöstra Mallorca · Llevant',
      subtitle: 'By under en medeltida borg med murar att gå på, fem minuter från Cala Rajada',
    },
    about: [
      "Över Capdepera ligger Castell de Capdepera, en befäst medeltida by på kullen. Kung Jaume II lät planera den omkring år 1300, och murarna fick sin form under 1300-talet. Högst upp står den gotiska kyrkan Nostra Senyora de l'Esperança och tornet Miquel Nunis, den äldsta delen av anläggningen. Från murarna ser du ut över hela nordöstra hörnet av Mallorca och havet. Nedanför ligger byn med ljusa stenhus och smala gränder, och på onsdagar hålls marknad på Plaça de l'Orient.",
      'Badorten Cala Rajada ligger ca 5 minuter bort med bil, med hamn, fiskrestauranger och stränderna Son Moll och Cala Gat inom gångavstånd. Cala Agulla och Cala Mesquida ligger nära.',
      'Ute på udden bakom Cala Rajada står fyren Far de Capdepera, på Mallorcas östligaste punkt. Tillsammans med fyren Artrutx på Menorca markerar den sundet där öarna ligger närmast varandra. På vägen dit ligger Sa Torre Cega, en villa med skulpturträdgård som hör till Fundació Bartolomé March och som kan besökas med guide. Varje år i maj fylls Capdepera av Fira Mitjaval, en medeltidsmarknad med parader i gränderna under borgen.',
    ],
    tips: [
      'Gå upp till borgen sent på eftermiddagen, när ljuset är mjukt – kontrollera stängningstiden, den varierar med säsong',
      'Ta med picknick till borgmurarna – inga restauranger däruppe',
      "Kombinera med ett besök till Coves d'Artà som ligger nära",
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Capdepera',
      items: [
        'Castell de Capdepera – medeltida borg med murar att gå på och utsikt över nordöstra Mallorca',
        'Cala Rajada – livlig hamn- och badort med fina stränder och fiskrestauranger',
        'Fyren Far de Capdepera på Mallorcas östligaste punkt',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordost, ca 80 km från Palma' },
      { label: 'Bil', value: 'Ca 1 timme från Palma' },
      { label: 'Castell', value: 'Entréavgift, öppettider varierar med säsong' },
      { label: 'Fira Mitjaval', value: 'Medeltidsmarknad tredje helgen i maj' },
      { label: 'Cala Rajada', value: '5 min med bil' },
      { label: 'Bästa tid', value: 'Försommaren och tidig höst' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 411e går mellan Palma och Cala Rajada via Sant Llorenç, Artà och Capdepera (främst under sommarsäsongen – kontrollera på tib.org). Linje 411 går till Manacor, och under säsongen förbinder linje 325 Cala Rajada med Alcúdia längs norrkusten.' },
        { mode: 'Bil', text: 'Följ Ma-15 från Palma via Manacor och Artà. Borgen ligger högst upp i byn – gå sista biten.' },
        { mode: 'Från flygplatsen', text: 'Ta buss A1 in till Palma och fortsätt med expressbussen 411e under säsongen, eller med tåget T3 till Manacor och buss 411 vidare. Med hyrbil är det enklast.' },
      ],
      stay: {
        intro: 'De flesta bor i Cala Rajada, men det finns alternativ:',
        areas: [
          { name: 'Cala Rajada.', text: 'Badorten med flest hotell och lägenheter, hamn, strandpromenad och stränderna Son Moll och Cala Gat inom gångavstånd. Livligt på sommaren och mycket stillsamt på vintern.' },
          { name: 'Capdepera by.', text: 'Byhus och små hotell under borgen. Lugnare, mer mallorkinskt och bara några minuter från stränderna med bil.' },
          { name: 'Canyamel och Font de sa Cala.', text: 'Mindre semesterorter längre söderut längs kusten, med sandstrand och nära till Coves d\'Artà. Bra för barnfamiljer som vill ha det lugnt.' },
        ],
      },
      eat: {
        intro: 'I Cala Rajada samlas restaurangerna kring hamnen och strandpromenaden, med fisk, skaldjur och paella. Uppe i Capdepera är det enklare barer och mallorkinsk husmanskost runt torget. Onsdagsmarknaden är rätt tillfälle att köpa ost, oliver och korv till en picknick på borgen.',
        dishes: [
          'Fisk och skaldjur från hamnen i Cala Rajada',
          'Paella och arròs brut – mallorkinsk, kryddig risgryta',
          'Sobrassada och ost till picknicken',
        ],
      },
      beaches: {
        names: ['Cala Agulla', 'Cala Mesquida', 'Cala Torta', 'Cala Canyamel'],
        text: 'Cala Agulla och Cala Mesquida ligger nära Cala Rajada och har sand, tallskog och klart vatten. Inne i Cala Rajada når du Son Moll och lilla Cala Gat till fots. Cala Torta åt Artà-hållet är vildare, utan service, och Canyamel söderut är lugnare.',
      },
      market: {
        days: 'Onsdagar, förmiddag',
        text: [
          'Veckomarknaden hålls på onsdagar på Plaça de l\'Orient i byn på förmiddagen.',
          'Tredje helgen i maj ordnas Fira Mitjaval, den medeltida marknaden med stånd, parader och musik i gränderna under borgen.',
          { text: 'Grannstaden Artà har marknad på tisdagar.', link: { href: '/arta', label: 'Artà →' } },
        ],
      },
      bestTime: [
        'Försommaren och tidig höst är bäst för stränderna runt Cala Rajada. Borgen är vackrast i eftermiddagsljus – men kontrollera öppettiderna innan du går upp.',
        'Cala Rajada är mycket säsongsbetonat. Kommer du på vintern är det tyst, men borgen, fyren och promenaderna längs kusten finns kvar.',
      ],
      families: [
        'Barn tycker om att gå på borgmurarna och leta efter tornen. Stranden i Cala Agulla är lång och sandig, och i Cala Rajada kan ni gå längs strandpromenaden ut mot fyren. En mulen dag ligger Coves d\'Artà vid Canyamel nära.',
        { text: 'Grottorna på östkusten jämförda för barnfamiljer.', link: { href: '/barn/grottor', label: 'Grottor för barn →' } },
      ],
      couples: [
        'Bad i Cala Mesquida på morgonen, en guidad tur i skulpturträdgården Sa Torre Cega och eftermiddagsljuset från borgmurarna – Capdepera är en bra ort för ett par lugna dagar för två.',
        { text: 'Grannstaden Artà har tisdagsmarknad, vandring i Llevant och Sant Salvador.', link: { href: '/arta', label: 'Artà →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: expresslinje 411e Cala Rajada–Palma', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-rajada-amb-palma-a-partir-de-dimecres-11-de-juny?redirect=%2Fen%2Fnoticies%2F-%2Fasset_publisher%2FNIwXxcBhaMlh%2Frss' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
      { label: 'TIB: linje 411 Cala Rajada–Manacor', href: 'https://www.tib.org/documents/20124/420692/L411,+des+de+2025.07.11.pdf/4e7f5978-8dc9-ecff-21b3-6e4316fee459?version=1.0&t=1751622855596' },
      { label: 'TIB: linje 325 Alcúdia–Cala Rajada (2026)', href: 'https://www.tib.org/en/w/el-bus-del-tib-amplia-el-servei-a-partir-de-divendres-amb-la-reactivaci%C3%B3-de-l%C3%ADnies-a-la-zona-d-alc%C3%BAdia-i-de-ponent' },
      { label: 'Ajuntament de Capdepera: Fira Mitjaval 2026', href: 'https://ajcapdepera.net/sites/cilma_capdepera/files/2026-05/PROGRAMA%20FIRA%20MITJAVAL%202026%20ANGLES.pdf' },
      { label: 'Illes Balears: Castle of Capdepera', href: 'https://illesbalears.travel/tourist-resource/en/mallorca/castle-capdepera' },
      { label: 'Castell de Capdepera: besöket', href: 'https://capdeperacastell.com/en/visita' },
      { label: 'Mallorca.com: Far de Capdepera', href: 'https://www.mallorca.com/en/guide/sights/far-de-capdepera' },
      { label: 'Mallorca.com: Sa Torre Cega', href: 'https://www.mallorca.com/es/guia/lugares-de-interes/sa-torre-cega' },
      { label: 'Wikivoyage: Cala Ratjada', href: 'https://en.wikivoyage.org/wiki/Cala_Ratjada' },
    ],
    mapsQuery: 'Capdepera+Mallorca',
    kidsNearby: ['castell-de-capdepera', 'coves-d-arta'],
    card: {
      description: 'Medeltida borg med murar att gå på, nära Cala Rajada och Cala Agulla',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Capdepera_with_Castle.jpg/960px-Capdepera_with_Castle.jpg',
      tip: 'Gå på borgmurarna i Castell de Capdepera',
      top3: ['Castell de Capdepera', 'Cala Rajada (nära)', 'Utsikten över havet'],
    },
  },
  {
    slug: 'port-de-soller',
    name: 'Port de Sóller',
    region: 'Nordväst',
    lat: 39.7957,
    lng: 2.6938,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'Hamnby i en nästan rund vik under bergen',
    seo: {
      description: 'Port de Sóller – hamnby i en nästan rund vik i Tramuntana, med spårvagn från Sóller, två sandstränder, fyren vid Cap Gros och båtar till Sa Calobra.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Port_de_S%C3%B3ller_2.jpg/1920px-Port_de_S%C3%B3ller_2.jpg',
      alt: 'Sandstranden i Port de Sóller med båtar i viken och hus längs hamnen',
      kicker: 'Nordvästra Mallorca · Hamnby',
      subtitle: 'Hamnby i en skyddad vik under Tramuntanabergen, med fiskarkvarteret Santa Caterina och fyren vid Cap Gros',
    },
    about: [
      'Port de Sóller ligger i en nästan rund, skyddad vik under Tramuntanabergen. Spårvagnen från Sóller tar en halvtimme ner hit och stannar alldeles vid stranden.',
      'Vattnet i viken är oftast lugnt, bra för simning, snorkling och kajak. Restaurangerna längs kajen serverar fisk, skaldjur och den röda räkan gamba de Sóller. Stanna till kvällen – när dagsturisterna har åkt samlas folk längs promenaden för att se solen gå ned över viken.',
      'Viken har två stränder: Platja d\'en Repic i söder, lugnare och med spårvagnen alldeles intill, och Platja des Través vid strandpromenaden. På norra sidan ligger den gamla fiskarstadsdelen Santa Caterina, och längst ut på udden står fyren vid Cap Gros, byggd 1859.',
    ],
    tips: [
      'Ta spårvagnen från Sóller – ca en halvtimme, och passa på att sitta i de öppna vagnarna',
      'Stanna kvar till kvällen, när dagsturisterna har åkt – ät middag vid kajen när solen går ned',
      'Hyr kajak direkt vid stranden och paddla ut i viken',
      'Lunch på någon av restaurangerna med havsutsikt vid hamnen',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Topp 3 i Port de Sóller',
      items: [
        'Fyren vid Cap Gros – rundslinga på ca 6 km förbi Refugi de Muleta',
        'Båten längs Tramuntanakusten till Sa Calobra',
        'Platja d\'en Repic – den lugnaste delen av stranden',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 30 km från Palma' },
      { label: 'Spårvagn', value: 'Ca 30 min från Sóller' },
      { label: 'Känd för', value: 'Hamn, spårvagn, natur' },
      { label: 'Stränder i närheten', value: 'Platja d’en Repic, Platja des Través' },
    ],
    guide: {
      getThere: [
        { mode: 'Spårvagn', text: 'Den gamla spårvagnen går 4,9 km från Sóllers centrum ner till hamnen på ungefär en halvtimme. Enkel resa kostar ca 10 € (2026) och betalas ombord. Kommer du med Tren de Sóller från Palma byter du till spårvagnen i Sóller. Under underhållsperioder vintertid ersätts spårvagnen av buss – vintern 2026/27 från 23 november till och med 21 december 2026.' },
        { mode: 'Buss', text: 'TIB-linje 204 går hela vägen från Palma via Ma-11 och tunneln till Port de Sóller, och linje 203 kommer hit via Valldemossa och Deià. Sommartid går linje 231 från Port de Sóller över bergen till Pollença och Alcúdia.' },
        { mode: 'Bil', text: 'Följ Ma-11 genom Sóllertunneln och fortsätt förbi Sóller ner till hamnen. Parkeringen nära stranden fylls snabbt på sommaren.' },
        { mode: 'Från flygplatsen', text: 'Det finns ingen direktbuss. Ta buss A1 in till Palma och byt till linje 204, som går ända ner till hamnen.' },
        { mode: 'Båt', text: 'Under säsongen går turbåtar från hamnen längs Tramuntanakusten till Cala Tuent och Sa Calobra – det bekvämaste sättet att se klippkusten utan att köra den kurviga bergsvägen.' },
      ],
      stay: {
        intro: 'Port de Sóller är litet nog att gå runt till fots. Det som skiljer är läget i viken:',
        areas: [
          { name: 'Längs strandpromenaden.', text: 'Hotell och lägenheter med stranden och restaurangerna utanför dörren och spårvagnen intill. Bäst för barnfamiljer.' },
          { name: 'Santa Caterina.', text: 'Den gamla fiskarstadsdelen på norra sidan av viken, lite lugnare och med utsikt tillbaka mot bergen och solnedgången.' },
          { name: 'Sluttningarna runt viken.', text: 'Villor och lägenheter högre upp, ofta med havsutsikt. Räkna med branta backar och gärna bil.' },
        ],
      },
      eat: {
        intro: 'Port de Sóller är en fiskehamn, och det märks på menyerna längs kajen: fisk, skaldjur och paella med utsikt över viken. Ät gärna lite senare på kvällen, när dagsturisterna har åkt.',
        dishes: [
          'Gamba de Sóller – den röda räkan som fiskas på djupt vatten utanför kusten. Dyr, men hamnens kändaste råvara',
          'Grillad dagens fisk och paella vid hamnen',
          'Glass och apelsinjuice från Sóllerdalens citrusodlingar',
        ],
      },
      beaches: {
        names: ['Port de Sóller', 'Sa Calobra', 'Cala Tuent'],
        text: 'Stranden ligger mitt i byn, i en skyddad, nästan rund vik. Platja d\'en Repic i söder är den lugnaste delen. Vill du ha mer dramatik ligger Sa Calobra och Cala Tuent längre norrut längs Tramuntanakusten – dit går också båtar från hamnen.',
      },
      market: {
        days: 'Lördagar i Sóller',
        text: ['Närmaste stora marknad är lördagsmarknaden på torget i Sóller – ta spårvagnen upp på förmiddagen.'],
      },
      bestTime: [
        'Maj, juni och september ger varmt vatten utan högsommarens trängsel. En kväll i hamnen när dagsturisterna har åkt tillbaka till Palma är det bästa Port de Sóller har att ge.',
        'Vintertid är hamnen lugn och flera restauranger håller stängt, men det är bra vandringsväder. Kontrollera spårvagnens och tågets tidtabeller – de har uppehåll för underhåll under delar av vintern.',
      ],
      families: [
        'Viken är skyddad och stranden passar mindre barn. Spårvagnen upp till Sóller blir en egen utflykt.',
        'Promenaden upp till vakttornet Torre Picada är lagom lång för barn och ger fin utsikt över viken. Båtturen till Sa Calobra passar större barn som orkar en halvdag på sjön.',
        { text: 'Fler idéer för barnfamiljer hittar du i vår barnguide.', link: { href: '/barn', label: 'Mallorca med barn →' } },
      ],
      couples: [
        'Gå ut till fyren vid Cap Gros i eftermiddagsljuset. Intill fyren ligger Consell de Mallorcas vandrarhem Refugi de Muleta, och en rundslinga på ca 6 km tar dig dit och tillbaka. Avsluta med middag vid kajen när solen går ned.',
        { text: 'Ta spårvagnen upp till Sóller för lördagsmarknaden och lunch på torget – läs mer om byn i vår guide till Sóller.', link: { href: '/soller', label: 'Sóller →' } },
      ],
    },
    checked: '2026-11-20',
    sources: [
      { label: 'Fibwi Diario: Sóllertågets och spårvagnens vinteruppehåll 2026/27', href: 'https://www.fibwidiario.com/baleares/mallorca/tren-tranvia-soller-paran-lunes-son-fechas-regreso/20261118112127327898.html' },
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'TIB: sommartidtabeller 2026 (linje 204 och 231)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Mercadillos.org: marknaden i Sóller', href: 'https://mercadillos.org/mercadillo-soller' },
      { label: 'Ferrocarril de Sóller: tidtabeller och priser', href: 'https://trendesoller.com/eng/timetable' },
      { label: 'Ferrocarril de Sóller: spårvagnen', href: 'https://trendesoller.com/eng/routes/tram' },
      { label: 'Mallorca.com: Platja d\'en Repic', href: 'https://www.mallorca.com/es/guia/playas/repic' },
      { label: 'Turismepetit: Torre Picada', href: 'https://www.turismepetit.com/en/family-walks-mallorca/torre-picada-walk-port-soller/' },
      { label: 'Komoot: Muleta och Cap Gros-fyren', href: 'https://blog.komoot.es/smarttour/e999087794/port-de-soller-muleta-refuge-and-cap-gros-lighthouse-loop' },
      { label: 'Govern de les Illes Balears: transport marítim', href: 'https://www.caib.es/sites/transportmaritim/f/509384' },
      { label: 'Illes Balears: la gamba de Sóller', href: 'https://illesbalears.travel/en/mallorca/local-product-la-gamba-de-soller' },
    ],
    mapsQuery: 'Port+de+Soller+Mallorca',
    kidsNearby: ['jardi-botanic-de-soller', 'tren-de-soller'],
    card: {
      description: 'Hamnby i en skyddad vik med två stränder, dit spårvagnen från Sóller går',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Port_de_S%C3%B3ller_2.jpg/960px-Port_de_S%C3%B3ller_2.jpg',
      tip: 'Ta den historiska spårvagnen från Sóller',
      top3: ['Spårvagnsresan från Sóller', 'Solnedgången vid hamnen', 'Snorkling i viken'],
    },
  },
  {
    slug: 'campos',
    name: 'Campos',
    region: 'Syd',
    lat: 39.4333,
    lng: 3.0167,
    updated: CHECKED,
    sitemapPriority: 0.65,
    tagline: 'Saltstaden nära Es Trenc',
    seo: {
      description: 'Campos – saltstaden i södra Mallorca med marknad torsdagar och lördagar, Es Trenc runt hörnet, Flor de Sal och flygbuss A51 direkt från flygplatsen.',
    },
    hero: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Molins_Campos_-_panoramio.jpg/1920px-Molins_Campos_-_panoramio.jpg',
      alt: 'Väderkvarnar på slätten vid Campos i södra Mallorca',
      kicker: 'Södra Mallorca · Lantlig',
      subtitle: 'Saltstaden med två marknadsdagar och porten till Es Trenc',
    },
    about: [
      'Campos ligger på Migjorn-slätten i södra Mallorca, omgivet av jordbruksmark, mandelträd och låga stenmurar. Det är en jordbruksstad där folk bor och arbetar året runt, med sandstenskvarter, gröna fönsterluckor och torg där äldre fortfarande pratar bred mallorquí.',
      "Stadens hjärta är marknaderna – två per vecka, på torsdagar och lördagar – där bönder från trakten säljer allt från getostar och grönsaker till kryddor och grovt salt från saltpannorna söder om staden. Just saltet är Campos signatur: Flor de Sal d'Es Trenc skördas för hand i Salines d'Es Trenc, vid vägen mot Colònia de Sant Jordi. Bakom saltpannorna ligger Es Trenc, en lång naturstrand utan storskalig bebyggelse, med ljus sand och klart, grunt vatten.",
      'Stranden, våtmarken Salobrar och saltpannorna ingår i naturparken Es Trenc–Salobrar de Campos, som skyddas sedan 2017. Inne i staden är församlingskyrkan Sant Julià värd ett besök – i ett av kapellen hänger en Kristusmålning som tillskrivs Murillo. Font Santa, Balearernas enda naturliga varma källor, ligger också i kommunen.',
    ],
    tips: [
      'Gå på torsdagsmarknaden, inte lördagen – mindre folk och bönderna tar tid att prata',
      'Font Santa vid vägen mot Colònia de Sant Jordi är Balearernas enda naturliga varma källor – i dag ett spa',
      'Kom tidigt till Es Trenc i juli–augusti – parkeringarna vid stranden fylls snabbt',
      'Testa en ensaïmada från något av Campos gamla bagerier tidigt på morgonen, fortfarande varm',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Campos med omnejd',
      items: [
        'Es Trenc-stranden – lång naturstrand med turkost vatten och utan hotellkomplex, en kort biltur bort',
        'Salines d\'Es Trenc – besök saltpannorna där Flor de Sal skördas för hand, guidade turer finns',
        'Torsdags- eller lördagsmarknaden – äkta bymarknad med producenter från hela södra Mallorca',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Södra Mallorca, lantligt' },
      { label: 'Från flygplatsen', value: 'Ca 30 min med bil' },
      { label: 'Buss', value: 'Aerotib A51 går direkt mellan flygplatsen och Campos' },
      { label: 'Bästa tid', value: 'Maj–juni, september (före och efter Es Trenc-rusningen)' },
      { label: 'Känd för', value: 'Flor de Sal, Es Trenc, torsdags- och lördagsmarknad' },
      { label: 'I närheten', value: 'Es Trenc, Colònia de Sant Jordi, Ses Covetes' },
    ],
    guide: {
      stay: {
        intro: 'Campos är en bra bas för södra Mallorca om du har bil. Välj mellan småstad, strand och landsbygd:',
        areas: [
          { name: 'Campos stad.', text: 'Lägenheter och byhus i sandstenskvarteren. Vardagligt och levande året runt, med marknad två dagar i veckan och bagerier runt hörnet.' },
          { name: 'Sa Ràpita och Ses Covetes.', text: 'Kommunens små kustorter vid Es Trenc. Här bor ni nära sanden – det enklaste valet för barnfamiljer som vill bada varje dag.' },
          { name: 'Landsbygden.', text: 'Fincor och agroturismer bland mandelträd och väderkvarnar på slätten. Lugnt och vackert, men bil är ett måste.' },
        ],
      },
      eat: {
        intro: 'Campos är en jordbruksstad, och det märks på maten. På marknaderna och i bagerierna hittar du mallorkinska klassiker, och saltet från Es Trenc hamnar på bordet. Vid kusten är det fisk och ris som gäller. Smaka det här:',
        dishes: [
          'Ensaïmada – det spiralformade bakverket, bäst nybakat på morgonen',
          'Pa amb oli – rostat bröd med tomat, olivolja och ost eller skinka, gärna med ett nyp flor de sal',
          'Tumbet – gratäng av aubergine, potatis och paprika i tomatsås',
          'Coca de trempó – tunn mallorkinsk paj med tomat, paprika och lök',
        ],
      },
      getThere: [
        { mode: 'Bil', text: 'Ma-19 går från Palma förbi flygplatsen och Llucmajor till Campos – en av de enklaste turerna på ön. Es Trenc och saltpannorna ligger söder om staden.' },
        { mode: 'Buss', text: 'TIB-linje 501 går mellan Palma och Manacor via Llucmajor, Campos och Felanitx, och det finns även expressturer mellan Campos och Palma. Linje 517 går från Campos till Colònia de Sant Jordi, Ses Salines och Santanyí. Se aktuella tider på tib.org.' },
        { mode: 'Från flygplatsen', text: 'Aerotib-linje A51 går mellan flygplatsen och Campos via s\'Arenal och Llucmajor, så du behöver inte åka in till Palma först.' },
      ],
      beaches: {
        names: ['Es Trenc', 'Es Carbó'],
        text: 'Es Trenc är den stora naturstranden söder om Campos, mellan Sa Ràpita och Colònia de Sant Jordi. Parkeringarna vid stranden kostar pengar på sommaren och fylls tidigt. Längre bort mot Colònia de Sant Jordi ligger den lugnare Es Carbó.',
      },
      market: {
        days: 'Torsdagar och lördagar, förmiddag',
        text: ['Campos har marknad två förmiddagar i veckan, året runt, på och kring Plaça Major. Lördagsmarknaden är störst; på torsdagar är den mindre, med mest frukt och grönt.'],
      },
      bestTime: [
        'Maj, juni och september – före och efter högsäsongen vid Es Trenc. Besök gärna saltpannorna i samma veva.',
        { text: 'I januari firar Campos sitt skyddshelgon Sant Julià med mässa, dans och brasor, och i maj hålls Fira de Maig med djurutställningar. Fler fester och evenemang hittar du i vår kalender.', link: { href: '/evenemang', label: 'Evenemang på Mallorca →' } },
      ],
      families: [
        'Es Trenc har ljus sand och klart, grunt vatten. Det är en naturstrand, så ta med parasoll och gott om vatten. En guidad tur i saltpannorna, där ni ser saltbergen och hur flor de sal skördas, passar bra för större barn.',
        { text: 'Fler familjestränder hittar du på strandsidan, där du kan filtrera på barnvänligt.', link: { href: '/strandar', label: 'Stränder på Mallorca →' } },
      ],
      couples: [
        'Torsdagsmarknad och kaffe på Plaça Major, en eftermiddag på Es Trenc och middag i Colònia de Sant Jordi. Font Santa vid vägen mot Colònia de Sant Jordi är öns enda varma källa, i dag ett spa.',
        { text: 'Fler idéer för två hittar du i vår guide för par.', link: { href: '/mallorca-for-par', label: 'Mallorca för par →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'BOIB 2019: marknadsdagar i Campos', href: 'https://intranet.caib.es/eboibfront/pdf/es/2019/41/1030392' },
      { label: 'Mallorca.com: marknaden i Campos', href: 'https://www.mallorca.com/es/eventos/mercados/wochenmarkt-campos' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'TIB: expressturer från Porto Colom och Campos', href: 'https://www.tib.org/en/w/tib-improves-the-bus-connection-with-the-joan-march-hospital-and-adds-express-services-to-palma-from-portocolom-and-campos' },
      { label: 'BOIB 2026: TIB-linjer 517 och A51', href: 'https://intranet.caib.es/eboibfront/pdf/ca/2026/74/1221966' },
      { label: 'Govern de les Illes Balears: naturparken Es Trenc–Salobrar de Campos', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/ca/parc_natural_maritimoterrestre_es_trenc-salobrar_de_campos' },
      { label: 'Mallorca.com: Salines d\'Es Trenc', href: 'https://www.mallorca.com/es/directorio/empresa/salines-des-trenc-campos' },
      { label: 'Spain.info: Font Santa', href: 'https://www.spain.info/en/spa/font-santa/' },
      { label: 'Illes Balears: församlingsmuseet i Campos', href: 'https://illesbalears.travel/en/mallorca/museum-museu-parroquial-de-campos' },
      { label: 'The Calendar Mallorca: Sant Julià 2026', href: 'https://thecalendarmallorca.com/events/sant-julia-i-santa-basilissa-2026-campos/' },
    ],
    mapsQuery: 'Campos+Mallorca',
    places: {
      heading: 'På kartan',
      items: [
        { text: 'Salines d\'Es Trenc', href: 'https://maps.google.com/?q=Salines+d%27Es+Trenc+Mallorca' },
        { text: 'Es Trenc-stranden', href: 'https://maps.google.com/?q=Platja+des+Trenc+Mallorca' },
        { text: 'Plaça Major, Campos', href: 'https://maps.google.com/?q=Placa+Major+Campos+Mallorca' },
      ],
    },
    card: {
      description: 'Jordbruksstad med saltpannor, två marknadsdagar och Es Trenc',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Molins_Campos_-_panoramio.jpg/960px-Molins_Campos_-_panoramio.jpg',
      tip: 'Ett bra stopp på väg till Es Trenc',
      top3: ['Es Trenc-stranden (kort biltur)', 'Saltpannorna Salines', 'Lördagsmarknaden'],
    },
  },
];

/** Uppslag på slug. */
export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function cityPath(c: City): string {
  return `/${c.slug}`;
}

/** Markörer till den gemensamma <Map>-komponenten. */
export const cityMapMarkers = cities.map((c) => ({
  name: c.name,
  lat: c.lat,
  lng: c.lng,
  href: cityPath(c),
  desc: c.tagline,
  main: c.capital ?? false,
}));
