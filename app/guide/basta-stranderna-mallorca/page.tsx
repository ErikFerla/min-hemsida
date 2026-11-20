import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import CardTip from '@/components/CardTip';
import HubLink from '../HubLink';
import LastChecked from '@/app/components/LastChecked';
import h from '../headings.module.css';
import styles from './page.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const stränder = [
  {
    rank: 1,
    namn: 'Caló des Moro',
    region: 'Sydkusten · Santanyí',
    typ: 'Stenvik · Kristallklart vatten',
    beskrivning: 'Caló des Moro är utan tvekan en av Mallorcas allra vackraste stränder. Det turkosa vattnet är så klart att du ser botten långt ut i viken. Stranden är liten – bara omkring 40 meter – vilket gör att den snabbt fylls på sommaren.',
    insider: 'Kom före kl. 9 på sommaren. Parkeringen är liten, och sista biten – ungefär en kilometer från vägen mot S’Almunia – går du till fots.',
    gps: '39.3138° N, 3.1215° E',
    bästaTid: 'Juni eller september – juli och augusti är för trångt',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg', bildAlt: 'Caló des Moro sedd från klipporna – turkost vatten mellan kalkstensklippor och tallskog',
  },
  {
    rank: 2,
    namn: 'Es Trenc',
    region: 'Sydkusten · Campos',
    typ: 'Sandstrand · 2–3 km lång',
    beskrivning: 'Es Trenc har ljus sand och grunt, klart vatten – och inga hotell bakom dynerna. Den 2–3 kilometer långa stranden med vit sand och turkost vatten ligger i ett skyddat naturområde, vilket innebär inga hotell och lite kommersialisering.',
    insider: 'Ta med vatten och skugga – servicen längs stranden är begränsad. En del av stranden används av naturister. Parkeringarna kostar pengar och fylls tidigt; bussen från Campos är ett alternativ.',
    gps: '39.3447° N, 2.9758° E',
    bästaTid: 'Maj och september – stranden är lång, men parkeringen räcker inte till på sommaren',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Es_Trenc%2C_playa%2C_al_fondo_Sa_R%C3%A1pita.jpg/1920px-Es_Trenc%2C_playa%2C_al_fondo_Sa_R%C3%A1pita.jpg', bildAlt: 'Klart, grunt vatten vid den långa sandstranden Es Trenc',
  },
  {
    rank: 3,
    namn: 'Cala Mondragó',
    region: 'Sydkusten · Portopetro',
    typ: 'Naturpark · Snorkling',
    beskrivning: 'Cala Mondragó ligger i Mondragó naturpark och består av två sammankopplade vikar – s\'Amarador och Cala Mondragó. Vattnet är kristallklart och fullt av marint liv – här är snorklingen riktigt fin.',
    insider: 'Snorkla tidigt på morgonen innan båtarna börjar trafikera viken. Ta med egen snorkelutrustning.',
    gps: '39.3489° N, 3.1858° E',
    bästaTid: 'Maj till oktober – naturparken är öppen hela året',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cala_Mondrag%C3%B3_03.jpg/1920px-Cala_Mondrag%C3%B3_03.jpg', bildAlt: 'Cala Mondragó – turkos vik med förankrade båtar och klippor med tallar',
  },
  {
    rank: 4,
    namn: 'Cala Figuera – bad från klipporna i fiskeläget',
    region: 'Sydkusten · Santanyí',
    typ: 'Fiskeläge · Klart vatten',
    beskrivning: 'Cala Figuera är inte en traditionell badstrand – det är ett litet fiskeläge i en smal, djup naturhamn. Klipphyllor att bada från, smaragdgrönt vatten och fiskebåtar som glider förbi.',
    insider: 'Parkeringen är begränsad, så kom tidigt. Ta en frukost eller lunch på något av kaféerna med utsikt över hamnen.',
    gps: '39.3281° N, 3.1692° E',
    bästaTid: 'Hela säsongen – minst turister tidigt på morgonen',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Strukturen_am_Wasser_002_2017_11_14.jpg/1920px-Strukturen_am_Wasser_002_2017_11_14.jpg', bildAlt: 'Fiskarhus med båtgarage och båtar i hamnviken i Cala Figuera',
  },
  {
    rank: 5,
    namn: 'Platja de Muro',
    region: 'Norr · Muro',
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
        kicker="Strandguide"
        title="Mallorcas 15 bästa stränder – vår topplista"
        subtitle="Våra favoriter, med GPS-koordinater, parkeringstips och ärliga råd om när du ska undvika dem."
        height="55vh"
      />

      <div className={styles.container}>
        <Breadcrumbs spaced items={[{ name: 'Hem', url: '/' }, { name: 'Guider', url: '/guider' }, { name: 'Mallorcas 15 bästa stränder – vår topplista', url: '/guide/basta-stranderna-mallorca' }]} />


        <HubLink
          text="Det här är vår topplista med motivering. På strandsidan finns 30 stränder sorterade efter region och typ – många från topplistan och flera andra."
          href="/strandar"
          label="Se alla stränder på Mallorca"
        />

        {/* Snabbguide: faktaruta */}
        <section className={`${h.facts} ${styles.quick}`} aria-labelledby="snabbguide">
          <p id="snabbguide" className={styles.quickLabel}>Snabbguide – topp 5 för olika resenärer</p>
          <dl>
            <div><dt>Vackraste stranden</dt><dd>Caló des Moro (sydkusten)</dd></div>
            <div><dt>Bäst för familjer</dt><dd>Platja de Muro (norr)</dd></div>
            <div><dt>Mest orörda</dt><dd>Es Caragol (inga vägar, kräver vandring)</dd></div>
            <div><dt>Bäst snorkling</dt><dd>Cala Mondragó (naturreservat)</dd></div>
            <div><dt>Närmast Palma</dt><dd>Cala Major (15 min)</dd></div>
          </dl>
        </section>

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

            <CardTip label="Insidertips" className={styles.insider}>{strand.insider}</CardTip>

            <div className={h.facts}>
              <dl className={styles.factList}>
                <div><dt>GPS</dt><dd>{strand.gps}</dd></div>
                <div><dt>Bästa tid</dt><dd>{strand.bästaTid}</dd></div>
              </dl>
            </div>
          </article>
        ))}

        {/* Stränder 6–15: kompaktlista */}
        <section className={styles.list}>
          <h2 className={`${h.h2} ${styles.listTitle}`}>Stränder 6–15: hela listan</h2>
          {[
            { rank: 6, namn: 'Cala Agulla', region: 'Nordost · Capdepera', tips: 'Blå flagg och tallskog i ett skyddat naturområde nära Cala Rajada.' },
            { rank: 7, namn: 'Cala Pi', region: 'Sydkust · Llucmajor', tips: 'Smal vik mellan höga klippväggar.' },
            { rank: 8, namn: 'Cala Llombards', region: 'Sydkust · Santanyí', tips: 'Lugn och avskild vik med klippor runt om. Liten strandbar på plats.' },
            { rank: 9, namn: 'Platja de Formentor', region: 'Nordkust · Pollença', tips: 'Dagtid mitten av maj–mitten av oktober begränsas biltrafiken – ta bussen eller båten från Port de Pollença.' },
            { rank: 10, namn: 'Cala Rajada', region: 'Nordost', tips: 'Livlig sommardestination med bra restauranger längs stranden.' },
            { rank: 11, namn: 'Cala Major', region: 'Väst · Palma', tips: 'Den närmaste hyggliga stranden från Palma. 15 min med taxi.' },
            { rank: 12, namn: 'Platja de Palma', region: 'Palma', tips: 'Lång stadsstrand med allt – bra om du inte har bil.' },
            { rank: 13, namn: 'Cala Santanyí', region: 'Sydkust', tips: 'Pittoresk vik med klart, turkost vatten.' },
            { rank: 14, namn: 'Cala Mesquida', region: 'Nordost · Capdepera', tips: 'Sand, sanddyner och ibland surfvågor. Lugnt och vackert.' },
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
          <h2 className={h.h2}>Vill du se fler stränder?</h2>
          <p className={styles.ctaText}>Filtrera på region, typ och vad du letar efter i vår kompletta strandguide.</p>
          <Link href="/strandar" className="btn btn-primary">Se alla 30 stränder →</Link>
        </div>

        <LastChecked
          date="2026-11-20"
          note="Parkering, avgifter och service vid stränderna ändras mellan säsongerna – kontrollera på plats innan du åker."
          sources={[
            { label: 'Spain.info: Caló des Moro', href: 'https://www.spain.info/fr/plage/calo-d-es-moro-santanyi/' },
            { label: 'Spain.info: Es Trenc', href: 'https://www.spain.info/es/playa/es-trenc/' },
            { label: 'DGT: trafik till Formentor 2026', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
            { label: 'Consell de Mallorca: stränder', href: 'https://www.infomallorca.net' },
          ]}
        />
      </div>
    </div>
  );
}
