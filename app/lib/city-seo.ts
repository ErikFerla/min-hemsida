import type { Metadata } from 'next';

export type City = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  lat: number;
  lon: number;
  titleOverride?: string;
};

const BASE_URL = 'https://www.mymallorca.se';
const SITE_NAME = 'MyMallorca';

export const CITIES: Record<string, City> = {
  'palma-de-mallorca': {
    slug: 'palma-de-mallorca',
    name: 'Palma de Mallorca',
    titleOverride: 'Palma de Mallorca – Komplett reseguide | MyMallorca',
    description: 'Palma de Mallorca – öns pulserande huvudstad med gotiska La Seu, livlig gamla stan och kulinarisk scen i världsklass. Insider-tips från lokalkännare.',
    heroImage: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e',
    lat: 39.5696,
    lon: 2.6502,
  },
  'soller': {
    slug: 'soller',
    name: 'Sóller',
    description: 'Sóller – bergsby i Tramuntana med anrik träspårvagn till havet, apelsinodlingar och torget där lokalbefolkningen möts. Svensk reseguide med insider-tips.',
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.7667,
    lon: 2.7167,
  },
  'port-de-soller': {
    slug: 'port-de-soller',
    name: 'Port de Sóller',
    description: 'Port de Sóller – cirkelformad vik i Tramuntana nådd med historisk spårvagn från Sóller. Snorkling, solnedgång och havsrestauranger. Svensk guide inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.7957,
    lon: 2.6938,
  },
  'valldemossa': {
    slug: 'valldemossa',
    name: 'Valldemossa',
    description: 'Valldemossa i Serra de Tramuntana – UNESCO-by med kartusianerklostret där Chopin bodde. Ockrafärgade stenhus och autentiskt lugn. Vår guide inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
    lat: 39.7117,
    lon: 2.6225,
  },
  'deia': {
    slug: 'deia',
    name: 'Deià',
    description: 'Deià – konstnärsby i Tramuntana med havsutsikt, Robert Graves-museet och den dolda Cala Deià nedanför. Bohemisk charm få öar kan matcha. Vår lokala guide.',
    heroImage: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
    lat: 39.7486,
    lon: 2.6483,
  },
  'pollenca': {
    slug: 'pollenca',
    name: 'Pollença',
    description: 'Pollença i norra Mallorca – autentisk by med 365 trappsteg till Calvari, söndagsmarknad vid torget och årlig jazzfestival. Insider-tips från lokalkännare.',
    heroImage: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
    lat: 39.8767,
    lon: 3.0161,
  },
  'alcudia': {
    slug: 'alcudia',
    name: 'Alcúdia',
    description: 'Alcúdia i norra Mallorca – kuststad med välbevarade medeltida murar, romerska Pollentia och Playa de Muro runt hörnet. Lokalt perspektiv från vår guide.',
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.8522,
    lon: 3.1217,
  },
  'andratx': {
    slug: 'andratx',
    name: 'Andratx',
    description: "Andratx i sydvästra Mallorca – lugn stadskärna med Port d'Andratx marina och Camp de Mar några minuter bort. Klippkullar och exklusiv atmosfär. Vår guide.",
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.5742,
    lon: 2.4200,
  },
  'arta': {
    slug: 'arta',
    name: 'Artà',
    description: "Artà – medeltida bergsstad i östra Mallorca med borgen Santuari de Sant Salvador, stensatta gränder och Coves d'Artà. Svensk reseguide skriven inifrån.",
    heroImage: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
    lat: 39.6958,
    lon: 3.3500,
  },
  'capdepera': {
    slug: 'capdepera',
    name: 'Capdepera',
    description: 'Capdepera i nordöstra Mallorca – medeltida fort med panoramautsikt över havet och Cala Rajada några minuter bort. Solnedgångens bästa vy. Reseguide inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    lat: 39.7019,
    lon: 3.4356,
  },
  'porto-colom': {
    slug: 'porto-colom',
    name: 'Porto Colom',
    description: 'Porto Colom på östkusten – autentisk fiskby med en av Mallorcas vackraste naturhamnar och färsk fångst direkt från kajen. Insider-tips från lokalkännare.',
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.4181,
    lon: 3.2628,
  },
  'porto-petro': {
    slug: 'porto-petro',
    name: 'Porto Petro',
    description: 'Porto Petro i södra Mallorca – lugn marinaby med exklusiva segelbåtar, Cala Mondragó runt hörnet och fisk direkt från hamnen. Reseguide skriven inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    lat: 39.3639,
    lon: 3.2111,
  },
  'santanyi': {
    slug: 'santanyi',
    name: 'Santanyí',
    description: 'Santanyí i södra Mallorca – honungsgul sandsten, livlig onsdagsmarknad och konstgallerier bara minuter från Cala Llombards. Vår guide skriven inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    lat: 39.3556,
    lon: 3.1197,
  },
  'felanitx': {
    slug: 'felanitx',
    name: 'Felanitx',
    description: 'Felanitx i östra Mallorca – traditionell stad känd för lokal keramik, vin och stor söndagsmarknad. Castell de Santueri på nära håll. Svensk guide inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    lat: 39.4683,
    lon: 3.1478,
  },
  'inca': {
    slug: 'inca',
    name: 'Inca',
    description: 'Inca – Mallorcas läderstad i inland, med stor torsdagsmarknad, traditionella cellers i vinkällare och lädermässan Dijous Bo i november. Reseguide inifrån.',
    heroImage: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    lat: 39.7211,
    lon: 2.9111,
  },
  'sineu': {
    slug: 'sineu',
    name: 'Sineu',
    description: 'Sineu i Mallorcas geografiska hjärta – öns äldsta marknad sedan 1306, levande torg och kyrkan Mare de Déu dels Àngels. Svensk reseguide från lokalkännare.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    lat: 39.6433,
    lon: 2.9911,
  },
  'manacor': {
    slug: 'manacor',
    name: 'Manacor',
    description: 'Manacor – Mallorcas näst största stad på östkusten. Pärlor, Rafa Nadals hemstad och porten till Drach-grottorna. Insider-tips från lokalkännare.',
    heroImage: 'https://images.unsplash.com/photo-1474722883778-792e7990302f',
    lat: 39.5700,
    lon: 3.2090,
  },
  'campos': {
    slug: 'campos',
    name: 'Campos',
    description: 'Campos – saltstaden i södra Mallorca med två marknadsdagar, Es Trenc runt hörnet och Flor de Sal som skördas för hand. Autentisk reseguide på svenska.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
    lat: 39.4333,
    lon: 3.0167,
  },
};

export function cityTitle(c: City): string {
  return c.titleOverride ?? `${c.name} på Mallorca – Komplett reseguide | ${SITE_NAME}`;
}

export function cityUrl(c: City): string {
  return `${BASE_URL}/${c.slug}`;
}

export function cityOgImage(c: City): string {
  return `${c.heroImage}?w=1200&h=630&fit=crop&q=85`;
}

export function buildCityMetadata(c: City): Metadata {
  const title = cityTitle(c);
  const url = cityUrl(c);
  const image = cityOgImage(c);
  const alt = `${c.name} på Mallorca`;

  return {
    title,
    description: c.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'sv_SE',
      title,
      description: c.description,
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: c.description,
      images: [image],
    },
  };
}
