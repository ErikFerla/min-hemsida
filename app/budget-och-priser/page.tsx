import Link from 'next/link';
import TipBox from '@/components/TipBox';
import PraktiskPage, { styles, h } from '@/app/praktiskt/_shared/PraktiskPage';

type PrisRad = { vad: string; pris: string; kommentar: string };

const matOchDryck: PrisRad[] = [
  { vad: 'Kaffe (café con leche, cortado)', pris: 'ca 1,50–2,50 €', kommentar: 'Dyrare på kaféer i Palmas centrum och vid strandpromenaderna.' },
  { vad: 'Menú del día (lunch)', pris: 'ca 13–16 €', kommentar: 'Förrätt, varmrätt, efterrätt eller kaffe, ofta med dryck. Balearerna har Spaniens dyraste lunchmenyer, i snitt runt 16 €.' },
  { vad: 'Middag, mellanklassrestaurang', pris: 'ca 20–35 € per person', kommentar: 'Tre rätter med vin. I turistorterna och på högsommaren räknar du hellre med 30–50 €.' },
  { vad: 'Öl, caña (litet glas)', pris: 'ca 2–2,50 €', kommentar: 'En halvliter fatöl kostar runt 4 € i Palma, mer på strandbarer och strandklubbar.' },
  { vad: 'Glas husets vin', pris: 'ca 3–4 €', kommentar: 'På vanliga barer och kaféer.' },
];

const transport: PrisRad[] = [
  { vad: 'Stadsbuss i Palma (EMT), enkelbiljett', pris: '2 €', kommentar: 'Pris 2026. Kommunen har godkänt en höjning till 3 € vid kontant betalning från 2027 – kontrollera innan du åker.' },
  { vad: 'Hyrbil, småbil', pris: 'ca 25–35 € per dag', kommentar: 'Snitt över året. I augusti ligger en småbil runt 40–50 € per dag.' },
  { vad: 'Sóllertåget Palma–Sóller', pris: 'ca 23 € enkel, ca 30 € t/r', kommentar: 'Vuxenbiljett 2026. Tur och retur med spårvagnen till Port de Sóller ca 40 €.' },
];

const entreer: PrisRad[] = [
  { vad: 'Katedralen La Seu, Palma', pris: 'ca 10 €', kommentar: 'Vanlig entré. Med guidad tur upp på takterrasserna ca 25 €.' },
  { vad: 'Castell de Bellver, Palma', pris: '4 €', kommentar: 'Kommunen har aviserat en höjning till 8 €.' },
  { vad: 'Coves del Drac, Porto Cristo', pris: 'ca 18 €', kommentar: 'Vuxen. Biljetten gäller en bestämd tid – boka gärna i förväg.' },
];

const strand: PrisRad[] = [
  { vad: 'Solstol eller parasoll, Platja de Palma', pris: '10 € styck per dag', kommentar: 'Ny taxa från 2026: två solstolar och ett parasoll blir 30 €.' },
  { vad: 'Solstol eller parasoll, mindre orter', pris: 'från ca 5 € styck', kommentar: 'Till exempel i Son Servera. Priset sätts av varje kommun.' },
  { vad: 'Solstol på strandklubb', pris: 'ca 25 € och uppåt', kommentar: 'Strandklubbarna (beach clubs) är en helt annan prisklass än den vanliga strandservicen.' },
];

