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
  /** Alt-text som beskriver heroImage (visas på hubbens kategorikort). */
  heroImageAlt?: string;
};

/**
 * Category registry – single source of truth for labels, hub cards, breadcrumbs.
 * `available: false` = kategorin döljs på hubben och i länklistorna tills den har innehåll.
 */
export const CATEGORIES: CategoryMeta[] = [
  { slug: 'vattenparker',            label: 'Vattenparker',           shortTagline: 'Mallorcas största vattenparker och familjefavoriter', href: '/barn/vattenparker',            available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Water_slide%2C_Ada_East_%28P1090930%29.jpg/1920px-Water_slide%2C_Ada_East_%28P1090930%29.jpg', heroImageAlt: 'Vattenrutschkana vid en pool i solsken (genrebild)' },
  { slug: 'djurparker-och-akvarier', label: 'Djurparker & akvarier',  shortTagline: 'Från hajar i Palma Aquarium till lemurer på Natura Parc', href: '/barn/djurparker-och-akvarier', available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG/1920px-Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG', heroImageAlt: 'Haj som simmar i en bassäng på Palma Aquarium' },
  { slug: 'inomhus-och-regn',        label: 'Inomhus & regn',         shortTagline: 'När molnen kommer – eller när solen är för stark', href: '/barn/inomhus-och-regn',        available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Palma_Aquarium-La_jungla.jpg/1920px-Palma_Aquarium-La_jungla.jpg', heroImageAlt: 'Vattenfall i inomhusdjungeln på Palma Aquarium' },
  { slug: 'grottor',                 label: 'Grottor',                shortTagline: 'Drac, Hams, Artà och Campanet – Mallorcas underjord', href: '/barn/grottor',               available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Coves_del_Drac_21.jpg/1920px-Coves_del_Drac_21.jpg', heroImageAlt: 'Droppstenar och underjordisk sjö i Coves del Drac' },
  { slug: 'aventyrsparker',          label: 'Äventyrsparker',         shortTagline: 'Klätterbanor och linbanor bland trädtopparna',   href: '/barn/aventyrsparker',          available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zip_Line_Canopy_Tour_Costa_Rica.jpg/1920px-Zip_Line_Canopy_Tour_Costa_Rica.jpg', heroImageAlt: 'Linbana mellan trädtopparna (genrebild)' },
  { slug: 'museer-och-kultur',       label: 'Museer & kultur',        shortTagline: 'Ett runt slott, konst och sport för nyfikna barn', href: '/barn/museer-och-kultur',       available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/035_2015_06_02_Castell_de_Bellver.jpg/1920px-035_2015_06_02_Castell_de_Bellver.jpg', heroImageAlt: 'Den runda borggården i Castell de Bellver i Palma' },
  { slug: 'natur-och-utomhus',       label: 'Natur & utomhus',        shortTagline: 'Fågelsjöar, naturparker och tåget över bergen',  href: '/barn/natur-och-utomhus',       available: true,  heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cala_Mondrag%C3%B3_02.jpg/1920px-Cala_Mondrag%C3%B3_02.jpg', heroImageAlt: 'Segelbåtar i viken Cala Mondragó i Parc Natural de Mondragó' },
];

export const AGE_GROUPS: { id: AgeGroup; label: string; caption: string }[] = [
  { id: '0-3',  label: '0–3 år',  caption: 'småbarn' },
  { id: '4-7',  label: '4–7 år',  caption: 'förskola' },
  { id: '8-12', label: '8–12 år', caption: 'mellanstadiet' },
  { id: '13+',  label: '13+ år',  caption: 'tonåringar' },
];

/**
 * Unika aktiviteter. En aktivitet kan höra till flera kategorier via `categories` (t.ex. Palma
 * Aquarium och museerna i Palma) – getActivitiesByCategory visar den på varje kategorisida.
 * Uppgifterna för grottor, äventyrsparker, museer och natur kontrollerades 2026-11-18
 * (källor i BARN_SOURCES nedan). Priser anges med "ca" och år.
 */
export const ACTIVITIES: Activity[] = [
  // ========== VATTENPARKER ==========
  {
    slug: 'aqualand-el-arenal',
    name: "Aqualand s'Arenal",
    categories: ['vattenparker'],
    location: 'El Arenal, 15 min från Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Mallorcas största vattenpark med över 30 rutschkanor, från milda till riktigt vilda.',
    longDescription: "Aqualand s'Arenal är öns största vattenpark med över 30 attraktioner spridda över 100 000 kvadratmeter. Här finns allt från klassiska snabba rutschkanor som Tornado till lugnare attraktioner för familjer med mindre barn. Eget småbarnsområde Polynesia med grunda bassänger och mjuka rutschkanor.",
    priceFrom: 38,
    priceNote: 'Online 10 % billigare; barn under 3 år gratis',
    openingHours: 'Maj–oktober, kl. 10–18',
    bestTime: 'Kom vid öppning kl. 10 för korta köer',
    insiderTip: 'Parkera vid hotellet Aquasol – gratis och 5 min promenad i stället för 12 € i parkens garage',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aqualand_s%27Arenal_tobogan_blanc.jpg/1280px-Aqualand_s%27Arenal_tobogan_blanc.jpg',
    imageAlt: "Vattenrutschbanor på Aqualand i s'Arenal",
    indoors: false,
    website: 'https://www.aqualand.es',
    mapQuery: "Aqualand s'Arenal Mallorca",
  },
  {
    slug: 'western-water-park',
    name: 'Western Water Park',
    categories: ['vattenparker'],
    location: 'Magaluf',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Tema från vilda västern med show, rodeorutschkanor och ett eget småbarnsområde.',
    longDescription: 'Western Water Park kombinerar klassiska vattenparksattraktioner med en teaterupplevelse – hela parken är temalagd som en stad i vilda västern, med saloon, kulisser och shower. Stora rutschkanor för tonåringar och föräldrar, medan Little Rockies-området har grundare pooler och mjukare attraktioner för 2–7-åringar.',
    priceFrom: 36,
    priceNote: 'Lägsta pris online; 10–15 % billigare än i kassan',
    openingHours: 'Maj–oktober, kl. 10–17',
    bestTime: 'Showen kl. 14 – var på plats kl. 13.45 för bra platser',
    insiderTip: 'Little Rockies-området har varmare vatten på morgonen – bra för småbarn som blir kalla i stora bassängen',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Water_slide%2C_Ada_East_%28P1090930%29.jpg/1920px-Water_slide%2C_Ada_East_%28P1090930%29.jpg',
    imageAlt: 'Vattenrutschkana och pool i solsken – genrebild, inte från Western Water Park',
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
    shortDescription: 'Den minsta vattenparken men också minst köer – perfekt om ni bor i norr.',
    longDescription: 'Hidropark är Mallorcas enda vattenpark i norr och en välbehållen hemlighet för familjer som bor kring Alcúdia eller Pollença. Parken är mindre än konkurrenterna kring Palma men har allt som behövs: stora rutschkanor, barnbassäng, en lugn flod att flyta runt i och restaurang. Eftersom den är mindre känd är köerna minimala även i juli.',
    priceFrom: 27,
    openingHours: 'Juni–september, kl. 10–18',
    bestTime: 'Vardagar – då slipper ni bussgrupperna från hotellen',
    insiderTip: 'Bor ni i norr – ta er hit i stället för att köra en timme till parkerna vid Palma; kvaliteten är tillräckligt lik och dagen blir mindre stressig',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Hidropark_Mallorca.jpg',
    imageAlt: 'Entrén till vattenparken Hidropark i Port d\'Alcúdia',
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
    shortDescription: 'Litet vattenland som ingår i entrén till Katmandu Park – bra komplement för småbarn.',
    longDescription: 'Katmandu Splash är den våta delen av den större Katmandu Park. Här finns grunda pooler, mjuka rutschkanor och vattenlek gjord för 2–7-åringar. Eftersom det ingår i parkens huvudentré är det ett bra sätt att bryta upp en hel dag av torra attraktioner med vattenlek.',
    priceNote: 'Ingår i entrén till Katmandu Park (45 €)',
    bestTime: 'Efter lunch när de stora attraktionerna har längst köer',
    insiderTip: 'Perfekt för att svalka sig mitt på dagen – ta med badkläder även om ni främst kommit för resten av parken',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/House_of_Katmandu_Palmanova_Mallorca.jpg/960px-House_of_Katmandu_Palmanova_Mallorca.jpg',
    imageAlt: 'Katmandu Parks upp-och-nedvända hus i Magaluf',
    indoors: false,
    mapQuery: 'Katmandu Park Magaluf',
  },
  // ========== DUBBEL/TRIPPEL-KATEGORI ==========
  {
    slug: 'palma-aquarium',
    name: 'Palma Aquarium',
    categories: ['vattenparker', 'djurparker-och-akvarier', 'inomhus-och-regn'],
    location: 'Platja de Palma',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: '55 akvarier med över 700 marina arter, plus hajar i en jättelik tank.',
    longDescription: 'Palma Aquarium är ett av Europas största akvarier med över 8 000 djur och 700 arter från Medelhavet, Atlanten, Indiska oceanen och Stilla havet. Höjdpunkterna är hajtanken Big Blue (3,5 miljoner liter) där besökarna går genom en tunnel. Akvariet har också en liten djungeldel med levande växter och en takterrass med utsikt.',
    priceFrom: 25,
    priceNote: 'Online 10 % billigare; barn under 3 år gratis',
    openingHours: 'Året runt, kl. 10–18',
    bestTime: 'Öppnar kl. 10 – kom då, eller efter kl. 15 när bussgrupperna har gått',
    insiderTip: 'Sharks Night-upplevelsen för tonåringar är värd pengarna; boka Diving with Sharks om det äldre barnet är 10 år eller äldre',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tibur%C3%B3n_en_el_Big_Blue.jpg/960px-Tibur%C3%B3n_en_el_Big_Blue.jpg',
    imageAlt: 'Haj och fiskstim i den stora bassängen Big Blue på Palma Aquarium',
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
    shortDescription: 'Delfinshow, papegojor och sjölejon – klassisk familjefavorit med lång tradition.',
    longDescription: 'Marineland är en av Mallorcas äldsta familjeattraktioner med delfiner, sjölejon, pingviner och tropiska fåglar. Parken är lagom stor för en halvdag och har två showområden: en för delfiner och en för papegojor. Lämpar sig väl för småbarnsfamiljer som vill ha en lugnare dag än i en vattenpark.',
    priceFrom: 25,
    openingHours: 'Mars–oktober, kl. 9.30–18',
    bestTime: 'Delfinshowen kl. 12 är höjdpunkten – kom 30 min före för bra plats',
    insiderTip: 'Kombinera med lunch i hamnen i Portals Nous efteråt – 5 min bilresa bort',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Delfin_im_Marineland_Mallorca.jpg/960px-Delfin_im_Marineland_Mallorca.jpg',
    imageAlt: 'Delfin som hoppar över vattnet under en show på Marineland',
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
    shortDescription: 'Djurpark med många fåglar, lemurer, reptiler och lantbruksdjur, och en stor lekplats.',
    longDescription: 'Natura Parc är en mindre, personligare djurpark än Marineland men med bredare djurutbud. Här finns allt från lemurer och fåglar till reptiler och lantbruksdjur. Det finns en stor lekplats mitt i parken och en grillplats där ni kan äta egen matsäck. Parken är lagom för 2–3 timmar.',
    priceFrom: 14,
    priceNote: 'Ca 14,50 € vuxna och ca 8,50 € barn 3–11 år (2026); under 3 år gratis',
    bestTime: 'Tidig morgon när djuren är mest aktiva',
    insiderTip: 'Ta med picknick och använd grillplatsen – både billigare och trevligare än parkens egen restaurang',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Ring-tailed_lemur_%28Lemur_catta%29_2.jpg/960px-Ring-tailed_lemur_%28Lemur_catta%29_2.jpg',
    imageAlt: 'Ringsvanslemur som dricker vid en vattenpöl – genrebild, inte från Natura Parc',
    indoors: false,
    mapQuery: 'Natura Parc Santa Eugenia Mallorca',
  },
  {
    slug: 'safari-zoo-sa-coma',
    name: 'Safari Zoo Sa Coma',
    categories: ['djurparker-och-akvarier'],
    location: 'Sa Coma, östkusten',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Kör genom parken i egen bil bland giraffer, zebror och strutsar – en safari mitt på Mallorca.',
    longDescription: 'Safari Zoo ligger på 40 hektar där ni kör genom parken i egen bil och möter djuren på nära håll. Här finns giraffer, zebror, strutsar, lamadjur och vildsvin som går fritt mellan bilarna. En andra del av parken är en traditionell djurpark med tigrar, apor och reptiler som besöks till fots.',
    priceFrom: 18,
    priceNote: 'Per person; barn 3–12 år billigare; småbarn under 3 gratis',
    openingHours: 'Året runt, kl. 9–17',
    bestTime: 'Morgon när djuren är som mest aktiva',
    insiderTip: 'Stäng fönstren under bilsafarin – strutsarna är nyfikna och sticker in huvudet; ta bilder genom glaset',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/SafariparkSaComa4.JPG/960px-SafariparkSaComa4.JPG',
    imageAlt: 'Elefanter i skuggan under ett tak i Safari Zoo i Sa Coma',
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
    shortDescription: 'Mallorcas största trampolinpark med dodgeball, hinderbana och skumgrop.',
    longDescription: 'Palma Jump är 2 500 m² trampoliner där barn och vuxna kan hoppa fritt, spela dodgeball i trampolinburar, testa hinderbanan och hoppa ner i skumgropen. Det finns eget småbarnsområde för 3–5-åringar så alla åldrar kan vara där samtidigt. Föräldrar kan antingen hoppa själva eller sitta i kaféet.',
    priceFrom: 12,
    priceNote: 'Per timme; rabatter vid 2+ timmar',
    openingHours: 'Dagligen kl. 10–22',
    bestTime: 'Vardagar eller tidig morgon – på helgerna är det fullt',
    insiderTip: 'Boka online – populärt och platserna tar slut särskilt på helger; ta med halkstrumpor eller köp på plats för 3 €',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Trampoline_Park.jpg/960px-Trampoline_Park.jpg',
    imageAlt: 'Skumgrop i en trampolinpark – genrebild, inte från Palma Jump',
    indoors: true,
    mapQuery: 'Palma Jump trampolinpark',
  },
  {
    slug: 'kids-republik',
    name: 'Kids Republik',
    categories: ['inomhus-och-regn'],
    location: 'Palma centrum',
    ageGroups: ['0-3', '4-7', '8-12'],
    shortDescription: 'Lekland inomhus i tre våningar med klätterställningar, hoppborg och kafé för föräldrar.',
    longDescription: 'Kids Republik är ett modernt lekland i centrala Palma uppdelat på tre våningar: småbarnsavdelning (0–3), mellanområde (4–7) och stort klätterland (8–12). Överst finns ett kafé för föräldrar med tv-skärmar som visar lekområdena. En bra reservplan mitt i Palma om det börjar regna.',
    priceFrom: 8,
    priceNote: 'Per barn; fri entré för föräldrar',
    openingHours: 'Dagligen kl. 10–21',
    bestTime: 'Eftermiddag på vardagar är lugnast',
    insiderTip: 'Tv-skärmarna på kaféplanet visar varje lekområde – perfekt för att koppla av med en kaffe medan barnen leker själva',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kletterlabyrinth_Indoorplayground.jpg/960px-Kletterlabyrinth_Indoorplayground.jpg',
    imageAlt: 'Klätterlabyrint i ett inomhuslekland – genrebild, inte från Kids Republik',
    indoors: true,
    mapQuery: 'Kids Republik Palma Mallorca',
  },
  {
    slug: 'caixaforum-palma',
    name: 'CaixaForum Palma',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Plaça Weyler, Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Kulturcentrum i ett modernistiskt palats med växlande utställningar och familjeaktiviteter.',
    longDescription: 'CaixaForum Palma ligger i en av stadens vackraste modernistiska byggnader, det tidigare Gran Hotel. Här finns växlande utställningar och återkommande aktiviteter för barn och familjer. Själva byggnaden är en sevärdhet.',
    priceNote: 'Vissa utställningar kostar entré – se programmet',
    openingHours: 'Dagligen 10–20, även helgdagar',
    bestTime: 'Helgförmiddagar när familjeaktiviteterna brukar ligga',
    insiderTip: 'Kolla programmet i förväg – familjeaktiviteterna är populära och kan kräva bokning',
    website: 'https://caixaforum.org/es/palma',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/098_CaixaForum_Palma%2C_antic_Grand_Hotel%2C_pl._Weyler_3_%28Palma%29.jpg/960px-098_CaixaForum_Palma%2C_antic_Grand_Hotel%2C_pl._Weyler_3_%28Palma%29.jpg',
    imageAlt: 'Den modernistiska fasaden på CaixaForum Palma, det gamla Grand Hotel',
    indoors: true,
    mapQuery: 'CaixaForum Palma Mallorca',
  },
  {
    slug: 'bowling-festival-park',
    name: 'Bowling Festival Park',
    categories: ['inomhus-och-regn', 'aktivitet-och-rorelse'],
    location: 'Festival Park, Marratxí (15 min från Palma)',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Modern bowlinghall med 24 banor och spelautomater – en klassisk räddning en regnig dag.',
    longDescription: 'Bowling Festival Park är det enklaste bowlingstället att ta sig till från Palma – den ligger i ett stort köpcentrum med parkering, restauranger och bio i samma byggnad. 24 banor, banor med kantskydd för små barn och spelautomater för väntetiden. En bra reservplan om regnet kommer plötsligt.',
    priceFrom: 8,
    priceNote: 'Per bana och timme; skohyra ingår',
    openingHours: 'Dagligen kl. 12–24',
    bestTime: 'Eftermiddag på vardagar – på kvällarna är det fullbokat',
    insiderTip: 'Boka bana online – populärt kvällstid, särskilt på regniga dagar då alla tänker samma tanke',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bowling_pins_in_Weymouth.jpg/960px-Bowling_pins_in_Weymouth.jpg',
    imageAlt: 'Bowlingbanor med käglor – genrebild, inte från Festival Park',
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
    longDescription: 'Sherwood Park är ett småbarnsfokuserat lekland på promenadavstånd från Palmas centrum. Här finns mjuka lekområden, hoppborg, lekslott med rutschkanor och ett enkelt kafé. Storleken gör det lagom för småbarnsföräldrar – inte så stort att du tappar barnet ur sikte, inte så litet att de tröttnar på 15 minuter.',
    priceFrom: 7,
    openingHours: 'Dagligen kl. 10–20',
    bestTime: 'Vardagar är lugnast',
    insiderTip: 'Perfekt för 2–5-åringar; känns hanterbart även för föräldrar med ensamansvar för flera barn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kletterlabyrinth_Indoorplayground.jpg/960px-Kletterlabyrinth_Indoorplayground.jpg',
    imageAlt: 'Klätterlabyrint i ett inomhuslekland – genrebild, inte från Sherwood Park',
    indoors: true,
    mapQuery: 'Sherwood Park Palma Mallorca',
  },
  {
    slug: 'rafa-nadal-museum-xperience',
    name: 'Rafa Nadal Museum Xperience',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Manacor',
    ageGroups: ['8-12', '13+'],
    shortDescription: 'Interaktivt sportmuseum med Nadals troféer och stationer där barnen själva får prova.',
    longDescription: 'Rafa Nadal Museum Xperience ligger intill Nadals tennisakademi i Manacor. Här blandas troféer och personliga föremål med interaktiva stationer där ni kan testa olika sporter. Populärt även hos barn som inte är särskilt tennisintresserade.',
    priceNote: 'Ca 25 € vuxna och ca 12,50 € barn (2026); de yngsta går in gratis – åldersgränsen står på webbplatsen',
    openingHours: 'Öppet dagligen från kl. 10, kortare tider vintertid',
    bestTime: 'Efter lunch när bussgrupperna är mellan Palma och öns östkust',
    insiderTip: 'Kombinera med en grotta i Porto Cristo samma dag – Coves del Drac och Coves dels Hams ligger en kort bilresa bort och fungerar även när det regnar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tennis_Racquets_and_Balls_on_a_Clay_Court.jpg/960px-Tennis_Racquets_and_Balls_on_a_Clay_Court.jpg',
    imageAlt: 'Tennisracket och bollar på en grusbana – genrebild',
    indoors: true,
    mapQuery: 'Rafa Nadal Museum Manacor',
  },
  {
    slug: 'es-baluard',
    name: 'Es Baluard',
    categories: ['inomhus-och-regn', 'museer-och-kultur'],
    location: 'Plaça de la Porta Santa Catalina, Palma',
    ageGroups: ['4-7', '8-12'],
    shortDescription: 'Museum för modern och samtida konst i ett gammalt försvarsverk vid hamnen.',
    longDescription: 'Es Baluard är Palmas museum för modern och samtida konst, byggt in i en del av den gamla stadsmuren med utsikt över hamnen. Museet ordnar återkommande aktiviteter för barn och familjer – se programmet på webbplatsen.',
    priceNote: 'Ca 6 € vuxna, barn under 12 år gratis (museets prislista 2025)',
    openingHours: 'Tis–lör 10–20, sön 10–15, måndag stängt',
    bestTime: 'Förmiddag, innan det blir varmt på murarna',
    insiderTip: 'Barnaktiviteterna hålls oftast på katalanska eller spanska, men bildspråket är universellt – barnen hänger med ändå',
    website: 'https://esbaluard.org',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Es_Baluard_Palma.jpg/960px-Es_Baluard_Palma.jpg',
    imageAlt: 'Gården vid Es Baluard med palmer och de gamla bastionsmurarna',
    indoors: true,
    mapQuery: 'Es Baluard Palma Mallorca',
  },
  // ========== GROTTOR ==========
  {
    slug: 'coves-del-drac',
    name: 'Coves del Drac',
    categories: ['grottor', 'inomhus-och-regn'],
    location: 'Porto Cristo, östkusten',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Mallorcas mest kända droppstensgrottor – visningen slutar med livemusik vid en underjordisk sjö.',
    longDescription: 'Coves del Drac är öns mest besökta grottor. Visningen går till fots genom salar med droppstenar och slutar vid den underjordiska sjön Llac Martel, där det spelas klassisk musik live. Efter konserten kan ni korsa sjön med båt eller gå runt. Räkna med en dryg timme under jord – det är svalt året runt.',
    priceNote: 'Ca 18 € vuxna och ca 11 € barn (onlinepris 2026); de minsta går in gratis',
    openingHours: 'Året runt utom 25 december och 1 januari; visningar på fasta tider',
    bestTime: 'Boka tid online – då väljer ni visning och slipper kön till kassan',
    insiderTip: 'Entrén ligger en bit från parkeringen – var på plats en kvart före visningen och ta med en tunn tröja till barnen',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Coves_del_Drac_21.jpg/1920px-Coves_del_Drac_21.jpg',
    imageAlt: 'Droppstenar som speglas i den underjordiska sjön i Coves del Drac',
    indoors: true,
    website: 'https://www.cuevasdeldrach.com',
    mapQuery: 'Coves del Drac Porto Cristo',
  },
  {
    slug: 'coves-dels-hams',
    name: 'Coves dels Hams',
    categories: ['grottor', 'inomhus-och-regn'],
    location: 'Vägen Manacor–Porto Cristo',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Grottor med tunna, krokformade droppstenar – strax utanför Porto Cristo.',
    longDescription: 'Coves dels Hams har fått sitt namn av de tunna droppstenarna som liknar fiskekrokar (hams på katalanska). Visningen tar lite drygt en timme och är lagom lång för barn som inte orkar hur länge som helst. Temperaturen under jord ligger runt 20 °C.',
    priceNote: 'Ca 16–19 € vuxna och ca 10–13 € barn 3–12 år beroende på biljett (2026); under 3 år gratis',
    openingHours: 'Året runt utom 25 december och 1 januari; tiderna varierar med säsongen',
    bestTime: 'Förmiddag, innan dagsutflykterna från kustorterna kommer',
    insiderTip: 'Hams och Drac ligger nära varandra – välj en grotta per dag så orkar de minsta hela visningen',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cuevas_del_Hams_-_Tropfsteinh%C3%B6hlen_in_Porto_Cristo_%2810574042043%29.jpg/960px-Cuevas_del_Hams_-_Tropfsteinh%C3%B6hlen_in_Porto_Cristo_%2810574042043%29.jpg',
    imageAlt: 'Upplysta droppstenar i Coves dels Hams',
    indoors: true,
    website: 'https://www.cuevasdelshams.com',
    mapQuery: 'Coves dels Hams Porto Cristo',
  },
  {
    slug: 'coves-d-arta',
    name: "Coves d'Artà",
    categories: ['grottor', 'inomhus-och-regn'],
    location: 'Canyamel, Capdepera',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Stora, höga grottsalar inne i klippan vid Canyamel på nordöstra kusten.',
    longDescription: "Coves d'Artà ligger i klippan vid Canyamel. Salarna är höga och dramatiska och passar lite större barn som tycker om pampiga miljöer. Ett bra alternativ en mulen dag om ni bor kring Cala Rajada eller Canyamel.",
    openingHours: 'Nov–apr 10–17, maj–okt 10–18; stängt 25 december och 1 januari',
    bestTime: 'Tidig förmiddag eller sen eftermiddag',
    insiderTip: 'Kombinera med ett dopp på stranden i Canyamel en kort bit bort',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Coves_d%27Art%C3%A0_41.jpg/960px-Coves_d%27Art%C3%A0_41.jpg',
    imageAlt: 'Stor upplyst droppstensformation i Coves d\'Artà',
    indoors: true,
    website: 'https://www.cuevasdearta.com',
    mapQuery: "Coves d'Artà Canyamel",
  },
  {
    slug: 'coves-de-campanet',
    name: 'Coves de Campanet',
    categories: ['grottor', 'inomhus-och-regn'],
    location: 'Campanet, norra Mallorca',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Mindre och lugnare grottor i norr – närmast om ni bor kring Alcúdia eller Pollença.',
    longDescription: 'Coves de Campanet ligger i inlandet på norra Mallorca och är mindre kända än grottorna på östkusten. Det gör besöket lugnare, och visningen är lagom lång för barnfamiljer. Gratis parkering finns vid entrén.',
    priceNote: 'Ca 17 € vuxna och ca 9 € barn (2026); barn 0–3 år gratis',
    openingHours: 'Dagligen 10–17',
    bestTime: 'Passar bra en dag när det blåser eller regnar vid kusten',
    insiderTip: 'Bor ni i norr slipper ni den långa bilresan till Porto Cristo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Coves_de_Campanet_2024_3.jpg/960px-Coves_de_Campanet_2024_3.jpg',
    imageAlt: 'Tätt med stalaktiter och droppstenar i Coves de Campanet',
    indoors: true,
    website: 'https://www.covesdecampanet.com',
    mapQuery: 'Coves de Campanet',
  },
  // ========== ÄVENTYRSPARKER ==========
  {
    slug: 'jungle-parc-santa-ponca',
    name: 'Jungle Parc',
    categories: ['aventyrsparker'],
    location: 'Santa Ponça, Calvià',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Klätterbanor och linbanor i tallskogen – med en egen bana för barn från 4 år.',
    longDescription: 'Jungle Parc har flera banor bland träden. Juniorbanan är gjord för barn mellan 4 och 12 år som är minst 105 cm långa, familjebanan kräver ungefär 135 cm, och för tonåringar och vuxna finns svårare banor. Alla bär sele och är säkrade hela vägen.',
    priceNote: 'Pris per bana – se webbplatsen',
    openingHours: 'Säsongsöppet från våren; tisdag–söndag, måndag stängt',
    bestTime: 'Förmiddag, innan det blir för varmt',
    insiderTip: 'Mät barnen innan ni åker – längdgränsen avgör vilken bana de får gå',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zip_Line_Canopy_Tour_Costa_Rica.jpg/1920px-Zip_Line_Canopy_Tour_Costa_Rica.jpg',
    imageAlt: 'Linbana mellan trädtopparna – genrebild, inte från Jungle Parc',
    indoors: false,
    website: 'https://www.jungleparc.es',
    mapQuery: 'Jungle Parc Santa Ponsa Mallorca',
  },
  {
    slug: 'tirolinas-go-mallorca',
    name: 'Tirolinas Go Mallorca (tidigare Forestal Park)',
    categories: ['aventyrsparker'],
    location: 'Palma, nära Platja de Palma',
    ageGroups: ['4-7', '8-12', '13+'],
    shortDescription: 'Äventyrspark i trädtopparna med flera banor och långa linbanor, nära Palma.',
    longDescription: 'Parken som länge hette Forestal Park heter nu Tirolinas Go Mallorca. Här finns ett tiotal banor med hinder på olika höjd, och några av linbanorna är över 200 meter långa. Familjebanorna kräver att barnen är minst 110 cm, den svåraste minst 145 cm.',
    priceNote: 'Ca 25–30 € per person beroende på bana (2026)',
    bestTime: 'Förmiddag; kontrollera öppetdagarna före besöket – de varierar med säsongen',
    insiderTip: 'Bra alternativ om ni bor i Palma eller vid Platja de Palma och vill ha en aktiv dag utan lång bilresa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zip_Line_Canopy_Tour_Costa_Rica.jpg/1920px-Zip_Line_Canopy_Tour_Costa_Rica.jpg',
    imageAlt: 'Linbana mellan trädtopparna – genrebild, inte från Tirolinas Go',
    indoors: false,
    mapQuery: 'Tirolinas Go Mallorca Forestal Park',
  },
  // ========== MUSEER & KULTUR ==========
  {
    slug: 'castell-de-bellver',
    name: 'Castell de Bellver',
    categories: ['museer-och-kultur'],
    location: 'Palma, i Bellverskogen väster om centrum',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Ett runt slott från 1300-talet med vallgrav, torn och utsikt över hela Palmabukten.',
    longDescription: 'Bellver är ett av få runda slott i Europa och byggdes i början av 1300-talet. Barnen kan gå runt på taket, titta ner i vallgraven och spana ut över Palma och bukten. I slottet finns Palmas stadshistoriska museum.',
    priceFrom: 4,
    priceNote: 'Vuxna 4 €, barn under 14 år gratis; söndagar gratis för alla (2026)',
    openingHours: 'Tis–lör 10–19 (apr–sep) och 10–18 (okt–mar), sön och helgdagar 10–15, måndag stängt',
    bestTime: 'Söndag förmiddag – gratis entré',
    insiderTip: 'Vägen upp går genom tallskogen – med små barn är det skönt att ta bil eller taxi upp och promenera ner',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/035_2015_06_02_Castell_de_Bellver.jpg/1920px-035_2015_06_02_Castell_de_Bellver.jpg',
    imageAlt: 'Den runda borggården med arkader i Castell de Bellver',
    indoors: false,
    website: 'https://castelldebellver.palma.es',
    mapQuery: 'Castell de Bellver Palma',
  },
  // ========== NATUR & UTOMHUS ==========
  {
    slug: 'tren-de-soller',
    name: 'Tåget till Sóller',
    categories: ['natur-och-utomhus', 'tag-och-bat'],
    location: 'Från Plaça d’Espanya i Palma till Sóller',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Gamla trävagnar genom Serra de Tramuntana – och spårvagn ner till hamnen i Port de Sóller.',
    longDescription: 'Ferrocarril de Sóller går från Palma genom bergen till Sóller på ungefär en timme, med tunnlar och utsikt på vägen. I Sóller byter ni till den gamla spårvagnen ner till Port de Sóller. För många barn är själva resan dagens höjdpunkt.',
    priceNote: 'Ca 30 € tur och retur för vuxen, ca 40 € med spårvagnen (2026)',
    openingHours: 'Trafikerar större delen av året; uppehåll en period vintertid för underhåll',
    bestTime: 'Första avgången på morgonen – senare blir tågen fulla under högsäsong',
    insiderTip: 'Åk tåget ena vägen och bussen tillbaka – se våra dagsturer utan bil',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/S%C3%B3ller_train_station_15.jpg/1920px-S%C3%B3ller_train_station_15.jpg',
    imageAlt: 'Det gamla trätåget till Sóller vid stationen i Sóller',
    indoors: false,
    website: 'https://www.trendesoller.com',
    mapQuery: 'Ferrocarril de Sóller Palma',
  },
  {
    slug: 's-albufera',
    name: "Parc Natural de s'Albufera",
    categories: ['natur-och-utomhus'],
    location: "Muro, nära Port d'Alcúdia",
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Mallorcas största våtmark – platta stigar, fågeltorn och gratis entré.',
    longDescription: "S'Albufera är en naturpark med kanaler, vass och gott om fåglar. Stigarna är platta och fungerar bra för små ben, och från fågeltornen kan barnen spana efter hägrar och änder. Entrén är gratis, men alla besökare behöver ett tillstånd som ni får i receptionen vid Sa Roca.",
    priceNote: 'Gratis; tillstånd hämtas i receptionen',
    openingHours: 'Receptionen vid Sa Roca 9–16 året runt (utom jul och nyår)',
    bestTime: 'Tidig morgon – svalare och mest liv bland fåglarna',
    insiderTip: 'Fråga i receptionen om ni kan låna kikare – de finns i begränsat antal',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Parc_natural_de_s%E2%80%99Albufera_de_Mallorca_10.jpg/960px-Parc_natural_de_s%E2%80%99Albufera_de_Mallorca_10.jpg',
    imageAlt: 'Stig genom vass och våtmark i Parc Natural de s\'Albufera',
    indoors: false,
    website: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_se_albufera_de_mallorca/',
    mapQuery: "Parc Natural s'Albufera de Mallorca Sa Roca",
  },
  {
    slug: 'parc-natural-de-mondrago',
    name: 'Parc Natural de Mondragó',
    categories: ['natur-och-utomhus'],
    location: 'Mellan Portopetro och Santanyí, sydöstra kusten',
    ageGroups: ['0-3', '4-7', '8-12', '13+'],
    shortDescription: 'Naturpark med skyddade vikar, korta skyltade stigar och picknickplats.',
    longDescription: "Mondragó är en naturpark kring vikarna Cala Mondragó och s'Amarador. Här finns fem skyltade promenadslingor, och stränderna har grunt, lugnt vatten. Barnvagn går bra till stränderna och picknickplatsen men inte på stigarna.",
    priceNote: 'Gratis entré; parkeringen kan vara avgiftsbelagd',
    openingHours: 'Informationscentret vid parkeringen ses Fonts de n’Alis 9–16 dagligen',
    bestTime: 'Kom före lunch – parkeringen blir full mitt på dagen under sommaren',
    insiderTip: 'Fråga i informationscentret vilken slinga som passar era barn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cala_Mondrag%C3%B3_03.jpg/960px-Cala_Mondrag%C3%B3_03.jpg',
    imageAlt: 'Turkost vatten och förankrade båtar i Cala Mondragó',
    indoors: false,
    website: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_mondrago/',
    mapQuery: 'Parc Natural de Mondrago',
  },
];

/** Datum då uppgifterna i de nya kategorierna kontrollerades (3.7/3.9). */
export const BARN_CHECKED = '2026-11-18';

/** Källor per kategori – visas längst ner på kategorisidorna via LastChecked. */
export const BARN_SOURCES: Partial<Record<Category, { label: string; href: string }[]>> = {
  grottor: [
    { label: 'Coves del Drac', href: 'https://www.cuevasdeldrach.com' },
    { label: 'Coves dels Hams', href: 'https://www.cuevasdelshams.com' },
    { label: "Coves d'Artà", href: 'https://www.cuevasdearta.com' },
    { label: 'Coves de Campanet', href: 'https://www.covesdecampanet.com' },
  ],
  aventyrsparker: [
    { label: 'Jungle Parc', href: 'https://www.jungleparc.es' },
    { label: 'Tirolinas Go Mallorca (Mallorca.com)', href: 'https://www.mallorca.com/es/directorio/empresa/tirolinasgo-mallorca-forestal-park-palma' },
  ],
  'museer-och-kultur': [
    { label: 'Castell de Bellver (Ajuntament de Palma)', href: 'https://castelldebellver.palma.es' },
    { label: 'Es Baluard Museu', href: 'https://esbaluard.org' },
    { label: 'CaixaForum Palma', href: 'https://caixaforum.org/es/palma' },
  ],
  'natur-och-utomhus': [
    { label: "Parc Natural de s'Albufera (Govern de les Illes Balears)", href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_se_albufera_de_mallorca/' },
    { label: 'Parc Natural de Mondragó (Govern de les Illes Balears)', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_mondrago/' },
    { label: 'Ferrocarril de Sóller', href: 'https://www.trendesoller.com' },
  ],
};

// ============================================================
// HELPERS
// ============================================================

export function getActivitiesByCategory(category: Category): Activity[] {
  return ACTIVITIES.filter((a) => a.categories.includes(category));
}

export function getCategoryMeta(slug: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
