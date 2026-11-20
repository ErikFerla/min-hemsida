import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { BARN_CHECKED, BARN_SOURCES } from '@/app/lib/barn-activities';

export const metadata: Metadata = {
  title: 'Vattenparker på Mallorca – 5 bästa för barn',
  description:
    'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insidertips för familjer med barn i olika åldrar.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/vattenparker' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/vattenparker',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Vattenparker på Mallorca – 5 bästa för barn',
    description:
      'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insidertips för familjer med barn i olika åldrar.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Water_slide%2C_Ada_East_%28P1090930%29.jpg/1920px-Water_slide%2C_Ada_East_%28P1090930%29.jpg',
        width: 1920,
        height: 1440,
        alt: 'Vattenrutschkana vid en pool i solsken – genrebild, inte från någon av parkerna',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vattenparker på Mallorca – 5 bästa för barn',
    description:
      'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insidertips.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Water_slide%2C_Ada_East_%28P1090930%29.jpg/1920px-Water_slide%2C_Ada_East_%28P1090930%29.jpg'],
  },
};

export default function VattenparkerPage() {
  return (
    <BarnCategoryPageView
      category="vattenparker"
      hero={{
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Water_slide%2C_Ada_East_%28P1090930%29.jpg/1920px-Water_slide%2C_Ada_East_%28P1090930%29.jpg',
        imageAlt: 'Vattenrutschkana vid en pool i solsken – genrebild, inte från någon av parkerna',
        title: 'Vattenparker på Mallorca',
        subtitle:
          '5 parker testade för barnfamiljer – från öns största Aqualand till lugna Hidropark i norr.',
      }}
      intro={
        <>
          <p>
            Mallorca har tre stora vattenparker och två mindre – alla med tydliga specialiteter. Aqualand
            El Arenal är öns största med de vildaste rutschkanorna, Western Water Park bjuder på en
            genomgående temaupplevelse i Magaluf, och Hidropark i norr är ett smultronställe för familjer
            som bor kring Alcúdia och vill slippa en timmes bilresa.
          </p>
          <p>
            Åldersfiltret nedan hjälper dig att snabbt se vilka parker som passar just era barn. Tips:
            vattenparkerna i söder och väster har större småbarnsområden, men norr har
            betydligt kortare köer även mitt i juli.
          </p>
        </>
      }
      lastChecked={{
        date: BARN_CHECKED,
        sources: BARN_SOURCES.vattenparker ?? [],
        note: 'Datumet gäller säsongerna för Aqualand och Hidropark. Priser och öppettider ändras ofta – kontrollera alltid på respektive webbplats före besöket.',
      }}
    />
  );
}
