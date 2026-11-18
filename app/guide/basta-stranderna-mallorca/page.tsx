import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import HubLink from '../HubLink';
import h from '../headings.module.css';
import styles from './page.module.css';

const stränder = [
  {
    rank: 1,
    namn: 'Caló des Moro',
    region: 'Östkusten · Santanyí',
    typ: 'Stenvik · Kristallklart vatten',
    beskrivning: 'Caló des Moro är utan tvekan en av Mallorcas allra vackraste stränder. Det turkosa vattnet är så klart att du kan se botten på 8 meters djup. Stranden är liten – bara 30 meter bred – vilket gör att den snabbt fylls på sommaren.',
    insider: 'Kom senast kl. 8.30 på högsommaren. Parkeringen längs vägen är begränsad till 20–30 bilar. Alternativt: parkera i Cala Llombards och vandra 25 min.',
    gps: '39.3289° N, 3.2158° E',
    bästaTid: 'Juni eller september – juli och augusti är för trångt',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    rank: 2,
    namn: 'Es Trenc',
    region: 'Sydkusten · Campos',
    typ: 'Sandstrand · 3 km lång',
    beskrivning: 'Es Trenc kallas Mallorcas Karibien – och det är förtjänt. Den 3 kilometer långa stranden med vit sand och turkost vatten är skyddad som naturreservat, vilket innebär inga hotell, inga parasoll att hyra och minimal kommersialisering.',
    insider: 'Ta med allt själv – det finns en matvagn men ingenting annat. Naturistdelen börjar längst till höger om du är vänd mot havet. Bästa parkeringen är vid Ses Covetes (norra änden) – billigare och kortare kö.',
    gps: '39.3447° N, 2.9758° E',
    bästaTid: 'Maj och september – stranden är 3 km lång, men parkeringen räcker inte till på sommaren',
    bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80',
  },
  {
    rank: 3,
    namn: 'Cala Mondragó',
    region: 'Östkusten · Portopetro',
    typ: 'Naturreservat · Snorkling',
    beskrivning: 'Cala Mondragó är ett av Mallorcas naturreservat och består av två sammankopplade vikar – S\'Amarador och Cala Mondragó. Vattnet är kristallklart och fullt av marint liv. Snorkling här är en upplevelse i världsklass.',
    insider: 'Snorkla tidigt på morgonen innan båtarna börjar trafikera viken. Hyr utrustning i byn Portopetro (5 min i bil) – det är billigare än på stranden.',
    gps: '39.3489° N, 3.1858° E',
    bästaTid: 'Maj till oktober – reservatet är öppet hela året men bäst sikt under sen sommar',
    bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=800&q=80',
  },
  {
    rank: 4,
    namn: 'Cala Figuera',
    region: 'Sydkusten · Santanyí',
    typ: 'Pittoresk fiskeby · Klart vatten',
    beskrivning: 'Cala Figuera är inte en traditionell badstrand – det är en liten fiskeby med en av Mallorcas vackraste naturhamnar. Klipphyllor att hoppa från, smaragdgrönt vatten och fiskebåtar som glider förbi.',
    insider: 'Bästa klipphoppen finns på norra sidan av viken. Parkeringen är gratis men begränsad. Ät frukost på Café Cala Figuera med utsikt över hamnen.',
    gps: '39.3281° N, 3.1692° E',
    bästaTid: 'Hela säsongen – minst turister tidigt på morgonen',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    rank: 5,
    namn: 'Platja de Muro',
    region: 'Norr · Alcúdia',
    typ: 'Sandstrand · Familjevänlig',
    beskrivning: 'Platja de Muro är Mallorcas bästa familjestrand. 5 km sandstrand med grunt vatten, bra service och ett lugnt hav som gör den perfekt för barn i alla åldrar.',
    insider: 'Undvik hotellsektionen mitt på stranden – gå 500 m söderut mot Cap des Pinar för lugnare och vackrare avsnitt med färre turister.',
    gps: '39.8201° N, 3.1142° E',
    bästaTid: 'Maj–oktober. Vattnet håller jämn temperatur hela säsongen.',
    bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800&q=80',
  },
];

