import Link from 'next/link';
import Image from 'next/image';
import { IconPin, IconFlag, IconBulb, IconStar, IconInfo, PriceTag, tierFromEmoji } from '@/components/Icons';
import Map, { type MapMarker } from '@/components/Map';
import HeroImage from '@/components/HeroImage';
import { golfbanor } from '@/data/golf-courses';
import type { CSSProperties } from 'react';
import GolfRegionFilter from './GolfRegionFilter';
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
        src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b"
        alt="Välklippt green med havsutsikt vid en golfbana på Mallorca"
        kicker="Aktiviteter på Mallorca"
        title="22 golfbanor på Mallorca"
        subtitle="Komplett guide till alla golfbanor – för alla nivåer och budgetar"
      />

      <div className={styles.inner}>

        {/* ── KARTA ── */}
        <section aria-labelledby="golf-map-title" className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <p className={styles.eyebrow}>
              Utforska på karta
            </p>
            <h2 id="golf-map-title" className={styles.sectionTitle}>
              Alla 22 golfbanor på Mallorca
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
                <Image src={b.bild} alt={b.namn} width={600} height={200} className={styles.image} loading="lazy" />
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
                  <span className={styles.price}><PriceTag tier={tierFromEmoji(b.pris)} /></span>
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
      </div>
    </div>
  );
}
