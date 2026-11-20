import Link from 'next/link';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import { BARN_SOURCES } from '@/app/lib/barn-activities';
import HubLink from '../HubLink';
import { aktivitet } from '../familj-links';
import h from '../headings.module.css';
import styles from '../familj.module.css';
import t from '@/components/TextHero.module.css';

type Tips = {
  /** Slug i app/lib/barn-activities.ts – länkas till kategorisidan. Annars `namn` + valfri `href`. */
  slug?: string;
  namn?: string;
  href?: string;
  text: string;
};

type Område = {
  id: string;
  label: string;
  rubrik: string;
  orter: string;
  restid: string;
  intro: string;
  tips: Tips[];
};

// Restiderna med bil från Palma följer ortssidorna (data/cities.ts); Porto Cristo enligt
// ruttplanerare (ca 1 timme). Öppettider står bara där de är kontrollerade – annars ”kontrollera”.
const OMRÅDEN: Område[] = [
  {
    id: 'palma',
    label: 'Palma',
    rubrik: 'Palma – flest alternativ',
    orter: 'Palma, Platja de Palma, Marratxí',
    restid: 'Det mesta inne i staden; bowlinghallen i Marratxí ca 15 min från centrum',
    intro:
      'Bor ni i eller nära Palma har ni flest inomhusalternativ på ön, och från de flesta delar av ön når ni staden på en dryg timme. Här finns akvariet, trampolinparken, leklanden och museerna.',
    tips: [
      { slug: 'palma-aquarium', text: 'Helt inomhus med hajtunnel och en liten djungel. Öppet året runt.' },
      { slug: 'palma-jump', text: 'Trampolinpark med eget område för de minsta. Boka tid – regniga dagar tar platserna slut.' },
      { slug: 'kids-republik', text: 'Lekland i tre våningar i centrum, med avdelningar för olika åldrar.' },
      { slug: 'sherwood-park', text: 'Mindre lekland för 2–5-åringar, lagom stort för en förmiddag.' },
      { slug: 'caixaforum-palma', text: 'Utställningar och familjeaktiviteter i ett modernistiskt hus. Kolla programmet i förväg.' },
      { slug: 'bowling-festival-park', text: 'Bowling med kantskydd för små barn i ett köpcentrum med bio och restauranger.' },
    ],
  },
  {
    id: 'norr',
    label: 'Norr',
    rubrik: 'Norr – Alcúdia och Pollença',
    orter: 'Alcúdia, Port d’Alcúdia, Pollença, Port de Pollença',
    restid: 'Till Palma ca 50 min med bil',
    intro:
      'I norr finns få inomhusaktiviteter, men en grotta och ett litet museum ligger nära. Vill ni ha mer: kör till Palma och kombinera två saker på samma dag.',
    tips: [
      { slug: 'coves-de-campanet', text: 'Lugnare grotta i inlandet, ungefär 15 km sydväst om Pollença. Visningen tar omkring 40 minuter. Uppgifterna om öppettider går isär – kontrollera.' },
      {
        namn: 'Museu Monogràfic de Pollentia',
        text: 'Litet museum i Alcúdia med fynd från den romerska staden Pollentia, lagom stort för nyfikna barn. Ingår i biljetten till utgrävningarna. Kontrollera öppettiderna.',
      },
      { namn: 'Palma', href: '#palma', text: 'Akvariet, trampolinparken och leklanden – se ovan.' },
    ],
  },
  {
    id: 'ost',
    label: 'Öst',
    rubrik: 'Öst – grottornas kust',
    orter: 'Manacor, Porto Cristo, Cala Millor, Cala Rajada',
    restid: 'Från Palma till Porto Cristo ca 1 timme med bil',
    intro:
      'Östkusten är bäst på regniga dagar. Här ligger tre av öns stora grottor, där vädret inte spelar någon roll, och sportmuseet i Manacor. Var ute i god tid – regniga dagar kommer alla på samma idé.',
    tips: [
      { slug: 'coves-del-drac', text: 'Den mest kända grottan, med konsert på den underjordiska sjön. Räkna med en dryg timme under jord. Öppet året runt utom 25 december och 1 januari.' },
      { slug: 'coves-dels-hams', text: 'Nära Coves del Drac, på vägen mellan Manacor och Porto Cristo – lätt att kombinera med sportmuseet.' },
      { slug: 'coves-d-arta', text: 'Stora salar vid havet nära Canyamel, närmast för er som bor i Cala Rajada eller Cala Millor.' },
      { slug: 'rafa-nadal-museum-xperience', text: 'Troféer och interaktiva sportstationer i Manacor. Kortare öppettider på vintern.' },
      { slug: 'safari-zoo-sa-coma', text: 'Bilsafarin gör ni från den egna bilen, så den fungerar även en grå dag. Djurparksdelen går ni till fots.' },
    ],
  },
  {
    id: 'syd',
    label: 'Syd',
    rubrik: 'Syd – Santanyí och Colònia de Sant Jordi',
    orter: 'Santanyí, Cala d’Or, Portopetro, Colònia de Sant Jordi, Campos',
    restid: 'Från Santanyí till Palma ca 55 min med bil',
    intro:
      'Söderut finns nästan inga inomhusaktiviteter för barn. Välj mellan två riktningar: västerut till Palma med akvariet och leklanden, eller norrut längs östkusten till grottorna. Kolla restiden från just er ort innan ni bestämmer er.',
    tips: [
      { slug: 'palma-aquarium', text: 'Ligger vid Platja de Palma öster om staden – den del av Palma som är närmast söderifrån.' },
      { namn: 'Grottorna på östkusten', href: '#ost', text: 'Coves del Drac och Coves dels Hams vid Porto Cristo – se öst ovan.' },
    ],
  },
  {
    id: 'vast',
    label: 'Väst',
    rubrik: 'Väst – Calvià och Andratx',
    orter: 'Santa Ponça, Peguera, Magaluf, Port d’Andratx',
    restid: 'Från Andratx till Palma ca 30 min med bil',
    intro:
      'I väster ligger nöjesparkerna, men det mesta är utomhus. Närmast för inomhuslek är Palma, en halvtimme bort.',
    tips: [
      {
        namn: 'Katmandu Park, Magaluf',
        href: aktivitet('katmandu-park-splash').href,
        text: 'Har flera inomhusdelar, bland annat det upp-och-nedvända huset, 4D-bio och mjuklek. Säsongsöppet – 2026 från april till början av november.',
      },
      { namn: 'Palma', href: '#palma', text: 'Trampolinpark, lekland och akvarium – se ovan.' },
    ],
  },
];

