import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import { beaches, BEACHES_HERO, type RedaktionellTyp } from '@/data/beaches';
import StrandFilter from './StrandFilter';
import DagensStrand from './DagensStrand';
import LastChecked from '@/app/components/LastChecked';
import { MET_NO_SOURCE } from '@/data/climate';
import TipBox from '@/components/TipBox';
import styles from './strandar.module.css';

const LIST_ID = 'strand-lista';

// Redaktionell notis som enkel text med statusprick (5.3) – kortets enda ruta är tipset (TipBox).
const NOTE: Record<RedaktionellTyp, { klass: string; label: string }> = {
  varning: { klass: styles.noteVarning, label: 'Varning' },
  tips: { klass: styles.noteTips, label: 'Redaktionens tips' },
  bast: { klass: styles.noteBast, label: 'Bäst för' },
  info: { klass: styles.noteInfo, label: 'Info' },
};

export default function StrandarPage() {
  return (
    <div className={styles.page}>
      <header>
        {/* Hero-bild – LCP-element, samma komponent som övriga bildheror (5.1) */}
        <HeroImage
          src={BEACHES_HERO.base}
          alt={BEACHES_HERO.alt}
          kicker="Upptäck kusten"
          title="Stränder på Mallorca"
          height="clamp(360px, 58vh, 620px)"
          photoCredit={BEACHES_HERO.credit}
        />

        {/* Intro – geografisk översikt med interna länkar */}
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.introText}>
              Mallorca rymmer mer än 200 stränder och vikar längs sina fyra kuster. Längs syd- och östkusten ligger öns mest fotograferade <em>calas</em> – små turkosa vikar inbäddade mellan kalkstensklippor och tallskog, som Caló des Moro och Cala Mondragó. Nordkusten bjuder på långa sandstränder i de grunda bukterna vid{' '}
              <Link href="/alcudia" className={styles.inlineLink}>Alcúdia</Link>
              {' '}och{' '}
              <Link href="/pollenca" className={styles.inlineLink}>Pollença</Link>
              {' '}– perfekta för barnfamiljer. Västkusten domineras av Serra de Tramuntanas dramatiska klippor som faller rakt ner i havet – få stränder, men desto fler hemliga vikar och båtankringsplatser. Och söderut öppnar sig de långa sandstränderna kring Es Trenc, med vatten som påminner om Karibien.
            </p>
            <p className={`${styles.introText} ${styles.introTextLast}`}>
              Här är våra 30 favoriter – handplockade efter vatten, atmosfär och vad som gör varje plats unik.
            </p>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <DagensStrand beaches={beaches.map(({ namn, region, typ, vetterMot, maps }) => ({ namn, region, typ, vetterMot, maps }))} />
        <p className={styles.filterIntro}>
          Använd filtren nedan för att hitta rätt strand för dig. Filtrera på område, strandtyp eller kännetecken som familjevänlighet eller snorkling.
        </p>
        <StrandFilter
          listId={LIST_ID}
          beaches={beaches.map(({ region, typ, familj, snorkling, nudist }) => ({ region, typ, familj, snorkling, nudist }))}
        />

        <div className={styles.guideBox}>
          <p className={styles.guideText}>
            <strong>Vill du veta mer?</strong> Läs vår rankade guide med GPS-koordinater, parkeringstips och insidertips.
          </p>
          <Link href="/guide/basta-stranderna-mallorca" className={`btn btn-primary ${styles.guideButton}`}>
            Läs guiden →
          </Link>
        </div>

        <ul id={LIST_ID} className={styles.list}>
          {beaches.map((s) => (
            <li
              key={s.namn}
              data-region={s.region}
              data-typ={s.typ}
              data-familj={s.familj || undefined}
              data-snorkling={s.snorkling || undefined}
              data-nudist={s.nudist || undefined}
              className={styles.item}
            >
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image src={s.bild} alt={s.bildAlt} fill sizes="(max-width: 639px) 96px, (max-width: 1023px) 50vw, 360px" loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <h2 className={styles.name}>{s.namn}</h2>
                    <p className={styles.meta}>
                      {s.längd} <span aria-hidden="true">·</span> {s.svårighet}
                    </p>
                    <div className={styles.labels}>
                      <span className={styles.badge}>{s.region}</span>
                      <span className={styles.badge}>{s.typ}</span>
                    </div>
                    {(s.familj || s.snorkling || s.nudist) && (
                      <div className={styles.tags}>
                        {s.familj && <span className={styles.tag}>Familj</span>}
                        {s.snorkling && <span className={styles.tag}>Snorkling</span>}
                        {s.nudist && <span className={styles.tag}>Nudist</span>}
                      </div>
                    )}
                  </div>
                  <p className={styles.description}>{s.beskrivning}</p>
                  {s.redaktionellt && (
                    <p className={`${styles.note} ${NOTE[s.redaktionellt.typ].klass}`}>
                      <strong className={styles.noteLabel}>{NOTE[s.redaktionellt.typ].label}:</strong>{' '}
                      {s.redaktionellt.text}
                    </p>
                  )}
                  <div className={styles.foot}>
                    <details className={styles.tipDetails}>
                      <summary className={styles.tipSummary}>Visa tips</summary>
                      <TipBox variant="compact" heading="Tips" as="p">
                        <p>{s.tips}</p>
                      </TipBox>
                    </details>
                    <div className={styles.actions}>
                      <a href={s.maps} target="_blank" rel="noopener noreferrer" className="link-arrow">
                        Visa på karta ↗
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.more}>
          <p className={styles.moreKicker}>Planera vidare</p>
          <h2 className={styles.moreTitle}>Inför stranddagen</h2>
          <div className={styles.moreGrid}>
            {[
              { titel: 'Kolla vinden först', text: 'Blåser det från norr är sydkustens vikar ofta lugnast – och tvärtom. En snabb titt på prognosen kan rädda dagen.', href: '/vader', cta: 'Se väderprognosen' },
              { titel: 'Stranddag med barn', text: 'Grunt vatten, skugga och toaletter i närheten? Filtrera på Familjevänlig ovan – och hitta fler upplevelser för barnen.', href: '/barn', cta: 'Mallorca med barn' },
              { titel: 'När är vattnet varmast?', text: 'Havet är som varmast från juli till september. Läs mer om vilken månad som passar dig bäst.', href: '/guide/basta-tid-resa-mallorca', cta: 'Bästa tiden att resa' },
            ].map(t => (
              <Link key={t.href} href={t.href} className={styles.moreCard}>
                <h3 className={styles.moreCardTitle}>{t.titel}</h3>
                <p className={styles.moreCardText}>{t.text}</p>
                <span className={`link-arrow ${styles.moreCardLink}`}>{t.cta} →</span>
              </Link>
            ))}
          </div>
        </div>

        <LastChecked
          date="2026-11-20"
          sources={[
            MET_NO_SOURCE,
            { label: 'DGT – trafik till Formentor 2026', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
            { label: 'MITECO – Guía de playas: Alcúdia', href: 'https://www.miteco.gob.es/es/costas/temas/proteccion-medio-marino/anexoi-fichaplayaalcudia_tcm30-535251.pdf' },
            { label: 'Spain.info – Es Trenc', href: 'https://www.spain.info/es/playa/es-trenc/' },
          ]}
          note="Dagens strand bygger på met.no:s vindprognos. Parkering, avgifter och service vid stränderna ändras mellan säsongerna – kontrollera på plats innan du åker."
        />
      </div>
    </div>
  );
}
