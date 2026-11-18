/**
 * Transportfakta som delas av /flyg och /hyrbil-och-transport (3.4, 3.5).
 *
 * Faktagranskning (3.7): allt nedan är kontrollerat 2026-11-18 mot källorna i `sources`.
 * Priser är ungefärliga ("ca") och gäller 2026. Uppdatera `CHECKED` bara när uppgifterna
 * faktiskt har kontrollerats på nytt. Tidtabeller och flygbolagens utbud ändras varje säsong.
 */
import type { Source } from '@/app/components/LastChecked';

export const CHECKED = '2026-11-18';

/* ------------------------------ Källor ------------------------------ */

export const SOURCES = {
  tibGratis: {
    label: 'TIB: gratis resor med Intermodal- och Única-kort 2026',
    href: 'https://www.tib.org/en/w/el-transport-p%C3%BAblic-interurb%C3%A0-mant%C3%A9-la-gratu%C3%AFtat-l-any-2026',
  },
  tibVinter: {
    label: 'TIB: vintertidtabell från 1 november 2026 (A33, A43)',
    href: 'https://www.tib.org/es/w/el-servei-de-bus-tib-repr%C3%A8n-els-horaris-d-hivern-l-1-de-novembre-amb-millores-en-diverses-l%C3%ADnies-de-la-xarxa',
  },
  tibSommar: {
    label: 'Mallorcadiario: TIB:s sommartidtabell 2026',
    href: 'https://www.mallorcadiario.com/horarios-verano-2026-tib-mas-autobuses-mas-frecuencias',
  },
  tibFragor: {
    label: 'TIB: vanliga frågor (bankkort, byten)',
    href: 'https://www.tib.org/es/preguntas-frecuentes',
  },
  tibT3: {
    label: 'TIB/SFM: tåglinje T3 Palma–Manacor',
    href: 'https://www.tib.org/es/lineas-y-horarios/tren/-/linia/T3',
  },
  sollerTag: {
    label: 'Ferrocarril de Sóller',
    href: 'https://trendesoller.com',
  },
  sollerTaxa: {
    label: 'BOIB: maxtaxor för Ferrocarril de Sóller',
    href: 'https://intranet.caib.es/eboibfront/pdf/es/2023/77/1138782',
  },
  sollerVinter: {
    label: 'Mallorcadiario: Sóllertågets vinteruppehåll',
    href: 'https://www.mallorcadiario.com/el-tren-de-soller-cierra-y-reabrira-el-1-de-febrero-de-2026',
  },
  sollerTunnel: {
    label: 'Última Hora: Sóllertunneln avgiftsfri',
    href: 'https://ultimahora.es/noticias/part-forana/2017/12/14/313849/tunel-soller-sera-gratuito-partir-proxima-semana.html',
  },
  formentor: {
    label: 'DGT: trafikreglering till Cap de Formentor',
    href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/',
  },
  formentor2026: {
    label: 'DGT: Formentor 2026 (15 maj–18 oktober, kl. 10–22)',
    href: 'https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/estado-del-trafico/rutas-de-interes/2026_Formentor_ESP.pdf',
  },
  taxi: {
    label: 'Mallorca.com: taxitaxor 2026 (Decreto 20/2025)',
    href: 'https://www.mallorca.com/es/consejos/vivir-en-mallorca/coche-y-trafico/tarifas-taxi-mallorca',
  },
  zbe: {
    label: 'Mallorca.com: miljözonen (ZBE) i Palma',
    href: 'https://www.mallorca.com/sv/radgivning/flytta-till-mallorca/bil-trafik/zbe-palma-miljoezon',
  },
  ora: {
    label: 'Última Hora: ORA utökas i Palma 2027',
    href: 'https://www.ultimahora.es/noticias/palma/2026/07/28/2678765/nueva-ora-llega-barrios-septiembre-empiezan-tramites.html',
  },
  acire: {
    label: 'Mallorca Map: trafikböter och ACIRE-zoner',
    href: 'https://mallorca-map.com/en/tips/traffic-fines-mallorca',
  },
  emtKort: {
    label: 'TIB: bankkortsbetalning i alla EMT- och TIB-bussar',
    href: 'https://www.tib.org/es/w/l-emt-i-el-ctm-completen-la-instal%C2%B7laci%C3%B3-del-nou-sistema-que-permet-el-pagament-amb-targeta-banc%C3%A0ria-en-tots-els-autobusos',
  },
  parkering: {
    label: 'Mallorca.com: parkera i Palma',
    href: 'https://www.mallorca.com/ca/consells/viure-a-mallorca/cotxe-i-transit/aparcar-a-palma',
  },
  hyrbilsforsakring: {
    label: 'Mallorca.com: hyrbilsförsäkring',
    href: 'https://www.mallorca.com/sv/radgivning/flytta-till-mallorca/bil-trafik/hyrbilsfoersaekring-mallorca',
  },
  swedaviaMalmo: {
    label: 'Swedavia: charter från Malmö Airport',
    href: 'https://www.swedavia.com/malmo/charter/',
  },
  jonkoping: {
    label: 'Jönköping Airport: flygbolag och researrangörer',
    href: 'https://www.jonkopingairport.se/en/destinationer/flygbolag-och-researrangorer',
  },
  sasKastrup: {
    label: 'Mallorca.com: SAS fler avgångar Köpenhamn–Mallorca sommaren 2027',
    href: 'https://www.mallorca.com/en/magazin/news/sas-flights-mallorca-copenhagen',
  },
  flightconnectionsArn: {
    label: 'FlightConnections: direktflyg Arlanda–Palma',
    href: 'https://www.flightconnections.com/flights-from-arn-to-pmi',
  },
  flightconnectionsGot: {
    label: 'FlightConnections: direktflyg Landvetter–Palma',
    href: 'https://www.flightconnections.com/flights-from-got-to-pmi',
  },
  flightconnectionsCph: {
    label: 'FlightConnections: direktflyg Kastrup–Palma',
    href: 'https://www.flightconnections.com/flights-from-cph-to-pmi',
  },
  norwegianSkavsta: {
    label: 'Aviation24: Norwegian Skavsta–Palma',
    href: 'https://www.aviation24.be/airlines/norwegian/norwegian-launches-direct-flights-to-palma-de-mallorca-from-stockholm-skavsta-airport',
  },
} satisfies Record<string, Source>;

