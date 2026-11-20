import { ageLabel, type AgeGroup } from '@/app/lib/barn-activities';
import styles from './AgeGroupChip.module.css';

// Åldersetiketter är neutrala (5.1): samma tagg för alla åldrar, inga pastellfärger.
export default function AgeGroupChip({
  age,
  size = 'sm',
}: {
  age: AgeGroup;
  size?: 'sm' | 'md';
}) {
  return (
    <span className={size === 'md' ? `${styles.chip} ${styles.md}` : styles.chip}>
      {ageLabel(age)}
    </span>
  );
}
