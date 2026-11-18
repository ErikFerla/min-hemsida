import Link from 'next/link';
import PraktiskPage, { styles, h } from './_shared/PraktiskPage';

export default function Praktiskt() {
  return (
    <PraktiskPage
      sida="praktiskt"
      kicker="Reseplanering · Bra att veta"
      subtitle="Id-kort, vård, apotek, vatten, öppettider, alkoholregler och regler på stranden – samlat på ett ställe."
      toc={[
        { id: 'resehandlingar', label: 'Pass och id-kort' },
        { id: 'sjukvard', label: 'Sjukvård och 112' },
        { id: 'apotek', label: 'Apotek' },
        { id: 'el-och-vatten', label: 'El och vatten' },
        { id: 'sprak', label: 'Språk' },
        { id: 'oppettider', label: 'Öppettider' },
        { id: 'alkohol', label: 'Alkoholregler' },
        { id: 'stranden', label: 'Regler på stranden' },
        { id: 'sakerhet', label: 'Ficktjuvar, värme och brandrisk' },
      ]}
      related={[
        { href: '/budget-och-priser', title: 'Budget och priser', text: 'Vad kaffe, lunch, buss och turistskatt kostar 2026.' },
        { href: '/vader', title: 'Väder', text: 'Prognos för sju orter och vädret månad för månad.' },
        { href: '/strandar', title: 'Stränder', text: 'Hitta rätt strand för dagen – med eller utan service.' },
        { href: '/vandring-och-cykling', title: 'Vandring och cykling', text: 'Säkerhet i bergen, vatten och värme.' },
        { href: '/barn', title: 'Mallorca med barn', text: 'Aktiviteter för barnfamiljer över hela ön.' },
      ]}
      sources={[
        { label: 'Polisen – giltiga resehandlingar', href: 'https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/giltiga-svenska-resehandlingar/' },
        { label: 'Försäkringskassan – beställ EU-kort', href: 'https://www.forsakringskassan.se/privatperson/resa-arbeta-flytta-studera-eller-fa-vard-utomlands/resa-utomlands/bestall-eu-kort' },
        { label: 'Govern de les Illes Balears – jourapotek 2026', href: 'https://www.caib.es/sites/ordenaciofarmaceutica/es/guardias_ano_2026/' },
        { label: 'Ajuntament de Palma – vatten', href: 'https://palma.es/en/water' },
        { label: 'Euronews – alkoholreglerna 2024', href: 'https://www.euronews.com/travel/2024/05/13/no-more-sun-sex-and-sangria-tourism-in-ibiza-and-mallorca-under-new-alcohol-laws' },
        { label: 'Hosteltur – dekretet om turismo de excesos', href: 'https://www.hosteltur.com/134332_aprueban-el-decreto-ley-contra-el-turismo-de-borrachera-y-el-balconing.html' },
        { label: 'Última Hora – söndagsöppet', href: 'https://www.ultimahora.es/noticias/local/2025/12/15/2531527/baleares-comunidad-turistica-menos-comercios-abiertos-festivos.html' },
        { label: 'Govern de les Illes Balears – rökfria stränder', href: 'https://www.caib.es/sites/tabaquisme/es/playas_sin_humo/' },
        { label: 'Última Hora – Palmas rökfria stränder', href: 'https://www.ultimahora.es/noticias/palma/2026/08/03/2682577/palma-declara-seis-playas-libres-humo.html' },
        { label: 'Mallorca.com – hundstränder', href: 'https://www.mallorca.com/en/guide/travel-info/mallorca-land-people/dog-beaches-mallorca' },
        { label: '112 Illes Balears – maneter', href: 'https://caib.es/sites/112/es/amb_les_meduses_segurs-11487' },
        { label: 'Mallorca Magazin – polis på Palmas bussar', href: 'https://www.mallorcamagazin.com/tag/EMT.html' },
        { label: 'Mallorcadiario – brandrisksäsongen', href: 'https://www.mallorcadiario.com/el-1-de-mayo-comienza-la-temporada-de-alto-riesgo-de-incendio' },
      ]}
      checkedNote="Regler kan ändras från år till år och skilja mellan kommuner. Följ alltid skyltar på plats och anvisningar från livräddare och polis."
    >
      <p className={styles.lead}>
        Mallorca är en trygg och enkel ö att resa till, särskilt för oss som kommer från ett annat EU-land. Här är det
        praktiska som är bra att ha koll på innan du åker – och några regler som många turister inte känner till.
      </p>

      <section id="resehandlingar" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Pass och id-kort</h2>
        <p>
          Spanien ingår i EU och Schengen, så som svensk medborgare reser du med giltigt pass eller nationellt id-kort
          från Polisen. Andra id-kort och körkort gäller inte som resehandling. Flygbolagen kräver ändå en giltig
          id-handling vid ombordstigning.
        </p>
        <p>
          Barn behöver egen resehandling. Polisen rekommenderar pass eller nationellt id-kort även inom Schengen.
        </p>
      </section>

      <section id="sjukvard" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Sjukvård och 112</h2>
        <div className={`${styles.box} ${styles.warning}`}>
          <p className={styles.boxTitle}>Nödnummer: 112</p>
          <p>
            Ring 112 vid olycka, akut sjukdom, brand eller brott. Numret är gratis och gäller i hela EU.
          </p>
        </div>
        <p>
          Ta med <strong>EU-kortet</strong> (det europeiska sjukförsäkringskortet). Det beställs gratis från
          Försäkringskassan, gäller i tre år och ger dig nödvändig vård i den offentliga sjukvården på samma villkor som
          de som bor i Spanien. Ofta betalar du en patientavgift. Alla i familjen, även barnen, behöver ett eget kort,
          och leveransen kan ta upp till tio dagar – beställ i god tid. Har du glömt kortet kan du ringa
          Försäkringskassan och få ett provisoriskt intyg.
        </p>
        <p>
          EU-kortet gäller inte hos alla privata kliniker, som det finns gott om i turistorterna. Fråga alltid innan du
          får vård om kliniken tar emot kortet. En reseförsäkring täcker sådant som EU-kortet inte gör, till exempel
          hemtransport.
        </p>
      </section>

      <section id="apotek" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Apotek</h2>
        <p>
          Apotek heter <em>farmàcia</em> på katalanska och <em>farmacia</em> på spanska och känns igen på det gröna
          korset. Personalen ger ofta råd om enklare åkommor.
        </p>
        <p>
          Kvällar, nätter och helger har ett jourapotek (<em>farmacia de guardia</em>) öppet i varje område. Vilket
          som har jour står uppsatt i fönstret på alla apotek. Schemat publiceras också av Balearernas regering och av
          apotekarförbundet COFIB. I Palma finns alltid flera jourapotek.
        </p>
      </section>

      <section id="el-och-vatten" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>El och vatten</h2>
        <p>
          Spanien har 230 volt och samma runda stickkontakter som i Sverige, så du behöver ingen adapter.
        </p>
        <h3 id="vatten" className={`${h.h3} ${styles.h3}`}>Kan man dricka kranvattnet?</h3>
        <p>
          I Palma är kranvattnet drickbart och kontrolleras löpande av det kommunala vattenbolaget EMAYA. Det smakar
          ofta klor och är kalkhaltigt, så många föredrar flaskvatten. Kommunen har satt upp offentliga fontäner med
          filtrerat dricksvatten runt om i staden. Utanför Palma kan vattnet variera – fråga på ditt boende.
        </p>
      </section>

      <section id="sprak" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Språk</h2>
        <p>
          Mallorca har två officiella språk: katalanska (som på ön talas i varianten mallorquí) och spanska. Vägskyltar,
          ortnamn och kommunala skyltar är ofta bara på katalanska, därför skriver vi till exempel Pollença och Sóller.
          I turistorterna klarar du dig bra på engelska, men ett <em>bon dia</em> (god morgon) eller{' '}
          <em>gràcies</em> (tack) uppskattas alltid.
        </p>
      </section>

      <section id="oppettider" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Öppettider och siesta</h2>
        <p>
          Många mindre butiker, särskilt i byarna, stänger några timmar mitt på dagen och öppnar igen på
          eftermiddagen. Spanjorerna äter sent, och restaurangernas kök öppnar ofta senare på kvällen än du är van vid.
        </p>
        <p>
          På söndagar och helgdagar är de flesta butiker stängda. Undantaget är områden som klassas som zoner med stor
          turisttillströmning, som delar av Palmas centrum, där större butiker får hålla öppet. I badorterna har många
          souvenirbutiker och småbutiker öppet ändå. Planera storhandlingen till vardagar.
        </p>
      </section>

      <section id="alkohol" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Alkoholregler</h2>
        <p>
          För att komma åt fyllfestturismen (<em>turismo de excesos</em>) har Balearerna särskilda regler i några
          utpekade områden: delar av Platja de Palma och s&apos;Arenal (Palma och Llucmajor), Magaluf i Calvià och
          Sant Antoni på Ibiza. Reglerna infördes 2020 och skärptes 2024.
        </p>
        <ul>
          <li>Butiker får inte sälja alkohol mellan 21.30 och 08.00.</li>
          <li>Det är förbjudet att dricka alkohol på gatan, utom på uteserveringar och tillåtna platser. Böterna är 500–1 500 €.</li>
          <li>Happy hour, fri bar och organiserade barrundor är förbjudna.</li>
          <li>Festbåtar får inte gå nära kusten vid de här områdena.</li>
        </ul>
        <p>
          I resten av Mallorca gäller vanliga spanska regler, och åldersgränsen för att köpa alkohol är 18 år.
        </p>
      </section>

      <section id="stranden" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Regler på stranden</h2>
        <h3 className={`${h.h3} ${styles.h3}`}>Flaggor och maneter</h3>
        <p>
          Stränder med livräddare använder samma flaggsystem som i resten av Spanien: grön flagga betyder lugnt hav, gul
          att du ska vara försiktig och röd att bad är förbjudet. En tom flaggstång betyder oftast att ingen livräddare
          är i tjänst. En särskild flagga varnar för maneter. Ser du många maneter, säg till livräddaren eller ring 112.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Hundar</h3>
        <p>
          På de flesta badstränder är hundar förbjudna under sommarsäsongen, i till exempel Calvià från 1 juni till
          30 september. Några kommuner har särskilda hundstränder. Reglerna bestäms av varje kommun och kan ändras
          mellan säsongerna, så kolla skyltarna innan du går ned på stranden.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Rökning</h3>
        <p>
          Allt fler stränder ingår i programmet <em>Platges sense fum</em> (rökfria stränder). På vissa är det en
          rekommendation, på andra har kommunen förbjudit rökning. Palma utsåg sex rökfria stränder sommaren 2026.
          Följ skyltarna, och ta alltid med dig fimparna.
        </p>
        <p>
          Vill du hitta rätt strand för dagen? Se alla <Link href="/strandar">stränder på Mallorca</Link>.
        </p>
      </section>

      <section id="sakerhet" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Ficktjuvar, värme och brandrisk</h2>
        <h3 className={`${h.h3} ${styles.h3}`}>Ficktjuvar</h3>
        <p>
          Mallorca är tryggt, men ficktjuvar förekommer där det är trångt: i Palmas gamla stan, på bussarna, på
          marknader och vid populära stränder. Polisen i Palma har även patrullerat på stadsbussarna. Bär plånbok och
          telefon i en stängd innerficka, lämna inte väskan obevakad på stranden och lägg inte mobilen på
          restaurangbordet.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Värme och sol</h3>
        <p>
          I juli och augusti kan det bli mycket varmt, också sent på kvällen. Drick mycket vatten, håll dig i skuggan
          mitt på dagen och var extra försiktig med barn och äldre. Kolla prognosen på vår{' '}
          <Link href="/vader">vädersida</Link>; den spanska vädertjänsten AEMET utfärdar varningar vid värmebölja.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Brandrisk och eldningsförbud</h3>
        <p>
          Mellan 1 maj och 15 oktober är det högrisksäsong för skogsbränder på Balearerna. Då är det förbjudet att
          göra upp eld i skogsmark och i närheten av den utan särskilt tillstånd. Det gäller också grillplatser i
          naturområden. Kasta aldrig fimpar eller glas i naturen. Ser du rök eller eld – ring 112. Datumen kan
          tidigareläggas torra år.
        </p>
      </section>
    </PraktiskPage>
  );
}
