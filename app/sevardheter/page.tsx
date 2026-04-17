'use client';
import Image from 'next/image';
import { IconPin, IconClock, IconBulb, IconStar, IconInfo } from '@/components/Icons';
const sevardheter = [
  {
    namn: 'La Seu – Palmas katedral',
    plats: 'Palma',
    kategori: 'Kyrka & Kloster',
    beskrivning: 'En av Europas mest imponerande gotiska katedraler, påbörjad 1229. Antoni Gaudí renoverade interiören på 1900-talet. Utsikten från strandpromenaden är magnifik.',
    tips: 'Gratis att besöka vardagar före kl 10. Ljusspelet genom rosfönstret sker bara två gånger per år.',
    oppet: 'Mån–Lör 10–17, Sön stängd för turister',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=La+Seu+Cathedral+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Gratis entré vardagar före kl 10 – kom 09:30 för bästa ljuset genom rosfönstret' },
  },
  {
    namn: 'Bellver Slott',
    plats: 'Palma',
    kategori: 'Slott & Borg',
    beskrivning: 'Unikt runt slott från 1300-talet på en kulle med fantastisk utsikt över Palma och bukten. Tidigare kunglig sommarresidens och fängelse.',
    tips: 'Bästa utsiktsplatsen över Palma – perfekt vid solnedgång.',
    oppet: 'Tis–Sön 10–19 (sommar), 10–18 (vinter)',
    bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Bellver+Castle+Palma+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Solnedgångsutsikt över Palma – kom kl 18 på sommaren' },
  },
  {
    namn: 'Valldemossa Kartusianerkloster',
    plats: 'Valldemossa',
    kategori: 'Kyrka & Kloster',
    beskrivning: 'Historiskt kloster där Frédéric Chopin och George Sand bodde vintern 1838–39. Museer, konst och Mallorcas vackraste bergsby runt om.',
    tips: 'Kom tidigt på morgonen innan turistbussarna anländer kl 10.',
    oppet: 'Mån–Lör 9:30–18:30, Sön 10–13',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Valldemossa+Monastery+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Fullsatt 10–14 på sommaren – kom vid öppning eller efter kl 15' },
  },
  {
    namn: 'Coves del Drach',
    plats: 'Porto Cristo',
    kategori: 'Natur & Grottor',
    beskrivning: 'Dramatiska underjordiska grottor med en av världens största underjordiska sjöar – Lago Martel. Klassisk konsert på vattnet ingår i besöket.',
    tips: 'Boka biljetter online i förväg – populäraste attraktionen på ön.',
    oppet: 'Dagligen 10–17 (apr–okt), 10–15 (nov–mar)',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Boka ALLTID online – kassaköerna kan vara 1–2 timmar på högsäsong' },
  },
  {
    namn: 'Serra de Tramuntana',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & Landskap',
    beskrivning: 'UNESCO:s världsarv sedan 2011. Dramatisk bergskedja med vandringsleder, olivlundar och medeltida byar. Högsta topp: Puig Major på 1 445 m.',
    tips: 'GR-221 "Ruta de Pedra en Sec" är en av Europas vackraste vandringsleder.',
    oppet: 'Alltid öppet – ta med karta och vatten',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Serra+de+Tramuntana+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Cykelentusiaster och vandrare – GR-221 är en av Europas vackraste leder' },
  },
  {
    namn: 'Cap de Formentor',
    plats: 'Norra Mallorca',
    kategori: 'Natur & Landskap',
    beskrivning: 'Mallorcas dramatiska nordspets med klippor som stupar rakt ner i havet. Ikonisk fyrtorn och en av öns vackraste utsiktsplatser.',
    tips: 'Biltrafik begränsad sommar – ta buss från Port de Pollença.',
    oppet: 'Alltid öppet',
    bild: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
    maps: 'https://maps.google.com/?q=Cap+de+Formentor+Mallorca',
    redaktionellt: { typ: 'info', text: 'Biltillstånd krävs maj–oktober – ta bussen från Port de Pollença (30 kr)' },
  },
  {
    namn: "Palau de l'Almudaina",
    plats: 'Palma',
    kategori: 'Slott & Borg',
    beskrivning: 'Kungligt palats bredvid La Seu, byggt på arabiska fundamenter. Officiell residens för spanska kungafamiljen vid besök på Mallorca.',
    tips: 'Kombinera alltid med ett besök i katedralen – de ligger vägg i vägg.',
    oppet: 'Mån–Fre 10–18, Lör 10–14',
    bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Palau+de+l+Almudaina+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Kombinera alltid med La Seu – de ligger 50 meter från varandra' },
  },
  {
    namn: 'Sa Calobra',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & Landskap',
    beskrivning: 'En av Mallorcas mest spektakulära platser – nås via en legendarisk slingrande bergsväg eller med båt. Grottor och turkost vatten vid mynningen av Torrent de Pareis.',
    tips: 'Ta båten från Port de Sóller för den mest dramatiska upplevelsen.',
    oppet: 'Alltid öppet',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Sa+Calobra+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Mötande trafik på slingrande bergsväg – kör lugnt och parkera tidigt' },
  },
  {
    namn: 'Fundació Miró Mallorca',
    plats: 'Palma',
    kategori: 'Konst & Kultur',
    beskrivning: 'Joan Mirós eget atelier och museum i Palma, designat av Josep Lluís Sert. Stor samling av Mirós konst i den studio han använde fram till sin död 1983.',
    tips: 'En av Europas bäst bevarade konstnärsateljéer – unik upplevelse.',
    oppet: 'Tis–Lör 10–18, Sön 10–15',
    bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    maps: 'https://maps.google.com/?q=Fundacio+Miro+Mallorca+Palma',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Konstälskare – ateljén är en av Europas bäst bevarade' },
  },
  {
    namn: "Coves d'Artà",
    plats: 'Capdepera',
    kategori: 'Natur & Grottor',
    beskrivning: 'Dramatiska grottor vid nordostkusten med enorma stalaktiter och stalagmiter. Jules Verne ska ha inspirerats av grottan när han skrev Vingt mille lieues sous les mers.',
    tips: 'Mindre välkänd än Coves del Drach – färre turister och lika imponerande.',
    oppet: 'Dagligen 10–17',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Coves+d+Arta+Mallorca',
    redaktionellt: { typ: 'info', text: 'Mycket färre turister än Coves del Drach – lika vackert men lugnare' },
  },
  {
    namn: 'Museu de Mallorca',
    plats: 'Palma',
    kategori: 'Konst & Kultur',
    beskrivning: 'Mallorcas viktigaste historiska museum i ett vackert renässanspalats i gamla stan. Arkeologi, konst och historia från förhistorisk tid till 1900-tal.',
    tips: 'Gratis entré söndagar. Gamla stadens gränder runt museet är värda ett strövtåg.',
    oppet: 'Tis–Lör 10–19, Sön 10–14',
    bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    maps: 'https://maps.google.com/?q=Museu+de+Mallorca+Palma',
    redaktionellt: { typ: 'tips', text: 'Gratis söndagar – perfekt att kombinera med en promenad i gamla stan' },
  },
  {
    namn: 'Santuari de Lluc',
    plats: 'Escorca',
    kategori: 'Kyrka & Kloster',
    beskrivning: 'Mallorcas heligaste plats – ett kloster i Tramuntana-bergen som pilgrimsmål sedan 1200-talet. Vacker natur, museum och den svarta madonnan "La Moreneta".',
    tips: 'Stanna till lunch i klosterrestaurangen – god och autentisk mallorquinsk mat.',
    oppet: 'Dagligen 10–18',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Santuari+de+Lluc+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: En lugn dag i bergen borta från strandtumult – restaurangen är utmärkt' },
  },
];