export default function BästaSträndernaGuide() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Turkost vatten och vit sandstrand på Mallorca – öns vackraste stränder"
        kicker="Lokal guide · Uppdaterad 2026"
        title="Mallorcas 15 bästa stränder – vår topplista"
        subtitle="Rankade av en som bott på ön i 10 år. Med GPS-koordinater, parkeringstips och ärliga råd om när du ska undvika dem."
        height="55vh"
      />

      <div className={styles.container}>

        <HubLink
          text="Det här är vår topplista med motivering. Vill du se alla 30 stränder, sorterade efter region och typ, finns de på strandsidan."
          href="/strandar"
          label="Se alla stränder på Mallorca"
        />

        {/* Snabbguide */}
        <div className={styles.quick}>
          <p className={styles.quickLabel}>Snabbguide – topp 5 för olika resenärer</p>
          <ul className={styles.quickList}>
            <li><strong>Vackraste stranden:</strong> Caló des Moro (östkusten)</li>
            <li><strong>Bäst för familjer:</strong> Platja de Muro (norr)</li>
            <li><strong>Mest orörda:</strong> Es Caragol (inga vägar, kräver vandring)</li>
            <li><strong>Bäst snorkling:</strong> Cala Mondragó (naturreservat)</li>
            <li><strong>Närmast Palma:</strong> Cala Major (15 min)</li>
          </ul>
        </div>

        {/* Strand-artiklar */}
        {stränder.map((strand) => (
          <article key={strand.rank} className={styles.beach}>
            <div className={styles.beachHead}>
              <span className={styles.rank}>{strand.rank}.</span>
              <div>
                <h2 className={`${h.h2} ${styles.beachTitle}`}>{strand.namn}</h2>
                <p className={styles.beachMeta}>{strand.region} · {strand.typ}</p>
              </div>
            </div>

            <Image src={strand.bild} alt={strand.namn} width={800} height={400} sizes="(max-width: 860px) 100vw, 800px" className={styles.image} />

            <p className={styles.description}>{strand.beskrivning}</p>

            <div className={styles.insider}>
              <p className={styles.insiderLabel}>Insidertips</p>
              <p className={styles.insiderText}>{strand.insider}</p>
            </div>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <p className={styles.factLabel}>GPS</p>
                <p className={styles.factValue}>{strand.gps}</p>
              </div>
              <div className={styles.fact}>
                <p className={styles.factLabel}>BÄSTA TID</p>
                <p className={styles.factValue}>{strand.bästaTid}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Stränder 6–15: kompaktlista */}
        <section className={styles.list}>
          <h2 className={`${h.h2} ${styles.listTitle}`}>Stränder 6–15: hela listan</h2>
          {[
            { rank: 6, namn: 'Cala Agulla', region: 'Nordöst · Capdepera', tips: 'Skyddad nationalpark, bra surf tidiga morgnar.' },
            { rank: 7, namn: 'Cala Pi', region: 'Sydkust · Llucmajor', tips: 'Smal vik med klippväggar – en av öns vackraste silhuetter.' },
            { rank: 8, namn: 'Cala Llombards', region: 'Sydkust · Santanyí', tips: 'Lugn, grund och barnvänlig. Lokalt kafé med hembakat.' },
            { rank: 9, namn: 'Platja de Formentor', region: 'Nordkust · Pollença', tips: 'Bussbiljett krävs juli–aug – inga privata bilar tillåts.' },
            { rank: 10, namn: 'Cala Rajada', region: 'Nordöst', tips: 'Livlig sommardestination med bra restauranger längs stranden.' },
            { rank: 11, namn: 'Cala Major', region: 'Väst · Palma', tips: 'Den närmaste hyggliga stranden från Palma. 15 min med taxi.' },
            { rank: 12, namn: 'Platja de Palma', region: 'Palma', tips: 'Lång stadsstrand med allt – bra om du inte har bil.' },
            { rank: 13, namn: 'Cala Santanyí', region: 'Sydkust', tips: 'Pittoresk, med lokalt kafé och klart, turkost vatten.' },
            { rank: 14, namn: 'Cala Mesquida', region: 'Nordöst · Capdepera', tips: 'Sand, sanddyner och ibland surfvågor. Lugnt och vackert.' },
            { rank: 15, namn: 'Es Caragol', region: 'Sydkust (kräver 40 min vandring)', tips: 'Mallorcas mest orörda strand. Inga vägar dit – ta med vatten.' },
          ].map((s) => (
            <div key={s.rank} className={styles.row}>
              <span className={styles.rowRank}>{s.rank}.</span>
              <div>
                <p className={styles.rowName}>{s.namn} <span className={styles.rowRegion}>· {s.region}</span></p>
                <p className={styles.rowTip}>{s.tips}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className={styles.cta}>
          <h2 className={h.h2}>Vill du utforska alla 30 stränder?</h2>
          <p className={styles.ctaText}>Filtrera på region, typ och vad du letar efter i vår kompletta strandguide.</p>
          <Link href="/strandar" className={styles.ctaButton}>SE ALLA 30 STRÄNDER →</Link>
        </div>
      </div>
    </div>
  );
}
