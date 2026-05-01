import { IconCalendar, IconPin } from '@/components/Icons';

export type Evenemang = {
  namn: string;
  datum: string;
  plats: string;
  kategori: string;
  beskrivning: string;
  länk: string;
  bild: string;
  /** ISO YYYY-MM-DD. Optional — recurring/seasonal events without a hard end date omit this. */
  startDate?: string;
  /** ISO YYYY-MM-DD. When set, isUpcoming filters out the event after this date. */
  endDate?: string;
  /** Promoted to the top of the homepage event grid and given a "HISTORISKT"-ribbon. */
  featured?: boolean;
};

/**
 * Filters out events whose endDate has already passed. Events without an
 * endDate (recurring markets, year-round attractions, season passes without
 * a fixed close) are treated as always upcoming.
 */
export function isUpcoming(e: Evenemang, now: Date = new Date()): boolean {
  if (!e.endDate) return true;
  const today = now.toISOString().slice(0, 10);
  return e.endDate >= today;
}

/** Sorts upcoming events ascending by startDate. Events without startDate sink to the end. */
function byStartDate(a: Evenemang, b: Evenemang): number {
  if (a.startDate && b.startDate) return a.startDate.localeCompare(b.startDate);
  if (a.startDate) return -1;
  if (b.startDate) return 1;
  return 0;
}

