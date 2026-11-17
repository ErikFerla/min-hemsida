// Evenemangsdata för /evenemang och startsidans "Kommande evenemang".
//
// Varje post beskriver ett tillfälle med ISO-datum (start/slut, YYYY-MM-DD).
// - `återkommande` används för veckomarknader och sådant som är öppet hela året.
// - `nästaÅr` beskriver nästa tillfälle för årligen återkommande evenemang:
//     * med `start`/`slut`/`datum` när datumet är känt (t.ex. fasta helgdagar),
//     * annars med `brukar` + `månad` → visas som "datum ej fastställt".
//   Hitta aldrig på datum – lägg in riktiga datum här när arrangören har publicerat dem.
//
// Passerade tillfällen (slut < idag) flyttas automatiskt till arkivet på /evenemang.

export type Kategori = 'Sport' | 'Musik' | 'Kultur' | 'Mat & Dryck' | 'Marknad' | 'Familj';

type NästaÅr =
  | { start: string; slut: string; datum: string }
  | { år: number; brukar: string; månad: number };

type EvenemangPost = {
  id: string;
  namn: string;
  plats: string;
  kategori: Kategori;
  beskrivning: string;
  länk: string;
  bild: string;
  /** Visningstext för datumet, t.ex. "25 april 2026" eller "Varje onsdag". */
  datum: string;
  start?: string;
  slut?: string;
  återkommande?: 'veckovis' | 'helår';
  nästaÅr?: NästaÅr;
};

/** Ett visningsbart tillfälle – serialiserbart så att det kan skickas till klientkomponenter. */
export type Evenemang = {
  key: string;
  namn: string;
  plats: string;
  kategori: Kategori;
  beskrivning: string;
  länk: string;
  bild: string;
  datum: string;
  /** Sorteringsnyckel (ISO-datum eller motsvarande). */
  sortering: string;
  ejFastställt?: boolean;
  återkommande?: boolean;
};

