import { IconBulb } from '@/components/Icons';
import styles from './InsiderTipBox.module.css';

export type InsiderTipBoxProps = {
  /** Optional heading above the tip(s). Default: "Insidertips". */
  heading?: string;
  /** Either a single tip string or a list. Strings render as a single paragraph; arrays render as <ul>. */
  children?: React.ReactNode;
  tips?: string[];
  tip?: string;
  /** Compact variant used inline inside cards. Default: full (used as standalone section). */
  variant?: 'full' | 'compact';
};

export default function InsiderTipBox({
  heading = 'Insidertips',
  tips,
  tip,
  children,
  variant = 'full',
}: InsiderTipBoxProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      role="note"
      aria-label={heading}
      className={isCompact ? `${styles.box} ${styles.compact}` : styles.box}
    >
      <p className={styles.heading}>
        <IconBulb size={isCompact ? 14 : 18} /> {heading}
      </p>

      {tip && <p className={styles.tip}>{tip}</p>}
      {tips && tips.length > 0 && (
        <ul className={styles.list}>
          {tips.map((t, i) => (
            <li key={i} className={styles.item}>
              {t}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
