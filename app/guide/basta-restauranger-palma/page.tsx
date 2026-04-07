export const metadata = {
  title: '15 bästa restaurangerna i Palma 2026 – Lokal guide | MyMallorca',
  description: 'Rankade av en lokal: de 15 bästa restaurangerna i Palma de Mallorca. Michelinkrogar, bästa tapas, fisk och skaldjur, och dolda pärlor utan turistpriser.',
};

const restauranger = {
  michelin: [
    {
      namn: 'Zaranda',
      adress: 'Carrer de Son Espanyolet, Palma',
      pris: '💰💰💰💰',
      specialitet: 'Haute cuisine med mallorquinska råvaror',
      bästRätt: 'Smörstekt pilgrimsmussla med svart tryffel',
      insiderTips: 'Boka en månad i förväg. Lunchen (12:30) är billigare och lika bra som middagen.',
    },
    {
      namn: 'Marc Fosh',
      adress: 'Carrer de la Missió, Palma gamla stad',
      pris: '💰💰💰💰',
      specialitet: 'Modern medelhavsmat, brittisk kock',
      bästRätt: 'Bacallà (torsk) med olivolja och örter',
      insiderTips: 'Boka ett bord vid fönstret mot klostergården. Provmeny (7 rätter) ger bäst värde.',
    },
    {
      namn: 'Adrian Quetglas',
      adress: 'Passeig del Born, Palma',
      pris: '💰💰💰',
      specialitet: 'Fusion av spanskt och östeuropeiskt',
      bästRätt: 'Suckling pig med äpple och chutney',
      insiderTips: 'Bordsplacering vid baren ger bäst utsikt mot köket. Avsluta med deras hemgjorda glass.',
    },
  ],
  tapas: [
    {
      namn: 'La Bodeguilla',
      adress: 'Carrer de Sant Jaume, Palma',
      pris: '💰💰',
      specialitet: 'Klassisk spansk tapas och jamón ibérico',
      bästRätt: 'Jamón ibérico bellota + manchego + pan con tomate',
      insiderTips: 'Stå vid bardisken för bäst servis. Beställ hela tapasmenyn – inte á la carte.',
    },
    {
      namn: 'Bar España',
      adress: 'Plaça de Weyler, Palma',
      pris: '💰',
      specialitet: 'Lokalt hänge med autentisk atmosfär',
      bästRätt: 'Croquetas de jamón (husmanskost i världsklass)',
      insiderTips: 'Dit för frukost kl 09–11. Palmesanerna börjar dagen med kaffe och en tapas.',
    },
    {
      namn: 'Tast Club',
      adress: 'Carrer de Sant Jaume, Palma',
      pris: '💰💰💰',
      specialitet: 'Modern tapas, smakrik och kreativ',
      bästRätt: 'Sobrassada med honung och brioche',
      insiderTips: 'Sista bordet kl 22:00 – perfekt för en sen spansk middag utan att rusa.',
    },
    {
      namn: 'El Camino',
      adress: 'Carrer dels Apuntadors, La Lonja',
      pris: '💰💰',
      specialitet: 'Internationella smaker med spansk bas',
      bästRätt: 'Burrata med färska tomater och basilikaolja',
      insiderTips: 'Utomhusservering i bakgården – boka den! Inomhus är trångt.',
    },
  ],
  fisk: [
    {
      namn: 'Portixol Restaurant',
      adress: 'Carrer de Sirena, Portixol hamn',
      pris: '💰💰💰',
      specialitet: 'Färsk fisk, utsikt mot hamnen',
      bästRätt: 'Rissotto med havskräfta och saffran',
      insiderTips: 'Be om bord nummer 12 – direkt mot vattnet. Kom i solnedgången 20:00.',
    },
    {
      namn: 'Es Parlament',
      adress: 'Carrer del Conquistador, Palma',
      pris: '💰💰💰',
      specialitet: 'Klassisk mallorquinsk fiskrestaurang',
      bästRätt: 'Suquet de peix – mallorquinsk fiskgryta',
      insiderTips: 'Traditionellt hak frequenterat av lokala politiker. Aldrig dåligt.',
    },
    {
      namn: 'Caballito de Mar',
      adress: 'Passeig de Sagrera, Palma',
      pris: '💰💰',
      specialitet: 'Enkelt och fräscht, rätt vid havet',
      bästRätt: 'Friterad sardiner med aioli',
      insiderTips: 'Perfekt för lunch i solen. Gå till kassan och välj dagens fångst – handpekat.',
    },
    {
      namn: 'Llaut del Born',
      adress: 'Passeig del Born, Palma',
      pris: '💰💰',
      specialitet: 'Fisk och skaldjur mitt i centrum',
      bästRätt: 'Gambas al ajillo (vitlöksräkor)',
      insiderTips: 'Beläget på bästa adress. Terrassen längs promenaden är oslagbar för kvällsmiddag.',
    },
  ],
  lokalt: [
    {
      namn: 'Celler Sa Premsa',
      adress: 'Plaça del Bisbe Berenguer de Palou, Palma',
      pris: '💰',
      specialitet: 'Palmas mest klassiska lokala restaurang',
      bästRätt: 'Frit mallorquín (traditionell rätter med potatis och grönsaker)',
      insiderTips: 'Restaurangen är identisk sedan 1940-talet. Kom hungry – portionerna är enorma.',
    },
    {
      namn: 'Ca\'n Joan de s\'Aigo',
      adress: 'Carrer de Can Sanç, Palma',
      pris: '💰',
      specialitet: 'Historiskt kafé sedan 1700-talet',
      bästRätt: 'Ensaïmada med crema + xocolata (drickchoklad)',
      insiderTips: 'Det äldsta kaféet på Mallorca. Frukost här kl 08–10 är obligatorisk.',
    },
    {
      namn: 'Mercat de l\'Olivar',
      adress: 'Plaça de l\'Olivar, Palma',
      pris: '💰',
      specialitet: 'Lokalt matmarknad med barer och tapas',
      bästRätt: 'Vad som helst från fiskedisken – direkt från havet',
      insiderTips: 'Köp färsk fisk på nedervåningen, gå upp och be en bar laga den. Obeskrivlig upplevelse.',
    },
    {
      namn: 'Calatrava Bistro',
      adress: 'Carrer dels Calatrava, gamla stan',
      pris: '💰💰',
      specialitet: 'Mysig bistro i hjärtat av gamla Palma',
      bästRätt: 'Dagsmenyn (14:00–16:00) – 3 rätter + vin för 18 €',
      insiderTips: 'Bäst förbordsköp i Palma – den dolda Dagsmenyn listas inte på hemsidan, fråga personalen.',
    },
  ],
};

