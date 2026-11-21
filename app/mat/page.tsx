import Image from 'next/image';
import Map from '@/components/Map';
import { cityMapMarkers } from '@/data/cities';
import Link from 'next/link';
import MatFilter from './MatFilter';
import { IconPin, IconMap, IconExternal, IconGlass, PriceTag, tierFromPris } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import LastChecked from '@/app/components/LastChecked';
import styles from './page.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const vingårdar = [
  { namn: 'Bodega Binigrau', web: 'https://www.binigrau.es', plats: 'Biniali (Sencelles)', info: 'Familjevingård i Biniali med viner av öns inhemska druvor', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/960px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Vinodlingar framför kalkstensberg vid Mortitx – genrebild, inte från Bodega Binigrau', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Biniali+Mallorca' },
  { namn: 'José L. Ferrer', web: 'https://www.vinosferrer.com', plats: 'Binissalem', info: 'En av Mallorcas mest välkända vingårdar', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/960px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Vinrankor på terrasser i Estellencs – genrebild, inte från José L. Ferrer', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', web: 'https://www.bodegaribas.com', plats: 'Consell', info: 'Mallorcas äldsta vingård – familjedriven sedan 1711', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/960px-Vinyes_Mortitx.jpg', bildAlt: 'Vinrankor vid Mortitx i Tramuntana – genrebild, inte från Bodega Ribas', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/960px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Vinodlingar framför kalkstensberg vid Mortitx – genrebild, inte från Ànima Negra', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', web: 'https://www.canmajoral.com', plats: 'Algaida', info: 'Ekologisk familjevingård sedan 1979, D.O. Pla i Llevant', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/960px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Vinrankor på terrasser i Estellencs – genrebild, inte från Can Majoral', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', plats: 'Santa Eugènia', info: 'Liten familjevingård', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/960px-Vinyes_Mortitx.jpg', bildAlt: 'Vinrankor vid Mortitx i Tramuntana – genrebild, inte från Vinya Taujana', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
];

// Mallorkinska specialiteter (11.2). Källor i LastChecked längst ner.
const specialiteter = [
  { namn: 'Pa amb oli', text: 'Bröd med olivolja och tomat, med ost, skinka eller sobrassada och oliver eller sjöfänkål (fonoll marí) vid sidan. Mallorkinernas vardagsmat – till lunch, kvällsmat eller på baren.' },
  { namn: 'Ensaïmada', text: 'Spiralformat bakverk av jäst deg med saïm (ister), som gett det namnet. Slät (llisa) eller fylld, oftast med cabell d’àngel, en söt pumpasylt. Äts till frukost eller med kaffe eller varm choklad. Skyddad geografisk beteckning (IGP).' },
  { namn: 'Sobrassada', text: 'Mjuk, lufttorkad korv av malet griskött, paprikapulver (pebre bord), salt och kryddor. Bred den på bröd, gärna med lite honung, eller ät den i grytor. Skyddad beteckning (IGP); en egen sort görs bara av den inhemska svarta grisen, porc negre.' },
  { namn: 'Tumbet', text: 'Lager av stekt aubergine, potatis och paprika med tomatsås. En sommarrätt som äts som egen rätt eller som tillbehör till kött och fisk – och fungerar för vegetarianer.' },
  { namn: 'Frit mallorquí', text: 'Tärnad innanmat eller kött stekt med potatis, paprika och fänkål. Grisvarianten hör till slakttiden på vintern (matances), lammvarianten till påsk. Står ofta på menyn på cellers, öns källarkrogar.' },
  { namn: 'Arròs brut', text: '”Smutsigt ris” – en kryddig, soppig risrätt med kött och grönsaker. Kryddorna gör buljongen grumlig, därav namnet. En mättande rätt för svalare dagar.' },
  { namn: 'Coca', text: 'Platt bakverk, salt eller sött. Coca de trempó har tunn botten med sommarsalladen trempó – tomat, grön paprika och lök. I Valldemossa bakar de den söta coca de patata på potatis.' },
  { namn: 'Gató d’ametlla', text: 'Saftig mandelkaka, ofta bakad utan vetemjöl, som serveras med mandelglass (gelat d’ametlla). Finns på kaféer och som efterrätt på många mallorkinska krogar.' },
  { namn: 'Herbes', text: 'Anislikör smaksatt med öns örter, bland annat fänkål, rosmarin och citronmeliss, som dricks efter maten. Finns söt (dolces), halvsöt (mesclades) och torr (seques). Skyddad geografisk beteckning (Herbes de Mallorca).' },
];

