import Link from 'next/link';
import { transfers } from '@/data/transport';
import styles from './TransferTabell.module.css';

/**
 * Från flygplatsen (PMI) till de stora orterna: buss, bil och taxi.
 * Används på /flyg och /hyrbil-och-transport. Data och källor: data/transport.ts.
 */
export default function TransferTabell({ caption }: { caption: string }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Till</th>
            <th scope="col">Buss</th>
            <th scope="col">Bil</th>
            <th scope="col">Taxi</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t.mal}>
              <th scope="row" data-label="Till">
                {t.href ? <Link href={t.href}>{t.mal}</Link> : t.mal}
              </th>
              <td data-label="Buss">{t.buss}</td>
              <td data-label="Bil">{t.bil ?? '–'}</td>
              <td data-label="Taxi">{t.taxi ?? 'Taxameter, fråga om ungefärligt pris'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
