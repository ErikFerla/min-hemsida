import { cities } from '@/data/cities';

export default function CityLinksList() {
  return (
    <nav
      aria-label="Alla städer på Mallorca"
      className="city-links-list"
      style={{ marginTop: 'clamp(32px, 5vw, 56px)' }}
    >
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#993335',
          fontWeight: 600,
          margin: '0 0 16px',
        }}
      >
        Alla destinationer
      </p>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
        }}
      >
        {cities.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              style={{
                display: 'block',
                padding: '14px 16px',
                background: 'white',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.06)',
                textDecoration: 'none',
                color: '#383a46',
                boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  color: '#383a46',
                  marginBottom: '2px',
                }}
              >
                {c.name}
              </span>
              <span style={{ display: 'block', fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.4 }}>
                {c.desc}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
