import MallorcaMap from '@/components/MallorcaMap';
import Link from 'next/link';
import styles from './barn.module.css';
import Carousel from '@/components/Carousel';

const kategorier = [
  {
    titel: 'VATTENPARKER',
    aktiviteter: [
      {
        namn: 'Aqualand El Arenal',
        bild: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80',
        info: 'Plats: El Arenal | Ålder: Alla | Tips: Kom tidigt för kortare köer',
        lat: 39.4934,
        lon: 2.7356,
      },
      {
        namn: 'Hidropark Alcudia',
        bild: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80',
        info: 'Plats: Alcudia | Ålder: Alla | Tips: Ingår i parkbiljetten',
        lat: 39.8234,
        lon: 3.1234,
      },
      {
        namn: 'Western Water Park',
        bild: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80',
        info: 'Plats: Magaluf | Ålder: Alla',
        lat: 39.5012,
        lon: 2.5189,
      },
      {
        namn: 'Aqualand Magaluf',
        bild: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
        info: 'Plats: Magaluf | Ålder: Alla',
        lat: 39.5012,
        lon: 2.5234,
      },
      {
        namn: 'Marineland Vattenpark',
        bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        info: 'Plats: Costa de Blanes | Ålder: Alla',
        lat: 39.5678,
        lon: 2.5123,
      },
    ],
  },
  {
    titel: 'DJURPARKER OCH AKVARIUM',
    aktiviteter: [
      {
        namn: 'Palma Akvarium',
        bild: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
        info: 'Plats: Palma | Ålder: Alla | Tid: 2-3 timmar',
        lat: 39.5234,
        lon: 2.7234,
      },
      {
        namn: 'Safari Zoo Porto Cristo',
        bild: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80',
        info: 'Plats: Porto Cristo | Ålder: Alla | Tid: Halv dag',
        lat: 39.5123,
        lon: 3.3456,
      },
      {
        namn: 'Marineland djurpark',
        bild: 'https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=600&q=80',
        info: 'Plats: Costa de Blanes | Ålder: Alla | Tid: Hel dag',
        lat: 39.5678,
        lon: 2.5123,
      },
      {
        namn: 'Natura Parc',
        bild: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=600&q=80',
        info: 'Plats: Santa Eugenia | Ålder: Alla | Tid: 2 timmar',
        lat: 39.6234,
        lon: 2.8456,
      },
      {
        namn: 'Falconeria de Altair',
        bild: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80',
        info: 'Plats: Cas Concos | Ålder: 3+ år | Uppvisning: Dagligen',
        lat: 39.4123,
        lon: 3.1456,
      },
    ],
  },
  {
    titel: 'LEKPARKER OCH AVENTYRSLEKPLATSER',
    aktiviteter: [
      {
        namn: 'Parc de la Mar Lekplats (Palma)',
        bild: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600&q=80',
        info: 'Plats: Palma | Ålder: 2-10 år | Kostnad: Gratis',
        lat: 39.5678,
        lon: 2.6523,
      },
      {
        namn: 'Rancho Grande (Arta)',
        bild: 'https://images.unsplash.com/photo-1472745433479-4556f2cde01f?w=600&q=80',
        info: 'Plats: Arta | Ålder: 3-15 år | Tips: Ta med matsäck',
        lat: 39.7234,
        lon: 3.3123,
      },
      {
        namn: 'Lekplatser vid Alcudia Beach',
        bild: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=600&q=80',
        info: 'Plats: Alcudia | Ålder: 1-10 år | Kostnad: Gratis',
        lat: 39.8456,
        lon: 3.1234,
      },
      {
        namn: 'Katmandu Park Magaluf',
        bild: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
        info: 'Plats: Magaluf | Ålder: 3+ år | Tips: Kombinera med vattenpark',
        lat: 39.5012,
        lon: 2.5189,
      },
    ],
  },
  {
    titel: 'AVENTYR OCH AKTIVITETER',
    aktiviteter: [
      {
        namn: 'House of Katmandu (Magaluf)',
        bild: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
        info: 'Plats: Magaluf | Ålder: 4+ år | Tid: 3-4 timmar',
        lat: 39.5012,
        lon: 2.5234,
      },
      {
        namn: 'Glassbottenbåt Cala d\'Or',
        bild: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80',
        info: 'Plats: Cala d\'Or | Ålder: Alla | Tid: 1-2 timmar',
        lat: 39.3789,
        lon: 3.2345,
      },
      {
        namn: 'Karting Magaluf',
        bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        info: 'Plats: Magaluf | Ålder: 3+ år | Tid: 1 timme',
        lat: 39.5023,
        lon: 2.5178,
      },
    ],
  },
  {
    titel: 'MUSEUM OCH LÄRANDE',
    aktiviteter: [
      {
        namn: 'Palma Akvarium Science Center',
        bild: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
        info: 'Plats: Palma | Ålder: 5+ år | Tid: 2-3 timmar',
        lat: 39.5234,
        lon: 2.7234,
      },
      {
        namn: 'Museu de Mallorca (Palma)',
        bild: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=600&q=80',
        info: 'Plats: Palma | Ålder: 6+ år | Tid: 1-2 timmar',
        lat: 39.5712,
        lon: 2.6523,
      },
      {
        namn: 'Coves del Drach (Porto Cristo)',
        bild: 'https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=600&q=80',
        info: 'Plats: Porto Cristo | Ålder: Alla | Tid: 1.5 timmar',
        lat: 39.5234,
        lon: 3.3312,
      },
    ],
  },
  {
    titel: 'MINIGOLF OCH LEK',
    aktiviteter: [
      {
        namn: 'Golf Fantasia Palma Nova',
        bild: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7b9d?w=600&q=80',
        info: 'Plats: Palma Nova | Ålder: Alla | Tid: 1-2 timmar',
        lat: 39.5023,
        lon: 2.5312,
      },
      {
        namn: 'Sea Golf Palma (Glow-in-the-dark)',
        bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
        info: 'Plats: Palma | Ålder: 5+ år | Tips: Perfekt regnig dag',
        lat: 39.5712,
        lon: 2.6523,
      },
      {
        namn: 'Hidropark Minigolf Alcudia',
        bild: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80',
        info: 'Plats: Alcudia | Ålder: Alla | Tips: Ingår i parkbiljetten',
        lat: 39.8234,
        lon: 3.1234,
      },
    ],
  },
];

