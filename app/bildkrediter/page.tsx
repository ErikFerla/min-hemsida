import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import { allCredits } from '@/data/credits';
import { LICENSE_LABEL, licenseHref } from '@/data/credits/types';
import styles from '../integritetspolicy/legal.module.css';

export const metadata = buildPageMetadata({
  path: '/bildkrediter',
  title: 'Bildkrediter och licenser',
  description:
    'Fotograferna bakom bilderna på MyMallorca och licenserna vi använder dem under – Unsplash, Wikimedia Commons och egna foton, med länk till varje källa.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg/1920px-Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg',
  imageAlt: 'Katedralen La Seu i Palma speglad i dammen i Parc de la Mar',
});

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://www.mymallorca.se/' },
    { '@type': 'ListItem', position: 2, name: 'Bildkrediter', item: 'https://www.mymallorca.se/bildkrediter' },
  ],
};

export default function BildkrediterPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <article className={styles.article}>
        <p className={styles.kicker}>Om sajten</p>
        <h1>Bildkrediter och licenser</h1>
        <p>
          Bilderna på MyMallorca kommer från fotografer som delar sina bilder fritt, främst via Unsplash och Wikimedia
          Commons. Vi använder bara bilder med licenser som tillåter fri användning. För bilder under Creative
          Commons-licenser anger vi fotograf och licens här, som licensen kräver. Har du frågor om en bild, skriv till{' '}
          <a href="mailto:info@mymallorca.se">info@mymallorca.se</a>.
        </p>

        <h2>Alla bilder</h2>
        {allCredits.length === 0 ? (
          <p>Listan uppdateras.</p>
        ) : (
          <ul>
            {allCredits.map((c) => {
              const lic = LICENSE_LABEL[c.license];
              const licText = c.licenseVersion && c.license.startsWith('cc-') ? `${lic.label} ${c.licenseVersion}` : lic.label;
              const href = licenseHref(c.license, c.licenseVersion);
              return (
                <li key={c.src}>
                  <strong>{c.motiv}</strong> – {c.roll ?? 'foto'}:{' '}
                  {c.fotografUrl ? (
                    <a href={c.fotografUrl} target="_blank" rel="noopener noreferrer">{c.fotograf}</a>
                  ) : (
                    c.fotograf
                  )}
                  ,{' '}
                  {href ? <a href={href} target="_blank" rel="noopener noreferrer">{licText}</a> : licText}
                  {c.license !== 'egen' && (
                    <>
                      {' '}(<a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">källa</a>)
                    </>
                  )}
                  . Används på: {c.usedOn.join(', ')}.
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </div>
  );
}