function PrisTabell({ caption, rader }: { caption: string; rader: PrisRad[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Vad</th>
            <th scope="col">Pris 2026</th>
            <th scope="col">Bra att veta</th>
          </tr>
        </thead>
        <tbody>
          {rader.map((r) => (
            <tr key={r.vad}>
              <th scope="row">{r.vad}</th>
              <td className={styles.price} data-label="Pris 2026">{r.pris}</td>
              <td data-label="Bra att veta">{r.kommentar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BudgetOchPriser() {
  return (
    <PraktiskPage
      sida="budget"
      kicker="Reseplanering · Priser 2026"
      subtitle="Ungefärliga priser på mat, transport, entréer och stranddagar – och vad turistskatten kostar."
      toc={[
        { id: 'mat-och-dryck', label: 'Mat och dryck' },
        { id: 'transport', label: 'Transport' },
        { id: 'entreer', label: 'Entréer' },
        { id: 'strand', label: 'Solstolar och parasoll' },
        { id: 'turistskatt', label: 'Turistskatten' },
        { id: 'dricks', label: 'Dricks' },
        { id: 'sparatips', label: 'Sparatips' },
      ]}
      related={[
        { href: '/praktiskt', title: 'Praktiskt och säkerhet', text: 'EU-kort, 112, jourapotek, alkoholregler och regler på stranden.' },
        { href: '/mallorca-pa-vintern', title: 'Mallorca på vintern', text: 'Lägre priser, lugna orter och mandelblomning.' },
        { href: '/flyg', title: 'Flyg till Mallorca', text: 'Sök flyg och ta dig från flygplatsen.' },
        { href: '/mat', title: 'Mat och vin på Mallorca', text: 'Restauranger, tapasbarer och vingårdar.' },
        { href: '/strandar', title: 'Stränder', text: 'Alla stränder – också de utan solstolar.' },
      ]}
      sources={[
        { label: 'Govern de les Illes Balears – turistskatten', href: 'https://apps.caib.es/sites/impostturisme/en/tax' },
        { label: 'Menorca.info – ecotasan 2026', href: 'https://www.menorca.info/balears/noticias/2026/02/06/2564751/govern-promete-defender-subida-ecotasa-aunque-necesaria-medida.html' },
        { label: 'Euro Weekly News – menú del día', href: 'https://euroweeklynews.com/2025/12/19/where-to-find-good-value-menu-del-dia-in-mallorca-despite-rising-prices/' },
        { label: 'Mallorca Plus – levnadskostnader', href: 'https://www.mallorca-plus.de/es/temas/dinero-y-derecho/coste-de-vida' },
        { label: 'Hotels Viva – priser 2026', href: 'https://www.hotelsviva.com/en/w/mallorca-travel-prices-2026-complete-budget-guide' },
        { label: 'Mallorca Magazin – EMT-priser', href: 'https://www.mallorcamagazin.com/nachrichten/lokales/2026/10/23/158937/palma-mallorca-erhoht-buspreise-viel-kostet-kunftig-die-fahrt-zum-flughafen.html' },
        { label: 'Forbes España – EMT-biljetten 3 € från 2027', href: 'https://forbes.es/baleares/actualidad-baleares/1053966/el-billete-sencillo-de-la-emt-de-palma-mas-cerca-de-pasar-de-dos-a-tres-euros-a-partir-del-ano-que-viene/' },
        { label: 'TIB – gratis resor för boende 2026', href: 'https://www.tib.org/es/w/el-transport-p%C3%BAblic-interurb%C3%A0-mant%C3%A9-la-gratu%C3%AFtat-l-any-2026' },
        { label: 'TIB – kortbetalning på bussarna', href: 'https://www.tib.org/es/w/l-emt-i-el-ctm-completen-la-instal%C2%B7laci%C3%B3-del-nou-sistema-que-permet-el-pagament-amb-targeta-banc%C3%A0ria-en-tots-els-autobusos' },
        { label: 'Kayak – hyrbilspriser', href: 'https://www.kayak.es/Isla-de-Mallorca-Coches-de-alquiler.f2000072.crr.html' },
        { label: 'Planomato – Sóllertåget 2026', href: 'https://planomato.com/es/palma-de-mallorca/n/nuevos-horarios-tren-soller' },
        { label: 'Mallorca Magazin – Castell de Bellver', href: 'https://www.mallorcamagazin.com/nachrichten/lokales/2025/11/07/144403/verdoppelung-und-verdreifachung-der-preise-palma-mallorca-entdeckt-beliebte-sehenswurdigkeit-als-cashcow.html' },
        { label: 'Majorca Daily Bulletin – solstolar 2026', href: 'https://www.majorcadailybulletin.com/news/local/2025/12/05/138641/mallorca-holidaymakers-face-sharp-price-hikes-for-palma-sunbeds-and-water-sports-from-2026.html' },
        { label: 'Vinetur – dricks i Spanien', href: 'https://www.vinetur.com/20260818105751/solo-uno-de-cada-cuatro-espanoles-deja-siempre-propina-al-comer-fuera.html' },
      ]}
      checkedNote="Priserna är ungefärliga nivåer och kan skilja mycket mellan orter, säsonger och ställen. Entrépriser kan ändras – kontrollera på plats eller på den officiella sajten innan du åker."
    >
      <p className={styles.lead}>
        Mallorca är inte längre någon billig ö, men skillnaderna är stora. En lunch i en by inåt land kan kosta hälften
        av samma mål på strandpromenaden. Här är ungefärliga priser för 2026, så att du kan räkna på resan innan du
        åker.
      </p>

      <section id="mat-och-dryck" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Mat och dryck</h2>
        <PrisTabell caption="Mat och dryck på restaurang och bar" rader={matOchDryck} />
        <p>
          Den bästa affären är lunchmenyn, <em>menú del día</em>, som serveras på vardagar. Middag äter spanjorerna
          sent, och restaurangerna i byarna öppnar ofta först framåt kvällen. Våra favoritkrogar hittar du under{' '}
          <Link href="/mat">Mat på Mallorca</Link>.
        </p>
      </section>

      <section id="transport" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Transport</h2>
        <PrisTabell caption="Buss, tåg och hyrbil" rader={transport} />
        <p>
          På Palmas stadsbussar och öns TIB-bussar kan du numera betala med bankkort direkt ombord. Taxi kör efter en
          officiell taxa med startavgift och kilometerpris, och natt, helg och helgdag är dyrare. Fråga gärna om
          ungefärligt pris innan längre resor.
        </p>
        <p>
          Parkering i Palmas centrum är avgiftsbelagd i de blå zonerna (ORA) med tidsgräns. Från januari 2027 utökas
          zonerna till fler stadsdelar. På sommaren är det ofta lättare att ta bussen in till stan.
        </p>
      </section>

      <section id="entreer" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Entréer</h2>
        <PrisTabell caption="Några stora sevärdheter" rader={entreer} />
        <p>
          Fler utflyktsmål hittar du bland <Link href="/sevardheter">sevärdheterna</Link> och{' '}
          <Link href="/aktiviteter">aktiviteterna</Link>.
        </p>
      </section>

      <section id="strand" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Solstolar och parasoll</h2>
        <PrisTabell caption="Strandservice per dag" rader={strand} />
        <p>
          Du måste inte hyra något: alla stränder är allmänna och det är fritt att lägga ut handduken. På{' '}
          <Link href="/strandar">strandsidan</Link> ser du vilka stränder som har service och vilka som är orörda.
        </p>
      </section>

      <section id="turistskatt" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Turistskatten</h2>
        <p>
          På Balearerna betalar alla som bor på hotell, lägenhetshotell eller i semesterbostad en turistskatt,{' '}
          <em>Impost de turisme sostenible</em> (ITS, ofta kallad ecotasa). Den tas ut per person och natt och betalas
          oftast direkt till boendet. Pengarna går till miljö-, kultur- och infrastrukturprojekt på öarna.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>Turistskatt per person och natt, före moms</caption>
            <thead>
              <tr>
                <th scope="col">Boende</th>
                <th scope="col">1 maj–31 okt</th>
                <th scope="col">1 nov–30 apr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Femstjärniga hotell och fyrstjärniga superior</th>
                <td className={styles.price} data-label="1 maj–31 okt">4 €</td>
                <td className={styles.price} data-label="1 nov–30 apr">1 €</td>
              </tr>
              <tr>
                <th scope="row">Fyrstjärniga hotell och trestjärniga superior</th>
                <td className={styles.price} data-label="1 maj–31 okt">3 €</td>
                <td className={styles.price} data-label="1 nov–30 apr">0,75 €</td>
              </tr>
              <tr>
                <th scope="row">En- till trestjärniga hotell och lägenhetshotell</th>
                <td className={styles.price} data-label="1 maj–31 okt">2 €</td>
                <td className={styles.price} data-label="1 nov–30 apr">0,50 €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Ovanpå beloppen kommer 10 % moms, så 4&nbsp;€ blir 4,40&nbsp;€ i praktiken.</li>
          <li>Barn under 16 år betalar ingen turistskatt.</li>
          <li>Från den nionde natten på samma boende halveras skatten.</li>
          <li>Semesterbostäder följer en egen tabell; fråga din värd vad som gäller.</li>
        </ul>
        <TipBox heading="Höjs skatten?" as="h3" tone="info" className={styles.box}>
          <p>
            Balearernas regering har föreslagit en högre skatt under sommarmånaderna, men förslaget har inte fått
            majoritet i parlamentet. När vi kontrollerade i november 2026 hittade vi inget beslut om nya belopp.
            Kontrollera med ditt boende inför resan.
          </p>
        </TipBox>
      </section>

      <section id="dricks" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Dricks</h2>
        <p>
          Dricks är frivilligt i Spanien och ingen förväntar sig svenska eller amerikanska nivåer. Bara ungefär var
          fjärde spanjor dricksar alltid när de äter ute. Det vanliga är att runda av uppåt eller lämna 5–10 % när du
          är nöjd med servicen. Står det ett föreslaget dricksbelopp på notan är det bara ett förslag.
        </p>
      </section>

      <section id="sparatips" className={styles.section}>
        <h2 className={`${h.h2} ${styles.h2}`}>Sparatips</h2>
        <ul>
          <li>
            <strong>Ät lunch i stället för middag ute.</strong> Menú del día ger mest mat för pengarna, särskilt i byarna.
          </li>
          <li>
            <strong>Res utanför högsäsong.</strong> Både flyg, boende och hyrbil är billigare på våren, hösten och{' '}
            <Link href="/mallorca-pa-vintern">vintern</Link>, och turistskatten är lägre från november till april.
          </li>
          <li>
            <strong>Boka hyrbilen tidigt.</strong> Under högsäsongen kan priset stiga kraftigt den sista tiden före
            avresan.
          </li>
          <li>
            <strong>Fyll vattenflaskan.</strong> Kranvattnet i Palma är drickbart och kommunen har offentliga fontäner
            med filtrerat vatten. Läs mer under <Link href="/praktiskt#vatten">Praktiskt</Link>.
          </li>
          <li>
            <strong>Handla i livsmedelsbutiken.</strong> Öl, vin, frukt och picknickmat kostar en bråkdel av
            strandbarens priser.
          </li>
          <li>
            <strong>Bor du på ön?</strong> Med Targeta Intermodal har bofasta kunnat åka gratis med kollektivtrafiken
            2026, och flera sevärdheter, till exempel katedralen, har lägre pris för residenter. Om gratisresorna fortsätter
            2027 var inte beslutat i november 2026 – förra året kom beslutet i mitten av december.
          </li>
        </ul>
      </section>
    </PraktiskPage>
  );
}
