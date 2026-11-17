import Link from 'next/link';
import Image from 'next/image';
import { IconFlag, IconHiker, IconSnorkel, IconUsers, IconWave, IconExternal, IconPin } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import type { ComponentType } from 'react';
import styles from './page.module.css';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

type Aktivitet = {
  titel: string;
  beskrivning: string;
  Icon: ComponentType<{ size?: number }>;
  href: string;
  bild: string;
  highlights: string[];
};

type BarnTips = { namn: string; plats: string; ålder: string; kategori: string; beskrivning: string; bild: string };

const barnvanligt: BarnTips[] = [
  { namn: 'Palma Akvarium', plats: 'Palma', ålder: 'Alla åldrar', kategori: 'Akvarium', beskrivning: 'Europas djupaste hajbassäng och 55 olika akvarium. Boka online för rabatt och kortare kö.', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
  { namn: 'Coves del Drach', plats: 'Porto Cristo', ålder: 'Alla åldrar', kategori: 'Grotta', beskrivning: 'Imponerande droppstensgrottor med en klassisk konsert på öns största underjordiska sjö.', bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=800&q=80' },
  { namn: 'Aqualand El Arenal', plats: 'El Arenal', ålder: 'Alla åldrar', kategori: 'Vattenpark', beskrivning: 'Öns största vattenpark. Kom tidigt på morgonen för kortare köer — heldagsupplevelse.', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800&q=80' },
  { namn: 'Marineland', plats: 'Costa de Blanes', ålder: 'Alla åldrar', kategori: 'Djurpark', beskrivning: 'Delfinshow, sjölejon och papegojor. Vattenpark på samma anläggning gör det till heldags.', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800&q=80' },
  { namn: 'House of Katmandu', plats: 'Magaluf', ålder: '4+ år', kategori: 'Äventyr', beskrivning: '4D-bio, spegellabyrint och minigolf under samma tak. Perfekt vid regnväder.', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' },
  { namn: 'Safari Zoo Porto Cristo', plats: 'Porto Cristo', ålder: 'Alla åldrar', kategori: 'Djurpark', beskrivning: 'Kör genom safariparken i egen bil, med kamelridning och giraffutfodring som tillval.', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
  { namn: 'Glassbottenbåt Cala d\'Or', plats: 'Cala d\'Or', ålder: 'Alla åldrar', kategori: 'Båttur', beskrivning: 'Se undervattenslivet utan att bli blöt. Familjevänliga turer på ca 1 timme.', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80' },
  { namn: 'Zipline La Reserva', plats: 'Puigpunyent', ålder: '6+ år', kategori: 'Äventyr', beskrivning: 'Europas längsta ziplines i bergsmiljö. Kombinera med vandringen i naturparken.', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80' },
];

const aktiviteter: Aktivitet[] = [
  {
    titel: 'Golf på Mallorca',
    beskrivning: 'Mallorca har 22 golfbanor i världsklass – från nybörjarvänliga till europeisk toppklass med fantastisk havsutsikt.',
    Icon: IconFlag,
    href: '/aktiviteter/golf',
    bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    highlights: ['22 golfbanor', 'Alla nivåer', 'Havsutsikt'],
  },
  {
    titel: 'Vandring i Tramuntana',
    beskrivning: 'Serra de Tramuntana är ett UNESCO-världsarv med spektakulära vandringsleder genom olivlundar och bergsdalar.',
    Icon: IconHiker,
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    highlights: ['UNESCO-världsarv', 'GR-221 leden', 'Alla svårigheter'],
  },
  {
    titel: 'Vattensport',
    beskrivning: 'Kristallklart vatten och perfekta vindförhållanden gör Mallorca till ett paradis för segling, kajakpaddling och snorkling.',
    Icon: IconSnorkel,
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80',
    highlights: ['Segling', 'Kajakpaddling', 'Snorkling'],
  },
  {
    titel: 'Barn & Familj',
    beskrivning: 'Vattenparker, djurparker, grottor och äventyr – Mallorca är ett av Europas bästa resmål för barnfamiljer.',
    Icon: IconUsers,
    href: '/barn',
    bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80',
    highlights: ['Vattenparker', 'Djurparker', 'Grottor'],
  },
  {
    titel: 'Cykling',
    beskrivning: 'Mallorca är cyklisternas mekka – professionella lag tränar här på vintern. Välj mellan bergsetapper och kustvägar.',
    Icon: IconHiker,
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    highlights: ['Mallorca 312', 'Tramuntana', 'Cykeluthyrning'],
  },
  {
    titel: 'Båtliv & Segling',
    beskrivning: 'Utforska Mallorcas dramatiska kustlinje från havet – charter, guidade båtturer och glassbottenbåtar.',
    Icon: IconWave,
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    highlights: ['Båtcharter', 'Guidade turer', 'Glassbottenbåt'],
  },
];

export default function AktiviteterPage() {
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }, { name: 'Aktiviteter', url: '/aktiviteter' }]} />
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1533105079780-92b9be482077"
        alt="Vandrare på en bergstig i Serra de Tramuntana – Mallorcas aktiva sida"
        kicker="Upplev Mallorca"
        title="Aktiviteter på Mallorca"
        subtitle="Golf, vandring, vattensport och mycket mer – för alla smaker"
        height="55vh"
      />

      {/* Innehåll */}
      <div className={styles.inner}>
        <div className={styles.cardGrid}>
          {aktiviteter.map((a, i) => (
            <Link key={i} href={a.href} className={styles.cardLink}>
              <div className={styles.card}>
                <Image src={a.bild} alt={a.titel} width={600} height={200} className={styles.cardImage} loading="lazy" />
                <div className={styles.cardBody}>
                  <div className={styles.cardIcon}><a.Icon size={28} /></div>
                  <h2 className={styles.cardTitle}>{a.titel}</h2>
                  <p className={styles.cardText}>{a.beskrivning}</p>
                  <div className={styles.chips}>
                    {a.highlights.map((h, j) => (
                      <span key={j} className={styles.chip}>{h}</span>
                    ))}
                  </div>
                  <div className={styles.cardButton}>
                    Utforska →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section id="barnvanligt" className={`${styles.section} ${styles.sectionMobile}`}>
          <p className={styles.eyebrow}>För hela familjen</p>
          <h2 className={styles.sectionTitle}>Barnvänligt</h2>
          <p className={styles.intro}>
            Vattenparker, grottor, djurparker och äventyrsparker – Mallorca hör till Europas bästa resmål för barnfamiljer. Här är våra handplockade favoriter.
          </p>

          <div className={styles.barnGrid}>
            {barnvanligt.map(b => (
              <article key={b.namn} className={styles.barnCard}>
                <div className={styles.barnImage}>
                  <Image src={b.bild} alt={b.namn} fill sizes="(max-width:768px) 100vw, 360px" className={styles.cover} loading="lazy" />
                  <div className={styles.badge}>{b.kategori}</div>
                </div>
                <div className={styles.barnBody}>
                  <h3 className={styles.barnTitle}>{b.namn}</h3>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}><IconPin size={11} /> {b.plats}</span>
                    <span className={styles.metaItem}><IconUsers size={11} /> {b.ålder}</span>
                  </div>
                  <p className={styles.barnText}>{b.beskrivning}</p>
                </div>
              </article>
            ))}
          </div>

          <Link href="/barn" className={styles.darkButton}>
            Se alla barnaktiviteter <IconExternal size={13} stroke={1.8} />
          </Link>
        </section>

        <div className={styles.section}>
          <p className={styles.eyebrow}>LÄS VIDARE</p>
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
                <span className={styles.readLink}>Läs mer →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
