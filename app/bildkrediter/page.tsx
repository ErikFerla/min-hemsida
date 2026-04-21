import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Bildkrediter | MyMallorca',
  description:
    'Fotografer och bildkällor som används på MyMallorca. Alla bilder används under respektive licens.',
  alternates: { canonical: 'https://www.mymallorca.se/bildkrediter' },
};

type Credit = {
  photographer: string;
  source: 'Unsplash';
  sourceUrl?: string;
  usedOn: { label: string; href: string }[];
  subject: string;
};

const CREDITS: Credit[] = [
  {
    photographer: 'Chloé Lefleur',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/F0ZUIUeW490',
    usedOn: [{ label: 'Stränder', href: '/strandar' }],
    subject: 'Caló des Moro — hero-bild',
  },
  {
    photographer: 'Luca',
    source: 'Unsplash',
    usedOn: [{ label: 'Förstasidan', href: '/' }],
    subject: 'Stentrappa i Palmas gamla stan',
  },
];

export default function BildkrediterPage() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <BreadcrumbSchema
        items={[
          { name: 'Hem', url: '/' },
          { name: 'Bildkrediter', url: '/bildkrediter' },
        ]}
      />
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 40px)',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#993335',
            fontWeight: 600,
            margin: '0 0 12px',
          }}
        >
          Redaktionell transparens
        </p>
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1a1a1a',
            margin: '0 0 24px',
          }}
        >
          Bildkrediter
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: '#374151',
            margin: '0 0 40px',
            maxWidth: '62ch',
          }}
        >
          MyMallorca använder främst redaktionella bilder från Unsplash under deras fria
          licens. Här listas fotografer vars verk figurerar i hero-positioner eller på
          framträdande platser. Stockbilder utan specifik upphovsperson omfattas av
          respektive plattforms standardlicens.
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {CREDITS.map((c, i) => (
            <li
              key={i}
              style={{
                padding: '20px 24px',
                background: 'white',
                border: '1px solid #ede5da',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  margin: '0 0 4px',
                }}
              >
                {c.photographer}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 10px' }}>
                {c.subject} ·{' '}
                {c.sourceUrl ? (
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#993335', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    {c.source}
                  </a>
                ) : (
                  c.source
                )}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: 0 }}>
                Används på:{' '}
                {c.usedOn.map((u, j) => (
                  <span key={j}>
                    <a
                      href={u.href}
                      style={{ color: '#374151', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      {u.label}
                    </a>
                    {j < c.usedOn.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <p
          style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            lineHeight: 1.65,
            margin: '48px 0 0',
            paddingTop: '32px',
            borderTop: '1px solid #ede5da',
          }}
        >
          Saknar du en kredit eller vill att en bild tas bort? Kontakta oss på{' '}
          <a
            href="/kontakt"
            style={{ color: '#993335', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            kontaktsidan
          </a>
          .
        </p>
      </div>
    </div>
  );
}
