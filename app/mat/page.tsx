'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IconPin, IconClock, IconMap, IconExternal, IconGlass, PriceTag, tierFromEmoji } from '@/components/Icons';

const vingårdar = [
  { namn: 'Bodega Binigrau', web: 'https://www.binigrau.es', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner', vin: 'Prova: Binigrau Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', web: 'https://www.vinosferrer.com', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård', vin: 'Prova: Veritas Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', web: 'https://www.bodegasribas.com', plats: 'Consell', info: 'Familjedriven vingård sedan 1711', vin: 'Prova: Ribas de Cabrera', prisklass: '💰💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', web: 'https://www.animanegra.com', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', vin: 'Prova: ÀN/2', prisklass: '💰💰💰', öppet: 'Endast med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', web: 'https://www.canmajoral.com', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar', vin: 'Prova: Entel', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', web: 'https://www.vinyataujana.com', plats: 'Santa Eugènia', info: 'Liten boutique-vingård', vin: 'Prova: Taujana Rosat', prisklass: '💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
];

const restauranger = [
  { namn: 'Marc Fosh', plats: 'Palma', info: 'En Michelinstjärna – modern och kreativ medelhavsmat', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Marc+Fosh+Palma+Mallorca' },
  { namn: 'Zaranda', plats: 'Llucmajor', info: 'Två Michelinstjärnor – Mallorcas mest exklusiva matupplevelse', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Zaranda+Mallorca' },
  { namn: 'Adrián Quetglas', plats: 'Palma', info: 'En Michelinstjärna – kreativ fusion av spansk och nordisk matkultur', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Mån–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Adrian+Quetglas+Palma+Mallorca' },
  { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'En Michelinstjärna med fantastisk panoramautsikt över havet', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Fum+Mallorca' },
  { namn: 'Andreu Genestra', plats: 'Capdepera', info: 'En Michelinstjärna med fokus på lokala mallorquinska råvaror', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Andreu+Genestra+Capdepera+Mallorca' },
  { namn: "Béns d'Avall", plats: 'Deià', info: 'Ikonisk terrass huggen i bergsklippan med autentisk mallorquinsk matkultur', kategori: 'Utsikt', prisklass: '💰💰💰', öppet: 'Dagligen 13–16, 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Bens+Avall+Deia+Mallorca' },
  { namn: 'Simply Fosh', plats: 'Palma', info: 'Marc Foshs mer avslappnade bistro med samma höga kvalitet', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Mån–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Simply+Fosh+Palma+Mallorca' },
  { namn: 'El Camino', plats: 'Palma', info: 'Trendig och livlig tapasbar i hjärtat av Palma', kategori: 'Tapas', prisklass: '💰💰', öppet: 'Dagligen 12–24', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=El+Camino+Palma+Mallorca' },
  { namn: 'La Vieja', plats: 'Palma', info: 'Modern tolkning av det mallorquinska köket i elegant miljö', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Vieja+Palma+Mallorca' },
  { namn: 'Aramis', plats: 'Palma', info: 'Elegant och klassisk restaurang med fokus på råvaror av högsta kvalitet', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Mån–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Aramis+Palma+Mallorca' },
  { namn: 'Restaurante Jardin', plats: "Port d'Alcúdia", info: "Havsutsikt och dagsfärsk fisk i Port d'Alcúdia", kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Restaurante+Jardin+Port+Alcudia+Mallorca' },
  { namn: 'Stay', plats: "Port d'Andratx", info: "Exklusiv restaurang med utsikt över Port d'Andratx vackra marina", kategori: 'Utsikt', prisklass: '💰💰💰💰', öppet: 'Dagligen 13–16, 19–23', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+Andratx+Mallorca' },
  { namn: "Es Racó d'es Teix", plats: 'Deià', info: 'Michelinstjärna i bergsby', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Ons–Sön 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Raco+des+Teix+Deia+Mallorca' },
  { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Äkta mallorquinsk husmanskost i rustik källarmiljö sedan 1958', kategori: 'Lokalt', prisklass: '💰', öppet: 'Mån–Lör 13–16', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Sa+Premsa+Palma+Mallorca' },
  { namn: 'La Bodeguita', plats: 'Palma', info: 'Mysig vinkällare med ett brett urval av lokala viner och vällagade tapas', kategori: 'Tapas', prisklass: '💰💰', öppet: 'Dagligen 12–24', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=La+Bodeguita+Palma+Mallorca' },
  { namn: 'Arrosseria Santi Taura', plats: 'Lloseta', info: 'Prisbelönt kock och mästare på mallorquinsk arroz och lokala rätter', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Arrosseria+Santi+Taura+Lloseta+Mallorca' },
  { namn: 'Toque de Queda', plats: 'Palma', info: 'Intim och personlig restaurang med passionerade kockar och hemlagad känsla', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Toque+de+Queda+Palma+Mallorca' },
  { namn: 'Misa Brasería', plats: 'Palma', info: 'Populär brasería med grillat kött, kreativa cocktails och levande stämning', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Dagligen 13–16, 19–23', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Misa+Braseria+Palma+Mallorca' },
  { namn: 'Caballito de Mar', plats: 'Palma', info: 'Klassisk fiskrestaurang vid Palmas kaj med dagsfärsk havsfisk', kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Caballito+de+Mar+Palma+Mallorca' },
  { namn: 'Patron Lunares', plats: 'Port de Pollença', info: 'Familjär fiskrestaurang i Port de Pollença – känd för sin färska fisk och skaldjur', kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Patron+Lunares+Port+Pollenca+Mallorca' },
  { namn: 'Cala Deia', plats: 'Deià', info: 'Romantisk restaurang på klipporna vid havet – öppet sommarsäsongen', kategori: 'Utsikt', prisklass: '💰💰💰', öppet: 'Maj–Okt dagligen 12–18', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Cala+Deia+Restaurant+Mallorca' },
  { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Hemlagad ekologisk mallorquinsk mat av råvaror direkt från trädgården', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Tors–Sön 13–15', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Ca+Na+Toneta+Caimari+Mallorca' },
  { namn: 'Argento', plats: 'Palma', info: 'Prisbelönt italiensk restaurang med autentiska råvaror och modern presentation', kategori: 'Tapas', prisklass: '💰💰💰', öppet: 'Dagligen 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Argento+Palma+Mallorca' },
  { namn: 'Duke', plats: 'Palma', info: 'Modern europeisk gastropub med kreativa rätter och välskött vinlista', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Mån–Lör 19–22', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Duke+Restaurant+Palma+Mallorca' },
  { namn: 'La Residencia', plats: 'Deià', info: 'Ikonisk restaurang på lyxhotellet La Residencia i charmiga Deià', kategori: 'Utsikt', prisklass: '💰💰💰💰', öppet: 'Dagligen 13–15, 19–22', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Residencia+Deia+Mallorca' },
  { namn: "Es Molí d'en Bou", plats: 'Sant Llorenç', info: 'En Michelinstjärna gömd på landsbygden – kräver bokning långt i förväg', kategori: 'Michelin', prisklass: '💰💰💰💰', öppet: 'Tis–Lör 19–22', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Moli+den+Bou+Sant+Llorenc+Mallorca' },
  { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Historisk herrgård på landsbygden med smakrik lokal husmanskost', kategori: 'Lokalt', prisklass: '💰💰💰', öppet: 'Dagligen 13–15, 19–21', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Monnaber+Nou+Campanet+Mallorca' },
  { namn: 'Miceli', plats: 'Selva', info: 'Liten pärla i Selva med hemlagad mat från den egna trädgården', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Tors–Sön 13–15', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Miceli+Selva+Mallorca' },
  { namn: 'Sa Pleta Freda', plats: 'Sineu', info: 'Traditionell och mysig restaurang i lantliga Sineu med mallorquinska klassiker', kategori: 'Lokalt', prisklass: '💰💰', öppet: 'Ons–Sön 13–15, 19–21', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Sa+Pleta+Freda+Sineu+Mallorca' },
  { namn: 'Es Verger', plats: 'Alaró', info: 'Berömd för sin ugnsrostade mallorquinska lammstek med storslagna bergsutsikter', kategori: 'Utsikt', prisklass: '💰💰', öppet: 'Dagligen 12–17', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Verger+Alaro+Mallorca' },
];

export default function MatPage() {
  const [filter, setFilter] = useState('Alla');
  const kategorier = ['Alla', 'Michelin', 'Fisk', 'Tapas', 'Utsikt', 'Lokalt'];
  const filtreradeLista = filter === 'Alla' ? restauranger : restauranger.filter(r => r.kategori === filter);

  const kort: React.CSSProperties = { background: 'white', borderRadius: 16, boxShadow: '0 4px 14px rgba(31,41,55,0.04)', overflow: 'hidden', border: '1px solid #ede5da' };
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 };

  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', minHeight: '52vh', backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(24px,6vw,60px) clamp(20px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.72))' }} />
        <div style={{ position: 'relative', color: 'white', maxWidth: '640px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 14, opacity: 0.85 }}>Mallorcas matkultur</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.4rem,8vw,5rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0, lineHeight: 0.95 }}>Mat & Vin på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem,3.2vw,1.1rem)', marginTop: 16, opacity: 0.92, lineHeight: 1.5 }}>Från Michelinkrogar till lokala vingårdar – din guide till det bästa</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(30px,4vw,60px) clamp(16px,4vw,60px)' }}>
        {/* Vingårdar kort teaser */}
        <section style={{ marginBottom: 56, background: 'white', border: '1px solid #ede5da', borderRadius: 20, padding: 'clamp(20px,5vw,32px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#0E7490', marginBottom: 10 }}>
              <IconGlass size={14} stroke={1.8} />
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>Vinkultur</span>
            </div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,5.5vw,2.4rem)', letterSpacing: '0.03em', color: '#1F2937', margin: '0 0 10px', lineHeight: 1 }}>Vingårdar att besöka</h2>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, maxWidth: '55ch' }}>Mallorca har över 70 vingårdar. Här är ett urval — besök vår dedikerade sida för hela guiden med bokningstips.</p>
          </div>
          <div style={grid}>
            {vingårdar.slice(0, 3).map(v => (
              <article key={v.namn} style={kort}>
                <div style={{ position: 'relative', width: '100%', height: 160 }}>
                  <Image src={v.bild} alt={v.namn} fill sizes="(max-width:860px) 100vw, 360px" style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.04em', margin: 0, color: '#1F2937' }}>{v.namn}</h3>
                    <PriceTag tier={tierFromEmoji(v.prisklass)} />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', color: '#6B7280', fontSize: '0.78rem', marginBottom: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={11} /> {v.plats}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconClock size={11} /> {v.öppet}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>{v.info}</p>
                </div>
              </article>
            ))}
          </div>
          <a href="/vingardar" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: '#1F2937', color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', minHeight: 44 }}>
            Se alla vingårdar <IconExternal size={13} stroke={1.8} />
          </a>
        </section>

        {/* Restauranger */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0E7490', fontWeight: 700, margin: '0 0 6px' }}>Handplockat</p>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,5.5vw,2.4rem)', letterSpacing: '0.03em', color: '#1F2937', margin: '0 0 20px', lineHeight: 1 }}>30 bästa restaurangerna</h2>

          <style>{`.mat-filter-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div className="mat-filter-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', padding: '2px 2px 4px', marginBottom: 24 }}>
            {kategorier.map(k => {
              const active = filter === k;
              return (
                <button key={k} onClick={() => setFilter(k)} style={{ minHeight: 40, padding: '0 18px', borderRadius: 999, border: active ? '1px solid #1F2937' : '1px solid #E2D8C8', background: active ? '#1F2937' : 'white', color: active ? 'white' : '#1F2937', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.16s ease' }}>
                  {k}
                </button>
              );
            })}
          </div>
          <p style={{ color: '#6B7280', fontSize: '0.82rem', margin: '0 0 20px' }}>{filtreradeLista.length} restauranger</p>

          <div style={grid}>
            {filtreradeLista.map(r => (
              <article key={r.namn} style={kort}>
                <div style={{ position: 'relative', width: '100%', height: 180 }}>
                  <Image src={r.bild} alt={r.namn} fill sizes="(max-width:860px) 100vw, 360px" style={{ objectFit: 'cover' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.94)', color: '#1F2937', padding: '4px 10px', borderRadius: 999, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.kategori}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.25rem', letterSpacing: '0.04em', margin: 0, color: '#1F2937', lineHeight: 1.1 }}>{r.namn}</h3>
                    <PriceTag tier={tierFromEmoji(r.prisklass)} />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', color: '#6B7280', fontSize: '0.78rem', marginBottom: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={11} /> {r.plats}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconClock size={11} /> {r.öppet}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#374151', margin: '0 0 14px', lineHeight: 1.5 }}>{r.info}</p>
                  <a href={r.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: '#F59E0B', color: '#1F2937', borderRadius: 8, fontSize: '0.82rem', textDecoration: 'none', fontWeight: 700, minHeight: 36 }}>
                    <IconMap size={13} stroke={1.8} /> Visa på karta
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0E7490', fontWeight: 700, margin: '0 0 6px' }}>Karta</p>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,5vw,2rem)', letterSpacing: '0.03em', color: '#1F2937', margin: '0 0 16px', lineHeight: 1 }}>Utforska Mallorca</h2>
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 22px rgba(0,0,0,0.1)' }}>
            <img src="https://www.openstreetmap.org/export/map.png?bbox=2.2,39.2,3.5,40.0&layer=mapnik" alt="Karta över Mallorca" style={{ width: '100%', display: 'block' }} />
          </div>
        </section>
      </div>
    </div>
  );
}
