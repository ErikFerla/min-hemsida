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

export function IconFlower({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8V5a2.8 2.8 0 1 0-2.2 4.3M12 14.2V19a2.8 2.8 0 1 0 2.2-4.3M9.8 12H5a2.8 2.8 0 1 0 4.3 2.2M14.2 12H19a2.8 2.8 0 1 0-4.3-2.2" />
    </svg>
  );
}

export function IconSun({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function IconSnow({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      <path d="M9 4l3 3 3-3M9 20l3-3 3 3M4 9l3 3-3 3M20 9l-3 3 3 3" />
    </svg>
  );
}

export function IconWave({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M2 12c0-5.5 4-10 10-10s10 4.5 10 10" />
      <path d="M4.5 17.5C6 16 8 15 10 16s4 2 6 1 4-2 4-2" />
    </svg>
  );
}

export function IconBuilding({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M3 21h18M5 21V6l7-3 7 3v15M9 10h.01M13 10h.01M9 14h.01M13 14h.01M9 18h.01M13 18h.01" />
    </svg>
  );
}

export function IconForkKnife({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

export function IconFlag({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M12 2v20M12 2l8 4-8 4" />
      <ellipse cx="12" cy="21" rx="9" ry="1.5" />
    </svg>
  );
}

export function IconHiker({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="13" cy="4" r="1.6" />
      <path d="M13 7v5l-3 3 2 5M13 12l4 2 3-3M10 10 7 9l-2 4" />
    </svg>
  );
}

export function IconPalm({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M12 22V10" />
      <path d="M12 10c0-3-3-5-7-4 1-3 4-4 7-3 3-1 6 0 7 3-4-1-7 1-7 4z" />
      <path d="M12 10c-2-2-5-2-8 0M12 10c2-2 5-2 8 0" />
    </svg>
  );
}

export function IconSparkle({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      <path d="M12 8c0 2.2 1.8 4 4 4-2.2 0-4 1.8-4 4 0-2.2-1.8-4-4-4 2.2 0 4-1.8 4-4z" />
    </svg>
  );
}

export function IconPlane({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M10.5 13.5 2 9l3-2 7 2 4-4a2.1 2.1 0 0 1 3 3l-4 4 2 7-2 3-4.5-8.5-4 4V17l-2-2 2-2 2.5.5z" />
    </svg>
  );
}

export function IconBulb({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.9.9 1.5 2 1.5 3.5h5c0-1.5.6-2.6 1.5-3.5A6 6 0 0 0 12 2z" />
    </svg>
  );
}

export function IconSnorkel({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="M4 11h11a3 3 0 0 1 3 3v3H4z" />
      <path d="M8 11V6a2 2 0 0 1 2-2h1v4" />
      <path d="M14 11V7" />
    </svg>
  );
}

export function IconStar({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9z" />
    </svg>
  );
}

export function IconCompass({ size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={stroke} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.2 7.8-2 6.3-6.4 2 2-6.3z" />
    </svg>
  );
}
