import Image from 'next/image';
import { IconPin, IconExternal, IconMap, IconGlass, IconLeaf, PriceTag } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import styles from './page.module.css';

type Vingard = {
  namn: string;
  plats: string;
  prisnivå: 1 | 2 | 3 | 4;
  typ: string;
  passarFör: string;
  upplevelse: string;
  bokning: string;
  info: string;
  /** Bara när vinet kunnat beläggas hos producenten. */
  signaturvin?: string;
  eko?: boolean;
  web?: string;
  /** Generisk vingårdsbild från Mallorca (inga fria bilder av de enskilda bodegorna) – se bildAlt. */
  bild: string;
  /** Beskriver vad bilden faktiskt visar. */
  bildAlt: string;
  maps: string;
};

const vingårdar: Vingard[] = [
  { namn: 'Bodega Binigrau', plats: 'Biniali (Sencelles)', prisnivå: 2, typ: 'Familjevingård', passarFör: 'Nybörjare, vänner', upplevelse: 'Rundtur och provning', bokning: 'Ring i förväg – uppgifterna om besök utan bokning går isär', info: 'Familjevingård mitt i byn Biniali, startad 2002. Vinerna säljs som Vi de la Terra Mallorca och görs till stor del av inhemska druvor som Manto Negro, Callet och Prensal Blanc.', web: 'https://www.binigrau.es', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Biniali+Mallorca' },
  { namn: 'José L. Ferrer', plats: 'Binissalem', prisnivå: 2, typ: 'Klassisk, stor producent', passarFör: 'Förstagångsbesökare', upplevelse: 'Rundtur och provning', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'En av Mallorcas mest välkända vingårdar, grundad 1931 i Binissalem. Provningen tar upp både de klassiska José L. Ferrer-vinerna, Veritas-serien och de ekologiska Pedra de Binissalem-vinerna.', signaturvin: 'Veritas-serien', web: 'https://www.vinosferrer.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', plats: 'Consell', prisnivå: 3, typ: 'Historisk familjegård', passarFör: 'Entusiaster, par', upplevelse: 'Rundtur och provning', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Familjen har gjort vin här sedan 1711 – Mallorcas äldsta vingård. Fokus på inhemska druvor och eleganta viner.', signaturvin: 'Ribas de Cabrera', web: 'https://www.bodegaribas.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', plats: 'Felanitx', prisnivå: 3, typ: 'Liten, kultstatus', passarFör: 'Vinkännare', upplevelse: 'Besök bara efter förfrågan', bokning: 'Kontakta vingården i god tid – besök är inte alltid möjligt', info: 'Grundad 1994 av tre vänner, med källaren på det gamla godset Son Burguera utanför Felanitx. Gör några av öns mest hyllade rödviner, med fokus på den inhemska druvan Callet.', signaturvin: 'ÀN/2', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/1920px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Illustrationsbild: vingården Vinyes Mortitx bland kalkstensberg i Escorca', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', plats: 'Algaida', prisnivå: 2, typ: 'Liten, ekologisk familjevingård', passarFör: 'Dig som gillar ekologiskt vin', upplevelse: 'Guidad rundtur med provning', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Familjen Oliver startade vingården i Algaida 1979, och den är i dag en av öns mest kända ekologiska vingårdar. Vinerna hör till D.O. Pla i Llevant.', eko: true, web: 'https://www.canmajoral.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', plats: 'Santa Eugènia', prisnivå: 2, typ: 'Liten familjevingård', passarFör: 'Små sällskap', upplevelse: 'Provning och försäljning på gården', bokning: 'Ring i förväg – öppettider anges inte', info: 'Liten familjevingård mitt i Santa Eugènia, inom D.O. Binissalem. Enkel och personlig provning – här köper du också vin direkt på gården.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/1920px-Vinyes_Mortitx.jpg', bildAlt: 'Illustrationsbild: vinrankor på vintern med kalkstensberg bakom, Mortitx', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
  { namn: 'Miquel Gelabert', plats: 'Manacor', prisnivå: 3, typ: 'Liten familjevingård', passarFör: 'Seriösa vinnördar', upplevelse: 'Provning i källaren', bokning: 'Hör av dig i förväg – provningen hålls i källaren inne i Manacor', info: 'Liten hantverksvingård med källare mitt i Manacor, inom D.O. Pla i Llevant. Alla druvor kommer från gårdens egna små vinodlingar.', signaturvin: 'Torrent Negre', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
  { namn: 'Son Bordils', plats: 'Inca', prisnivå: 2, typ: 'Gods med egna vinodlingar', passarFör: 'Familjer, grupper', upplevelse: 'Rundtur och provning med lokala produkter', bokning: 'Boka guidad visning i förväg via vingårdens hemsida eller per telefon', info: 'Gods vid vägen mellan Inca och Sineu, omgivet av gårdens vinodlingar. Vinerna säljs som Vi de la Terra Mallorca, och provningen hålls på den inre gården.', web: 'https://www.sonbordils.es', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
  { namn: 'Bodegas Macià Batle', plats: 'Santa Maria del Camí', prisnivå: 2, typ: 'Storskalig producent', passarFör: 'Förstagångsbesökare', upplevelse: 'Rundtur och provning', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'En av öns större producenter, med vintradition sedan 1800-talet. Guidade besök på fasta tider, nära tågstationen i Santa Maria del Camí – ett bra första stopp på en vinresa.', web: 'https://www.maciabatle.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
  { namn: 'Can Vidalet', plats: 'Pollença', prisnivå: 2, typ: 'Familjevingård', passarFör: 'Vinentusiaster', upplevelse: 'Guidad tur med provning och lokala tapas', bokning: 'Förbokning krävs – besöken går på fasta tider', info: 'Vingård vid vägen mellan Pollença och Alcúdia. Guidade besök med provning tar en till två timmar.', web: 'https://www.canvidalet.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/1920px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg', bildAlt: 'Illustrationsbild: vingården Vinyes Mortitx bland kalkstensberg i Escorca', maps: 'https://maps.google.com/?q=Can+Vidalet+Pollenca+Mallorca' },
  { namn: 'Son Prim', plats: 'Sencelles', prisnivå: 2, typ: 'Familjevingård', passarFör: 'Vinälskare', upplevelse: 'Rundtur och provning med mallorkinska delikatesser', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Familjevingård utanför Sencelles, startad i början av 1990-talet. Familjen odlar, gör och buteljerar alla sina viner själv.', web: 'https://www.sonprim.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
  { namn: 'Celler Tianna Negre', plats: 'Binissalem', prisnivå: 2, typ: 'Modern, ekologisk', passarFör: 'Designintresserade', upplevelse: 'Guidad rundtur och provning i små grupper', bokning: 'Boka guidad provning i förväg via vingårdens hemsida', info: 'Modern bodega i utkanten av Binissalem, öppnad 2007, med ekologisk odling inom D.O. Binissalem. Besöken görs medvetet i små grupper.', signaturvin: 'Ses Nines', eko: true, web: 'https://www.tiannanegre.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vinyes_Mortitx.jpg/1920px-Vinyes_Mortitx.jpg', bildAlt: 'Illustrationsbild: vinrankor på vintern med kalkstensberg bakom, Mortitx', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
  { namn: 'Son Sureda Ric', plats: 'Manacor', prisnivå: 3, typ: 'Liten, ekologisk', passarFör: 'Par, privata sällskap', upplevelse: 'Privat visning med provning och tapas', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Liten ekologisk familjevingård vid vägen mot Colònia de Sant Pere. Provningen serveras med mallorkinska tapas.', eko: true, bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Puig_de_son_segu%C3%AD.jpg/1920px-Puig_de_son_segu%C3%AD.jpg', bildAlt: 'Illustrationsbild: gröna vinrankor i en vingård i Santa Maria del Camí', maps: 'https://maps.google.com/?q=Son+Sureda+Ric+Manacor+Mallorca' },
  { namn: 'Bodega Can Coleto', plats: 'Petra', prisnivå: 2, typ: 'Liten, ekologisk', passarFör: 'Par, små sällskap', upplevelse: 'Provning på gården', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Liten ekologisk familjevingård inom D.O. Pla i Llevant, grundad 2000.', signaturvin: 'Blanc de Negres', eko: true, bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/1920px-Vinya_a_Estellencs_%28Mallorca%29.JPG', bildAlt: 'Illustrationsbild: vinrankor på terrasser vid Estellencs', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Petra+Mallorca' },
  { namn: 'Vins Nadal', plats: 'Binissalem', prisnivå: 1, typ: 'Traditionell familjevingård', passarFör: 'Budgetmedvetna', upplevelse: 'Rundtur och provning', bokning: 'Boka besök och provning i förväg via vingårdens hemsida eller per telefon', info: 'Familjevingård i Binissalem sedan 1932. Enkel, ärlig och prisvärd.', signaturvin: 'Albaflor', web: 'https://www.vinsnadal.com', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torrent_Fals.jpg/1920px-Torrent_Fals.jpg', bildAlt: 'Illustrationsbild: vinrankor i röd jord vid Santa Maria del Camí med Tramuntanabergen bakom', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
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
          Mallorca har två ursprungsbeteckningar för vin, D.O. Binissalem och D.O. Pla i Llevant, och dessutom många producenter som säljer under Vi de la Terra Mallorca. De flesta vingårdar tar emot besök med provning – men boka alltid i förväg, och kontrollera öppettiderna, som ändras med säsongen.
        </p>

        <div className={styles.list}>
          {vingårdar.map((v, i) => (
            <article key={v.namn} className={styles.card}>
              <div className={styles.media}>
                <Image src={v.bild} alt={v.bildAlt} fill sizes="(max-width: 639px) 100vw, 440px" loading={i < 2 ? 'eager' : 'lazy'} />
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
                  <span className={styles.metaItem}><IconPin size={12} /> {v.plats}</span>
                </div>

                <p className={styles.info}>{v.info}</p>

                <dl className={styles.facts}>
                  <div>
                    <dt className={styles.factLabel}>Typ</dt>
                    <dd className={styles.factValue}>{v.typ}</dd>
                  </div>
                  <div>
                    <dt className={styles.factLabel}>Passar för</dt>
                    <dd className={styles.factValue}>{v.passarFör}</dd>
                  </div>
                  <div className={styles.wide}>
                    <dt className={styles.factLabel}>Upplevelse</dt>
                    <dd className={styles.factValue}>{v.upplevelse}</dd>
                  </div>
                  <div className={styles.wide}>
                    <dt className={styles.factLabel}>Bokning</dt>
                    <dd className={styles.factValue}>{v.bokning}</dd>
                  </div>
                  {v.signaturvin && (
                    <div className={styles.wide}>
                      <dt className={styles.factLabel}>Signaturvin</dt>
                      <dd className={`${styles.factValue} ${styles.signature}`}>{v.signaturvin}</dd>
                    </div>
                  )}
                </dl>

                <div className={styles.actions}>
                  <a href={v.maps} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    <IconMap size={14} stroke={1.8} /> Visa på karta ↗
                  </a>
                  {v.web && (
                    <a href={v.web} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      Hemsida <IconExternal size={13} stroke={1.8} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <TipBox tone="info" heading="Bra att veta" as="p" className={styles.note}>
          <p>De flesta vingårdar ligger 20–40 min bilväg från Palma. Räkna med 1,5–2 timmar per besök. Boka alltid i förväg på de små gårdarna – särskilt på lördagar.</p>
        </TipBox>

        <LastChecked
          date="2026-11-20"
          sources={[
            { label: 'Mallorca.com: vingårdar', href: 'https://www.mallorca.com/en/food-drink/wineries' },
            { label: 'Can Vidalet: besök och provning', href: 'https://www.canvidalet.com/pages/wine-tasting-in-mallorca' },
            { label: 'Illes Balears: Son Sureda Ric', href: 'https://illesbalears.travel/en/mallorca/winery-son-sureda-ric' },
            { label: 'Illes Balears: Vins Nadal', href: 'https://www.illesbalears.travel/en/mallorca/winery-vins-nadal-albaflor' },
            { label: 'Vinetur: Can Coleto (D.O. Pla i Llevant)', href: 'https://www.vinetur.com/2021031563656/exito-de-la-bodega-can-coleto-dop-pla-i-llevant-en-catavinum-2021.html' },
            { label: 'Mallorca.com: Bodega Ribas', href: 'https://www.mallorca.com/en/food-drink/wineries/bodegas-ribas' },
            { label: 'Mallorca.com: Binigrau', href: 'https://www.mallorca.com/es/directorio/empresa/binigrau-biniali-uwpkucpk' },
            { label: 'Mallorca.com: Can Majoral', href: 'https://www.mallorca.com/es/directorio/empresa/can-majoral-sat-algaida-udxv7koi' },
            { label: 'Illes Balears: Vinya Taujana', href: 'https://www.illesbalears.travel/en/mallorca/winery-vinya-taujana' },
            { label: 'Mallorca.com: Vins Miquel Gelabert', href: 'https://www.mallorca.com/en/food-drink/wineries/vins-miquel-gelabert' },
            { label: 'Illes Balears: Finca Son Bordils', href: 'https://www.illesbalears.travel/en/mallorca/winery-finca-son-bordils' },
            { label: 'Mallorca.com: Son Prim', href: 'https://www.mallorca.com/en/food-drink/wineries/bodega-son-prim' },
            { label: 'Mallorca.com: Celler Tianna Negre', href: 'https://www.mallorca.com/en/food-drink/wineries/celler-tianna-negre' },
            { label: 'Mallorca.com: Macià Batle', href: 'https://www.mallorca.com/es/gastronomia/bodegas/macia-batle' },
            { label: 'Mallorca.com: José L. Ferrer', href: 'https://www.mallorca.com/en/food-drink/wineries/jose-l-ferrer' },
          ]}
        />
      </div>
    </div>
  );
}
