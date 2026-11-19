import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked, { type Source } from '@/app/components/LastChecked';
import { PRAKTISKA_SIDOR, type PraktiskSidaKey } from '@/data/praktiska-sidor';
import h from '@/app/guide/headings.module.css';
import styles from './infopage.module.css';

export { styles, h };

export type TocItem = { id: string; label: string };
export type RelatedLink = { href: string; title: string; text: string };

/**
 * Gemensamt skal för de praktiska sidorna (3.6): hero med sidans enda h1, brödsmulor,
 * innehållsförteckning, innehåll, "Läs vidare" och Senast kontrollerad med källor.
 */
export default function PraktiskPage({
  sida,
  kicker,
  subtitle,
  toc,
  related,
  sources,
  checkedNote,
  children,
}: {
  sida: PraktiskSidaKey;
  kicker: string;
  subtitle: string;
  toc: TocItem[];
  related: RelatedLink[];
  sources: Source[];
  checkedNote?: string;
  children: React.ReactNode;
}) {
  const p = PRAKTISKA_SIDOR[sida];
  return (
    <div className={styles.page}>
      <HeroImage src={p.image} alt={p.imageAlt} kicker={kicker} title={p.headline} subtitle={subtitle} height="45vh" />
      <div className={styles.container}>
        <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: p.breadcrumb, url: p.path }]} />

        <div className={styles.layout}>
          {/* Innehållsförteckning: högerspalt, sticky på dator; överst på mobil */}
          <nav className={styles.toc} aria-label="Innehåll på sidan">
            <p className={styles.tocTitle}>På sidan</p>
            <ul className={styles.tocList}>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.main}>
            {children}

            <section className={styles.related} aria-labelledby="las-vidare">
              <h2 id="las-vidare" className={`${h.h2} ${styles.h2}`}>Läs vidare</h2>
              <div className={styles.relatedGrid}>
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className={styles.relatedCard}>
                    <p className={styles.relatedTitle}>{r.title}</p>
                    <p className={styles.relatedText}>{r.text}</p>
                  </Link>
                ))}
              </div>
            </section>

            <LastChecked date={p.checked} sources={sources} note={checkedNote} />
          </div>
        </div>
      </div>
    </div>
  );
}
