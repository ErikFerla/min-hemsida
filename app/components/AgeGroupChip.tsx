import type { AgeGroup } from '@/app/lib/barn-activities';

const COLORS: Record<AgeGroup, { bg: string; fg: string; border: string }> = {
  '0-3':  { bg: '#FFF1F5', fg: '#B0365A', border: '#F9D4DE' },
  '4-7':  { bg: '#FEF7E6', fg: '#8C6313', border: '#F5E3B4' },
  '8-12': { bg: '#E8F4EC', fg: '#2E6A3F', border: '#C7E3CF' },
  '13+':  { bg: '#EBF0F8', fg: '#2C4C7A', border: '#CEDAEB' },
};

export default function AgeGroupChip({
  age,
  size = 'sm',
}: {
  age: AgeGroup;
  size?: 'sm' | 'md';
}) {
  const c = COLORS[age];
  const padding = size === 'md' ? '4px 10px' : '2px 8px';
  const fontSize = size === 'md' ? '0.78rem' : '0.7rem';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        borderRadius: '999px',
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      {age === '13+' ? '13+ år' : `${age} år`}
    </span>
  );
}
