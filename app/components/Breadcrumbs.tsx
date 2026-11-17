import styles from './Breadcrumbs.module.css';

export type BreadcrumbItem = { name: string; url: string };

/**
 * Visual breadcrumb trail. Pair with <BreadcrumbSchema> from SchemaOrg for JSON-LD.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Brödsmulor" className={styles.nav}>
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