export const evenemang: Evenemang[] = [
  // ============ FEATURED ============
  { namn: 'Total solförmörkelse över Mallorca', datum: '12 augusti 2026', plats: 'Hela Mallorca – bäst längs Tramuntana-kusten', kategori: 'Kultur', beskrivning: 'Den första totala solförmörkelsen synlig från Spanien sedan 1905 – totalitet i 1 minut 36 sekunder vid solnedgång. Mallorca ligger nästan exakt på centrumlinjen och blir en av Europas bästa observationspunkter.', länk: 'https://www.timeanddate.com/eclipse/in/spain/palma?iso=20260812', bild: 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=600&q=80', startDate: '2026-08-12', endDate: '2026-08-12', featured: true },

  // ============ SPORT ============
  { namn: 'Ironman 70.3 Mallorca', datum: '10 maj 2026', plats: 'Alcúdia', kategori: 'Sport', beskrivning: 'Ett av världens hårdaste triathlon – 1,9 km simning, 90 km cykling och 21 km löpning', länk: 'https://www.google.com/search?q=Ironman+70.3+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', startDate: '2026-05-10', endDate: '2026-05-10' },
  { namn: 'PalmaVela Regatta', datum: '1–3 maj 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Internationell segelregatta med tävlande från hela världen i Palmas vackra bukt', länk: 'https://www.google.com/search?q=PalmaVela+Regatta+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', startDate: '2026-05-01', endDate: '2026-05-03' },
  { namn: 'Mallorca Olympic Triathlon', datum: '24 maj 2026', plats: 'Colònia Sant Jordi', kategori: 'Sport', beskrivning: 'Olympisk distans längs Mallorcas vackraste sydkust – öppen för alla nivåer', länk: 'https://www.google.com/search?q=Mallorca+Olympic+Triathlon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80', startDate: '2026-05-24', endDate: '2026-05-24' },
  { namn: 'Copa del Rey Segelregatta', datum: '1–8 augusti 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Kunglig segelregatta – en av Europas mest prestigefyllda och äldsta kappseglingar', länk: 'https://www.google.com/search?q=Copa+del+Rey+Segelregatta+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', startDate: '2026-08-01', endDate: '2026-08-08' },
  { namn: 'Magaluf Half Marathon', datum: 'Oktober 2026', plats: 'Magaluf', kategori: 'Sport', beskrivning: 'Populärt halvmaraton längs Mallorcas sydvästra kust med havsutsikt hela vägen', länk: 'https://www.google.com/search?q=Magaluf+Half+Marathon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Palma Marathon', datum: 'Oktober 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Maratonlopp genom Palmas historiska gator och längs strandpromenaden', länk: 'https://www.google.com/search?q=Palma+Marathon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Palma Boat Show', datum: 'November 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Höstens stora båtmässa med lyxbåtar och marinautrustning', länk: 'https://www.google.com/search?q=Palma+Boat+Show+2026', bild: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80', startDate: '2026-11-01', endDate: '2026-11-30' },
  { namn: 'Mallorca Cycling Challenge', datum: 'September 2026', plats: 'Serra de Tramuntana', kategori: 'Sport', beskrivning: 'Cykelutmaning i Tramuntana-bergen längs UNESCO-världsarvsleden', länk: 'https://www.google.com/search?q=Mallorca+cycling+challenge+2026', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', startDate: '2026-09-01', endDate: '2026-09-30' },

  // ============ MUSIK ============
  { namn: 'Mallorca Live Festival 2026', datum: '12–14 juni 2026', plats: 'Antiguo Aquapark, Calvià (Magaluf)', kategori: 'Musik', beskrivning: 'Mallorcas största musikfestival – tre dagar med David Guetta som headliner och fem scener.', länk: 'https://mallorcalivefestival.com', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', startDate: '2026-06-12', endDate: '2026-06-14' },
  { namn: 'Festival de Pollença – 64:e upplagan', datum: '15 juli – 15 augusti 2026', plats: 'Santo Domingo Cloister, Pollença', kategori: 'Musik', beskrivning: 'En av Mallorcas mest prestigefulla klassiska musikfestivaler – konserter i en 1600-tals klosterbyggnad med exceptionell akustik.', länk: 'https://www.google.com/search?q=Festival+de+Pollenca+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80', startDate: '2026-07-15', endDate: '2026-08-15' },
  { namn: 'Danzû Festival', datum: 'Augusti 2026', plats: 'Magaluf', kategori: 'Musik', beskrivning: 'Elektronisk musikfestival med världsstjärnor som Carl Cox och Richie Hawtin', länk: 'https://www.google.com/search?q=Danzu+Festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', startDate: '2026-08-01', endDate: '2026-08-31' },
  { namn: 'Klassisk musik i Son Marroig', datum: 'Juni–september 2026', plats: 'Deià', kategori: 'Musik', beskrivning: 'Högtidliga klassiska konserter i det vackra palatset Son Marroig med havsutsikt', länk: 'https://www.google.com/search?q=Son+Marroig+konserter+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80', startDate: '2026-06-01', endDate: '2026-09-30' },
  { namn: 'Jazz Festival Pollença', datum: 'Juli–augusti 2026', plats: 'Pollença', kategori: 'Musik', beskrivning: 'Internationell jazzfestival i Pollença gamla stan med världkända artister', länk: 'https://www.google.com/search?q=Jazz+Festival+Pollenca+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', startDate: '2026-07-01', endDate: '2026-08-31' },
  { namn: 'Nacht des Ballermanns', datum: 'Juli 2026', plats: 'Playa de Palma', kategori: 'Musik', beskrivning: 'Ballermanns stora sommarnatt med musik, dans och festligheter', länk: 'https://www.google.com/search?q=Ballermann+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', startDate: '2026-07-01', endDate: '2026-07-31' },
  { namn: 'Festival de Música de Sóller', datum: 'Juli 2026', plats: 'Sóller', kategori: 'Musik', beskrivning: 'Intim musikfestival i apelsinlundarnas stad med klassiska och moderna verk', länk: 'https://www.google.com/search?q=Festival+Musica+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80', startDate: '2026-07-01', endDate: '2026-07-31' },
  { namn: 'Open Air Konserter Palma', datum: 'Sommaren 2026', plats: 'Palma', kategori: 'Musik', beskrivning: 'Utomhuskonserter på Palmas torg och platser med spansk och internationell musik', länk: 'https://www.google.com/search?q=konserter+Palma+Mallorca+sommar+2026', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', startDate: '2026-06-01', endDate: '2026-09-30' },
  { namn: 'Electrobeach Festival', datum: 'Juli 2026', plats: 'Port d\'Alcúdia', kategori: 'Musik', beskrivning: 'Elektronisk strandmusikfestival med DJs och artister på Alcúdias strand', länk: 'https://www.google.com/search?q=Electrobeach+Festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', startDate: '2026-07-01', endDate: '2026-07-31' },
  { namn: 'Festival Música Clàssica Alcúdia', datum: 'Augusti 2026', plats: 'Alcúdia', kategori: 'Musik', beskrivning: 'Klassisk musikfestival i Alcúdias medeltida amfiteater – en unik upplevelse', länk: 'https://www.google.com/search?q=Festival+Musica+Classica+Alcudia+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80', startDate: '2026-08-01', endDate: '2026-08-31' },
  { namn: 'Julkonserter i La Seu', datum: 'December 2026', plats: 'Palma', kategori: 'Musik', beskrivning: 'Stämningsfulla julkonserter i Palmas magnifika katedral La Seu', länk: 'https://www.google.com/search?q=julkonsert+La+Seu+Palma+2026', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80', startDate: '2026-12-01', endDate: '2026-12-31' },

  // ============ KULTUR ============
  { namn: 'Festa de la Patrona – Moros i Cristians', datum: '2 augusti 2026', plats: 'Pollença', kategori: 'Kultur', beskrivning: 'Pollenças mest spektakulära festival – återuppförande av det historiska piratangreppet 1561 med hundratals deltagare i tidstypiska kostymer.', länk: 'https://www.google.com/search?q=Festa+Patrona+Pollenca+Moros+Cristians+2026', bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85', startDate: '2026-08-02', endDate: '2026-08-02' },
  { namn: 'Firó – Moros y Cristianos', datum: '11 maj 2026', plats: 'Sóller', kategori: 'Kultur', beskrivning: 'Spektakulär historisk strid mellan morer och kristna som återuppförs på gatorna i Sóller', länk: 'https://www.google.com/search?q=Firo+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85', startDate: '2026-05-11', endDate: '2026-05-11' },
  { namn: 'Nit de Foc – Johannesnatten', datum: '23 juni 2026', plats: 'Hela ön', kategori: 'Kultur', beskrivning: 'Johannes-natten firas med eldshower, fyrverkerier och festligheter på stränder och torg', länk: 'https://www.google.com/search?q=Nit+de+Foc+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', startDate: '2026-06-23', endDate: '2026-06-23' },
  { namn: 'Festa de Sant Jaume', datum: '25 juli 2026', plats: 'Alcúdia', kategori: 'Kultur', beskrivning: 'Alcúdias stora sommarfestival med konserter, eldshower och historiska uppträdanden', länk: 'https://www.google.com/search?q=Festa+Sant+Jaume+Alcudia+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', startDate: '2026-07-25', endDate: '2026-07-25' },
  { namn: 'Art Palma Brunch', datum: 'Hösten 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Internationell konstmässa i Palma med gallerier och konstnärer från hela Europa', länk: 'https://www.google.com/search?q=Art+Palma+Brunch+2026', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', startDate: '2026-09-01', endDate: '2026-11-30' },
  { namn: 'La Gran Verbena', datum: 'Augusti 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Sommarens största folkfest med spansk musik, dans och mat under bar himmel', länk: 'https://www.google.com/search?q=Gran+Verbena+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', startDate: '2026-08-01', endDate: '2026-08-31' },
  { namn: 'Fira del Ram – Nöjesfält', datum: 'April–maj 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Mallorcas traditionella nöjesfält med karuseller och folklig festivalstämning', länk: 'https://www.google.com/search?q=Fira+del+Ram+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', startDate: '2026-03-27', endDate: '2026-05-17' },
  { namn: 'Oktoberfest Mallorca', datum: 'Oktober 2026', plats: 'Santa Ponça & Palma', kategori: 'Kultur', beskrivning: 'Bayerskt öl, pretzel och Wiesn-stämning under Mallorcas solsken', länk: 'https://www.google.com/search?q=Oktoberfest+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Julmarknad Palma', datum: 'December 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Stämningsfull julmarknad på Plaza Mayor med hantverk, julbak och glögg', länk: 'https://www.google.com/search?q=julmarknad+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80', startDate: '2026-12-01', endDate: '2026-12-31' },
  { namn: 'Revetla de Sant Antoni', datum: '17 januari 2027', plats: 'Sa Pobla', kategori: 'Kultur', beskrivning: 'Mallorcas mest spektakulära eldsfestival med demoner, lägereld och djurvälsignelser', länk: 'https://www.google.com/search?q=Sant+Antoni+Festival+Mallorca+2027', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', startDate: '2027-01-16', endDate: '2027-01-17' },

  // ============ MAT & DRYCK ============
  { namn: 'Gastrofestival Palma', datum: 'Maj 2026', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Veckolång matfestival med pop-up-restauranger, kockdueller och smakprovningar', länk: 'https://www.google.com/search?q=Gastrofestival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', startDate: '2026-05-01', endDate: '2026-05-31' },
  { namn: 'Tapas & Vinfestival Palma', datum: 'Juni 2026', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Palmas bästa tapas-restauranger samlas för en helg av smak, vin och gemenskap', länk: 'https://www.google.com/search?q=tapas+festival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', startDate: '2026-06-01', endDate: '2026-06-30' },
  { namn: 'Seafood & Paella Festival', datum: 'Augusti 2026', plats: 'Port d\'Alcúdia', kategori: 'Mat & Dryck', beskrivning: 'Havets bästa råvaror möter Mallorcas matkultur i en stämningsfull hamnfestival', länk: 'https://www.google.com/search?q=seafood+festival+Alcudia+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', startDate: '2026-08-01', endDate: '2026-08-31' },
  { namn: 'Ölmarknad Palma', datum: 'September 2026', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Hantverksröl från hela Spanien och lokala bryggerier samlas i Palma för en unik smakupplevelse', länk: 'https://www.google.com/search?q=beer+festival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', startDate: '2026-09-01', endDate: '2026-09-30' },
  { namn: 'Skördefest & Vinmarknad Binissalem', datum: 'Oktober 2026', plats: 'Binissalem', kategori: 'Mat & Dryck', beskrivning: 'Mallorcas vingårdar firar skörden med vinprovningar, musik och lokala delikatesser', länk: 'https://www.google.com/search?q=Binissalem+vinmarknad+2026', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Ensaimada-festival', datum: 'Oktober 2026', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Firande av Mallorcas mest ikoniska bakverk med provningar och bagartävlingar', länk: 'https://www.google.com/search?q=ensaimada+festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Sobrasada-festival', datum: 'Oktober 2026', plats: 'Felanitx', kategori: 'Mat & Dryck', beskrivning: 'Firande av Mallorcas ikoniska kryddkorv med provningar, tävlingar och hantverk', länk: 'https://www.google.com/search?q=sobrasada+festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Öppen Vingård – Portes Obertes', datum: 'Oktober 2026', plats: 'Binissalem & Pla', kategori: 'Mat & Dryck', beskrivning: 'Mallorcas vingårdar öppnar dörrarna för gratis provningar och guidade turer', länk: 'https://www.google.com/search?q=Portes+Obertes+vingard+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', startDate: '2026-10-01', endDate: '2026-10-31' },
  { namn: 'Olivoljemässa Sóller', datum: 'November 2026', plats: 'Sóller', kategori: 'Mat & Dryck', beskrivning: 'Sóllerdalen firar sin olivoljeskord med provningar, guidade turer och marknad', länk: 'https://www.google.com/search?q=olivolja+messa+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', startDate: '2026-11-01', endDate: '2026-11-30' },
  { namn: 'Mallorquinsk Matmarknad', datum: 'Varje lördag', plats: 'Santa Maria del Camí', kategori: 'Mat & Dryck', beskrivning: 'Öns bästa lokala matmarknad med ekologiska grönsaker, ostar, charkuterier och bröd', länk: 'https://www.google.com/search?q=matmarknad+Santa+Maria+del+Cami+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },

  // ============ MARKNAD ============
  { namn: 'Inca Lädermässa', datum: 'November 2026', plats: 'Inca', kategori: 'Marknad', beskrivning: 'Mallorcas berömda lädermässa med skor, väskor och läderprodukter till reapriser', länk: 'https://www.google.com/search?q=Inca+Ladermarknad+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80', startDate: '2026-11-01', endDate: '2026-11-30' },
  { namn: 'Julmarknad Palma (Marknad)', datum: 'December 2026', plats: 'Palma', kategori: 'Marknad', beskrivning: 'Stämningsfull julmarknad på Plaza Mayor med hantverk, juldekorationer och mallorquinska godsaker', länk: 'https://www.google.com/search?q=julmarknad+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80', startDate: '2026-12-01', endDate: '2026-12-31' },
  { namn: 'Hippiemarknaden Alcúdia Port', datum: 'Sommaren 2026', plats: 'Port d\'Alcúdia', kategori: 'Marknad', beskrivning: 'Färgglad kvällsmarknad med smycken, konst och handgjorda produkter vid strandpromenaden', länk: 'https://www.google.com/search?q=hippiemarknaden+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80', startDate: '2026-06-01', endDate: '2026-09-30' },
  { namn: 'Fira de Sineu – Onsdagsmarknad', datum: 'Varje onsdag', plats: 'Sineu', kategori: 'Marknad', beskrivning: 'Mallorcas äldsta och mest autentiska marknad sedan 1306 – levande djur, hantverk och mat', länk: 'https://www.google.com/search?q=Fira+de+Sineu+marknad', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Pollença Antikmarknad', datum: 'Varje söndag', plats: 'Pollença', kategori: 'Marknad', beskrivning: 'Charmig antikmarknad på Pollenças vackra torg med fynd, konst och hantverk', länk: 'https://www.google.com/search?q=antikmarknad+Pollenca+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Santanyi Onsdags- och Lördagsmarknad', datum: 'Varje onsdag & lördag', plats: 'Santanyi', kategori: 'Marknad', beskrivning: 'En av öns mysigaste marknader med lokala producenter, keramik och textilier', länk: 'https://www.google.com/search?q=marknad+Santanyi+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Artà Tisdagsmarknad', datum: 'Varje tisdag', plats: 'Artà', kategori: 'Marknad', beskrivning: 'Autentisk lokal marknad i den historiska byn Artà med färska råvaror och hantverk', länk: 'https://www.google.com/search?q=marknad+Arta+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Alcúdia Tisdags- och Söndagsmarknad', datum: 'Varje tisdag & söndag', plats: 'Alcúdia', kategori: 'Marknad', beskrivning: 'Stor och livlig marknad utanför Alcúdias murar med kläder, mat och souvenirer', länk: 'https://www.google.com/search?q=marknad+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Felanitx Söndagsmarknad', datum: 'Varje söndag', plats: 'Felanitx', kategori: 'Marknad', beskrivning: 'Stor och folkrik söndagsmarknad i inlandet med lokala livsmedel, kryddor och hantverk', länk: 'https://www.google.com/search?q=marknad+Felanitx+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Manacor Måndag-marknad', datum: 'Varje måndag', plats: 'Manacor', kategori: 'Marknad', beskrivning: 'Stor stadsmarknad i Mallorcas näst största stad – känd för pärlor, möbler och lokala råvaror', länk: 'https://www.google.com/search?q=marknad+Manacor+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },

  // ============ FAMILJ ============
  { namn: 'Aqualand El Arenal – Säsongsöppning', datum: 'Maj 2026', plats: 'El Arenal', kategori: 'Familj', beskrivning: 'Mallorcas populäraste vattenpark öppnar för sommarsäsongen med nya attraktioner', länk: 'https://www.aqualand.es', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', startDate: '2026-05-01', endDate: '2026-05-31' },
  { namn: 'Hidropark Alcúdia', datum: 'Juni–september 2026', plats: 'Alcúdia', kategori: 'Familj', beskrivning: 'Populär vattenpark norr om Alcúdia med vattenrutschkanor och barnpooler', länk: 'https://www.hidropark.com', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', startDate: '2026-06-01', endDate: '2026-09-30' },
  { namn: 'Marineland Mallorca', datum: 'Maj–oktober 2026', plats: 'Costa de Blanes', kategori: 'Familj', beskrivning: 'Delfinshow, pingviner och hajar – perfekt familjedag längs sydvästkusten', länk: 'https://www.marineland.es', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', startDate: '2026-05-01', endDate: '2026-10-31' },
  { namn: 'Coves del Drach – Sommarsäsong', datum: 'April–oktober 2026', plats: 'Porto Cristo', kategori: 'Familj', beskrivning: 'Dramatiska underjordiska grottor med konsert på världens största underjordiska sjö', länk: 'https://www.google.com/search?q=Coves+del+Drach+Mallorca', bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85', startDate: '2026-04-01', endDate: '2026-10-31' },
  { namn: 'Coves d\'Artà', datum: 'April–oktober 2026', plats: 'Capdepera', kategori: 'Familj', beskrivning: 'Dramatiska grottor med stalaktiter och stalagmiter nära Mallorcas nordliga udde', länk: 'https://www.google.com/search?q=Coves+Arta+Mallorca', bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85', startDate: '2026-04-01', endDate: '2026-10-31' },
  { namn: 'Safari Zoo Porto Cristo', datum: 'Hela sommaren 2026', plats: 'Porto Cristo', kategori: 'Familj', beskrivning: 'Mallorcas populäraste djurpark med giraffer, lejon, elefanter och kamelridning', länk: 'https://www.google.com/search?q=Safari+Zoo+Porto+Cristo+Mallorca', bild: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80', startDate: '2026-05-01', endDate: '2026-09-30' },
  { namn: 'Western Park Mallorca', datum: 'Sommaren 2026', plats: 'Magaluf', kategori: 'Familj', beskrivning: 'Vilda västern-tema med vattenrutschkanor, barnaktiviteter och western-shower', länk: 'https://www.westernpark.com', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', startDate: '2026-05-01', endDate: '2026-09-30' },
  { namn: 'Falconeria de Altair', datum: 'Hela sommaren 2026', plats: 'Cas Concos', kategori: 'Familj', beskrivning: 'Spektakulärt falkneri med örnar, falkar och ugglor – unikt för barn och vuxna', länk: 'https://www.google.com/search?q=Falconeria+de+Altair+Mallorca', bild: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80', startDate: '2026-05-01', endDate: '2026-09-30' },
  { namn: 'Palma Aquarium', datum: 'Hela året', plats: 'Palma', kategori: 'Familj', beskrivning: 'Ett av Europas mest imponerande akvarium med hajbassäng och tropiska rev', länk: 'https://www.palmaaquarium.com', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
];

/**
 * Picks the homepage event lineup: featured items first (in array order), then
 * upcoming events sorted ascending by startDate. Total cap of 6.
 */
function pickHomepageEvents(): Evenemang[] {
  const upcoming = evenemang.filter(e => isUpcoming(e));
  const featured = upcoming.filter(e => e.featured);
  const rest = upcoming.filter(e => !e.featured).sort(byStartDate);
  return [...featured, ...rest].slice(0, 6);
}

export default function SectionEvents() {
  const homepageEvents = pickHomepageEvents();
  return (
    <section id="kommande-evenemang" className="page-section" style={{ background: '#eeede4' }} aria-labelledby="kommande-evenemang-heading">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="events-header-grid">
          <div>
            <p className="section-label">På Mallorca</p>
            <h2 id="kommande-evenemang-heading" className="section-title" style={{ textTransform: 'uppercase' }}>Kommande evenemang</h2>
            <div className="section-divider" />
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.7', marginBottom: '28px' }}>Mallorca är värd till många evenemang under året – cykellopp, segelregattor, marknader och internationella sportevenemang.</p>
            <a href="/evenemang" className="btn-primary">
              SE ALLA EVENEMANG →
            </a>
          </div>
          <div className="events-grid">
            {homepageEvents.map((e, i) => (
              <article key={i} className="events-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: e.featured ? '0 4px 18px rgba(153,51,53,0.18)' : '0 2px 12px rgba(0,0,0,0.08)', border: e.featured ? '1px solid rgba(153,51,53,0.35)' : 'none' }}>
                <div style={{ position: 'relative' }}>
                  <img src={e.bild} alt={e.namn} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#993335', color: '#fefefb', padding: '3px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700' }}>
                    {e.kategori}
                  </div>
                  {e.featured && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#383a46', color: '#fefefb', padding: '3px 10px', borderRadius: '8px', fontSize: '0.66rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Historiskt
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 4px', display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                    <IconCalendar size={12} /> {e.datum} · <IconPin size={12} /> {e.plats}
                  </p>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.05rem', letterSpacing: '0.05em', margin: '0 0 6px', color: '#111', lineHeight: 1.2 }}>{e.namn}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.5', margin: '0 0 12px' }}>{e.beskrivning}</p>
                  <a href={e.länk} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '7px', background: '#993335', color: '#fefefb', borderRadius: '6px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>
                    Läs mer om {e.namn} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
