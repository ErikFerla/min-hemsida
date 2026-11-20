import Link from 'next/link';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import { beaches } from '@/data/beaches';
import { ageLabel } from '@/app/lib/barn-activities';
import HubLink from '../HubLink';
import { aktivitet } from '../familj-links';
import h from '../headings.module.css';
import styles from '../familj.module.css';
import t from '@/components/TextHero.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';

type Strand = {
  /** Namnet som i data/beaches.ts – region och längd hämtas därifrån. */
  namn: string;
  text: string;
  fakta: { label: string; value: string }[];
};

type Åldersgrupp = {
  id: string;
  label: string;
  rubrik: string;
  intro: string;
  stränder: Strand[];
};

// Service, livräddare och djup är kontrollerade mot källorna i LastChecked nedan. Där källorna
// går isär står det ”kontrollera” eller ”kan kosta” i stället för en siffra.
const GRUPPER: Åldersgrupp[] = [
  {
    id: 'smabarn',
    label: ageLabel('0-3'),
    rubrik: 'Småbarn: grunt, sand och toalett nära',
    intro:
      'För de minsta är det enkelt: långgrunt vatten utan vågor, mjuk sand, en toalett och skötbord inom räckhåll och kort väg från bilen. De långa stränderna i Alcúdiabukten och Pollençabukten i norr är bäst på det.',
    stränder: [
      {
        namn: 'Platja de Muro',
        text: 'Lång, grund sandstrand med lugnt vatten och sanddyner bakom. Blå flagg (2026).',
        fakta: [
          { label: 'Service', value: 'Duschar och toaletter, uthyrning av parasoll och solstolar' },
          { label: 'Livräddare', value: 'Under högsäsong' },
          { label: 'Tillgänglighet', value: 'Träspänger ner mot vattnet i delar av stranden' },
          { label: 'Parkering', value: 'Längs sidogatorna och på parkeringar nära stranden' },
        ],
      },
      {
        namn: 'Port de Pollença',
        text: 'Mjuk sand och ett grunt, svagt sluttande vatten mitt i orten. Vid Llenaire finns tallar som ger skugga.',
        fakta: [
          { label: 'Service', value: 'Duschar, toaletter, strandbarer och solstolar' },
          { label: 'Livräddare', value: 'Under högsäsong, bl.a. vid mittdelen nära hamnen' },
          { label: 'Skugga', value: 'Tallar vid Llenaire, annars parasoll' },
        ],
      },
      {
        namn: 'Cala Mondragó / s\'Amarador',
        text: 'Skyddad vik i Mondragó naturpark med fin sand och grunt vatten. Barnvagn går bra till stranden men inte på stigarna.',
        fakta: [
          { label: 'Service', value: 'Toaletter och en liten strandbar' },
          { label: 'Livräddare', value: 'Under sommaren' },
          { label: 'Parkering', value: 'Några hundra meter från stranden – parkeringen kan kosta' },
        ],
      },
    ],
  },
  {
    id: 'fyra-till-sju',
    label: ageLabel('4-7'),
    rubrik: '4–7 år: plats att leka och lite mer att göra',
    intro:
      'Nu vill barnen hoppa i vågor, bygga stora sandslott och kanske prova en pedalbåt. Välj en strand med service men lite mer natur runt omkring – eller en ort där ni kan kombinera stranden med en utflykt.',
    stränder: [
      {
        namn: 'Platja d\'Alcúdia',
        text: 'Öns längsta strand är grund långt ut, och längs stranden finns lekplatser och vattensport. Blå flagg (2026).',
        fakta: [
          { label: 'Service', value: 'Toaletter, duschar, lekplats, uthyrning av parasoll och båtar' },
          { label: 'Livräddare', value: 'Under högsäsong' },
        ],
      },
      {
        namn: 'Cala Agulla',
        text: 'Sandstrand i ett naturområde nära Cala Rajada, med tallskog bakom. Vattnet är oftast lugnt men kan ha måttliga vågor.',
        fakta: [
          { label: 'Service', value: 'Toaletter, duschar och restaurang' },
          { label: 'Livräddare', value: 'Under säsongen' },
          { label: 'Parkering', value: 'Begränsad och kan kosta – kom tidigt' },
        ],
      },
      {
        namn: 'Es Trenc',
        text: 'Lång vit sandstrand där barnen kan gå långt ut. Men här finns ingen naturlig skugga – ta med parasoll eller hyr på plats.',
        fakta: [
          { label: 'Service', value: 'Strandbarer och toaletter främst vid Ses Covetes' },
          { label: 'Livräddare', value: 'Under säsongen' },
          { label: 'Parkering', value: 'Avgift, en bit från vattnet, fylls tidigt på sommaren' },
        ],
      },
    ],
  },
  {
    id: 'atta-till-tolv',
    label: ageLabel('8-12'),
    rubrik: '8–12 år: snorkling och klippor',
    intro:
      'Nu blir det roligt med mask och snorkel. De bästa platserna är vikar med sand i mitten och klippor på sidorna, där fiskarna samlas. Ta med vattenskor – klipporna är vassa – och låt barnen simma två och två.',
    stränder: [
      {
        namn: 'Cala Llombards',
        text: 'Sandig ingång och klippor på båda sidor, med stegar upp ur vattnet. Bra snorkling bland stenar och sjögräs när det är lugnt.',
        fakta: [
          { label: 'Service', value: 'En strandbar – kontrollera toaletter och livräddare på plats' },
          { label: 'Utrustning', value: 'Ta med egen mask och snorkel' },
          { label: 'Parkering', value: 'Gratis men liten – kom tidigt på sommaren' },
        ],
      },
      {
        namn: 'Cala Mondragó / s\'Amarador',
        text: 'Snorkla längs klipporna i viken och gå sedan en av de skyltade slingorna i naturparken. Passar familjer med både små och stora barn.',
        fakta: [
          { label: 'Kombinera med', value: 'Promenad i Mondragó naturpark' },
        ],
      },
      {
        namn: 'Sa Calobra',
        text: 'Stenstrand mellan höga klippor som nås genom tunnlar i berget – ett äventyr i sig. Åk båt dit från Port de Sóller och slipp den kurviga vägen.',
        fakta: [
          { label: 'Tänk på', value: 'Ingen sandstrand; ta med vattenskor' },
          { label: 'Bäst', value: 'Tidigt eller sent på dagen' },
        ],
      },
    ],
  },
  {
    id: 'tonaringar',
    label: ageLabel('13+'),
    rubrik: 'Tonåringar: vågor, vandring och vattensport',
    intro:
      'Tonåringar vill ofta ha något att göra – eller en strand som känns som en upptäckt. En vik som kräver en promenad, vågor att leka i eller en strand med vattensport fungerar bättre än den närmaste hotellstranden.',
    stränder: [
      {
        namn: 'Cala Mesquida',
        text: 'Bred sandstrand med sanddyner som får vågor när det blåser och är populär bland surfare. Respektera flaggan – vid röd flagga är bad förbjudet.',
        fakta: [{ label: 'Parkering', value: 'Nära stranden – kom tidigt på helger' }],
      },
      {
        namn: 'Cala Varques',
        text: 'Orörd vik som kräver en promenad genom tallskog. Ingen service, så ta med vatten och mat.',
        fakta: [{ label: 'Tänk på', value: 'Inte för barnvagn' }],
      },
      {
        namn: 'Cala Figuera (Formentor)',
        text: 'Avskild klippvik på Formentorhalvön med mycket klart vatten för snorkling. Promenad från parkeringen.',
        fakta: [{ label: 'Tänk på', value: 'Stenstrand – vattenskor' }],
      },
    ],
  },
];

