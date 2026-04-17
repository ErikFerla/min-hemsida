/**
 * FullBleedImage — edge-to-edge section-breaking image.
 *
 * Breaks out of any centered container (max-width + margin:auto)
 * using the calc(-50vw + 50%) technique. Vertical spacing scales
 * from 48px (mobile) to 96px (desktop) via clamp().
 *
 * Usage:
 *   <FullBleedImage
 *     src="https://images.unsplash.com/photo-xxx?w=1600&q=80"
 *     alt="Descriptive alt text"
 *     aspectRatio="3 / 1"
 *   />
 */

function unsplashSrcSet(src: string): string {
  const base = src.replace(/[?&]w=\d+/, '').replace(/[?&]q=\d+/, '');
  const sep = base.includes('?') ? '&' : '?';
  return [640, 1024, 1600, 2400]
    .map(w => `${base}${sep}w=${w}&q=80 ${w}w`)
    .join(', ');
}

interface FullBleedImageProps {
  src: string;
  alt: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9" or "3 / 1". Default: "16 / 5" */
  aspectRatio?: string;
  /** HTML intrinsic width hint for CLS prevention. Default: 1600 */
  width?: number;
  /** HTML intrinsic height hint for CLS prevention. Default: 500 */
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Extra CSS class on the outer figure */
  className?: string;
  /** Object-position override. Default: "center" */
  objectPosition?: string;
}

export default function FullBleedImage({
  src,
  alt,
  caption,
  aspectRatio = '16 / 5',
  width = 1600,
  height = 500,
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  objectPosition = 'center',
}: FullBleedImageProps) {
  const srcSet = src.includes('unsplash.com') ? unsplashSrcSet(src) : undefined;

  return (
    <figure className={`full-bleed-image ${className}`.trim()}>
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          aspectRatio,
          objectFit: 'cover',
          objectPosition,
        }}
      />
      {caption && (
        <figcaption className="full-bleed-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
