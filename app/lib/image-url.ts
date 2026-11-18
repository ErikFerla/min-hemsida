/**
 * Bild-URL:er i olika storlekar för de tre bildkällorna på sajten:
 *  - Unsplash (images.unsplash.com/photo-…): storlek via query string (?w=…).
 *  - Wikimedia Commons (upload.wikimedia.org/…/thumb/…/1920px-Fil.jpg): storlek via thumb-URL:en.
 *    Ange alltid en thumb-URL (helst 1920px) – originalfilerna är ofta 5–20 MB.
 *  - Lokala filer (/bilder/…): via Next.js bildoptimering (/_next/image).
 */

export const COMMONS_WIDTHS = [960, 1280, 1920] as const;
/** Bredder som next.config.ts tillåter (deviceSizes) – /_next/image svarar 400 på andra. */
const NEXT_WIDTHS = [390, 768, 1024, 1280, 1600] as const;

export function isUnsplash(src: string): boolean {
  return src.startsWith('https://images.unsplash.com/');
}

const COMMONS_THUMB = /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/.+\/)(\d+)px-([^/]+)$/;

export function isCommonsThumb(src: string): boolean {
  return COMMONS_THUMB.test(src);
}

/** Commons-thumb i given bredd (använd en av COMMONS_WIDTHS – Wikimedia föredrar standardstorlekar). */
export function commonsThumb(src: string, width: number): string {
  return src.replace(COMMONS_THUMB, `$1${width}px-$3`);
}

function nearestNextWidth(width: number): number {
  return NEXT_WIDTHS.find((w) => w >= width) ?? NEXT_WIDTHS[NEXT_WIDTHS.length - 1];
}

/** Lokal fil eller annan tillåten värd via Next.js bildoptimering. */
export function nextImageUrl(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${nearestNextWidth(width)}&q=75`;
}

/**
 * Bild-URL i ungefär given bredd för en bild som inte ligger på Unsplash
 * (Unsplash-URL:er bygger komponenterna själva, med sina egna parametrar).
 */
export function sizedImageUrl(src: string, width: number): string {
  if (isCommonsThumb(src)) {
    const w = COMMONS_WIDTHS.find((cw) => cw >= width) ?? COMMONS_WIDTHS[COMMONS_WIDTHS.length - 1];
    return commonsThumb(src, w);
  }
  return nextImageUrl(src, width);
}

/** srcSet för en bild som inte ligger på Unsplash. */
export function sizedImageSrcSet(src: string): string {
  if (isCommonsThumb(src)) return COMMONS_WIDTHS.map((w) => `${commonsThumb(src, w)} ${w}w`).join(', ');
  return NEXT_WIDTHS.map((w) => `${nextImageUrl(src, w)} ${w}w`).join(', ');
}

/**
 * Open Graph-bild (absolut URL). Unsplash beskärs till 1200×630; Commons ger 1280px-thumben;
 * lokala filer går via bildoptimeringen på sajtens domän.
 */
export function ogImageUrl(src: string, baseUrl: string): string {
  if (isUnsplash(src)) return `${src}?w=1200&h=630&fit=crop&q=85`;
  const m = src.match(COMMONS_THUMB);
  if (m) return commonsThumb(src, Math.min(1280, Number(m[2])));
  if (src.startsWith('/')) return `${baseUrl}${nextImageUrl(src, 1280)}`;
  return src;
}

/**
 * Bild-URL för kort och detaljvyer: Unsplash får storleksparametrar, Commons-thumbs krymps till
 * högst `width` (aldrig bredare än den thumb som angetts – Commons svarar fel för bredder större än
 * originalet), övriga URL:er lämnas orörda.
 */
export function cardImageUrl(src: string, width: 960 | 1280): string {
  if (isUnsplash(src)) return `${src}?w=${width}&q=80`;
  const m = src.match(COMMONS_THUMB);
  if (m) return commonsThumb(src, Math.min(width, Number(m[2])));
  return src;
}
