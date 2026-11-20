import Link from 'next/link';
import Image from 'next/image';
import { IconFlag, IconHiker, IconSnorkel, IconUsers, IconWave, IconExternal, IconPin } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import type { ComponentType } from 'react';
import styles from './page.module.css';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import LastChecked from '@/app/components/LastChecked';

type Aktivitet = {
  titel: string;
  beskrivning: string;
  Icon: ComponentType<{ size?: number }>;
  href: string;
  bild: string;
  /** Beskriver vad bilden faktiskt visar. */
  bildAlt: string;
  highlights: string[];
};

type BarnTips = { namn: string; plats: string; ålder: string; kategori: string; beskrivning: string; bild: string; bildAlt: string };

const barnvanligt: BarnTips[] = [
  { namn: 'Palma Aquarium', plats: 'Palma', ålder: 'Alla åldrar', kategori: 'Akvarium', beskrivning: 'Hajtanken Big Blue och omkring 700 arter. Köp biljetten online – ofta billigare och utan kö.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG/1920px-Palma_Aquarium-Tibur%C3%B3n_puntas_negras.JPG', bildAlt: 'Svartfenad revhaj i en bassäng på Palma Aquarium' },
  { namn: 'Coves del Drac', plats: 'Porto Cristo', ålder: 'Alla åldrar', kategori: 'Grotta', beskrivning: 'Imponerande droppstensgrottor med en klassisk konsert på öns största underjordiska sjö.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Coves_del_Drac_01.jpg/1920px-Coves_del_Drac_01.jpg', bildAlt: 'Upplysta droppstenar inne i Coves del Drac' },
  { namn: 'Aqualand El Arenal', plats: "s'Arenal", ålder: 'Alla åldrar', kategori: 'Vattenpark', beskrivning: 'Öns största vattenpark. Kom tidigt på morgonen för kortare köer – heldagsupplevelse.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aqualand_s%27Arenal_tobogan_blanc.jpg/1280px-Aqualand_s%27Arenal_tobogan_blanc.jpg', bildAlt: 'Vattenrutschbanor på Aqualand i s\'Arenal' },
  { namn: 'Marineland', plats: "Costa d'en Blanes", ålder: 'Alla åldrar', kategori: 'Djurpark', beskrivning: 'Delfiner, sjölejon och papegojor med shower – lagom stort för en halvdag.', bild: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Delfinschow_im_Marineland_Mallorca.jpg', bildAlt: 'Delfinshow på Marineland Mallorca med publik på läktaren' },
  { namn: 'Katmandu Park', plats: 'Magaluf', ålder: '4+ år', kategori: 'Äventyr', beskrivning: 'Det upp-och-nedvända huset med inomhusattraktioner, och vattenlek i Katopia Splash. Bra vid regnväder.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/House_of_Katmandu_Palmanova_Mallorca.jpg/1920px-House_of_Katmandu_Palmanova_Mallorca.jpg', bildAlt: 'Det upp-och-nedvända huset House of Katmandu i Magaluf' },
  { namn: 'Safari Zoo Sa Coma', plats: 'Sa Coma', ålder: 'Alla åldrar', kategori: 'Djurpark', beskrivning: 'Kör genom safariparken i egen bil bland giraffer, zebror och strutsar.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Girafa_al_safari.jpg/1920px-Girafa_al_safari.jpg', bildAlt: 'Giraff i safariparken vid Sa Coma, fotograferad från bilen' },
  { namn: 'Glasbottenbåt Cala d\'Or', plats: 'Cala d\'Or', ålder: 'Alla åldrar', kategori: 'Båttur', beskrivning: 'Se undervattenslivet utan att bli blöt. Turerna tar från ett par timmar upp till en heldag, ofta med badstopp.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Porto_Cristo_harbour_glass-bottom_catamarans_off-season_December_2025.jpg/1920px-Porto_Cristo_harbour_glass-bottom_catamarans_off-season_December_2025.jpg', bildAlt: 'Glasbottenbåtar i hamnen i Porto Cristo (bilden är inte från Cala d\'Or)' },
  { namn: 'Jungle Parc', plats: 'Santa Ponça', ålder: '4+ år', kategori: 'Äventyr', beskrivning: 'Klätter- och linbanor bland träden. Juniorbanan är för barn från 4 år som är minst 105 cm långa.', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Zip_line_over_the_falls_of_Li_Phi_at_sunrise_in_Don_Khon_Laos.jpg/1920px-Zip_line_over_the_falls_of_Li_Phi_at_sunrise_in_Don_Khon_Laos.jpg', bildAlt: 'Linbana över ett vattenfall – generisk bild, inte från Jungle Parc' },
];

const aktiviteter: Aktivitet[] = [
  {
    titel: 'Golf på Mallorca',
    beskrivning: 'Mallorca har drygt 20 golfbanor – från nybörjarvänliga till europeisk toppklass med havsutsikt.',
    Icon: IconFlag,
    href: '/aktiviteter/golf',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg', bildAlt: 'Green på Pula Golf vid Son Servera med berg i bakgrunden',
    highlights: ['Drygt 20 banor', 'Alla nivåer', 'Havsutsikt'],
  },
  {
    titel: 'Vandring i Tramuntana',
    beskrivning: 'Serra de Tramuntana finns på Unescos världsarvslista och har storslagna vandringsleder genom olivlundar och bergsdalar.',
    Icon: IconHiker,
    href: '/vandring-och-cykling',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Serra_de_Tramuntana_Valldemossa_01.jpg/1920px-Serra_de_Tramuntana_Valldemossa_01.jpg', bildAlt: 'Serra de Tramuntana sedd från vandringsleden Camí de s\'Arxiduc vid Valldemossa',
    highlights: ['Unescos världsarv', 'GR 221-leden', 'Alla svårigheter'],
  },
  {
    titel: 'Vattensport',
    beskrivning: 'Kristallklart vatten och perfekta vindförhållanden gör Mallorca till ett paradis för segling, kajakpaddling och snorkling.',
    Icon: IconSnorkel,
    href: '/strandar',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Schnorchler_%C3%BCber_Seegraswiese.JPG/1920px-Schnorchler_%C3%BCber_Seegraswiese.JPG', bildAlt: 'Snorklare över en sjögräsäng i Medelhavet',
    highlights: ['Segling', 'Kajakpaddling', 'Snorkling'],
  },
  {
    titel: 'Barn & familj',
    beskrivning: 'Vattenparker, djurparker, grottor och äventyr – Mallorca är ett av Europas bästa resmål för barnfamiljer.',
    Icon: IconUsers,
    href: '/barn',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Platja_de_Muro_R02.jpg/1920px-Platja_de_Muro_R02.jpg', bildAlt: 'Grunt vatten och sandstrand vid Platja de Muro',
    highlights: ['Vattenparker', 'Djurparker', 'Grottor'],
  },
  {
    titel: 'Cykling',
    beskrivning: 'Mallorca är cyklisternas mekka – professionella lag tränar här på vintern. Välj mellan bergsetapper och kustvägar.',
    Icon: IconHiker,
    href: '/vandring-och-cykling',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Cycle_Path_in_North_Mallorca.JPG/1920px-Cycle_Path_in_North_Mallorca.JPG', bildAlt: 'Cykelbana längs Pollençabukten med Formentorhalvön i bakgrunden',
    highlights: ['Mallorca 312', 'Tramuntana', 'Cykeluthyrning'],
  },
  {
    titel: 'Båtliv & segling',
    beskrivning: 'Utforska Mallorcas dramatiska kustlinje från havet – charter, guidade båtturer och glasbottenbåtar.',
    Icon: IconWave,
    href: '/batutflykter-och-cabrera',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Regata_Conde_de_Barcelona_-_panoramio.jpg/1280px-Regata_Conde_de_Barcelona_-_panoramio.jpg', bildAlt: 'Segelbåtar i regatta i Palmabukten',
    highlights: ['Båtcharter', 'Guidade turer', 'Glasbottenbåt'],
  },
];

export default function AktiviteterPage() {
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Aktiviteter', url: '/aktiviteter' }]} />
      {/* Hero */}
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Serra_de_Tramuntana_Valldemossa_01.jpg/1920px-Serra_de_Tramuntana_Valldemossa_01.jpg"
        alt="Serra de Tramuntana sedd från vandringsleden Camí de s'Arxiduc vid Valldemossa"
        photoCredit="Foto: Heuschrecke / Wikimedia Commons (CC BY-SA 3.0)"
        kicker="Upplev Mallorca"
        title="Aktiviteter på Mallorca"
        subtitle="Golf, vandring, vattensport och mycket mer – för alla smaker"
        height="55vh"
      />

      {/* Innehåll */}
      <div className={styles.inner}>
        <div className={styles.cardGrid}>
          {aktiviteter.map((a, i) => (
            <Link key={i} href={a.href} className={styles.card}>
              <div className={styles.media}>
                <Image src={a.bild} alt={a.bildAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px" loading="lazy" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardIcon}><a.Icon size={28} /></div>
                <h2 className={styles.cardTitle}>{a.titel}</h2>
                <p className={styles.cardText}>{a.beskrivning}</p>
                <div className={styles.chips}>
                  {a.highlights.map((h, j) => (
                    <span key={j} className={styles.chip}>{h}</span>
                  ))}
                </div>
                <span className={`link-arrow ${styles.more}`}>
                  Utforska →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section id="barnvanligt" className={styles.section}>
          <p className={styles.eyebrow}>För hela familjen</p>
          <h2 className={styles.sectionTitle}>Barnvänligt</h2>
          <p className={styles.intro}>
            Vattenparker, grottor, djurparker och äventyrsparker – här är våra handplockade favoriter.
          </p>

          <div className={styles.barnGrid}>
            {barnvanligt.map(b => (
              <article key={b.namn} className={styles.barnCard}>
                <div className={styles.barnImage}>
                  <Image src={b.bild} alt={b.bildAlt} fill sizes="(max-width: 639px) 100vw, 300px" loading="lazy" />
                  <div className={styles.badge}>{b.kategori}</div>
                </div>
                <div className={styles.barnBody}>
                  <h3 className={styles.barnTitle}>{b.namn}</h3>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}><IconPin size={12} /> {b.plats}</span>
                    <span className={styles.metaItem}><IconUsers size={12} /> {b.ålder}</span>
                  </div>
                  <p className={styles.barnText}>{b.beskrivning}</p>
                </div>
              </article>
            ))}
          </div>

          <Link href="/barn" className="btn btn-secondary">
            Se alla barnaktiviteter <IconExternal size={13} stroke={1.8} />
          </Link>
        </section>

        <div className={styles.section}>
          <p className={styles.eyebrow}>Läs vidare</p>
          <h2 className={styles.sectionTitle}>Fördjupa dig</h2>
          <div className={styles.readGrid}>
            {[
              { titel: 'Golfguiden', text: 'Vilka banor passar din nivå, och vilka är värda en extra resdag? Vår genomgång av öns golfbanor.', href: '/guide/golf-mallorca-guide' },
              { titel: 'Vingårdar på Mallorca', text: 'Binissalem, Pla i Llevant och små familjeägda bodegas – perfekt för en lugn dag för två.', href: '/vingardar' },
              { titel: 'Mallorca med barn', text: 'Vattenparker, grottor och djurparker, med tips om vilken ålder varje upplevelse passar för.', href: '/guide/mallorca-med-barn' },
            ].map(t => (
              <Link key={t.href} href={t.href} className={styles.readCard}>
                <h3 className={styles.readTitle}>{t.titel}</h3>
                <p className={styles.readText}>{t.text}</p>
                <span className={`link-arrow ${styles.more}`}>Läs mer →</span>
              </Link>
            ))}
          </div>
        </div>

        <LastChecked
          date="2026-11-20"
          sources={[
            { label: 'Palma Aquarium', href: 'https://www.palmaaquarium.com' },
            { label: 'Jungle Parc', href: 'https://www.jungleparc.es' },
            { label: 'Starfish glasbottenbåtar (via CheckYeti)', href: 'https://www.checkyeti.com/en/boat-tours/spain/cala-dor/glass-bottom-boat-trips' },
            { label: 'Unesco: Serra de Tramuntana', href: 'https://whc.unesco.org/en/list/1371' },
          ]}
        />
      </div>
    </div>
  );
}
