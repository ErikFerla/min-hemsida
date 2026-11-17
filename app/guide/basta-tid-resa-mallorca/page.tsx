import Link from 'next/link';
import { IconStar, IconSun, PriceTag, IconSparkle } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';

const månader = [
  { namn: 'Januari', temp: '14°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Öns lugna säsong. Nästan inga turister, låga priser och behagligt väder för vandring och kultur. Perfekt för dig som vill se Palma utan köer.' },
  { namn: 'Februari', temp: '15°C', sol: '7h/dag', turisttryck: 1, pris: 1, text: 'Mandelblomsningen – Mallorcas mest fotogeniska månad. Tusentals mandelträd blommar i vitt och rosa, oftast från slutet av januari till mitten av februari. Fortfarande få turister.' },
  { namn: 'Mars', temp: '17°C', sol: '7h/dag', turisttryck: 2, pris: 2, text: 'Vackra dagar, grön natur och nästan tomt på turister. Bra för vandring i Tramuntana. Kallt för bad men perfekt för allt annat.' },
  { namn: 'April', temp: '19°C', sol: '8h/dag', turisttryck: 3, pris: 2, text: 'En av årets bästa månader. Stabilt väder, blommig natur, öppna restauranger. Påsk kan ge köer – boka i god tid. Magisk stämning.' },
  { namn: 'Maj', temp: '22°C', sol: '9h/dag', turisttryck: 3, pris: 2, text: 'Försäsong med sommarkänsla i luften. Havet är fortfarande friskt (omkring 18–19 °C) – badbart för de tåliga. Priserna är rimliga och det är sällan trångt. Favoritperiod för många.' },
  { namn: 'Juni', temp: '27°C', sol: '10h/dag', turisttryck: 4, pris: 3, text: 'Sommarens start. Varmt vatten, perfekta stranddagar och livlig stämning. Antalet turister ökar men når inte juli och augustis nivåer. Bra balans.' },
  { namn: 'Juli', temp: '32°C', sol: '11h/dag', turisttryck: 5, pris: 4, text: 'Högsäsong. Full beläggning, långa köer och höga priser. Samtidigt är vattnet ljummet och kvällarna i Palma fantastiska – boka tidigt och var på stranden tidigt på dagen.' },
  { namn: 'Augusti', temp: '33°C', sol: '11h/dag', turisttryck: 5, pris: 4, text: 'Som juli men hetare. Undvik juli och augusti om du vill ha ro på stranden. Men om stämning och nattliv är prioritet – detta är din månad.' },
  { namn: 'September', temp: '28°C', sol: '9h/dag', turisttryck: 3, pris: 3, text: 'Bästa månaden för många. Havet håller fortfarande sommarvärme (omkring 25–26 °C) och när skolorna har börjat blir det färre barnfamiljer. September är ändå en populär månad – boka i god tid.' },
  { namn: 'Oktober', temp: '23°C', sol: '7h/dag', turisttryck: 2, pris: 2, text: 'Höstens vackraste nyanser, relativt varmt hav och lugnt. Regnskurar kan förekomma. Bra för golf, vandring och kulinariska resor.' },
  { namn: 'November', temp: '17°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Lugnt och vackert. Inga badturister och gott om plats på restaurangerna. Många hotell på kustorterna stänger för säsongen, men i Palma och de större orterna finns det mesta öppet. Regn förekommer men sällan flera dagar i rad. Promenad i Palma en soldag i november – total harmoni.' },
  { namn: 'December', temp: '14°C', sol: '6h/dag', turisttryck: 1, pris: 1, text: 'Jul på Mallorca är en dold upplevelse. Städerna dekoreras, lokala marknader öppnar och dagstemperaturen ligger ofta kring 14–16 °C. Perfekt kulturresa – inte strandresa.' },
];

