import Link from 'next/link';
import { IconWave, IconSparkle, IconBuilding, IconBulb, IconMap } from '@/components/Icons';
import Map from '@/components/Map';
import { barnMapMarkers } from '@/data/barn-map';
import HubLink from '../HubLink';
import LastChecked from '@/app/components/LastChecked';
import type { ComponentType } from 'react';
import h from '../headings.module.css';
import styles from './page.module.css';
import t from '@/components/TextHero.module.css';

type Sektion = {
  rubrik: string;
  Icon: ComponentType<{ size?: number }>;
  kortText: string;
  punkter: string[];
};

const sektioner: Sektion[] = [
  {
    rubrik: 'Bästa barnvänliga stränderna',
    Icon: IconWave,
    kortText: 'Mallorca har hundratals stränder, men bara en handfull är riktigt barnvänliga. De bästa kombinerar grunt vatten, mjuk sand och service nära till hands.',
    punkter: ['Platja de Muro', 'Cala Millor', "Port d'Alcúdia", 'Cala Llombards'],
  },
  {
    rubrik: 'Vattenparker',
    Icon: IconSparkle,
    kortText: 'Tre stora vattenparker att välja mellan. Aqualand är störst, Hidropark i Alcúdia lugnast, och Western Water Park i Magaluf har vilda västern-tema.',
    punkter: ['Aqualand El Arenal', 'Hidropark Alcúdia', 'Western Water Park'],
  },
  {
    rubrik: 'Djurparker & natur',
    Icon: IconBuilding,
    kortText: 'Klassiska barnattraktioner som blandar natur och underhållning – från safaripark till magiska droppstensgrottor.',
    punkter: ['Safari Zoo Sa Coma', 'Coves del Drac', 'Marineland'],
  },
  {
    rubrik: 'Praktiska tips',
    Icon: IconBulb,
    kortText: 'Res i juni eller september för bästa balansen mellan väder och trängsel. Hyrbil är nödvändig – boka barnstol i förväg.',
    punkter: ['Bästa restid: juni eller september', 'Hyrbil är ett måste', 'Restaurangerna öppnar ofta kl. 20'],
  },
];

export default function MallorcaMedBarnGuide() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={t.hero}>
        <div className={t.inner}>
          <p className={t.kicker}>Familjereseguide · 2026</p>
          <h1 className={t.title}>Familjesemester på Mallorca</h1>
          <p className={t.lead}>Så planerar du resan med barn – från rätt strand för rätt ålder till familjefavoriterna på kartan.</p>
        </div>
      </header>

      <div className={styles.container}>

        <HubLink
          text="Letar du efter barnaktiviteter? Alla vattenparker, djurparker och tips för regniga dagar finns samlade på vår barnsida, där du kan filtrera efter ålder."
          href="/barn"
          label="Se alla barnaktiviteter"
        />

        {/* Snabbval */}
        <section className={styles.quick}>
          <p className={styles.quickLabel}><IconSparkle size={16} /> Snabbsvar – vad passar ditt barn?</p>
          <ul className={styles.quickList}>
            <li><strong>0–3 år:</strong> Platja de Muro</li>
            <li><strong>4–8 år:</strong> Aqualand + Coves del Drac</li>
            <li><strong>9–12 år:</strong> Kajak, snorkling, Safari Zoo</li>
            <li><strong>13+ år:</strong> Wakeboard, klipphopp, gatumat</li>
          </ul>
        </section>

        {/* Aktivitetskort */}
        <section className={styles.block}>
          <SectionHeading kicker="Vad ni kan göra" titel="Aktiviteter för hela familjen" />
          <div className={styles.cardGrid}>
            {sektioner.map((s) => (
              <article key={s.rubrik} className={styles.card}>
                <div className={styles.cardIcon}><s.Icon size={28} /></div>
                <h3 className={`${h.h3} ${styles.cardTitle}`}>{s.rubrik}</h3>
                <p className={styles.cardText}>{s.kortText}</p>
                <div className={styles.tags}>
                  {s.punkter.map(p => (
                    <span key={p} className={styles.tag}>{p}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Karta */}
        <section className={styles.block}>
          <SectionHeading kicker="Hitta dit" titel="Barnvänliga aktiviteter på kartan" />
          <p className={styles.mapText}>
            Här ser du de mest populära familjeaktiviteterna utspridda över ön – från vattenparker i söder till grottor på östkusten. Klicka på en markör för att läsa mer.
          </p>
          <div className={styles.mapFrame}>
            <Map
              markers={barnMapMarkers}
              height="clamp(320px, 60vh, 450px)"
              ariaLabel="Karta över familjeaktiviteter på Mallorca"
              listLabel="Visa alla platser som lista"
            />
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaKicker}>
            <IconMap size={16} stroke={1.8} />
            <span className={styles.ctaKickerText}>Mer för familjen</span>
          </div>
          <h2 className={h.h2}>Planera din familjeresa</h2>
          <p className={styles.ctaText}>Se alla barnaktiviteter med åldersrekommendationer, eller gör en egen resplan för familjen dag för dag.</p>
          <Link href="/barn" className="btn btn-primary">Se alla barnaktiviteter →</Link>
          <p className={styles.ctaSub}>
            <Link href="/?dagar=7&intressen=familj#resplanerare" className={styles.ctaSubLink}>Gör en resplan för familjen</Link>
          </p>
        </section>

        <LastChecked
          date="2026-11-18"
          note="Uppgifterna om parker och attraktioner följer barnsidorna, som granskades samtidigt."
          sources={[
            { label: 'Aqualand', href: 'https://www.aqualand.es' },
            { label: 'Marineland Mallorca', href: 'https://www.marineland.es' },
            { label: 'Palma Aquarium', href: 'https://www.palmaaquarium.com' },
            { label: 'Coves del Drac', href: 'https://www.cuevasdeldrach.com' },
          ]}
        />
      </div>
    </div>
  );
}

function SectionHeading({ kicker, titel }: { kicker: string; titel: string }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={`${h.h2} ${styles.sectionTitle}`}>{titel}</h2>
      <div className={styles.rule} />
    </div>
  );
}
