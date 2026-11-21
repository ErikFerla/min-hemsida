/**
 * MyMallorca-logotypen: rundad ruta i accentfärg med uppgående sol över hav (ljus), plus ordmärket
 * "MyMallorca" i Playfair. Samma märke i headern (Navbar), footern (SiteFooter/SiteFooterAccordion),
 * faviconen (app/icon.svg, app/favicon.ico) och hemskärmsikonen (app/apple-icon.png).
 * Rutans färg ärvs via currentColor – sätt color på markClassName. Motivet är alltid --color-bg.
 */
export const LOGO_MOTIF = (
  <g transform="translate(4 4) scale(0.75)" fill="none" stroke="var(--color-bg, #fcfaf5)" strokeLinecap="round">
    <path d="M11 17 A5 5 0 0 1 21 17 Z" fill="var(--color-bg, #fcfaf5)" stroke="none" />
    <g strokeWidth="2">
      <path d="M16 6.5 V8.6" />
      <path d="M8.6 9.6 L10.1 11.1" />
      <path d="M23.4 9.6 L21.9 11.1" />
      <path d="M5.6 15.5 H7.6" />
      <path d="M24.4 15.5 H26.4" />
    </g>
    <path d="M3 20 H29" strokeWidth="2.2" />
    <path d="M6 25 Q9 22.8 12 25 T18 25 T24 25 T27 24.6" strokeWidth="2.2" />
  </g>
);

export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      {LOGO_MOTIF}
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