export default function BarnPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80')" }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>ROLIGA UPPLEVELSER FÖR HELA FAMILJEN</p>
          <h1 className={styles.heroTitle}>BARN PA MALLORCA</h1>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.sectionsWrapper}>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Barnvänligt på Mallorca</h2>
            <p className={styles.sectionDescription}>
              Mallorca är ett av Europas bästa resmål för barnfamiljer. Oavsett om ni söker vilda vattenrutschkanor, exotiska djur, spännande grottor eller lugna lekplatser vid stranden – här finns något för alla åldrar. Låt er inspireras av allt som ön har att erbjuda!
            </p>
          </section>

          {kategorier.map((kategori) => (
            <section key={kategori.titel} style={{padding: '40px 0'}}>
              <Carousel title={kategori.titel}>
                {kategori.aktiviteter.map((a) => (
                  <div key={a.namn} style={{background: '#e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                    <div style={{height: '180px', backgroundImage: `url('${a.bild}')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                    <div style={{padding: '12px 14px'}}>
                      <div style={{fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', marginBottom: '4px', color: '#2C1A0E'}}>{a.namn}</div>
                      <div style={{fontSize: '0.72rem', color: '#7D6650', marginBottom: '8px'}}>{a.info}</div>
                      <a href={`https://www.google.com/maps?q=${a.lat},${a.lon}`} target="_blank" rel="noopener noreferrer"
                         style={{display: 'inline-block', padding: '6px 12px', background: '#cecece', color: '#8B4513', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #C9B89A', textDecoration: 'none'}}>
                        Visa pa karta
                      </a>
                    </div>
                  </div>
                ))}
              </Carousel>
            </section>
          ))}
          <MallorcaMap />
        </div>
      </div>
    </div>
  );
}
