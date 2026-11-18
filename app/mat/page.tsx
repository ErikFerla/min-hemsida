import Image from 'next/image';
import Map from '@/components/Map';
import { cityMapMarkers } from '@/data/cities';
import Link from 'next/link';
import MatFilter from './MatFilter';
import { IconPin, IconMap, IconExternal, IconGlass, PriceTag, tierFromPris } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import LastChecked from '@/app/components/LastChecked';
import styles from './page.module.css';

const vingårdar = [
  { namn: 'Bodega Binigrau', web: 'https://www.binigrau.es', plats: 'Biniali (Sencelles)', info: 'Känd för sina Prensal Blanc-viner', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/960px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Vinodlingar framför kalkstensberg vid Mortitx – genrebild, inte från Bodega Binigrau', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Biniali+Mallorca' },
  { namn: 'José L. Ferrer', web: 'https://www.vinosferrer.com', plats: 'Binissalem', info: 'En av Mallorcas mest välkända vingårdar', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/960px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Vinrankor på terrasser i Estellencs – genrebild, inte från José L. Ferrer', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', web: 'https://www.bodegaribas.com', plats: 'Consell', info: 'Mallorcas äldsta vingård – familjedriven sedan 1711', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/960px-Vinyes_Mortitx.jpg', bildAlt: 'Vinrankor vid Mortitx i Tramuntana – genrebild, inte från Bodega Ribas', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', web: 'https://www.animanegra.com', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/960px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Vinodlingar framför kalkstensberg vid Mortitx – genrebild, inte från Ànima Negra', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', web: 'https://www.canmajoral.com', plats: 'Algaida', info: 'Ekologisk vingård med unik terroir', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/960px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Vinrankor på terrasser i Estellencs – genrebild, inte från Can Majoral', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', web: 'https://www.vinyataujana.com', plats: 'Santa Eugènia', info: 'Liten familjevingård', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/960px-Vinyes_Mortitx.jpg', bildAlt: 'Vinrankor vid Mortitx i Tramuntana – genrebild, inte från Vinya Taujana', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
];

const restauranger = [
  { namn: 'Marc Fosh', plats: 'Palma', info: 'En Michelinstjärna – modern medelhavsmat i hotellet Convent de la Missió i gamla stan', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Marc+Fosh+Palma+Mallorca' },
  { namn: 'Zaranda', plats: 'Palma', info: 'En Michelinstjärna – kocken Fernando Pérez Arellanos avsmakningsmenyer i hotellet Es Príncep', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seabass_%28levrek%29_and_a_grilled_potato.jpg/960px-Seabass_%28levrek%29_and_a_grilled_potato.jpg', bildAlt: 'Grillad havsabborre med potatis – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Zaranda+Es+Princep+Palma' },
  { namn: 'Adrián Quetglas', plats: 'Palma', info: 'Kreativ avsmakningsmeny vid Passeig de Mallorca – restaurangen förlorade sin Michelinstjärna 2024 (guiden 2025)', kategori: 'Lokalt', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Grilled_Fish_with_Wild_Greens.jpg/960px-Grilled_Fish_with_Wild_Greens.jpg', bildAlt: 'Grillad hel fisk med citron och gröna blad – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Adrian+Quetglas+Palma+Mallorca' },
  { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'En Michelinstjärna på hotellet St. Regis Mardavall', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Es+Fum+Mallorca' },
  { namn: 'Andreu Genestra', plats: 'Llucmajor', info: 'En Michelinstjärna och en grön stjärna för hållbarhet – fokus på mallorkinska råvaror', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Andreu+Genestra+Llucmajor+Mallorca' },
  { namn: 'Voro', plats: 'Canyamel', info: 'Två Michelinstjärnor – den enda restaurangen på Mallorca med två stjärnor i guiden 2026', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg/960px-01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg', bildAlt: 'Tallrik med grillad fisk och skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Voro+Canyamel+Mallorca' },
  { namn: 'El Camino', plats: 'Palma', info: 'Livlig tapasbar nära Passeig del Born – sitt vid den långa bardisken framför köket', kategori: 'Tapas', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shrimp_tapas.jpg/960px-Shrimp_tapas.jpg', bildAlt: 'Grillade räkor som tapa – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=El+Camino+Palma+Mallorca' },
  { namn: 'Maca de Castro', plats: "Port d'Alcúdia", info: 'En Michelinstjärna och en grön stjärna – kocken Maca de Castros kök bygger på öns råvaror', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg/960px-01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg', bildAlt: 'Tallrik med grillad fisk och skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Maca+de+Castro+Port+Alcudia+Mallorca' },
  { namn: 'Stay', plats: "Port d'Andratx", info: "Restaurang vid hamnen med utsikt över Port d'Andratx marina", kategori: 'Utsikt', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paella_de_marisco_01.jpg/960px-Paella_de_marisco_01.jpg', bildAlt: 'Paella med skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+Andratx+Mallorca' },
  { namn: "Ca ses Sauerschell's", plats: 'Deià', info: "Avslappnad krog som döttrarna till kocken bakom den tidigare Michelinkrogen Es Racó d'es Teix driver i samma hus", kategori: 'Lokalt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Grilled_Fish_with_Wild_Greens.jpg/960px-Grilled_Fish_with_Wild_Greens.jpg', bildAlt: 'Grillad hel fisk med citron och gröna blad – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Ca+ses+Sauerschells+Deia+Mallorca' },
  { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Äkta mallorkinsk husmanskost i rustik källarmiljö sedan 1958', kategori: 'Lokalt', prisklass: '€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frit_mallorqu%C3%AD.jpg/960px-Frit_mallorqu%C3%AD.jpg', bildAlt: 'Frit mallorquí i stekpanna – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Celler+Sa+Premsa+Palma+Mallorca' },
  { namn: 'DINS Santi Taura', plats: 'Palma', info: 'En Michelinstjärna – Santi Taura tolkar gamla mallorkinska recept i judiska kvarteret La Calatrava', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Mixed_paella_with_seafood%2C_chicken_and_chorizo%2C_2025.jpg/960px-Mixed_paella_with_seafood%2C_chicken_and_chorizo%2C_2025.jpg', bildAlt: 'Risrätt med skaldjur i paellapanna – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=DINS+Santi+Taura+Palma+Mallorca' },
  { namn: 'Toque de Queda', plats: 'Palma', info: 'Tapas, chark- och ostbrickor och champagne i en smal gränd i gamla stan', kategori: 'Tapas', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Toque+de+Queda+Palma+Mallorca' },
  { namn: 'Caballito de Mar', plats: 'Palma', info: 'Klassisk fiskrestaurang vid Passeig de Sagrera nära Sa Llotja', kategori: 'Fisk', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seabass_%28levrek%29_and_a_grilled_potato.jpg/960px-Seabass_%28levrek%29_and_a_grilled_potato.jpg', bildAlt: 'Grillad havsabborre med potatis – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Caballito+de+Mar+Palma+Mallorca' },
  { namn: 'Patrón Lunares', plats: 'Palma', info: 'Fisk, skaldjur och risrätter i Santa Catalina – boka gärna bord, det är ofta fullt', kategori: 'Fisk', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paella_de_marisco_01.jpg/960px-Paella_de_marisco_01.jpg', bildAlt: 'Paella med skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Patron+Lunares+Santa+Catalina+Palma' },
  { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Ekologisk mallorkinsk mat av lokala råvaror – har en grön Michelinstjärna för hållbarhet', kategori: 'Lokalt', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Ca+Na+Toneta+Caimari+Mallorca' },
  { namn: 'Duke', plats: 'Palma', info: 'Avslappnad krog i Santa Catalina sedan 2009, med surftema och asiatiskt inspirerad mat', kategori: 'Lokalt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Spanish_Tapas.jpg/1920px-Spanish_Tapas.jpg', bildAlt: 'Flera små tapasrätter på ett bord – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Duke+Restaurant+Palma+Mallorca' },
  { namn: 'La Residencia', plats: 'Deià', info: 'Restaurang på lyxhotellet La Residencia i Deià, med utsikt över bergen', kategori: 'Utsikt', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=La+Residencia+Deia+Mallorca' },
  { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Lantgårdshotell på landsbygden vid Campanet med mallorkinsk mat', kategori: 'Lokalt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Roast_leg_of_lamb.jpg/960px-Roast_leg_of_lamb.jpg', bildAlt: 'Ugnsstekt lammlägg – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Monnaber+Nou+Campanet+Mallorca' },
  { namn: 'Miceli', plats: 'Selva', info: 'Kocken Marga Colls dagliga menyer av råvaror från marknaden i Inca – Bib Gourmand i Michelinguiden', kategori: 'Lokalt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg', bildAlt: 'Pa amb oli med skinka, ost och oliver – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Miceli+Selva+Mallorca' },
  { namn: 'Es Verger', plats: 'Alaró', info: 'Känd för sin långsamt rostade lammstek – på bergsvägen upp mot Castell d’Alaró', kategori: 'Utsikt', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Roast_leg_of_lamb.jpg/960px-Roast_leg_of_lamb.jpg', bildAlt: 'Ugnsstekt lammlägg – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Es+Verger+Alaro+Mallorca' },
];

export default function MatPage() {
  const kategorier = ['Alla', 'Michelin', 'Fisk', 'Tapas', 'Utsikt', 'Lokalt'];

  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg"
        alt="Pa amb oli – mallorkinskt bröd med skinka, ost, tomat och oliver"
        kicker="Mallorcas matkultur"
        title="Mat och vin på Mallorca"
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
            <p className={styles.intro}>Mallorca har två ursprungsbeteckningar för vin, D.O. Binissalem och D.O. Pla i Llevant. Här är ett urval av vingårdarna – hela guiden, med tips om att boka besök, finns på vingårdssidan.</p>
          </div>
          <div className={styles.grid}>
            {vingårdar.slice(0, 3).map(v => (
              <article key={v.namn} className={styles.card}>
                <div className={styles.media}>
                  <Image src={v.bild} alt={v.bildAlt} fill sizes="(max-width:860px) 100vw, 360px" className={styles.cover} loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.cardTitle}>{v.namn}</h3>
                    <PriceTag tier={tierFromPris(v.prisklass)} />
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}><IconPin size={11} /> {v.plats}</span>
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
          <h2 className={styles.sectionTitle}>{restauranger.length} restauranger vi gillar</h2>
          <p className={styles.intro}>Michelinstjärnorna gäller Michelinguiden 2026. Öppettiderna ändras med säsongen och många restauranger håller stängt delar av vintern – kontrollera alltid hos restaurangen innan du åker.</p>

          <MatFilter listId="restauranglista" kategorier={kategorier} allaKategorier={restauranger.map(r => r.kategori)} />

          <div id="restauranglista" className={styles.grid}>
            {restauranger.map(r => (
              <article key={r.namn} data-kategori={r.kategori} className={styles.card}>
                <div className={styles.mediaTall}>
                  <Image src={r.bild} alt={r.bildAlt} fill sizes="(max-width:860px) 100vw, 360px" className={styles.cover} loading="lazy" />
                  <div className={styles.badge}>{r.kategori}</div>
                </div>
                <div className={styles.body}>
                  <div className={styles.titleRowTop}>
                    <h3 className={styles.cardTitle}>{r.namn}</h3>
                    <PriceTag tier={tierFromPris(r.prisklass)} />
                  </div>
                  <div className={`${styles.meta} ${styles.metaSpaced}`}>
                    <span className={styles.metaItem}><IconPin size={11} /> {r.plats}</span>
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

        <LastChecked
          date="2026-11-18"
          sources={[
            { label: 'Michelinguiden: Maca de Castro', href: 'https://guide.michelin.com/en/illes-balears/port-d-alcdia/restaurant/maca-de-castro' },
            { label: 'Majorca Daily Bulletin: Michelinkrogar 2026', href: 'https://www.majorcadailybulletin.com/news/did-you-know/2025/11/26/138371/map-all-michelin-starred-restaurants-mallorca-2026-your-guide-the-island-top-restaurants.html' },
            { label: 'Mallorcadiario: Adrián Quetglas utan stjärna', href: 'https://www.mallorcadiario.com/el-restaurante-del-chef-adrian-quetglas-no-logra-retener-su-estrella-michelin' },
            { label: 'Majorca Daily Bulletin: Béns d’Avall stänger', href: 'https://www.majorcadailybulletin.com/news/local/2026/03/04/140633/famous-soller-restaurant-which-has-served-michelle-obama-michael-douglas-and-pierce-brosnan-announces-closure.html' },
            { label: 'Michelinguiden: Ca ses Sauerschell’s', href: 'https://guide.michelin.com/en/islas-baleares/dei/restaurant/ca-ses-sauerschell-s' },
            { label: 'Michelinguiden: DINS Santi Taura', href: 'https://guide.michelin.com/en/islas-baleares/palma/restaurant/dins-santi-taura' },
          ]}
        />
      </div>
    </div>
  );
}
