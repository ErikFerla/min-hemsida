import type { ReactNode } from 'react';
import styles from './CardTip.module.css';

/**
 * Tipset i ett kort (9.2) – en enkel rad i small med en liten etikett, utan ruta och våg.
 * Tipsrutan (TipBox) är sajtens personliga röst och används på sidnivå; i långa kortlistor
 * (/strandar, /byar, golf, sevärdheter, barnkategorier, guidernas topplistor) blev den tapet.
 *
 *   <CardTip>Kom före kl. 10 …</CardTip>          → "TIPS Kom före kl. 10 …"
 *   <CardTip label="Insidertips">…</CardTip>
 */
export default function CardTip({
  label = 'Tips',
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={className ? `${styles.tip} ${className}` : styles.tip}>
      <span className={styles.label}>{label}</span> {children}
    </p>
  );
}
