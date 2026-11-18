import Image from 'next/image';
import Link from 'next/link';
import { beaches, BEACHES_HERO, type RedaktionellTyp } from '@/data/beaches';
import StrandFilter from './StrandFilter';
import DagensStrand from './DagensStrand';
import LastChecked from '@/app/components/LastChecked';
import { MET_NO_SOURCE } from '@/data/climate';
import h from '../guide/headings.module.css';
import styles from './strandar.module.css';

const LIST_ID = 'strand-lista';

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
        {/* Hero-bild – LCP-element, eager-laddad med srcset och fetchpriority="high" */}
        <div className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element -- LCP-bild med egen srcset från Wikimedia Commons, förladdas i layout.tsx */}
          <img
            src={BEACHES_HERO.src}
            srcSet={BEACHES_HERO.srcSet}
            sizes={BEACHES_HERO.sizes}
            alt={BEACHES_HERO.alt}
            width={2000}
            height={1333}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className={styles.heroImage}
          />
          <div aria-hidden="true" className={styles.heroShade} />
          <div className={styles.heroText}>
            <p className={styles.heroKicker}>
              Upptäck kusten
            </p>
            <h1 className={styles.title}>
              Stränder på Mallorca
            </h1>
            <div className={styles.heroRule} />
          </div>
          <p className={styles.credit}>
            {BEACHES_HERO.credit}
          </p>
        </div>

        {/* Intro – geografisk översikt med interna länkar */}
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.introText}>
              Mallorca rymmer mer än 200 stränder och vikar längs sina fyra kuster. På östkusten ligger öns mest fotograferade <em>calas</em> – små turkosa vikar inbäddade mellan kalkstensklippor och pinjeskog, som Caló des Moro och Cala Mondragó. Nordkusten bjuder på långa sandstränder i de grunda bukterna vid{' '}
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
          <Link href="/guide/basta-stranderna-mallorca" className={styles.guideButton}>
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
              className={`a2-lift ${styles.card}`}
            >
              <div className={styles.media}>
                <Image src={s.bild} alt={s.bildAlt} fill sizes="(max-width: 600px) 100vw, 400px" className={styles.mediaImage} loading="lazy" />
                <div className={styles.badges}>
                  <span className={styles.badge}>{s.region}</span>
                  <span className={`${styles.badge} ${styles.badgeType}`}>{s.typ}</span>
                </div>
              </div>
              <div className={styles.body}>
                <h2 className={`${h.h2} ${styles.name}`}>{s.namn}</h2>
                <p className={styles.meta}>
                  {s.längd} <span className={styles.metaDot} aria-hidden="true">•</span> {s.svårighet}
                </p>
                <p className={styles.description}>{s.beskrivning}</p>
                <div className={styles.tip}>
                  <strong className={styles.tipLabel}>Tips:</strong> {s.tips}
                </div>
                {(s.familj || s.snorkling || s.nudist) && (
                  <div className={styles.tags}>
                    {s.familj && <span className={`${styles.tag} ${styles.tagFamily}`}>Familj</span>}
                    {s.snorkling && <span className={`${styles.tag} ${styles.tagSnorkel}`}>Snorkling</span>}
                    {s.nudist && <span className={`${styles.tag} ${styles.tagNudist}`}>Nudist</span>}
                  </div>
                )}
                {s.redaktionellt && (
                  <div className={`${styles.note} ${NOTE[s.redaktionellt.typ].klass}`}>
                    <strong className={styles.noteLabel}>
                      {NOTE[s.redaktionellt.typ].label}
                    </strong>
                    {s.redaktionellt.text}
                  </div>
                )}
                <a href={s.maps} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                  Visa på karta ↗
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.more}>
          <p className={styles.moreKicker}>PLANERA VIDARE</p>
          <h2 className={`${h.h2} ${styles.moreTitle}`}>Inför stranddagen</h2>
          <div className={styles.moreGrid}>
            {[
              { titel: 'Kolla vinden först', text: 'Blåser det från norr är sydkustens vikar ofta lugnast – och tvärtom. En snabb titt på prognosen kan rädda dagen.', href: '/vader', cta: 'Se väderprognosen' },
              { titel: 'Stranddag med barn', text: 'Grunt vatten, skugga och toaletter i närheten? Filtrera på Familjevänlig ovan – och hitta fler upplevelser för barnen.', href: '/barn', cta: 'Mallorca med barn' },
              { titel: 'När är vattnet varmast?', text: 'Havet är som varmast från juli till september. Läs mer om vilken månad som passar dig bäst.', href: '/guide/basta-tid-resa-mallorca', cta: 'Bästa tiden att resa' },
            ].map(t => (
              <Link key={t.href} href={t.href} className={styles.moreCard}>
                <h3 className={`${h.h3} ${styles.moreCardTitle}`}>{t.titel}</h3>
                <p className={styles.moreCardText}>{t.text}</p>
                <span className={styles.moreCardLink}>{t.cta} →</span>
              </Link>
            ))}
          </div>
        </div>

        <LastChecked
          date="2026-11-18"
          sources={[MET_NO_SOURCE]}
          note="Kontrollen gäller Dagens strand: vindprognosen och åt vilket håll stränderna vetter."
        />
      </div>
    </div>
  );
}
