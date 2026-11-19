import { useId, type ReactNode } from 'react';
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
 *   utan våg och signatur. De får role="note".
 * - `landmark` gör rutan till ett eget <aside>-landmärke med rubriken som namn. Använd bara när
 *   rutan står på toppnivå i sidan (inte inuti kort/artiklar) – annars blir det en <div>.
 */
export type TipBoxProps = {
  heading?: string;
  as?: 'h2' | 'h3' | 'h4' | 'p';
  signature?: string;
  variant?: 'default' | 'compact';
  tone?: 'tip' | 'warning' | 'info';
  className?: string;
  id?: string;
  landmark?: boolean;
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
  landmark = false,
  children,
}: TipBoxProps) {
  const headingId = useId();
  const isTip = tone === 'tip';
  const Wrapper = landmark && heading ? 'aside' : 'div';
  const a11y = Wrapper === 'aside' ? { 'aria-labelledby': headingId } : isTip ? {} : { role: 'note' as const };
  const classes = [styles.box, styles[tone], variant === 'compact' ? styles.compact : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <Wrapper className={classes} id={id} {...a11y}>
      {isTip && (
        <svg className={styles.wave} width="44" height="11" viewBox="0 0 44 11" aria-hidden="true" focusable="false">
          <path d="M1 6 Q6 1 11 6 T21 6 T31 6 T43 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
      {heading && (
        <Heading id={headingId} className={isTip ? styles.heading : styles.headingPlain}>
          {heading}
        </Heading>
      )}
      <div className={styles.body}>{children}</div>
      {isTip && signature && <p className={styles.signature}>– {signature}</p>}
    </Wrapper>
  );
}
