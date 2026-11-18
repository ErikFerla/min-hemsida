/**
 * En plats för guidernas metadata: används av guidernas layouter (metadata + Article-schema)
 * och av översikten /guider (ItemList-schema).
 *
 * Datum kommer från git-historiken: guiderna lades till 2026-04-11 (PR #2) och ändrades
 * senast i Våg 1/Våg 2 (2026-11-17). Uppdatera dateModified när innehållet ändras.
 */
export const SITE_URL = 'https://www.mymallorca.se';

export type GuideMeta = {
  slug: string;
  /** Titel utan sajtnamn (≤47 tecken) – title.template lägger till " | MyMallorca". */
  title: string;
  /** Sidans h1 – används som headline i Article-schemat. */
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  datePublished: string;
  dateModified: string;
};

export const GUIDES = {
  'basta-tid-resa-mallorca': {
    slug: 'basta-tid-resa-mallorca',
    title: 'Bästa tiden att resa till Mallorca',
    headline: 'Bästa tiden att resa till Mallorca',
    description:
      'Månad-för-månad-guide till Mallorcas klimat, turisttryck och prisnivå. Hitta din bästa reseperiod utifrån vad du söker – strand, avkoppling eller aktiviteter.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=85',
    imageAlt: 'Strand på Mallorca i solsken',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-17T20:12:35+01:00',
  },
  'mallorca-med-barn': {
    slug: 'mallorca-med-barn',
    title: 'Familjesemester på Mallorca – planera resan',
    headline: 'Familjesemester på Mallorca',
    description:
      'Planera familjesemestern på Mallorca: vilken strand som passar vilken ålder, när ni ska åka, hyrbil och barnstol – och familjefavoriterna på en karta.',
    image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85',
    imageAlt: 'Barnfamilj på semester på Mallorca',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-17',
  },
  'basta-stranderna-mallorca': {
    slug: 'basta-stranderna-mallorca',
    title: 'Bästa stränderna på Mallorca – vår topp 15',
    headline: 'Mallorcas 15 bästa stränder – vår topplista',
    description:
      'Vår topplista över Mallorcas 15 bästa stränder – med motivering, insidertips, parkering och bästa tid för varje strand. Alla 30 stränder finns på strandsidan.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=85',
    imageAlt: 'Turkost vatten och vit sandstrand på Mallorca',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-17',
  },
  'basta-restauranger-palma': {
    slug: 'basta-restauranger-palma',
    title: '15 bästa restaurangerna i Palma – lokal guide',
    headline: '15 bästa restaurangerna i Palma',
    description:
      'Rankade av en lokal: de 15 bästa restaurangerna i Palma de Mallorca. Michelinkrogar, bästa tapas, fisk och skaldjur, och dolda pärlor utan turistpriser.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80',
    imageAlt: 'Restaurangbord i Palma de Mallorca',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-17T20:12:35+01:00',
  },
  'golf-mallorca-guide': {
    slug: 'golf-mallorca-guide',
    title: 'Bästa golfbanorna på Mallorca – topp 5',
    headline: 'De 5 bästa golfbanorna på Mallorca',
    description:
      'Våra fem favoritbanor på Mallorca med motivering, greenfee-nivå och insidertips – plus bästa säsongen för golf och en snabb översikt över övriga banor.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=630&fit=crop&q=80',
    imageAlt: 'Golfbana på Mallorca med havsutsikt',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-17',
  },
} as const satisfies Record<string, GuideMeta>;

export type GuideSlug = keyof typeof GUIDES;

export const guideUrl = (slug: GuideSlug) => `${SITE_URL}/guide/${slug}`;

const publisher = { '@type': 'Organization', name: 'MyMallorca', url: SITE_URL };

/** Article + BreadcrumbList för en guide. */
export function guideJsonLd(slug: GuideSlug) {
  const g: GuideMeta = GUIDES[slug];
  const url = guideUrl(slug);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.headline,
      description: g.description,
      image: [g.image],
      datePublished: g.datePublished,
      dateModified: g.dateModified,
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
        { '@type': 'ListItem', position: 1, name: 'Hem', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guider', item: `${SITE_URL}/guider` },
        { '@type': 'ListItem', position: 3, name: g.headline, item: url },
      ],
    },
  ];
}
