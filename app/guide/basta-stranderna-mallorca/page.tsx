import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import HubLink from '../HubLink';
import LastChecked from '@/app/components/LastChecked';
import h from '../headings.module.css';
import styles from './page.module.css';

const stränder = [
  {
    rank: 1,
    namn: 'Caló des Moro',
    region: 'Östkusten · Santanyí',
    typ: 'Stenvik · Kristallklart vatten',
    beskrivning: 'Caló des Moro är utan tvekan en av Mallorcas allra vackraste stränder. Det turkosa vattnet är så klart att du ser botten långt ut i viken. Stranden är liten – bara omkring 40 meter – vilket gör att den snabbt fylls på sommaren.',
    insider: 'Kom senast kl. 8.30 på högsommaren. Parkeringen är liten, och sista biten – ungefär en kilometer från vägen mot S’Almunia – går du till fots.',
    gps: '39.3138° N, 3.1215° E',
    bästaTid: 'Juni eller september – juli och augusti är för trångt',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg', bildAlt: 'Caló des Moro sedd från klipporna – turkost vatten mellan kalkstensklippor och tallskog',
  },
  {
    rank: 2,
    namn: 'Es Trenc',
    region: 'Sydkusten · Campos',
    typ: 'Sandstrand · ca 2 km lång',
    beskrivning: 'Es Trenc kallas Mallorcas Karibien – och det är förtjänt. Den drygt 2 kilometer långa stranden med vit sand och turkost vatten ligger i ett skyddat naturområde, vilket innebär inga hotell och lite kommersialisering.',
    insider: 'Ta med vatten och skugga – servicen längs stranden är begränsad. En del av stranden används av naturister. Parkeringarna kostar pengar och fylls tidigt; bussen från Campos är ett alternativ.',
    gps: '39.3447° N, 2.9758° E',
    bästaTid: 'Maj och september – stranden är lång, men parkeringen räcker inte till på sommaren',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Es_Trenc%2C_playa%2C_al_fondo_Sa_R%C3%A1pita.jpg/1920px-Es_Trenc%2C_playa%2C_al_fondo_Sa_R%C3%A1pita.jpg', bildAlt: 'Klart, grunt vatten vid den långa sandstranden Es Trenc',
  },
  {
    rank: 3,
    namn: 'Cala Mondragó',
    region: 'Östkusten · Portopetro',
    typ: 'Naturpark · Snorkling',
    beskrivning: 'Cala Mondragó ligger i Mondragó naturpark och består av två sammankopplade vikar – s\'Amarador och Cala Mondragó. Vattnet är kristallklart och fullt av marint liv – här är snorklingen riktigt fin.',
    insider: 'Snorkla tidigt på morgonen innan båtarna börjar trafikera viken. Ta med egen snorkelutrustning – Portopetro ligger bara några minuter bort med bil.',
    gps: '39.3489° N, 3.1858° E',
    bästaTid: 'Maj till oktober – naturparken är öppen hela året',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cala_Mondrag%C3%B3_03.jpg/1920px-Cala_Mondrag%C3%B3_03.jpg', bildAlt: 'Cala Mondragó – turkos vik med förankrade båtar och klippor med tallar',
  },
  {
    rank: 4,
    namn: 'Cala Figuera',
    region: 'Sydkusten · Santanyí',
    typ: 'Pittoresk fiskeby · Klart vatten',
    beskrivning: 'Cala Figuera är inte en traditionell badstrand – det är en liten fiskeby med en av Mallorcas vackraste naturhamnar. Klipphyllor att bada från, smaragdgrönt vatten och fiskebåtar som glider förbi.',
    insider: 'Parkeringen är begränsad, så kom tidigt. Ta en frukost eller lunch på något av kaféerna med utsikt över hamnen.',
    gps: '39.3281° N, 3.1692° E',
    bästaTid: 'Hela säsongen – minst turister tidigt på morgonen',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Strukturen_am_Wasser_002_2017_11_14.jpg/1920px-Strukturen_am_Wasser_002_2017_11_14.jpg', bildAlt: 'Fiskarhus med båtgarage och båtar i hamnviken i Cala Figuera',
  },
  {
    rank: 5,
    namn: 'Platja de Muro',
    region: 'Norr · Alcúdia',
    typ: 'Sandstrand · Familjevänlig',
    beskrivning: 'Platja de Muro är Mallorcas bästa familjestrand. 5 km sandstrand med grunt vatten, bra service och ett lugnt hav som gör den perfekt för barn i alla åldrar.',
    insider: 'Mitt för de stora hotellen är det trängst – gå en bit längs stranden, gärna mot sanddynerna, för lugnare avsnitt med färre turister.',
    gps: '39.8201° N, 3.1142° E',
    bästaTid: 'Maj–oktober. Varmast i vattnet juli–september.',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Platja_de_Muro_R02.jpg/1920px-Platja_de_Muro_R02.jpg', bildAlt: 'Platja de Muro – sandstrand och grunt vatten med utsikt över Alcúdiabukten',
  },
];

