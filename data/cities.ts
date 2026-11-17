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

export type CityRegion = 'Sydväst' | 'Nordväst' | 'Norr' | 'Inland' | 'Öst' | 'Syd';

/** Ett insidertips. Kan avslutas med en intern länk. */
export type CityTip = string | { text: string; link: { href: string; label: string } };

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
   * Tre höjdpunkter. "list" = rubrik i Bebas Neue med avdelare,
   * "cards" = mindre rubrik med vita kort. Valfri.
   */
  highlights?: { variant: 'list' | 'cards'; heading: string; items: [string, string, string] };
  /** Rader i rutan "Praktisk info". */
  practical: { label: string; value: string }[];
  /** Sökfras till Google Maps-länken "Visa på karta". */
  mapsQuery: string;
  /** Valfri ruta med kartlänkar till platser i orten. */
  places?: { heading: string; items: { text: string; href: string }[] };
  /** Kortet på /byar. */
  card: {
    description: string;
    image: string;
    tip: string;
    top3: [string, string, string];
  };
};

const UPDATED = '2026-11-17';

export const cities: City[] = [
  {
    slug: 'palma-de-mallorca',
    name: 'Palma de Mallorca',
    region: 'Sydväst',
    lat: 39.5696,
    lng: 2.6502,
    capital: true,
    updated: UPDATED,
    sitemapPriority: 0.85,
    tagline: 'Mallorcas pulserande huvudstad',
    seo: {
      title: 'Palma de Mallorca – komplett reseguide',
      description: 'Palma de Mallorca – öns pulserande huvudstad med gotiska La Seu, livlig gamla stan och kulinarisk scen i världsklass. Insider-tips från lokalkännare.',
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
      'Hyra en el-scooter och kör längs paseo marítimo i solnedgången',
      'Mercat de l’Olivar är bäst på fredags- och lördagsmorgon för färska råvaror',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Palma',
      items: [
        'La Seu-katedralen – gå dit tidigt för kortare kö och det bästa ljuset',
        'Gamla stan (Casc Antic) – gå vilse i gränderna och hitta dolda barer',
        'Bellver Slott – bästa utsikten över Palma, kom vid solnedgång',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Sydväst Mallorca, huvudstad' },
      { label: 'Flyg', value: '15 min från PMI-flygplatsen' },
      { label: 'Bästa tid', value: 'Maj, juni, september' },
      { label: 'Känd för', value: 'La Seu, gamla stan, restauranger' },
      { label: 'Stränder i närheten', value: 'Platja de Palma, Cala Major' },
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
      top3: ['La Seu-katedralen', 'Gamla stan (Casc Antic)', 'Bellver Slott'],
    },
  },
  {
    slug: 'soller',
    name: 'Sóller',
    region: 'Nordväst',
    lat: 39.767,
    lng: 2.7153,
    updated: UPDATED,
    sitemapPriority: 0.75,
    tagline: 'Bergsby med historisk spårvagn',
    seo: {
      description: 'Sóller – bergsby i Tramuntana med anrik träspårvagn till havet, apelsinodlingar och torget där lokalbefolkningen möts. Svensk reseguide med insider-tips.',
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
      'Den historiska trätåget från Palma (sedan 1912) och spårvägen ner till Port de Sóller är en av Mallorcas mest ikoniska upplevelser. Port de Sóller är en halvmåneformad bukt med en avslappnad strandpromenad och bra fiskrestauranger.',
    ],
    tips: [
      'Ta det historiska träntåget från Palma – ett minne för livet (boka i förväg)',
      'Åk spårvägen ner till Port de Sóller och ta en bukt-kaffe på morgonen',
      'Köp färska apelsiner direkt från en bonde längs vägen in i byn',
      'Vandringen till Biniaraix – 45 min – är en av öns bästa korta leder',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Sóller',
      items: [
        'Historiska spårvagnen ner till Port de Sóller – åk tur och retur',
        'Apelsinlundarna – köp färskpressad juice direkt från bönderna',
        'Firó-festivalen i maj – unikt historiskt skådespäl på gatorna',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 30 km från Palma' },
      { label: 'Tåg', value: 'Från Palma (Ferrocarril de Sóller)' },
      { label: 'Bästa tid', value: 'April–juni, september' },
      { label: 'Känd för', value: 'Spårvagn, apelsiner, Tramuntana' },
      { label: 'Stränder i närheten', value: 'Port de Sóller, Platja d’en Repic' },
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
    updated: UPDATED,
    sitemapPriority: 0.75,
    tagline: 'Pittoresk fiskeby på östkusten',
    seo: {
      description: 'Porto Colom på östkusten – autentisk fiskby med en av Mallorcas vackraste naturhamnar och färsk fångst direkt från kajen. Insider-tips från lokalkännare.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Porto Colom-specifik bild (naturhamnen).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Autentisk fiskeby Porto Colom på östkusten med naturlig hamn',
      kicker: 'Östkusten · Mallorca',
      subtitle: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar',
    },
    about: [
      'Porto Colom är en av Mallorcas mest autentiska fiskebyar, belägen på östkusten. Till skillnad från många andra kustorter har Porto Colom lyckats bevara sin ursprungliga karaktär med färglada fiskarbåtar, vita hus och en avslappnad atmosfär som tar dig tillbaka i tiden.',
      'Hamnen är en av de vackraste naturliga hamnarna på ön och är omgiven av pittoreska byggnader i ockra och rosa toner. På morgonen kan du se fiskarna lossa sin fångst – och om du frågar snällt säljer de direkt från båten.',
    ],
    tips: [
      'Skippa turistkrogarna vid hamnen – gå till baksidan av torget',
      'Fråga efter “el peix del dia” – färsk fisk fångad samma dag',
      'Bästa solnädgången ses från klipporna vid Calo de Sa Barca Trencada',
      'Parkera vid kyrkan – parkeringen vid hamnen är alltid full',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Porto Colom',
      items: [
        'Naturhamnen – en av Mallorcas vackraste, perfekt för kvällspromenad',
        'Färsk fisk från fiskarna vid hamnen – kom kl 7–8 på morgonen',
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
    updated: UPDATED,
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
      'Onsdags- och lördagsmarknaden är en av öns bästa – här blandas lokala producenter med konsthantverk, textilier och olivoljor. Under sommaren tar arkaderna skugga och det är perfekt att ta en paus på något av kaféerna runt torget.',
    ],
    tips: [
      'Onsdagsmarknaden är bättre än lördagens – mindre folk, mer lokalt',
      'Cala Llombards, en kort biltur söderut, är en av öns vackraste vikar – kom tidigt, parkeringen är liten',
      'Beställ ”pa amb oli” på baren vid kyrkan – klassisk mallorcansk snack',
      'Glöm inte galleriet Sa Quartera – gratis och riktigt bra samtidskonst',
    ],
    practical: [
      { label: 'Plats', value: 'Södra Mallorca, ca 55 km från Palma' },
      { label: 'Bil', value: 'Ca 55 min från Palma' },
      { label: 'Marknad', value: 'Onsdag & lördag fm' },
      { label: 'Känd för', value: 'Marknad, sandstensarkitektur' },
      { label: 'Stränder i närheten', value: 'Cala Llombards, Cala Santanyí' },
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
    name: 'Porto Petro',
    region: 'Syd',
    lat: 39.3639,
    lng: 3.2111,
    updated: UPDATED,
    sitemapPriority: 0.65,
    tagline: 'Exklusiv och lugn marinaby',
    seo: {
      description: 'Porto Petro i södra Mallorca – lugn marinaby med exklusiva segelbåtar, Cala Mondragó runt hörnet och fisk direkt från hamnen. Reseguide skriven inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Porto Petro-specifik bild (marinan).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Exklusiv marinaby Porto Petro i södra Mallorca med segelbåtar',
      kicker: 'Sydkusten · Mallorca',
      subtitle: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar och fridfulla resenärer',
    },
    about: [
      'Porto Petro är en av Mallorcas mest exklusiva och minst kända marinabyer. Belägen längs sydkusten har den lyckats undfly massturismen och bevarat sin karaktär av ett stilla fiskesamhälle – nu befolkat av segelbåtar och stillsamma flanörer.',
      'Det kristallklara vattnet i marinan speglar omgivande klippor och tallskog. Längs kajen finns några enstaka restauranger och en bar – och det är allt. Inget bråk, ingen kö, ingen DJ. Bara det bästa av Medelhavet.',
    ],
    tips: [
      'Kayaka runt viken på morgonen – vattnet är spegelblank och orört',
      'Bar Cala Mondragó (5 min bort) – hyra parasol och ta en öl i paradiset',
      'Parkera ute vid landsvägen och promenera ner – spar frustration',
      'Solnedgångsprosecco på kajen är den bästa aktiviteten i Porto Petro',
    ],
    practical: [
      { label: 'Plats', value: 'Sydkusten, 65 km från Palma' },
      { label: 'Bil', value: 'Ca 55 min från Palma' },
      { label: 'Bästa tid', value: 'Maj–september' },
      { label: 'Känd för', value: 'Marinan, lugn, snorkling' },
      { label: 'Stränder i närheten', value: 'Cala Mondragó, Cala Egos' },
    ],
    mapsQuery: 'Porto+Petro+Mallorca',
    card: {
      description: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar',
      image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=75',
      tip: 'Perfekt för kvällspromenad längs hamnen',
      top3: ['Marinan med lyxbåtar', 'Kvällspromenaden', 'Cala Mondragó (10 min)'],
    },
  },
  {
    slug: 'alcudia',
    name: 'Alcúdia',
    region: 'Norr',
    lat: 39.8527,
    lng: 3.1214,
    updated: UPDATED,
    sitemapPriority: 0.75,
    tagline: 'Historisk kuststad i norr',
    seo: {
      description: 'Alcúdia i norra Mallorca – kuststad med välbevarade medeltida murar, romerska Pollentia och Playa de Muro runt hörnet. Lokalt perspektiv från vår guide.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Alcúdia-specifik bild (stadsmurarna / Pollentia).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Medeltida stadsmurar i Alcúdia – norra Mallorcas historiska kuststad',
      kicker: 'Norra Mallorca · Historisk kuststad',
      subtitle: 'En av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurer och romersk teater',
    },
    about: [
      'Alcúdia är en av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurer från 1300-talet, en romersk teater och en av öns vackraste sandstränder alldeles intill.',
      'Stadsmurarna som omger gamla stan är nästan intakta och det är lätt att promenera längs dem. Inuti murarna finns butiker, restauranger och kyrkan Sant Jaume. Alldeles utanför staden sprider sig Playa de Muro – en av Mallorcas längsta och finaste sandstränder.',
    ],
    tips: [
      'Gå hela vägen runt stadsmurarna – tar ca 30 min och ger fin utsikt',
      'Pollentia-ruinerna är öppna för besök och inkluderar en romersk teater',
      'Tisdagsmarknaden är stor och populär – kom tidigt',
      'Playa de Muro är perfekt för familjer – grunt och sandigt',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Höjdpunkter',
      items: [
        'Medeltida stadsmurarna från 1300-talet',
        'Romerska teatern Pollentia',
        'Playa de Muro – lång sandstrand 5 min bort',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Norra Mallorca, 54 km från Palma' },
      { label: 'Bil', value: 'Ca 50 min från Palma' },
      { label: 'Marknad', value: 'Tisdag & söndag' },
      { label: 'Känd för', value: 'Medeltida murar, strand, historia' },
      { label: 'Stränder i närheten', value: "Playa de Muro, Playa d'Alcúdia" },
    ],
    mapsQuery: 'Alcudia+Mallorca',
    card: {
      description: 'Historisk kuststad med välbevarade medeltida murar och romarteater',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
      tip: 'Besök den romerska teatern och gamla stan',
      top3: ['Medeltida stadsmurarna', 'Romerska teatern Pollentia', 'Playa de Muro (5 min)'],
    },
  },
  {
    slug: 'valldemossa',
    name: 'Valldemossa',
    region: 'Nordväst',
    lat: 39.7117,
    lng: 2.6225,
    updated: UPDATED,
    sitemapPriority: 0.75,
    tagline: 'Bergsby i världsarvet Serra de Tramuntana',
    seo: {
      // Våg 1: världsarvet är Serra de Tramuntana, inte själva byn.
      description: 'Valldemossa i världsarvet Serra de Tramuntana – bergsby med kartusianerklostret där Chopin bodde. Ockrafärgade stenhus och autentiskt lugn. Vår guide.',
    },
    // TODO: generisk Tramuntana-bild som delas med Deià/Pollença/Artà – byt mot Valldemossa-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Stenbelagda gränder i Valldemossa – bergsby i världsarvet Serra de Tramuntana',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bergsby i världsarvet Serra de Tramuntana, känd för Chopins vistelse och det magnifika kartusianerklostret',
    },
    about: [
      'Valldemossa är en av Mallorcas mest berömda byar, inte minst tack vare den polska tonsättaren Frédéric Chopin och hans älskarinna George Sand som tillbringade vintern 1838–39 i kartusianerklostret Real Cartuja. Byn är förtrollande vacker med stenhus täckta av blommor och smala gränder som slinrar sig uppför bergssluttningarna.',
      'Kartusianerklostret är öppet för besökare och innehåller Chopins piano, George Sands originalhandskrifter och en privat kyrka med keramikkupoler. Byn är också känd för sina lokala bakelser – coca de patata – som säljs på torget.',
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
        'Kartusianerklostret – Chopins piano och George Sands handskrifter',
        'Chopins pianosalong – en unik glimt av 1800-talets konstliv',
        'Utsikten från byplatsen – bergen och havet i samma vy',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordväst, 18 km från Palma' },
      { label: 'Bil', value: 'Ca 25 min från Palma' },
      { label: 'Klostret', value: 'Öppet 09:30–18:00 (stängt sön)' },
      { label: 'Känd för', value: 'Chopin, kloster, bergsby' },
      { label: 'Tips', value: 'Parkera utanför byn och gå in' },
    ],
    mapsQuery: 'Valldemossa+Mallorca',
    card: {
      description: 'Bergsby i världsarvet Serra de Tramuntana, känd för Chopin och George Sands vistelse',
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=600&q=75',
      tip: 'Besök kartusianerklostret tidigt på morgonen',
      top3: ['Kartusianerklostret', 'Chopins pianosalong', 'Utsikten från byplatsen'],
    },
  },
  {
    slug: 'deia',
    name: 'Deià',
    region: 'Nordväst',
    lat: 39.748,
    lng: 2.648,
    updated: UPDATED,
    sitemapPriority: 0.75,
    tagline: 'Konstnärsby vid NV-kusten',
    seo: {
      description: 'Deià – konstnärsby i Tramuntana med havsutsikt, Robert Graves-museet och den dolda Cala Deià nedanför. Bohemisk charm få öar kan matcha. Vår lokala guide.',
    },
    // TODO: generisk Tramuntana-bild som delas med andra bergsbyar – byt mot Deià-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
      alt: 'Bohemisk konstnärsby Deià inbyggd i Tramuntanabergens sluttning med havsutsikt',
      kicker: 'Nordvästra Mallorca · Tramuntana',
      subtitle: 'Bohemisk konstnärsby i Tramuntana-bergen med havsutsikt och Robert Graves arv',
    },
    about: [
      'Deià är en av Mallorcas mest romantiska och konstnärliga byar. Inbyggd i en bergssluttning med utsikt mot Medelhavet har den lockat konstnärer, författare och musiker i generationer. Den brittiske poeten Robert Graves levde och dog här, och hans hus är nu ett museum öppet för besökare.',
      'Cala Deià – en liten klippbadstrand nedanför byn – är en av Mallorcas vackraste och mest avskilda badplatser. Promenaden ner tar ungefär 20 minuter och belöningen är ett turkost hav omringat av klippor och pinjeskog.',
    ],
    tips: [
      'Robert Graves museum – öppet måndag–fredag, boka i förväg',
      'Promenera ner till Cala Deià tidigt – på eftermiddagen är det fullt',
      "Restaurang Ca'n Quet har en av öns bästa terrasser med utsikt",
      'Parkera utanför byn – gatorna är mycket smala',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Deià',
      items: [
        'Robert Graves museum – hem och arbetsstugan för den berömde poeten',
        'Cala Deià – en av öns vackraste klippbadplatser, orört och fridfullt',
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
    mapsQuery: 'Deia+Mallorca',
    card: {
      description: 'Konstnärsby i Tramuntana-bergen med bohemisk atmosfär och havsutsikt',
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
    updated: UPDATED,
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
      "I närheten ligger Coves d'Artà – en av öns mest imponerande grottor med enorma stalaktiter och stalagmiter. Tisdagsmarknaden lockar lokalbefolkning från hela regionen och är ett av de bästa tillfällena att uppleva äkta mallorcansk livsstil.",
    ],
    tips: [
      'Borgen Santuari de Sant Salvador – fri entré och fantastisk utsikt',
      'Tisdagsmarknaden är en av öns mest autentiska – kom på förmiddagen',
      "Coves d'Artà ligger 15 min bort – kombinera gärna besöken",
      'Restaurangerna runt torget serverar klassisk mallorquinska – prova frit mallorquí',
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
    updated: UPDATED,
    sitemapPriority: 0.65,
    tagline: 'Charmig by i sydväst',
    seo: {
      description: "Andratx i sydvästra Mallorca – lugn stadskärna med Port d'Andratx marina och Camp de Mar några minuter bort. Klippkullar och exklusiv atmosfär. Vår guide.",
    },
    // TODO: bilden återanvänds på flera orter – byt mot Andratx-specifik bild (Port d'Andratx).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Lugn stadskärna i Andratx i sydvästra Mallorca med Tramuntana-bergen i bakgrunden',
      kicker: 'Sydvästra Mallorca · Tramuntana',
      subtitle: 'Lugn stadskärna i sydväst med exklusiv marina och dramatisk bergskuliss',
    },
    about: [
      "Andratx är en dubbel destination – den lugna stadskärnan uppe i en dal och den exklusiva Port d'Andratx nere vid havet. Stadskärnan har en avslappnad autenticitet med en onsdagsmarknad och ett levande torgliv, medan hamnen är en av Mallorcas snyggaste med lyxiga segelbåtar och exklusiva restauranger.",
      'Centre Cultural Andratx är ett av öns bästa konstgallerier och är värt ett besök oavsett om du är konstintresserad eller bara vill njuta av den vackra byggnaden och trädgården. Camp de Mar strax norr om hamnen är en av de finaste stränderna i sydväst.',
    ],
    tips: [
      "Port d'Andratx vid solnedgång – bäst sett från kajen med ett glas cava",
      'Camp de Mar – stranden dit de lokala för sina barn, inte turisterna',
      'Centre Cultural Andratx – öppet tisdag–lördag, ofta gratis',
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
    updated: UPDATED,
    sitemapPriority: 0.7,
    tagline: 'Historisk stad i norr',
    seo: {
      // Våg 1 rättade evenemanget till Festival de Pollença (klassisk musik i klostret Sant Domingo).
      description: 'Pollença i norra Mallorca – autentisk by med 365 trappsteg till Calvari, söndagsmarknad vid torget och sommarfestival i klostret. Insider-tips från lokalkännare.',
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
      'Klättra Calvari-trappan tidigt på morgonen – magisk ljussättning',
      'Söndagsmarknaden kl 8–13 – lokalt och äkta, ta fika på torget',
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
      { label: 'Marknad', value: 'Söndagar 08:00–13:00' },
      { label: 'Festival de Pollença', value: 'Juli–augusti – boka tidigt' },
      { label: 'Strand', value: 'Port de Pollença 8 min' },
    ],
    mapsQuery: 'Pollenca+Mallorca',
    card: {
      description: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
      tip: 'Klättra upp till Calvari för fantastisk utsikt',
      top3: ['365 trappsteg till Calvari', 'Söndagsmarknaden', 'Festival de Pollença i juli–augusti'],
    },
  },
  {
    slug: 'sineu',
    name: 'Sineu',
    region: 'Inland',
    lat: 39.6432,
    lng: 3.0187,
    updated: UPDATED,
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
      'Kyrkan Mare de Déu dels Àngels dominerar stadsbilden med sin imponerande fasad och torn. Sa Plaça är torgets hjärta med caféer och barer som serverar ärlig mat till ärliga priser – utan turistpåslag. Det är Mallorca som det en gång var.',
    ],
    tips: [
      'Onsdagsmarknaden – kom 08:00 för bästa upplevelsen, fullt efter 10',
      'Fråga lokalt om djurmarknaden – hålls på ett separat torg',
      'Fixa fika på Sa Plaça – torgets kaffebar är perfekt för att se livet gå',
      'Kombinera gärna med ett stopp i Petra eller Inca samma dag',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Sineu',
      items: [
        'Onsdagsmarknaden – öns äldsta marknad sedan 1306, kom tidigt',
        'Sa Plaça-torget – hjärtat av byn med caféer och äkta mallorcansk stämning',
        // Kyrkan är en församlingskyrka, inte en katedral.
        'Kyrkan Mare de Déu dels Àngels – imponerande gotisk kyrka mitt i byn',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Centrala Mallorca, 30 km från Palma' },
      { label: 'Bil', value: 'Ca 30 min från Palma' },
      { label: 'Marknad', value: 'Onsdagar 08:00–13:00' },
      { label: 'Känd för', value: 'Öns äldsta marknad' },
      { label: 'Parkering', value: 'Utanför stadskärnan' },
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
    updated: UPDATED,
    sitemapPriority: 0.65,
    tagline: 'Historisk stad i sydöst',
    seo: {
      description: 'Felanitx i östra Mallorca – traditionell stad känd för lokal keramik, vin och stor söndagsmarknad. Castell de Santueri på nära håll. Svensk guide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Felanitx-specifik bild (keramik / Castell de Santueri).
    hero: {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Traditionell inlandsstad Felanitx i östra Mallorca känd för keramik och vinodling',
      kicker: 'Östra Mallorca · Keramik & marknad',
      subtitle: 'Autentisk inlandsstad känd för sin fina keramik, lokala viner och livlig söndagsmarknad',
    },
    about: [
      "Felanitx är en autentisk inland-stad känd för sin fina keramik, lokala viner och en livlig söndagsmarknad. Nära Cala d'Or och Portocolom – ett perfekt mellanstopp på en dag längs östkusten.",
      'Uppe på Puig de Sant Salvador (509 m) finns ett kloster med fantastisk utsikt över hela östra Mallorca – ett besök värt att planera in. Nere i staden präglas torget av den imponerande kyrkan Sant Miquel.',
    ],
    tips: [
      'Söndagsmarknaden startar tidigt – bäst läge är vid öppning kl 08',
      'Köp lokal keramik direkt från hantverkarna, priserna är rimliga',
      'Kör upp till Castell de Santueri för fantastisk panoramautsikt',
      'Kombinera med Portocolom (20 min) för en hel dagsutflykt',
    ],
    highlights: {
      variant: 'cards',
      heading: 'Höjdpunkter',
      items: [
        'Söndagsmarknaden med lokal keramik',
        'Castell de Santueri med panoramautsikt',
        'Lokalt vin från Felanitx-vingårdarna',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Östra Mallorca, 46 km från Palma' },
      { label: 'Bil', value: 'Ca 45 min från Palma' },
      { label: 'Marknad', value: 'Söndag' },
      { label: 'Känd för', value: 'Keramik, vin, medeltida borg' },
      { label: 'Stränder i närheten', value: "Cala d'Or, Portocolom" },
    ],
    mapsQuery: 'Felanitx+Mallorca',
    card: {
      description: 'Traditionell stad känd för keramik, vin och söndagsmarknad',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
      tip: 'Köp lokal keramik direkt från hantverkarna',
      top3: ['Lokal keramik & hantverk', 'Söndagsmarknaden', 'Castell de Santueri (nära)'],
    },
  },
  {
    slug: 'manacor',
    name: 'Manacor',
    region: 'Öst',
    lat: 39.57,
    lng: 3.209,
    updated: UPDATED,
    sitemapPriority: 0.7,
    tagline: 'Öns näst största stad — pärlor och Rafa Nadal',
    seo: {
      description: 'Manacor – Mallorcas näst största stad på östkusten. Pärlor, Rafa Nadals hemstad och porten till Drach-grottorna. Insider-tips från lokalkännare.',
    },
    // TODO: generisk landsbygdsbild som återanvänds på sajten – byt mot Manacor-specifik bild.
    hero: {
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f',
      alt: 'Mallorcas landsbygd med mandelträd, olivlundar och torrmurar – östra slätten kring Manacor',
      kicker: 'Östra Mallorca · Näst största staden',
      subtitle: 'Pärlstaden med Rafa Nadals hemmaplan – porten till öns östkust och Drach-grottorna',
    },
    about: [
      'Manacor är Mallorcas näst största stad och ligger mitt på öns östra sida. Till skillnad från kustbyarna skriker den inte efter uppmärksamhet. Det här är en arbetsstad med gamla rötter i hantverk och jordbruk – och just därför en av de mest autentiska platserna du kan besöka på ön.',
      'Staden är mest känd som hemstad till Rafael Nadal, som fortfarande bor här, och för Majorica – fabriken som sedan 1890 tillverkar konstgjorda pärlor av fiskfjäll i ett så förfinat hantverk att de nästan är omöjliga att skilja från äkta. Tillsammans med den närliggande Drach-grottan och östkustens vikar gör detta Manacor till en perfekt bas för utforskning, inte bara en genomfartsort.',
    ],
    tips: [
      'Åk tåget från Palma till Manacor – en timme, 8 euro, och du slipper bilköerna på östkustens småvägar',
      'Kombinera morgon i Manacor (marknaden på måndagar) med eftermiddag i Drach-grottorna, 20 minuter bort',
      {
        text: 'Rafa Nadal Museum Xperience är värt det om du är sportintresserad – men om du bara vill se trofeer räcker fönstertittandet.',
        link: { href: '/barn/inomhus-och-regn#rafa-nadal-museum-xperience', label: 'Se familjeanpassad guide →' },
      },
      'Vineriet Bodega Miquel Gelabert bokas i förväg – små produktioner och personlig tasting',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Manacor',
      items: [
        'Majorica pärlafabriken – se hur pärlorna tillverkas för hand, handla direkt från outlet-butiken',
        'Rafa Nadal Museum Xperience – interaktivt sportmuseum med VR-simulatorer, troféer och personliga föremål',
        'Kyrkan Nostra Senyora dels Dolors – neogotisk med Mallorcas högsta klocktorn, syns långt in över slätten',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Östra Mallorca, inland' },
      { label: 'Flyg', value: '45 min från PMI-flygplatsen' },
      { label: 'Tåg', value: 'Direktlinje från Palma (~1 timme, varje timme)' },
      { label: 'Bästa tid', value: 'April–juni, september–oktober' },
      { label: 'Känd för', value: 'Majorica-pärlor, Rafa Nadal, Drach-grottorna' },
      { label: 'I närheten', value: 'Porto Cristo (10 km), Cala Varques, Drach-grottorna' },
    ],
    mapsQuery: 'Manacor+Mallorca',
    places: {
      heading: 'Hitta hit i Manacor',
      items: [
        { text: 'Coves del Drach, Porto Cristo', href: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca' },
        { text: 'Rafa Nadal Museum Xperience', href: 'https://maps.google.com/?q=Rafa+Nadal+Museum+Xperience+Manacor' },
        { text: 'Nostra Senyora dels Dolors', href: 'https://maps.google.com/?q=Nostra+Senyora+dels+Dolors+Manacor' },
      ],
    },
    card: {
      description: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal',
      image: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=600&q=75',
      tip: 'Besök en pärlafabrik och se hur de tillverkas',
      // Stavningen följer stadssidan och varumärket: Majorica.
      top3: ['Majorica pärlafabrik', 'Rafa Nadal Academy', 'Måndagsmarknaden'],
    },
  },
  {
    slug: 'inca',
    name: 'Inca',
    region: 'Inland',
    lat: 39.7211,
    lng: 2.9111,
    updated: UPDATED,
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
      'Inca är en av Mallorcas största städer och känd som öns läderhuvudstad. Läderfabriker och butiker har producerat skor, väskor och bälten här i generationer, och torsdagsmarknaden – öns näst största – lockar köpare från hela Mallorca. Priserna på kvalitetsskor är ofta långt under det du betalar i Stockholm.',
      'Celler-restaurangerna är en unik inkansk tradition – källare under gamla stadshus som börjat som vinförråd och nu serverar traditionell mallorquinska mat. Dijous Bo i november är Mallorcas största marknadshändelse med hundratusentals besökare.',
    ],
    tips: [
      'Torsdagsmarknaden – kom 08:30 för bästa urval av skor och läder',
      'Celler-restaurang till lunch – ärlig mallorcansk mat i vinkällare',
      'Dijous Bo i november – öns största marknadshändelse, boka hotell tidigt',
      'Ta tåget från Palma – spar parkering och stressfriheten',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Inca',
      items: [
        'Torsdagsmarknaden – öns näst största, fantastiskt urval av läderskor till rea',
        'Cellers – traditionella källarrestauranger med äkta mallorquinska rätter',
        'Dijous Bo i november – Mallorcas största marknadshändelse sedan medeltiden',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Centrala Mallorca, 30 km från Palma' },
      { label: 'Tåg', value: 'Direktlinje från Palma (30 min)' },
      { label: 'Marknad', value: 'Torsdagar' },
      { label: 'Dijous Bo', value: 'November – öns största' },
      { label: 'Känd för', value: 'Läder, skor, celler-mat' },
    ],
    mapsQuery: 'Inca+Mallorca',
    card: {
      description: 'Läderstaden med berömd torsdagsmarknad och källarviner',
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=75',
      tip: 'November – kom på den stora lädermässan',
      top3: ['Torsdagsmarknaden', 'Läderskor & väskor till rea', 'Cellers (källarrestauranger)'],
    },
  },
  {
    slug: 'capdepera',
    name: 'Capdepera',
    region: 'Öst',
    lat: 39.7019,
    lng: 3.4356,
    updated: UPDATED,
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
      'Capdepera domineras av Castell de Capdepera – ett enormt medeltida fort som kröner kullen ovanför byn. Inifrån murarna har man en fantastisk panoramautsikt över hela nordöstra hörnet av Mallorca, havet och bortom. Byn nedan är charmig med vita hus och blomsterprydda gränder.',
      'Strax nedanför ligger Cala Rajada – ett livligt fiskeläge och badort med flera fina stränder. Solnedgångarna sett från borgmurarna är spektakulära och ett av de bästa fotomotivet på norra Mallorca.',
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
        'Cala Rajada – livlig hadstrand med fina stränder och fiskrestauranger',
        'Panoramautsikten över havet – en av nordöstras bästa utsiktspunkter',
      ],
    },
    practical: [
      { label: 'Plats', value: 'Nordöst, 80 km från Palma' },
      { label: 'Bil', value: 'Ca 60 min från Palma' },
      { label: 'Castell', value: 'Entré krävs, öppet dagligen' },
      { label: 'Cala Rajada', value: '5 min med bil' },
      { label: 'Bästa tid', value: 'Solnedgången från borgen' },
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
    updated: UPDATED,
    sitemapPriority: 0.65,
    tagline: 'Hamnby nådd med historisk spårvagn',
    seo: {
      description: 'Port de Sóller – cirkelformad vik i Tramuntana nådd med historisk spårvagn från Sóller. Snorkling, solnedgång och havsrestauranger. Svensk guide inifrån.',
    },
    // TODO: bilden återanvänds på flera orter – byt mot Port de Sóller-specifik bild (viken / spårvagnen).
    hero: {
      image: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
      alt: 'Hamnby i Tramuntana – Port de Sóller med cirkelformad vik och fiskebåtar',
      kicker: 'Nordvästra Mallorca · Vacker hamnby',
      subtitle: 'En av Mallorcas mest pittoreska hamnbyar med naturlig vik – nådd med historisk spårvagn från Sóller',
    },
    about: [
      'Port de Sóller är en av Mallorcas mest pittoreska hamnbyar med en naturlig rundad vik omgiven av Tramuntana-bergen. Nås med den historiska spårvagnen från Sóller – en upplevelse i sig.',
      'Hamnen omges av restauranger och caféer med utsikt mot det blågröna Medelhavet. Viken är skyddad och lugn, perfekt för simning och snorkling. På kvällen samlas besökare längs promenaden för att se solen gå ned bakom bergen.',
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
    mapsQuery: 'Port+de+Soller+Mallorca',
    card: {
      description: 'Charmig hamnby med en av Mallorcas vackraste vikar, nådd med historisk spårvagn',
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
    updated: UPDATED,
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
      'Campos ligger på Migjorn-slätten i södra Mallorca – bokstavligen omgivet av jordbruksmark, mandelträd och låga stenmurar. Det är en riktig mallorcansk småstad utan turistförskönad fasad, med sandstenskvarter, gröna fönsterluckor och torg där äldre fortfarande pratar bred mallorquí.',
      "Stadens hjärta är marknaderna – två per vecka, på torsdagar och lördagar – där lokala bönder säljer allt från getostar och Sa Pobla-potatis till kryddor och grovt salt från de närliggande saltpannorna. Just saltet är Campos signatur: Flor de Sal d'Es Trenc skördas för hand i de gamla saltpannorna några kilometer söderut och räknas till världens finaste havssalt. Och bakom saltpannorna öppnar sig Es Trenc – en 6 kilometer lång orörd strand med vatten så turkost att den kallas Mallorcas Karibien.",
    ],
    tips: [
      'Gå på torsdagsmarknaden, inte lördagen – mindre folk och bönderna tar tid att prata',
      "Köp saltet direkt från fabriken vid Salines d'Es Trenc – betydligt billigare än i Palma, och du ser produktionen",
      'Parkera i Campos och ta bussen (linje 525) till Es Trenc i juli–augusti – parkeringarna vid stranden är fulla före 10:30',
      'Testa en ensaïmada från något av Campos gamla bagerier tidigt på morgonen, fortfarande varm',
    ],
    highlights: {
      variant: 'list',
      heading: 'Topp 3 i Campos & omnejd',
      items: [
        'Es Trenc-stranden – 6 km orörd sand, turkost vatten, ingen bebyggelse (10 min bort)',
        'Salines d’Es Trenc – besök saltpannorna där Flor de Sal skördas för hand, guidad tur ~50 min',
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
