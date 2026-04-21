import type { CSSProperties } from 'react';

export type HeroImageProps = {
  /** Base Unsplash URL without query string, e.g. "https://images.unsplash.com/photo-XXX" */
  src: string;
  /** REQUIRED: unique Swedish SEO alt-text describing the image */
  alt: string;
  /** H1 text */
  title: string;
  /** Uppercase eyebrow above the H1 */
  kicker?: string;
  /** Paragraph below the H1 */
  subtitle?: string;
  /** Hero height. Default 60vh. */
  height?: string;
};

const SRCSET_WIDTHS = [640, 960, 1280, 1600, 2000];
const SRC_WIDTH = 1600;

function buildUrl(baseUrl: string, width: number) {
  return `${baseUrl}?w=${width}&q=80&fm=webp&auto=format`;
}

function buildSrcSet(baseUrl: string) {
  return SRCSET_WIDTHS.map((w) => `${buildUrl(baseUrl, w)} ${w}w`).join(', ');
}

export default function HeroImage({
  src,
  alt,
  title,
  kicker,
  subtitle,
  height = '60vh',
}: HeroImageProps) {
  const heroStyle: CSSProperties = {
    position: 'relative',
    height,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '60px 80px',
    background: '#0b1f2a',
  };

  return (
    <section style={heroStyle}>
      <img
        src={buildUrl(src, SRC_WIDTH)}
        srcSet={buildSrcSet(src)}
        sizes="100vw"
        alt={alt}
        width={2000}
        height={1125}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
        }}
      />
      <div style={{ position: 'relative', color: 'white' }}>
        {kicker && (
          <p
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              opacity: 0.8,
            }}
          >
            {kicker}
          </p>
        )}
        <h1
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '5rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
