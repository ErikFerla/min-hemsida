import Link from 'next/link';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import { CLIMATE, CLIMATE_SOURCES, fmt0 } from '@/data/climate';
import HubLink from '../HubLink';
import { aktivitet } from '../familj-links';
import h from '../headings.module.css';
import styles from '../familj.module.css';
import t from '@/components/TextHero.module.css';

type Länk = { label: string; href: string };

type Månad = {
  /** Väder ur ett barnperspektiv – siffrorna kommer från data/climate.ts. */
  väder: string;
  /** Vad som har öppet eller stängt (säsonger 2026/27). */
  öppet: string;
  /** Lov och barnvänliga fester (evenemangen finns i app/evenemang/data.ts). */
  fester: string;
  förslag: Länk[];
};

const STRANDGUIDE = '/guide/stranderna-for-barn';
const REGNGUIDE = '/guide/regniga-dagar-med-barn';

// En post per månad, januari först. Datum som gäller ett visst år skrivs ut med året.
const MÅNADER: Månad[] = [
  {
    väder: 'Svalt och ofta soligt mitt på dagen, men kalla kvällar. Havet är för kallt för bad – stranden är för lek och promenader.',
    öppet: 'Vattenparkerna är stängda. Tåget till Sóller har vinteruppehåll (2026/27 till och med 31 januari), men ni kan ta buss 204 (går året runt). Coves del Drac, Hams och Artà har öppet utom 1 januari, och Palma Aquarium har öppet året runt.',
    fester: 'De baleariska skolorna har jullov till 6 januari. Kvällen 5 januari kommer de tre vise männen med båt till Palma i Cavalcada dels Reis. Den 16–17 januari firas Sant Antoni med brasor, dansande djävlar (dimonis) och välsignelse av djuren.',
    förslag: [aktivitet('palma-aquarium'), aktivitet('coves-del-drac'), aktivitet('castell-de-bellver')],
  },
  {
    väder: 'Fortfarande svalt. Mandelträden blommar och landsbygden är grön – bra för korta promenader och picknick en solig dag.',
    öppet: 'Tåget till Sóller går igen från 1 februari 2027. Vattenparkerna är stängda och flera attraktioner har kortare vintertider.',
    fester: 'Barnens karnevalståg Sa Rueta går i Palma i slutet av januari eller i februari, söndagen före det stora karnevalståget Sa Rua. Tivolit Fira del Ram på Son Fusteret i Palma brukar öppna i slutet av februari.',
    förslag: [aktivitet('tren-de-soller'), aktivitet('s-albufera'), aktivitet('natura-parc')],
  },
  {
    väder: 'Längre och ljusare dagar. Ta med jacka – det kan blåsa och kvällarna är kalla.',
    öppet: 'Djurparker, grottor och museer har öppet, men flera har kortare tider under vintern. Kontrollera öppettiderna dagen före.',
    fester: 'Fira del Ram har öppet. Påsklovet i de baleariska skolorna är 25 mars–4 april 2027, och under påskveckan går processioner i Palma och i många byar.',
    förslag: [aktivitet('parc-natural-de-mondrago'), aktivitet('coves-dels-hams'), aktivitet('castell-de-bellver')],
  },
  {
    väder: 'Våren på riktigt, med sköna dagar för att vara ute. Havet är fortfarande kallt för de flesta barn.',
    öppet: 'Säsongen börjar. År 2026 öppnade Western Water Park och Hidropark i början av april och Katmandu Park 1 april. Båtturerna kommer igång under våren.',
    fester: 'Tivolit Fira del Ram har öppet en bit in i april.',
    förslag: [aktivitet('coves-de-campanet'), aktivitet('s-albufera'), aktivitet('jungle-parc-santa-ponca')],
  },
  {
    väder: 'Varmt och soligt men sällan hett. Havet är friskt, men många barn badar en stund ändå.',
    öppet: 'Aqualand öppnade 4 maj 2026, och då har alla tre stora vattenparker öppet. Glasbottenbåtarna går ungefär från maj till oktober.',
    fester: 'Es Firó i Sóller (andra måndagen i maj) är en högljudd strid mellan morer och kristna i hamnen och på gatorna – spännande för skolbarn, men tänk på ljudet med små barn.',
    förslag: [
      aktivitet('aqualand-el-arenal'),
      aktivitet('marineland-mallorca'),
      { label: 'Glasbottenbåt', href: '/batutflykter-och-cabrera#klassiska' },
    ],
  },
  {
    väder: 'Sommarvärme och badtemperatur. Det blir varmt mitt på dagen – lägg stranden på förmiddagen och sen eftermiddag.',
    öppet: 'Allt har öppet och dagarna är långa. På de stora stränderna finns livräddare under sommarsäsongen.',
    fester: 'De baleariska skolorna slutar 18 juni 2027, och då blir det fler spanska familjer på stränderna. Midsommarnatten Nit de Sant Joan 23 juni firas med brasor och fester på stränder och torg.',
    förslag: [
      { label: 'Platja de Muro för de minsta', href: STRANDGUIDE },
      aktivitet('hidropark-alcudia'),
      { label: 'Båt till Cabrera', href: '/batutflykter-och-cabrera#cabrera' },
    ],
  },
  {
    väder: 'Högsommar med över 30 °C på dagarna. Undvik stranden mitt på dagen med små barn – välj skugga, inomhus eller vila.',
    öppet: 'Allt har öppet. Det är högsäsong, så kom tidigt till stränder, parker och grottor.',
    fester: 'Festes de Sant Jaume i Alcúdia har fyrverkerier på huvuddagen 25 juli.',
    förslag: [
      aktivitet('palma-aquarium'),
      aktivitet('coves-dels-hams'),
      { label: 'Stränder efter ålder', href: STRANDGUIDE },
    ],
  },
  {
    väder: 'Årets varmaste hav och varma nätter. Planera som i juli: ute tidigt och sent, lugnt mitt på dagen.',
    öppet: 'Allt har öppet. Den 15 augusti är helgdag i hela Spanien och många byar har sommarfest kring dagen.',
    fester: 'Moros i Cristians i Pollença på kvällen 2 augusti är en högljudd strid genom byn – bäst för större barn.',
    förslag: [aktivitet('parc-natural-de-mondrago'), aktivitet('palma-jump'), aktivitet('coves-d-arta')],
  },
  {
    väder: 'Havet har kvar sommarvärmen och hettan släpper. Mot slutet av månaden regnar det oftare.',
    öppet: 'De baleariska skolorna börjar igen (10 september 2026) och stränderna blir lugnare. Aqualand stängde i slutet av september 2026 enligt biljettförsäljarna – kontrollera datumet.',
    fester: 'Festa des Vermar i Binissalem firar vinskörden med druvtrampning, och på Fira del Meló i Vilafranca de Bonany tävlar man om öns största melon.',
    förslag: [
      { label: 'Snorkling i Cala Llombards', href: STRANDGUIDE },
      aktivitet('aqualand-el-arenal'),
      { label: 'Höstens fester', href: '/evenemang' },
    ],
  },
  {
    väder: 'Fortfarande badbart hav, men oktober är årets regnigaste månad. Regnet kommer oftast som skurar.',
    öppet: 'Western Water Park och Hidropark hade säsong till slutet av oktober 2026 enligt biljettförsäljarna – kontrollera innan ni åker. Båtturer och strandservice minskar mot slutet av månaden.',
    fester: 'Det svenska höstlovet ligger runt månadsskiftet oktober–november. Ha en plan för regniga dagar.',
    förslag: [
      aktivitet('coves-d-arta'),
      aktivitet('rafa-nadal-museum-xperience'),
      { label: 'Regniga dagar per del av ön', href: REGNGUIDE },
    ],
  },
  {
    väder: 'Milt men ombytligt. Havet lockar bara de tåligaste. Räkna med några regndagar.',
    öppet: 'Vattenparkerna har stängt och Katmandu Park stängde i början av november 2026 enligt biljettförsäljare. Tåget till Sóller har vinteruppehåll från 23 november 2026. Grottor, Palma Aquarium och inomhuslek i Palma har öppet.',
    fester: 'Dijous Bo i Inca är öns största mässa. I slutet av månaden öppnar julmarknaden i Palma.',
    förslag: [aktivitet('kids-republik'), aktivitet('coves-de-campanet'), aktivitet('palma-aquarium')],
  },
  {
    väder: 'Kortaste dagarna och svala kvällar. En solig dag kan det ändå kännas som vår mitt på dagen.',
    öppet: 'Spårvagnen mellan Sóller och Port de Sóller går igen från 22 december 2026. Coves del Drac, Hams och Artà har stängt 25 december. Många restauranger i badorterna har stängt, men Palma lever året runt.',
    fester: 'Julmarknaden har stånd på Plaça Major i Palma. De baleariska skolorna har jullov 23 december–6 januari. Den 31 december firas Festa de l’Estendard i Palma.',
    förslag: [aktivitet('castell-de-bellver'), aktivitet('palma-jump'), aktivitet('sherwood-park')],
  },
];

