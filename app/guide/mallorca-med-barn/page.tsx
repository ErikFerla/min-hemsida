import { IconWave, IconSparkle, IconBuilding } from '@/components/Icons';
import type { ComponentType } from 'react';

export const metadata = {
  title: 'Mallorca med barn 2026 – Komplett guide för barnfamiljer | MyMallorca',
  description: 'Allt du behöver veta för en lyckad barnfamiljesemester på Mallorca. Bästa stränder, vattenparker, hotell och aktiviteter för barn 0–15 år.',
};

type Sektion = {
  rubrik: string;
  Icon: ComponentType<{ size?: number }>;
  innehåll: string;
  punkter: { namn: string; beskrivning: string }[];
};

const sektioner: Sektion[] = [
  {
    rubrik: 'Bästa barnvänliga stränderna',
    Icon: IconWave,
    innehåll: 'Mallorca har över 200 stränder men alla är inte lämpade för barn. De bästa barnvänliga stränderna kombinerar grunt vatten, sand (inte grus) och bekvämligheter nära till hands.',
    punkter: [
      { namn: 'Playa de Muro', beskrivning: 'Grunt, sandigt, lugnt – perfekt för de minsta. 5 km lång strand med toaletter och restauranger längs hela sträckan.' },
      { namn: 'Cala Millor', beskrivning: 'Bred sandstrand med gradvis djupökning. Barn kan leka länge utan att nå djupt vatten.' },
      { namn: 'Alcúdia Port', beskrivning: 'Familjevänlig by med strand, promenadstråk och många restauranger. Bra faciliteter och lugnt.' },
      { namn: 'Cala Llombards', beskrivning: 'Liten och skyddad vik med grunt vatten. Lokalt café med god mat – populär bland familjer.' },
    ],
  },
  {
    rubrik: 'Vattenparker – vår ärliga recension',
    Icon: IconSparkle,
    innehåll: 'Det finns tre stora vattenparker på Mallorca. Här är en ärlig jämförelse baserad på faktiska besök – inte PR-material.',
    punkter: [
      { namn: 'Aqualand El Arenal', beskrivning: 'Störst och bäst. Perfekt för barn 6–14 år. Räkna med 45–60 min kö på populära rutschbanor högsäsong. Tips: kom 30 min efter öppning.' },
      { namn: 'Hidropark Alcúdia', beskrivning: 'Mindre, mysigare och kortare köer. Perfekt för familjer med barn under 8 år. Bra värde för pengarna.' },
      { namn: 'Western Park', beskrivning: 'Vattenrutschbanor + western-tema. Bra för barn 5–10 år men temat sliter fort. Halvdagsutflykt snarare än heldag.' },
    ],
  },
  {
    rubrik: 'Djurparker och naturupplevelser',
    Icon: IconBuilding,
    innehåll: 'Mallorca erbjuder flera klassiska barnattraktioner som kombinerar natur och underhållning.',
    punkter: [
      { namn: 'Safari Zoo Porto Cristo', beskrivning: 'Mallorcas enda safaripark. Kör igenom med bil – barn älskar det. Bra för barn 4–12 år. 2–3 timmar.' },
      { namn: 'Coves del Drach (Drakgrottorna)', beskrivning: 'Fantastiska stalaktitgrottor i Porto Cristo. Avslut med konsert på underjordisk sjö. Magiskt för alla åldrar.' },
      { namn: 'Marineland', beskrivning: 'Delfin- och sjölejonsshower nära Palma. Omtyckt av barn under 10 år. Boka biljetter online.' },
    ],
  },
  {
    rubrik: 'Praktiska tips för barnfamiljer',
    Icon: IconSparkle,
    innehåll: 'Saker vi önskar att vi visste från början – baserade på erfarenhet som förälder på ön.',
    punkter: [
      { namn: 'Bästa tid att resa med barn', beskrivning: 'Juni eller september. Varmare än maj, men utan juli–augustis barnvagnskaos och köer. Priser 20–30% lägre än högsäsong.' },
      { namn: 'Hyr bil – det är nödvändigt', beskrivning: 'Kollektivtrafiken täcker inte de bästa stränderna. Med barnstol (boka i förväg!) och bagagerum är bilen avgörande.' },
      { namn: 'Mat för kräsna matare', beskrivning: 'Alla restauranger på Mallorca serverar pasta och pizza. Spanska barn äter sent – restauranger öppnar 20:00–20:30 för middag.' },
    ],
  },
];

export default function MallorcaMedBarnGuide() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', backgroundImage: 'url(https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Familjereseguide · 2026</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>Mallorca med barn</h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>Den kompletta guiden för barnfamiljer – från spädbarn till tonåringar. Skriven av en förälder som bor på ön.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Snabbval */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '24px 28px', marginBottom: '48px', borderLeft: '4px solid #F59E0B' }}>
          <p style={{ fontWeight: '700', color: '#1F2937', marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={18} /> Snabbsvar – vad passar ditt barn?</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151', fontSize: '0.9rem', lineHeight: '2.2' }}>
            <li><strong>0–3 år:</strong> Playa de Muro (grunt, sandstrand, lugnt vatten)</li>
            <li><strong>4–8 år:</strong> Aqualand El Arenal + Coves del Drach</li>
            <li><strong>9–12 år:</strong> Kayak, snorkling Cala Mondragó, Safari Zoo</li>
            <li><strong>13+ år:</strong> Wakeboard, klipphopp Cala Figuera, Palma street food</li>
          </ul>
        </div>

        {sektioner.map((sektion, i) => (
          <section key={i} style={{ marginBottom: '56px' }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,4vw,2.2rem)', letterSpacing: '0.05em', color: '#1F2937', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <sektion.Icon size={24} /> {sektion.rubrik}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151', marginBottom: '24px' }}>{sektion.innehåll}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sektion.punkter.map((punkt, j) => (
                <div key={j} style={{ background: 'white', borderRadius: '12px', padding: '18px 20px', border: '1px solid #ede5da', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ background: '#0E7490', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', flexShrink: 0 }}>{j + 1}</span>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1F2937', margin: '0 0 4px', fontSize: '0.95rem' }}>{punkt.namn}</p>
                    <p style={{ margin: 0, color: '#6B7280', fontSize: '0.88rem', lineHeight: '1.55' }}>{punkt.beskrivning}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div style={{ background: '#0E7490', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 12px' }}>Planera din familjeresa</h2>
          <p style={{ opacity: 0.85, marginBottom: '24px' }}>Använd vår barnguide för fler tips, stränder och aktiviteter.</p>
          <a href="/barn" style={{ display: 'inline-block', background: '#F59E0B', color: '#1F2937', padding: '14px 32px', borderRadius: '10px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: '700' }}>SE BARNGUIDEN →</a>
        </div>
      </div>
    </div>
  );
}
