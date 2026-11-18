import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import LastChecked from '@/app/components/LastChecked';
import { BASE_URL, buildPageMetadata } from '@/app/lib/city-seo';
import { SNITTFART_KMH, VÄGFAKTOR, ortSlugs, type Orter } from '@/app/lib/planner';
import { getCity } from '@/data/cities';
import ResplanVerktyg from './ResplanVerktyg';
import styles from './page.module.css';

const PATH = '/resplan';
const TITLE = 'Resplan för Mallorca – dag för dag med karta';
const DESCRIPTION =
  'Gör en egen resplan för Mallorca dag för dag, med förslag för förmiddag, eftermiddag och kväll, karta och körtider. Byt och flytta dagar, dela eller skriv ut.';

export const metadata = buildPageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg/1920px-Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg',
  imageAlt: 'Katedralen La Seu i Palma speglad i dammen i Parc de la Mar – planera din resa till Mallorca',
});

// Kortare visningsnamn än i data/cities.ts där det behövs
const visningsnamn: Partial<Record<string, string>> = {
  'palma-de-mallorca': 'Palma',
  'porto-petro': 'Portopetro',
};

/** Namn och koordinater för dagarnas orter, från data/cities.ts. Bara det här skickas till klienten. */
const orter = Object.fromEntries(
  ortSlugs.map(slug => {
    const c = getCity(slug);
    if (!c) throw new Error(`Resplanen pekar på orten "${slug}", som saknas i data/cities.ts`);
    return [slug, { slug, name: visningsnamn[slug] ?? c.name, lat: c.lat, lng: c.lng }];
  }),
) as Orter;

const fart = String(SNITTFART_KMH);
const faktor = String(VÄGFAKTOR).replace('.', ',');

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}${PATH}`,
    inLanguage: 'sv-SE',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Resplan', item: `${BASE_URL}${PATH}` },
    ],
  },
];

export default function ResplanPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.kicker}>Resplanerare</p>
          <h1 className={styles.title}>Din resplan för Mallorca, dag för dag</h1>
          <p className={styles.ingress}>
            Välj hur länge du reser och vad du gillar, så får du en plan med förslag för förmiddag, eftermiddag och kväll,
            karta, ungefärliga körtider och länkar till våra guider. Byt ut och flytta dagar tills planen passar dig – och
            dela den med resesällskapet eller skriv ut den.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <ResplanVerktyg orter={orter} baseUrl={BASE_URL} />

        <section aria-labelledby="sa-fungerar" className={styles.about}>
          <h2 id="sa-fungerar" className={styles.h2}>Så fungerar resplanen</h2>
          <ul className={styles.aboutList}>
            <li>
              <strong>Ordnad efter område.</strong> Dagarna går i en rundtur: Palma, västra Mallorca och Serra de
              Tramuntana, norr, inlandet, öster och söder. Längre resor får en eller två lediga dagar att ha i reserv om
              vädret slår om.
            </li>
            <li>
              <strong>Körtiderna är en schablon.</strong> Avståndet räknas fågelvägen mellan dagarnas orter, gånger{' '}
              {faktor} för vägens slingor, och tiden med en snittfart på {fart} km/h. Det stämmer ungefär med
              ruttplanerarnas tider för till exempel Palma–Sóller och Palma–Alcúdia. På bergsvägarna i Serra de
              Tramuntana och på sommaren tar det ofta längre tid – kontrollera alltid i en kartapp innan du kör.
            </li>
            <li>
              <strong>Utgångspunkten är närmaste ort på sajten.</strong> Stränder och utflyktsmål utanför orterna (till
              exempel Es Trenc eller Formentor) räknas från närmaste ort som har en egen sida här, så den sista biten
              tillkommer.
            </li>
            <li>
              <strong>Planen finns bara i länken.</strong> Vi sparar ingenting och du behöver inget konto. Kopiera länken
              eller använd Dela för att skicka planen, och Skriv ut för att spara den som PDF.
            </li>
            <li>
              <strong>Kontrollera öppettider och biljetter.</strong> Förslagen innehåller inga öppettider eller priser –
              de ändras över året. Följ länkarna till våra sidor om stränder, sevärdheter och{' '}
              <Link href="/barn" className={styles.link}>Mallorca med barn</Link>, och se vad som händer under din resa
              i <Link href="/evenemang" className={styles.link}>evenemangskalendern</Link>.
            </li>
          </ul>
          <p className={styles.back}>
            Vill du hellre göra ett snabbt val? Använd <Link href="/#resplanerare" className={styles.link}>resplaneraren på startsidan</Link>.
          </p>
        </section>

        <LastChecked
          date="2026-11-18"
          note="Restiderna är en schablon som jämförts med ruttplanerares tider för Palma–Sóller, Palma–Alcúdia och Palma–Santanyí."
          sources={[
            { label: 'Ajuntament de Palma – Palma–Sóller', href: 'https://palmavirtual.palma.es/-/palma-s%C3%B3ller-/de/' },
            { label: 'Ferrocarril de Sóller', href: 'https://trendesoller.com/eng/train/' },
            { label: 'Illes Balears – Coves del Drach', href: 'https://illesbalears.travel/en/mallorca/visit-the-caves-of-drach' },
            { label: 'Safari Mallorca – planera besöket', href: 'https://safarimallorca.es/en/prepara-tu-visita/' },
            { label: 'Mallorca.com – Carrer del Calvari', href: 'https://www.mallorca.com/en/guide/sights/carrer-del-calvari' },
            { label: 'Majorca Daily Bulletin – veckomarknader', href: 'https://majorcadailybulletin.com/holiday/attractions/2024/09/12/127375/weekly-markets-across-mallorca.html' },
          ]}
        />
      </div>
    </div>
  );
}
