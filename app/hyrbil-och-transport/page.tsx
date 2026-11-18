import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked from '@/app/components/LastChecked';
import { CHECKED, SOURCES } from '@/data/transport';
import h from '../guide/headings.module.css';
import TransferTabell from './TransferTabell';
import styles from './page.module.css';

const innehall = [
  { id: 'hyrbil', namn: 'Hyrbil' },
  { id: 'kora-och-parkera', namn: 'Köra och parkera' },
  { id: 'buss', namn: 'Buss' },
  { id: 'tag', namn: 'Tåg' },
  { id: 'taxi', namn: 'Taxi och transfer' },
  { id: 'cykel-och-bat', namn: 'Cykel och båt' },
];

export default function HyrbilOchTransport() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: 'Hyrbil och transport', url: '/hyrbil-och-transport' }]} />
          <p className={styles.kicker}>Ta dig runt på ön</p>
          <h1 className={styles.title}>Hyrbil och transport på Mallorca</h1>
          <p className={styles.subtitle}>
            Allt om bilhyra, parkering, bussar, tåg, taxi, cykel och båt – med ungefärliga priser för 2026.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <p className={styles.lead}>
          Mallorca är lätt att ta sig runt på. Med hyrbil når du bergsbyarna och de små vikarna i din egen takt. Utan
          bil kommer du ändå långt: bussnätet TIB täcker hela ön, tåget går till inlandet och det gamla trätåget tar
          dig över bergen till Sóller. Här är det du behöver veta.
        </p>

        <nav aria-label="Innehåll på sidan" className={styles.toc}>
          <p className={styles.tocTitle}>På sidan</p>
          <ul className={styles.tocList}>
            {innehall.map((i) => (
              <li key={i.id}><a href={`#${i.id}`}>{i.namn}</a></li>
            ))}
          </ul>
        </nav>

        {/* Hyrbil */}
        <section id="hyrbil" aria-labelledby="hyrbil-rubrik" className={styles.section}>
          <h2 id="hyrbil-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Hyrbil – det här ska du tänka på</h2>
          <p className={styles.text}>
            Hyrbil är det smidigaste sättet att se mer än en del av ön, särskilt om du vill till Serra de Tramuntana,
            sydöstra kustens vikar eller byarna i inlandet. Priset du ser vid bokningen är sällan hela priset, så läs
            villkoren innan du bokar.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Försäkring och självrisk</h3>
              <p className={styles.cardText}>
                Trafikförsäkringen (ansvar mot andra) är lagstadgad i Spanien och ingår alltid. Grundskyddet för skador
                på själva bilen har nästan alltid en självrisk – ofta flera hundra euro och ibland över 1 000 €. Däck,
                glas och underrede brukar inte ingå.
              </p>
              <p className={styles.cardText}>
                Vid disken erbjuds en tilläggsförsäkring som tar bort självrisken. Alternativet är en fristående
                självriskförsäkring som du köper före resan, eller att kolla om ditt kreditkort har ett hyrbilsskydd.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Deposition</h3>
              <p className={styles.cardText}>
                Tackar du nej till uthyrarens tilläggsförsäkring spärrar de oftast en deposition på ditt kreditkort.
                Beloppet släpps när bilen lämnats tillbaka utan skador, men det kan ta några dagar. Ha med ett
                kreditkort i förarens namn.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Bränslepolicy</h3>
              <p className={styles.cardText}>
                Välj fullt–fullt: du hämtar bilen med full tank och lämnar den full. Förbetald tank (fullt–tomt) blir
                nästan alltid dyrare, eftersom du betalar för bränsle du inte använder. Spara kvittot från sista
                tankningen.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={`${h.h3} ${styles.cardTitle}`}>Ålder och förare</h3>
              <p className={styles.cardText}>
                Minimiåldern är oftast 21 år, ibland 23, och förare under 25 betalar ofta ett tillägg per dag. Extra
                förare kostar ofta också. Ska ni ha barnstol, boka den i förväg – se vår{' '}
                <Link href="/guide/mallorca-med-barn" className={styles.inlineLink}>guide för familjer</Link>.
              </p>
            </div>
          </div>

          <div className={styles.tip}>
            <p className={styles.tipTitle}>Vid hämtning och återlämning</p>
            <p className={styles.tipText}>
              Fotografera eller filma bilen runt om, och ta en bild på bränslemätaren och mätarställningen – både när du
              hämtar och när du lämnar. Kontrollera att alla skador du ser finns med på avtalet innan du kör iväg.
            </p>
          </div>
        </section>

        {/* Köra och parkera */}
        <section id="kora-och-parkera" aria-labelledby="kora-rubrik" className={styles.section}>
          <h2 id="kora-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Köra och parkera</h2>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Parkering i Palma</h3>
          <p className={styles.text}>
            I Palmas centrum är gatuparkeringen till stor del blå zon (ORA). Där betalar du i automat eller med app, och
            maxtiden är oftast två timmar. Avgift tas vanligen vardagar ungefär 9–14 och 16–20 samt lördag förmiddag;
            kvällar och söndagar brukar vara gratis – läs alltid skylten. Från 1 januari 2027 utökas ORA till fler
            stadsdelar. Enklast är ofta ett parkeringshus och sedan att gå.
          </p>
          <p className={styles.text}>
            Gamla stan har avspärrade områden (ACIRE) där bara behöriga får köra in. De övervakas med kameror, och boten
            kommer i efterhand via hyrbilsfirman. Palma har dessutom en miljözon (ZBE) med
            kameror vid infarterna och böter på upp till 200 €. Fråga uthyraren om bilen får köra in i zonen om du ska
            in till centrum.
          </p>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Byar och kustorter</h3>
          <p className={styles.text}>
            Byarna i Serra de Tramuntana och i inlandet har smala gator och få platser. Parkera i utkanten och gå in.
            Många kommuner har egna blå zoner, särskilt i kustorterna på sommaren. På marknadsdagar fylls parkeringarna
            tidigt, så kom i god tid.
          </p>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Sóllertunneln</h3>
          <p className={styles.text}>
            Tunneln mellan Palma och{' '}
            <Link href="/soller" className={styles.inlineLink}>Sóller</Link> är avgiftsfri sedan december 2017. Den gamla
            bergsvägen över Coll de Sóller är vacker men kurvig och tar betydligt längre tid.
          </p>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Cap de Formentor på sommaren</h3>
          <p className={styles.text}>
            Vägen ut mot fyren på Cap de Formentor stängs för privatbilar på dagtid under sommarhalvåret. 2026 gällde
            det 15 maj–18 oktober, kl. 10–22. Ta i stället buss 334 från Alcúdia via Port de Pollença. Att köra
            förbi bommarna utan tillstånd ger böter på 100–200 €. Datumen för 2027 meddelas av den spanska
            trafikmyndigheten DGT.
          </p>
        </section>

        {/* Buss */}
        <section id="buss" aria-labelledby="buss-rubrik" className={styles.section}>
          <h2 id="buss-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Buss: TIB och EMT</h2>
          <p className={styles.text}>
            Mallorcas regionbussar heter TIB och går mellan Palma och i stort sett alla orter på ön. De flesta linjer
            utgår från bussterminalen under Plaça d’Espanya i Palma (Estació Intermodal). Inne i Palma kör stadsbussarna
            EMT, som är ett eget system.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Betala med bankkort eller mobil.</strong> På TIB blippar du samma kort både när du kliver på och när
              du kliver av. Det är billigare än att betala kontant, och du kan byta buss upp till två gånger på samma
              resa. Sedan 2026 tar även alla EMT-bussar i Palma bankkort.
            </li>
            <li>
              <strong>Ungefärliga priser (kontrollera aktuella priser hos TIB):</strong> flygbussen A11 till sydvästkusten kostar ca 4–7 € och de långa
              flygbussarna till norra och östra kusten ca 8–14 €, beroende på om du betalar med kort eller kontant.
              Stadsbussen A1 från flygplatsen till Palma kostar ca 5 € kontant. Priserna ändras – Palma har aviserat
              höjda busspriser.
            </li>
            <li>
              <strong>Sommar och vinter.</strong> TIB kör sommartidtabell från våren till slutet av oktober och
              vintertidtabell från 1 november, med färre avgångar. Flera expressbussar går bara under sommarsäsongen –
              kontrollera på tib.org om till exempel 515e (Palma–Cala d’Or via Santanyí) eller 411e (Palma–Cala Rajada)
              går när du reser.
            </li>
            <li>
              <strong>Bor du på ön?</strong> Med det personliga Intermodal- eller Única-kortet är resor med TIB-buss,
              tåg och metro gratis under 2026. Om det fortsätter 2027 var inte beslutat i november 2026. Kortet kräver ansökan; villkoren finns hos TIB.
            </li>
          </ul>
          <p className={styles.text}>
            Från flygplatsen går flygbussar direkt till flera kustorter – se tabellen under{' '}
            <a href="#taxi" className={styles.inlineLink}>Taxi och transfer</a>.
          </p>
        </section>

        {/* Tåg */}
        <section id="tag" aria-labelledby="tag-rubrik" className={styles.section}>
          <h2 id="tag-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Tåg</h2>

          <h3 className={`${h.h3} ${styles.subTitle}`}>SFM: Palma–Inca, Sa Pobla och Manacor</h3>
          <p className={styles.text}>
            Pendeltågen (SFM) går från Estació Intermodal vid Plaça d’Espanya ut i inlandet. Alla tre linjer passerar{' '}
            <Link href="/inca" className={styles.inlineLink}>Inca</Link>:
          </p>
          <ul className={styles.list}>
            <li><strong>T1</strong> Palma–Inca</li>
            <li><strong>T2</strong> Palma–Inca–Muro–Sa Pobla</li>
            <li>
              <strong>T3</strong> Palma–Inca–<Link href="/sineu" className={styles.inlineLink}>Sineu</Link>–Petra–
              <Link href="/manacor" className={styles.inlineLink}>Manacor</Link>, drygt en timme hela vägen
            </li>
          </ul>
          <p className={styles.text}>
            Tåget är ett bra sätt att besöka marknaderna i Inca och Sineu utan bil. Biljetten köper du i automaten på
            stationen; samma kort som på TIB-bussarna gäller.
          </p>

          <h3 className={`${h.h3} ${styles.subTitle}`}>Ferrocarril de Sóller</h3>
          <p className={styles.text}>
            Det gamla trätåget mellan Palma och Sóller har gått sedan 1912 och slingrar sig genom Serra de Tramuntana. I
            Sóller tar du spårvagnen vidare ner till{' '}
            <Link href="/port-de-soller" className={styles.inlineLink}>Port de Sóller</Link>. Tåget är ett eget bolag och
            ingår inte i TIB:s system. För turister kostar en enkel resa Palma–Sóller drygt 20 €, och tur och retur med
            spårvagnen ca 40 € (2026). Tåget brukar ha ett uppehåll för underhåll på vintern – vintern 2025/26 öppnade
            det igen 1 februari – så kolla tidtabellen hos Ferrocarril de Sóller innan du åker.
          </p>
        </section>

        {/* Taxi och transfer */}
        <section id="taxi" aria-labelledby="taxi-rubrik" className={styles.section}>
          <h2 id="taxi-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Taxi och transfer från flygplatsen</h2>
          <p className={styles.text}>
            Taxi i Palma och ett tjugotal andra kommuner kör på en gemensam taxa sedan 2025. Taxametern gäller, och från
            flygplatsen tillkommer ett flygplatstillägg på ca 4,65 € per resa (2026). Kvällar, nätter och helgdagar är
            dyrare. En förbokad transfer har fast pris och lönar sig ibland för stora sällskap eller långa resor –
            jämför med taxameterpriset nedan.
          </p>
          <TransferTabell caption="Från Palmas flygplats (PMI) till de stora orterna – ungefärliga tider och priser 2026" />
          <p className={styles.text}>
            Flyger du hit? På vår <Link href="/flyg" className={styles.inlineLink}>flygsida</Link> ser du vilka
            svenska avreseorter som har direktflyg.
          </p>
        </section>

        {/* Cykel och båt */}
        <section id="cykel-och-bat" aria-labelledby="cykel-rubrik" className={styles.section}>
          <h2 id="cykel-rubrik" className={`${h.h2} ${styles.sectionTitle}`}>Cykel och båt</h2>
          <h3 className={`${h.h3} ${styles.subTitle}`}>Cykel</h3>
          <p className={styles.text}>
            Mallorca är ett av Europas populäraste mål för landsvägscykling, med flest cyklister på våren och hösten. I
            de flesta turistorter kan du hyra cykel, även elcykel. För en lugn tur är de platta vägarna i inlandet och
            kring Alcúdiabukten bäst; bergsvägarna i Tramuntana är för vana cyklister. Mer om aktiviteter finns på{' '}
            <Link href="/aktiviteter" className={styles.inlineLink}>aktivitetssidan</Link>.
          </p>
          <h3 className={`${h.h3} ${styles.subTitle}`}>Båt</h3>
          <p className={styles.text}>
            Under säsongen går båtar från Port de Sóller längs bergskusten till Sa Calobra (Barcos Azules) – under en
            timme enkel väg och ett fint sätt att slippa de branta serpentinvägarna. Från de flesta större hamnar går
            utflyktsbåtar på sommaren, och från Palma och Alcúdia går färjor till grannöarna.
          </p>
        </section>

        <div className={styles.tip}>
          <p className={styles.tipTitle}>Vill du klara dig utan bil?</p>
          <p className={styles.tipText}>
            Bo där bussarna och tågen utgår: i{' '}
            <Link href="/palma-de-mallorca" className={styles.inlineLink}>Palma</Link>, i{' '}
            <Link href="/alcudia" className={styles.inlineLink}>Alcúdia</Link> med flygbuss och bussar längs bukten,
            eller i <Link href="/soller" className={styles.inlineLink}>Sóller</Link> med tåg, buss och båt. Fler förslag
            finns i <Link href="/var-ska-man-bo" className={styles.inlineLink}>Var ska man bo på Mallorca</Link>.
          </p>
        </div>

        <LastChecked
          date={CHECKED}
          note="Priser och tidtabeller ändras, särskilt mellan sommar- och vintersäsong. Kontrollera hos TIB, SFM och Ferrocarril de Sóller innan du reser."
          sources={[
            SOURCES.hyrbilsforsakring,
            SOURCES.parkering,
            SOURCES.ora,
            SOURCES.acire,
            SOURCES.zbe,
            SOURCES.sollerTunnel,
            SOURCES.formentor,
            SOURCES.formentor2026,
            SOURCES.tibFragor,
            SOURCES.emtKort,
            SOURCES.tibGratis,
            SOURCES.tibSommar,
            SOURCES.tibVinter,
            SOURCES.tibT3,
            SOURCES.sollerTag,
            SOURCES.sollerTaxa,
            SOURCES.sollerVinter,
            SOURCES.taxi,
          ]}
        />
      </div>
    </div>
  );
}
