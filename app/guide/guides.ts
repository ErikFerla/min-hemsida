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
  /** Brödsmulans mellanled (synlig och i BreadcrumbList). Utan den: Guider (/guider). */
  parent?: { name: string; path: string };
};

/** Familjeguiderna ligger under Med barn i menyn – och därmed i brödsmulan. */
const FAMILJ_PARENT = { name: 'Med barn', path: '/barn' } as const;

/** Brödsmulans mellanled för en guide (Breadcrumbs-formatet). */
function guideCrumbParent(slug: GuideSlug) {
  const g: GuideMeta = GUIDES[slug];
  const parent = g.parent ?? { name: 'Guider', path: '/guider' };
  return { name: parent.name, url: parent.path };
}

export const GUIDES = {
  'basta-tid-resa-mallorca': {
    slug: 'basta-tid-resa-mallorca',
    title: 'Bästa tiden att resa till Mallorca',
    headline: 'Bästa tiden att resa till Mallorca',
    description:
      'Guide månad för månad till Mallorcas klimat, turisttryck och prisnivå. Hitta din bästa reseperiod utifrån vad du söker – strand, avkoppling eller aktiviteter.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Platja_de_Formentor.JPG/1920px-Platja_de_Formentor.JPG',
    imageAlt: 'Platja de Formentor i solsken – turkost vatten, sandstrand och tallskog under bergen',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-20',
  },
  'mallorca-med-barn': {
    slug: 'mallorca-med-barn',
    title: 'Familjesemester på Mallorca – planera resan',
    headline: 'Familjesemester på Mallorca',
    description:
      'Planera familjesemestern på Mallorca: vilken strand som passar vilken ålder, när ni ska åka, hyrbil och barnstol – och familjefavoriterna på en karta.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cala_Mondrag%C3%B3_02.jpg/1920px-Cala_Mondrag%C3%B3_02.jpg',
    imageAlt: 'Segelbåtar i den skyddade viken Cala Mondragó på Mallorcas sydöstkust',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-20',
    parent: FAMILJ_PARENT,
  },
  'basta-stranderna-mallorca': {
    slug: 'basta-stranderna-mallorca',
    title: 'Bästa stränderna på Mallorca – vår topp 15',
    headline: 'Mallorcas 15 bästa stränder – vår topplista',
    description:
      'Vår topplista över Mallorcas 15 bästa stränder – med motivering, insidertips, parkering och bästa tid för varje strand. Fler stränder finns på strandsidan.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg',
    imageAlt: 'Caló des Moro – turkost vatten mellan kalkstensklippor och tallskog på södra Mallorca',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-20',
  },
  'basta-restauranger-palma': {
    slug: 'basta-restauranger-palma',
    title: 'Palmas bästa restauranger – lokal guide',
    headline: 'De bästa restaurangerna i Palma',
    description:
      'Utvalda av oss som bor här: de bästa restaurangerna i Palma de Mallorca. Michelinkrogar, tapas, fisk och skaldjur – och smultronställen utan turistpriser.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Spanish_Tapas.jpg/1920px-Spanish_Tapas.jpg',
    imageAlt: 'Flera små tapasrätter på ett bord (genrebild)',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-20',
  },
  'golf-mallorca-guide': {
    slug: 'golf-mallorca-guide',
    title: 'Bästa golfbanorna på Mallorca – topp 5',
    headline: 'De 5 bästa golfbanorna på Mallorca',
    description:
      'Våra fem favoritbanor på Mallorca med motivering, prisnivå och insidertips – plus bästa säsongen för golf och en snabb översikt över övriga banor.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg',
    imageAlt: 'Green på Pula Golf vid Son Servera med berg i bakgrunden',
    datePublished: '2026-04-11T21:17:34+02:00',
    dateModified: '2026-11-20',
  },
  // Familjeguider (7.2) – bilderna är redan krediterade i data/credits/ (d3 och d2).
  'mallorca-med-barn-manad-for-manad': {
    slug: 'mallorca-med-barn-manad-for-manad',
    title: 'Mallorca med barn månad för månad',
    headline: 'Mallorca med barn månad för månad',
    description:
      'Mallorca med barn månad för månad: väder och badvatten, vad som har öppet, lov och barnvänliga fester – och några utflyktsförslag för varje månad.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/S%C3%B3ller_train_station_15.jpg/1920px-S%C3%B3ller_train_station_15.jpg',
    imageAlt: 'Det gamla trätåget till Sóller vid stationen i Sóller',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    parent: FAMILJ_PARENT,
  },
  'stranderna-for-barn': {
    slug: 'stranderna-for-barn',
    title: 'Bästa stränderna för barn – efter ålder',
    headline: 'Bästa stränderna för barn – efter ålder',
    description:
      'Mallorcas stränder för barn i olika åldrar: grunt och sand för de minsta, snorkling och klippor för större barn – med service, parkering och säkerhet.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Platja_de_Muro_R02.jpg/1920px-Platja_de_Muro_R02.jpg',
    imageAlt: 'Platja de Muro – sandstrand och grunt vatten med utsikt över Alcúdiabukten',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    parent: FAMILJ_PARENT,
  },
  'regniga-dagar-med-barn': {
    slug: 'regniga-dagar-med-barn',
    title: 'Regniga dagar med barn – per del av ön',
    headline: 'Regniga dagar med barn på Mallorca',
    description:
      'Regnigt på Mallorca? Inomhusaktiviteter, grottor och museer för barn i Palma, norr, öst, syd och väst – med restid och vad du ska kontrollera innan.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Coves_del_Drac_21.jpg/1920px-Coves_del_Drac_21.jpg',
    imageAlt: 'Droppstenar och underjordisk sjö i Coves del Drac, Porto Cristo',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    parent: FAMILJ_PARENT,
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
        { '@type': 'ListItem', position: 2, name: guideCrumbParent(slug).name, item: `${SITE_URL}${guideCrumbParent(slug).url}` },
        { '@type': 'ListItem', position: 3, name: g.headline, item: url },
      ],
    },
  ];
}
