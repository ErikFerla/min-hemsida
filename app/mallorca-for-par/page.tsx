import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/app/components/JsonLd';
import LastChecked from '@/app/components/LastChecked';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';
import h from '@/app/guide/headings.module.css';
import styles from './page.module.css';

const PATH = '/mallorca-for-par';
const TITLE = 'Mallorca för par – vin, golf och lugna byar';
const HEADLINE = 'Mallorca för par';
const DESCRIPTION =
  'Mallorca för par i alla åldrar: vingårdar, golf, stränder, restauranger, solnedgångar och lugna bergsbyar – med konkreta förslag och länkar vidare.';
const IMAGE = 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec';
const CHECKED = '2026-11-18';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: `${IMAGE}?w=1200&h=630&fit=crop&q=85`,
  imageAlt: 'Stenhus och berg i en by i Serra de Tramuntana',
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
    image: [`${IMAGE}?w=1200&h=630&fit=crop&q=85`],
    datePublished: CHECKED,
    dateModified: CHECKED,
    inLanguage: 'sv-SE',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${PATH}` },
    url: `${BASE_URL}${PATH}`,
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
  { label: 'Castell de Bellver (Ajuntament de Palma)', href: 'https://castelldebellver.palma.es' },
  { label: 'Es Baluard Museu', href: 'https://esbaluard.org' },
  { label: 'Visit Palma: CaixaForum', href: 'https://visitpalma.com/es/event/visita-comentada-conoce-caixaforum-palma/' },
  { label: "Govern de les Illes Balears: Parc Natural de s'Albufera", href: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_se_albufera_de_mallorca/' },
  { label: 'Mallorca Global Mag: tåg till Festa des Vermar 2026', href: 'https://mallorcaglobalmag.es/trenes-festa-des-vermar-2026-binissalem-horarios/' },
  { label: 'Barceló: katamaran i Palmabukten', href: 'https://www.barcelo.com/guia-turismo/en/spain/majorca/experiences/474/' },
];

export default function ParPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <HeroImage
        src={IMAGE}
        alt="Stenhus och berg i en by i Serra de Tramuntana"
        kicker="För två"
        title={HEADLINE}
        subtitle="Vin, golf, stränder och lugna byar – för par i alla åldrar."
        height="50vh"
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <p className={styles.lead}>
          Mallorca är lika mycket en ö för två som för barnfamiljer. Här har vi samlat det vi själva
          tycker passar bäst för par – oavsett om ni reser på smekmånad, firar en bröllopsdag eller har
          tid över efter pensionen. Vi tipsar inte om hotell och har inga bokningslänkar.
        </p>

        <section className={styles.section} aria-labelledby="vin">
          <h2 id="vin" className={`${h.h2} ${styles.sectionTitle}`}>Vingårdar och vinbyar</h2>
          <p className={styles.text}>
            Mallorca har två skyddade ursprungsbeteckningar för vin, Binissalem och Pla i Llevant, och
            många vingårdar tar emot besökare för provning. Binissalem ligger på tåglinjen T1 mellan
            Palma och Inca, så ni kan ta tåget och slippa välja vem som ska köra. I september firar
            Binissalem skörden med Festa des Vermar.
          </p>
          <div className={styles.links}>
            <Link href="/vingardar" className={styles.linkButton}>Vingårdar på Mallorca</Link>
            <Link href="/dagsturer-utan-bil#inca" className={styles.linkButton}>Med tåg till Inca och Binissalem</Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="golf">
          <h2 id="golf" className={`${h.h2} ${styles.sectionTitle}`}>Golf</h2>
          <p className={styles.text}>
            Ön har golfbanor för alla nivåer, från lättspelade parkbanor till banor med havsutsikt.
            Vår- och höstmånaderna är behagligast för golf – på sommaren är det ofta för varmt mitt på
            dagen.
          </p>
          <div className={styles.links}>
            <Link href="/aktiviteter/golf" className={styles.linkButton}>Golfbanorna</Link>
            <Link href="/guide/golf-mallorca-guide" className={styles.linkButton}>Golfguiden</Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="strand">
          <h2 id="strand" className={`${h.h2} ${styles.sectionTitle}`}>Stränder för två</h2>
          <p className={styles.text}>
            Välj små vikar en vardag tidigt på morgonen eller sent på eftermiddagen, när dagsturisterna
            har åkt. Naturparken Mondragó på sydöstra kusten har två skyddade vikar och skyltade
            promenadslingor mellan dem.
          </p>
          <div className={styles.links}>
            <Link href="/strandar" className={styles.linkButton}>Alla stränder</Link>
            <Link href="/guide/basta-stranderna-mallorca" className={styles.linkButton}>Topp 15 stränder</Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="mat">
          <h2 id="mat" className={`${h.h2} ${styles.sectionTitle}`}>Restauranger</h2>
          <p className={styles.text}>
            Palma har allt från små tapasbarer i gamla stan till kockdrivna restauranger. Utanför
            staden är det ofta byarnas enkla restauranger med lokala råvaror som blir resans
            höjdpunkt.
          </p>
          <div className={styles.links}>
            <Link href="/mat" className={styles.linkButton}>Mat på Mallorca</Link>
            <Link href="/guide/basta-restauranger-palma" className={styles.linkButton}>Bästa restaurangerna i Palma</Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="solnedgang">
          <h2 id="solnedgang" className={`${h.h2} ${styles.sectionTitle}`}>Solnedgångar</h2>
          <ul className={styles.list}>
            <li>
              <strong>Katamaran i Palmabukten.</strong> Kvällsturer med badstopp och ibland mat
              ombord, ca 55–85 € per person (2026). Mer på{' '}
              <Link href="/batutflykter-och-cabrera">båtutflykter</Link>.
            </li>
            <li>
              <strong>Castell de Bellver.</strong> Slottet har utsikt över hela Palmabukten. Under
              vintermånaderna (oktober–mars) stänger det kl. 18 på vardagar, och i november–januari går
              solen ner före stängning – då hinner ni se den från taket. Entré 4 €, gratis på söndagar,
              men då stänger slottet redan kl. 15.
            </li>
            <li>
              <strong>Västkusten.</strong> Byarna längs Tramuntanakusten, som Deià, vetter mot
              nordväst och havet – en drink vid solnedgången där är svår att slå.
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="byar">
          <h2 id="byar" className={`${h.h2} ${styles.sectionTitle}`}>Lugna byar</h2>
          <p className={styles.text}>
            Valldemossa, Deià och Sóller i bergen, Artà i nordost och Santanyí i sydost är byar att
            strosa i en hel dag. Valldemossa och Deià når ni med buss 203 från Palma, och Sineu i
            inlandet har marknad på onsdagar – lätt att nå med tåg.
          </p>
          <div className={styles.links}>
            <Link href="/byar" className={styles.linkButton}>Byar på Mallorca</Link>
            <Link href="/dagsturer-utan-bil" className={styles.linkButton}>Dagsturer utan bil</Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="kultur">
          <h2 id="kultur" className={`${h.h2} ${styles.sectionTitle}`}>Kultur och natur</h2>
          <ul className={styles.list}>
            <li>
              <strong>Es Baluard</strong> – modern konst i Palmas gamla stadsmur med utsikt över
              hamnen. Tis–lör 10–20, sön 10–15.
            </li>
            <li>
              <strong>CaixaForum Palma</strong> – utställningar i det modernistiska tidigare Gran
              Hotel, öppet dagligen 10–20.
            </li>
            <li>
              <strong>Naturparken s&apos;Albufera</strong> – fågelskådning i öns största våtmark.
              Gratis, men hämta tillstånd i receptionen vid Sa Roca (9–16).
            </li>
            <li>
              <strong>Cabrera</strong> – en dagstur med båt från Colònia de Sant Jordi till
              nationalparken söder om ön. Se{' '}
              <Link href="/batutflykter-och-cabrera#cabrera">Cabrera</Link>.
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="spa">
          <h2 id="spa" className={`${h.h2} ${styles.sectionTitle}`}>Spa och lugna dagar</h2>
          <p className={styles.text}>
            Spa finns framför allt på hotellen. Vi tipsar inte om enskilda hotell, men fråga på ert
            eget – flera tar emot gäster för behandlingar. Vill ni ha det lugnt, res utanför juli och
            augusti: se <Link href="/guide/basta-tid-resa-mallorca">bästa tiden att resa</Link>.
          </p>
        </section>

        <LastChecked
          date={CHECKED}
          note="Öppettider och priser ändras – kontrollera på respektive webbplats före besöket."
          sources={SOURCES}
        />
      </div>
    </div>
  );
}
