import Link from 'next/link';
import TipBox from '@/components/TipBox';
import PraktiskPage, { styles, h } from '@/app/praktiskt/_shared/PraktiskPage';

const etapper = [
  { etapp: 4, från: 'Deià (Can Boi)', till: 'Port de Sóller (Muleta)', info: 'ca 10 km, ca 3 tim. En av de lättare etapperna, längs kusten.' },
  { etapp: 5, från: 'Port de Sóller (Muleta)', till: 'Tossals Verds', info: 'Bergsetapp in i Tramuntanas inre delar.' },
  { etapp: 6, från: 'Tossals Verds', till: 'Lluc (Son Amer)', info: 'Över bergen till klostret i Lluc.' },
  { etapp: 7, från: 'Lluc (Son Amer)', till: 'Pollença (Pont Romà)', info: 'Från Lluc ned till Pollença.' },
];

export default function VandringOchCykling() {
  return (
    <PraktiskPage
      sida="vandring"
      kicker="Aktiviteter · Serra de Tramuntana"
      subtitle="Långleden GR 221, klassiska bergsturer och cykelstigningarna som proffsen tränar på."
      toc={[
        { id: 'gr-221', label: 'GR 221 och refugis' },
        { id: 'klassiska-turer', label: 'Klassiska vandringar' },
        { id: 'cykling', label: 'Cykling' },
        { id: 'sasong', label: 'Bästa säsong' },
        { id: 'sakerhet', label: 'Säkerhet i bergen' },
      ]}
      related={[
        { href: '/mallorca-pa-vintern', title: 'Mallorca på vintern', text: 'Lugnt, svalt och perfekt för vandring.' },
        { href: '/vader', title: 'Väder', text: 'Kolla prognosen innan du går ut i bergen.' },
        { href: '/soller', title: 'Sóller', text: 'Utgångspunkt för flera av de bästa turerna.' },
        { href: '/pollenca', title: 'Pollença', text: 'Slutet på GR 221 och nära Formentor.' },
        { href: '/aktiviteter', title: 'Aktiviteter', text: 'Fler sätt att uppleva ön.' },
        { href: '/praktiskt', title: 'Praktiskt och säkerhet', text: '112, värme och brandrisk.' },
      ]}
      sources={[
        { label: 'Consell de Mallorca – refugis på Ruta de Pedra en Sec', href: 'https://caminsdepedra.conselldemallorca.es/en/refugi' },
        { label: 'Wikipedia – GR-221', href: 'https://es.wikipedia.org/wiki/GR-221' },
        { label: 'Mallorca-map – GR 221-etapper', href: 'https://mallorca-map.com/en/tips/gr221-mallorca' },
        { label: 'Govern de les Illes Balears – Torrent de Pareis', href: 'https://intranet.caib.es/geoturfront/en/puntos_interes/42/recomendaciones.html' },
        { label: 'SummitPost – Puig de Massanella', href: 'https://www.summitpost.org/puig-de-massanella/150864' },
        { label: 'Komoot – Puig de Massanella', href: 'https://www.komoot.com/smarttour/449742' },
        { label: 'Climbfinder – Sa Calobra', href: 'https://climbfinder.com/en/climbs/sa-calobra-port-de-sa-calobra' },
        { label: 'Epic Road Rides – Sa Calobra', href: 'https://epicroadrides.com/cycling-spain/mallorca/sa-calobra-climb/' },
        { label: 'Mallorca Global Mag – Formentor 2026', href: 'https://mallorcaglobalmag.es/restricciones-trafico-formentor-2026/' },
        { label: 'DGT – tillträde till Formentor-fyren', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
        { label: 'Mallorcadiario – brandrisksäsongen', href: 'https://www.mallorcadiario.com/el-1-de-mayo-comienza-la-temporada-de-alto-riesgo-de-incendio' },
      ]}
      checkedNote="Tider och längder är ungefärliga och varierar mellan källor och med kondition. Regler för refugis, privat mark och vägen till Formentor kan ändras – kontrollera inför turen."
    >
      <p className={styles.lead}>
        Serra de Tramuntana, bergskedjan längs Mallorcas nordvästkust, är världsarv och ett av Europas finaste områden
        för vandring och cykling. Här går gamla stenlagda mulåsnestigar mellan byarna och serpentinvägar ned mot havet.
        Här är de klassiska turerna – och det du behöver veta för att göra dem säkert.
      </p>

      <section id="gr-221" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>GR 221 – Ruta de Pedra en Sec</h2>
        <p>
          GR 221, <em>torrstensleden</em>, är Mallorcas långled genom Serra de Tramuntana, från Port d&apos;Andratx i
          sydväst till Pollença i nordost. Den har fått sitt namn efter de kallmurade terrasser, stigar och hus som
          präglar bergen. Consell de Mallorca delar in leden i etapper med ett refugi, ett enkelt vandrarhem, i slutet
          av de flesta etapper.
        </p>
        <p>
          Refugierna längs leden är bland andra <strong>Can Boi</strong> i Deià, <strong>Muleta</strong> vid Port de
          Sóller, <strong>Tossals Verds</strong> i Escorca, <strong>Son Amer</strong> vid Lluc och{' '}
          <strong>Pont Romà</strong> i Pollença. Du behöver inget tillstånd för att gå leden, men sängen i refugiet
          måste bokas i förväg hos Consell de Mallorca. Under våren och hösten blir de fullbokade veckor i förväg.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>Den mest gångna delen, Deià–Pollença</caption>
            <thead>
              <tr>
                <th scope="col">Nr</th>
                <th scope="col">Från</th>
                <th scope="col">Till</th>
                <th scope="col">Om etappen</th>
              </tr>
            </thead>
            <tbody>
              {etapper.map((e) => (
                <tr key={e.etapp}>
                  <th scope="row">Etapp {e.etapp}</th>
                  <td data-label="Från">{e.från}</td>
                  <td data-label="Till">{e.till}</td>
                  <td>{e.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          Den sydvästra delen av leden är inte helt utbyggd och alla refugier där är inte öppna. Kontrollera aktuell
          status och etappindelning hos Consell de Mallorca innan du planerar.
        </p>
      </section>

      <section id="klassiska-turer" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Klassiska vandringar</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Torrent de Pareis</p>
            <p className={styles.cardMeta}>Mycket krävande · ca 5–8 tim</p>
            <p>
              Ravinen från Escorca ned till havet vid Sa Calobra är Mallorcas mest berömda – och mest underskattade –
              tur. Det är ingen vanlig vandring utan en ravinvandring med stora block, klättring och partier där du
              behöver använda händerna. Mobiltäckningen är nästan obefintlig.
            </p>
            <p>
              Gå aldrig om det har regnat nyligen eller om regn är utlovat: ravinen kan snabbt fyllas med vatten. Inte
              för barn, ovana eller ensamvandrare – gå med erfaret sällskap eller guide.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Sa Calobra</p>
            <p className={styles.cardMeta}>Lätt · kort promenad</p>
            <p>
              Om Torrent de Pareis är för tufft kan du i stället ta bilen, bussen eller båten till Sa Calobra och gå den
              korta promenaden genom gångtunnlarna till ravinens mynning, där klippväggarna möter en liten stenstrand.
              Vägen ned till Sa Calobra är en upplevelse i sig.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Puig de Massanella</p>
            <p className={styles.cardMeta}>Krävande · ca 6–7 tim t/r från Lluc</p>
            <p>
              Med 1 364 meter är Massanella den högsta toppen du kan bestiga, eftersom Puig Major är militärt område.
              Utsikten över hela ön är magnifik. Den vanliga leden från Lluc eller Coll de Comafreda går över privat
              mark där markägaren tar ut en avgift. Stigen är stenig och kräver bra skor och god kondition.
            </p>
          </div>
        </div>
        <p>
          Söker du något lugnare? Från <Link href="/soller">Sóller</Link>, <Link href="/deia">Deià</Link> och{' '}
          <Link href="/valldemossa">Valldemossa</Link> utgår flera kortare turer på gamla stigar mellan byarna.
        </p>
      </section>

      <section id="cykling" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Cykling</h2>
        <p>
          Mallorca är ett av Europas mest populära resmål för landsvägscyklister, med slingrande bergsvägar, platta
          vägar genom slätten och milt vinterväder.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Sa Calobra (Coll dels Reis)</h3>
        <p>
          Den mest kända stigningen: ca 9,5 km med ca 7 % genomsnittlig lutning och 26 hårnålskurvor, från havet vid Sa
          Calobra upp till Coll dels Reis. Eftersom vägen slutar vid havet måste du först cykla ned samma väg. Mitt på dagen
          under högsäsong kan det vara mycket trafik på den smala vägen.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Puig Major</h3>
        <p>
          Den långa stigningen på huvudvägen genom bergen från Sóller upp mot Puig Major, öns högsta berg, är en
          klassiker. Själva toppen är militärt område och stängd för allmänheten.
        </p>
        <h3 className={`${h.h3} ${styles.h3}`}>Cap de Formentor</h3>
        <p>
          Vägen ut till fyren på Cap de Formentor är en av öns vackraste, men sommartid begränsas trafiken. 2026 gällde
          begränsningen 15 maj–18 oktober, varje dag kl. 10–22:
        </p>
        <ul>
          <li>Mellan Port de Pollença och stranden Platja de Formentor släpps privatbilar in tills parkeringen är full.</li>
          <li>Mellan stranden och fyren är vägen stängd för privatbilar under de tiderna.</li>
          <li>TIB:s buss 334 går från Alcúdia via Port de Pollença till fyren under perioden.</li>
          <li>Kameror kontrollerar registreringsskyltarna och den som kör in olovligt kan få böter.</li>
        </ul>
        <p>
          Kontrollera hos trafikmyndigheten DGT vad som gäller för cyklar och motorcyklar det år du åker. Utanför
          perioden är vägen öppen som vanligt.
        </p>
      </section>

      <section id="sasong" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Bästa säsong</h2>
        <p>
          Höst, vinter och vår – ungefär oktober till maj – är bästa tiden för både vandring och cykling. I mars och
          april är bergen gröna och dagarna längre, och från slutet av januari blommar mandelträden. Juli och augusti är
          för varma för långa turer i bergen; går du ändå, starta i gryningen och välj skuggiga stigar. Läs mer om{' '}
          <Link href="/mallorca-pa-vintern">Mallorca på vintern</Link>.
        </p>
      </section>

      <section id="sakerhet" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Säkerhet i bergen</h2>
        <TipBox heading="Vid olycka: ring 112" as="h3" tone="warning" className={styles.box}>
          <p>
            Berätta var du är, gärna med koordinater från telefonen. I raviner och djupa dalar saknas ofta
            mobiltäckning – berätta för någon vart du ska och när du räknar med att vara tillbaka.
          </p>
        </TipBox>
        <ul>
          <li>
            <strong>Vatten:</strong> det finns få källor längs lederna och de kan vara torra. Bär med dig mer vatten än
            du tror att du behöver, särskilt när det är varmt.
          </li>
          <li>
            <strong>Värme:</strong> solen är stark även på våren. Ta med solskydd och huvudbonad och undvik de mest
            utsatta partierna mitt på dagen.
          </li>
          <li>
            <strong>Väder:</strong> i bergen kan vädret slå om snabbt, med dimma, blåst och regn. Kolla prognosen på{' '}
            <Link href="/vader">vädersidan</Link> eller hos AEMET innan du går.
          </li>
          <li>
            <strong>Mörker:</strong> på vintern blir det mörkt tidigt. Planera så att du är nere i god tid och ta med
            pannlampa.
          </li>
          <li>
            <strong>Eld:</strong> mellan 1 maj och 15 oktober är det förbjudet att göra upp eld i skogsmark. Släng
            aldrig fimpar i naturen.
          </li>
          <li>
            <strong>Respektera marken:</strong> många stigar går över privata gods. Stäng grindar efter dig och följ
            skyltarna.
          </li>
        </ul>
      </section>
    </PraktiskPage>
  );
}
