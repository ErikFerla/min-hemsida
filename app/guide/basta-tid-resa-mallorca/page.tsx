export const metadata = {
  title: 'Bästa tiden att resa till Mallorca – Månadsguide 2026 | MyMallorca',
  description: 'Månad-för-månad guide till Mallorcas klimat, turisttryck och priser. Hitta din bästa reseperiod utifrån vad du söker – strand, avkoppling eller aktiviteter.',
};

const månader = [
  { namn: 'Januari', temp: '14°C', sol: '6h/dag', turisttryck: '⭐', pris: '💰', text: 'Öns lugna säsong. Nästan inga turister, låga priser och behagligt väder för vandring och kultur. Perfekt för dig som vill se Palma utan köer.' },
  { namn: 'Februari', temp: '15°C', sol: '7h/dag', turisttryck: '⭐', pris: '💰', text: 'Mandelblomsningen – Mallorcas mest fotogeniska månad. Tusentals mandelträd blommar i vitt och rosa. Göm detta råd – ännu är det få som vet.' },
  { namn: 'Mars', temp: '17°C', sol: '7h/dag', turisttryck: '⭐⭐', pris: '💰💰', text: 'Vackra dagar, grön natur och nästan tomt på turister. Bra för vandring i Tramuntana. Kallt för bad men perfekt för allt annat.' },
  { namn: 'April', temp: '19°C', sol: '8h/dag', turisttryck: '⭐⭐⭐', pris: '💰💰', text: 'En av årets bästa månader. Stabilt väder, blommig natur, öppna restauranger. Påsk kan ge köer – boka i god tid. Magisk stämning.' },
  { namn: 'Maj', temp: '22°C', sol: '9h/dag', turisttryck: '⭐⭐⭐', pris: '💰💰', text: 'Sista chansen till skuldersäsong. Vattnet börjar bli badbart (20–22°C), priserna är fortfarande rimliga och turisttrycket lågt. Favoritperiod för många.' },
  { namn: 'Juni', temp: '27°C', sol: '10h/dag', turisttryck: '⭐⭐⭐⭐', pris: '💰💰💰', text: 'Sommarens start. Varmt vatten, perfekta stranddagar och livlig stämning. Antalet turister ökar men inte till juliogusts nivåer. Bra balans.' },
  { namn: 'Juli', temp: '32°C', sol: '11h/dag', turisttryck: '⭐⭐⭐⭐⭐', pris: '💰💰💰💰', text: 'Högsäsong. Full beläggning, långa köer och höga priser. Dyk dock fortfarande ner – vattnet är ljummet och kvällarna i Palma är fantastiska. Kom med öppna ögon.' },
  { namn: 'Augusti', temp: '33°C', sol: '11h/dag', turisttryck: '⭐⭐⭐⭐⭐', pris: '💰💰💰💰', text: 'Som juli men hetare. Undvik juli och augusti om du vill ha ro på stranden. Men om stämning och nattliv är prioritet – detta är din månad.' },
  { namn: 'September', temp: '28°C', sol: '9h/dag', turisttryck: '⭐⭐⭐', pris: '💰💰💰', text: 'Bästa månaden för de flesta. Varmt och badbart vatten (27°C), dramatiskt minskade turister efter 1 sep och lägre priser. Öns hemliga högsäsong.' },
  { namn: 'Oktober', temp: '23°C', sol: '7h/dag', turisttryck: '⭐⭐', pris: '💰💰', text: 'Höstens vackraste nyanser, relativt varmt hav och lugnt. Regnskurar kan förekomma. Bra för golf, vandring och kulinariska resor.' },
  { namn: 'November', temp: '17°C', sol: '6h/dag', turisttryck: '⭐', pris: '💰', text: 'Lugnt och vackert. Inga badturister, öppna hotell och restauranger med tomma bord. Regn förekommer men sällan flera dagar i rad. Promenad i Palma en soldag i november – total harmoni.' },
  { namn: 'December', temp: '14°C', sol: '6h/dag', turisttryck: '⭐', pris: '💰', text: 'Jul på Mallorca är en dold upplevelse. Städerna dekoreras, lokala marknader öppnar och temperaturen är de 14–16°C. Perfekt kulturresa – inte strandresa.' },
];

