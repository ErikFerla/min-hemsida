import Link from 'next/link';
import styles from '../page.module.css';

export const evenemang = [
  { namn: 'Sant Antoni Festival', datum: '16-17 januari 2026', plats: 'Sa Pobla', kategori: 'Kultur', beskrivning: 'Mallorcas mest spektakulära eldsfestival med demoner, lägereld och djurvälsignelser', länk: 'https://www.google.com/search?q=Sant+Antoni+Festival+Mallorca', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { namn: 'Festes de Sant Sebastià', datum: '19-25 januari 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Palmas stadsfestival med konserter, eldshower och folkfester i gamla stan', länk: 'https://www.google.com/search?q=Sant+Sebastia+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { namn: 'Mandelblomningens Festival', datum: 'Februari 2026', plats: 'Sineu & inland', kategori: 'Natur', beskrivning: 'Hela inlandet blommar vitt när mandelträden slår ut – en av öns vackraste upplevelser', länk: 'https://www.google.com/search?q=mandelblomning+Mallorca', bild: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80' },
  { namn: 'Semana Santa – Påskveckan', datum: 'April 2026', plats: 'Hela ön', kategori: 'Kultur', beskrivning: 'Högtidliga processioner med levande ljus och traditionell musik genom gamla stadsdelar', länk: 'https://www.google.com/search?q=Semana+Santa+Mallorca', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80' },
  { namn: 'Mallorca 312 Cykellopp', datum: '25 april 2026', plats: 'Palma – runt ön', kategori: 'Sport', beskrivning: 'Världens mest populära cykellopp med 10 000 deltagare på 312 km runt hela Mallorca', länk: 'https://www.mallorca312.com', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { namn: 'Palma International Boat Show', datum: 'April 2026', plats: 'Palma', kategori: 'Mässa', beskrivning: 'Medelhavsregionens ledande båtmässa med lyxyachter, segelbåtar och maritima innovationer', länk: 'https://www.google.com/search?q=Palma+International+Boat+Show', bild: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80' },
  { namn: 'Ironman 70.3 Mallorca', datum: '10 maj 2026', plats: 'Alcúdia', kategori: 'Sport', beskrivning: 'Ett av världens hårdaste triathlon – 1,9 km simning, 90 km cykling och 21 km löpning', länk: 'https://www.google.com/search?q=Ironman+70.3+Mallorca', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { namn: 'PalmaVela Regatta', datum: 'Maj 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Internationell segelregatta med tävlande från hela världen i Palmas vackra bukt', länk: 'https://www.google.com/search?q=PalmaVela+Regatta+Mallorca', bild: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80' },
  { namn: 'Mallorca Olympic Triathlon', datum: '24 maj 2026', plats: 'Colònia Sant Jordi', kategori: 'Sport', beskrivning: 'Olympisk distans längs Mallorcas vackraste sydkust – öppen för alla nivåer', länk: 'https://www.google.com/search?q=Mallorca+Olympic+Triathlon', bild: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80' },
  { namn: 'Mallorca Live Festival', datum: '11-13 juni 2026', plats: 'Magaluf, Calvià', kategori: 'Musik', beskrivning: 'Mallorcas största musikfestival med 25 000 besökare och internationella toppakter på flera scener', länk: 'https://www.mallorcalivefestival.com', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { namn: 'Nit de Foc – Midsommarfest', datum: '23 juni 2026', plats: 'Hela ön', kategori: 'Kultur', beskrivning: 'Johannes-natten firas med eldshower, fyrverkerier och festligheter på stränder och torg', länk: 'https://www.google.com/search?q=Nit+de+Foc+Mallorca', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { namn: 'Danzû Festival', datum: 'Juli-september 2026', plats: 'Magaluf', kategori: 'Musik', beskrivning: 'Elektronisk musikfestival med världsstjärnor som Carl Cox och Richie Hawtin', länk: 'https://www.google.com/search?q=Danzu+Festival+Mallorca', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80' },
  { namn: 'Copa del Rey Segelregatta', datum: '1-8 augusti 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Kunglig segelregatta – en av Europas mest prestigefyllda och äldsta segelkappseglingar', länk: 'https://www.google.com/search?q=Copa+del+Rey+Segelregatta+Mallorca', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80' },
  { namn: 'La Gran Verbena', datum: 'Augusti 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Sommarens största folkfest med spansk musik, dans och mat under bar himmel', länk: 'https://www.google.com/search?q=Gran+Verbena+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { namn: 'Fira de Sineu – Onsdagsmarknad', datum: 'Varje onsdag', plats: 'Sineu', kategori: 'Marknad', beskrivning: 'Mallorcas äldsta och mest autentiska marknad – levande djur, hantverk och lokal mat sedan 1306', länk: 'https://www.google.com/search?q=Fira+de+Sineu+marknad', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Inca Lädermässa', datum: 'November 2026', plats: 'Inca', kategori: 'Marknad', beskrivning: 'Mallorcas berömda lädermässa med skor, väskor och läderprodukter till reapriser', länk: 'https://www.google.com/search?q=Inca+Ladermarknad+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Magaluf Half Marathon', datum: 'Oktober 2026', plats: 'Magaluf', kategori: 'Sport', beskrivning: 'Populärt halvmaraton längs Mallorcas sydvästra kust med havsutsikt hela vägen', länk: 'https://www.google.com/search?q=Magaluf+Half+Marathon', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { namn: 'Oktoberfest Mallorca', datum: 'Oktober 2026', plats: 'Santa Ponça & Palma', kategori: 'Mat & Dryck', beskrivning: 'Bayerskt öl, pretzel och Wiesn-stämning under Mallorcas solsken', länk: 'https://www.google.com/search?q=Oktoberfest+Mallorca', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  { namn: 'Skördefest & Vinmarknad', datum: 'Oktober 2026', plats: 'Binissalem', kategori: 'Mat & Dryck', beskrivning: 'Mallorcas vingårdar öppnar sina portar och firar skörden med provningar och festligheter', länk: 'https://www.google.com/search?q=Binissalem+vinmarknad+Mallorca', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80' },
  { namn: 'Palma Marathon', datum: 'Oktober 2026', plats: 'Palma', kategori: 'Sport', beskrivning: 'Maratonlopp genom Palmas historiska gator och längs strandpromenaden', länk: 'https://www.google.com/search?q=Palma+Marathon+Mallorca', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { namn: 'Palma Boat Show', datum: 'November 2026', plats: 'Palma', kategori: 'Mässa', beskrivning: 'Höstens stora båtmässa med fokus på begagnade lyxbåtar och marinautrustning', länk: 'https://www.google.com/search?q=Palma+Boat+Show', bild: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80' },
  { namn: 'Julmarknad Palma', datum: 'December 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Stämningsfull julmarknad på Plaza Mayor med hantverk, julbak och glögg', länk: 'https://www.google.com/search?q=julmarknad+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80' },
  { namn: 'Cabalgata de Reyes – Trettondagsparad', datum: '5 januari 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'De tre vise männen anländer till Mallorca med kamel och delar ut godis till barnen', länk: 'https://www.google.com/search?q=Cabalgata+Reyes+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80' },
  { namn: 'Fira del Ram – Nöjesfält', datum: 'Mars-april 2026', plats: 'Palma', kategori: 'Familj', beskrivning: 'Mallorcas stora nöjesfält med karuseller, spel och folklig festivalstämning', länk: 'https://www.google.com/search?q=Fira+del+Ram+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80' },
  { namn: 'Firó – Moros y Cristianos', datum: 'Maj 2026', plats: 'Sóller', kategori: 'Kultur', beskrivning: 'Spektakulär historisk strid mellan morer och kristna som återuppförs på gatorna i Sóller', länk: 'https://www.google.com/search?q=Firo+Soller+Mallorca', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80' },
  { namn: 'Nacht des Ballermanns', datum: 'Sommaren 2026', plats: 'Playa de Palma', kategori: 'Musik', beskrivning: 'Ballermanns stora sommarnatt med tysk schlagermusik, dans och festligheter', länk: 'https://www.google.com/search?q=Ballermann+Mallorca', bild: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80' },
  { namn: 'Ensaimada-festival', datum: 'Oktober 2026', plats: 'Palma', kategori: 'Mat & Dryck', beskrivning: 'Firande av Mallorcas mest ikoniska bakverk – ensaimadan – med provningar och bagartävlingar', länk: 'https://www.google.com/search?q=ensaimada+festival+Mallorca', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Campionat de Mallorca – Cykling', datum: 'Januari 2026', plats: 'Hela ön', kategori: 'Sport', beskrivning: 'Proffscyklister värmer upp inför säsongen på Mallorcas berömda cykelvägar', länk: 'https://www.google.com/search?q=Campionat+ciclisme+Mallorca', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { namn: 'Art Palma Brunch', datum: 'Januari 2026', plats: 'Palma', kategori: 'Kultur', beskrivning: 'Internationell konstmässa i Palma med gallerier och konstnärer från hela Europa', länk: 'https://www.google.com/search?q=Art+Palma+Brunch', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80' },
  { namn: 'Festa de Sant Jaume', datum: '25 juli 2026', plats: 'Alcúdia', kategori: 'Kultur', beskrivning: 'Alcúdias stora sommarfestival med konserter, eldshower och historiska uppträdanden', länk: 'https://www.google.com/search?q=Festa+Sant+Jaume+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
];

export default function SectionEvents() {
  return (
    <section className={styles.eventsSection}>
      <div className={styles.eventsLeft}>
        <h2 className={styles.eventsTitle}>KOMMANDE EVENEMANG</h2>
        <p className={styles.eventsText}>Mallorca är värd till många evenemang under året – cykellopp, segelregattor, jordbruksmarknader och internationella sportevenemang.</p>
        <Link href="/evenemang" className={styles.eventsBtn}>Se alla evenemang</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', flex: 1 }}>
        {evenemang.slice(0, 6).map((e, i) => (
          <div key={i} style={{ background: '#e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
            <img src={e.bild} alt={e.namn} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: '#555', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ background: '#111', color: 'white', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: '600' }}>{e.kategori}</span>
                <span>📅 {e.datum}</span>
                <span>📍 {e.plats}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.02em', margin: 0, color: '#111' }}>{e.namn}</h3>
              <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: '1.5', margin: 0, flex: 1 }}>{e.beskrivning}</p>
              <a href={e.länk} target="_blank" rel="noopener noreferrer" style={{ marginTop: '8px', display: 'inline-block', padding: '6px 14px', background: '#111', color: 'white', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }}>Läs mer ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
