import Link from 'next/link';
import styles from './HubLink.module.css';

/**
 * Tydlig länk från en guide (urval/planering) till navsidan som är den kompletta katalogen
 * för samma ämne – så att guiden och navsidan inte konkurrerar om samma sökning.
 */
export default function HubLink({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <aside aria-label="Hela katalogen" className={styles.box}>
      <p className={styles.text}>{text}</p>
      <Link href={href} className="link-arrow">
        {label} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