export default function BästaRestaurangerPalma() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Matguide · Uppdaterad 2026</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>15 bästa restaurangerna i Palma</h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>Handplockade av en lokal – inte tripadvisor-rankade. Från Michelinstjärnor till 1 €-frukost.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Prisskala */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '20px 24px', marginBottom: '48px', borderLeft: '4px solid #0E7490' }}>
          <p style={{ fontWeight: '700', color: '#1F2937', marginBottom: '10px' }}>💰 Prisskala</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
            <div>💰 Under 20 € / person</div>
            <div>💰💰 20–40 € / person</div>
            <div>💰💰💰 40–70 € / person</div>
            <div>💰💰💰💰 70+ € / person</div>
          </div>
        </div>

        {/* Michelin */}
        <RestaurantSection title="⭐ Michelinkrogar" items={restauranger.michelin} />
        <RestaurantSection title="🥘 Bästa tapas" items={restauranger.tapas} />
        <RestaurantSection title="🦞 Fisk och skaldjur" items={restauranger.fisk} />
        <RestaurantSection title="🏘️ Lokalt & budget" items={restauranger.lokalt} />

        {/* CTA */}
        <div style={{ background: '#0E7490', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 12px' }}>Mer mat och vin på Mallorca</h2>
          <p style={{ opacity: 0.85, marginBottom: '24px' }}>Vingårdar, lokala marknader och fler restaurangtips utanför Palma.</p>
          <a href="/mat" style={{ display: 'inline-block', background: '#F59E0B', color: '#1F2937', padding: '14px 32px', borderRadius: '10px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: '700' }}>SE MAGUIDEN →</a>
        </div>
      </div>
    </div>
  );
}

function RestaurantSection({ title, items }: { title: string; items: { namn: string; adress: string; pris: string; specialitet: string; bästRätt: string; insiderTips: string }[] }) {
  return (
    <section style={{ marginBottom: '64px' }}>
      <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#1F2937', marginBottom: '24px' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items.map((r, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #ede5da' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', margin: 0, color: '#1F2937' }}>{r.namn}</h3>
              <span style={{ fontSize: '1rem' }}>{r.pris}</span>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: '#9CA3AF' }}>📍 {r.adress}</p>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: '#6B7280', fontStyle: 'italic' }}>{r.specialitet}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#F9F6F1', borderRadius: '8px', padding: '12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>BÄSTA RÄTTEN</p>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#374151' }}>{r.bästRätt}</p>
              </div>
              <div style={{ background: '#F0EBE3', borderRadius: '8px', padding: '12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#0E7490', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>💡 INSIDER-TIPS</p>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#374151' }}>{r.insiderTips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
