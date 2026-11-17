'use client'; // Felgränser måste vara klientkomponenter.

import { useEffect } from 'react';

// Ersätter root-layouten när den själv kraschar, så globala stilar och fonter
// finns inte här – allt är inline med systemfonter.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="sv">
      <body
        style={{
          margin: 0,
          background: '#fefefb',
          color: '#383a46',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <title>Något gick fel | MyMallorca</title>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 16px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#993335',
                margin: '0 0 12px',
              }}
            >
              MyMallorca
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', margin: '0 0 20px', lineHeight: 1.1 }}>
              Något gick fel
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', margin: '0 auto 36px', maxWidth: '48ch' }}>
              Sidan kunde inte visas just nu. Försök igen om en stund, eller gå till startsidan.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => retry()}
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  background: '#993335',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Försök igen
              </button>
              {/* Vanlig <a> ger en full omladdning, vilket är det säkraste när root-layouten har fallerat. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  border: '1px solid #383a46',
                  color: '#383a46',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Till startsidan
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
