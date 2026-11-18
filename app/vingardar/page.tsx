import Image from 'next/image';
import { IconPin, IconClock, IconExternal, IconMap, IconGlass, IconLeaf, IconUsers, PriceTag } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import styles from './page.module.css';

type Vingard = {
  namn: string;
  plats: string;
  prisnivå: 1 | 2 | 3 | 4;
  typ: string;
  passarFör: string;
  upplevelse: string;
  bokning: string;
  öppet: string;
  info: string;
  signaturvin: string;
  eko?: boolean;
  web?: string;
  /** Generisk vingårdsbild från Mallorca (inga fria bilder av de enskilda bodegorna) – se bildAlt. */
  bild: string;
  /** Beskriver vad bilden faktiskt visar. */
  bildAlt: string;
  maps: string;
};

const vingårdar: Vingard[] = [
  { namn: 'Bodega Binigrau', plats: 'Binissalem', prisnivå: 2, typ: 'Medelstor, familjeägd', passarFör: 'Nybörjare, vänner', upplevelse: 'Provning + guidad tur i källaren', bokning: 'Går utan bokning, men bokning rekommenderas', öppet: 'Mån–lör 10–18', info: 'Känd för sina Prensal Blanc-viner och moderna inställning till traditionell vinmakning.', signaturvin: 'Binigrau Blanc (Prensal Blanc)', web: 'https://www.binigrau.es', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', plats: 'Binissalem', prisnivå: 2, typ: 'Klassisk, storskalig', passarFör: 'Förstagångsbesökare', upplevelse: 'Museum + provning + kort rundtur', bokning: 'Välkommen utan bokning', öppet: 'Mån–lör 9–19, sön 10–14', info: 'Mallorcas äldsta och mest välkända vingård. Lätt att besöka – perfekt introduktion till öns viner.', signaturvin: 'Veritas Blanc', web: 'https://www.vinosferrer.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', plats: 'Consell', prisnivå: 3, typ: 'Historisk familjegård', passarFör: 'Entusiaster, par', upplevelse: 'Privat provning i anrika källare', bokning: 'Förbokning krävs', öppet: 'Mån–fre 9–17', info: 'Familjedriven vingård sedan 1711 – Mallorcas äldsta. Fokus på inhemska druvor och eleganta viner.', signaturvin: 'Ribas de Cabrera', web: 'https://www.bodegasribas.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', plats: 'Felanitx', prisnivå: 3, typ: 'Liten, kultstatus', passarFör: 'Vinkännare', upplevelse: 'Exklusiv provning med vinmakaren', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Producerar öns mest hyllade rödviner med fokus på den inhemska Callet-druvan. Svårbokad men värd det.', signaturvin: 'ÀN/2', web: 'https://www.animanegra.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/1920px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Illustrationsbild: vingården Vinyes Mortitx bland kalkstensberg i Escorca', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', plats: 'Algaida', prisnivå: 2, typ: 'Ekologisk, liten', passarFör: 'Dig som gillar naturvin', upplevelse: 'Rundvandring i vingården + provning', bokning: 'Förbokning', öppet: 'Mån–fre 10–17', info: 'Pionjärer inom ekologisk vinodling på Mallorca. Unik terroir i öns inre högland.', signaturvin: 'Entel', eko: true, web: 'https://www.canmajoral.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', plats: 'Santa Eugènia', prisnivå: 2, typ: 'Liten vingård', passarFör: 'Små sällskap', upplevelse: 'Personlig provning', bokning: 'Bokning krävs', öppet: 'Med bokning', info: 'Liten producent med personlig prägel. Ett lugnt alternativ för den som vill undvika turistströmmar.', signaturvin: 'Taujana Rosat', web: 'https://www.vinyataujana.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/1920px-Vinyes_Mortitx.jpg', bildAlt: 'Illustrationsbild: vinrankor på vintern med kalkstensberg bakom, Mortitx', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
  { namn: 'Miquel Gelabert', plats: 'Manacor', prisnivå: 3, typ: 'Hantverksvingård', passarFör: 'Seriösa vinnördar', upplevelse: 'Djup provning, ofta med vinmakaren', bokning: 'Förbokning krävs', öppet: 'Mån–lör 10–18', info: 'Prisbelönt hantverksvingård på öns östra sida. Eleganta viner med lagringspotential.', signaturvin: 'Torrent Negre', web: 'https://www.miquelgelabert.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
  { namn: 'Son Bordils', plats: 'Inca', prisnivå: 2, typ: 'Stort gods, ekologiskt', passarFör: 'Familjer, grupper', upplevelse: 'Rundtur genom gods, vingård och källare', bokning: 'Förbokning rekommenderas', öppet: 'Mån–fre 9–17', info: 'Vackert historiskt gods med ekologisk produktion och välplanerade besök för större sällskap.', signaturvin: 'Son Bordils Blanc', eko: true, web: 'https://www.sonbordils.es', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
  { namn: 'Bodegas Macià Batle', plats: 'Santa Maria', prisnivå: 2, typ: 'Storskalig producent', passarFör: 'Förstagångsbesökare', upplevelse: 'Besökscenter, film och provning', bokning: 'Utan bokning', öppet: 'Mån–lör 9–19, sön 10–14', info: 'En av öns största producenter med välorganiserade besök. Bra första stopp på en vinresa.', signaturvin: 'Anni Blanc de Blancs', web: 'https://www.maciabatle.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
  { namn: 'Can Vidalet', plats: 'Llubí', prisnivå: 3, typ: 'Ekologisk, internationellt prisad', passarFör: 'Vinentusiaster', upplevelse: 'Guidad tur + provning av tre viner', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Liten ekologisk producent som fått internationellt erkännande. Avskild och stillsam miljö.', signaturvin: 'Petit Fangar', eko: true, web: 'https://www.canvidalet.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/1920px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Illustrationsbild: vingården Vinyes Mortitx bland kalkstensberg i Escorca', maps: 'https://maps.google.com/?q=Can+Vidalet+Llubi+Mallorca' },
  { namn: 'Son Prim', plats: 'Sencelles', prisnivå: 2, typ: 'Medelstor, modern', passarFör: 'Vinälskare', upplevelse: 'Provning av flera årgångar', bokning: 'Rekommenderas', öppet: 'Mån–fre 10–17', info: 'Fokus på inhemska druvor i modern stil. Välbalanserade röd- och vitviner.', signaturvin: 'Son Prim Merlot', web: 'https://www.sonprim.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
  { namn: 'Celler Tianna Negre', plats: 'Binissalem', prisnivå: 2, typ: 'Modern, innovativ', passarFör: 'Designintresserade', upplevelse: 'Arkitektonisk bodega + provning', bokning: 'Bokning rekommenderas', öppet: 'Mån–lör 10–18', info: 'Arkitektritad bodega med ren, modern estetik. Innovativa viner från etablerad familj.', signaturvin: 'Ses Nines Blanc', web: 'https://www.tiannanegre.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/1920px-Vinyes_Mortitx.jpg', bildAlt: 'Illustrationsbild: vinrankor på vintern med kalkstensberg bakom, Mortitx', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
  { namn: 'Son Sureda Rica', plats: 'Manacor', prisnivå: 3, typ: 'Liten och exklusiv', passarFör: 'Par, privata sällskap', upplevelse: 'Intim provning i liten grupp', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Liten och exklusiv producent. Välj den för en personlig upplevelse utan andra besökare.', signaturvin: 'Son Sureda Blanc', web: 'https://www.sonsurecirica.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Son+Sureda+Rica+Manacor+Mallorca' },
  { namn: 'Bodega Can Coleto', plats: 'Llucmajor', prisnivå: 2, typ: 'Familjegods', passarFör: 'Par, fotografer', upplevelse: 'Provning med utsikt över landskapet', bokning: 'Rekommenderas', öppet: 'Mån–lör 10–17', info: 'Familjegods med fantastisk utsikt – bland öns mest fotogeniska besök.', signaturvin: 'Can Coleto Negre', web: 'https://www.cancoleto.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Llucmajor+Mallorca' },
  { namn: 'Vins Nadal', plats: 'Binissalem', prisnivå: 1, typ: 'Traditionell familjevingård', passarFör: 'Budgetmedvetna', upplevelse: 'Enkel provning, varm atmosfär', bokning: 'Välkommen utan bokning', öppet: 'Mån–lör 9–18', info: 'Traditionell familjevingård sedan 1944. Enkel, ärlig och prisvärd.', signaturvin: 'Nadal Rosat', web: 'https://www.vinsnadal.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
];


export default function VingardarPage() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg"
        alt="Vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen i bakgrunden"
        photoCredit="Foto: Rotget / Wikimedia Commons (CC BY-SA 3.0)"
        kicker="Mallorcas vinkultur"
        title="Vingårdar på Mallorca"
        subtitle="15 handplockade bodegas – från anrika familjegods till ekologiska nykomlingar. Med tips om bokning, provning och vem varje plats passar för."
        height="52vh"
      />

      <div className={styles.inner}>
        <div className={styles.headRow}>
          <IconGlass size={18} />
          <h2 className={styles.sectionTitle}>15 vingårdar att besöka</h2>
        </div>
        <p className={styles.intro}>
          Mallorca har över 70 registrerade vingårdar, främst i Binissalem och Pla i Llevant. De flesta erbjuder provning – men boka alltid i förväg för de mindre.
        </p>

        <div className={styles.list}>
          {vingårdar.map((v, i) => (
            <article key={v.namn} className={styles.card}>
              <div className={styles.media}>
                <Image src={v.bild} alt={v.bildAlt} fill sizes="(max-width:860px) 100vw, 860px" className={styles.cover} loading={i < 2 ? 'eager' : 'lazy'} />
                <div className={styles.rank}>{i + 1}.</div>
                {v.eko && (
                  <div className={styles.eco}>
                    <IconLeaf size={10} stroke={2} /> Eko
                  </div>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.cardTitle}>{v.namn}</h3>
                  <PriceTag tier={v.prisnivå} />
                </div>

                <div className={styles.meta}>
                  <span className={styles.metaItem}><IconPin size={11} /> {v.plats}</span>
                  <span className={styles.metaItem}><IconClock size={11} /> {v.öppet}</span>
                </div>

                <p className={styles.info}>{v.info}</p>

                <div className={styles.facts}>
                  <div>
                    <p className={styles.factLabel}>Typ</p>
                    <p className={styles.factValue}>{v.typ}</p>
                  </div>
                  <div>
                    <p className={styles.factLabel}>Passar för</p>
                    <p className={styles.factValue}>{v.passarFör}</p>
                  </div>
                  <div className={styles.wide}>
                    <p className={styles.factLabel}>Upplevelse</p>
                    <p className={styles.factValue}>{v.upplevelse}</p>
                  </div>
                  <div className={styles.wide}>
                    <p className={styles.factLabel}>Bokning</p>
                    <p className={styles.factValue}>{v.bokning}</p>
                  </div>
                  <div className={styles.wide}>
                    <p className={styles.factLabel}>Signaturvin</p>
                    <p className={`${styles.factValue} ${styles.signature}`}>{v.signaturvin}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <a href={v.maps} target="_blank" rel="noopener noreferrer" className={styles.mapButton}>
                    <IconMap size={14} stroke={1.8} /> Visa på karta
                  </a>
                  {v.web && (
                    <a href={v.web} target="_blank" rel="noopener noreferrer" className={styles.webButton}>
                      Hemsida <IconExternal size={13} stroke={1.8} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.note}>
          <div className={styles.noteKicker}>
            <IconUsers size={16} stroke={1.8} />
            <span className={styles.noteKickerText}>Bra att veta</span>
          </div>
          <p className={styles.noteText}>De flesta vingårdar ligger 20–40 min bilväg från Palma. Räkna med 1,5–2 timmar per besök. Boka alltid i förväg på de små gårdarna – särskilt på lördagar.</p>
        </div>
      </div>
    </div>
  );
}
