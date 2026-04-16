import { IconWave, IconSparkle, IconBuilding, IconBulb, IconMap } from '@/components/Icons';
import BarnMapWrapper from '@/components/BarnMapWrapper';
import type { ComponentType } from 'react';

export const metadata = {
  title: 'Mallorca med barn 2026 – Komplett guide för barnfamiljer | MyMallorca',
  description: 'Allt du behöver veta för en lyckad barnfamiljesemester på Mallorca. Bästa stränder, vattenparker, hotell och aktiviteter för barn 0–15 år.',
};

type Sektion = {
  rubrik: string;
  Icon: ComponentType<{ size?: number }>;
  kortText: string;
  punkter: string[];
};

const sektioner: Sektion[] = [
  {
    rubrik: 'Bästa barnvänliga stränderna',
    Icon: IconWave,
    kortText: 'Mallorca har över 200 stränder, men bara en handfull är riktigt barnvänliga. De bästa kombinerar grunt vatten, mjuk sand och nära faciliteter.',
    punkter: ['Playa de Muro', 'Cala Millor', 'Alcúdia Port', 'Cala Llombards'],
  },
  {
    rubrik: 'Vattenparker',
    Icon: IconSparkle,
    kortText: 'Tre stora vattenparker att välja mellan. Aqualand är störst, Hidropark mysigast, och Western Park har bäst tema för yngre barn.',
    punkter: ['Aqualand El Arenal', 'Hidropark Alcúdia', 'Western Park'],
  },
  {
    rubrik: 'Djurparker & natur',
    Icon: IconBuilding,
    kortText: 'Klassiska barnattraktioner som blandar natur och underhållning — från safaripark till magiska droppstensgrottor.',
    punkter: ['Safari Zoo Porto Cristo', 'Coves del Drach', 'Marineland'],
  },
  {
    rubrik: 'Praktiska tips',
    Icon: IconBulb,
    kortText: 'Resa juni eller september för bästa balans mellan väder och mängd. Hyrbil är nödvändig — boka barnstol i förväg.',
    punkter: ['Bästa restid: juni / september', 'Hyrbil är ett måste', 'Restauranger öppnar 20:00'],
  },
];

export default function MallorcaMedBarnGuide() {
  return (
    <div style={{ background: '#fdf8f2', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: '#fdf8f2', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,60px) clamp(32px,5vw,48px)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#0E7490', fontWeight: 700, margin: '0 0 14px' }}>Familjereseguide · 2026</p>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.75rem,6vw,2.5rem)', fontWeight: 400, letterSpacing: '0.03em', margin: '0 0 16px', lineHeight: 1.05, color: '#1f2937' }}>Mallorca med barn</h1>
        <p style={{ fontSize: 'clamp(1rem,2.4vw,1.2rem)', color: '#374151', margin: '0 auto', maxWidth: '560px', lineHeight: 1.55 }}>En ö full av äventyr för hela familjen.</p>
        <div style={{ width: 56, height: 3, background: '#c9a96e', margin: '24px auto 0', borderRadius: 2 }} />
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(20px,5vw,60px) clamp(48px,7vw,80px)' }}>

        {/* Snabbval */}
        <section style={{ background: 'white', borderRadius: 16, padding: 'clamp(20px,4vw,28px)', marginBottom: 48, border: '1px solid #ede5da', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0E7490', margin: '0 0 14px', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={16} /> Snabbsvar – vad passar ditt barn?</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px 20px', color: '#374151', fontSize: '0.9rem', lineHeight: 1.5 }}>
            <li><strong style={{ color: '#1f2937' }}>0–3 år:</strong> Playa de Muro</li>
            <li><strong style={{ color: '#1f2937' }}>4–8 år:</strong> Aqualand + Coves del Drach</li>
            <li><strong style={{ color: '#1f2937' }}>9–12 år:</strong> Kayak, snorkling, Safari Zoo</li>
            <li><strong style={{ color: '#1f2937' }}>13+ år:</strong> Wakeboard, klipphopp, street food</li>
          </ul>
        </section>

        {/* Aktivitetskort */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeading kicker="Vad ni kan göra" titel="Aktiviteter för hela familjen" />
          <div className="barn-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {sektioner.map((s) => (
              <article key={s.rubrik} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #ede5da' }}>
                <div style={{ color: '#1f2937', marginBottom: 14 }}><s.Icon size={28} /></div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.04em', margin: '0 0 10px', color: '#1f2937', lineHeight: 1.1 }}>{s.rubrik}</h3>
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.6, margin: '0 0 14px' }}>{s.kortText}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.punkter.map(p => (
                    <span key={p} style={{ background: '#F3EFE8', color: '#1f2937', padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 500 }}>{p}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Karta */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeading kicker="Hitta dit" titel="Barnvänliga aktiviteter på kartan" />
          <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 20px', maxWidth: '60ch' }}>
            Här ser du de mest populära familjeaktiviteterna utspridda över ön — från vattenparker i söder till grottor på östkusten. Klicka på en pin för att läsa mer.
          </p>
          <div style={{ background: 'white', padding: 8, borderRadius: 14, border: '1px solid #ede5da', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <BarnMapWrapper />
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#1f2937', borderRadius: 18, padding: 'clamp(28px,6vw,40px)', textAlign: 'center', color: 'white' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#F59E0B', marginBottom: 12 }}>
            <IconMap size={16} stroke={1.8} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>Mer för familjen</span>
          </div>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,5vw,2rem)', letterSpacing: '0.03em', margin: '0 0 10px' }}>Planera din familjeresa</h2>
          <p style={{ opacity: 0.85, margin: '0 0 22px', fontSize: '0.95rem', lineHeight: 1.55 }}>Se den kompletta barnguiden med alla aktiviteter, åldersrekommendationer och praktiska tips.</p>
          <a href="/barn" style={{ display: 'inline-block', background: '#F59E0B', color: '#1f2937', padding: '12px 26px', borderRadius: 10, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 700 }}>SE BARNGUIDEN</a>
        </section>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .barn-card-grid { grid-template-columns: 1fr !important; }
          .barn-map-container { height: 320px !important; }
        }
      `}</style>
    </div>
  );
}

function SectionHeading({ kicker, titel }: { kicker: string; titel: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0E7490', fontWeight: 700, margin: '0 0 8px' }}>{kicker}</p>
      <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,4.5vw,2.2rem)', letterSpacing: '0.04em', color: '#1f2937', margin: '0 0 12px', lineHeight: 1 }}>{titel}</h2>
      <div style={{ width: 48, height: 3, background: '#c9a96e', borderRadius: 2 }} />
    </div>
  );
}
