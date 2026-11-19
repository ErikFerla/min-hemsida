import Link from 'next/link';
import TipBox from '@/components/TipBox';
import { IconPlane } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import LastChecked from '@/app/components/LastChecked';
import TransferTabell from '@/app/hyrbil-och-transport/TransferTabell';
import { avreseorter, CHECKED, SOURCES } from '@/data/transport';
import h from '../guide/headings.module.css';
import FlygSok from './FlygSok';
import styles from './flyg.module.css';

const skyscanner = (kod: string) =>
  `https://www.skyscanner.se/transport/flyg/${kod.toLowerCase()}/pmi/?adults=1&currency=SEK&locale=sv-SE`;

const tips = [
  { text: 'Skollov, påsk och juli–augusti är dyrast. Kan du resa i maj, juni eller september brukar det bli billigare.' },
  { text: 'Vintertid flyger färre bolag direkt. Jämför med en mellanlandning eller flyg från Kastrup.' },
  { text: 'Tidiga morgonflyg och sena kvällsflyg är ofta billigast – men tänk på hur du tar dig vidare från PMI sent på kvällen.' },
  { text: 'Kontrollera vad som ingår. Hos lågprisbolagen kostar incheckat bagage och platsval ofta extra.' },
];

export default function FlygPage() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Palma_de_Mallorca_Airport_%2836705997953%29.jpg/1920px-Palma_de_Mallorca_Airport_%2836705997953%29.jpg"
        alt="Palmas flygplats Son Sant Joan med terminalen och flygplan vid gaterna"
        photoCredit="Foto: Hugh Llewelyn / Wikimedia Commons (CC BY-SA 2.0)"
        kicker="Res till Mallorca"
        title="Flyg till Mallorca"
        subtitle="Direktflyg från Sverige, flygtider och hur du tar dig vidare från flygplatsen i Palma"
        height="55vh"
      />

      <div className={styles.container}>
        <p className={styles.lead}>
          Alla flyg till Mallorca landar på Palmas flygplats Son Sant Joan (PMI), några kilometer öster om Palma.
          Från Sverige tar ett direktflyg ungefär tre till fyra timmar. Här ser du vilka avreseorter som brukar ha
          direktflyg, och hur du kommer vidare till din ort när du har landat.
        </p>

        <FlygSok />

        {/* Direktflyg */}
        <section aria-labelledby="direktflyg" className={styles.block}>
          <h2 id="direktflyg" className={`${h.h2} ${styles.blockTitle}`}>
            Direktflyg till Palma från Sverige
          </h2>
          <p className={styles.text}>
            Utbudet ändras från säsong till säsong. Flygbolagens sommarprogram gäller från slutet av mars till slutet
            av oktober, och det är då de flesta direktflygen går. På vintern finns färre avgångar och färre avreseorter.
            Uppgifterna nedan gäller 2026 – kontrollera alltid hos flygbolaget innan du bokar.
          </p>

          <div className={styles.routeGrid}>
            {avreseorter.map((a) => (
              <article key={a.kod} className={styles.airport}>
                <div className={styles.airportIcon}><IconPlane size={26} /></div>
                <h3 className={`${h.h3} ${styles.airportName}`}>{a.namn}</h3>
                <p className={styles.route}>{a.kod} → PMI</p>
                <dl className={styles.facts}>
                  <dt>Flygbolag</dt>
                  <dd>{a.flygbolag}</dd>
                  <dt>Säsong</dt>
                  <dd>{a.sasong}</dd>
                  <dt>Flygtid</dt>
                  <dd>{a.flygtid}</dd>
                </dl>
                <a href={skyscanner(a.kod)} target="_blank" rel="noopener noreferrer" className={`link-arrow ${styles.airportLink}`}>
                  Sök flyg från {a.kod} <span aria-hidden="true">→</span>
                  <span className="sr-only"> (öppnas i ny flik)</span>
                </a>
              </article>
            ))}
          </div>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Från andra svenska flygplatser</h3>
          <p className={styles.text}>
            Från mindre flygplatser går det i regel bara charter, och bara vissa veckor på sommaren. Sommaren 2026 flög
            Ving till Palma bland annat från Jönköping (tisdagar 28 april–16 juni). Från Umeå och Luleå har vi inte
            hittat några direktflyg till Palma 2026 – därifrån flyger du enklast via Arlanda. Charterprogrammen för
            sommaren 2027 släpps successivt hos researrangörerna.
          </p>
        </section>

        {/* Transfer */}
        <section aria-labelledby="fran-flygplatsen" className={styles.block}>
          <h2 id="fran-flygplatsen" className={`${h.h2} ${styles.blockTitle}`}>
            Från flygplatsen till din ort
          </h2>
          <p className={styles.text}>
            Bussarna går från flygplatsens busshållplats – följ skyltarna från ankomsthallen. Palmas stadsbuss A1 går in till centrum, och TIB:s
            flygbussar (Aerotib) går direkt till flera kustorter. På TIB-bussarna betalar du enklast med bankkort eller
            mobil, både när du kliver på och när du kliver av – det är billigare än kontant. Taxi finns utanför
            ankomsthallen; taxametern gäller och ett flygplatstillägg ingår i priset.
          </p>
          <TransferTabell caption="Ungefärliga restider och priser från Palmas flygplats (PMI), 2026" />
          <p className={styles.text}>
            Ska du till Sóller, Deià eller sydöstra kusten, eller vill du röra dig fritt på ön, är hyrbil ofta enklast.
            Läs mer om bilhyra, bussar, tåg och taxi i vår guide{' '}
            <Link href="/hyrbil-och-transport" className={styles.inlineLink}>Hyrbil och transport på Mallorca</Link>.
            Undrar du var du ska bo? Se{' '}
            <Link href="/var-ska-man-bo" className={styles.inlineLink}>Var ska man bo på Mallorca</Link>.
          </p>
        </section>

        {/* Tips */}
        <TipBox heading="Tips för billigare flyg till Mallorca" as="h2" className={styles.tips}>
          <ul>
            {tips.map((t) => (
              <li key={t.text}>{t.text}</li>
            ))}
          </ul>
        </TipBox>

        <LastChecked
          date={CHECKED}
          note="Flygbolagens utbud och priserna på bussar och taxi ändras. Kontrollera alltid hos flygbolaget och trafikbolaget innan du reser."
          sources={[
            SOURCES.flightconnectionsArn,
            SOURCES.norwegianSkavsta,
            SOURCES.flightconnectionsGot,
            SOURCES.flightconnectionsCph,
            SOURCES.sasKastrup,
            SOURCES.swedaviaMalmo,
            SOURCES.jonkoping,
            SOURCES.tibVinter,
            SOURCES.tibSommar,
            SOURCES.taxi,
          ]}
        />
      </div>
    </div>
  );
}
