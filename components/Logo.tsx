/**
 * MyMallorca-logotypen (5.1): vågsymbol + ordmärke "MyMallorca" i Playfair.
 * Samma märke i headern (Navbar) och footern (SiteFooter/SiteFooterAccordion).
 * Färgen ärvs via currentColor – sätt color på markClassName.
 */
export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 22 Q8 14 12 18 Q16 22 20 14 Q24 6 28 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="10" r="3" fill="currentColor" />
    </svg>
  );
}

/** Våg + "MyMallorca" på en rad (används i footern). */
export function LogoLockup({
  className,
  markClassName,
  nameClassName,
}: {
  className?: string;
  markClassName?: string;
  nameClassName?: string;
}) {
  return (
    <span className={className}>
      <LogoMark className={markClassName} />
      <span className={nameClassName}>MyMallorca</span>
    </span>
  );
}