function TipsLänk({ tips }: { tips: Tips }) {
  const a = tips.slug ? aktivitet(tips.slug) : null;
  const namn = a?.label ?? tips.namn ?? '';
  const href = a?.href ?? tips.href;
  return (
    <li>
      {href ? <Link href={href}>{namn}</Link> : <strong>{namn}</strong>}
      {' – '}
      {tips.text}
    </li>
  );
}

export default function RegnigaDagarGuide() {
  return (
    <div className={styles.page}>
      <header className={t.hero}>
        <div className={t.inner}>
          <p className={t.kicker}>Familjeguide · Plan B</p>
          <h1 className={t.title}>Regniga dagar med barn på Mallorca</h1>
          <p className={t.lead}>
            Grottor, lekland, akvarium och museer – sorterade efter var på ön ni bor, med restid och vad ni ska
            kontrollera innan ni åker.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <HubLink
          text="Alla inomhusaktiviteter med pris, ålder och öppettider finns på barnsidan under Inomhus & regn och Grottor."
          href="/barn/inomhus-och-regn"
          label="Se inomhus och regn"
        />

        <section className={`${h.facts} ${styles.facts}`} aria-labelledby="restider">
          <p id="restider" className={styles.factsTitle}>Bäst på regniga dagar – per del av ön</p>
          <dl className={styles.factsList}>
            {OMRÅDEN.map((o) => (
              <div key={o.id}>
                <dt>{o.label}</dt>
                <dd>
                  <a href={`#${o.id}`}>{o.rubrik.split(' – ')[1]}</a> · {o.restid}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={`${styles.prose} ${styles.intro}`}>
          <p>
            Det regnar inte ofta på Mallorca – i genomsnitt ett femtiotal dagar om året enligt AEMET, de flesta mellan
            september och april. Men när det regnar på sommaren eller under höstlovet vill alla barnfamiljer på ön
            samma sak samtidigt. Därför lönar det sig att ha en plan för just er del av ön och att åka tidigt.
          </p>
          <p>
            Restiderna nedan gäller bil utan köer. Öppettider ändras med säsongen, och där vi inte har kunnat bekräfta
            dem skriver vi ”kontrollera”. Mer om varje aktivitet, med pris och ålder, finns på{' '}
            <Link href="/barn/inomhus-och-regn">Inomhus &amp; regn</Link> och <Link href="/barn/grottor">Grottor</Link>.
          </p>
        </div>

        {OMRÅDEN.map((o) => (
          <section key={o.id} id={o.id} className={styles.section} aria-labelledby={`${o.id}-rubrik`}>
            <div className={styles.sectionHead}>
              <p className={h.label}>{o.label}</p>
              <h2 id={`${o.id}-rubrik`} className={`${h.h2} ${styles.sectionTitle}`}>{o.rubrik}</h2>
              <p className={styles.prose}>{o.intro}</p>
            </div>
            <div className={`${styles.card} ${styles.textCard}`}>
              <dl className={styles.cardFacts}>
                <div className={styles.cardFactsRow}>
                  <dt>Orter</dt>
                  <dd>{o.orter}</dd>
                </div>
                <div className={styles.cardFactsRow}>
                  <dt>Restid</dt>
                  <dd>{o.restid}</dd>
                </div>
              </dl>
              <ul className={styles.list}>
                {o.tips.map((tp) => (
                  <TipsLänk key={tp.slug ?? tp.namn} tips={tp} />
                ))}
              </ul>
            </div>
          </section>
        ))}

        <TipBox heading="Så räddar ni en regnig dag" as="h2" className={styles.tip}>
          <ul>
            <li>Kolla prognosen kvällen före på <Link href="/vader">vädersidan</Link> och boka trampolinpark eller bowling direkt.</li>
            <li>Åk till grottorna på förmiddagen, innan dagsutflykterna från kustorterna kommer, och boka tid online där det går.</li>
            <li>Kombinera två saker nära varandra: en grotta och sportmuseet i Manacor, eller akvariet och ett lekland i Palma.</li>
            <li>Ta med en tunn tröja till barnen – det är svalt i grottorna året runt. Och välj en grotta per dag, så orkar de minsta hela visningen.</li>
          </ul>
        </TipBox>

        <nav className={styles.more} aria-labelledby="las-vidare">
          <p id="las-vidare" className={h.label}>Läs vidare</p>
          <ul className={styles.moreList}>
            <li><Link href="/barn" className="link-arrow">Alla barnaktiviteter <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/barn/museer-och-kultur" className="link-arrow">Museer och kultur <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/guide/mallorca-med-barn-manad-for-manad" className="link-arrow">Med barn månad för månad <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/vader" className="link-arrow">Väder och prognos <span aria-hidden="true">→</span></Link></li>
          </ul>
        </nav>

        <LastChecked
          date="2026-11-20"
          note="Öppettider ändras med säsongen och kan skilja sig från uppgifterna här. Kontrollera alltid på aktivitetens egen webbplats samma dag."
          sources={[
            ...(BARN_SOURCES.grottor ?? []),
            { label: 'AEMET – normalvärden Palma de Mallorca, Aeropuerto 1981–2010', href: 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=B278&k=bal' },
            { label: 'Spain.info – Museo Monográfico de Pollentia', href: 'https://www.spain.info/es/lugares-interes/museo-monografico-pollentia/' },
            { label: 'Turisme Petit – Coves de Campanet', href: 'https://www.turismepetit.com/lugares-de-interes-mallorca/cuevas-de-campanet/' },
            { label: 'Majorca Daily Bulletin – öppningsdatum för attraktioner 2026', href: 'https://www.majorcadailybulletin.com/holiday/attractions/2026/03/17/140729/mallorca-attractions-opening-dates-waterpark-set-splash-into-summer-with-two-new-slides.html' },
            { label: 'Taquilla.com – Katmandu Park', href: 'https://www.taquilla.com/entradas/katmandu-park' },
            { label: 'Mejorruta – Palma till Porto Cristo', href: 'https://www.mejorruta.com/distancia/2512989-2512378/Palma/Porto-Cristo/' },
          ]}
        />
      </div>
    </div>
  );
}
