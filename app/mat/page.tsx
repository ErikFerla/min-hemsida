'use client';
import { useState } from 'react';

const vingårdar = [
  { namn: 'Bodega Binigrau', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner', vin: 'Prova: Binigrau Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård', vin: 'Prova: Veritas Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', plats: 'Consell', info: 'Familjedriven vingård sedan 1711', vin: 'Prova: Ribas de Cabrera', prisklass: '💰💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', vin: 'Prova: ÀN/2', prisklass: '💰💰💰', öppet: 'Endast med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar', vin: 'Prova: Entel', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', plats: 'Santa Eugènia', info: 'Liten boutique-vingård', vin: 'Prova: Taujana Rosat', prisklass: '💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
  { namn: 'Miquel Gelabert', plats: 'Manacor', info: 'Prisbelönt hantverksvingård', vin: 'Prova: Torrent Negre', prisklass: '💰💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
  { namn: 'Son Bordils', plats: 'Inca', info: 'Vackert gods med ekologisk produktion', vin: 'Prova: Son Bordils Blanc', prisklass: '💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
  { namn: 'Bodegas Macià Batle', plats: 'Santa Maria', info: 'En av öns största producenter', vin: 'Prova: Anni Blanc de Blancs', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
  { namn: 'Can Vidalet', plats: 'Llubí', info: 'Ekologisk, internationellt prisad', vin: 'Prova: Petit Fangar', prisklass: '💰💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Vidalet+Llubi+Mallorca' },
  { namn: 'Son Prim', plats: 'Sencelles', info: 'Fokus på inhemska druvor', vin: 'Prova: Son Prim Merlot', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
  { namn: 'Celler Tianna Negre', plats: 'Binissalem', info: 'Modern och innovativ', vin: 'Prova: Ses Nines Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
  { namn: 'Son Sureda Rica', plats: 'Manacor', info: 'Liten och exklusiv', vin: 'Prova: Son Sureda Blanc', prisklass: '💰💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Sureda+Rica+Manacor+Mallorca' },
  { namn: 'Bodega Can Coleto', plats: 'Llucmajor', info: 'Familjegods med fantastisk utsikt', vin: 'Prova: Can Coleto Negre', prisklass: '💰💰', öppet: 'Mån–Lör 10–17', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Llucmajor+Mallorca' },
  { namn: 'Vins Nadal', plats: 'Binissalem', info: 'Traditionell familjevingård sedan 1944', vin: 'Prova: Nadal Rosat', prisklass: '💰', öppet: 'Mån–Lör 9–18', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
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
  { namn: 'Restaurante Jardin', plats: "Port d'Alcúdia", info: 'Havsutsikt och dagsfärsk fisk i Port d\'Alcúdia', kategori: 'Fisk', prisklass: '💰💰💰', öppet: 'Dagligen 12–23', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Restaurante+Jardin+Port+Alcudia+Mallorca' },
  { namn: 'Stay', plats: "Port d'Andratx", info: 'Exklusiv restaurang med utsikt över Port d\'Andratx vackra marina', kategori: 'Utsikt', prisklass: '💰💰💰💰', öppet: 'Dagligen 13–16, 19–23', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+Andratx+Mallorca' },
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
  const kort = { background: '#FDF8F2', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease' } as React.CSSProperties;
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '20px' } as React.CSSProperties;
  const knapp = { display: 'inline-block', marginTop: '12px', padding: '6px 14px', background: '#F59E0B', color: '#1F2937', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 'bold' } as React.CSSProperties;
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '40px' }}>Mat & Vin på Mallorca</h1>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '24px', color: '#0E7490' }}>🍷 Bästa vingårdarna</h2>
        <div style={grid}>
          {vingårdar.map((v, i) => (
            <div key={i} style={kort}>
              <img src={v.bild} alt={v.namn} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#0E7490', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i + 1}</span>
                  <span>{v.prisklass}</span>
                </div>
                <h3 style={{ fontFamily: 'serif', margin: '0 0 2px' }}>{v.namn}</h3>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '6px' }}>📍 {v.plats} · ⏰ {v.öppet}</div>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 4px' }}>{v.info}</p>
                <p style={{ fontSize: '0.85rem', color: '#7a4f2e', fontStyle: 'italic', margin: '0 0 8px' }}>🍾 {v.vin}</p>
                <a href={v.maps} target="_blank" rel="noopener noreferrer" style={knapp}>Visa på karta</a>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '60px 0 16px', color: '#0E7490' }}>🍽️ Topp 30 restauranger</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {kategorier.map(k => (
            <button key={k} onClick={() => setFilter(k)} style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid #0E7490', background: filter === k ? '#0E7490' : '#FDF8F2', color: filter === k ? 'white' : '#0E7490', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
              {k}
            </button>
          ))}
        </div>
        <div style={grid}>
          {filtreradeLista.map((r, i) => (
            <div key={i} style={kort}>
              <img src={r.bild} alt={r.namn} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ background: '#0E7490', color: 'white', borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold' }}>{r.kategori}</span>
                  <span>{r.prisklass}</span>
                </div>
                <h3 style={{ fontFamily: 'serif', margin: '8px 0 2px' }}>{r.namn}</h3>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '6px' }}>📍 {r.plats} · ⏰ {r.öppet}</div>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 8px' }}>{r.info}</p>
                <a href={r.maps} target="_blank" rel="noopener noreferrer" style={knapp}>Visa på karta</a>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '60px 0 16px', color: '#0E7490' }}>🗺️ Utforska Mallorca</h2>
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          <img src="https://www.openstreetmap.org/export/map.png?bbox=2.2,39.2,3.5,40.0&layer=mapnik" alt="Karta över Mallorca" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
}