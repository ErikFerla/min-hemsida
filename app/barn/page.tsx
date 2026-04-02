import MallorcaMap from '@/components/MallorcaMap';
import styles from './barn.module.css';
import Carousel from '@/components/Carousel';

const kategorier = [
  {
    titel: 'VATTENPARKER',
    aktiviteter: [
      { namn: 'Aqualand El Arenal', plats: 'El Arenal', ålder: 'Alla åldrar', tips: 'Kom tidigt för kortare köer', bild: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80', lat: 39.4934, lon: 2.7356, webb: 'https://www.aqualand.es' },
      { namn: 'Hidropark Alcudia', plats: 'Alcudia', ålder: 'Alla åldrar', tips: 'Bra för yngre barn, lugnt och familjärt', bild: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80', lat: 39.8234, lon: 3.1234, webb: 'https://www.hidropark.com' },
      { namn: 'Western Water Park', plats: 'Magaluf', ålder: 'Alla åldrar', tips: 'Kombinera med Western Park-temat', bild: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80', lat: 39.5012, lon: 2.5189, webb: 'https://www.westernpark.com' },
      { namn: 'Aqualand Magaluf', plats: 'Magaluf', ålder: 'Alla åldrar', tips: 'Europas längsta rutschbana finns här', bild: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80', lat: 39.5012, lon: 2.5234, webb: 'https://www.aqualand.es' },
      { namn: 'Marineland Vattenpark', plats: 'Costa de Blanes', ålder: 'Alla åldrar', tips: 'Kombinera med djurshowerna på samma anläggning', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', lat: 39.5678, lon: 2.5123, webb: 'https://www.marineland.es' },
      { namn: 'Splash Fun Cala Millor', plats: 'Cala Millor', ålder: 'Alla åldrar', tips: 'Liten och familjär – perfekt för de allra yngsta', bild: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80', lat: 39.5912, lon: 3.3623, webb: 'https://www.google.com/search?q=Splash+Fun+Cala+Millor' },
    ],
  },
  {
    titel: 'DJURPARKER & AKVARIUM',
    aktiviteter: [
      { namn: 'Palma Akvarium', plats: 'Palma', ålder: 'Alla åldrar', tips: 'Hajbassängen är ett måste – boka online för rabatt', bild: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80', lat: 39.5234, lon: 2.7234, webb: 'https://www.palmaaquarium.com' },
      { namn: 'Safari Zoo Porto Cristo', plats: 'Porto Cristo', ålder: 'Alla åldrar', tips: 'Kamelridning och giraffutfodring ingår', bild: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80', lat: 39.5123, lon: 3.3456, webb: 'https://www.zoomalorca.com' },
      { namn: 'Marineland', plats: 'Costa de Blanes', ålder: 'Alla åldrar', tips: 'Delfinshow kl 12 och 16 – kom i god tid', bild: 'https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=600&q=80', lat: 39.5678, lon: 2.5123, webb: 'https://www.marineland.es' },
      { namn: 'Natura Parc', plats: 'Santa Eugenia', ålder: 'Alla åldrar', tips: 'Ekologisk djurpark med inhemska djur – unikt på ön', bild: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=600&q=80', lat: 39.6234, lon: 2.8456, webb: 'https://www.naturaparc.net' },
      { namn: 'Falconeria de Altair', plats: 'Cas Concos', ålder: '3+ år', tips: 'Dagliga uppvisningar med örnar, falkar och ugglor', bild: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80', lat: 39.4123, lon: 3.1456, webb: 'https://www.google.com/search?q=Falconeria+de+Altair+Mallorca' },
      { namn: 'La Reserva Puig de Galatzó', plats: 'Puigpunyent', ålder: 'Alla åldrar', tips: 'Naturpark med ziplines och djurobservation i bergen', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', lat: 39.6123, lon: 2.5234, webb: 'https://www.la-reserva.com' },
    ],
  },
  {
    titel: 'GROTTOR & NATURÄVENTYR',
    aktiviteter: [
      { namn: 'Coves del Drach', plats: 'Porto Cristo', ålder: 'Alla åldrar', tips: 'Boka biljetter online – öns populäraste attraktion', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', lat: 39.5234, lon: 3.3312, webb: 'https://www.covesdeldrach.com' },
      { namn: "Coves d'Arta", plats: 'Capdepera', ålder: 'Alla åldrar', tips: 'Mindre känd än Drach – färre turister och lika imponerande', bild: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80', lat: 39.7012, lon: 3.4523, webb: 'https://www.covesdarta.com' },
      { namn: 'Coves de Campanet', plats: 'Campanet', ålder: 'Alla åldrar', tips: 'Mindre och mysigare – bra för yngre barn', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', lat: 39.7812, lon: 2.9234, webb: 'https://www.covesdecampanet.com' },
      { namn: 'Torrent de Pareis / Sa Calobra', plats: 'Nordvästra Mallorca', ålder: '8+ år', tips: 'Dramatisk vandring – ta med vattenskor och mycket vatten', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', lat: 39.8523, lon: 2.7934, webb: 'https://www.google.com/search?q=Torrent+de+Pareis+Mallorca' },
      { namn: "Glassbottenbåt Cala d'Or", plats: "Cala d'Or", ålder: 'Alla åldrar', tips: 'Se undervattenslivet utan att blöta ner dig – barnen älskar det', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', lat: 39.3789, lon: 3.2345, webb: 'https://www.google.com/search?q=glassbottenbat+Cala+d+Or+Mallorca' },
    ],
  },
  {
    titel: 'ÄVENTYR & AKTIVITETER',
    aktiviteter: [
      { namn: 'House of Katmandu', plats: 'Magaluf', ålder: '4+ år', tips: '4D-bio, spegellabyrint och minigolf i ett – heldagsaktivitet', bild: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', lat: 39.5012, lon: 2.5234, webb: 'https://www.katmandu.es' },
      { namn: 'Karting Magaluf', plats: 'Magaluf', ålder: '3+ år', tips: 'Olika banor för olika åldrar – säkert och roligt', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', lat: 39.5023, lon: 2.5178, webb: 'https://www.google.com/search?q=karting+magaluf+mallorca' },
      { namn: 'Zipline La Reserva', plats: 'Puigpunyent', ålder: '6+ år', tips: 'Europas längsta ziplines i naturskön bergsmiljö', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', lat: 39.6123, lon: 2.5234, webb: 'https://www.la-reserva.com' },
      { namn: 'Snorkling Cala Mondrago', plats: 'Cala Mondrago', ålder: '5+ år', tips: 'Hyr utrustning i Porto Petro - kristallklart vatten med massor av fisk', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', lat: 39.3523, lon: 3.1934, webb: 'https://www.google.com/search?q=snorkling+Cala+Mondrago+Mallorca' },
      { namn: 'Kajakpaddling Port de Sóller', plats: 'Port de Sóller', ålder: '6+ år', tips: 'Paddla längs nordvästkusten – guidade turer finns', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', lat: 39.7958, lon: 2.6942, webb: 'https://www.google.com/search?q=kayak+Port+de+Soller+Mallorca' },
      { namn: 'Jeeptur i Tramuntana', plats: 'Serra de Tramuntana', ålder: 'Alla åldrar', tips: 'Se bergen på ett äventyrligt sätt – boka guidad tur', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', lat: 39.7523, lon: 2.7234, webb: 'https://www.google.com/search?q=jeep+tour+Tramuntana+Mallorca' },
    ],
  },
  {
    titel: 'MINIGOLF & LEK',
    aktiviteter: [
      { namn: 'Golf Fantasia Palma Nova', plats: 'Palma Nova', ålder: 'Alla åldrar', tips: 'Tre olika 18-hålsbanor i tropisk miljö', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', lat: 39.5023, lon: 2.5312, webb: 'https://www.golffantasia.com' },
      { namn: 'Crazy Golf Alcudia', plats: 'Alcudia', ålder: 'Alla åldrar', tips: 'Rolig kvällsaktivitet efter en dag på stranden', bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80', lat: 39.8234, lon: 3.1234, webb: 'https://www.google.com/search?q=crazy+golf+Alcudia+Mallorca' },
      { namn: 'Hidropark Minigolf', plats: 'Alcudia', ålder: 'Alla åldrar', tips: 'Ingår i inträdet till Hidropark', bild: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80', lat: 39.8234, lon: 3.1234, webb: 'https://www.hidropark.com' },
      { namn: 'Adventure Golf Palmanova', plats: 'Palmanova', ålder: 'Alla åldrar', tips: 'Temabanor med äventyrstema - perfekt för hela familjen', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', lat: 39.5056, lon: 2.5289, webb: 'https://www.google.com/search?q=adventure+golf+palmanova+mallorca' },
    ],
  },
  {
    titel: 'MUSEER & LÄRANDE',
    aktiviteter: [
      { namn: 'Palma Akvarium Science Center', plats: 'Palma', ålder: '5+ år', tips: 'Interaktiva experiment – lärorikt och roligt', bild: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80', lat: 39.5234, lon: 2.7234, webb: 'https://www.palmaaquarium.com' },
      { namn: 'Museu de Mallorca', plats: 'Palma', ålder: '6+ år', tips: 'Gratis söndagar – historia från förhistorisk tid', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', lat: 39.5712, lon: 2.6523, webb: 'https://www.google.com/search?q=Museu+de+Mallorca+Palma' },
      { namn: 'Museu de Ciències Naturals', plats: 'Sóller', ålder: '5+ år', tips: 'Naturhistoria i en vacker modernistisk byggnad i Söller', bild: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80', lat: 39.7667, lon: 2.7167, webb: 'https://www.museucienciesnaturals.org' },
      { namn: "Es Baluard Museu d'Art Modern", plats: 'Palma', ålder: '6+ år', tips: 'Barnvänliga konstworkshops på helger', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', lat: 39.5723, lon: 2.6434, webb: 'https://www.esbaluard.org' },
      { namn: 'Tren de Sóller – Historisk tågtur', plats: 'Palma–Sóller', ålder: 'Alla åldrar', tips: 'Barnen älskar det gamla trätåget – boka i förväg på sommaren', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', lat: 39.7667, lon: 2.7167, webb: 'https://www.trendesoller.com' },
    ],
  },
];

export default function BarnPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=90')" }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>ROLIGA UPPLEVELSER FÖR HELA FAMILJEN</p>
          <h1 className={styles.heroTitle}>BARNVÄNLIGT PÅ MALLORCA</h1>
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
                  <div key={a.namn} style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', minWidth: '260px', maxWidth: '300px'}}>
                    <img src={a.bild} alt={a.namn} style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                    <div style={{padding: '14px'}}>
                      <div style={{fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', marginBottom: '4px', color: '#111'}}>{a.namn}</div>
                      <div style={{fontSize: '0.8rem', color: '#888', marginBottom: '2px'}}>📍 {a.plats}</div>
                      <div style={{fontSize: '0.8rem', color: '#888', marginBottom: '2px'}}>👶 {a.ålder}</div>
                      <div style={{fontSize: '0.8rem', color: '#555', marginBottom: '12px', background: '#f5f5f5', padding: '6px 8px', borderRadius: '6px'}}>💡 {a.tips}</div>
                      <div style={{display: 'flex', gap: '8px'}}>
                        <a href={`https://www.google.com/maps?q=${a.lat},${a.lon}`} target="_blank" rel="noopener noreferrer" style={{flex: 1, display: 'block', textAlign: 'center', padding: '8px', background: '#111', color: 'white', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600'}}>🗺️ Karta</a>
                        <a href={a.webb} target="_blank" rel="noopener noreferrer" style={{flex: 1, display: 'block', textAlign: 'center', padding: '8px', background: 'white', color: '#111', border: '2px solid #111', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600'}}>🌐 Hemsida</a>
                      </div>
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