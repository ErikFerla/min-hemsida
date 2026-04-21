export type InsiderTipBoxProps = {
  /** Optional heading above the tip(s). Default: "Insider-tips". */
  heading?: string;
  /** Either a single tip string or a list. Strings render as a single paragraph; arrays render as <ul>. */
  children?: React.ReactNode;
  tips?: string[];
  tip?: string;
  /** Compact variant used inline inside cards. Default: full (used as standalone section). */
  variant?: 'full' | 'compact';
};

export default function InsiderTipBox({
  heading = 'Insider-tips',
  tips,
  tip,
  children,
  variant = 'full',
}: InsiderTipBoxProps) {
  const isCompact = variant === 'compact';

  return (
    <aside
      className="insider-tip-box"
      style={{
        background: isCompact ? 'rgba(153,51,53,0.06)' : 'white',
        border: `1px solid ${isCompact ? 'rgba(153,51,53,0.16)' : '#ede5da'}`,
        borderLeft: '4px solid #993335',
        borderRadius: isCompact ? '8px' : '14px',
        padding: isCompact ? '14px 16px' : '24px 28px',
        boxShadow: isCompact ? 'none' : '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      <p
        style={{
          fontFamily: isCompact ? 'inherit' : '"Bebas Neue", sans-serif',
          fontSize: isCompact ? '0.72rem' : '1.1rem',
          letterSpacing: isCompact ? '0.14em' : '0.08em',
          textTransform: isCompact ? 'uppercase' : 'none',
          color: '#993335',
          fontWeight: isCompact ? 700 : 400,
          margin: `0 0 ${isCompact ? '6px' : '12px'}`,
        }}
      >
        {heading}
      </p>

      {tip && (
        <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#374151', margin: 0 }}>
          {tip}
        </p>
      )}
      {tips && tips.length > 0 && (
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {tips.map((t, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: '#374151',
                marginBottom: i < tips.length - 1 ? '8px' : 0,
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      {children}
    </aside>
  );
}
