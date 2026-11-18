import type { Metadata } from 'next';

import type { City } from '@/data/cities';
import { isUnsplash, ogImageUrl } from '@/app/lib/image-url';

export const BASE_URL = 'https://www.mymallorca.se';
const SITE_NAME = 'MyMallorca';

/** Sidtitel utan sajtnamn (≤47 tecken); title.template i app/layout.tsx lägger till " | MyMallorca". */
export function cityTitle(c: City): string {
  return c.seo.title ?? `${c.name} på Mallorca – reseguide`;
}

export function cityUrl(c: City): string {
  return `${BASE_URL}/${c.slug}`;
}

export function cityOgImage(c: City): string {
  return ogImageUrl(c.hero.image, BASE_URL);
}

export function buildCityMetadata(c: City): Metadata {
  const title = cityTitle(c);
  const url = cityUrl(c);
  const image = cityOgImage(c);
  const alt = `${c.name} på Mallorca`;
  const description = c.seo.description;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'sv_SE',
      title,
      description,
      // Bara Unsplash beskärs till exakt 1200×630; övriga källor anges utan mått.
      images: [isUnsplash(c.hero.image) ? { url: image, width: 1200, height: 630, alt } : { url: image, alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

type PageSeo = {
  /** Sökväg som börjar med "/", t.ex. "/strandar". Används för självrefererande canonical och og:url. */
  path: string;
  /** Titel utan sajtnamn (≤47 tecken) – title.template lägger till " | MyMallorca". */
  title: string;
  /** 120–160 tecken. */
  description: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
};

/** Gemensam metadata för vanliga innehållssidor: titel, beskrivning, canonical, Open Graph och Twitter. */
export function buildPageMetadata(p: PageSeo): Metadata {
  const url = `${BASE_URL}${p.path}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'sv_SE',
      title: p.title,
      description: p.description,
      // Unsplash beskärs till 1200×630 via URL:en; andra bilder har egna mått – ange dem bara om de är kända.
      images: [
        p.imageWidth || p.image.startsWith('https://images.unsplash.com/')
          ? { url: p.image, width: p.imageWidth ?? 1200, height: p.imageHeight ?? 630, alt: p.imageAlt }
          : { url: p.image, alt: p.imageAlt },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
      images: [p.image],
    },
  };
}

