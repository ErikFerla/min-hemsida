import styles from './Breadcrumbs.module.css';

export type BreadcrumbItem = { name: string; url: string };

/**
 * Visual breadcrumb trail. Pair with <BreadcrumbSchema> from SchemaOrg for JSON-LD.
 * `spaced` ger 24 px luft under (9.2) – för sidor där brödsmulan står först i containern
 * och inte har en egen omslutande klass med marginal.
 */
export default function Breadcrumbs({ items, spaced = false }: { items: BreadcrumbItem[]; spaced?: boolean }) {
  return (
    <nav aria-label="Brödsmulor" className={spaced ? `${styles.nav} ${styles.spaced}` : styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.url}-${i}`} className={styles.item}>
              {!isLast ? (
                <a href={item.url} className={styles.link}>
                  {item.name}
                </a>
              ) : (
                <span aria-current="page" className={styles.current}>
                  {item.name}
                </span>
              )}
              {!isLast && <span className={styles.separator} aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
