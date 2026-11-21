import Link from 'next/link';
import PraktiskPage, { styles, h } from '@/app/praktiskt/_shared/PraktiskPage';

export default function MallorcaPaVintern() {
  return (
    <PraktiskPage
      sida="vinter"
      kicker="Säsong · November till mars"
      subtitle="Lugna byar, blommande mandelträd, eldfester i januari och vandring i svalt väder."
      toc={[
        { id: 'oppet-och-stangt', label: 'Vad är öppet?' },
        { id: 'vader', label: 'Vädret' },
        { id: 'mandelblomningen', label: 'Mandelblomningen' },
        { id: 'fester', label: 'Sant Antoni och Sant Sebastià' },
        { id: 'jul', label: 'Jul och nyår' },
        { id: 'vandring-golf', label: 'Vandring och golf' },
        { id: 'bor-pa-on', label: 'För dig som bor på ön' },
      ]}
      related={[
        { href: '/vader', title: 'Väder på Mallorca', text: 'Aktuell prognos och vädret månad för månad.' },
        { href: '/evenemang', title: 'Evenemang', text: 'Fester, marknader och konserter under året.' },
        { href: '/vandring-och-cykling', title: 'Vandring och cykling', text: 'GR 221, klassiska turer och cykelstigningar.' },
        { href: '/palma-de-mallorca', title: 'Palma', text: 'Staden som lever året runt.' },
        { href: '/budget-och-priser', title: 'Budget och priser', text: 'Lägre turistskatt och billigare resa på vintern.' },
      ]}
      sources={[
        { label: 'AEMET – normalvärden Palma de Mallorca, Aeropuerto 1981–2010', href: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=B278&k=bal' },
        { label: 'Illes Balears – Sant Antoni och Sant Sebastià', href: 'https://www.illesbalears.travel/en/mallorca/sant-antoni-and-sant-sebastia' },
        { label: 'Visit Palma – Festes de Sant Sebastià', href: 'https://www.visitpalma.com/ca/descobrir/que-veure-i-que-fer/imprescindible-experiencies/pln523/festes-de-sant-sebastia' },
        { label: 'Mallorca Global Mag – Sant Sebastià 2027', href: 'https://mallorcaglobalmag.es/en/sant-sebastia-2027-avance/' },
        { label: 'Última Hora – Sant Antoni 2026', href: 'https://www.ultimahora.es/noticias/part-forana/2026/01/16/2550447/mallorca-enciende-llama-sant-antoni-2026.html' },
        { label: '+Mallorca – mandelblomningen', href: 'https://www.masmallorca.es/en?p=215' },
        { label: 'Mallorca.com – Fira de la Flor d’Ametler', href: 'https://www.mallorca.com/en/events/feria-de-la-flor-de-almendro-2027-917160' },
        { label: 'Fibwi Diario – Sóllertågets vinteruppehåll 2026/27', href: 'https://www.fibwidiario.com/baleares/mallorca/tren-tranvia-soller-paran-lunes-son-fechas-regreso/20261118112127327898.html' },
        { label: 'Govern de les Illes Balears – turistskatten', href: 'https://apps.caib.es/sites/impostturisme/en/tax' },
        { label: 'Mallorca Magazin – EMT och residenter 2027', href: 'https://www.mallorcamagazin.com/nachrichten/lokales/2026/10/23/158937/palma-mallorca-erhoht-buspreise-viel-kostet-kunftig-die-fahrt-zum-flughafen.html' },
        { label: 'Canal 4 Diario – Palmas julprogram 2026', href: 'https://canal4diario.com/palma/2026/11/19/el-ajuntament-de-palma-presenta-un-amplio-programa-de-navidad-con-cerca-de-300-actividades-repartidas-por-toda-la-ciudad/' },
        { label: 'Mallorca Global Mag – Navidad en Palma 2026', href: 'https://mallorcaglobalmag.es/navidad-palma-2026/' },
        { label: 'Mallorca Global Mag – julbelysningen 2026', href: 'https://mallorcaglobalmag.es/en/encendido-luces-navidad-2026-palma-parc-mar/' },
        { label: 'Parc de Nadal', href: 'https://parcdenadal.com/es' },
        { label: 'Unesco – Chant of the Sybil on Majorca', href: 'https://ich.unesco.org/en/decisions/5.COM/6.38' },
        { label: 'Visit Palma – Matines de Nadal', href: 'https://visitpalma.com/ca/event/matines-de-nadal-el-cant-de-la-sibilla/' },
        { label: 'Visit Palma – Festa de l’Estendard', href: 'https://visitpalma.com/en/event/fiesta-de-lestendard/' },
        { label: 'El Debate – Cavalcada dels Reis i Palma 2026', href: 'https://www.eldebate.com/espana/baleares/20260105/reyes-magos-lucen-cabalgata-ambiciosa-hasta-fecha-palma_370837.html' },
        { label: 'Govern de les Illes Balears – helgdagar 2026', href: 'https://www.caib.es/sites/calendarilaboral/ca/any_2026/' },
        { label: 'Govern de les Illes Balears – helgdagar 2027', href: 'https://www.caib.es/sites/calendarilaboral/ca/2027/' },
      ]}
      checkedNote="Programmen för vinterns fester publiceras av kommunerna först några veckor i förväg – kontrollera datum som inte är fasta helgdagar hos kommunen innan du åker."
    >
      <p className={styles.lead}>
        När badgästerna har åkt hem blir Mallorca en annan ö. Byarna är lugna, bergen är gröna och du har
        Tramuntanas stigar nästan för dig själv. Vintern är ingen strandsäsong – men för vandring, cykling, kultur och
        mat är det en av årets finaste tider.
      </p>

      <section id="oppet-och-stangt" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Vad är öppet på vintern?</h2>
        <p>
          <strong>Palma</strong> lever året runt, med öppna restauranger, butiker, museer och marknader. Det gäller
          också större orter som Sóller, Pollença, Inca och Manacor, där ortsborna handlar och äter ute även i januari.
        </p>
        <p>
          I de rena <strong>badorterna</strong> längs kusten stänger däremot många hotell, strandbarer och
          restauranger från senhösten till våren. Uthyrning av solstolar, båtturer och en del sevärdheter har kortare
          säsong eller begränsade öppettider. Kolla alltid öppettiderna innan du åker till ett utflyktsmål.
        </p>
        <p>
          Trafikbegränsningen på vägen ut till Cap de Formentor gäller bara under sommarhalvåret (2026 från 15 maj till
          18 oktober). Utanför den perioden gäller ingen sådan begränsning.
        </p>
        <p>
          Tren de Sóller står still för underhåll från 23 november 2026 och går igen från 1 februari 2027. Under
          uppehållet tar du TIB-buss 204 mellan Palma och Sóller. Spårvagnen ner till Port de Sóller går igen från
          22 december 2026 och ersätts av buss fram till dess. Mer under{' '}
          <Link href="/hyrbil-och-transport#buss">Hyrbil och transport</Link>.
        </p>
      </section>

      <section id="vader" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Vädret</h2>
        <p>
          Vintern är mild men inte varm. Enligt AEMET:s normalvärden för Palmas flygplats (1981–2010) är
          dygnsmedeltemperaturen runt 10 °C i januari och 11 °C i december. Soliga dagar känns det betydligt varmare
          mitt på dagen, men kvällarna är kyliga och de gamla stenhusen kan vara kalla inomhus. Det regnar oftare än på
          sommaren, och uppe i bergen är det kallare och blåsigare än vid kusten.
        </p>
        <p>
          Packa lager på lager: en tunn dunjacka, en tröja och bra skor räcker långt. Aktuell prognos och månadsvärden
          finns på <Link href="/vader">vädersidan</Link>.
        </p>
      </section>

      <section id="mandelblomningen" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Mandelblomningen</h2>
        <p>
          Från slutet av januari och genom februari blommar mandelträden i vitt och rosa över stora delar av ön. Ofta är
          blomningen som vackrast i mitten av februari, men tidpunkten skiftar med vintervädret. Träden blommar först i
          söder, kring Llucmajor, och sedan på slätten i mitten av ön och mot nordväst.
        </p>
        <p>
          Kör en sväng genom jordbruksbygden på slätten mitt på ön, Es Pla, en solig dag i februari. I Son Servera
          hålls varje år en mandelblomsmarknad, <em>Fira de la Flor d’Ametler</em>, i början av februari.
        </p>
      </section>

      <section id="fester" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Sant Antoni och Sant Sebastià</h2>
        <p>Januari är eldfesternas månad, och många som bor på ön tycker att det är årets roligaste helger.</p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Sant Antoni</p>
            <p className={styles.cardMeta}>16–17 januari</p>
            <p>
              Kvällen den 16 januari, <em>revetla</em>, tänds stora brasor (<em>foguerons</em>) på torgen och
              <em> dimonis</em>, utklädda demoner, dansar genom gatorna. Den 17 januari välsignas djuren. Mest kända
              är festerna i Sa Pobla, Manacor och Artà.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Sant Sebastià</p>
            <p className={styles.cardMeta}>19–20 januari, Palma</p>
            <p>
              Palmas skyddshelgon firas den 20 januari. Kvällen före, den 19 januari, är det revetla med konserter på
              flera torg i centrum. För barnen ordnas Sant Sebastià Petit, 2027 söndagen den 10 januari i
              parken Sa Riera.
            </p>
          </div>
        </div>
        <p>
          Fler fester och evenemang under året hittar du i <Link href="/evenemang">evenemangskalendern</Link>.
        </p>
      </section>

      <section id="jul" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Jul och nyår</h2>
        <p>
          Julen på Mallorca firas mest i familjen, men i Palma händer det mycket ute på stan. Palma kommuns julprogram
          2026 har ett 300-tal aktiviteter och pågår till 6 januari 2027.
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Julmarknader</p>
            <p className={styles.cardMeta}>21 november 2026–6 januari 2027</p>
            <p>
              Kommunens julmarknader står på Plaça Major, La Rambla och i Parc de les Estacions, alla dagar kl. 10–21.
              Nedanför katedralen, i Parc de la Mar, finns Parc de Nadal med ett 60-tal stånd och en skridskobana.
              Många andra orter har en egen marknad någon helg i december – kolla kommunens program.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Julbelysningen</p>
            <p className={styles.cardMeta}>Från 21 november 2026</p>
            <p>
              Julbelysningen 2026 invigs den 21 november med en show i Parc de la Mar, med ljus som projiceras på
              katedralens fasad. Belysningen sitter längs gatorna i hela centrum. En kvällspromenad genom gamla stan räcker för att
              se det mesta.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Cant de la Sibil·la</p>
            <p className={styles.cardMeta}>Julafton 24 december</p>
            <p>
              I midnattsmässan, <em>Matines</em>, på julaftons kväll sjungs Sibyllans sång i kyrkor över hela ön. Sången
              står sedan 2010 på Unescos lista över immateriellt kulturarv. I katedralen La Seu blir det fullt, så kom i
              god tid. Tiden för 2026 publiceras av katedralen i december.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Festa de l’Estendard</p>
            <p className={styles.cardMeta}>31 december, Palma</p>
            <p>
              Palma minns Jaume I:s intåg i staden den 31 december 1229. På förmiddagen hissas fanan på Plaça de Cort
              och bärs i procession till La Seu.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Nyårsafton</p>
            <p className={styles.cardMeta}>31 december, Plaça de Cort</p>
            <p>
              Palma kommun firar nyår på Plaça de Cort framför rådhuset, med dj och klockslagen vid midnatt. Som i
              resten av Spanien äter man tolv vindruvor, en för varje slag. Ta med egna druvor.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Cavalcada dels Reis</p>
            <p className={styles.cardMeta}>5 januari 2027, Palma</p>
            <p>
              De tre vise männen kommer med båt till Moll Vell på kvällen och tågar sedan genom centrum. 2026 började
              kortegen vid 18-tiden. Tid och väg för 2027 publiceras av Palma kommun i slutet av december.
            </p>
          </div>
        </div>
        <p>
          <strong>Tips för familjer:</strong> i Spanien är det trettondagen, 6 januari, som barnen får sina julklappar
          av de vise männen. Kvällen före är kortegen höjdpunkten – ställ er längs vägen i god tid.
        </p>
        <p>
          <strong>Helgdagar.</strong> 25 och 26 december 2026 och 1 och 6 januari 2027 är helgdagar på Balearerna.
          26 december, Sant Esteve, är helgdag här men inte i hela Spanien. De dagarna har de flesta butiker stängt och
          bussar och tåg går med helgdagstidtabell. Den 24 och 31 december stänger många butiker tidigare. Kolla EMT:s
          och TIB:s tidtabeller innan du åker.
        </p>
        <p>
          Julmarknaden, Festa de l’Estendard och Cavalcada dels Reis finns också i{' '}
          <Link href="/evenemang">evenemangskalendern</Link>.
        </p>
      </section>

      <section id="vandring-golf" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Vandring, cykling och golf</h2>
        <p>
          Vinter och vår är högsäsong för vandrare och cyklister. Det svala vädret gör långa turer i Serra de
          Tramuntana mycket skönare än på sommaren. Tänk på att dagarna är korta, att det kan bli halt efter regn och
          att raviner som Torrent de Pareis snabbt kan fyllas med vatten. Läs mer om leder, refugier och säkerhet under{' '}
          <Link href="/vandring-och-cykling">Vandring och cykling</Link>.
        </p>
        <p>
          Golfbanorna har öppet året runt och vintern är en populär golfsäsong. Se våra{' '}
          <Link href="/aktiviteter/golf">golfbanor på Mallorca</Link>.
        </p>
      </section>

      <section id="bor-pa-on" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>För dig som bor på ön</h2>
        <ul>
          <li>
            <strong>Ni har stränderna för er själva.</strong> Promenera längs Es Trenc eller i Caló des Moro utan folkmassor.
          </li>
          <li>
            <strong>Gratis kollektivtrafik.</strong> Bofasta med Targeta Intermodal har kunnat åka gratis med
            kollektivtrafiken 2026. När vi kontrollerade i november 2026 var det inte klart om det fortsätter 2027.
          </li>
          <li>
            <strong>Besök sevärdheterna själv.</strong> Vintern är rätt tid för La Seu, Castell de Bellver och de
            stora grottorna, och flera sevärdheter har lägre residentpris.
          </li>
          <li>
            <strong>Lägre turistskatt för gästerna.</strong> Får du besök som bor på hotell är skatten lägre från
            november till april. Se <Link href="/budget-och-priser#turistskatt">turistskatten</Link>.
          </li>
          <li>
            <strong>Brandrisk finns året runt.</strong> Högrisksäsongen är 1 maj–15 oktober, men var försiktig med
            eld i naturen även på vintern.
          </li>
        </ul>
      </section>
    </PraktiskPage>
  );
}
