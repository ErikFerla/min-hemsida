import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/app/components/JsonLd';
import LastChecked from '@/app/components/LastChecked';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';
import h from '@/app/guide/headings.module.css';
import styles from './page.module.css';

const PATH = '/batutflykter-och-cabrera';
const TITLE = 'Båtutflykter på Mallorca och Cabrera';
const HEADLINE = 'Båtutflykter och Cabrera';
const DESCRIPTION =
  'Båtturer på Mallorca: Sa Calobra från Port de Sóller, Formentor från Port de Pollença, glasbottenbåtar, katamaraner och nationalparken Cabrera.';
const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/View_of_Isla_de_Cabrera_National_Park%2C_Mallorca_%28Spain%29_%2823407630506%29.jpg/1920px-View_of_Isla_de_Cabrera_National_Park%2C_Mallorca_%28Spain%29_%2823407630506%29.jpg';
const CHECKED = '2026-11-18';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Hamnviken på Cabrera med ankrade segelbåtar, sedd uppifrån',
});

const breadcrumbs = [
  { name: 'Hem', url: '/' },
  { name: HEADLINE, url: PATH },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: HEADLINE,
    description: DESCRIPTION,
    image: [IMAGE],
    datePublished: CHECKED,
    dateModified: CHECKED,
    inLanguage: 'sv-SE',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${PATH}` },
    url: `${BASE_URL}${PATH}`,
    author: { '@type': 'Organization', name: 'MyMallorca', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'MyMallorca', url: BASE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${BASE_URL}${b.url}`,
    })),
  },
];