export default function BästaTidResaMallorca() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Reseplanering · 2026</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>Bästa tiden att resa till Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>Månadsguide med temperatur, turisttryck och prisnivå. Hitta din perfekta period.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Beslutsmatris */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '24px 28px', marginBottom: '48px', borderLeft: '4px solid #F59E0B' }}>
          <p style={{ fontWeight: '700', color: '#1F2937', marginBottom: '12px', fontSize: '1rem' }}>🎯 Vad söker du? → Vår rekommendation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#374151' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><strong>Strand + bad:</strong><br />Juni, september</div>
              <div><strong>Lugn + inga turister:</strong><br />Januari, februari, november</div>
              <div><strong>Familj med barn:</strong><br />Juni, september</div>
              <div><strong>Golf:</strong><br />November – april</div>
              <div><strong>Vandring:</strong><br />Mars, april, oktober</div>
              <div><strong>Bäst pris:</strong><br />November – mars</div>
              <div><strong>Nightlife + stämning:</strong><br />Juli, augusti</div>
              <div><strong>Mat & kultur:</strong><br />Oktober, november, april</div>
            </div>
          </div>
        </div>

        {/* Säsongsöversikt */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#1F2937', marginBottom: '24px' }}>Säsongernas logik</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Lågsäsong', period: 'Nov – Mar', färg: '#0E7490', text: 'Lägsta priser, minst turister. Bra för kultur, vandring, golf.' },
              { label: 'Skuldersäsong', period: 'Apr–Maj / Sep–Okt', färg: '#F59E0B', text: 'Bästa valet för de flesta. Varmt nog för bad, inga köer.' },
              { label: 'Högsäsong', period: 'Jun – Aug', färg: '#EF4444', text: 'Fullt, dyrt, varmt. Välj om stämning är viktigare än ro.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${s.färg}` }}>
                <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: s.färg, margin: '0 0 4px' }}>{s.label}</p>
                <p style={{ fontWeight: '700', color: '#1F2937', margin: '0 0 8px', fontSize: '0.9rem' }}>{s.period}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.55' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Månadsguide */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#1F2937', marginBottom: '8px' }}>Månad för månad</h2>
          <p style={{ color: '#6B7280', marginBottom: '32px', fontSize: '0.9rem' }}>Prisskala: 💰 = budget, 💰💰💰💰 = maxtryck. Turisttryck: ⭐ = lugnt, ⭐⭐⭐⭐⭐ = fullt.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {månader.map((m, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '20px 24px', border: '1px solid #ede5da', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px', alignItems: 'start' }}>
                <div>
                  <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.08em', color: '#0E7490', margin: 0 }}>{m.namn}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9CA3AF' }}>🌡️ {m.temp}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#9CA3AF' }}>☀️ {m.sol}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#9CA3AF' }}>{m.turisttryck}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#9CA3AF' }}>{m.pris}</p>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', lineHeight: '1.65' }}>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* September-sektionen */}
        <div style={{ background: '#EDE4D8', borderRadius: '20px', padding: '32px', marginBottom: '48px', borderLeft: '4px solid #F59E0B' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', color: '#1F2937', margin: '0 0 12px' }}>🌟 Hemligheten: Åk i september</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151', margin: 0 }}>
            September är Mallorcas bäst bevarade hemlighet. Havet är som varmast (27°C), 80% av turisterna har åkt hem och priserna faller 20–35% jämfört med juli. Restaurangerna är avslappnade igen, stränderna har plats och lokalbefolkningen tar tillbaka sin ö. Om du kan välja fritt – välj september.
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <a href="/vader" style={{ display: 'block', background: '#0E7490', borderRadius: '16px', padding: '28px', textAlign: 'center', color: 'white', textDecoration: 'none' }}>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.08em', margin: '0 0 8px' }}>Se väderprognos</p>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.88rem' }}>10-dagarsprognos för 7 städer</p>
          </a>
          <a href="/evenemang" style={{ display: 'block', background: '#F59E0B', borderRadius: '16px', padding: '28px', textAlign: 'center', color: '#1F2937', textDecoration: 'none' }}>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.08em', margin: '0 0 8px' }}>60+ evenemang 2026</p>
            <p style={{ margin: 0, opacity: 0.7, fontSize: '0.88rem' }}>Festivaler, marknader och sport</p>
          </a>
        </div>
      </div>
    </div>
  );
}
