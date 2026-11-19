import type { ReactNode } from 'react';
import styles from './TipBox.module.css';

/**
 * Tipsrutan "Från oss" (5.2) – sajtens personliga röst. EN komponent för alla
 * insidertips, "5 råd från en som bor här", "Grytes favoritstrand" m.m.
 *
 * - `heading` visas i Playfair kursiv. Välj rubriknivå med `as` (h2 som sektion, h3 i en sektion, p om rubriken inte är en rubrik).
 * - `children` är innehållet: stycke(n), <ul> eller <ol>.
 * - `signature` (t.ex. "Erik") ger "– Erik" sist.
 * - `variant="compact"` ger mindre padding och rubrik (t.ex. i kort).
 * - `tone="warning" | "info"` ger samma form med vit yta och statusfärgad kant (varning/info),
 *   utan våg och signatur.
 */
export type TipBoxProps = {
  heading?: string;
  as?: 'h2' | 'h3' | 'h4' | 'p';
  signature?: string;
  variant?: 'default' | 'compact';
  tone?: 'tip' | 'warning' | 'info';
  className?: string;
  id?: string;
  children: ReactNode;
};

export default function TipBox({
  heading,
  as: Heading = 'h3',
  signature,
  variant = 'default',
  tone = 'tip',
  className,
  id,
  children,
}: TipBoxProps) {
  const isTip = tone === 'tip';
  const classes = [styles.box, styles[tone], variant === 'compact' ? styles.compact : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <aside className={classes} id={id} aria-label={heading ? undefined : isTip ? 'Tips' : undefined}>
      {isTip && (
        <svg className={styles.wave} width="44" height="11" viewBox="0 0 44 11" aria-hidden="true" focusable="false">
          <path d="M1 6 Q6 1 11 6 T21 6 T31 6 T43 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
      {heading && <Heading className={isTip ? styles.heading : styles.headingPlain}>{heading}</Heading>}
      <div className={styles.body}>{children}</div>
      {isTip && signature && <p className={styles.signature}>– {signature}</p>}
    </aside>
  );
}
