export type BreadcrumbItem = { name: string; url: string };

/**
 * Visual breadcrumb trail. Pair with <BreadcrumbSchema> from SchemaOrg for JSON-LD.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Brödsmulor"
      style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5 }}
    >
      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.url}-${i}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              {!isLast ? (
                <a
                  href={item.url}
                  style={{ color: '#6b7280', textDecoration: 'none', borderBottom: '1px solid transparent' }}
                >
                  {item.name}
                </a>
              ) : (
                <span aria-current="page" style={{ color: '#383a46', fontWeight: 600 }}>
                  {item.name}
                </span>
              )}
              {!isLast && <span style={{ opacity: 0.5 }}>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