const restauranger = [
  { namn: 'Marc Fosh', plats: 'Palma', info: 'En Michelinstjärna – modern medelhavsmat i hotellet Convent de la Missió i gamla stan', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Marc+Fosh+Palma+Mallorca' },
  { namn: 'Zaranda', plats: 'Palma', info: 'En Michelinstjärna – kocken Fernando Pérez Arellanos avsmakningsmenyer i hotellet Es Príncep', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seabass_%28levrek%29_and_a_grilled_potato.jpg/960px-Seabass_%28levrek%29_and_a_grilled_potato.jpg', bildAlt: 'Grillad havsabborre med potatis – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Zaranda+Es+Princep+Palma' },
  { namn: 'Adrián Quetglas', plats: 'Palma', info: 'Kreativ avsmakningsmeny vid Passeig de Mallorca', kategori: 'Kreativt', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Grilled_Fish_with_Wild_Greens.jpg/960px-Grilled_Fish_with_Wild_Greens.jpg', bildAlt: 'Grillad hel fisk med citron och gröna blad – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Adrian+Quetglas+Palma+Mallorca' },
  { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'En Michelinstjärna på hotellet St. Regis Mardavall', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Es+Fum+Mallorca' },
  { namn: 'Andreu Genestra', plats: 'Llucmajor', info: 'En Michelinstjärna och en grön stjärna för hållbarhet – fokus på mallorkinska råvaror', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Andreu+Genestra+Llucmajor+Mallorca' },
  { namn: 'Voro', plats: 'Canyamel', info: 'Två Michelinstjärnor – den enda restaurangen på Mallorca med två stjärnor i guiden 2026', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg/960px-01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg', bildAlt: 'Tallrik med grillad fisk och skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Voro+Canyamel+Mallorca' },
  { namn: 'El Camino', plats: 'Palma', info: 'Livlig tapasbar nära Passeig del Born – sitt vid den långa bardisken framför köket', kategori: 'Tapas', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shrimp_tapas.jpg/960px-Shrimp_tapas.jpg', bildAlt: 'Grillade räkor som tapa – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=El+Camino+Palma+Mallorca' },
  { namn: 'Maca de Castro', plats: "Port d'Alcúdia", info: 'En Michelinstjärna och en grön stjärna – kocken Maca de Castros kök bygger på öns råvaror', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg/960px-01_Food_in_Gran_Canaria_-_fish_and_seafood_mixed_grill_plate.jpg', bildAlt: 'Tallrik med grillad fisk och skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Maca+de+Castro+Port+Alcudia+Mallorca' },
  { namn: 'Stay', plats: 'Port de Pollença', info: 'Fisk och skaldjur längst ut på en egen brygga i hamnen, med utsikt över Pollençabukten – här sedan 1972', kategori: 'Utsikt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paella_de_marisco_01.jpg/960px-Paella_de_marisco_01.jpg', bildAlt: 'Paella med skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+de+Pollenca+Mallorca' },
  { namn: "Ca ses Sauerschell's", plats: 'Deià', info: "Avslappnad krog i huset där Michelinkrogen Es Racó d'es Teix låg – i dag drivs den av kockens döttrar", kategori: 'Kreativt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Grilled_Fish_with_Wild_Greens.jpg/960px-Grilled_Fish_with_Wild_Greens.jpg', bildAlt: 'Grillad hel fisk med citron och gröna blad – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Ca+ses+Sauerschells+Deia+Mallorca' },
  { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Mallorkinsk husmanskost i rustik källarmiljö sedan 1958', kategori: 'Mallorkinskt', prisklass: '€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frit_mallorqu%C3%AD.jpg/960px-Frit_mallorqu%C3%AD.jpg', bildAlt: 'Frit mallorquí i stekpanna – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Celler+Sa+Premsa+Palma+Mallorca' },
  { namn: 'DINS Santi Taura', plats: 'Palma', info: 'En Michelinstjärna – Santi Taura tolkar gamla mallorkinska recept i judiska kvarteret La Calatrava', kategori: 'Michelin', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Mixed_paella_with_seafood%2C_chicken_and_chorizo%2C_2025.jpg/960px-Mixed_paella_with_seafood%2C_chicken_and_chorizo%2C_2025.jpg', bildAlt: 'Risrätt med skaldjur i paellapanna – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=DINS+Santi+Taura+Palma+Mallorca' },
  { namn: 'Toque de Queda', plats: 'Palma', info: 'Tapas, chark- och ostbrickor och champagne i en smal gränd i gamla stan', kategori: 'Tapas', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Toque+de+Queda+Palma+Mallorca' },
  { namn: 'Caballito de Mar', plats: 'Palma', info: 'Klassisk fiskrestaurang vid Passeig de Sagrera mitt emot Sa Llotja – öppnade igen efter en renovering och har två terrasser', kategori: 'Fisk', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seabass_%28levrek%29_and_a_grilled_potato.jpg/960px-Seabass_%28levrek%29_and_a_grilled_potato.jpg', bildAlt: 'Grillad havsabborre med potatis – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Caballito+de+Mar+Palma+Mallorca' },
  { namn: 'Patrón Lunares', plats: 'Palma', info: 'Fisk, skaldjur och risrätter i Santa Catalina – boka gärna bord, det är ofta fullt', kategori: 'Fisk', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paella_de_marisco_01.jpg/960px-Paella_de_marisco_01.jpg', bildAlt: 'Paella med skaldjur – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Patron+Lunares+Santa+Catalina+Palma' },
  { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Ekologisk mallorkinsk mat av råvaror från ön – har en grön Michelinstjärna för hållbarhet', kategori: 'Mallorkinskt', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tombet.jpg/960px-Tombet.jpg', bildAlt: 'Tumbet, mallorkinsk grönsaksgratäng – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Ca+Na+Toneta+Caimari+Mallorca' },
  { namn: 'Duke', plats: 'Palma', info: 'Avslappnad krog i Santa Catalina sedan 2009, med surftema och asiatiskt inspirerad mat', kategori: 'Kreativt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Spanish_Tapas.jpg/1920px-Spanish_Tapas.jpg', bildAlt: 'Flera små tapasrätter på ett bord – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Duke+Restaurant+Palma+Mallorca' },
  { namn: 'El Olivo', plats: 'Deià', info: 'Restaurangen på hotellet La Residencia, i en oljekvarn från 1600-talet, med avsmakningsmenyer – på sommaren dukas det upp på terrassen med utsikt över byn och bergen. Finns med i Michelinguiden', kategori: 'Utsikt', prisklass: '€€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg/960px-Pan_seared_scallops_with_grilled_asparagus_fine_dining_appetizer.jpg', bildAlt: 'Stekta pilgrimsmusslor med grillad sparris – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=El+Olivo+La+Residencia+Deia+Mallorca' },
  { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Restaurangen på lantgårdshotellet Monnaber Nou utanför Campanet – medelhavsmat och terrass med utsikt över landsbygden', kategori: 'Utsikt', prisklass: '€€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Roast_leg_of_lamb.jpg/960px-Roast_leg_of_lamb.jpg', bildAlt: 'Ugnsstekt lammlägg – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Monnaber+Nou+Campanet+Mallorca' },
  { namn: 'Miceli', plats: 'Selva', info: 'Kocken Marga Colls dagliga menyer av råvaror från marknaden i Inca – Bib Gourmand i Michelinguiden', kategori: 'Mallorkinskt', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg', bildAlt: 'Pa amb oli med skinka, ost och oliver – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Miceli+Selva+Mallorca' },
  { namn: 'Es Verger', plats: 'Alaró', info: 'Känd för sin långsamt rostade lammstek – på bergsvägen upp mot Castell d’Alaró', kategori: 'Utsikt', prisklass: '€€', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Roast_leg_of_lamb.jpg/960px-Roast_leg_of_lamb.jpg', bildAlt: 'Ugnsstekt lammlägg – genrebild, inte från restaurangen', maps: 'https://maps.google.com/?q=Es+Verger+Alaro+Mallorca' },
];

export default function MatPage() {
  const kategorier = ['Alla', 'Michelin', 'Fisk', 'Tapas', 'Utsikt', 'Mallorkinskt', 'Kreativt'];

  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg"
        alt="Pa amb oli – mallorkinskt bröd med skinka, ost, tomat och oliver"
        kicker="Mallorcas matkultur"
        title="Mat och vin på Mallorca"
        subtitle="Mallorkinska rätter, Palmas saluhallar, restauranger vi gillar och vingårdar att besöka"
        height="52vh"
      />

      <div className={styles.inner}>
        <Breadcrumbs spaced items={[{ name: 'Hem', url: '/' }, { name: 'Mat & restauranger', url: '/mat' }]} />

        {/* Mallorkinska specialiteter (11.2) */}
        <section className={styles.specialties} aria-labelledby="specialiteter-rubrik">
          <p className={styles.eyebrow}>Mallorkinska köket</p>
          <h2 id="specialiteter-rubrik" className={styles.sectionTitle}>Rätter att prova</h2>
          <p className={styles.intro}>
            Mallorkinsk husmanskost bygger på gris, olivolja, grönsaker och mandel. Rätterna nedan hittar du på byarnas
            barer, på cellers (källarkrogar) och i marknadshallarna, och bakverken i bagerierna.
          </p>
          <dl className={styles.dishes}>
            {specialiteter.map(d => (
              <div key={d.namn} className={styles.dish}>
                <dt className={styles.dishName}>{d.namn}</dt>
                <dd className={styles.dishText}>{d.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Matmarknader (11.2) */}
        <section className={styles.markets} aria-labelledby="marknader-rubrik">
          <p className={styles.eyebrow}>Matmarknader</p>
          <h2 id="marknader-rubrik" className={styles.sectionTitle}>Palmas saluhallar</h2>
          <div className={styles.marketText}>
            <p>
              <strong>Mercat de l’Olivar</strong> nära Plaça d’Espanya är Palmas stora saluhall, med fisk, chark, ost,
              frukt och grönt under samma tak. <strong>Mercat de Santa Catalina</strong> i stadsdelen med samma namn är
              mindre och mer kvartersbetonad. I båda kan du äta lunch vid barerna mellan stånden eller handla till en
              picknick.
            </p>
            <p>
              Båda har öppet måndag–lördag från tidig morgon till tidig eftermiddag och är stängda på söndagar. Kom på
              förmiddagen, då är utbudet störst.
            </p>
            <p>
              <Link href="/marknader" className="link-arrow">Veckomarknaderna i byarna, dag för dag →</Link>
            </p>
          </div>
        </section>

        {/* Restauranger */}
        <section className={styles.restaurants}>
          <p className={styles.eyebrow}>Restauranger</p>
          <h2 className={styles.sectionTitle}>{restauranger.length} restauranger vi gillar</h2>
          <p className={styles.intro}>Michelinstjärnorna gäller Michelinguiden 2026. Öppettiderna ändras med säsongen och många restauranger håller stängt delar av vintern – kontrollera alltid hos restaurangen innan du åker.</p>

          <MatFilter listId="restauranglista" kategorier={kategorier} allaKategorier={restauranger.map(r => r.kategori)} />

          <div id="restauranglista" className={styles.grid}>
            {restauranger.map(r => (
              <article key={r.namn} data-kategori={r.kategori} className={styles.card}>
                <div className={styles.media}>
                  <Image src={r.bild} alt={r.bildAlt} fill sizes="(max-width: 1023px) 120px, 360px" loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.cardTitle}>{r.namn}</h3>
                      <PriceTag tier={tierFromPris(r.prisklass)} />
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.metaItem}><IconPin size={12} /> {r.plats}</span>
                    </div>
                    <div className={styles.labels}>
                      <span className={styles.badge}>{r.kategori}</span>
                    </div>
                  </div>
                  <p className={styles.info}>{r.info}</p>
                  <div className={styles.actions}>
                    <a href={r.maps} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      <IconMap size={13} stroke={1.8} /> Visa på karta ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Vingårdar kort teaser */}
        <section className={styles.teaser}>
          <div>
            <p className={styles.kicker}>
              <IconGlass size={14} stroke={1.8} />
              <span>Vinkultur</span>
            </p>
            <h2 className={styles.sectionTitle}>Vingårdar att besöka</h2>
            <p className={styles.intro}>Mallorca har två ursprungsbeteckningar för vin, D.O. Binissalem och D.O. Pla i Llevant. Här är ett urval av vingårdarna – hela guiden, med tips om att boka besök, finns på vingårdssidan.</p>
          </div>
          <div className={styles.grid}>
            {vingårdar.slice(0, 3).map(v => (
              <article key={v.namn} className={styles.card}>
                <div className={styles.media}>
                  <Image src={v.bild} alt={v.bildAlt} fill sizes="(max-width: 1023px) 120px, 360px" loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.cardTitle}>{v.namn}</h3>
                      <PriceTag tier={tierFromPris(v.prisklass)} />
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.metaItem}><IconPin size={12} /> {v.plats}</span>
                    </div>
                  </div>
                  <p className={styles.info}>{v.info}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/vingardar" className={`btn btn-secondary ${styles.darkButton}`}>
            Se alla vingårdar <IconExternal size={13} stroke={1.8} />
          </Link>
        </section>

        <section>
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
          date="2026-11-20"
          sources={[
            { label: 'Govern de les Illes Balears: Ensaïmada de Mallorca (IGP)', href: 'https://www.caib.es/sites/qualitatagroalimentaria/es/ensaimada_de_mallorca-46243/' },
            { label: 'Govern de les Illes Balears: Sobrassada de Mallorca (IGP)', href: 'https://www.caib.es/sites/qualitatagroalimentaria/es/sobrasada_de_mallorca-46242' },
            { label: 'Govern de les Illes Balears: Hierbas de Mallorca (IG)', href: 'https://www.caib.es/sites/qualitatagroalimentaria/es/hierbas_de_mallorca-46247/' },
            { label: 'Ajuntament de Palma: Mediterranean Cuisine', href: 'https://palmavirtual.palma.es/en/mediterranean-cuisine' },
            { label: 'Illes Balears: Gató d’ametlla de Mallorca', href: 'https://www.illesbalears.travel/en/mallorca/local-product-gato-dametlla-de-mallorca' },
            { label: 'Mallorca.com: Mercat de l’Olivar', href: 'https://www.mallorca.com/es/eventos/mercados/mercat-de-lolivar' },
            { label: 'Mallorca.com: Mercat de Santa Catalina', href: 'https://www.mallorca.com/es/eventos/mercados/mercat-de-santa-catalina' },
            { label: 'Michelinguiden: Maca de Castro', href: 'https://guide.michelin.com/en/illes-balears/port-d-alcdia/restaurant/maca-de-castro' },
            { label: 'Majorca Daily Bulletin: Michelinkrogar 2026', href: 'https://www.majorcadailybulletin.com/news/did-you-know/2025/11/26/138371/map-all-michelin-starred-restaurants-mallorca-2026-your-guide-the-island-top-restaurants.html' },
            { label: 'Mallorcadiario: Adrián Quetglas utan stjärna', href: 'https://www.mallorcadiario.com/el-restaurante-del-chef-adrian-quetglas-no-logra-retener-su-estrella-michelin' },
            { label: 'Majorca Daily Bulletin: Béns d’Avall stänger', href: 'https://www.majorcadailybulletin.com/news/local/2026/03/04/140633/famous-soller-restaurant-which-has-served-michelle-obama-michael-douglas-and-pierce-brosnan-announces-closure.html' },
            { label: 'Michelinguiden: Ca ses Sauerschell’s', href: 'https://guide.michelin.com/en/islas-baleares/dei/restaurant/ca-ses-sauerschell-s' },
            { label: 'Michelinguiden: DINS Santi Taura', href: 'https://guide.michelin.com/en/islas-baleares/palma/restaurant/dins-santi-taura' },
            { label: 'Michelinguiden: El Olivo (La Residencia)', href: 'https://guide.michelin.com/en/islas-baleares/dei/restaurant/el-olivo' },
            { label: 'Michelinguiden: Miceli', href: 'https://guide.michelin.com/es/es/islas-baleares/es-selva/restaurante/miceli' },
            { label: 'Mes Prestiges: Stay, Port de Pollença', href: 'https://mesprestiges.com/en/mallorca/places/stay-restaurant' },
            { label: 'Última Hora: Caballito de Mar 2025', href: 'https://www.ultimahora.es/monograficos/cocinas-cocineros-alma-3/2025/12/11/14221/style-gastronomy-estas-fiestas-caballito-mar-vuelve-promocion-cocinas-cocineros-alma.html' },
            { label: 'Mallorca.com: Monnaber Nou', href: 'https://www.mallorca.com/es/directorio/empresa/monnaber-nou-finca-hotel-spa-campanet' },
            { label: 'Mallorca.com: vingårdar (Can Majoral, Binigrau)', href: 'https://www.mallorca.com/en/food-drink/wineries' },
          ]}
        />
      </div>
    </div>
  );
}
