import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import styles from '../integritetspolicy/legal.module.css';

export const metadata = buildPageMetadata({
  path: '/cookies',
  title: 'Cookies',
  description:
    'MyMallorca sätter inga cookies, inte heller för besöksstatistiken, så det finns ingen cookie-banner. Här förklarar vi varför och vilka undantag som finns.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg/1920px-Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg',
  imageAlt: 'Katedralen La Seu i Palma speglad i dammen i Parc de la Mar',
});

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://www.mymallorca.se/' },
    { '@type': 'ListItem', position: 2, name: 'Cookies', item: 'https://www.mymallorca.se/cookies' },
  ],
};

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <article className={styles.article}>
        <p className={styles.kicker}>Om sajten</p>
        <h1>Cookies</h1>
        <p className={styles.updated}>Senast uppdaterad 20 november 2026</p>

        <p className={styles.lead}>
          MyMallorca sätter inga cookies, inte heller för besöksstatistiken. Sajtens egen kod sparar inte heller något
          i din webbläsare på annat sätt, till exempel med localStorage. Därför ber vi dig inte om samtycke och visar
          ingen cookie-banner.
        </p>

        <h2>Vad är cookies?</h2>
        <p>
          Cookies är små textfiler som en webbplats kan spara i din webbläsare, ofta för att känna igen dig nästa gång
          eller för att mäta och spåra besök. Enligt lagen om elektronisk kommunikation ska du informeras om cookies och
          ge ditt samtycke till dem som inte är nödvändiga.
        </p>

        <h2>Det här gäller på MyMallorca</h2>
        <ul>
          <li>Inga cookies för statistik, annonser eller sociala medier.</li>
          <li>Ingen inloggning, och därför inga inloggningscookies.</li>
          <li>Resplanerarens val sparas i sidans adress (URL), inte i en cookie.</li>
        </ul>

        <h2>Besöksstatistik utan cookies</h2>
        <p>
          Vi räknar besök och ser vilka sidor som läses med Vercel Web Analytics, för att förstå vilka sidor som är till
          nytta. Verktyget sätter inga cookies. Besök räknas med ett tillfälligt värde som tas fram ur själva förfrågan
          och nollställs efter ett dygn, så det går inte att följa dig mellan olika dagar eller webbplatser. Inga
          personuppgifter sparas, och uppgifterna lagras hos Vercel. Mer finns i{' '}
          <Link href="/integritetspolicy">integritetspolicyn</Link>.
        </p>

        <h2>Andra tjänster</h2>
        <p>
          Kartbilder hämtas från OpenStreetMap och många foton från Unsplash. Vi har inte bett dem sätta några cookies
          och använder dem inte för att följa dig. När du klickar dig vidare till andra webbplatser, till exempel
          Skyscanner eller Google Maps, gäller deras egna regler för cookies.
        </p>

        <h2>Vill du ändå rensa?</h2>
        <p>
          Du kan alltid se och radera cookies i webbläsarens inställningar. Mer om hur vi hanterar uppgifter om besök
          finns i vår <Link href="/integritetspolicy">integritetspolicy</Link>.
        </p>
      </article>
    </div>
  );
}
