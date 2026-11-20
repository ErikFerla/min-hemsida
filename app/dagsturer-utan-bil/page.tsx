import type { ReactNode } from 'react';
import TipBox from '@/components/TipBox';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/app/components/JsonLd';
import LastChecked from '@/app/components/LastChecked';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';
import h from '@/app/guide/headings.module.css';
import styles from './page.module.css';

const PATH = '/dagsturer-utan-bil';
const TITLE = 'Dagsturer utan bil från Palma';
const HEADLINE = 'Dagsturer utan bil från Palma';
const DESCRIPTION =
  'Sju dagsturer från Palma med buss, tåg och båt: Sóller med tåg och spårvagn, Valldemossa och Deià med buss 203, marknaden i Inca, Pollença och Alcúdia.';
const IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/S%C3%B3ller_Tren_de_S%C3%B3ller-4334.jpg/1920px-S%C3%B3ller_Tren_de_S%C3%B3ller-4334.jpg';
const PUBLISHED = '2026-11-18';
const CHECKED = '2026-11-20';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE,
  imageAlt: 'Tren de Sóller, det gamla trätåget, på stationen i Sóller',
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
    datePublished: PUBLISHED,
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

type Trip = {
  id: string;
  title: string;
  how: string;
  time: string;
  price: string;
  text: ReactNode;
};

const TRIPS: Trip[] = [
  {
    id: 'soller',
    title: '1. Sóller och Port de Sóller – tåg och spårvagn',
    how: 'Ferrocarril de Sóller från stationen vid Plaça d’Espanya, sedan spårvagnen från Sóller till Port de Sóller',
    time: 'Ca 1 timme med tåget till Sóller',
    price: 'Ca 30 € tur och retur för vuxen, ca 40 € tur och retur med spårvagnen till Port de Sóller (2026)',
    text: (
      <>
        Det gamla tåget går genom Serra de Tramuntana med tunnlar och utsikt över Sóllerdalen. Gå runt
        i Sóller, ta spårvagnen ner till hamnen och ät lunch vid vattnet. Från Port de Sóller går också{' '}
        <Link href="/batutflykter-och-cabrera">båtar till Sa Calobra</Link>. Vintern 2026/27 står tåget
        still för underhåll från 23 november 2026 till och med 31 januari 2027 – då går TIB-buss 204 mellan
        Palma och Sóller. Spårvagnen ersätts av buss 23 november–21 december 2026.
      </>
    ),
  },
  {
    id: 'valldemossa-deia',
    title: '2. Valldemossa och Deià – buss 203',
    how: 'TIB-buss 203 från Estació Intermodal (Plaça d’Espanya), som går Palma – Valldemossa – Deià – Sóller – Port de Sóller',
    time: 'Drygt en halvtimme till Valldemossa, Deià ligger längre fram på linjen – exakta tider i tidtabellen på tib.org',
    price: 'Ordinarie TIB-taxa efter sträcka – se tib.org',
    text: (
      <>
        Två av Tramuntanas mest kända byar på samma busslinje. Börja i Valldemossa med kartusianklostret
        och de smala gränderna, fortsätt till Deià. Linjen är mycket populär på sommaren och bussarna kan
        bli fulla – åk tidigt. Sedan juli 2026 kan boende med Targeta Única eller Targeta Intermodal
        boka plats på en av avgångarna från Port de Sóller.
      </>
    ),
  },
  {
    id: 'rundtur',
    title: '3. Rundturen: tåget dit, bussen hem',
    how: 'Tåget Palma – Sóller, sedan buss 203 Port de Sóller/Sóller – Deià – Valldemossa – Palma',
    time: 'En heldag',
    price: 'Tågbiljett enkel resa ca 23 € (2026) plus busstaxa',
    text: (
      <>
        Kombinera de två första turerna: tåget över bergen till Sóller på förmiddagen och buss 203
        tillbaka längs kusten på eftermiddagen, med stopp i Deià eller Valldemossa på vägen. Du ser
        både dalen och kustvägen utan att köra själv.
      </>
    ),
  },
  {
    id: 'inca',
    title: '4. Marknaden i Inca på torsdagar – tåg T1',
    how: 'SFM-tåget T1 Palma – Inca från Estació Intermodal',
    time: 'Ca 35–40 min',
    price: 'Ordinarie SFM-taxa – se tib.org',
    text: (
      <>
        Inca har en stor veckomarknad på torsdagar, och staden är känd för läder och skor. Tåget T1
        stannar också i Binissalem, centrum för ett av öns vinområden – se{' '}
        <Link href="/vingardar">vingårdar på Mallorca</Link>.
      </>
    ),
  },
  {
    id: 'sineu',
    title: '5. Marknaden i Sineu på onsdagar – tåg T3',
    how: 'SFM-tåget T3 Palma – Manacor, av i Sineu',
    time: 'Ca 50 min',
    price: 'Ordinarie SFM-taxa – se tib.org',
    text: (
      <>
        Sineu ligger mitt på ön och har en av Mallorcas mest traditionella veckomarknader, med
        lantbruksprodukter och djur vid sidan av stånden. Kom tidigt – marknaden är livligast på
        förmiddagen.
      </>
    ),
  },
  {
    id: 'pollenca',
    title: '6. Pollença och Port de Pollença – buss 301',
    how: 'TIB-buss 301 Palma – Inca – Sa Pobla – Pollença – Port de Pollença',
    time: 'En heldag; bussen stannar på flera orter längs vägen',
    price: 'Ordinarie TIB-taxa efter sträcka – se tib.org',
    text: (
      <>
        Gå trapporna upp till Calvari i Pollença och fortsätt till Port de Pollença för bad och lunch.
        Därifrån går båtar över bukten till Formentorstranden – se{' '}
        <Link href="/batutflykter-och-cabrera">båtutflykter</Link>.
      </>
    ),
  },
  {
    id: 'alcudia',
    title: '7. Alcúdia och Port d’Alcúdia – buss 302',
    how: 'TIB-buss 302 Palma – Inca – Alcúdia – Port d’Alcúdia – Platja d’Alcúdia – Platja de Muro – Can Picafort',
    time: 'En heldag',
    price: 'Ordinarie TIB-taxa efter sträcka – se tib.org',
    text: (
      <>
        Alcúdias gamla stad har medeltida stadsmurar som du kan gå längs. Port d&apos;Alcúdia och
        Platja de Muro har långa, grunda sandstränder, och naturparken s&apos;Albufera ligger nära – se{' '}
        <Link href="/barn/natur-och-utomhus">natur och utomhus</Link>.
      </>
    ),
  },
];

