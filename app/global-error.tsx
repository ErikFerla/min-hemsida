'use client'; // Felgränser måste vara klientkomponenter.

import { useEffect } from 'react';
import styles from './global-error.module.css';

// Ersätter root-layouten när den själv kraschar, så globala stilar och fonter
// finns inte här – stilarna ligger i global-error.module.css med systemfonter.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="sv">
      <body className={styles.body}>
        <title>Något gick fel | MyMallorca</title>
        <main className={styles.main}>
          <div className={styles.inner}>
            <p className={styles.kicker}>MyMallorca</p>
            <h1 className={styles.title}>Något gick fel</h1>
            <p className={styles.text}>
              Sidan kunde inte visas just nu. Försök igen om en stund, eller gå till startsidan.
            </p>
            <div className={styles.actions}>
              <button type="button" onClick={() => retry()} className={styles.primary}>
                Försök igen
              </button>
              {/* Vanlig <a> ger en full omladdning, vilket är det säkraste när root-layouten har fallerat. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className={styles.secondary}>
                Till startsidan
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
