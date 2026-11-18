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
    /** Unsplash-URL utan query string. Används även som OG-bild. */
    image: string;
    alt: string;
    kicker: string;
    subtitle: string;
  };
  /** Brödtextstycken under "Om <name>". */
  about: string[];
  tips: CityTip[];
  /**
   * Tre höjdpunkter. "list" = h2-rubrik med avdelare,
   * "cards" = mindre rubrik med vita kort. Valfri.
   */
  highlights?: { variant: 'list' | 'cards'; heading: string; items: [string, string, string] };
  /** Rader i rutan "Praktisk info". */
  practical: { label: string; value: string }[];
  /** Sökfras till Google Maps-länken "Visa på karta". */
  mapsQuery: string;
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
    image: string;
    tip: string;
    top3: [string, string, string];
  };
};

/** Datum då de utbyggda sektionerna (3.2) kontrollerades mot källorna. */
const CHECKED = '2026-11-18';

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
    tagline: 'Mallorcas pulserande huvudstad',
    seo: {
      title: 'Palma de Mallorca – komplett reseguide',
      description: 'Palma de Mallorca – öns pulserande huvudstad med gotiska La Seu, livlig gamla stan och kulinarisk scen i världsklass. Insidertips från lokalkännare.',
    },
    hero: {
      image: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e',
      alt: 'La Seu-katedralen reser sig majestätiskt ovanför Palma de Mallorcas hamn i Mallorcas huvudstad',
      kicker: 'Mallorcas hjärta · Huvudstaden',
      subtitle: 'Öns pulserande huvudstad med La Seu, historisk gamla stan och livlig restaurangscen',
    },
    about: [
      'Palma är en av Medelhavseuropas mest dynamiska städer – en plats där gotisk katedral möter modernistisk arkitektur, och där lokala tapasrestauranger samsas med internationellt erkända kockars krogar. Många som kom för en vecka stannade för ett liv.',
      'La Seu-katedralen, som reser sig majestätiskt ur havet, dominerar stadsbilden och är ett av Spaniens vackraste gotiska mästerverk. Inne i gamla stan snirklar sig smala gränder förbi mörka patiohus, konstgallerier och välgömda restauranger med bara tio sittplatser.',
    ],
    tips: [
      'Besök La Seu på en vardag tidig morgon – inga köer och ljuset är magiskt',
      'Santa Catalina-kvarteret är det bästa för mat och nattliv – gå dit på kvällen',
      'Promenera eller cykla längs Passeig Marítim i solnedgången',
      'Mercat de l’Olivar är bäst på fredags- och lördagsmorgon för färska råvaror',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Palma',
      items: [
        'La Seu-katedralen – gå dit tidigt för kortare kö och det bästa ljuset',
        'Gamla stan (Casc Antic) – gå vilse i gränderna och hitta dolda barer',
        'Castell de Bellver – bästa utsikten över Palma, kom sent på eftermiddagen (stängt måndagar)',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Sydväst Mallorca, huvudstad' },
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
          'Den lokala gatumarknaden på Plaça de Pere Garau, öster om centrum, hålls tisdagar, torsdagar och lördagar.',
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
    ],
    mapsQuery: 'Palma+de+Mallorca',
    places: {
      heading: 'Hitta hit i Palma',
      items: [
        { text: 'La Seu – katedralen', href: 'https://maps.google.com/?q=La+Seu+Catedral+de+Mallorca+Palma' },
        { text: 'Castell de Bellver', href: 'https://maps.google.com/?q=Castell+de+Bellver+Palma' },
        { text: "Mercat de l'Olivar", href: 'https://maps.google.com/?q=Mercat+de+l%27Olivar+Palma' },
      ],
    },
    card: {
      description: 'Öns pulserande huvudstad med La Seu-katedralen, gamla stan och livlig restaurangscen',
      image: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=600&q=75',
      tip: 'Bästa utsikten från Bellver slott',
      top3: ['La Seu-katedralen', 'Gamla stan (Casc Antic)', 'Castell de Bellver'],
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
    tagline: 'Bergsby med historisk spårvagn',
    seo: {
      description: 'Sóller – bergsby i Tramuntana med anrik träspårvagn till havet, apelsinodlingar och torget där lokalbefolkningen möts. Svensk reseguide med insidertips.',
    },
    // TODO: generisk Tramuntana-bild som återanvänds på flera orter – byt mot Sóller-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Bergsby i Serra de Tramuntana – Sóller omgiven av apelsinlundar och klippväggar',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bergsby med historisk spårvagn, omgiven av apelsinlundar och Serra de Tramuntana',
    },
    about: [
      'Sóller ligger inbäddad i en frodig dal omgiven av Tramuntanabergens dramatiska siluetter. Det är en bergsby med franskt inflytande – en gång välbärgad tack vare handel med apelsiner och citrus, vilket syns i de modernistiska byggnaderna runt torget.',
      'Det historiska trätåget från Palma (sedan 1912) och spårvägen ner till Port de Sóller är en av Mallorcas mest ikoniska upplevelser. Port de Sóller är en halvmåneformad bukt med en avslappnad strandpromenad och bra fiskrestauranger.',
    ],
    tips: [
      'Ta det historiska trätåget från Palma – ett minne för livet (boka i förväg)',
      'Åk spårvagnen ner till Port de Sóller och ta morgonkaffet vid viken',
      'Köp färska apelsiner direkt från en bonde längs vägen in i byn',
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
        { mode: 'Tåg', text: 'Tren de Sóller har gått mellan Palma och Sóller sedan 1912 och tar ungefär en timme genom bergen. Det är en upplevelse snarare än en transport: enkel resa kostar ca 23 € (2026), och sommartid blir tågen fulla – åk tidigt eller sent på dagen.' },
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
          { name: 'Port de Sóller.', text: 'Hotell och lägenheter längs den skyddade viken. Bäst för barnfamiljer och för dig som vill bada varje dag – och se solnedgången över havet.' },
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
        text: ['Veckomarknaden fyller torget Plaça de la Constitució och gatorna runt omkring på lördagar, ungefär 8–14. Här finns frukt och grönt från dalen, oliver, ostar och hantverk. Kombinera gärna med en tur med spårvagnen.'],
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
    checked: CHECKED,
    sources: [
      { label: 'Wikipedia: Ferrocarril de Sóller', href: 'https://en.wikipedia.org/wiki/Ferrocarril_de_S%C3%B3ller' },
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'TIB: sommartidtabeller 2026 (linje 204 och 231)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Mercadillos.org: marknaden i Sóller', href: 'https://mercadillos.org/mercadillo-soller' },
    ],
    mapsQuery: 'Soller+Mallorca',
    card: {
      description: 'Bergsby omgiven av apelsinlundar med historisk spårvagn ner till havet',
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=600&q=75',
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
    tagline: 'Pittoresk fiskeby på östkusten',
    seo: {
      description: 'Porto Colom på östkusten – autentisk fiskby med en av Mallorcas vackraste naturhamnar och färsk fångst direkt från kajen. Insidertips från lokalkännare.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Porto Colom-specifik bild (naturhamnen).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Autentisk fiskeby Porto Colom på östkusten med naturlig hamn',
      kicker: 'Östkusten · Mallorca',
      subtitle: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar',
    },
    about: [
      'Porto Colom är en av Mallorcas mest autentiska fiskebyar, belägen på östkusten. Till skillnad från många andra kustorter har Porto Colom lyckats bevara sin ursprungliga karaktär med färgglada fiskebåtar, vita hus och en avslappnad atmosfär som tar dig tillbaka i tiden.',
      'Hamnen är en av de vackraste naturliga hamnarna på ön och är omgiven av pittoreska byggnader i ockra och rosa toner. På morgonen kan du se fiskarna lossa sin fångst – och om du frågar snällt säljer de direkt från båten.',
    ],
    tips: [
      'Hoppa över turistkrogarna vid hamnen – gå till baksidan av torget',
      'Fråga efter ”el peix del dia” – färsk fisk fångad samma dag',
      'Bästa solnedgången ser du från klipporna vid Caló de sa Barca Trencada',
      'Parkera vid kyrkan – parkeringen vid hamnen är alltid full',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Porto Colom',
      items: [
        'Naturhamnen – en av Mallorcas vackraste, perfekt för kvällspromenad',
        'Färsk fisk från fiskarna vid hamnen – kom tidigt på morgonen',
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
      getThere: [
        { mode: 'Bil', text: 'Kör via Felanitx, som ligger en kort bit inåt land. Parkeringen vid hamnen fylls snabbt – ställ bilen en bit upp i byn.' },
        { mode: 'Buss', text: 'En lokal TIB-linje går mellan Porto Colom och Felanitx. I Felanitx byter du till linje 501, som går via Campos och Llucmajor till Palma åt ena hållet och till Manacor åt det andra.' },
      ],
      beaches: {
        names: ['Cala Marçal', 'Cala Sa Nau'],
        text: 'Cala Marçal ligger precis utanför byn och har lugnt, barnvänligt vatten. Cala Sa Nau, söderut mot Cala d’Or, är en liten vik med klart vatten.',
      },
      market: {
        days: 'Tisdagar (och lördagar enligt vissa listor)',
        text: ['Den lilla veckomarknaden hålls i byn på tisdagar; flera marknadslistor anger även lördagar. Den stora söndagsmarknaden i Felanitx ligger nära.'],
      },
      bestTime: [
        'Maj–oktober för bad. Porto Colom är en fiskeby där folk bor året runt, så den har liv även utanför högsäsongen. En tidig morgon vid hamnen är bästa sättet att uppleva den.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: Porto Colom–Felanitx', href: 'https://www.tib.org/en/linies-i-horaris/autobus/-/linia/512' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'Mercadillos.org: marknaden i Porto Colom', href: 'https://mercadillos.org/es/portocolom/mercadillo-portocolom' },
    ],
    mapsQuery: 'Porto+Colom+Mallorca',
    card: {
      description: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
      tip: 'Fiskarna säljer direkt från båten på morgonen',
      top3: ['Naturhamnen', 'Färska fisken på morgonen', 'Kvällspromenaden längs vattnet'],
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
    tagline: 'Charmig marknadsby i söder',
    seo: {
      description: 'Santanyí i södra Mallorca – honungsgul sandsten, livlig onsdagsmarknad och konstgallerier bara minuter från Cala Llombards. Vår guide skriven inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Santanyí-specifik bild (onsdagsmarknaden / sandsten).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Marknadsby Santanyí i södra Mallorca byggd i honungsgul sandsten',
      kicker: 'Södra Mallorca · Marknadsby',
      subtitle: 'Charmig marknadsby i söder, känd för sin onsdagsmarknad och närheten till Cala Llombards',
    },
    about: [
      'Santanyí är en av Mallorcas mest charmiga byar, byggd i den karakteristiska gulbruna sandstenen som kallas ”mares”. Byn har ett levande torgliv, ett starkt konsthantverk och en avslappnad atmosfär som lockar tillbaka besökare år efter år.',
      'Onsdags- och lördagsmarknaden är en av öns bästa – här blandas lokala producenter med konsthantverk, textilier och olivoljor. På sommaren ger arkaderna skugga, och det är skönt att ta en paus på något av kaféerna runt torget.',
    ],
    tips: [
      'Onsdagsmarknaden är bättre än lördagens – mindre folk, mer lokalt',
      'Cala Llombards, en kort biltur söderut, är en av öns vackraste vikar – kom tidigt, parkeringen är liten',
      'Beställ ”pa amb oli” på baren vid kyrkan – en klassisk mallorkinsk smårätt',
      'Glöm inte galleriet Sa Quartera – gratis och riktigt bra samtidskonst',
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
        { mode: 'Buss', text: 'TIB:s expresslinje 515e går vardagar mellan Palma och Santanyí och vidare till Portopetro och Cala d’Or, utan byte i Campos. Övriga förbindelser går via Campos, med byte till linje 501 mot Palma. Se aktuell tidtabell på tib.org – utbudet är mindre på helger.' },
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
    card: {
      description: 'Charmig marknadsby känd för onsdagsmarknaden och närheten till Cala Llombards',
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=75',
      tip: 'Onsdagsmarknaden är bättre än lördagen',
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
    tagline: 'Exklusiv och lugn marinaby',
    seo: {
      description: 'Portopetro i södra Mallorca – lugn marinaby med exklusiva segelbåtar, Cala Mondragó runt hörnet och fisk direkt från hamnen. Reseguide skriven inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Portopetro-specifik bild (marinan).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Exklusiv marinaby Portopetro i södra Mallorca med segelbåtar',
      kicker: 'Sydkusten · Mallorca',
      subtitle: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar och fridfulla resenärer',
    },
    about: [
      'Portopetro är en av Mallorcas mest exklusiva och minst kända marinabyer. Belägen längs sydkusten har den lyckats undfly massturismen och bevarat sin karaktär av ett stilla fiskesamhälle – nu befolkat av segelbåtar och stillsamma flanörer.',
      'Det kristallklara vattnet i marinan speglar omgivande klippor och tallskog. Längs kajen finns några enstaka restauranger och en bar – och det är allt. Inget bråk, ingen kö, ingen DJ. Bara Medelhavet som det kan vara när det är som bäst.',
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
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 515e går vardagar mellan Palma och Cala d’Or och stannar i Santanyí, S’Alqueria Blanca, Portopetro och Cala Egos.' },
        { mode: 'Bil', text: 'Ta Ma-19 från Palma via Llucmajor och Campos mot Santanyí och fortsätt mot Cala d’Or. Parkera ovanför hamnen och promenera ner.' },
      ],
      beaches: {
        names: ['Cala Mondragó / s\'Amarador', 'Cala Ferrera', 'Caló des Moro'],
        text: 'Cala Mondragó i naturparken söder om byn är en kort biltur bort och har grunt, barnvänligt vatten. Norrut ligger vikarna i Cala d’Or, och Caló des Moro nås via Santanyí.',
      },
      market: {
        days: 'Onsdagar och lördagar i Santanyí',
        text: ['Portopetro har ingen egen veckomarknad. Närmast är marknaden i Santanyí på onsdagar och lördagar.'],
      },
      bestTime: [
        'Maj, juni och september – varmt, lugnt och ljust långt in på kvällen. Portopetro är en stilla marinaby, så den passar dig som vill undvika högsommarens fester och trängsel.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: ny expresslinje 515e', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-d-or-amb-palma-a-partir-de-dimarts-24-de-juny' },
      { label: 'Mercadillos.org: marknaden i Santanyí', href: 'https://mercadillos.org/en/santanyi/santanyi-market' },
    ],
    mapsQuery: 'Porto+Petro+Mallorca',
    card: {
      description: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar',
      image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=75',
      tip: 'Perfekt för kvällspromenad längs hamnen',
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
    tagline: 'Historisk kuststad i norr',
    seo: {
      description: 'Alcúdia i norra Mallorca – kuststad med välbevarade medeltida murar, romerska Pollentia och Platja de Muro runt hörnet. Lokalt perspektiv från vår guide.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Alcúdia-specifik bild (stadsmurarna / Pollentia).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Medeltida stadsmurar i Alcúdia – norra Mallorcas historiska kuststad',
      kicker: 'Norra Mallorca · Historisk kuststad',
      subtitle: 'En av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurar och romersk teater',
    },
    about: [
      'Alcúdia är en av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurar från 1300-talet, en romersk teater och en av öns vackraste sandstränder alldeles intill.',
      'Stadsmurarna som omger gamla stan är nästan intakta och det är lätt att promenera längs dem. Inuti murarna finns butiker, restauranger och kyrkan Sant Jaume. Alldeles utanför staden sprider sig Platja de Muro – en av Mallorcas längsta och finaste sandstränder.',
    ],
    tips: [
      'Gå hela vägen runt stadsmurarna – tar ca 30 min och ger fin utsikt',
      'Pollentia-ruinerna är öppna för besök och inkluderar en romersk teater',
      'Tisdagsmarknaden är stor och populär – kom tidigt',
      'Platja de Muro är perfekt för familjer – grunt och sandigt',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Höjdpunkter',
      items: [
        'Medeltida stadsmurarna från 1300-talet',
        'Romerska teatern Pollentia',
        'Platja de Muro – lång sandstrand 5 min bort',
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
        { mode: 'Buss', text: 'TIB-linje 302 går mellan Palma och Alcúdia via Inca och vidare till Port d’Alcúdia och Can Picafort. Lokalt finns bland annat linje 322 till Pollença och, under säsongen, linje 334 ut på Formentorhalvön och linje 325 till Cala Rajada.' },
        { mode: 'Tåg', text: 'Tåget från Palma går till Sa Pobla (linje T2), som ligger en bit inåt land. Bussen är oftast smidigare hela vägen.' },
        { mode: 'Från flygplatsen', text: 'Byt i Palma: ta buss A1 till Plaça d’Espanya och fortsätt med linje 302 från Estació Intermodal.' },
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
      { label: 'Mercadillos.org: marknaden i Alcúdia', href: 'https://mercadillos.org/en/alcudia/alcudia-market' },
    ],
    mapsQuery: 'Alcudia+Mallorca',
    card: {
      description: 'Historisk kuststad med välbevarade medeltida murar och romarteater',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
      tip: 'Besök den romerska teatern och gamla stan',
      top3: ['Medeltida stadsmurarna', 'Romerska teatern Pollentia', 'Platja de Muro (5 min)'],
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
    tagline: 'Bergsby i världsarvet Serra de Tramuntana',
    seo: {
      // Våg 1: världsarvet är Serra de Tramuntana, inte själva byn.
      description: 'Valldemossa i världsarvet Serra de Tramuntana – bergsby med kartusianklostret där Chopin bodde. Ockrafärgade stenhus och autentiskt lugn. Vår guide.',
    },
    // TODO: generisk Tramuntana-bild som delas med Deià/Pollença/Artà – byt mot Valldemossa-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Stenbelagda gränder i Valldemossa – bergsby i världsarvet Serra de Tramuntana',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bergsby i världsarvet Serra de Tramuntana, känd för Chopins vistelse och det magnifika kartusianklostret',
    },
    about: [
      'Valldemossa är en av Mallorcas mest berömda byar, inte minst tack vare den polska tonsättaren Frédéric Chopin och hans älskarinna George Sand som tillbringade vintern 1838–39 i kartusianklostret Real Cartuja. Byn är förtrollande vacker med stenhus täckta av blommor och smala gränder som slingrar sig uppför bergssluttningarna.',
      'Kartusianklostret är öppet för besökare och innehåller Chopins piano, George Sands originalhandskrifter och en privat kyrka med keramikkupoler. Byn är också känd för sina lokala bakelser – coca de patata – som säljs på torget.',
    ],
    tips: [
      'Kom tidigt på morgonen – turistbussarna anländer efter 10',
      'Klostret stänger söndagar – planera runt det',
      'Prova coca de patata vid torgets bageri – en lokal klassiker',
      'Promenera ut ur byn norrut för fantastisk utsikt över bergen',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Valldemossa',
      items: [
        'Kartusianklostret – Chopins piano och George Sands handskrifter',
        'Chopins pianosalong – en unik glimt av 1800-talets konstliv',
        'Utsikten från byn – bergen och havet i samma vy',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 18 km från Palma' },
      { label: 'Bil', value: 'Ca 25 min från Palma' },
      { label: 'Klostret', value: 'Stängt söndagar – kontrollera öppettider' },
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
        intro: 'De flesta besöker Valldemossa på en dagstur, men det är när bussarna har åkt som byn är som vackrast.',
        areas: [
          { name: 'I byn.', text: 'Ett fåtal små hotell och lägenheter i stenhusen. Passar par som vill ha lugna kvällar och tidiga morgnar i gränderna.' },
          { name: 'Fincor i bergen.', text: 'Agroturismer och lantgårdshotell på sluttningarna runt byn, ofta med utsikt mot havet. Bil behövs.' },
        ],
      },
      eat: {
        intro: 'Valldemossas specialitet är coca de patata – ett lätt, fluffigt bakverk gjort på potatis och pudrat med socker. Köp ett på något av bagerierna och ät det med en kaffe på torget. Till lunch passar mallorkinska klassiker som pa amb oli.',
      },
      market: {
        days: 'Söndagar, förmiddag',
        text: ['Den lilla söndagsmarknaden hålls vid klostret, ungefär 8–13. Tänk på att klostret Real Cartuja enligt biljettförsäljarna håller stängt på söndagar – vill du se båda, välj en annan dag för klostret.'],
      },
      bestTime: [
        'Kom tidigt på morgonen eller sent på eftermiddagen, oavsett årstid – mitt på dagen fylls byn av dagsturister. Våren och hösten är bäst för vandring i bergen runt byn.',
        'Real Cartuja har enligt biljettförsäljarna öppet måndag–lördag och stängt på söndagar. Kontrollera öppettiderna innan du åker.',
      ],
      couples: [
        'Kombinera Valldemossa med Deià längs Ma-10, en av öns vackraste bilvägar, och stanna vid utsiktsplatserna över havet. Avsluta dagen i Sóller eller Port de Sóller.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'Mallorca.com: marknaden i Valldemossa', href: 'https://www.mallorca.com/es/agenda/mercats/wochenmarkt-valldemossa' },
      { label: 'Barceló: Real Cartuja de Valldemossa', href: 'https://www.barcelo.com/guia-turismo/es/espana/mallorca/que-ver/cartuja-de-valldemossa/' },
    ],
    mapsQuery: 'Valldemossa+Mallorca',
    card: {
      description: 'Bergsby i världsarvet Serra de Tramuntana, känd för Chopin och George Sands vistelse',
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=600&q=75',
      tip: 'Besök kartusianklostret tidigt på morgonen',
      top3: ['Kartusianklostret', 'Chopins pianosalong', 'Utsikten från byn'],
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
      description: 'Deià – konstnärsby i Tramuntana med havsutsikt, Robert Graves-museet och den dolda Cala Deià nedanför. Bohemisk charm få öar kan matcha. Vår lokala guide.',
    },
    // TODO: generisk Tramuntana-bild som delas med andra bergsbyar – byt mot Deià-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Bohemisk konstnärsby Deià inbyggd i Tramuntanabergens sluttning med havsutsikt',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bohemisk konstnärsby i Tramuntanabergen med havsutsikt och Robert Graves arv',
    },
    about: [
      'Deià är en av Mallorcas mest romantiska och konstnärliga byar. Inbyggd i en bergssluttning med utsikt mot Medelhavet har den lockat konstnärer, författare och musiker i generationer. Den brittiske poeten Robert Graves levde och dog här, och hans hus är nu ett museum öppet för besökare.',
      'Cala Deià – en liten klippbadstrand nedanför byn – är en av Mallorcas vackraste och mest avskilda badplatser. Promenaden ner tar ungefär 20 minuter och belöningen är ett turkost hav omgivet av klippor och pinjeskog.',
    ],
    tips: [
      'Robert Graves hus är museum i dag – kontrollera öppettiderna innan du åker',
      'Promenera ner till Cala Deià tidigt – på eftermiddagen är det fullt',
      "Restaurang Ca'n Quet har en av öns bästa terrasser med utsikt",
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
      { label: 'Cala Deià', value: '20 min till fots från byn' },
      { label: 'Känd för', value: 'Robert Graves, konst, natur' },
      { label: 'Bästa tid', value: 'Vår och tidig höst' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB-linje 203 går från Palma via Valldemossa till Deià och vidare till Sóller och Port de Sóller. Sommartid är bussarna ofta fulla.' },
        { mode: 'Bil', text: 'Kör via Valldemossa och följ bergsvägen Ma-10 längs kusten, eller kom från Sóller åt andra hållet. Vägen är smal och kurvig, och parkeringen i byn är mycket begränsad.' },
        { mode: 'Från flygplatsen', text: 'Ingen direktbuss – ta buss A1 in till Palma och byt till linje 203.' },
      ],
      bestTime: [
        'Våren och tidig höst är bäst: behagligt för vandring längs bergsstigarna och fortfarande varmt nog för ett dopp i Cala Deià. Under högsommaren är det trångt både i byn och nere vid viken – gå ner tidigt.',
      ],
      couples: [
        'Deià är en av Mallorcas mest romantiska byar. Kombinera ett besök i Robert Graves hus med lunch på en terrass med havsutsikt och kvällen i Sóller.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
    ],
    mapsQuery: 'Deia+Mallorca',
    card: {
      description: 'Konstnärsby i Tramuntanabergen med bohemisk atmosfär och havsutsikt',
      image: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=75',
      tip: 'Robert Graves museum är ett måste',
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
    tagline: 'Medeltida bergsby i öst',
    seo: {
      description: "Artà – medeltida bergsstad i östra Mallorca med borgen Santuari de Sant Salvador, stensatta gränder och Coves d'Artà. Svensk reseguide skriven inifrån.",
    },
    // TODO: bilden återanvänds på flera orter – byt mot Artà-specifik bild (Santuari de Sant Salvador).
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Medeltida bergsstad Artà i östra Mallorca med stensatta gränder',
      kicker: 'Östra Mallorca · Levant',
      subtitle: 'Historisk bergsstad med imponerande medeltida borg och vackra stensatta gränder',
    },
    about: [
      'Artà domineras av Santuari de Sant Salvador – ett fort och kloster högt uppe på kullen som vaktat staden i generationer. Promenaden uppför de gamla trapporna ger en magnifik panoramautsikt över hela östra Mallorca och havet bortom. Byn nedan är ett mysigt virrvarr av stensatta gränder och pittoreska torg.',
      "I närheten ligger Coves d'Artà – en av öns mest imponerande grottor med enorma stalaktiter och stalagmiter. Tisdagsmarknaden lockar lokalbefolkning från hela regionen och är ett av de bästa tillfällena att uppleva äkta mallorkinsk livsstil.",
    ],
    tips: [
      'Borgen Santuari de Sant Salvador – fri entré och fantastisk utsikt',
      'Tisdagsmarknaden är en av öns mest autentiska – kom på förmiddagen',
      "Coves d'Artà ligger 15 min bort – kombinera gärna besöken",
      'Restaurangerna runt torget serverar klassisk mallorkinsk mat – prova frit mallorquí',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Artà',
      items: [
        'Santuari de Sant Salvador – medeltida borg med panoramautsikt, fri entré',
        "Coves d'Artà – en av öns vackraste grottor, kort biltur från byn",
        'Tisdagsmarknaden – autentisk och lokal, en av öns bästa',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Öst, 80 km från Palma' },
      { label: 'Bil', value: 'Ca 60 min från Palma' },
      { label: 'Marknad', value: 'Tisdagar' },
      { label: "Coves d'Artà", value: '15 min med bil' },
      { label: 'Borgen', value: 'Fri entré, öppen dagligen' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 411e går mellan Palma och Cala Rajada via Sant Llorenç, Artà och Capdepera, med flera avgångar per dag. Den vanliga linje 411 går mellan Cala Rajada, Artà och Manacor, där du kan byta till tåget mot Palma.' },
        { mode: 'Bil', text: 'Följ Ma-15 från Palma via Manacor till Artà. Parkera i utkanten – gränderna i den gamla stadskärnan är smala.' },
        { mode: 'Tåg', text: 'Tåget från Palma (linje T3) går till Manacor. Därifrån tar du buss 411 vidare till Artà.' },
      ],
      beaches: {
        names: ['Cala Torta', 'Cala Mesquida', 'Cala Agulla'],
        text: 'Norr om Artà ligger de orörda naturstränderna Cala Torta och Cala Mesquida. Cala Agulla vid Cala Rajada har mer service och passar barnfamiljer.',
      },
      market: {
        days: 'Tisdagar, förmiddag',
        text: ['Tisdagsmarknaden hålls på och runt Plaça del Conqueridor, ungefär 9–14. Den är lokal och levande, med råvaror, kläder och hantverk – ett bra tillfälle att se byn när den är som mest vaken.'],
      },
      bestTime: [
        'Våren och hösten passar Artà bäst: då är det skönt att gå upp till Sant Salvador och vandra i naturparken Península de Llevant. Sommartid är förmiddagen bäst för promenaden upp till borgen.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: expresslinje 411e Cala Rajada–Palma', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-rajada-amb-palma-a-partir-de-dimecres-11-de-juny?redirect=%2Fen%2Fnoticies%2F-%2Fasset_publisher%2FNIwXxcBhaMlh%2Frss' },
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/T3' },
      { label: 'Mercadillos.org: marknaden i Artà', href: 'https://mercadillos.org/mercadillo-arta' },
    ],
    mapsQuery: 'Arta+Mallorca',
    card: {
      description: 'Historisk bergsstad med imponerande borg och vackra gränder',
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=75',
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
    tagline: 'Charmig by i sydväst',
    seo: {
      description: "Andratx i sydvästra Mallorca – lugn stadskärna med Port d'Andratx marina och Camp de Mar några minuter bort. Klippkullar och exklusiv atmosfär. Vår guide.",
    },
    // TODO: bilden återanvänds på flera orter – byt mot Andratx-specifik bild (Port d'Andratx).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Lugn stadskärna i Andratx i sydvästra Mallorca med Tramuntanabergen i bakgrunden',
      kicker: 'Sydvästra Mallorca · Tramuntana',
      subtitle: 'Lugn stadskärna i sydväst med exklusiv marina och dramatisk bergskuliss',
    },
    about: [
      "Andratx är en dubbel destination – den lugna stadskärnan uppe i en dal och den exklusiva Port d'Andratx nere vid havet. Stadskärnan har en avslappnad autenticitet med en onsdagsmarknad och ett levande torgliv, medan hamnen är en av Mallorcas snyggaste med lyxiga segelbåtar och exklusiva restauranger.",
      'Centre Cultural Andratx är ett av öns bästa konstgallerier och är värt ett besök oavsett om du är konstintresserad eller bara vill njuta av den vackra byggnaden och trädgården. Camp de Mar strax norr om hamnen är en av de finaste stränderna i sydväst.',
    ],
    tips: [
      "Port d'Andratx vid solnedgång – bäst sett från kajen med ett glas cava",
      'Camp de Mar – stranden dit lokalborna tar sina barn',
      'Centre Cultural Andratx – samtidskonst i vacker miljö, kontrollera öppettiderna',
      'Onsdagsmarknad i stadskärnan – mindre känd men värd besöket',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Andratx',
      items: [
        "Port d'Andratx marina – en av öns snyggaste hamnar med lyxbåtar och terrasser",
        'Camp de Mar-stranden – lugn och vacker sandstrand norr om hamnen',
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
        { mode: 'Bil', text: 'Följ Ma-1 från Palma längs sydvästkusten till Andratx. Port d’Andratx ligger en kort bit nedanför byn vid havet.' },
        { mode: 'Buss', text: 'TIB-bussar går från Palma via Calvià-kusten till Andratx, Camp de Mar och Port d’Andratx. Linjenummer och tidtabeller finns på tib.org under linjerna i 100-serien (Ponent).' },
      ],
      market: {
        days: 'Onsdagar, förmiddag',
        text: ['Veckomarknaden hålls i byn Andratx uppe i dalen – inte nere i Port d’Andratx.'],
      },
      bestTime: [
        'Maj, juni och september är bäst – varmt och lugnt, och Port d’Andratx är som vackrast vid solnedgången.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: Port d’Andratx–Palma (tidtabell 2026)', href: 'https://www.tib.org/documents/20124/420683/L101,+des+de+2026.03.27.pdf/2f0109aa-6618-2b15-9617-172fb8a7a774?version=1.0&t=1774262193975' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
    ],
    mapsQuery: 'Andratx+Mallorca',
    card: {
      description: "Lugn stadskärna i sydväst nära Port d'Andratx med fin marina",
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75',
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
    tagline: 'Historisk stad i norr',
    seo: {
      // Våg 1 rättade evenemanget till Festival de Pollença (klassisk musik i klostret Sant Domingo).
      description: 'Pollença i norra Mallorca – autentisk by med 365 trappsteg till Calvari, söndagsmarknad vid torget och sommarfestival i klostret. Insidertips från lokalkännare.',
    },
    // TODO: generisk Tramuntana-bild – byt mot Pollença-specifik bild (Calvari-trappan).
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Historisk stadsbild i Pollença i norra Mallorca med stenhus och medeltida torg',
      kicker: 'Norra Mallorca · Raiguer',
      subtitle: 'Autentisk by med 365 cypresskantade trappsteg, söndagsmarknad och anrik sommarfestival',
    },
    about: [
      'Pollença är en av Mallorcas mest autentiska städer med en stark lokal identitet och lite turistifiering. De 365 cypresskantade trappstegen upp till Calvari är ett måste – en andfådd men värdig promenad som belönar med en av öns vackraste utsikter. Nere på torget pågår söndagsmarknaden varje vecka, år efter år.',
      'Festival de Pollença i juli–augusti är en av Spaniens mest anrika sommarfestivaler – främst klassisk musik i klostret Sant Domingo under stjärnhimlen. Boka biljetter i god tid, konserterna blir ofta fullsatta. En kort biltur bort ligger Port de Pollença med en lång sandstrand.',
    ],
    tips: [
      'Gå upp för Calvaritrappan tidigt på morgonen – då är ljuset magiskt',
      'Söndagsmarknaden kl. 8–13 – lokalt och äkta, ta fika på torget',
      'Festival de Pollença i juli–augusti – boka tidigt, konserter i klostret Sant Domingo',
      'Port de Pollença 8 min bort – lång sandstrand med familjekänsla',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Pollença',
      items: [
        '365 trappsteg till Calvari – en av öns bästa utsiktspunkter, gratis',
        'Söndagsmarknaden – autentisk och lokal, en av öns bästa marknader',
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
        { mode: 'Buss', text: 'TIB-linje 301 går från Palma via Inca till Pollença och vidare till Port de Pollença. Lokalt går linje 321 mellan Port de Pollença och Cala Sant Vicenç och linje 322 mellan Pollença och Port d’Alcúdia. Sommartid går linje 231 över bergen via Lluc till Sóller.' },
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
          'Söndagsmarknaden fyller Plaça Major och gatorna runt omkring, ungefär 9–13.30, med lokala råvaror, hantverk och kläder. Ta en kaffe på torget efteråt.',
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
    ],
    mapsQuery: 'Pollenca+Mallorca',
    card: {
      description: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
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
    tagline: 'Charmig marknadsby i centrum',
    seo: {
      description: 'Sineu i Mallorcas geografiska hjärta – öns äldsta marknad sedan 1306, levande torg och kyrkan Mare de Déu dels Àngels. Svensk reseguide från lokalkännare.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Sineu-specifik bild (Sa Plaça / onsdagsmarknaden).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Marknadstorget i Sineu – Mallorcas geografiska hjärta med öns äldsta marknad',
      kicker: 'Centrala Mallorca · Inland',
      subtitle: 'Mallorcas geografiska hjärta med öns äldsta marknad – sedan kung Jaume II år 1306',
    },
    about: [
      'Sineu är beläget i exakt centrum av Mallorca – geografiskt och kulturellt. Onsdagsmarknaden har pågått sedan kung Jaume II utfärdade privilegiet år 1306, vilket gör den till öns äldsta. Levande djur, lokala produkter, hantverk och grönsaker säljs sida vid sida på stadens olika torg.',
      'Kyrkan Mare de Déu dels Àngels dominerar stadsbilden med sin imponerande fasad och torn. Sa Plaça är torgets hjärta med kaféer och barer som serverar ärlig mat till ärliga priser – utan turistpåslag. Det är Mallorca som det en gång var.',
    ],
    tips: [
      'Onsdagsmarknaden – kom kl. 8 för bästa upplevelsen, det är fullt efter kl. 10',
      'Fråga lokalt om djurmarknaden – hålls på ett separat torg',
      'Fixa fika på Sa Plaça – torgets kaffebar är perfekt för att se livet gå',
      'Kombinera gärna med ett stopp i Petra eller Inca samma dag',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Sineu',
      items: [
        'Onsdagsmarknaden – öns äldsta marknad sedan 1306, kom tidigt',
        'Sa Plaça-torget – hjärtat av byn med kaféer och äkta mallorkinsk stämning',
        // Kyrkan är en församlingskyrka, inte en katedral.
        'Kyrkan Mare de Déu dels Àngels – imponerande gotisk kyrka mitt i byn',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Centrala Mallorca, 30 km från Palma' },
      { label: 'Bil', value: 'Ca 30 min från Palma' },
      { label: 'Marknad', value: 'Onsdagar kl. 8–13' },
      { label: 'Känd för', value: 'Öns äldsta marknad' },
      { label: 'Parkering', value: 'Utanför stadskärnan' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåglinje T3 mellan Palma och Manacor stannar i Sineu. Perfekt på marknadsdagen, då parkeringen i byn är full.' },
        { mode: 'Bil', text: 'Kör motorvägen Ma-13 mot Inca och fortsätt på landsvägarna genom inlandet. Parkera i utkanten av byn.' },
      ],
      market: {
        days: 'Onsdagar, förmiddag',
        text: ['Onsdagsmarknaden fyller torgen och gatorna runt kyrkan. Kom tidigt, gärna med tåget – den är populär och blir trång framåt förmiddagen.'],
      },
      bestTime: [
        'En onsdag, året runt. Våren är extra fin, när landsbygden runt byn är grön.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/T3' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
    ],
    mapsQuery: 'Sineu+Mallorca',
    card: {
      description: 'Mallorcas geografiska hjärta med öns äldsta marknad sedan 1306',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=75',
      tip: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen',
      top3: ['Onsdagsmarknaden (sedan 1306)', 'Sa Plaça-torget', 'Kyrkan Mare de Déu dels Àngels'],
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
    tagline: 'Historisk stad i sydöst',
    seo: {
      description: 'Felanitx i östra Mallorca – traditionell stad känd för lokal keramik, vin och stor söndagsmarknad. Castell de Santueri på nära håll. Svensk guide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Felanitx-specifik bild (keramik / Castell de Santueri).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Traditionell inlandsstad Felanitx i östra Mallorca känd för keramik och vinodling',
      kicker: 'Östra Mallorca · Keramik och marknad',
      subtitle: 'Autentisk inlandsstad känd för sin fina keramik, lokala viner och livlig söndagsmarknad',
    },
    about: [
      "Felanitx är en autentisk inlandsstad känd för sin fina keramik, lokala viner och en livlig söndagsmarknad. Nära Cala d'Or och Porto Colom – ett perfekt mellanstopp på en dag längs östkusten.",
      'Uppe på Puig de Sant Salvador (509 m) finns ett kloster med fantastisk utsikt över hela östra Mallorca – ett besök värt att planera in. Nere i staden präglas torget av den imponerande kyrkan Sant Miquel.',
    ],
    tips: [
      'Söndagsmarknaden startar tidigt – bäst är att komma vid öppning kl. 8',
      'Köp lokal keramik direkt från hantverkarna, priserna är rimliga',
      'Kör upp till Castell de Santueri för fantastisk panoramautsikt',
      'Kombinera med Porto Colom vid kusten för en hel dagsutflykt',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Höjdpunkter',
      items: [
        'Söndagsmarknaden med lokal keramik',
        'Castell de Santueri med panoramautsikt',
        'Lokalt vin från vingårdarna runt Felanitx',
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
      getThere: [
        { mode: 'Buss', text: 'TIB-linje 501 går mellan Palma och Manacor via Llucmajor, Campos och Felanitx. En lokal linje fortsätter ner till Porto Colom.' },
        { mode: 'Bil', text: 'Felanitx ligger i inlandet mellan Campos och Manacor. Kör gärna vidare till Porto Colom vid kusten samma dag.' },
      ],
      beaches: {
        names: ['Cala Marçal', 'Cala Sa Nau'],
        text: 'Närmaste stränder ligger vid kusten kring Porto Colom: Cala Marçal precis utanför byn och den lilla viken Cala Sa Nau.',
      },
      market: {
        days: 'Söndagar, förmiddag',
        text: ['Söndagsmarknaden hålls i centrum, bland annat längs Carrer del 31 de Març, ungefär 9–14. Här finns lokala råvaror, keramik och hantverk.'],
      },
      bestTime: [
        'En söndag för marknaden. Våren och hösten passar bäst för en tur upp till klostret på Puig de Sant Salvador och borgen Castell de Santueri.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'Mercadillos.org: marknader på söndagar', href: 'https://mercadillos.org/es/mallorca/domingo' },
    ],
    mapsQuery: 'Felanitx+Mallorca',
    card: {
      description: 'Traditionell stad känd för keramik, vin och söndagsmarknad',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
      tip: 'Köp lokal keramik direkt från hantverkarna',
      top3: ['Lokal keramik och hantverk', 'Söndagsmarknaden', 'Castell de Santueri (nära)'],
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
    tagline: 'Öns näst största stad – pärlor och Rafa Nadal',
    seo: {
      description: 'Manacor – Mallorcas näst största stad på östkusten. Pärlor, Rafa Nadals hemstad och porten till Coves del Drac. Insidertips från lokalkännare.',
    },
    // TODO: generisk landsbygdsbild som återanvänds på sajten – byt mot Manacor-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f',
      alt: 'Mallorcas landsbygd med mandelträd, olivlundar och torrmurar – östra slätten kring Manacor',
      kicker: 'Östra Mallorca · Näst största staden',
      subtitle: 'Pärlstaden med Rafa Nadals hemmaplan – porten till öns östkust och Coves del Drac',
    },
    about: [
      'Manacor är Mallorcas näst största stad och ligger mitt på öns östra sida. Till skillnad från kustbyarna skriker den inte efter uppmärksamhet. Det här är en arbetsstad med gamla rötter i hantverk och jordbruk – och just därför en av de mest autentiska platserna du kan besöka på ön.',
      'Staden är mest känd som hemstad till Rafael Nadal, som fortfarande bor här, och för Majorica – fabriken som sedan 1890 tillverkar konstgjorda pärlor av fiskfjäll i ett så förfinat hantverk att de nästan är omöjliga att skilja från äkta. Tillsammans med den närliggande Coves del Drac och östkustens vikar gör detta Manacor till en perfekt bas för utforskning, inte bara en genomfartsort.',
    ],
    tips: [
      'Åk tåget från Palma till Manacor – ungefär en timme, och du slipper bilköerna på östkustens småvägar',
      'Kombinera morgon i Manacor (marknaden på måndagar) med eftermiddag i Coves del Drac, 20 minuter bort',
      {
        text: 'Rafa Nadal Museum Xperience är värt det om du är sportintresserad – men om du bara vill se troféer räcker det att titta in genom fönstret.',
        link: { href: '/barn/inomhus-och-regn#rafa-nadal-museum-xperience', label: 'Se familjeanpassad guide →' },
      },
      'Vingården Bodega Miquel Gelabert tar emot besök efter bokning – små produktioner och personlig provning',
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
      { label: 'Flyg', value: '45 min från PMI-flygplatsen' },
      { label: 'Tåg', value: 'Direktlinje från Palma (ca 1 timme, avgång varje timme)' },
      { label: 'Bästa tid', value: 'April–juni, september–oktober' },
      { label: 'Känd för', value: 'Majorica-pärlor, Rafa Nadal, Coves del Drac' },
      { label: 'I närheten', value: 'Porto Cristo (10 km), Cala Varques, Coves del Drac' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåglinje T3 går från Estació Intermodal i Palma via Inca, Sineu och Petra till Manacor och tar ungefär en timme.' },
        { mode: 'Buss', text: 'Från Manacor går linje 411 till Artà och Cala Rajada och linje 501 via Felanitx och Campos till Palma.' },
        { mode: 'Från flygplatsen', text: 'Flygbussen A42 går mellan flygplatsen och östkusten och stannar bland annat i Manacor, Porto Cristo och Cala Millor. Kontrollera på tib.org att den går under din resa.' },
        { mode: 'Bil', text: 'Ma-15 går från Palma till Manacor och vidare mot Artà.' },
      ],
      beaches: {
        names: ['Porto Cristo', 'Cala Varques', 'Cala Millor'],
        text: 'Manacor ligger inåt land, men kommunen sträcker sig ut till kusten med Porto Cristo och dess skyddade stadsvik och den orörda Cala Varques. Lite längre norrut ligger den långa stranden i Cala Millor.',
      },
      market: {
        days: 'Måndagar, förmiddag',
        text: ['Måndagsmarknaden hålls på Plaça Ramon Llull i centrum – en vardagsmarknad med lokala produkter, mer för dem som bor här än för turister.'],
      },
      bestTime: [
        'April–juni och september–oktober passar bäst för att kombinera staden med grottor och vikar på östkusten. En regnig dag är Manacor ett bra alternativ till stranden.',
        { text: 'Rafa Nadal Museum Xperience är ett bra inomhusalternativ.', link: { href: '/barn/inomhus-och-regn#rafa-nadal-museum-xperience', label: 'Om museet →' } },
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T3', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/T3' },
      { label: 'Última Hora: restid med tåg Palma–Manacor (2024)', href: 'https://www.ultimahora.es/noticias/local/2024/10/09/2256315/transporte-mallorca-retrasos-saturacion-tren-inca.html' },
      { label: 'TIB: flygbussen A42 och andra linjer', href: 'https://www.tib.org/es/w/el-govern-mejora-el-servicio-de-autobus-interurbano-tib-para-adaptarse-aumento-usuarios' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
      { label: 'Mercadillos.org: marknaden i Manacor', href: 'https://mercadillos.org/mercadillo-manacor' },
    ],
    mapsQuery: 'Manacor+Mallorca',
    places: {
      heading: 'Hitta hit i Manacor',
      items: [
        { text: 'Coves del Drac, Porto Cristo', href: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca' },
        { text: 'Rafa Nadal Museum Xperience', href: 'https://maps.google.com/?q=Rafa+Nadal+Museum+Xperience+Manacor' },
        { text: 'Nostra Senyora dels Dolors', href: 'https://maps.google.com/?q=Nostra+Senyora+dels+Dolors+Manacor' },
      ],
    },
    card: {
      description: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal',
      image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=600&q=75',
      tip: 'Besök en pärlafabrik och se hur de tillverkas',
      // Stavningen följer stadssidan och varumärket: Majorica.
      top3: ['Majoricas pärlfabrik', 'Rafa Nadal Academy', 'Måndagsmarknaden'],
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
      description: 'Inca – Mallorcas läderstad i inland, med stor torsdagsmarknad, traditionella cellers i vinkällare och lädermässan Dijous Bo i november. Reseguide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Inca-specifik bild (torsdagsmarknaden / cellers).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Läderstaden Inca i centrala Mallorca',
      kicker: 'Centrala Mallorca · Raiguer',
      subtitle: 'Mallorcas läderhuvudstad med berömd torsdagsmarknad och traditionella källarrestauranger',
    },
    about: [
      // Tidigare "Mallorcas näst folkrikaste stad" – krockade med Manacor (näst största) och stämmer inte.
      'Inca är en av Mallorcas största städer och känd som öns läderhuvudstad. Läderfabriker och butiker har producerat skor, väskor och bälten här i generationer, och torsdagsmarknaden – en av öns största – lockar köpare från hela Mallorca. Priserna på kvalitetsskor är ofta långt under det du betalar i Stockholm.',
      'Celler-restaurangerna är en tradition i Inca – källare under gamla stadshus som började som vinförråd och nu serverar traditionell mallorkinsk mat. Dijous Bo i november är en av Mallorcas största marknadsdagar.',
    ],
    tips: [
      'Torsdagsmarknaden – kom kl. 8.30 för bästa urvalet av skor och läder',
      'Celler-restaurang till lunch – ärlig mallorkinsk mat i vinkällare',
      'Dijous Bo i november – öns största marknadshändelse, boka hotell tidigt',
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
      { label: 'Tåg', value: 'Direktlinje från Palma (30 min)' },
      { label: 'Marknad', value: 'Torsdagar' },
      { label: 'Dijous Bo', value: 'November – öns största' },
      { label: 'Känd för', value: 'Läder, skor, celler-mat' },
    ],
    guide: {
      getThere: [
        { mode: 'Tåg', text: 'Tåget är det enklaste sättet: linje T1 går från Estació Intermodal i Palma till Inca på drygt en halvtimme, med täta avgångar. Linjerna T2 mot Sa Pobla och T3 mot Manacor stannar också i Inca.' },
        { mode: 'Buss', text: 'TIB-bussarna 301 (mot Pollença) och 302 (mot Alcúdia) går från Palma via Inca.' },
        { mode: 'Bil', text: 'Motorvägen Ma-13 går från Palma förbi Inca. På marknadsdagen är det svårt att hitta parkering i centrum – ta hellre tåget.' },
      ],
      market: {
        days: 'Torsdagar, förmiddag',
        text: [
          'Torsdagsmarknaden är en av Mallorcas största och fyller gatorna i centrum, bland annat Carrer d’en Jaume Armengol, med allt från frukt och grönt till skor, läder och kläder.',
          'I november ordnas Dijous Bo, Incas stora marknadsdag och mässa. På söndagar finns också en loppmarknad på Plaça del Bestiar.',
        ],
      },
      bestTime: [
        'Kom på en torsdag – det är då Inca visar sig från sin livligaste sida. Vill du uppleva Dijous Bo i november, räkna med mycket folk och ta tåget.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: tåglinje T1', href: 'https://www.tib.org/ca/linies-i-horaris/metro/-/linia/T1' },
      { label: 'TIB: linje 301', href: 'https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/301' },
      { label: 'Mercadillos.org: marknader på tisdagar och torsdagar', href: 'https://mercadillos.org/es/mallorca/martes' },
      { label: 'The Calendar Mallorca: torsdagsmarknader', href: 'https://thecalendarmallorca.com/es/events/thursday-markets-mallorca/' },
    ],
    mapsQuery: 'Inca+Mallorca',
    card: {
      description: 'Läderstaden med berömd torsdagsmarknad och källarviner',
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=75',
      tip: 'November – kom på den stora lädermässan',
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
    tagline: 'By med imponerande borg',
    seo: {
      description: 'Capdepera i nordöstra Mallorca – medeltida fort med panoramautsikt över havet och Cala Rajada några minuter bort. Solnedgångens bästa vy. Reseguide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Capdepera-specifik bild (Castell de Capdepera).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Pittoresk by i nordöstra Mallorca – Capdepera med det medeltida fortet',
      kicker: 'Nordöstra Mallorca · Llevant',
      subtitle: 'Pittoresk by dominerad av ett mäktigt medeltida fort med panoramautsikt över nordöstra Mallorca',
    },
    about: [
      'Capdepera domineras av Castell de Capdepera – ett enormt medeltida fort som kröner kullen ovanför byn. Inifrån murarna har du en fantastisk panoramautsikt över hela nordöstra hörnet av Mallorca, havet och bortom. Byn nedan är charmig med vita hus och blomsterprydda gränder.',
      'Strax nedanför ligger Cala Rajada – ett livligt fiskeläge och badort med flera fina stränder. Solnedgångarna sett från borgmurarna är spektakulära och ett av de bästa fotomotiven på norra Mallorca.',
    ],
    tips: [
      'Besök borgen vid solnedgång – utsikten och ljuset är oöverträffat',
      'Cala Rajada 5 min bort – bra stränder och fiskrestauranger',
      'Ta med picknick till borgmurarna – inga restauranger däruppe',
      "Kombinera med ett besök till Coves d'Artà som ligger nära",
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Capdepera',
      items: [
        'Castell de Capdepera vid solnedgång – panoramautsikt och magiskt ljus',
        'Cala Rajada – livlig hamn- och badort med fina stränder och fiskrestauranger',
        'Panoramautsikten över havet – en av nordöstra Mallorcas bästa utsiktspunkter',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordöst, 80 km från Palma' },
      { label: 'Bil', value: 'Ca 60 min från Palma' },
      { label: 'Castell', value: 'Entré krävs, öppet dagligen' },
      { label: 'Cala Rajada', value: '5 min med bil' },
      { label: 'Bästa tid', value: 'Solnedgången från borgen' },
    ],
    guide: {
      getThere: [
        { mode: 'Buss', text: 'TIB:s expresslinje 411e går mellan Palma och Cala Rajada via Sant Llorenç, Artà och Capdepera. Linje 411 går till Manacor, och under säsongen förbinder linje 325 Cala Rajada med Alcúdia längs norrkusten.' },
        { mode: 'Bil', text: 'Följ Ma-15 från Palma via Manacor och Artà. Borgen ligger högst upp i byn – gå sista biten.' },
      ],
      beaches: {
        names: ['Cala Agulla', 'Cala Mesquida', 'Cala Torta'],
        text: 'Cala Agulla och Cala Mesquida ligger nära Cala Rajada och har sand, tallskog och klart vatten. Cala Torta åt Artà-hållet är vildare, utan service.',
      },
      market: {
        days: 'Onsdagar, förmiddag',
        text: ['Veckomarknaden hålls på onsdagar på Plaça de l’Orient i byn, ungefär 8–13.30.'],
      },
      bestTime: [
        'Försommaren och tidig höst är bäst för stränderna runt Cala Rajada. Borgen är vackrast i eftermiddagsljus – men kontrollera öppettiderna innan du går upp.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: expresslinje 411e Cala Rajada–Palma', href: 'https://www.tib.org/en/w/el-govern-crea-una-nova-l%C3%ADnia-expr%C3%A9s-del-tib-que-connectar%C3%A0-cala-rajada-amb-palma-a-partir-de-dimecres-11-de-juny?redirect=%2Fen%2Fnoticies%2F-%2Fasset_publisher%2FNIwXxcBhaMlh%2Frss' },
      { label: 'Mercadillos.org: marknader på onsdagar', href: 'https://mercadillos.org/en/mallorca/wednesday' },
    ],
    mapsQuery: 'Capdepera+Mallorca',
    card: {
      description: 'Medeltida borg och pittoresk by i nordöst med panoramautsikt över havet',
      image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=75',
      tip: 'Besök Castell de Capdepera i solnedgången',
      top3: ['Castell de Capdepera', 'Cala Rajada (nära)', 'Utsikten vid solnedgång'],
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
    tagline: 'Hamnby dit den historiska spårvagnen går',
    seo: {
      description: 'Port de Sóller – cirkelformad vik i Tramuntana dit den historiska spårvagnen från Sóller går. Snorkling, solnedgång och havsrestauranger. Svensk guide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Port de Sóller-specifik bild (viken / spårvagnen).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Hamnby i Tramuntana – Port de Sóller med cirkelformad vik och fiskebåtar',
      kicker: 'Nordvästra Mallorca · Vacker hamnby',
      subtitle: 'En av Mallorcas mest pittoreska hamnbyar med naturlig vik – dit går den historiska spårvagnen från Sóller',
    },
    about: [
      'Port de Sóller är en av Mallorcas mest pittoreska hamnbyar med en naturlig rundad vik omgiven av Tramuntanabergen. Nås med den historiska spårvagnen från Sóller – en upplevelse i sig.',
      'Hamnen omges av restauranger och kaféer med utsikt mot det blågröna Medelhavet. Viken är skyddad och lugn, perfekt för simning och snorkling. På kvällen samlas besökare längs promenaden för att se solen gå ned bakom bergen.',
    ],
    tips: [
      'Ta spårvagnen från Sóller – 15 min och passa på att sitta utomhus',
      'Solnedgången vid hamnen är bland de vackraste på hela ön',
      'Hyr kajak direkt vid stranden och paddla ut i viken',
      'Lunch på någon av restaurangerna med havsutsikt vid hamnen',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Höjdpunkter',
      items: [
        'Historiska spårvagnen från Sóller',
        'Solnedgången vid hamnen',
        'Snorkling och kajakpaddling i viken',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 30 km från Palma' },
      { label: 'Spårvagn', value: '15 min från Sóller' },
      { label: 'Känd för', value: 'Hamn, spårvagn, natur' },
      { label: 'Stränder i närheten', value: 'Platja de Port de Sóller' },
    ],
    guide: {
      getThere: [
        { mode: 'Spårvagn', text: 'Den gamla spårvagnen går från Sóllers centrum ner till hamnen. Kommer du med Tren de Sóller från Palma byter du till spårvagnen i Sóller.' },
        { mode: 'Buss', text: 'TIB-linje 204 går hela vägen från Palma via Ma-11 och tunneln till Port de Sóller, och linje 203 kommer hit via Valldemossa och Deià. Sommartid går linje 231 från Port de Sóller över bergen till Pollença och Alcúdia.' },
        { mode: 'Bil', text: 'Följ Ma-11 genom Sóllertunneln och fortsätt förbi Sóller ner till hamnen. Parkeringen nära stranden fylls snabbt på sommaren.' },
      ],
      beaches: {
        names: ['Port de Sóller', 'Sa Calobra', 'Cala Tuent'],
        text: 'Stranden ligger mitt i byn, i en skyddad, nästan rund vik. Vill du ha mer dramatik ligger Sa Calobra och Cala Tuent längre norrut längs Tramuntanakusten.',
      },
      market: {
        days: 'Lördagar i Sóller',
        text: ['Närmaste stora marknad är lördagsmarknaden på torget i Sóller – ta spårvagnen upp på förmiddagen.'],
      },
      bestTime: [
        'Maj, juni och september ger varmt vatten utan högsommarens trängsel. En kväll i hamnen när dagsturisterna har åkt tillbaka till Palma är det bästa Port de Sóller har att ge.',
      ],
      families: [
        'Viken är skyddad och stranden passar mindre barn. Spårvagnen upp till Sóller blir en egen utflykt.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'TIB: linje 203', href: 'https://www.tib.org/es/w/avis-prova-pilot-203' },
      { label: 'TIB: sommartidtabeller 2026 (linje 204 och 231)', href: 'https://www.tib.org/en/w/el-govern-millora-el-servei-de-bus-tib-amb-l-increment-de-freq%C3%BC%C3%A8ncies-en-els-nous-horaris-d-estiu-a-partir-d-aquest-divendres' },
      { label: 'Mercadillos.org: marknaden i Sóller', href: 'https://mercadillos.org/mercadillo-soller' },
    ],
    mapsQuery: 'Port+de+Soller+Mallorca',
    card: {
      description: 'Charmig hamnby med en av Mallorcas vackraste vikar, dit den historiska spårvagnen går',
      image: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=75',
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
      description: 'Campos – saltstaden i södra Mallorca med två marknadsdagar, Es Trenc runt hörnet och Flor de Sal som skördas för hand. Autentisk reseguide på svenska.',
    },
    // TODO: generisk bild från södra Mallorca – byt mot Campos-specifik bild (saltpannorna / Es Trenc).
    hero: {
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
      alt: 'Södra Mallorcas lantliga landskap med torrmurar och jordbruksmark nära Campos och Es Trenc',
      kicker: 'Södra Mallorca · Lantlig',
      subtitle: 'Saltstaden med två marknadsdagar och porten till Es Trenc',
    },
    about: [
      'Campos ligger på Migjorn-slätten i södra Mallorca – bokstavligen omgivet av jordbruksmark, mandelträd och låga stenmurar. Det är en riktig mallorkinsk småstad utan turistförskönad fasad, med sandstenskvarter, gröna fönsterluckor och torg där äldre fortfarande pratar bred mallorquí.',
      "Stadens hjärta är marknaderna – två per vecka, på torsdagar och lördagar – där lokala bönder säljer allt från getostar och Sa Pobla-potatis till kryddor och grovt salt från de närliggande saltpannorna. Just saltet är Campos signatur: Flor de Sal d'Es Trenc skördas för hand i de gamla saltpannorna några kilometer söderut och räknas till världens finaste havssalt. Och bakom saltpannorna öppnar sig Es Trenc – en 6 kilometer lång orörd strand med vatten så turkost att den kallas Mallorcas Karibien.",
    ],
    tips: [
      'Gå på torsdagsmarknaden, inte lördagen – mindre folk och bönderna tar tid att prata',
      "Köp saltet direkt från fabriken vid Salines d'Es Trenc – betydligt billigare än i Palma, och du ser produktionen",
      'Kom tidigt till Es Trenc i juli–augusti – parkeringarna vid stranden fylls snabbt',
      'Testa en ensaïmada från något av Campos gamla bagerier tidigt på morgonen, fortfarande varm',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Campos med omnejd',
      items: [
        'Es Trenc-stranden – 6 km orörd sand, turkost vatten, ingen bebyggelse (10 min bort)',
        'Salines d’Es Trenc – besök saltpannorna där Flor de Sal skördas för hand, guidade turer finns',
        'Torsdags- eller lördagsmarknaden – äkta lokal marknad med producenter från hela södra Mallorca',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Södra Mallorca, lantligt' },
      { label: 'Flyg', value: '30 min från PMI-flygplatsen' },
      { label: 'Buss', value: 'Direktlinje från flygplatsen några gånger per dag' },
      { label: 'Bästa tid', value: 'Maj–juni, september (före och efter Es Trenc-rusningen)' },
      { label: 'Känd för', value: 'Flor de Sal, Es Trenc, torsdags- och lördagsmarknad' },
      { label: 'I närheten', value: 'Es Trenc (10 min), Colònia de Sant Jordi, Ses Covetes' },
    ],
    guide: {
      getThere: [
        { mode: 'Bil', text: 'Ma-19 går från Palma förbi flygplatsen och Llucmajor till Campos – en av de enklaste turerna på ön. Es Trenc och saltpannorna ligger söder om staden.' },
        { mode: 'Buss', text: 'TIB-linje 501 går mellan Palma och Manacor via Llucmajor, Campos och Felanitx. I Campos ansluter linjer söderut mot Colònia de Sant Jordi och Santanyí.' },
      ],
      beaches: {
        names: ['Es Trenc', 'Es Carbó'],
        text: 'Es Trenc är den stora naturstranden söder om Campos. Längre bort mot Colònia de Sant Jordi ligger den lugnare Es Carbó.',
      },
      market: {
        days: 'Torsdagar och lördagar, förmiddag',
        text: ['Campos har marknad två förmiddagar i veckan, året runt. Lördagsmarknaden är störst; på torsdagar är den mindre, med mest frukt och grönt.'],
      },
      bestTime: [
        'Maj, juni och september – före och efter högsäsongen vid Es Trenc. Besök gärna saltpannorna i samma veva.',
      ],
    },
    checked: CHECKED,
    sources: [
      { label: 'BOIB 2019: marknadsdagar i Campos', href: 'https://intranet.caib.es/eboibfront/pdf/es/2019/41/1030392' },
      { label: 'Mallorca.com: marknaden i Campos', href: 'https://www.mallorca.com/es/eventos/mercados/wochenmarkt-campos' },
      { label: 'TIB: linje 501', href: 'https://www.tib.org/en/web/ctm/linies-i-horaris/autobus/-/linia/501' },
    ],
    mapsQuery: 'Campos+Mallorca',
    places: {
      heading: 'Hitta hit i Campos',
      items: [
        { text: 'Salines d’Es Trenc', href: 'https://maps.google.com/?q=Salines+d%27Es+Trenc+Mallorca' },
        { text: 'Es Trenc-stranden', href: 'https://maps.google.com/?q=Platja+des+Trenc+Mallorca' },
        { text: 'Plaça Major, Campos', href: 'https://maps.google.com/?q=Placa+Major+Campos+Mallorca' },
      ],
    },
    card: {
      description: 'Lantlig stad nära Es Trenc känd för salt, kapers och lördagsmarknad',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
      tip: 'Perfekt stopp på väg till Es Trenc',
      top3: ['Es Trenc-stranden (10 min)', 'Saltpannorna Salines', 'Lördagsmarknaden'],
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
