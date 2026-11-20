import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { GUIDES, guideJsonLd } from '../guides';

const SLUG = 'regniga-dagar-med-barn';
const guide = GUIDES[SLUG];

// Canonical, Open Graph och Twitter för guiden (7.2). Article + BreadcrumbList via guideJsonLd.
export const metadata = buildPageMetadata({
  path: `/guide/${SLUG}`,
  title: guide.title,
  description: guide.description,
  image: guide.image,
  imageAlt: guide.imageAlt,
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={guideJsonLd(SLUG)} />
      {children}
    </>
  );
}
