// Orterna som väderprognosen på /vader visar. Delas av sidan (serverrenderad
// översikt) och WeatherForecast (klient).

export type WeatherLocation = {
  name: string;
  slug: string;
  lat: number;
  lon: number;
  fact: string;
};

export const WEATHER_LOCATIONS: WeatherLocation[] = [
  { name: 'Palma', slug: 'palma', lat: 39.5696, lon: 2.6502, fact: 'Största staden, varma somrar och milda vintrar' },
  { name: 'Porto Colom', slug: 'porto-colom', lat: 39.4167, lon: 3.2667, fact: 'Kustby, havsbris, något svalare än inlandet' },
  { name: 'Port de Sóller', slug: 'port-de-soller', lat: 39.7958, lon: 2.6942, fact: 'Skyddad av bergen, ofta vindstilla, varm sommar' },
  { name: 'Alcúdia', slug: 'alcudia', lat: 39.8527, lon: 3.1237, fact: 'Norra Mallorca, något blåsigare, fin sommarsäsong' },
  { name: 'Andratx', slug: 'andratx', lat: 39.5741, lon: 2.4267, fact: 'Sydväst på ön, skyddad av berg, populärt bland seglare' },
  { name: 'Deià', slug: 'deia', lat: 39.7469, lon: 2.6488, fact: 'Konstnärsby i Tramuntanabergen, svalare tack vare höjden' },
  { name: 'Artà', slug: 'arta', lat: 39.6981, lon: 3.3503, fact: 'Historisk bergsstad i nordöst, varmt och soligt' },
];