/* ------------------------- Transfer från PMI ------------------------- */

export type Transfer = {
  /** Mål, t.ex. "Palma centrum". */
  mal: string;
  /** Intern länk till stadssidan om den finns. */
  href?: string;
  buss: string;
  /** Bilrestid – bara där vi har en källa. */
  bil?: string;
  taxi?: string;
};

/**
 * Från flygplatsen (PMI) till de stora orterna. Bilrestider gäller utan kö –
 * räkna med längre tid under högsäsong.
 */
export const transfers: Transfer[] = [
  {
    mal: 'Palma centrum',
    href: '/palma-de-mallorca',
    buss: 'EMT-buss A1 till Plaça d’Espanya, ca 20–30 min. Ca 5 € kontant, billigare med bankkort (2026).',
    bil: 'Ca 15 min',
    taxi: 'Ca 25–35 € dagtid, mer på natten (2026)',
  },
  {
    mal: 'Palmanova, Magaluf, Santa Ponça och Peguera',
    buss: 'TIB A11 året runt. Ca 4–7 € beroende på betalsätt (2026).',
  },
  {
    mal: 'S’Arenal, Llucmajor och Campos',
    href: '/campos',
    buss: 'TIB A51 året runt.',
  },
  {
    mal: 'Alcúdia, Platja de Muro och Can Picafort',
    href: '/alcudia',
    buss: 'TIB A32 på sommaren, A33 till Port d’Alcúdia på vintern. Ca 8–14 € beroende på betalsätt (2026).',
    bil: 'Ca 45–60 min (ca 60 km)',
    taxi: 'Ca 80–95 € dagtid (2026)',
  },
  {
    mal: 'Manacor, Porto Cristo och Cala Millor',
    href: '/manacor',
    buss: 'TIB A42 på sommaren, A43 till Manacor på vintern.',
  },
  {
    mal: 'Sóller och Port de Sóller',
    href: '/soller',
    buss: 'Ingen direktbuss från flygplatsen. Ta A1 till Palma och sedan TIB-buss eller Sóllertåget.',
    bil: 'Ca 35–45 min genom Sóllertunneln',
  },
  {
    mal: 'Santanyí, Portopetro och Cala d’Or',
    href: '/santanyi',
    buss: 'Ingen direktbuss från flygplatsen. Byt i Palma; under sommarsäsongen går expressbussen 515e mot Cala d’Or.',
    bil: 'Ca 50 min',
  },
];

/* -------------------------- Direktflyg till PMI ------------------------- */

export type Avreseort = {
  namn: string;
  kod: string;
  /** Flygbolag som flugit direkt 2026 enligt källorna. */
  flygbolag: string;
  /** Säsong och utbud – formulerat försiktigt, utbudet ändras. */
  sasong: string;
  flygtid: string;
};

export const avreseorter: Avreseort[] = [
  {
    namn: 'Stockholm Arlanda',
    kod: 'ARN',
    flygbolag: 'SAS, Norwegian och Ryanair',
    sasong: 'Flera avgångar om dagen på sommaren 2026. På vintern är utbudet mindre.',
    flygtid: 'Ca 3 h 45 min',
  },
  {
    namn: 'Stockholm Skavsta',
    kod: 'NYO',
    flygbolag: 'Norwegian',
    sasong: 'Brukar trafikeras under sommarsäsongen, med färre avgångar än från Arlanda.',
    flygtid: 'Ca 3 h 30 min',
  },
  {
    namn: 'Göteborg Landvetter',
    kod: 'GOT',
    flygbolag: 'Norwegian och SAS',
    sasong: 'Brukar gå främst under sommarsäsongen. Antalet avgångar per vecka varierar mycket mellan säsongerna.',
    flygtid: 'Ca 3–3,5 h',
  },
  {
    namn: 'Köpenhamn Kastrup',
    kod: 'CPH',
    flygbolag: 'SAS, Norwegian och Ryanair',
    sasong: 'Ofta det största utbudet för dig i Skåne. SAS har aviserat fler avgångar sommaren 2027.',
    flygtid: 'Ca 3 h',
  },
  {
    namn: 'Malmö Airport',
    kod: 'MMX',
    flygbolag: 'Charter med Ving',
    sasong: 'Charter till Palma sommaren 2026. Reguljära direktflyg har vi inte kunnat belägga.',
    flygtid: 'Ca 3 h',
  },
];
