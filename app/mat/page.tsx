import Image from 'next/image';
import Map from '@/components/Map';
import { cityMapMarkers } from '@/data/cities';
import Link from 'next/link';
import MatFilter from './MatFilter';
import { IconPin, IconClock, IconMap, IconExternal, IconGlass, PriceTag, tierFromEmoji } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import styles from './page.module.css';

const vingårdar = [
  { namn: 'Bodega Binigrau', web: 'https://www.binigrau.es', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner', vin: 'Prova: Binigrau Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', web: 'https://www.vinosferrer.com', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård', vin: 'Prova: Veritas Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', web: 'https://www.bodegasribas.com', plats: 'Consell', info: 'Familjedriven vingård sedan 1711', vin: 'Prova: Ribas de Cabrera', prisklass: '💰💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', web: 'https://www.animanegra.com', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', vin: 'Prova: ÀN/2', prisklass: '💰💰💰', öppet: 'Endast med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', web: 'https://www.canmajoral.com', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar', vin: 'Prova: Entel', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', web: 'https://www.vinyataujana.com', plats: 'Santa Eugènia', info: 'Liten boutique-vingård', vin: 'Prova: Taujana Rosat', prisklass: '💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
];

const restauranger = [
  { namn: 'Marc Fosh', plats: 'Palma', info: 'En Michelinstjärna – modern och kreativ medelhavsmat', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Marc+Fosh+Palma+Mallorca' },
  { namn: 'Zaranda', plats: 'Llucmajor', info: 'Två Michelinstjärnor – Mallorcas mest exklusiva matupplevelse', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Zaranda+Mallorca' },
  { namn: 'Adrián Quetglas', plats: 'Palma', info: 'En Michelinstjärna – kreativ fusion av spansk och nordisk matkultur', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Mån–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Adrian+Quetglas+Palma+Mallorca' },
  { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'En Michelinstjärna med fantastisk panoramautsikt över havet', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Fum+Mallorca' },
  { namn: 'Andreu Genestra', plats: 'Capdepera', info: 'En Michelinstjärna med fokus på lokala mallorquinska råvaror', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Andreu+Genestra+Capdepera+Mallorca' },
  { namn: "Béns d'Avall", plats: 'Deià', info: 'Ikonisk terrass huggen i bergsklippan med autentisk mallorquinsk matkultur', kategori: 'Utsikt', prisklass: '💰💰💰', öppet: 'Dagligen 13–16, 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Bens+Avall+Deia+Mallorca' },
  { namn: 'Simply Fosh', plats: 'Palma', info: 'Marc Foshs mer avslappnade bistro med samma höga kvalitet', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Mån–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Simply+Fosh+Palma+Mallorca' },
  { namn: 'El Camino', plats: 'Palma', info: 'Trendig och livlig tapasbar i hjärtat av Palma', kategori: 'Tapas', prisklass: '💰💰', öppet: 'Dagligen 12–24', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=El+Camino+Palma+Mallorca' },
  { namn: 'La Vieja', plats: 'Palma', info: 'Modern tolkning av det mallorquinska köket i elegant miljö', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Vieja+Palma+Mallorca' },
  { namn: 'Aramis', plats: 'Palma', info: 'Elegant och klassisk restaurang med fokus på råvaror av högsta kvalitet', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Mån–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Aramis+Palma+Mallorca' },
  { namn: 'Restaurante Jardin', plats: "Port d'Alcúdia", info: "Havsutsikt och dagsfärsk fisk i Port d'Alcúdia", kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Restaurante+Jardin+Port+Alcudia+Mallorca' },
  { namn: 'Stay', plats: "Port d'Andratx", info: "Exklusiv restaurang med utsikt över Port d'Andratx vackra marina", kategori: 'Utsikt', prisklass: '💰💰💰💰', öppet: 'Dagligen 13–16, 19–23', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+Andratx+Mallorca' },
  { namn: "Es Racó d'es Teix", plats: 'Deià', info: 'Michelinstjärna i bergsby', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Ons–Sön 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Raco+des+Teix+Deia+Mallorca' },
  { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Äkta mallorquinsk husmanskost i rustik källarmiljö sedan 1958', kategori: 'Lokalt', prisklass: '💰', öppet: 'Mån–Lör 13–16', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Sa+Premsa+Palma+Mallorca' },
  { namn: 'La Bodeguita', plats: 'Palma', info: 'Mysig vinkällare med ett brett urval av lokala viner och vällagade tapas', kategori: 'Tapas', prisklass: '💰💰', öppet: 'Dagligen 12–24', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=La+Bodeguita+Palma+Mallorca' },
  { namn: 'Arrosseria Santi Taura', plats: 'Lloseta', info: 'Prisbelönt kock och mästare på mallorquinsk arroz och lokala rätter', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Arrosseria+Santi+Taura+Lloseta+Mallorca' },
  { namn: 'Toque de Queda', plats: 'Palma', info: 'Intim och personlig restaurang med passionerade kockar och hemlagad känsla', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Toque+de+Queda+Palma+Mallorca' },
  { namn: 'Misa Brasería', plats: 'Palma', info: 'Populär brasería med grillat kött, kreativa cocktails och levande stämning', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Dagligen 13–16, 19–23', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Misa+Braseria+Palma+Mallorca' },
  { namn: 'Caballito de Mar', plats: 'Palma', info: 'Klassisk fiskrestaurang vid Palmas kaj med dagsfärsk havsfisk', kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Caballito+de+Mar+Palma+Mallorca' },
  { namn: 'Patron Lunares', plats: 'Port de Pollença', info: 'Familjär fiskrestaurang i Port de Pollença – känd för sin färska fisk och skaldjur', kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Patron+Lunares+Port+Pollenca+Mallorca' },
  { namn: 'Cala Deia', plats: 'Deià', info: 'Romantisk restaurang på klipporna vid havet – öppet sommarsäsongen', kategori: 'Utsikt', prisklass: '💰💰💰', öppet: 'Maj–Okt dagligen 12–18', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Cala+Deia+Restaurant+Mallorca' },
  { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Hemlagad ekologisk mallorquinsk mat av råvaror direkt från trädgården', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Tors–Sön 13–15', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Ca+Na+Toneta+Caimari+Mallorca' },
  { namn: 'Argento', plats: 'Palma', info: 'Prisbelönt italiensk restaurang med autentiska råvaror och modern presentation', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Dagligen 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Argento+Palma+Mallorca' },
  { namn: 'Duke', plats: 'Palma', info: 'Modern europeisk gastropub med kreativa rätter och välskött vinlista', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Mån–Lör 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Duke+Restaurant+Palma+Mallorca' },
  { namn: 'La Residencia', plats: 'Deià', info: 'Ikonisk restaurang på lyxhotellet La Residencia i charmiga Deià', kategori: 'Utsikt', prisklass: '💰💰💰💰', öppet: 'Dagligen 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Residencia+Deia+Mallorca' },
  { namn: "Es Molí d'en Bou", plats: 'Sant Llorenç', info: 'En Michelinstjärna gömd på landsbygden – kräver bokning långt i förväg', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Moli+den+Bou+Sant+Llorenc+Mallorca' },
  { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Historisk herrgård på landsbygden med smakrik lokal husmanskost', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Dagligen 13–15, 19–21', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Monnaber+Nou+Campanet+Mallorca' },
  { namn: 'Miceli', plats: 'Selva', info: 'Liten pärla i Selva med hemlagad mat från den egna trädgården', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Tors–Sön 13–15', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Miceli+Selva+Mallorca' },
  { namn: 'Sa Pleta Freda', plats: 'Sineu', info: 'Traditionell och mysig restaurang i lantliga Sineu med mallorquinska klassiker', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Ons–Sön 13–15, 19–21', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Sa+Pleta+Freda+Sineu+Mallorca' },
  { namn: 'Es Verger', plats: 'Alaró', info: 'Berömd för sin ugnsrostade mallorquinska lammstek med storslagna bergsutsikter', kategori: 'Utsikt', prisklass: '💰💰', öppet: 'Dagligen 12–17', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Verger+Alaro+Mallorca' },
];

export default function MatPage() {
  const kategorier = ['Alla', 'Michelin', 'Fisk', 'Tapas', 'Utsikt', 'Lokalt'];

  return (
    <div className={styles.page}>
      <HeroImage
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        alt="Dukat matbord med tapas och färska råvaror – mallorcansk matkultur på bordet"
        kicker="Mallorcas matkultur"
        title="Mat & Vin på Mallorca"
        subtitle="Från Michelinkrogar till lokala vingårdar – din guide till det bästa"
        height="52vh"
      />

      <div className={styles.inner}>
        {/* Vingårdar kort teaser */}
        <section className={styles.teaser}>
          <div>
            <div className={styles.kicker}>
              <IconGlass size={14} stroke={1.8} />
              <span className={styles.kickerText}>Vinkultur</span>
            </div>
            <h2 className={styles.sectionTitle}>Vingårdar att besöka</h2>
            <p className={styles.intro}>Mallorca har över 70 vingårdar. Här är ett urval — besök vår dedikerade sida för hela guiden med bokningstips.</p>
          </div>
          <div className={styles.grid}>
            {vingårdar.slice(0, 3).map(v => (
              <article key={v.namn} className={styles.card}>
                <div className={styles.media}>
                  <Image src={v.bild} alt={v.namn} fill sizes="(max-width:860px) 100vw, 360px" className={styles.cover} loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.cardTitle}>{v.namn}</h3>
                    <PriceTag tier={tierFromEmoji(v.prisklass)} />
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}><IconPin size={11} /> {v.plats}</span>
                    <span className={styles.metaItem}><IconClock size={11} /> {v.öppet}</span>
                  </div>
                  <p className={styles.info}>{v.info}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/vingardar" className={styles.darkButton}>
            Se alla vingårdar <IconExternal size={13} stroke={1.8} />
          </Link>
        </section>

        {/* Restauranger */}
        <section className={styles.restaurants}>
          <p className={styles.eyebrow}>Handplockat</p>
          <h2 className={styles.sectionTitle}>30 bästa restaurangerna</h2>

          <MatFilter listId="restauranglista" kategorier={kategorier} allaKategorier={restauranger.map(r => r.kategori)} />

          <div id="restauranglista" className={styles.grid}>
            {restauranger.map(r => (
              <article key={r.namn} data-kategori={r.kategori} className={styles.card}>
                <div className={styles.mediaTall}>
                  <Image src={r.bild} alt={r.namn} fill sizes="(max-width:860px) 100vw, 360px" className={styles.cover} loading="lazy" />
                  <div className={styles.badge}>{r.kategori}</div>
                </div>
                <div className={styles.body}>
                  <div className={styles.titleRowTop}>
                    <h3 className={styles.cardTitle}>{r.namn}</h3>
                    <PriceTag tier={tierFromEmoji(r.prisklass)} />
                  </div>
                  <div className={`${styles.meta} ${styles.metaSpaced}`}>
                    <span className={styles.metaItem}><IconPin size={11} /> {r.plats}</span>
                    <span className={styles.metaItem}><IconClock size={11} /> {r.öppet}</span>
                  </div>
                  <p className={`${styles.info} ${styles.infoSpaced}`}>{r.info}</p>
                  <a href={r.maps} target="_blank" rel="noopener noreferrer" className={styles.mapButton}>
                    <IconMap size={13} stroke={1.8} /> Visa på karta
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.mapSection}>
          <p className={styles.eyebrow}>Karta</p>
          <h2 className={styles.sectionTitle}>Utforska Mallorca</h2>
          <div className={styles.mapWrap}>
            <Map
              markers={cityMapMarkers}
              ariaLabel="Karta över Mallorcas städer och byar"
              listLabel={`Visa alla ${cityMapMarkers.length} städer och byar som lista`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