const SOURCES = [
  { label: 'TIB: buss 203 och platsbokning från 1 juli 2026', href: 'https://www.tib.org/es/w/ja-es-pot-sol%C2%B7licitar-la-reserva-de-pla%C3%A7a-per-a-l-autob%C3%BAs-del-tib-de-la-l%C3%ADnia-203-a-la-serra-un-dels-refor%C3%A7os-adre%C3%A7ats-als-residents-a-partir-de-l-1-de-juliol' },
  { label: 'TIB: linjerna 301 och 302', href: 'https://www.tib.org/en/w/els-usuaris-del-bus-tib-milloren-la-connectivitat-amb-la-zona-de-pollen%C3%A7a-i-la-badia-d-alc%C3%BAdia-a-partir-del-1-d-abril' },
  { label: 'TIB: tåglinjer och tidtabeller', href: 'https://www.tib.org/es/lineas-y-horarios/metro/-/linia/T3' },
  { label: 'Ferrocarril de Sóller', href: 'https://www.trendesoller.com' },
  { label: 'Fibwi Diario: Sóllertågets och spårvagnens vinteruppehåll 2026/27', href: 'https://www.fibwidiario.com/baleares/mallorca/tren-tranvia-soller-paran-lunes-son-fechas-regreso/20261118112127327898.html' },
  { label: 'Imperial Properties: Sóllertåget 2026 och kollektivtrafik', href: 'https://www.imperial-properties.com/es/blog/transporte-publico-gratuito-mallorca-2026-lo-que-deben-saber-residentes-y-propietarios' },
];

export default function DagsturerPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <HeroImage
        src={IMAGE}
        alt="Tren de Sóller, det gamla trätåget, på stationen i Sóller"
        photoCredit="Foto: Isiwal / Wikimedia Commons (CC BY-SA 4.0)"
        kicker="Kollektivtrafik"
        title={HEADLINE}
        subtitle="Sju utflykter med buss, tåg och båt – utan hyrbil och parkeringsletande."
        height="50vh"
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <p className={styles.lead}>
          Från Palma når du stora delar av Mallorca med kollektivtrafik. TIB-bussarna och SFM-tågen
          utgår från Estació Intermodal under Plaça d&apos;Espanya, och det historiska Sóllertåget har
          sin egen station alldeles intill. Här är sju dagsturer som fungerar bra utan bil.
        </p>

        <TipBox tone="info" className={styles.note}>
          <p>
          Tidtabeller och priser ändras mellan sommar- och vintersäsong. Kontrollera alltid avgångarna
          i TIB:s reseplanerare på tib.org före resan, och åk tidigt på sommaren – populära linjer som
          buss 203 blir fulla.
        </p>
        </TipBox>

        <section className={styles.section} aria-labelledby="turer">
          <h2 id="turer" className={`${h.h2} ${styles.sectionTitle}`}>
            Sju dagsturer
          </h2>
          <ul className={styles.cards}>
            {TRIPS.map((t) => (
              <li key={t.id} id={t.id} className={styles.card}>
                <h3 className={`${h.h3} ${styles.cardTitle}`}>{t.title}</h3>
                <p className={styles.cardText}>{t.text}</p>
                <dl className={styles.facts}>
                  <dt>Så åker du</dt>
                  <dd>{t.how}</dd>
                  <dt>Restid</dt>
                  <dd>{t.time}</dd>
                  <dt>Pris</dt>
                  <dd>{t.price}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="mer">
          <h2 id="mer" className={`${h.h2} ${styles.sectionTitle}`}>
            Mer att läsa
          </h2>
          <div className={styles.links}>
            <Link href="/byar" className="btn btn-secondary">Byar på Mallorca</Link>
            <Link href="/batutflykter-och-cabrera" className="btn btn-secondary">Båtutflykter</Link>
            <Link href="/evenemang" className="btn btn-secondary">Evenemang</Link>
            <Link href="/soller" className="btn btn-secondary">Sóller</Link>
          </div>
        </section>

        <LastChecked
          date={CHECKED}
          note="Linjenummer och sträckor är kontrollerade mot TIB. Aktuella biljettpriser för TIB-bussar och SFM-tåg, även för 2027, finns på tib.org."
          sources={SOURCES}
        />
      </div>
    </div>
  );
}
