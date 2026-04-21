import HeroImage from '@/components/HeroImage';

export type CategoryHeroProps = {
  imageSrc: string;
  imageAlt: string;
  kicker?: string;
  title: string;
  subtitle?: string;
};

/**
 * Thin wrapper around <HeroImage> so the /barn section can evolve its hero styling
 * independently of the site-wide hero component if needed. Default kicker matches
 * the section branding.
 */
export default function CategoryHero({
  imageSrc,
  imageAlt,
  kicker = 'Barnvänligt på Mallorca',
  title,
  subtitle,
}: CategoryHeroProps) {
  return (
    <HeroImage
      src={imageSrc}
      alt={imageAlt}
      kicker={kicker}
      title={title}
      subtitle={subtitle}
    />
  );
}
