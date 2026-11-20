import type { CSSProperties } from 'react';
import { HERO_QUALITY, isUnsplash, sizedImageSrcSet, sizedImageUrl } from '@/app/lib/image-url';
import EagerImage from './EagerImage';
import styles from './HeroImage.module.css';

export type HeroImageProps = {
  /**
   * Unsplash-bas-URL utan query string ("https://images.unsplash.com/photo-XXX"),
   * Commons-thumb-URL (".../thumb/.../1920px-Fil.jpg") eller lokal fil ("/bilder/...").
   */
  src: string;
  /** REQUIRED: unique Swedish SEO alt-text describing the image */
  alt: string;
  /** H1 text */
  title: string;
  /** Etikett (versaler via CSS) ovanför h1 */
  kicker?: string;
  /** Paragraph below the H1 */
  subtitle?: string;
  /** Hero height. Default 60vh. */
  height?: string;
  /** Fotokredit – visas i en egen rad under bilden, t.ex. "Foto: Luca / Unsplash" */
  photoCredit?: string;
};

const SRCSET_WIDTHS = [640, 960, 1280, 1600, 2000];
const SRC_WIDTH = 1600;

function buildUrl(baseUrl: string, width: number) {
  if (!isUnsplash(baseUrl)) return sizedImageUrl(baseUrl, width, HERO_QUALITY);
  return `${baseUrl}?w=${width}&q=80&fm=webp&auto=format`;
}

function buildSrcSet(baseUrl: string) {
  if (!isUnsplash(baseUrl)) return sizedImageSrcSet(baseUrl, HERO_QUALITY);
  return SRCSET_WIDTHS.map((w) => `${buildUrl(baseUrl, w)} ${w}w`).join(', ');
}

export default function HeroImage({
  src,
  alt,
  title,
  kicker,
  subtitle,
  height = '60vh',
  photoCredit,
}: HeroImageProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.frame} style={{ '--hero-height': height } as CSSProperties}>
        <EagerImage
          src={buildUrl(src, SRC_WIDTH)}
          srcSet={buildSrcSet(src)}
          sizes="100vw"
          alt={alt}
          width={2000}
          height={1125}
          className={styles.image}
        />
        <div aria-hidden="true" className={styles.overlay} />
        <div className={styles.content}>
          {kicker && <p className={styles.kicker}>{kicker}</p>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {/* Fotokrediten i egen rad under bilden – aldrig över texten */}
      {photoCredit && <p className={styles.credit}>{photoCredit}</p>}
    </section>
  );
}
