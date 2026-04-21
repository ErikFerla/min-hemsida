export type AgeGroup = '0-3' | '4-7' | '8-12' | '13+';

export type Category =
  | 'vattenparker'
  | 'djurparker-och-akvarier'
  | 'nojesparker'
  | 'aventyrsparker'
  | 'grottor'
  | 'museer-och-kultur'
  | 'inomhus-och-regn'
  | 'natur-och-utomhus'
  | 'tag-och-bat'
  | 'aktivitet-och-rorelse';

export interface Activity {
  slug: string;
  name: string;
  categories: Category[];
  location: string;
  ageGroups: AgeGroup[];
  shortDescription: string;
  longDescription?: string;
  priceFrom?: number;
  priceNote?: string;
  openingHours?: string;
  bestTime?: string;
  insiderTip?: string;
  imageUrl: string;
  imageAlt: string;
  indoors: boolean;
  bookingUrl?: string;
  website?: string;
  mapQuery: string;
  latitude?: number;
  longitude?: number;
}

export type CategoryMeta = {
  slug: Category;
  label: string;
  shortTagline: string;
  href: string;
  available: boolean;
  heroImage?: string;
};

/**
 * Category registry — single source of truth for labels, hub cards, breadcrumbs.
 * `available: false` = placeholder card on hub (Leverans 2).
 */
