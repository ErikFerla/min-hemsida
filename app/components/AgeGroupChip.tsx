import type { CSSProperties } from 'react';
import type { AgeGroup } from '@/app/lib/barn-activities';
import styles from './AgeGroupChip.module.css';

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
  const colors = { '--chip-bg': c.bg, '--chip-fg': c.fg, '--chip-border': c.border } as CSSProperties;
  return (
    <span className={size === 'md' ? `${styles.chip} ${styles.md}` : styles.chip} style={colors}>
      {age === '13+' ? '13+ år' : `${age} år`}
    </span>
  );
}