export default function BästaTidResaMallorca() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Solig strand och turkost vatten på Mallorca – klassisk badsäsong"
        kicker="Reseplanering · Månad för månad"
        title="Bästa tiden att resa till Mallorca"
        subtitle="Månadsguide med temperatur, turisttryck och prisnivå. Hitta din perfekta period."
        height="55vh"
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Beslutsmatris */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '24px 28px', marginBottom: '48px', borderLeft: '4px solid #993335' }}>
          <p style={{ fontWeight: '700', color: '#383a46', marginBottom: '12px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={18} /> Vad söker du? → Vår rekommendation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#374151' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><strong>Strand + bad:</strong><br />Juni, september</div>
              <div><strong>Lugn + inga turister:</strong><br />Januari, februari, november</div>
              <div><strong>Familj med barn:</strong><br />Juni, september</div>
              <div><strong>Golf:</strong><br />November – april</div>
              <div><strong>Vandring:</strong><br />Mars, april, oktober</div>
              <div><strong>Bäst pris:</strong><br />November – mars</div>
              <div><strong>Nattliv + stämning:</strong><br />Juli, augusti</div>
              <div><strong>Mat & kultur:</strong><br />Oktober, november, april</div>
            </div>
          </div>
        </div>

        {/* Säsongsöversikt */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '24px' }}>Säsongernas logik</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Lågsäsong', period: 'Nov – Mar', färg: '#993335', text: 'Lägsta priser, minst turister. Bra för kultur, vandring, golf.' },
              { label: 'Skuldersäsong', period: 'Apr–Maj / Sep–Okt', färg: '#993335', text: 'Bästa valet för de flesta. Varmt nog för bad, inga köer.' },
              { label: 'Högsäsong', period: 'Jun – Aug', färg: '#EF4444', text: 'Fullt, dyrt, varmt. Välj om stämning är viktigare än ro.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${s.färg}` }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.08em', color: s.färg, margin: '0 0 4px' }}>{s.label}</p>
                <p style={{ fontWeight: '700', color: '#383a46', margin: '0 0 8px', fontSize: '0.9rem' }}>{s.period}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.55' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Månadsguide */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '8px' }}>Månad för månad</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>Prisskala: 1 € = budget, 4 € = maxtryck. Turisttryck: 1 stjärna = lugnt, 5 stjärnor = fullt.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {månader.map((m, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '20px 24px', border: '1px solid #ede5da', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px', alignItems: 'start' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.08em', color: '#993335', margin: 0 }}>{m.namn}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{m.temp}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconSun size={12} /> {m.sol}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#993335', display: 'inline-flex', gap: 1 }}>{Array.from({ length: m.turisttryck }).map((_, j) => <IconStar key={j} size={10} />)}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.7rem' }}><PriceTag tier={m.pris} /></p>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', lineHeight: '1.65' }}>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* September-sektionen */}
        <div style={{ background: '#EDE4D8', borderRadius: '20px', padding: '32px', marginBottom: '48px', borderLeft: '4px solid #993335' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em', color: '#383a46', margin: '0 0 12px', display: 'inline-flex', alignItems: 'center', gap: 10 }}><IconSparkle size={22} /> Vårt tips: Åk i september</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151', margin: 0 }}>
            Havet håller fortfarande sommarvärme (omkring 25–26 °C), barnfamiljerna har åkt hem när skolorna börjat och priserna brukar vara lägre än i juli och augusti. Det är fortfarande en välbesökt månad, men lugnare än högsommaren – särskilt mot slutet av månaden. Om du kan välja fritt och inte är bunden till skollov – välj september.
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <Link href="/vader" style={{ display: 'block', background: '#993335', borderRadius: '16px', padding: '28px', textAlign: 'center', color: 'white', textDecoration: 'none' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.08em', margin: '0 0 8px' }}>Se väderprognos</p>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.88rem' }}>10-dagarsprognos för 7 städer</p>
          </Link>
          <Link href="/evenemang" style={{ display: 'block', background: '#993335', borderRadius: '16px', padding: '28px', textAlign: 'center', color: 'white', textDecoration: 'none' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.08em', margin: '0 0 8px' }}>Evenemang på Mallorca</p>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.88rem' }}>Festivaler, marknader och sport</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
