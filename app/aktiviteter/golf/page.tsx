import Link from 'next/link';
import Image from 'next/image';
import { IconPin, IconFlag, IconBulb, IconStar, IconInfo, PriceTag, tierFromPris } from '@/components/Icons';
import Map, { type MapMarker } from '@/components/Map';
import HeroImage from '@/components/HeroImage';
import { golfbanor } from '@/data/golf-courses';
import type { CSSProperties } from 'react';
import GolfRegionFilter from './GolfRegionFilter';
import LastChecked from '@/app/components/LastChecked';
import styles from './page.module.css';

const golfMarkers: MapMarker[] = golfbanor.map((b) => ({
  name: b.namn,
  lat: b.lat,
  lng: b.lng,
  href: `/aktiviteter/golf#${b.slug}`,
  desc: b.plats,
  meta: b.oneliner,
}));

// Nyanser som klarar 4,5:1 mot vit text (tidigare #27ae60 och #f39c12 gav 2,9:1 och 2,2:1).
const svårighetFärg: Record<string, string> = {
  'Lätt': '#15803d',
  'Medel': '#b45309',
  'Svår': '#993335',
};

/** Svårighetsfärgen som CSS-variabel till modulen */
const niva = (s: string) => ({ '--niva': svårighetFärg[s] }) as CSSProperties;

const notisKlass: Record<string, string> = {
  varning: styles.note_varning,
  tips: styles.note_tips,
  bast: styles.note_bast,
};

const regioner = ['Alla', 'Palma', 'Norr', 'Öst', 'Syd', 'Sydväst'];

export default function GolfPage() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg"
        alt="Green på Pula Golf vid Son Servera med berg i bakgrunden"
        photoCredit="Foto: Olaf Tausch / Wikimedia Commons (CC BY 3.0)"
        kicker="Aktiviteter på Mallorca"
        title={`${golfbanor.length} golfbanor på Mallorca`}
        subtitle="Öns golfbanor på en karta – för alla nivåer och budgetar"
      />

      <div className={styles.inner}>

        {/* ── KARTA ── */}
        <section aria-labelledby="golf-map-title" className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <p className={styles.eyebrow}>
              Utforska på karta
            </p>
            <h2 id="golf-map-title" className={styles.sectionTitle}>
              Alla {golfbanor.length} golfbanor på kartan
            </h2>
            <p className={styles.intro}>
              Klicka på en flagga för att se banan i listan nedan. Från Alcanada i norr till Andratx i sydväst.
            </p>
          </div>
          <Map
            markers={golfMarkers}
            pinVariant="flag"
            height="clamp(380px, 60vh, 560px)"
            ariaLabel={`Karta över alla ${golfbanor.length} golfbanor på Mallorca`}
            ctaLabel="Se banan"
            listLabel={false}
          />

          {/* Textfallback – alltid synlig, både a11y- och SEO-fördel */}
          <details className={styles.textList}>
            <summary className={styles.textListSummary}>
              Visa alla banor som textlista
            </summary>
            <ul className={styles.textListItems}>
              {golfbanor.map(b => (
                <li key={b.slug} className={styles.textListItem}>
                  <a href={`#${b.slug}`} className={styles.textListLink}>
                    {b.namn}
                  </a>{' '}
                  <span className={styles.textListPlace}>· {b.plats}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <div className={styles.listHeader}>
          <div>
            <h2 className={styles.sectionTitle}>
              Alla golfbanor
            </h2>
          </div>
          <div className={styles.legend}>
            {['Lätt', 'Medel', 'Svår'].map(s => (
              <div key={s} className={styles.legendItem}>
                <div className={styles.legendDot} style={niva(s)} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <GolfRegionFilter listId="golfbanor" regioner={regioner} banregioner={golfbanor.map(b => b.region)} />

        <div id="golfbanor" className={styles.grid}>
          {golfbanor.map((b) => (
            <article
              key={b.slug}
              id={b.slug}
              data-region={b.region}
              className={styles.card}
            >
              <div className={styles.media}>
                <Image src={b.bild} alt={b.bildAlt} width={600} height={200} className={styles.image} loading="lazy" />
                <div className={styles.difficulty} style={niva(b.svårighet)}>
                  {b.svårighet}
                </div>
                <div className={styles.region}>
                  {b.region}
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.cardTitle}>{b.namn}</h3>
                  <span className={styles.price}><PriceTag tier={tierFromPris(b.pris)} /></span>
                </div>
                <div className={styles.facts}>
                  <span className={styles.fact}><IconPin size={12} /> {b.plats}</span>
                  <span className={styles.fact}><IconFlag size={12} /> {b.hål} hål</span>
                </div>
                <p className={styles.description}>{b.beskrivning}</p>
                <div className={styles.tip}>
                  <IconBulb size={14} className={styles.tipIcon} /> {b.tips}
                </div>
                {b.redaktionellt && (
                  <div className={`${styles.note} ${notisKlass[b.redaktionellt.typ] ?? ''}`}>
                    <span className={styles.noteIcon}>
                      {b.redaktionellt.typ === 'varning' ? <IconInfo size={16} /> : b.redaktionellt.typ === 'tips' ? <IconStar size={16} /> : b.redaktionellt.typ === 'bast' ? <IconStar size={16} /> : <IconBulb size={16} />}
                    </span>
                    <span>{b.redaktionellt.text}</span>
                  </div>
                )}
                <a href={b.maps} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                  Visa på karta ↗
                </a>
                <a href={b.webb} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
                  Besök hemsida →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <h2 className={styles.sectionTitle}>
            Mer om golf på Mallorca
          </h2>
          <p className={styles.ctaText}>
            Vill du veta mer om banorna, säsongen och greenfee? Läs vår kompletta golfguide.
          </p>
          <Link href="/guide/golf-mallorca-guide" className={styles.ctaButton}>
            Läs vår golfguide →
          </Link>
        </div>

        <LastChecked
          date="2026-11-18"
          note="Prissymbolerna är ungefärliga nivåer, inte greenfee – kontrollera aktuellt pris hos banan."
          sources={[
            { label: 'Arabella Golf Mallorca', href: 'https://arabellagolfmallorca.com' },
            { label: 'Golf Son Gual', href: 'https://www.golfsongual.com' },
            { label: 'Pula Golf', href: 'https://pulagolf.com' },
            { label: '1golf.eu: Son Servera, Pollença, Canyamel, Santa Ponsa', href: 'https://www.1golf.eu/en/club/club-de-golf-santa-ponsa-i-ii-iii' },
            { label: 'Illes Balears: golfbanor', href: 'https://illesbalears.travel/en/mallorca/golf-course-golf-santa-ponca-i' },
          ]}
        />
      </div>
    </div>
  );
}
