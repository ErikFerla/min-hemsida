export default function MatPage() {
  const vingårdar = [
    { namn: 'Bodega Binigrau', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner' },
    { namn: 'José L. Ferrer', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård' },
    { namn: 'Bodega Ribas', plats: 'Consell', info: 'Familjedriven vingård sedan 1711' },
    { namn: 'Ànima Negra', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner' },
    { namn: 'Can Majoral', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar' },
    { namn: 'Vinya Taujana', plats: 'Santa Eugènia', info: 'Liten boutique-vingård' },
    { namn: 'Miquel Gelabert', plats: 'Manacor', info: 'Prisbelönt hantverksvingård' },
    { namn: 'Son Bordils', plats: 'Inca', info: 'Vackert gods med ekologisk produktion' },
    { namn: 'Bodegas Macià Batle', plats: 'Santa Maria', info: 'En av öns största producenter' },
    { namn: 'Can Vidalet', plats: 'Llubí', info: 'Ekologisk, internationellt prisad' },
    { namn: 'Son Prim', plats: 'Sencelles', info: 'Fokus på inhemska druvor' },
    { namn: 'Celler Tianna Negre', plats: 'Binissalem', info: 'Modern och innovativ' },
    { namn: 'Son Sureda Rica', plats: 'Manacor', info: 'Liten och exklusiv' },
    { namn: 'Bodega Can Coleto', plats: 'Llucmajor', info: 'Familjegods med fantastisk utsikt' },
    { namn: 'Vins Nadal', plats: 'Binissalem', info: 'Traditionell familjevingård sedan 1944' },
  ];
  const restauranger = [
    { namn: 'Marc Fosh', plats: 'Palma', info: 'Michelinstjärna, modern medelhavsmat' },
    { namn: 'Zaranda', plats: 'Llucmajor', info: 'Två Michelinstjärnor, haute cuisine' },
    { namn: 'Adrián Quetglas', plats: 'Palma', info: 'Michelinstjärna, kreativ fusion' },
    { namn: 'Es Fum', plats: "Costa d'en Blanes", info: 'Michelinstjärna, panoramautsikt' },
    { namn: 'Andreu Genestra', plats: 'Capdepera', info: 'Michelinstjärna, lokal råvara' },
    { namn: "Béns d'Avall", plats: 'Deià', info: 'Ikonisk klippterrass, mallorquinsk mat' },
    { namn: 'Simply Fosh', plats: 'Palma', info: 'Bistro av Marc Fosh' },
    { namn: 'El Camino', plats: 'Palma', info: 'Trendig tapasbar' },
    { namn: 'La Vieja', plats: 'Palma', info: 'Modern mallorquinsk mat' },
    { namn: 'Aramis', plats: 'Palma', info: 'Elegant och klassisk' },
    { namn: 'Restaurante Jardin', plats: "Port d'Alcúdia", info: 'Havsutsikt och färsk fisk' },
    { namn: 'Stay', plats: "Port d'Andratx", info: 'Exklusiv med vacker marinavy' },
    { namn: "Es Racó d'es Teix", plats: 'Deià', info: 'Michelinstjärna i bergsby' },
    { namn: 'Celler Sa Premsa', plats: 'Palma', info: 'Traditionell mallorquinsk husmanskost' },
    { namn: 'La Bodeguita', plats: 'Palma', info: 'Viner och tapas' },
    { namn: 'Arrosseria Santi Taura', plats: 'Lloseta', info: 'Mästare på arroz' },
    { namn: 'Toque de Queda', plats: 'Palma', info: 'Intim och personlig' },
    { namn: 'Misa Brasería', plats: 'Palma', info: 'Grill och cocktails' },
    { namn: 'Caballito de Mar', plats: 'Palma', info: 'Havsfisk vid kajen' },
    { namn: 'Patron Lunares', plats: 'Port de Pollença', info: 'Färsk fisk och skaldjur' },
    { namn: 'Cala Deia', plats: 'Deià', info: 'Badklippa med restaurang' },
    { namn: 'Ca Na Toneta', plats: 'Caimari', info: 'Ekologisk mallorquinsk hemlagning' },
    { namn: 'Argento', plats: 'Palma', info: 'Prisbelönt italiensk' },
    { namn: 'Duke', plats: 'Palma', info: 'Modern europeisk mat' },
    { namn: 'La Residencia', plats: 'Deià', info: 'Lyxhotells ikoniska restaurang' },
    { namn: "Es Molí d'en Bou", plats: 'Sant Llorenç', info: 'Michelinstjärna på landsbygden' },
    { namn: 'Monnaber Nou', plats: 'Campanet', info: 'Lantlig gård med fantastisk mat' },
    { namn: 'Miceli', plats: 'Selva', info: 'Hemlagat med trädgårdens råvaror' },
    { namn: 'Sa Pleta Freda', plats: 'Sineu', info: 'Traditionell och mysig' },
    { namn: 'Es Verger', plats: 'Alaró', info: 'Lamm i ugn med bergsutsikt' },
  ];
  const kort = { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' };
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' };
  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '40px' }}>Mat & Vin på Mallorca</h1>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginBottom: '24px', color: '#c0392b' }}>Bästa vingårdarna</h2>
        <div style={grid}>{vingårdar.map((v, i) => <div key={i} style={kort}><div style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i+1}</div><h3 style={{ fontFamily: 'serif', margin: '4px 0' }}>{v.namn}</h3><div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>{v.plats}</div><p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{v.info}</p></div>)}</div>
        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '60px 0 24px', color: '#c0392b' }}>Topp 30 restauranger</h2>
        <div style={grid}>{restauranger.map((r, i) => <div key={i} style={kort}><div style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i+1}</div><h3 style={{ fontFamily: 'serif', margin: '4px 0' }}>{r.namn}</h3><div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>{r.plats}</div><p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{r.info}</p></div>)}</div>
      </div>
    </div>
  );
}