const evenemangData: EvenemangPost[] = [
  // SPORT
  { id: 'mallorca-312', namn: 'Mallorca 312 Cykellopp', datum: '25 april 2026', start: '2026-04-25', slut: '2026-04-25', nästaÅr: { år: 2027, brukar: 'i slutet av april', månad: 4 }, plats: 'Palma – runt ön', kategori: 'Sport', beskrivning: 'Världens mest populära cykellopp med 10 000 deltagare på 312 km runt hela Mallorca', länk: 'https://www.mallorca312.com', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'ironman-703', namn: 'Ironman 70.3 Mallorca', datum: '10 maj 2026', start: '2026-05-10', slut: '2026-05-10', nästaÅr: { år: 2027, brukar: 'i maj', månad: 5 }, plats: 'Alcúdia', kategori: 'Sport', beskrivning: 'Ett av världens hårdaste triathlon – 1,9 km simning, 90 km cykling och 21 km löpning', länk: 'https://www.google.com/search?q=Ironman+70.3+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80' },
  { id: 'palmavela', namn: 'PalmaVela Regatta', datum: 'Maj 2026', start: '2026-05-01', slut: '2026-05-31', nästaÅr: { år: 2027, brukar: 'i maj', månad: 5 }, plats: 'Palma', kategori: 'Sport', beskrivning: 'Internationell segelregatta med tävlande från hela världen i Palmas vackra bukt', länk: 'https://www.google.com/search?q=PalmaVela+Regatta+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80' },
  { id: 'olympic-triathlon', namn: 'Mallorca Olympic Triathlon', datum: '24 maj 2026', start: '2026-05-24', slut: '2026-05-24', plats: 'Colònia de Sant Jordi', kategori: 'Sport', beskrivning: 'Olympisk distans längs Mallorcas vackraste sydkust – öppen för alla nivåer', länk: 'https://www.google.com/search?q=Mallorca+Olympic+Triathlon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { id: 'copa-del-rey', namn: 'Copa del Rey Segelregatta', datum: '1–8 augusti 2026', start: '2026-08-01', slut: '2026-08-08', nästaÅr: { år: 2027, brukar: 'kring månadsskiftet juli–augusti', månad: 8 }, plats: 'Palma', kategori: 'Sport', beskrivning: 'Kunglig segelregatta – en av Europas mest prestigefyllda och äldsta kappseglingar', länk: 'https://www.google.com/search?q=Copa+del+Rey+Segelregatta+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80' },
  { id: 'palma-boat-show', namn: 'Palma International Boat Show', datum: 'April 2026', start: '2026-04-01', slut: '2026-04-30', nästaÅr: { år: 2027, brukar: 'i april eller maj', månad: 4 }, plats: 'Palma', kategori: 'Sport', beskrivning: 'Medelhavsregionens ledande båtmässa med lyxyachter och segelbåtar', länk: 'https://www.google.com/search?q=Palma+International+Boat+Show+2026', bild: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80' },
  { id: 'magaluf-half', namn: 'Magaluf Half Marathon', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', plats: 'Magaluf', kategori: 'Sport', beskrivning: 'Populärt halvmaraton längs Mallorcas sydvästra kust med havsutsikt hela vägen', länk: 'https://www.google.com/search?q=Magaluf+Half+Marathon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { id: 'palma-marathon', namn: 'Palma Marathon', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', nästaÅr: { år: 2027, brukar: 'i oktober', månad: 10 }, plats: 'Palma', kategori: 'Sport', beskrivning: 'Maratonlopp genom Palmas historiska gator och längs strandpromenaden', länk: 'https://www.google.com/search?q=Palma+Marathon+2026', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { id: 'cycling-challenge', namn: 'Mallorca Cycling Challenge', datum: 'September 2026', start: '2026-09-01', slut: '2026-09-30', plats: 'Serra de Tramuntana', kategori: 'Sport', beskrivning: 'Cykelutmaning i Tramuntana-bergen längs UNESCO-världsarvsleden', länk: 'https://www.google.com/search?q=Mallorca+cycling+challenge+2026', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  // MUSIK
  { id: 'mallorca-live', namn: 'Mallorca Live Festival', datum: '11–13 juni 2026', start: '2026-06-11', slut: '2026-06-13', nästaÅr: { år: 2027, brukar: 'i maj eller juni', månad: 6 }, plats: 'Magaluf, Calvià', kategori: 'Musik', beskrivning: 'Mallorcas största musikfestival med 25 000 besökare och internationella toppakter', länk: 'https://www.mallorcalivefestival.com', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80' },
  { id: 'danzu', namn: 'Danzû Festival', datum: 'Augusti 2026', start: '2026-08-01', slut: '2026-08-31', plats: 'Magaluf', kategori: 'Musik', beskrivning: 'Elektronisk musikfestival med världsstjärnor som Carl Cox och Richie Hawtin', länk: 'https://www.google.com/search?q=Danzu+Festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { id: 'son-marroig', namn: 'Klassisk musik i Son Marroig', datum: 'Juni–september 2026', start: '2026-06-01', slut: '2026-09-30', nästaÅr: { år: 2027, brukar: 'under sommaren', månad: 9 }, plats: 'Deià', kategori: 'Musik', beskrivning: 'Högtidliga klassiska konserter i det vackra palatset Son Marroig med havsutsikt', länk: 'https://www.google.com/search?q=Son+Marroig+konserter+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80' },
  { id: 'pollenca-festival', namn: 'Jazz Festival Pollença', datum: 'Juli–augusti 2026', start: '2026-07-01', slut: '2026-08-31', nästaÅr: { år: 2027, brukar: 'i juli–augusti', månad: 8 }, plats: 'Pollença', kategori: 'Musik', beskrivning: 'Internationell jazzfestival i Pollenças gamla stan med världskända artister', länk: 'https://www.google.com/search?q=Jazz+Festival+Pollenca+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
  { id: 'ballermann', namn: 'Nacht des Ballermanns', datum: 'Juli 2026', start: '2026-07-01', slut: '2026-07-31', plats: 'Playa de Palma', kategori: 'Musik', beskrivning: 'Ballermanns stora sommarnatt med musik, dans och festligheter', länk: 'https://www.google.com/search?q=Ballermann+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { id: 'soller-musik', namn: 'Festival de Música de Sóller', datum: 'Juli 2026', start: '2026-07-01', slut: '2026-07-31', plats: 'Sóller', kategori: 'Musik', beskrivning: 'Intim musikfestival i apelsinlundarnas stad med klassiska och moderna verk', länk: 'https://www.google.com/search?q=Festival+Musica+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80' },
  { id: 'open-air-palma', namn: 'Open Air Konserter Palma', datum: 'Sommaren 2026', start: '2026-06-01', slut: '2026-08-31', plats: 'Palma', kategori: 'Musik', beskrivning: 'Utomhuskonserter på Palmas torg och platser med spansk och internationell musik', länk: 'https://www.google.com/search?q=konserter+Palma+Mallorca+sommar+2026', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80' },
  { id: 'electrobeach', namn: 'Electrobeach Festival', datum: 'Juli 2026', start: '2026-07-01', slut: '2026-07-31', plats: 'Port d\'Alcúdia', kategori: 'Musik', beskrivning: 'Elektronisk strandmusikfestival med DJs och artister på Alcúdias strand', länk: 'https://www.google.com/search?q=Electrobeach+Festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { id: 'alcudia-klassisk', namn: 'Festival Música Clàssica Alcúdia', datum: 'Augusti 2026', start: '2026-08-01', slut: '2026-08-31', plats: 'Alcúdia', kategori: 'Musik', beskrivning: 'Klassisk musikfestival i den romerska teatern i Pollentia, Alcúdia – en unik upplevelse', länk: 'https://www.google.com/search?q=Festival+Musica+Classica+Alcudia+2026', bild: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80' },
  { id: 'julkonserter-la-seu', namn: 'Julkonserter i La Seu', datum: 'December 2026', start: '2026-12-01', slut: '2026-12-31', plats: 'Palma', kategori: 'Musik', beskrivning: 'Stämningsfulla julkonserter i Palmas magnifika katedral La Seu', länk: 'https://www.google.com/search?q=julkonsert+La+Seu+Palma+2026', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80' },
  // KULTUR
  // Påsk 2026: palmsöndag 29 mars – påskdagen 5 april. Påsk 2027: 21–28 mars (påskdagen 28 mars).
  { id: 'semana-santa', namn: 'Semana Santa – Påskveckan', datum: '29 mars–5 april 2026', start: '2026-03-29', slut: '2026-04-05', nästaÅr: { start: '2027-03-21', slut: '2027-03-28', datum: '21–28 mars 2027' }, plats: 'Hela ön', kategori: 'Kultur', beskrivning: 'Högtidliga processioner med levande ljus och traditionell musik genom gamla stadsdelar', länk: 'https://www.google.com/search?q=Semana+Santa+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85' },
  { id: 'firo-soller', namn: 'Firó – Moros y Cristianos', datum: 'Maj 2026', start: '2026-05-01', slut: '2026-05-31', nästaÅr: { år: 2027, brukar: 'i maj', månad: 5 }, plats: 'Sóller', kategori: 'Kultur', beskrivning: 'Spektakulär historisk strid mellan morer och kristna som återuppförs på gatorna i Sóller', länk: 'https://www.google.com/search?q=Firo+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85' },
  // Sant Joan firas alltid natten mot 24 juni.
  { id: 'nit-de-sant-joan', namn: 'Nit de Foc – Johannesnatten', datum: '23 juni 2026', start: '2026-06-23', slut: '2026-06-23', nästaÅr: { start: '2027-06-23', slut: '2027-06-23', datum: '23 juni 2027' }, plats: 'Hela ön', kategori: 'Kultur', beskrivning: 'Johannesnatten firas med eldshower, fyrverkerier och festligheter på stränder och torg', länk: 'https://www.google.com/search?q=Nit+de+Foc+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  // Sant Jaume är en fast helgdag (25 juli).
  { id: 'sant-jaume', namn: 'Festa de Sant Jaume', datum: '25 juli 2026', start: '2026-07-25', slut: '2026-07-25', nästaÅr: { start: '2027-07-25', slut: '2027-07-25', datum: '25 juli 2027' }, plats: 'Alcúdia', kategori: 'Kultur', beskrivning: 'Alcúdias stora sommarfestival med konserter, eldshower och historiska uppträdanden', länk: 'https://www.google.com/search?q=Festa+Sant+Jaume+Alcudia+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { id: 'art-palma-brunch', namn: 'Art Palma Brunch', datum: 'September 2026', start: '2026-09-01', slut: '2026-09-30', nästaÅr: { år: 2027, brukar: 'i september', månad: 9 }, plats: 'Palma', kategori: 'Kultur', beskrivning: 'Internationell konstmässa i Palma med gallerier och konstnärer från hela Europa', länk: 'https://www.google.com/search?q=Art+Palma+Brunch+2026', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80' },
  { id: 'gran-verbena', namn: 'La Gran Verbena', datum: 'Augusti 2026', start: '2026-08-01', slut: '2026-08-31', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Sommarens största folkfest med spansk musik, dans och mat under bar himmel', länk: 'https://www.google.com/search?q=Gran+Verbena+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { id: 'oktoberfest', namn: 'Oktoberfest Mallorca', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', plats: 'Santa Ponça & Palma', kategori: 'Kultur', beskrivning: 'Bayerskt öl, pretzel och Wiesn-stämning under Mallorcas solsken', länk: 'https://www.google.com/search?q=Oktoberfest+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  // Revetla de Sant Antoni firas kvällen 16 januari, Sant Antoni 17 januari (fasta datum).
  { id: 'sant-antoni', namn: 'Revetla de Sant Antoni', datum: '16–17 januari 2027', start: '2027-01-16', slut: '2027-01-17', plats: 'Sa Pobla', kategori: 'Kultur', beskrivning: 'Mallorcas mest spektakulära eldsfestival med demoner, lägereld och djurvälsignelser', länk: 'https://www.google.com/search?q=Sant+Antoni+Festival+Mallorca+2027', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  // MAT & DRYCK
  { id: 'binissalem-skord', namn: 'Skördefest & Vinmarknad Binissalem', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', nästaÅr: { år: 2027, brukar: 'på hösten', månad: 10 }, plats: 'Binissalem', kategori: 'Mat & Dryck', beskrivning: 'Mallorcas vingårdar firar skörden med vinprovningar, musik och lokala delikatesser', länk: 'https://www.google.com/search?q=Binissalem+vinmarknad+2026', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80' },
  { id: 'ensaimada', namn: 'Ensaimada-festival', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Firande av Mallorcas mest ikoniska bakverk med provningar och bagartävlingar', länk: 'https://www.google.com/search?q=ensaimada+festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'gastrofestival', namn: 'Gastrofestival Palma', datum: 'Maj 2026', start: '2026-05-01', slut: '2026-05-31', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Veckolång matfestival med pop-up-restauranger, kockdueller och smakprovningar', länk: 'https://www.google.com/search?q=Gastrofestival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { id: 'olivolja-soller', namn: 'Olivoljemässa Sóller', datum: 'November 2026', start: '2026-11-01', slut: '2026-11-30', plats: 'Sóller', kategori: 'Mat & Dryck', beskrivning: 'Sóllerdalen firar sin olivoljeskörd med provningar, guidade turer och marknad', länk: 'https://www.google.com/search?q=olivolja+messa+Soller+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80' },
  { id: 'tapas-palma', namn: 'Tapas & Vinfestival Palma', datum: 'Juni 2026', start: '2026-06-01', slut: '2026-06-30', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Palmas bästa tapasrestauranger samlas för en helg av smak, vin och gemenskap', länk: 'https://www.google.com/search?q=tapas+festival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { id: 'santa-maria-matmarknad', namn: 'Mallorquinsk Matmarknad', datum: 'Varje lördag', återkommande: 'veckovis', plats: 'Santa Maria del Camí', kategori: 'Mat & Dryck', beskrivning: 'Öns bästa lokala matmarknad med ekologiska grönsaker, ostar, charkuterier och bröd', länk: 'https://www.google.com/search?q=matmarknad+Santa+Maria+del+Cami+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'sobrasada', namn: 'Sobrasada-festival', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', plats: 'Felanitx', kategori: 'Mat & Dryck', beskrivning: 'Firande av Mallorcas ikoniska kryddkorv med provningar, tävlingar och hantverk', länk: 'https://www.google.com/search?q=sobrasada+festival+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80' },
  { id: 'portes-obertes', namn: 'Öppen Vingård – Portes Obertes', datum: 'Oktober 2026', start: '2026-10-01', slut: '2026-10-31', plats: 'Binissalem & Pla', kategori: 'Mat & Dryck', beskrivning: 'Mallorcas vingårdar öppnar dörrarna för gratis provningar och guidade turer', länk: 'https://www.google.com/search?q=Portes+Obertes+vingard+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80' },
  { id: 'seafood-alcudia', namn: 'Seafood & Paella Festival', datum: 'Augusti 2026', start: '2026-08-01', slut: '2026-08-31', plats: 'Port d\'Alcúdia', kategori: 'Mat & Dryck', beskrivning: 'Havets bästa råvaror möter Mallorcas matkultur i en stämningsfull hamnfestival', länk: 'https://www.google.com/search?q=seafood+festival+Alcudia+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { id: 'olmarknad-palma', namn: 'Ölmarknad Palma', datum: 'September 2026', start: '2026-09-01', slut: '2026-09-30', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Hantverksöl från hela Spanien och lokala bryggerier samlas i Palma för en unik smakupplevelse', länk: 'https://www.google.com/search?q=beer+festival+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  // MARKNAD
  { id: 'sineu', namn: 'Fira de Sineu – Onsdagsmarknad', datum: 'Varje onsdag', återkommande: 'veckovis', plats: 'Sineu', kategori: 'Marknad', beskrivning: 'Mallorcas äldsta och mest autentiska marknad sedan 1306 – levande djur, hantverk och mat', länk: 'https://www.google.com/search?q=Fira+de+Sineu+marknad', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'inca-lader', namn: 'Inca Lädermässa', datum: 'November 2026', start: '2026-11-01', slut: '2026-11-30', plats: 'Inca', kategori: 'Marknad', beskrivning: 'Mallorcas berömda lädermässa med skor, väskor och läderprodukter till reapriser', länk: 'https://www.google.com/search?q=Inca+Ladermarknad+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80' },
  { id: 'pollenca-sondag', namn: 'Pollença Antikmarknad', datum: 'Varje söndag', återkommande: 'veckovis', plats: 'Pollença', kategori: 'Marknad', beskrivning: 'Charmig antikmarknad på Pollenças vackra torg med fynd, konst och hantverk', länk: 'https://www.google.com/search?q=antikmarknad+Pollenca+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'santanyi', namn: 'Santanyí Onsdags- och Lördagsmarknad', datum: 'Varje onsdag & lördag', återkommande: 'veckovis', plats: 'Santanyí', kategori: 'Marknad', beskrivning: 'En av öns mysigaste marknader med lokala producenter, keramik och textilier', länk: 'https://www.google.com/search?q=marknad+Santanyi+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'arta', namn: 'Artà Tisdagsmarknad', datum: 'Varje tisdag', återkommande: 'veckovis', plats: 'Artà', kategori: 'Marknad', beskrivning: 'Autentisk lokal marknad i den historiska byn Artà med färska råvaror och hantverk', länk: 'https://www.google.com/search?q=marknad+Arta+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'alcudia-marknad', namn: 'Alcúdia Tisdags- och Söndagsmarknad', datum: 'Varje tisdag & söndag', återkommande: 'veckovis', plats: 'Alcúdia', kategori: 'Marknad', beskrivning: 'Stor och livlig marknad utanför Alcúdias murar med kläder, mat och souvenirer', länk: 'https://www.google.com/search?q=marknad+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'hippiemarknaden', namn: 'Hippiemarknaden Alcúdia Port', datum: 'Sommaren 2026', start: '2026-06-01', slut: '2026-08-31', nästaÅr: { år: 2027, brukar: 'under sommaren', månad: 8 }, plats: 'Port d\'Alcúdia', kategori: 'Marknad', beskrivning: 'Färgglad kvällsmarknad med smycken, konst och handgjorda produkter vid strandpromenaden', länk: 'https://www.google.com/search?q=hippiemarknaden+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'julmarknad-palma', namn: 'Julmarknad Palma', datum: 'December 2026', start: '2026-12-01', slut: '2026-12-31', plats: 'Palma', kategori: 'Marknad', beskrivning: 'Stämningsfull julmarknad på Plaza Mayor med hantverk, juldekorationer och mallorquinska godsaker', länk: 'https://www.google.com/search?q=julmarknad+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80' },
  { id: 'felanitx', namn: 'Felanitx Söndagsmarknad', datum: 'Varje söndag', återkommande: 'veckovis', plats: 'Felanitx', kategori: 'Marknad', beskrivning: 'Stor och folkrik söndagsmarknad i inlandet med lokala livsmedel, kryddor och hantverk', länk: 'https://www.google.com/search?q=marknad+Felanitx+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { id: 'manacor', namn: 'Manacor Måndagsmarknad', datum: 'Varje måndag', återkommande: 'veckovis', plats: 'Manacor', kategori: 'Marknad', beskrivning: 'Stor stadsmarknad i Mallorcas näst största stad – känd för pärlor, möbler och lokala råvaror', länk: 'https://www.google.com/search?q=marknad+Manacor+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  // FAMILJ
  { id: 'fira-del-ram', namn: 'Fira del Ram – Nöjesfält', datum: 'April–maj 2026', start: '2026-04-01', slut: '2026-05-31', nästaÅr: { år: 2027, brukar: 'på våren', månad: 5 }, plats: 'Palma', kategori: 'Familj', beskrivning: 'Mallorcas traditionella nöjesfält med karuseller, spel och sötsaker för hela familjen', länk: 'https://www.google.com/search?q=Fira+del+Ram+Palma+Mallorca+2026', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { id: 'aqualand', namn: 'Aqualand El Arenal – Säsongsöppning', datum: 'Maj 2026', start: '2026-05-01', slut: '2026-05-31', nästaÅr: { år: 2027, brukar: 'i maj', månad: 5 }, plats: 'El Arenal', kategori: 'Familj', beskrivning: 'Mallorcas populäraste vattenpark öppnar för sommarsäsongen med nya attraktioner', länk: 'https://www.aqualand.es', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80' },
  { id: 'coves-del-drach', namn: 'Coves del Drach – Sommarsäsong', datum: 'April–oktober 2026', start: '2026-04-01', slut: '2026-10-31', nästaÅr: { år: 2027, brukar: 'april–oktober', månad: 10 }, plats: 'Porto Cristo', kategori: 'Familj', beskrivning: 'Dramatiska underjordiska grottor med konsert på världens största underjordiska sjö', länk: 'https://www.google.com/search?q=Coves+del+Drach+Mallorca', bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85' },
  { id: 'safari-zoo', namn: 'Safari Zoo Porto Cristo', datum: 'Hela sommaren 2026', start: '2026-06-01', slut: '2026-08-31', nästaÅr: { år: 2027, brukar: 'under sommaren', månad: 8 }, plats: 'Porto Cristo', kategori: 'Familj', beskrivning: 'Mallorcas populäraste djurpark med giraffer, lejon, elefanter och kamelridning', länk: 'https://www.google.com/search?q=Safari+Zoo+Porto+Cristo+Mallorca', bild: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80' },
  { id: 'hidropark', namn: 'Hidropark Alcúdia', datum: 'Juni–september 2026', start: '2026-06-01', slut: '2026-09-30', nästaÅr: { år: 2027, brukar: 'juni–september', månad: 9 }, plats: 'Alcúdia', kategori: 'Familj', beskrivning: 'Populär vattenpark norr om Alcúdia med vattenrutschkanor och barnpooler', länk: 'https://www.hidropark.com', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80' },
  { id: 'palma-aquarium', namn: 'Palma Aquarium', datum: 'Hela året', återkommande: 'helår', plats: 'Palma', kategori: 'Familj', beskrivning: 'Ett av Europas mest imponerande akvarier med hajbassäng och tropiska rev', länk: 'https://www.palmaaquarium.com', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
  { id: 'marineland', namn: 'Marineland Mallorca', datum: 'Maj–oktober 2026', start: '2026-05-01', slut: '2026-10-31', nästaÅr: { år: 2027, brukar: 'maj–oktober', månad: 10 }, plats: 'Costa d\'en Blanes', kategori: 'Familj', beskrivning: 'Delfinshow, pingviner och hajar – perfekt familjedag längs sydvästkusten', länk: 'https://www.marineland.es', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
  { id: 'coves-darta', namn: 'Coves d\'Artà', datum: 'April–oktober 2026', start: '2026-04-01', slut: '2026-10-31', nästaÅr: { år: 2027, brukar: 'april–oktober', månad: 10 }, plats: 'Capdepera', kategori: 'Familj', beskrivning: 'Dramatiska grottor med stalaktiter och stalagmiter nära Mallorcas nordöstra udde', länk: 'https://www.google.com/search?q=Coves+Arta+Mallorca', bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85' },
  { id: 'western-park', namn: 'Western Park Mallorca', datum: 'Sommaren 2026', start: '2026-06-01', slut: '2026-08-31', nästaÅr: { år: 2027, brukar: 'under sommaren', månad: 8 }, plats: 'Magaluf', kategori: 'Familj', beskrivning: 'Vilda västern-tema med vattenrutschkanor, barnaktiviteter och westernshower', länk: 'https://www.westernpark.com', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { id: 'falconeria', namn: 'Falconeria de Altair', datum: 'Hela sommaren 2026', start: '2026-06-01', slut: '2026-08-31', nästaÅr: { år: 2027, brukar: 'under sommaren', månad: 8 }, plats: 'Cas Concos', kategori: 'Familj', beskrivning: 'Spektakulärt falkneri med örnar, falkar och ugglor – unikt för barn och vuxna', länk: 'https://www.google.com/search?q=Falconeria+de+Altair+Mallorca', bild: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80' },
];

/** Dagens datum på Mallorca som YYYY-MM-DD. */
export function idagPåMallorca(nu: Date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(nu);
}

function sistaDagIMånaden(år: number, månad: number): string {
  const dag = new Date(Date.UTC(år, månad, 0)).getUTCDate();
  return `${år}-${String(månad).padStart(2, '0')}-${String(dag).padStart(2, '0')}`;
}

function basFält(e: EvenemangPost) {
  return { namn: e.namn, plats: e.plats, kategori: e.kategori, beskrivning: e.beskrivning, länk: e.länk, bild: e.bild };
}

/** Evenemang som pågår eller ligger framåt i tiden, sorterade efter datum (återkommande sist). */
export function kommandeEvenemang(idag: string = idagPåMallorca()): Evenemang[] {
  const lista: Evenemang[] = [];
  for (const e of evenemangData) {
    if (e.återkommande) {
      lista.push({ key: e.id, ...basFält(e), datum: e.datum, sortering: '9999', återkommande: true });
      continue;
    }
    if (e.slut && e.slut >= idag) {
      lista.push({ key: e.id, ...basFält(e), datum: e.datum, sortering: e.start ?? e.slut });
      continue;
    }
    const n = e.nästaÅr;
    if (!n) continue;
    if ('start' in n) {
      if (n.slut >= idag) lista.push({ key: `${e.id}-${n.start.slice(0, 4)}`, ...basFält(e), datum: n.datum, sortering: n.start });
    } else if (sistaDagIMånaden(n.år, n.månad) >= idag) {
      // Datum för nästa år är inte känt – visa ungefärlig tid och markera tydligt.
      lista.push({
        key: `${e.id}-${n.år}`,
        ...basFält(e),
        datum: `${n.år} · brukar vara ${n.brukar}`,
        sortering: `${n.år}-${String(n.månad).padStart(2, '0')}-99`,
        ejFastställt: true,
      });
    }
  }
  return lista.sort((a, b) => a.sortering.localeCompare(b.sortering));
}

/** Evenemang som redan har varit, senaste först. */
export function passeradeEvenemang(idag: string = idagPåMallorca()): Evenemang[] {
  return evenemangData
    .filter(e => !e.återkommande && e.slut && e.slut < idag)
    .map(e => ({ key: e.id, ...basFält(e), datum: e.datum, sortering: e.start ?? e.slut ?? '' }))
    .sort((a, b) => b.sortering.localeCompare(a.sortering));
}

/** Rullande årsintervall för rubriker, t.ex. "2026–2027". */
export function årsintervall(idag: string = idagPåMallorca()): string {
  const år = Number(idag.slice(0, 4));
  return `${år}–${år + 1}`;
}