const SOURCES = [
  { label: 'Parques Nacionales (MITECO): Cabrera', href: 'https://www.miteco.gob.es/en/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/cabrera/conservacion-biodiversidad.html' },
  { label: 'MITECO: utvidgningen av Cabrera 2019', href: 'https://www.miteco.gob.es/eu/prensa/ultimas-noticias/2019/02/el_gobierno_apruebalaampliaciondelparquenacionaldelarchipielagod.html' },
  { label: 'Govern de les Illes Balears: besökscentret för Cabrera', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/centro_de_visitantes_del_pn_cabrera/' },
  { label: 'Govern de les Illes Balears: refugiet på Cabrera och tillstånd', href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/refugio_de_cabrera-64720/' },
  { label: 'Click Mallorca: Cabreraturer 2026', href: 'https://www.click-mallorca.com/excursiones/excursion-isla-cabrera/' },
  { label: 'CheckYeti: glasbottenbåtar på Mallorca', href: 'https://www.checkyeti.com/en/boat-tours/spain/mallorca/glass-bottom-boat-trips' },
  { label: 'CheckYeti: båtturer från Port de Sóller', href: 'https://www.checkyeti.com/en/boat-tours/spain/port-de-soller/boat-tours' },
  { label: 'Barceló: katamaran i Palmabukten', href: 'https://www.barcelo.com/guia-turismo/en/spain/majorca/experiences/474/' },
];

export default function BatutflykterPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <HeroImage
        src={IMAGE}
        alt="Hamnviken på Cabrera med ankrade segelbåtar, sedd uppifrån"
        photoCredit="Foto: Tommie Hansen / Wikimedia Commons (CC BY 2.0)"
        kicker="Upplevelser till havs"
        title={HEADLINE}
        subtitle="Mallorca från vattnet – från Tramuntanas klippkust till nationalparken söder om ön."
        height="50vh"
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <p className={styles.lead}>
          Vissa av Mallorcas vackraste platser ser du bäst från havet. Här är de klassiska båtturerna
          och hur du tar dig till Cabrera, Spaniens största nationalpark. Vi länkar inte till
          bokningssidor – boka direkt hos rederierna i hamnen eller på deras egna webbplatser. Alla
          båtturer är väderberoende och kan ställas in när det blåser.
        </p>

        <section className={styles.section} aria-labelledby="klassiska">
          <h2 id="klassiska" className={`${h.h2} ${styles.sectionTitle}`}>
            Klassiska båtturer
          </h2>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Port de Sóller – Sa Calobra</h3>
              <p className={styles.cardText}>
                Båtarna går längs Serra de Tramuntanas branta kust till Sa Calobra, där du kan gå
                genom tunnlarna till ravinen Torrent de Pareis. Sjövägen slipper du den kurviga
                bilvägen ner till Sa Calobra. Turen passar bra ihop med{' '}
                <Link href="/dagsturer-utan-bil">tåget från Palma till Sóller</Link>.
              </p>
              <dl className={styles.facts}>
                <dt>Avgår från</dt>
                <dd>Hamnen i Port de Sóller</dd>
                <dt>Restid</dt>
                <dd>Ca 2 timmar till sjöss tur och retur, plus tid i land</dd>
                <dt>Säsong</dt>
                <dd>Under turistsäsongen; turerna ställs in vid hård sjö</dd>
              </dl>
            </li>
            <li className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Port de Pollença – Platja de Formentor</h3>
              <p className={styles.cardText}>
                En kort överfart över Pollençabukten till stranden på Formentorhalvön, med tallskog
                ända ner till vattnet. Ett enkelt sätt att nå stranden utan bil. Från Port
                d&apos;Alcúdia går också längre turer ut mot Formentor.
              </p>
              <dl className={styles.facts}>
                <dt>Avgår från</dt>
                <dd>Hamnen i Port de Pollença (även turer från Port d&apos;Alcúdia)</dd>
                <dt>Restid</dt>
                <dd>Ca 30 min enkel resa från Port de Pollença</dd>
                <dt>Säsong</dt>
                <dd>Från våren till hösten, tätare avgångar på sommaren</dd>
              </dl>
            </li>
            <li className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Glasbottenbåtar</h3>
              <p className={styles.cardText}>
                Bra med små barn: ni ser fisk och sjögräsängar genom glasbotten utan att bli blöta.
                Turerna går bland annat från Cala Millor och Cala Bona, Porto Cristo, Cala d&apos;Or
                och från Santa Ponça och Peguera ut mot öarna Malgrats. Många turer har ett badstopp.
              </p>
              <dl className={styles.facts}>
                <dt>Restid</dt>
                <dd>Oftast 2–3 timmar</dd>
                <dt>Säsong</dt>
                <dd>Sommarhalvåret, ungefär maj–oktober</dd>
              </dl>
            </li>
            <li className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Katamaran i Palmabukten</h3>
              <p className={styles.cardText}>
                Katamaranturer från Palma och s’Arenal, ofta på eftermiddagen eller vid solnedgång,
                med badstopp i en vik och ibland grillmat ombord. Ett populärt val för par – se även{' '}
                <Link href="/mallorca-for-par">Mallorca för par</Link>.
              </p>
              <dl className={styles.facts}>
                <dt>Restid</dt>
                <dd>1,5–5 timmar beroende på tur</dd>
                <dt>Pris</dt>
                <dd>Ca 55–85 € per vuxen (2026); hos vissa rederier halva priset för barn</dd>
              </dl>
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="cabrera">
          <h2 id="cabrera" className={`${h.h2} ${styles.sectionTitle}`}>
            Cabrera – nationalparken söder om Mallorca
          </h2>
          <p className={styles.text}>
            Cabrera är en ögrupp söder om Mallorca som blev nationalpark 1991. År 2019 utvidgades
            parken med stora havsområden till drygt 90 000 hektar, och den är i dag Spaniens största
            nationalpark räknat med havet. Öarna är nästan orörda. Här lever bland annat den baleariska
            ödlan, som bara finns på Balearerna – på Cabreras små öar finns flera egna
            underarter.
          </p>

          <h3 className={`${h.h3} ${styles.cardTitle}`}>Så tar du dig dit</h3>
          <ul className={styles.list}>
            <li>
              Båtturerna går från <strong>Colònia de Sant Jordi</strong> på sydkusten. Överfarten tar
              45–60 minuter.
            </li>
            <li>
              Det finns heldagsturer (ca 6 timmar, med flera timmar på ön) och kortare turer (ca 3
              timmar). En typisk tur stannar för bad vid grottan Sa Cova Blava om vädret tillåter.
            </li>
            <li>Pris: ca 50–60 € för vuxna och ca 30 € för barn 3–12 år (2026).</li>
            <li>
              Säsongen är främst vår till höst. Boka i förväg under maj–september, platserna är
              begränsade.
            </li>
          </ul>

          <h3 className={`${h.h3} ${styles.cardTitle}`}>Med egen båt</h3>
          <p className={styles.note}>
            Med egen båt eller hyrbåt behöver du ett tillstånd från parken för att segla in i
            nationalparken, och ett tillstånd för att förtöja vid parkens bojar. Ansök i förväg via
            Govern de les Illes Balears webbplats för Cabrera – du behöver uppgifter om skeppare,
            ägare och båt.
          </p>

          <h3 className={`${h.h3} ${styles.cardTitle}`}>Besökscentret i Colònia de Sant Jordi</h3>
          <p className={styles.text}>
            Vid hamnen i Colònia de Sant Jordi ligger parkens besökscenter med utställningar om
            Cabreras natur och hav – bra före eller efter båtturen, eller om sjön är för grov för att
            åka ut.
          </p>
          <dl className={styles.facts}>
            <dt>Pris</dt>
            <dd>Vuxna 8 €, barn 3–12 år 4 € (2026)</dd>
            <dt>Öppet</dt>
            <dd>10–17 vintertid, 10–18 juni–september; stängt i december och januari</dd>
          </dl>
          <p className={styles.text}>
            Det finns också ett enkelt refugi på Cabrera för den som vill övernatta. Det bokas via
            Govern de les Illes Balears.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="mer">
          <h2 id="mer" className={`${h.h2} ${styles.sectionTitle}`}>
            Mer att läsa
          </h2>
          <div className={styles.links}>
            <Link href="/strandar" className={styles.linkButton}>Stränder</Link>
            <Link href="/aktiviteter" className={styles.linkButton}>Aktiviteter</Link>
            <Link href="/dagsturer-utan-bil" className={styles.linkButton}>Dagsturer utan bil</Link>
            <Link href="/barn" className={styles.linkButton}>Mallorca med barn</Link>
          </div>
        </section>

        <LastChecked
          date={CHECKED}
          note="Priser och tidtabeller ändras från säsong till säsong. Kontrollera alltid hos rederiet före resan."
          sources={SOURCES}
        />
      </div>
    </div>
  );
}
