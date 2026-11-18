/**
 * Metadata för de praktiska sidorna (Våg 3, åtgärd 3.6): budget och priser, praktiskt och
 * säkerhet, Mallorca på vintern samt vandring och cykling.
 *
 * Används av sidornas layouter (metadata, Article- och BreadcrumbList-schema).
 * `checked` är datumet då uppgifterna senast kontrollerades mot källorna (3.7) – uppdatera
 * det bara när innehållet faktiskt har kontrollerats igen.
 */
import { BASE_URL } from '@/app/lib/city-seo';

export type PraktiskSida = {
  path: string;
  /** Titel utan sajtnamn (≤47 tecken) – title.template lägger till " | MyMallorca". */
  title: string;
  /** Sidans h1 och brödsmula. */
  headline: string;
  breadcrumb: string;
  /** 120–160 tecken. */
  description: string;
  /** Bild som redan används på sajten (bas-URL utan query). */
  image: string;
  imageAlt: string;
  datePublished: string;
  dateModified: string;
  checked: string;
};

export const PRAKTISKA_SIDOR = {
  budget: {
    path: '/budget-och-priser',
    title: 'Vad kostar Mallorca? Priser och turistskatt',
    headline: 'Vad kostar en resa till Mallorca?',
    breadcrumb: 'Budget och priser',
    description:
      'Ungefärliga priser på Mallorca 2026: kaffe, lunch, middag, öl, buss, hyrbil, entréer och solstolar – plus turistskatten, dricks och våra bästa sparatips.',
    image: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e',
    imageAlt: 'Palma de Mallorca med katedralen La Seu vid havet',
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
    checked: '2026-11-18',
  },
  praktiskt: {
    path: '/praktiskt',
    title: 'Praktiskt och säkerhet på Mallorca',
    headline: 'Praktiskt och säkerhet på Mallorca',
    breadcrumb: 'Praktiskt och säkerhet',
    description:
      'Det praktiska inför Mallorcaresan: id-kort, EU-kort och vård, 112, jourapotek, vatten, språk, öppettider, alkoholregler, regler på stranden och brandrisk.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    imageAlt: 'Strand med turkost vatten på Mallorca en solig dag',
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
    checked: '2026-11-18',
  },
  vinter: {
    path: '/mallorca-pa-vintern',
    title: 'Mallorca på vintern – vad är öppet?',
    headline: 'Mallorca på vintern',
    breadcrumb: 'Mallorca på vintern',
    description:
      'Mallorca november–mars: vad som är öppet och stängt, vädret, mandelblomningen, vandring, Sant Antoni och Sant Sebastià – och tips för dig som bor på ön.',
    image: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5',
    imageAlt: 'Solig terrass med utsikt över Mallorcas kust och olivlundar',
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
    checked: '2026-11-18',
  },
  vandring: {
    path: '/vandring-och-cykling',
    title: 'Vandring och cykling på Mallorca',
    headline: 'Vandring och cykling på Mallorca',
    breadcrumb: 'Vandring och cykling',
    description:
      'Vandra GR 221 med övernattning i refugis, Torrent de Pareis och Puig de Massanella, cykla Sa Calobra och Formentor – med säsong, regler och säkerhet i bergen.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
    imageAlt: 'Vandrare på en bergstig i Serra de Tramuntana på Mallorca',
    datePublished: '2026-11-18',
    dateModified: '2026-11-18',
    checked: '2026-11-18',
  },
} as const satisfies Record<string, PraktiskSida>;

export type PraktiskSidaKey = keyof typeof PRAKTISKA_SIDOR;

/** Bild-URL i Open Graph-format (1200×630). */
export const praktiskOgImage = (key: PraktiskSidaKey) =>
  `${PRAKTISKA_SIDOR[key].image}?w=1200&h=630&fit=crop&q=85`;

const publisher = { '@type': 'Organization', name: 'MyMallorca', url: BASE_URL };

/** Article + BreadcrumbList (Hem › sidan) för en praktisk sida. */
export function praktiskJsonLd(key: PraktiskSidaKey) {
  const p: PraktiskSida = PRAKTISKA_SIDOR[key];
  const url = `${BASE_URL}${p.path}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.headline,
      description: p.description,
      image: [praktiskOgImage(key)],
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      inLanguage: 'sv-SE',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      author: publisher,
      publisher,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hem', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: p.breadcrumb, item: url },
      ],
    },
  ];
}
