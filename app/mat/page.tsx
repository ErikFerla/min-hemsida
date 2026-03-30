export default function MatPage() {
  const vingårdar = [
    { namn: 'Bodega Binigrau', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
    { namn: 'José L. Ferrer', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
    { namn: 'Bodega Ribas', plats: 'Consell', info: 'Familjedriven vingård sedan 1711', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
    { namn: 'Ànima Negra', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
    { namn: 'Can Majoral', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
    { namn: 'Vinya Taujana', plats: 'Santa Eugènia', info: 'Liten boutique-vingård', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
    { namn: 'Miquel Gelabert', plats: 'Manacor', info: 'Prisbelönt hantverksvingård', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
    { namn: 'Son Bordils', plats: 'Inca', info: 'Vackert gods med ekologisk produktion', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
    { namn: 'Bodegas Macià Batle', plats: 'Santa Maria', info: 'En av öns största producenter', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
    { namn: 'Can Vidalet', plats: 'Llubí', info: 'Ekologisk, internationellt prisad', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Vidalet+Llubi+Mallorca' },
    { namn: 'Son Prim', plats: 'Sencelles', info: 'Fokus på inhemska druvor', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
    { namn: 'Celler Tianna Negre', plats: 'Binissalem', info: 'Modern och innovativ', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
    { namn: 'Son Sureda Rica', plats: 'Manacor', info: 'Liten och exklusiv', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Sureda+Rica+Manacor+Mallorca' },
    { namn: 'Bodega Can Coleto', plats: 'Llucmajor', info: 'Familjegods med fantastisk utsikt', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Llucmajor+Mallorca' },
    { namn: 'Vins Nadal', plats: 'Binissalem', info: 'Traditionell familjevingård sedan 1944', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
  ];
  const restauranger = [
    { namn: 'Marc Fosh', plats: 'Palma', info: 'Michelinstjärna, modern medelhavsmat', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Marc+Fosh+Palma+Mallorca' },
    { namn: 'Zaranda', plats: 'Llucmajor', info: 'Två Michelinstjärnor, haute cuisine', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Zaranda+Mallorca' },
    { namn: 'Adrián Quetglas', plats: 'Palma', info: 'Michelinstjärna, kreativ fusion', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Adrian+Quetglas+Palma+Mallorca' },
    { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'Michelinstjärna, panoramautsikt', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Fum+Mallorca' },
    { namn: 'Andreu Genestra', plats: 'Capdepera', info: 'Michelinstjärna, lokal råvara', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Andreu+Genestra+Capdepera+Mallorca' },
    { namn: "Béns d'Avall", plats: 'Deià', info: 'Ikonisk klippterrass, mallorquinsk mat', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Bens+Avall+Deia+Mallorca' },
    { namn: 'Simply Fosh', plats: 'Palma', info: 'Bistro av Marc Fosh', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Simply+Fosh+Palma+Mallorca' },
    { namn: 'El Camino', plats: 'Palma', info: 'Trendig tapasbar', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=El+Camino+Palma+Mallorca' },
    { namn: 'La Vieja', plats: 'Palma', info: 'Modern mallorquinsk mat', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Vieja+Palma+Mallorca' },
    { namn: 'Aramis', plats: 'Palma', info: 'Elegant och klassisk', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Aramis+Palma+Mallorca' },
    { namn: 'Restaurante Jardin', plats: "Port d'Alcúdia", info: 'Havsutsikt och färsk fisk', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Restaurante+Jardin+Port+Alcudia+Mallorca' },
    { namn: 'Stay', plats: "Port d'Andratx", info: 'Exklusiv med vacker marinavy', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Stay+Restaurant+Port+Andratx+Mallorca' },
    { namn: "Es Racó d'es Teix", plats: 'Deià', info: 'Michelinstjärna i bergsby', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Raco+des+Teix+Deia+Mallorca' },
    { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Traditionell mallorquinsk husmanskost', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Sa+Premsa+Palma+Mallorca' },
    { namn: 'La Bodeguita', plats: 'Palma', info: 'Viner och tapas', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=La+Bodeguita+Palma+Mallorca' },
    { namn: 'Arrosseria Santi Taura', plats: 'Lloseta', info: 'Mästare på arroz', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Arrosseria+Santi+Taura+Lloseta+Mallorca' },
    { namn: 'Toque de Queda', plats: 'Palma', info: 'Intim och personlig', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Toque+de+Queda+Palma+Mallorca' },
    { namn: 'Misa Brasería', plats: 'Palma', info: 'Grill och cocktails', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Misa+Braseria+Palma+Mallorca' },
    { namn: 'Caballito de Mar', plats: 'Palma', info: 'Havsfisk vid kajen', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Caballito+de+Mar+Palma+Mallorca' },
    { namn: 'Patron Lunares', plats: 'Port de Pollença', info: 'Färsk fisk och skaldjur', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Patron+Lunares+Port+Pollenca+Mallorca' },
    { namn: 'Cala Deia', plats: 'Deià', info: 'Badklippa med restaurang', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Cala+Deia+Restaurant+Mallorca' },
    { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Ekologisk mallorquinsk hemlagning', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Ca+Na+Toneta+Caimari+Mallorca' },
    { namn: 'Argento', plats: 'Palma', info: 'Prisbelönt italiensk', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Argento+Palma+Mallorca' },
    { namn: 'Duke', plats: 'Palma', info: 'Modern europeisk mat', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Duke+Restaurant+Palma+Mallorca' },
    { namn: 'La Residencia', plats: 'Deià', info: 'Lyxhotells ikoniska restaurang', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=La+Residencia+Deia+Mallorca' },
    { namn: "Es Molí d'en Bou", plats: 'Sant Llorenç', info: 'Michelinstjärna på landsbygden', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Moli+den+Bou+Sant+Llorenc+Mallorca' },
    { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Lantlig gård med fantastisk mat', bild: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', maps: 'https://maps.google.com/?q=Monnaber+Nou+Campanet+Mallorca' },
    { namn: 'Miceli', plats: 'Selva', info: 'Hemlagat med trädgårdens råvaror', bild: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', maps: 'https://maps.google.com/?q=Miceli+Selva+Mallorca' },
    { namn: 'Sa Pleta Freda', plats: 'Sineu', info: 'Traditionell och mysig', bild: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', maps: 'https://maps.google.com/?q=Sa+Pleta+Freda+Sineu+Mallorca' },
    { namn: 'Es Verger', plats: 'Alaró', info: 'Lamm i ugn med bergsutsikt', bild: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', maps: 'https://maps.google.com/?q=Es+Verger+Alaro+Mallorca' },
  ];
  const kort = { background: 'white', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' } as React.CSSProperties;
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' } as React.CSSProperties;
  const knapp = { display: 'inline-block', marginTop: '12px', padding: '6px 14px', background: '#c0392b', color: 'white', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 'bold' } as React.CSSProperties;
  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '40px' }}>Mat & Vin på Mallorca</h1>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '24px', color: '#c0392b' }}>Bästa vingårdarna</h2>
        <div style={grid}>{vingårdar.map((v, i) => (<div key={i} style={kort}><img src={v.bild} alt={v.namn} style={{ width: '100%', height: '180px', objectFit: 'cover' }} /><div style={{ padding: '16px' }}><div style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i+1}</div><h3 style={{ fontFamily: 'serif', margin: '4px 0' }}>{v.namn}</h3><div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>{v.plats}</div><p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 8px' }}>{v.info}</p><a href={v.maps} target="_blank" rel="noopener noreferrer" style={knapp}>Visa på karta</a></div></div>))}</div>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '60px 0 24px', color: '#c0392b' }}>Topp 30 restauranger</h2>
        <div style={grid}>{restauranger.map((r, i) => (<div key={i} style={kort}><img src={r.bild} alt={r.namn} style={{ width: '100%', height: '180px', objectFit: 'cover' }} /><div style={{ padding: '16px' }}><div style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i+1}</div><h3 style={{ fontFamily: 'serif', margin: '4px 0' }}>{r.namn}</h3><div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>{r.plats}</div><p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 8px' }}>{r.info}</p><a href={r.maps} target="_blank" rel="noopener noreferrer" style={knapp}>Visa på karta</a></div></div>))}</div>
      </div>
    </div>
  );
}
