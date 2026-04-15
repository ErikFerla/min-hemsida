type IconProps = { size?: number; stroke?: number; className?: string; style?: React.CSSProperties };

const base = (s: number) => ({
  width: s,
  height: s,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function IconPin({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconClock({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconExternal({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function IconMap({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
      <path d="M9 3v16M15 5v16" />
    </svg>
  );
}

export function IconInfo({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  );
}

export function IconCalendar({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconGlass({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M7 3h10l-1 7a4 4 0 0 1-8 0z" />
      <path d="M12 14v6M9 20h6" />
    </svg>
  );
}

export function IconUsers({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M15 20c0-2.3 1.9-4 4-4" />
    </svg>
  );
}

export function IconLeaf({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M20 4S10 3 6 9c-3 4.5-1.5 9-1.5 9s4.5 1.5 9-1.5c6-4 5-14 6.5-12.5z" />
      <path d="M5 19 12 12" />
    </svg>
  );
}

export function IconBookmark({ size = 14, stroke = 1.6, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

export function PriceTag({ tier, className }: { tier: number; className?: string }) {
  const t = Math.max(1, Math.min(4, tier));
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: '#6B7280',
        background: '#F3EFE8',
        padding: '3px 8px',
        borderRadius: 999,
        fontVariantNumeric: 'tabular-nums',
      }}
      aria-label={`Prisnivå ${t} av 4`}
    >
      {'€'.repeat(t)}
      <span style={{ color: '#D7CEC1' }}>{'€'.repeat(4 - t)}</span>
    </span>
  );
}

export function tierFromEmoji(pris: string): number {
  const match = pris.match(/💰/g);
  return match ? match.length : 1;
}
