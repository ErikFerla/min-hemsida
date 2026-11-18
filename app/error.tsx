'use client'; // Felgränser måste vara klientkomponenter.

import { useEffect } from 'react';
import Link from 'next/link';
import { IconPalm } from '@/components/Icons';
import styles from './status.module.css';

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.section}>
      <div className={`${styles.inner} ${styles.innerNarrow}`}>
        <div className={styles.icon}>
          <IconPalm size={44} />
        </div>

        <h1 className={`${styles.title} ${styles.titleError}`}>Något gick fel</h1>

        <p className={`${styles.intro} ${styles.introNarrow}`}>
          Sidan kunde inte visas just nu. Försök igen om en stund, eller gå till startsidan.
        </p>

        <div className={styles.actions}>
          <button type="button" onClick={() => retry()} className={styles.primary}>
            Försök igen
          </button>
          <Link href="/" className={styles.secondary}>
            Till startsidan
          </Link>
        </div>
      </div>
    </section>
  );
}