export default function BästaSträndernaGuide() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg"
        alt="Caló des Moro på södra Mallorca – turkost vatten mellan kalkstensklippor och tallskog"
        photoCredit="Foto: Tommie Hansen / Wikimedia Commons (CC BY 2.0)"
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

            <Image src={strand.bild} alt={strand.bildAlt} width={800} height={400} sizes="(max-width: 860px) 100vw, 800px" className={styles.image} />

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
            { rank: 6, namn: 'Cala Agulla', region: 'Nordöst · Capdepera', tips: 'Blå flagg och tallskog i ett skyddat naturområde nära Cala Rajada.' },
            { rank: 7, namn: 'Cala Pi', region: 'Sydkust · Llucmajor', tips: 'Smal vik med klippväggar – en av öns vackraste silhuetter.' },
            { rank: 8, namn: 'Cala Llombards', region: 'Sydkust · Santanyí', tips: 'Lugn och avskild vik med klippor runt om. Liten strandbar på plats.' },
            { rank: 9, namn: 'Platja de Formentor', region: 'Nordkust · Pollença', tips: 'Dagtid mitten av maj–mitten av oktober begränsas biltrafiken – ta bussen eller båten från Port de Pollença.' },
            { rank: 10, namn: 'Cala Rajada', region: 'Nordöst', tips: 'Livlig sommardestination med bra restauranger längs stranden.' },
            { rank: 11, namn: 'Cala Major', region: 'Väst · Palma', tips: 'Den närmaste hyggliga stranden från Palma. 15 min med taxi.' },
            { rank: 12, namn: 'Platja de Palma', region: 'Palma', tips: 'Lång stadsstrand med allt – bra om du inte har bil.' },
            { rank: 13, namn: 'Cala Santanyí', region: 'Sydkust', tips: 'Pittoresk vik med klart, turkost vatten.' },
            { rank: 14, namn: 'Cala Mesquida', region: 'Nordöst · Capdepera', tips: 'Sand, sanddyner och ibland surfvågor. Lugnt och vackert.' },
            { rank: 15, namn: 'Es Caragol', region: 'Sydkust (kräver promenad)', tips: 'En av Mallorcas mest orörda stränder. Ingen väg ända fram – gå längs kusten från fyren vid Ses Salines och ta med vatten.' },
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
          <Link href="/strandar" className="btn btn-on-dark">Se alla 30 stränder →</Link>
        </div>

        <LastChecked
          date="2026-11-18"
          note="Fakta om längd, service och tillgänglighet följer strandsidan, som granskades samtidigt."
          sources={[
            { label: 'Spain.info: Caló des Moro', href: 'https://www.spain.info/fr/plage/calo-d-es-moro-santanyi/' },
            { label: 'DGT: trafik till Formentor 2026', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
            { label: 'Consell de Mallorca: stränder', href: 'https://www.infomallorca.net' },
          ]}
        />
      </div>
    </div>
  );
}