/** AEMET:s antal dagar med minst 1 mm regn, i klartext. */
function regndagar(n: number): string {
  if (n < 1) return 'under 1 regndag';
  const r = Math.round(n);
  return r === 1 ? 'ca 1 regndag' : `ca ${r} regndagar`;
}

export default function ManadForManadGuide() {
  const juni = CLIMATE[5];
  const sep = CLIMATE[8];
  return (
    <div className={styles.page}>
      <header className={t.hero}>
        <div className={t.inner}>
          <p className={t.kicker}>Familjeguide · Månad för månad</p>
          <h1 className={t.title}>Mallorca med barn månad för månad</h1>
          <p className={t.lead}>
            Väder och badvatten, vad som har öppet, lov och fester som passar barn – och några förslag för varje månad.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <HubLink
          text="Alla barnaktiviteter – vattenparker, djurparker, grottor, museer och natur – finns på barnsidan, där du kan filtrera efter ålder."
          href="/barn"
          label="Se alla barnaktiviteter"
        />

        <section className={`${h.facts} ${styles.facts}`} aria-labelledby="aret-i-korthet">
          <p id="aret-i-korthet" className={styles.factsTitle}>Året i korthet</p>
          <dl className={styles.factsList}>
            <div>
              <dt>Badsäsong för barn</dt>
              <dd>Juni–september, när havet ligger kring {fmt0(juni.sea)}–{fmt0(sep.sea)} °C</dd>
            </div>
            <div>
              <dt>Vattenparker</dt>
              <dd>Ungefär april/maj–september/oktober (2026), olika för varje park</dd>
            </div>
            <div>
              <dt>Tåget till Sóller</dt>
              <dd>Vinteruppehåll 23 november 2026–31 januari 2027</dd>
            </div>
            <div>
              <dt>Öppet året runt</dt>
              <dd>Grottorna, Palma Aquarium och inomhusaktiviteterna i Palma</dd>
            </div>
          </dl>
        </section>

        <div className={`${styles.prose} ${styles.intro}`}>
          <p>
            Mallorca går att besöka med barn hela året, men det är två olika resor. Från juni till september är det
            badsemester med varmt hav, öppna vattenparker och långa kvällar. Resten av året är det en utflyktsresa:
            grottor, djurparker, naturparker och tåget genom bergen – med färre människor och svalare dagar.
          </p>
          <p>
            Temperaturerna nedan är AEMET:s normalvärden för Palmas flygplats (dagens högsta och nattens lägsta), och
            havet är ett ungefärligt månadsmedel. Hela tabellen finns på <Link href="/vader">vädersidan</Link>. Datum
            för fester och säsonger hittar du också i <Link href="/evenemang">evenemangskalendern</Link>.
          </p>
        </div>

        <section className={styles.section} aria-labelledby="manader">
          <div className={styles.sectionHead}>
            <p className={h.label}>Månad för månad</p>
            <h2 id="manader" className={`${h.h2} ${styles.sectionTitle}`}>Vad passar barnen när?</h2>
          </div>
          <ol className={`${styles.cardGrid} ${styles.cardGrid3}`}>
            {CLIMATE.map((c, i) => {
              const m = MÅNADER[i];
              return (
                <li key={c.month} className={styles.card}>
                  <h3 className={`${h.h3} ${styles.cardTitle}`}>{c.name}</h3>
                  <p className={styles.cardMeta}>
                    {fmt0(c.max)} °C dag · {fmt0(c.min)} °C natt · hav ca {fmt0(c.sea)} °C · {regndagar(c.rainDays)}
                  </p>
                  <p className={styles.cardText}>{m.väder}</p>
                  <p className={styles.cardSub}>Öppet och stängt</p>
                  <p className={styles.cardText}>{m.öppet}</p>
                  <p className={styles.cardSub}>Lov och fester</p>
                  <p className={styles.cardText}>{m.fester}</p>
                  <p className={styles.cardSub}>Förslag</p>
                  <ul className={styles.list}>
                    {m.förslag.map((f) => (
                      <li key={f.label}>
                        <Link href={f.href}>{f.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </section>

        <TipBox heading="Så väljer ni månad" as="h2" className={styles.tip}>
          <ul>
            <li>Små barn som vill bada länge: juni eller september – varmt hav utan högsommarens hetta.</li>
            <li>
              Skolbarn på höstlov: räkna med några regniga dagar och ha en plan, till exempel grottorna på östkusten.
              Se <Link href={REGNGUIDE}>regniga dagar med barn</Link>.
            </li>
            <li>
              Vinter och tidig vår: välj Palma som bas. Där har aktiviteterna öppet året runt, och resten av ön når ni
              med bil eller buss.
            </li>
            <li>Säsongsdatum ändras varje år. Kontrollera alltid öppettider på attraktionens egen webbplats.</li>
          </ul>
        </TipBox>

        <nav className={styles.more} aria-labelledby="las-vidare">
          <p id="las-vidare" className={h.label}>Läs vidare</p>
          <ul className={styles.moreList}>
            <li><Link href="/barn" className="link-arrow">Alla barnaktiviteter <span aria-hidden="true">→</span></Link></li>
            <li><Link href={STRANDGUIDE} className="link-arrow">Stränder för barn <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/guide/basta-tid-resa-mallorca" className="link-arrow">Bästa tiden att resa <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/mallorca-pa-vintern" className="link-arrow">Mallorca på vintern <span aria-hidden="true">→</span></Link></li>
          </ul>
        </nav>

        <LastChecked
          date="2026-11-20"
          note="Säsongsdatumen för vattenparkerna och Katmandu Park gäller 2026 och kommer från lokalpress och biljettförsäljare – parkerna publicerar nästa års datum först på våren. Kontrollera alltid på parkens egen webbplats."
          sources={[
            ...CLIMATE_SOURCES,
            { label: 'Majorca Daily Bulletin – öppningsdatum för attraktioner 2026', href: 'https://www.majorcadailybulletin.com/holiday/attractions/2026/03/17/140729/mallorca-attractions-opening-dates-waterpark-set-splash-into-summer-with-two-new-slides.html' },
            { label: 'Taquilla.com – Aqualand Arenal', href: 'https://www.taquilla.com/entradas/aqualand-arenal' },
            { label: 'Fibwi Diario – Sóllertågets vinteruppehåll 2026/27', href: 'https://www.fibwidiario.com/baleares/mallorca/tren-tranvia-soller-paran-lunes-son-fechas-regreso/20261118112127327898.html' },
            { label: 'CSIF – Calendari escolar Illes Balears 2026-27', href: 'https://www.csif.es/es/noticia/portada/baleareseducacion/articulo/88118' },
            { label: 'BOIB núm. 82 (30 juni 2026) – ändring av skolkalendern 2026-27', href: 'https://www.caib.es/eboibfront/pdf/es/2026/82/1222864' },
            { label: 'Illes Balears – Sant Antoni och Sant Sebastià', href: 'https://www.illesbalears.travel/experience/en/mallorca/sant-antoni-and-sant-sebastia' },
            { label: 'Visit Palma – Fira del Ram', href: 'https://visitpalma.com/en/event/fira-del-ram-palma-2026/' },
          ]}
        />
      </div>
    </div>
  );
}
