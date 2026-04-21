import type { Metadata } from 'next';
import BarnCategoryPageView from '@/app/components/BarnCategoryPageView';
import { parseAgesParam } from '@/app/lib/ages';

export const metadata: Metadata = {
  title: 'Vattenparker på Mallorca – 5 bästa för barnfamiljen | MyMallorca',
  description:
    'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insider-tips för familjer med barn i olika åldrar.',
  alternates: { canonical: 'https://www.mymallorca.se/barn/vattenparker' },
  openGraph: {
    type: 'website',
    url: 'https://www.mymallorca.se/barn/vattenparker',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: 'Vattenparker på Mallorca – 5 bästa för barnfamiljen | MyMallorca',
    description:
      'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insider-tips för familjer med barn i olika åldrar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85',
        width: 1200,
        height: 630,
        alt: 'Vattenrutschkanor och pooler på en vattenpark på Mallorca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vattenparker på Mallorca – 5 bästa för barnfamiljen | MyMallorca',
    description:
      'Mallorcas 5 bästa vattenparker – från Aqualand till Hidropark. Priser, öppettider och insider-tips.',
    images: ['https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&h=630&fit=crop&q=85'],
  },
};

type Props = {
  searchParams: Promise<{ ages?: string }>;
};

export default async function VattenparkerPage({ searchParams }: Props) {
  const { ages } = await searchParams;
  const selectedAges = parseAgesParam(ages);

  return (
    <BarnCategoryPageView
      category="vattenparker"
      selectedAges={selectedAges}
      hero={{
        imageSrc: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
        imageAlt: 'Vattenrutschkanor och blå pooler på en vattenpark under Mallorcas sommarsol',
        title: 'Vattenparker på Mallorca',
        subtitle:
          '5 parker testade för barnfamiljer — från öns största Aqualand till lugna Hidropark i norr.',
      }}
      intro={
        <>
          <p style={{ marginTop: 0 }}>
            Mallorca har tre stora vattenparker och två mindre — alla med tydliga specialiteter. Aqualand
            El Arenal är öns största med de vildaste rutschkanorna, Western Water Park levererar en
            helteatralisk tema­upplevelse i Magaluf, och Hidropark i norr är en dold pärla för familjer
            som bor i Alcúdia-området och vill slippa en timmes bilresa.
          </p>
          <p>
            Åldersfiltret nedan hjälper dig att snabbt se vilka parker som passar just era barn. Tips:
            vattenparkerna på södra/västra delen av ön har större småbarnsområden, men norr har
            betydligt kortare köer även mitt i juli.
          </p>
        </>
      }
    />
  );
}
