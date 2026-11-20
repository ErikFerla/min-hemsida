import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { buildPageMetadata } from '@/app/lib/city-seo';
import styles from './legal.module.css';

export const metadata = buildPageMetadata({
  path: '/integritetspolicy',
  title: 'Integritetspolicy',
  description:
    'Så hanterar MyMallorca personuppgifter: inga konton, inga formulär, ingen annonsspårning, bara cookiefri besöksstatistik. Här ser du vilka tjänster vi använder.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg/1920px-Palma_Cathedral_%28La_Seu%29_and_reflection_at_Parc_de_la_Mar.jpg',
  imageAlt: 'Katedralen La Seu i Palma speglad i dammen i Parc de la Mar',
});

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://www.mymallorca.se/' },
    { '@type': 'ListItem', position: 2, name: 'Integritetspolicy', item: 'https://www.mymallorca.se/integritetspolicy' },
  ],
};

export default function IntegritetspolicyPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <article className={styles.article}>
        <p className={styles.kicker}>Om sajten</p>
        <h1>Integritetspolicy</h1>
        <p className={styles.updated}>Senast uppdaterad 20 november 2026</p>

        <p className={styles.lead}>
          MyMallorca är en privat guide till Mallorca som drivs av intresse för ön, inte för att tjäna pengar. Vi vill
          veta så lite som möjligt om dig – och i dag samlar vi inte in några personuppgifter själva.
        </p>

        <h2>Det här samlar vi inte in</h2>
        <ul>
          <li>Det finns inga konton, inget nyhetsbrev och inget kontaktformulär.</li>
          <li>Vi visar inga annonser och har ingen spårning i sociala medier.</li>
          <li>Vi sätter inga cookies och sparar inget i din webbläsare. Läs mer på sidan om <Link href="/cookies">cookies</Link>.</li>
        </ul>

        <h2>Besöksstatistik</h2>
        <p>
          Vi använder Vercel Web Analytics för att räkna besök och se vilka sidor som läses. Syftet är att förstå vilka
          sidor som är till nytta, så att vi vet vad vi ska förbättra. Den rättsliga grunden är vårt berättigade intresse
          av just det.
        </p>
        <ul>
          <li>Verktyget sätter inga cookies.</li>
          <li>
            Besök räknas med hjälp av ett tillfälligt värde som tas fram ur själva förfrågan och nollställs efter ett
            dygn. Därför går det inte att följa dig mellan olika dagar eller mellan olika webbplatser.
          </li>
          <li>
            Vercel sparar inte din IP-adress, och vi ser bara sammanställd statistik. Det som sparas är bland annat vilken sida du läser, varifrån du kom, ungefär var du befinner dig
            (till exempel land) och vilken typ av enhet och webbläsare du använder.
          </li>
          <li>
            Uppgifterna lagras hos Vercel. Vercel är ett amerikanskt företag och uppgifterna kan behandlas utanför EU.
          </li>
        </ul>

        <h2>Webbhotell och serverloggar</h2>
        <p>
          Sajten ligger hos Vercel. Som för alla webbplatser registrerar Vercels servrar tekniska uppgifter när du besöker
          en sida, till exempel IP-adress, webbläsare, vilken sida som efterfrågas och tidpunkt. Uppgifterna behövs för att
          kunna leverera sidorna och skydda dem mot missbruk, och de sparas en begränsad tid enligt Vercels villkor.
          Vercel är ett amerikanskt företag och uppgifterna kan behandlas utanför EU. Vi använder dem inte för att ta
          reda på vem du är.
        </p>

        <h2>Innehåll som hämtas från andra tjänster</h2>
        <p>
          En del innehåll laddas direkt från andra tjänster. Din webbläsare kontaktar dem då, och de får din IP-adress
          precis som när du besöker vilken webbplats som helst:
        </p>
        <ul>
          <li><strong>OpenStreetMap</strong> – kartbilderna på sidor med interaktiv karta.</li>
          <li><strong>Unsplash</strong> – många av fotografierna på sajten.</li>
        </ul>
        <p>
          Typsnitten ligger på vår egen server, så inget skickas till Google när sidan visar text.
        </p>

        <h2>Väder, resplanerare och flygsök</h2>
        <ul>
          <li>
            <strong>Väder:</strong> prognosen hämtas av vår egen server från Meteorologisk institutt i Norge (api.met.no)
            för den ort du väljer. Din IP-adress skickas inte vidare till dem.
          </li>
          <li>
            <strong>Resplaneraren:</strong> dina val sparas bara i sidans adress, så att du kan dela eller spara planen.
            Vi lagrar dem inte.
          </li>
          <li>
            <strong>Flygsök:</strong> när du söker flyg öppnas Skyscanner i en ny flik med dina val i adressen. Vi sparar
            inget av det du fyller i. På Skyscanner gäller deras egen integritetspolicy.
          </li>
        </ul>

        <h2>Länkar till andra webbplatser</h2>
        <p>
          Vi länkar till exempelvis Google Maps, restauranger, golfbanor och vingårdar. Länkarna är inga
          affiliatelänkar och vi får ingen ersättning för dem. När du lämnar MyMallorca gäller den andra sajtens villkor.
        </p>

        <h2>Dina rättigheter</h2>
        <p>
          Eftersom vi inte själva sparar uppgifter om enskilda besökare finns det i regel inget hos oss att lämna ut,
          rätta eller radera. Om du anser att dina personuppgifter hanteras fel kan du vända dig till
          Integritetsskyddsmyndigheten (IMY).
        </p>

        <h2>Kontakt</h2>
        <p>
          Har du frågor om den här policyn eller om sajten når du oss på{' '}
          <a href="mailto:info@mymallorca.se">info@mymallorca.se</a>. Vi svarar så snart vi kan, men vi erbjuder ingen
          personlig reseplanering.
        </p>
      </article>
    </div>
  );
}