export default function SevardheterPage() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.8 }}>Historia, natur och kultur</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Sevärdheter på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginTop: '16px', lineHeight: '1.6', opacity: 0.85 }}>12 utvalda pärlor – från gotiska katedraler till dramatiska grottor</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {sevardheter.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <Image src={s.bild} alt={s.namn} width={600} height={200} style={{ width: '100%', height: '200px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#993335', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{s.kategori}</div>
              </div>
              <div style={{ padding: '22px' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', margin: '0 0 8px', lineHeight: '1.15', color: '#111' }}>{s.namn}</h2>
                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={12} /> {s.plats} · <IconClock size={12} /> {s.oppet}</p>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.7', margin: '0 0 12px' }}>{s.beskrivning}</p>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#444', marginTop: '10px', marginBottom: '14px', lineHeight: '1.6' }}><IconBulb size={14} style={{ verticalAlign: '-2px', marginRight: 4 }} /> {s.tips}</div>
                {s.redaktionellt && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '8px 12px', borderRadius: '8px', marginBottom: '12px',
                    background: s.redaktionellt.typ === 'varning' ? '#fff3cd' : s.redaktionellt.typ === 'tips' ? '#e8f5e9' : s.redaktionellt.typ === 'bast' ? '#e3f2fd' : '#f3e5f5',
                    borderLeft: `3px solid ${s.redaktionellt.typ === 'varning' ? '#f39c12' : s.redaktionellt.typ === 'tips' ? '#27ae60' : s.redaktionellt.typ === 'bast' ? '#2980b9' : '#8e44ad'}`,
                    fontSize: '0.82rem', color: '#333', lineHeight: '1.5',
                  }}>
                    <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}>
                      {s.redaktionellt.typ === 'varning' ? <IconInfo size={16} /> : s.redaktionellt.typ === 'tips' ? <IconStar size={16} /> : s.redaktionellt.typ === 'bast' ? <IconStar size={16} /> : <IconBulb size={16} />}
                    </span>
                    <span>{s.redaktionellt.text}</span>
                  </div>
                )}
                <a href={s.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#993335', color: '#fefefb', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                  Visa på karta →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}