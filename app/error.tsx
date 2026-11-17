'use client'; // Felgränser måste vara klientkomponenter.

import { useEffect } from 'react';
import Link from 'next/link';
import { IconPalm } from '@/components/Icons';

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      style={{
        background: '#fefefb',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 96px) clamp(16px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>
        <div style={{ color: '#993335', display: 'inline-flex', marginBottom: '16px' }}>
          <IconPalm size={44} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            margin: '0 0 20px',
            color: '#383a46',
            lineHeight: 1.05,
          }}
        >
          Något gick fel
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            lineHeight: 1.7,
            color: '#4b5563',
            margin: '0 auto 36px',
            maxWidth: '48ch',
          }}
        >
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
          <Link
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
          </Link>
        </div>
      </div>
    </section>
  );
}