export const CATEGORIES: CategoryMeta[] = [
  { slug: 'vattenparker',            label: 'Vattenparker',           shortTagline: 'Mallorcas största vattenparker och familjefavoriter', href: '/barn/vattenparker',            available: true,  heroImage: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834' },
  { slug: 'djurparker-och-akvarier', label: 'Djurparker & akvarier',  shortTagline: 'Från hajar i Palma Aquarium till tigrar på Natura Parc', href: '/barn/djurparker-och-akvarier', available: true,  heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306' },
  { slug: 'inomhus-och-regn',        label: 'Inomhus & regn',         shortTagline: 'När molnen kommer — eller när solen är för stark', href: '/barn/inomhus-och-regn',        available: true,  heroImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30' },
  { slug: 'aventyrsparker',          label: 'Äventyrsparker',         shortTagline: 'Klätterbanor bland trädtopparna',                 href: '/barn/aventyrsparker',          available: false },
  { slug: 'grottor',                 label: 'Grottor',                shortTagline: 'Drach, Artà och Hams — Mallorcas underjord',     href: '/barn/grottor',                 available: false },
  { slug: 'museer-och-kultur',       label: 'Museer & kultur',        shortTagline: 'Sport, konst och historia för nyfikna barn',    href: '/barn/museer-och-kultur',       available: false },
  { slug: 'natur-och-utomhus',       label: 'Natur & utomhus',        shortTagline: 'Vandringar och parker för energiska barn',      href: '/barn/natur-och-utomhus',       available: false },
];

export const AGE_GROUPS: { id: AgeGroup; label: string; caption: string }[] = [
  { id: '0-3',  label: '0–3 år',  caption: 'småbarn' },
  { id: '4-7',  label: '4–7 år',  caption: 'förskola' },
  { id: '8-12', label: '8–12 år', caption: 'mellanstadiet' },
  { id: '13+',  label: '13+ år',  caption: 'tonåringar' },
];

/**
 * 15 unique activities. Palma Aquarium appears under 3 categories via `categories`
 * (vattenparker, djurparker-och-akvarier, inomhus-och-regn) — getActivitiesByCategory
 * handles cross-listing so the card appears on each of the three category pages.
 */
export const ACTIVITIES: Activity[] = [
  // ========== VATTENPARKER ==========
  {
    slug: 'aqualand-el-arenal',
    name: 'Aqualand El Arenal',
    categories: ['vattenparker'],
    location: 'El Arenal, 15 min från Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Mallorcas största vattenpark med 30+ rutschkanor från milda till extremadrenalin.',
    longDescription: 'Aqualand El Arenal är öns äldsta och största vattenpark med över 30 attraktioner spridda över 100 000 kvadratmeter. Här finns allt från klassiska snabba rutschkanor som Tornado till lugnare attraktioner för familjer med mindre barn. Eget småbarnsområde Polynesia med grunda bassänger och mjuka rutschkanor.',
    priceFrom: 38,
    priceNote: 'Online 10% billigare; barn under 100 cm gratis',
    openingHours: 'Maj-oktober, 10-18',
    bestTime: 'Kom vid öppning kl 10 för korta köer',
    insiderTip: 'Parkera vid hotellet Aquasol — gratis och 5 min promenad istället för 12 € i parkens garage',
    imageUrl: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
    imageAlt: 'Vattenrutschkanor och blå pooler på en vattenpark under Mallorcas sol',
    indoors: false,
    website: 'https://www.aqualand.es',
    mapQuery: 'Aqualand El Arenal Mallorca',
  },
  {
    slug: 'western-water-park',
    name: 'Western Water Park',
    categories: ['vattenparker'],
    location: 'Magaluf',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Vilda västern-tema med show, rodeorutschkanor och ett eget småbarnsområde.',
    longDescription: 'Western Water Park kombinerar klassiska vattenparksattraktioner med en teaterupplevelse — hela parken är temalagd som en vilda västern-stad med saloon, bankstaketsceneri och live-shower. Stora rutschkanor för tonåringar och föräldrar, medan Little Rockies-området har grundare pooler och mjukare attraktioner för 2–7-åringar.',
    priceFrom: 36,
    priceNote: 'Bättre-pris-garanti online; sparar 10–15% mot kassapris',
    openingHours: 'Maj-oktober, 10-17',
    bestTime: 'Showen kl 14 — var på plats 13:45 för bra platser',
    insiderTip: 'Little Rockies-området har varmare vatten på morgonen — bra för småbarn som blir kalla i stora bassängen',
    imageUrl: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
    imageAlt: 'Vilda västern-temalagd vattenpark med saloon-fasad och rutschkanor',
    indoors: false,
    website: 'https://www.westernpark.com',
    mapQuery: 'Western Water Park Magaluf',
  },
  {
    slug: 'hidropark-alcudia',
    name: 'Hidropark Alcúdia',
    categories: ['vattenparker'],
    location: "Port d'Alcúdia, norra Mallorca",
    ageGroups: ['4-7', '8-12'],
    shortDescription: 'Den minsta vattenparken men också minst köer — perfekt om ni bor i norr.',
    longDescription: 'Hidropark är Mallorcas enda vattenpark i norr och en välbehållen hemlighet för familjer som bor i Alcúdia eller Pollença-området. Parken är mindre än konkurrenterna kring Palma men har allt som behövs: huvudrutschkanor, barnbassäng, lazy river och restaurang. Eftersom den är mindre känd är köerna minimala även i juli.',
    priceFrom: 27,
    openingHours: 'Juni-september, 10-18',
    bestTime: 'Vardagar undviker bussgrupper från hotellen',
    insiderTip: 'Bor ni i norr — ta er hit istället för att köra 1h till Palmas parker; kvaliteten är tillräckligt lik och dagen blir mindre stressig',
    imageUrl: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
    imageAlt: 'Rutschkanor och pooler på en mindre vattenpark nära Alcúdia',
    indoors: false,
    website: 'https://www.hidropark.com',
    mapQuery: 'Hidropark Alcudia Mallorca',
  },
  {
    slug: 'katmandu-park-splash',
    name: 'Katmandu Park Splash',
    categories: ['vattenparker'],
    location: 'Magaluf',
    ageGroups: ['0-3', '4-7'],
    shortDescription: 'Litet vattenland som ingår i entrén till Katmandu Park — bra komplement för småbarn.',
    longDescription: 'Katmandu Splash är den våta delen av den större Katmandu Park. Här finns grunda pooler, mjuka rutschkanor och vattenlekområden designade specifikt för 2–7-åringar. Eftersom det ingår i parkens huvudentré är det ett bra sätt att bryta upp en hel dag av torra attraktioner med vattenlek.',
    priceNote: 'Ingår i Katmandu Park-entré (45 €)',
    bestTime: 'Efter lunch när de stora attraktionerna har längst köer',
    insiderTip: 'Perfekt som kyltunna under heta middagstimmar — ta med badkläder även om ni primärt kommit för övriga parken',
    imageUrl: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
    imageAlt: 'Grunda pooler och mjuka rutschkanor i ett småbarnsvattenland',
    indoors: false,
    mapQuery: 'Katmandu Park Magaluf',
  },
  // ========== DUBBEL/TRIPPEL-KATEGORI ==========
  {
    slug: 'palma-aquarium',
    name: 'Palma Aquarium',
    categories: ['vattenparker', 'djurparker-och-akvarier', 'inomhus-och-regn'],
    location: 'Playa de Palma',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: '55 akvarier med 700+ marina arter, plus hajar i en gigantisk tank.',
    longDescription: 'Palma Aquarium är ett av Europas mest omfattande akvarium med över 8 000 djur och 700 arter från Medelhavet, Atlanten, Indiska oceanen och Stilla havet. Höjdpunkterna är hajtanken Big Blue (3,5 miljoner liter) där besökarna går genom en tunnel. Akvariet har också en liten djungel-sektion med levande växtlighet och en takterass med utsikt.',
    priceFrom: 25,
    priceNote: 'Online 10% billigare; barn under 3 år gratis',
    openingHours: 'Året runt, 10-18',
    bestTime: 'Öppnar 10 — kom då; eller efter 15 när bussgrupperna lämnat',
    insiderTip: 'Sharks Night-upplevelsen för tonåringar är värd pengarna; boka Diving with Sharks om äldre barnet är 10+',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    imageAlt: 'Akvarietunnel med haj och tropiska fiskar på Palma Aquarium',
    indoors: true,
    website: 'https://www.palmaaquarium.com',
    mapQuery: 'Palma Aquarium Mallorca',
  },
  // ========== DJURPARKER & AKVARIER ==========
  {
    slug: 'marineland-mallorca',
    name: 'Marineland',
    categories: ['djurparker-och-akvarier'],
    location: "Costa d'en Blanes, nära Magaluf",
    ageGroups: ['0-3', '4-7', '8-12'],
    shortDescription: 'Delfinshow, papegojor och sjölejon — klassisk familjefavorit med lång tradition.',
    longDescription: 'Marineland är en av Mallorcas äldsta familjeattraktioner med delfiner, sjölejon, pingviner och tropiska fåglar. Parken är lagom stor för en halvdag och har två showområden: en för delfiner och en för papegojor. Lämpar sig väl för småbarnsfamiljer som vill ha en lugnare dag än vattenpark.',
    priceFrom: 25,
    openingHours: 'Mars-oktober, 9:30-18',
    bestTime: 'Delfinshowen kl 12 är höjdpunkten — kom 30 min före för bra plats',
    insiderTip: 'Kombinera med lunch vid Portals Nous-hamnen efteråt — 5 min bilresa bort',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    imageAlt: 'Delfin hoppar över vattenytan under en show på Marineland Mallorca',
    indoors: false,
    website: 'https://www.marineland.es',
    mapQuery: 'Marineland Mallorca Costa den Blanes',
  },
  {
    slug: 'natura-parc',
    name: 'Natura Parc',
    categories: ['djurparker-och-akvarier'],
    location: 'Santa Eugènia, 20 min från Palma',
    ageGroups: ['0-3', '4-7', '8-12'],
    shortDescription: 'Zoologisk park med 500+ djur inklusive flodhästar, tigrar och stor lekplats.',
    longDescription: 'Natura Parc är en mindre, personligare djurpark än Marineland men med bredare djurutbud. Här finns allt från tigrar och flodhästar till reptilhus och papegojdjungel. Det finns en stor lekplats mitt i parken och BBQ-område där man kan äta egen matsäck. Parken är lagom för 2–3 timmar.',
    priceFrom: 12,
    openingHours: 'Året runt, 10-18',
    bestTime: 'Tidig morgon när djuren är mest aktiva',
    insiderTip: 'Ta med picknick och använd BBQ-området — både billigare och trevligare än parkens egen restaurang',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    imageAlt: 'Zebror och giraffer betar i en grön hage i en zoologisk park på Mallorca',
    indoors: false,
    mapQuery: 'Natura Parc Santa Eugenia Mallorca',
  },
  {
    slug: 'safari-zoo-sa-coma',
    name: 'Safari Zoo Sa Coma',
    categories: ['djurparker-och-akvarier'],
    location: 'Sa Coma, östkusten',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Kör genom i egen bil bland giraffer, zebror och strutsar — unik safari på Mallorca.',
    longDescription: 'Safari Zoo ligger på 40 hektar där man kör genom i egen bil och möter djuren på nära håll. Här finns giraffer, zebror, strutsar, lamadjur och vildsvin som går fritt mellan bilarna. En andra del av parken är en traditionell djurpark med tigrar, apor och reptiler som besöks till fots.',
    priceFrom: 18,
    priceNote: 'Per person; barn 3–12 år billigare; småbarn under 3 gratis',
    openingHours: 'Året runt, 9-17',
    bestTime: 'Morgon när djuren är som mest aktiva',
    insiderTip: 'Stäng fönstren under bilsafariten — strutsarna är nyfikna och sticker in huvudet; ta bilder genom glaset',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    imageAlt: 'Giraff och zebra intill en safari-väg på en djurpark på Mallorcas östkust',
    indoors: false,
    mapQuery: 'Safari Zoo Sa Coma Mallorca',
  },
  // ========== INOMHUS & REGN ==========
  {
    slug: 'palma-jump',
    name: 'Palma Jump',
    categories: ['inomhus-och-regn', 'aktivitet-och-rorelse'],
    location: 'Polígon Son Castelló, Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Mallorcas största trampolinpark med dodgeball, hinderbana och foam pit.',
    longDescription: 'Palma Jump är 2 500 m² trampoliner där barn och vuxna kan hoppa fritt, spela dodgeball i trampolinburar, testa hinderbana och dyka i foam pit. Det finns eget småbarnsområde för 3–5-åringar så alla åldrar kan vara där samtidigt. Föräldrar kan antingen hoppa själva eller sitta i caféet.',
    priceFrom: 12,
    priceNote: 'Per timme; rabatter vid 2+ timmar',
    openingHours: 'Mån-Sön 10-22',
    bestTime: 'Veckodagar eller tidig morgon — helger är packade',
    insiderTip: 'Boka online — populärt och platserna tar slut särskilt på helger; ta med tryck-strumpor eller köp på plats för 3 €',
    imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf',
    imageAlt: 'Barn som hoppar på trampoliner i en stor inomhus trampolinpark',
    indoors: true,
    mapQuery: 'Palma Jump trampolinpark',
  },
  {
    slug: 'kids-republik',
    name: 'Kids Republik',
    categories: ['inomhus-och-regn'],
    location: 'Palma city',
    ageGroups: ['0-3', '4-7', '8-12'],
    shortDescription: '3 våningar inomhuslekland med klätterställningar, hoppborg och café för föräldrar.',
    longDescription: 'Kids Republik är ett modernt lekland i centrala Palma uppdelat på tre våningar: småbarnsavdelning (0–3), mellanområde (4–7) och stort klätterland (8–12). Överst finns ett café för föräldrar med TV-skärmar som visar lekområdena. Ett bra fall-back-alternativ mitt i Palma om det börjar regna.',
    priceFrom: 8,
    priceNote: 'Per barn; föräldrar fri entré',
    openingHours: 'Mån-Sön 10-21',
    bestTime: 'Eftermiddag på vardagar är lugnast',
    insiderTip: 'TV-skärmarna på café-våningen visar varje lekområde — perfekt att slappna av med ett kaffe medan barnen leker själva',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
    imageAlt: 'Färgglad inomhuslekplats med klätterställningar på flera våningar',
    indoors: true,
    mapQuery: 'Kids Republik Palma Mallorca',
  },
  {
    slug: 'caixaforum-palma',
    name: 'CaixaForum Palma',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Plaça Weyler, Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Kulturcentrum i magnifikt modernistiskt palats — erbjuder ofta gratis familjeverkstäder.',
    longDescription: 'CaixaForum Palma ligger i ett av stadens vackraste modernistiska byggnader (Gran Hotel, 1903). Här finns skiftande utställningar — ofta med familjeanpassat innehåll — plus regelbundna verkstäder för barn på helger. Själva byggnaden är en sevärdhet och entrén är oftast gratis.',
    priceNote: 'Ofta gratis entré; vissa specialutställningar kostar',
    openingHours: 'Mån-Lör 10-20, Sön 10-14',
    bestTime: 'Helgförmiddagar när familjeverkstäder pågår',
    insiderTip: 'Kolla programmet i förväg — helgverkstäder är populära och platser bokas via hemsidan ett par dagar innan',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    imageAlt: 'Modernistisk fasad på ett palatskulturcentrum i centrala Palma',
    indoors: true,
    mapQuery: 'CaixaForum Palma Mallorca',
  },
  {
    slug: 'bowling-festival-park',
    name: 'Bowling Festival Park',
    categories: ['inomhus-och-regn', 'aktivitet-och-rorelse'],
    location: 'Festival Park, Marratxí (15 min från Palma)',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Modernt bowlingcenter med 24 banor och arkadspel — klassisk regndag-räddning.',
    longDescription: 'Bowling Festival Park är det enklaste bowlingstället att ta sig till från Palma — ligger i ett stort köpcenter med parkering, restauranger och bio i samma byggnad. 24 banor, bumper-banor för små barn och spelmaskiner för väntetiden. Bra fall-back om regnet kommer plötsligt.',
    priceFrom: 8,
    priceNote: 'Per bana och timme; skohyra ingår',
    openingHours: 'Mån-Sön 12-24',
    bestTime: 'Eftermiddag på vardagar — kvällar är upptagna',
    insiderTip: 'Boka bana online — populärt kvällstid, särskilt på regniga dagar då alla tänker samma tanke',
    imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3',
    imageAlt: 'Bowlingbanor och käglor i en modern bowlinghall',
    indoors: true,
    mapQuery: 'Bowling Festival Park Marratxi Mallorca',
  },
  {
    slug: 'sherwood-park',
    name: 'Sherwood Park',
    categories: ['inomhus-och-regn'],
    location: 'Palma',
    ageGroups: ['0-3', '4-7'],
    shortDescription: 'Litet inomhuslekland för mindre barn med lekslott, hoppborg och kafé.',
    longDescription: 'Sherwood Park är ett småbarnsfokuserat lekland på promenadavstånd från Palmas centrum. Här finns mjuka lekområden, hoppborg, lekslott med rutschkanor och ett enkelt kafé. Storleken gör det lagom för småbarnsföräldrar — inte så stort att man tappar sikte på barnet, inte så litet att de tröttnar på 15 minuter.',
    priceFrom: 7,
    openingHours: 'Mån-Sön 10-20',
    bestTime: 'Vardagar är lugnast',
    insiderTip: 'Perfekt för 2–5-åringar; känns hanterbart även för föräldrar med ensamansvar för flera barn',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
    imageAlt: 'Mjukt inomhuslekland med hoppborg och lekslott för småbarn',
    indoors: true,
    mapQuery: 'Sherwood Park Palma Mallorca',
  },
  {
    slug: 'rafa-nadal-museum-xperience',
    name: 'Rafa Nadal Museum Xperience',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Manacor',
    ageGroups: ['8-12', '13+'],
    shortDescription: 'Interaktivt sportmuseum med VR, F1-simulatorer och Nadals troféer.',
    longDescription: 'Rafa Nadal Museum Xperience ligger intill Nadals tennisakademi i Manacor. Utställningen växlar mellan klassiska troféer och personliga föremål och interaktiva upplevelser som F1-simulatorer, tennis-VR och virtuella matcher mot världsstjärnor. Populärt även hos barn som inte är särskilt tennis-intresserade.',
    priceFrom: 15,
    openingHours: 'Mån-Sön 10-18',
    bestTime: 'Efter lunch när bussgrupperna är mellan Palma och öns östkust',
    insiderTip: 'Kombinera med Drach-grottorna (20 min bort) samma dag — bra regn-dags-paket på östkusten',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    imageAlt: 'Interaktivt sportmuseum med trofémontrar och VR-simulatorer',
    indoors: true,
    mapQuery: 'Rafa Nadal Museum Manacor',
  },
  {
    slug: 'es-baluard',
    name: 'Es Baluard',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Plaça de la Porta Santa Catalina, Palma',
    ageGroups: ['4-7', '8-12'],
    shortDescription: 'Konstmuseum med regelbundna kreativa workshops för barn på helger.',
    longDescription: 'Es Baluard är Palmas konstmuseum beläget i ett renoverat militärfort med fantastisk takterrass-utsikt över hamnen. På helger erbjuds familjeverkstäder där barn får skapa konst inspirerad av utställningarna. Museet har även en tyst gård med olivträd som är bra för en paus.',
    priceNote: 'Verkstad oftast gratis med entré (~6 € vuxna, barn under 12 gratis)',
    openingHours: 'Tis-Lör 10-20, Sön 10-15',
    bestTime: 'Helgförmiddagar när verkstäder pågår',
    insiderTip: 'Verkstäder hålls oftast på katalanska/spanska men bildspråket är universellt — barn hänger med ändå',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    imageAlt: 'Konstmuseum i renoverat militärfort med takterrass över Palmas hamn',
    indoors: true,
    mapQuery: 'Es Baluard Palma Mallorca',
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getActivitiesByCategory(category: Category): Activity[] {
  return ACTIVITIES.filter((a) => a.categories.includes(category));
}

export function filterByAge(activities: Activity[], ages: AgeGroup[]): Activity[] {
  if (ages.length === 0) return activities;
  return activities.filter((a) => a.ageGroups.some((g) => ages.includes(g)));
}

export function getActivityBySlug(slug: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.slug === slug);
}

export function getCategoryMeta(slug: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
