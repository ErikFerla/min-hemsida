import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { PRAKTISKA_SIDOR, praktiskJsonLd, praktiskOgImage, type PraktiskSidaKey } from '@/data/praktiska-sidor';

/** Gemensam metadata för de praktiska sidorna (3.6): självrefererande canonical, OG och Twitter. */
export function praktiskMetadata(key: PraktiskSidaKey): Metadata {
  const p = PRAKTISKA_SIDOR[key];
  return buildPageMetadata({
    path: p.path,
    title: p.title,
    description: p.description,
    image: praktiskOgImage(key),
    imageAlt: p.imageAlt,
  });
}

/** Lägger till Article- och BreadcrumbList-schema runt sidans innehåll. */
export default function PraktiskLayout({ sida, children }: { sida: PraktiskSidaKey; children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={praktiskJsonLd(sida)} />
      {children}
    </>
  );
}