function strandInfo(namn: string): string {
  const b = beaches.find((x) => x.namn === namn);
  if (!b) return '';
  return `${b.region} · ${b.typ} · ${b.längd}`;
}

export default function StrandernaForBarnGuide() {
  return (
    <div className={styles.page}>
      <header className={t.hero}>
        <div className={t.inner}>
          <div className={t.crumbs}>
            <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: 'Med barn', url: '/barn' }, { name: 'Bästa stränderna för barn – efter ålder', url: '/guide/stranderna-for-barn' }]} />
          </div>
          <p className={t.kicker}>Familjeguide · Stränder</p>
          <h1 className={t.title}>Bästa stränderna för barn – efter ålder</h1>
          <p className={t.lead}>
            Grunt och sand för de minsta, snorkling och klippor för större barn – med service, parkering och det ni
            behöver tänka på.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <HubLink
          text="Stranden är bara en del av resan. Vattenparker, djurparker, grottor och mer finns samlade på barnsidan, med filter för ålder."
          href="/barn"
          label="Se alla barnaktiviteter"
        />

        <section className={`${h.facts} ${styles.facts}`} aria-labelledby="snabbsvar">
          <p id="snabbsvar" className={styles.factsTitle}>Snabbsvar – vilken strand passar?</p>
          <dl className={styles.factsList}>
            {GRUPPER.map((g) => (
              <div key={g.id}>
                <dt>{g.label}</dt>
                <dd>
                  <a href={`#${g.id}`}>{g.stränder.map((s) => s.namn.split(' / ')[0]).join(', ')}</a>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={`${styles.prose} ${styles.intro}`}>
          <p>
            Mallorca har gott om stränder som passar barn, men vad som är bäst beror på åldern. En treåring behöver
            grunt vatten och en toalett i närheten, en tioåring vill se fiskar och en fjortonåring vill helst inte sitta
            still alls. Här har vi valt ut tre stränder för varje ålder, med det vi har kunnat kontrollera om service,
            livräddare och parkering. Alla stränder finns med karta och väder på <Link href="/strandar">strandsidan</Link>.
          </p>
          <p>
            Livräddare finns bara under säsongen, oftast sommarhalvåret, och servicen skiljer sig mellan olika delar av
            samma strand. Ta det som står här som en utgångspunkt och titta efter flaggan och livräddartornet när ni
            kommer fram.
          </p>
        </div>

        {GRUPPER.map((g) => (
          <section key={g.id} id={g.id} className={styles.section} aria-labelledby={`${g.id}-rubrik`}>
            <div className={styles.sectionHead}>
              <p className={h.label}>{g.label}</p>
              <h2 id={`${g.id}-rubrik`} className={`${h.h2} ${styles.sectionTitle}`}>{g.rubrik}</h2>
              <p className={styles.prose}>{g.intro}</p>
            </div>
            <ul className={`${styles.cardGrid} ${styles.cardGrid3}`}>
              {g.stränder.map((s) => (
                <li key={s.namn} className={styles.card}>
                  <h3 className={`${h.h3} ${styles.cardTitle}`}>{s.namn}</h3>
                  <p className={styles.cardMeta}>{strandInfo(s.namn)}</p>
                  <p className={styles.cardText}>{s.text}</p>
                  <dl className={styles.cardFacts}>
                    {s.fakta.map((f) => (
                      <div key={f.label} className={styles.cardFactsRow}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <TipBox tone="warning" heading="Flaggor, livräddare och klipphopp" as="h2" className={styles.note}>
          <ul>
            <li>Grön flagga betyder lugnt hav, gul att ni ska vara försiktiga och röd att bad är förbjudet.</li>
            <li>En tom flaggstång betyder oftast att ingen livräddare är i tjänst – utanför säsongen badar ni på egen risk.</li>
            <li>
              Klipphopp sker alltid på egen risk. Kontrollera djupet och att ingen simmar under, och låt aldrig yngre
              barn hoppa efter tonåringarna.
            </li>
          </ul>
          <p>Mer om säkerhet på stranden finns under <Link href="/praktiskt#stranden">praktiska tips</Link>.</p>
        </TipBox>

        <TipBox heading="Så blir stranddagen lättare" as="h2" className={styles.tip}>
          <ul>
            <li>Kom före kl. 10 på sommaren – parkeringarna vid de populära vikarna fylls tidigt.</li>
            <li>Vattenskor till alla. Många vikar har stenar och sjöborrar vid klipporna.</li>
            <li>UV-tröja och parasoll gör mer nytta än mycket solkräm, särskilt mitt på dagen.</li>
            <li>
              Blåser det? Välj en strand i lä. <Link href="/strandar">Dagens strand</Link> föreslår stränder efter
              vinden.
            </li>
          </ul>
        </TipBox>

        <nav className={styles.more} aria-labelledby="las-vidare">
          <p id="las-vidare" className={h.label}>Läs vidare</p>
          <ul className={styles.moreList}>
            <li><Link href="/strandar" className="link-arrow">Alla stränder <span aria-hidden="true">→</span></Link></li>
            <li><Link href={aktivitet('hidropark-alcudia').href} className="link-arrow">Vattenparker <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/guide/mallorca-med-barn-manad-for-manad" className="link-arrow">Med barn månad för månad <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/guide/basta-stranderna-mallorca" className="link-arrow">Vår topplista över stränder <span aria-hidden="true">→</span></Link></li>
          </ul>
        </nav>

        <LastChecked
          date="2026-11-20"
          note="Service och livräddare gäller under badsäsongen och kan skilja sig mellan olika delar av stranden – kontrollera på plats."
          sources={[
            { label: 'Spain.info – Playa de Muro', href: 'https://www.spain.info/es/playa/muro/' },
            { label: 'Spain.info – Playa de Alcúdia', href: 'https://www.spain.info/es/playa/alcudia/' },
            { label: 'Spain.info – Cala Agulla', href: 'https://www.spain.info/es/playa/cala-agulla/' },
            { label: 'Spain.info – S’Amarador', href: 'https://www.spain.info/es/playa/amarador/' },
            { label: 'Última Hora – Banderas azules 2026', href: 'https://www.ultimahora.es/noticias/local/2026/05/05/2623023/banderas-azules-baleares-listado-playas-luciran-emblema-este-verano.html' },
            { label: 'Mallorca.com – Playa de Port de Pollença', href: 'https://www.mallorca.com/es/guia/playas/port-pollenca' },
            { label: 'Mallorca.com – Cala Llombards', href: 'https://www.mallorca.com/es/guia/lugares/cala-llombards' },
            { label: 'Barceló – Es Trenc', href: 'https://www.barcelo.com/guia-turismo/es/espana/mallorca/que-ver/es-trenc/' },
            { label: '112 Illes Balears – A la platja segurs', href: 'https://www.caib.es/sites/112/es/en_la_playa_seguros-7008/' },
          ]}
        />
      </div>
    </div>
  );
}
