'use client';
import type { ImgHTMLAttributes } from 'react';

/**
 * <img> för sidans LCP-bild (eager, fetchPriority="high").
 *
 * Varför en klientkomponent: när en serverkomponent renderar en eager <img> lägger React en
 * förladdningshint för bilden i RSC-datat. Next förhämtar RSC-datat för länkar i vyn, och då
 * laddar webbläsaren ner hjältebilderna för alla förhämtade sidor (t.ex. /strandar och /barn
 * från startsidan). Som klientkomponent hamnar ingen hint i RSC-datat, men SSR-HTML:en får
 * fortfarande <link rel="preload"> för sidans egen bild.
 */
export default function EagerImage({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- egen srcset (Commons/Unsplash), se ovan
  return <img alt={alt} loading="eager" fetchPriority="high" decoding="async" {...props} />;
}
