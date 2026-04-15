import Image from 'next/image';

const vingårdar = [
  { namn: 'Bodega Binigrau', web: 'https://www.binigrau.es', plats: 'Binissalem', info: 'Känd för sina Prensal Blanc-viner', vin: 'Prova: Binigrau Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', web: 'https://www.vinosferrer.com', plats: 'Binissalem', info: 'Mallorcas äldsta och mest välkända vingård', vin: 'Prova: Veritas Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', web: 'https://www.bodegasribas.com', plats: 'Consell', info: 'Familjedriven vingård sedan 1711', vin: 'Prova: Ribas de Cabrera', prisklass: '💰💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', web: 'https://www.animanegra.com', plats: 'Felanitx', info: 'Producerar öns mest hyllade rödviner', vin: 'Prova: ÀN/2', prisklass: '💰💰💰', öppet: 'Endast med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', web: 'https://www.canmajoral.com', plats: 'Algaida', info: 'Ekologisk vingård med unik terroar', vin: 'Prova: Entel', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', web: 'https://www.vinyataujana.com', plats: 'Santa Eugènia', info: 'Liten boutique-vingård', vin: 'Prova: Taujana Rosat', prisklass: '💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
  { namn: 'Miquel Gelabert', web: 'https://www.miquelgelabert.com', plats: 'Manacor', info: 'Prisbelönt hantverksvingård', vin: 'Prova: Torrent Negre', prisklass: '💰💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
  { namn: 'Son Bordils', web: 'https://www.sonbordils.es', plats: 'Inca', info: 'Vackert gods med ekologisk produktion', vin: 'Prova: Son Bordils Blanc', prisklass: '💰💰', öppet: 'Mån–Fre 9–17', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
  { namn: 'Bodegas Macià Batle', web: 'https://www.maciabatle.com', plats: 'Santa Maria', info: 'En av öns största producenter', vin: 'Prova: Anni Blanc de Blancs', prisklass: '💰💰', öppet: 'Mån–Lör 9–19, Sön 10–14', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
  { namn: 'Can Vidalet', web: 'https://www.canvidalet.com', plats: 'Llubí', info: 'Ekologisk, internationellt prisad', vin: 'Prova: Petit Fangar', prisklass: '💰💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', maps: 'https://maps.google.com/?q=Can+Vidalet+Llubi+Mallorca' },
  { namn: 'Son Prim', web: 'https://www.sonprim.com', plats: 'Sencelles', info: 'Fokus på inhemska druvor', vin: 'Prova: Son Prim Merlot', prisklass: '💰💰', öppet: 'Mån–Fre 10–17', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
  { namn: 'Celler Tianna Negre', web: 'https://www.tiannanegre.com', plats: 'Binissalem', info: 'Modern och innovativ', vin: 'Prova: Ses Nines Blanc', prisklass: '💰💰', öppet: 'Mån–Lör 10–18', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=600&q=80', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
  { namn: 'Son Sureda Rica', web: 'https://www.sonsurecirica.com', plats: 'Manacor', info: 'Liten och exklusiv', vin: 'Prova: Son Sureda Blanc', prisklass: '💰💰💰', öppet: 'Med bokning', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Sureda+Rica+Manacor+Mallorca' },
  { namn: 'Bodega Can Coleto', web: 'https://www.cancoleto.com', plats: 'Llucmajor', info: 'Familjegods med fantastisk utsikt', vin: 'Prova: Can Coleto Negre', prisklass: '💰💰', öppet: 'Mån–Lör 10–17', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Llucmajor+Mallorca' },
  { namn: 'Vins Nadal', web: 'https://www.vinsnadal.com', plats: 'Binissalem', info: 'Traditionell familjevingård sedan 1944', vin: 'Prova: Nadal Rosat', prisklass: '💰', öppet: 'Mån–Lör 9–18', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
];

export const metadata = {
  title: 'Vingårdar på Mallorca – Guide till öns bästa bodegas',
  description: 'Upptäck Mallorcas 70+ vingårdar. Från familjedrivna bodegas till ekologiska producenter — här är de bästa att besöka.',
};

export default function VingardarPage() {
  const kort = { background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden' } as React.CSSProperties;
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '20px' } as React.CSSProperties;
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Mallorcas vinkultur</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Vingårdar på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.9rem,2.5vw,1.1rem)', marginTop: '12px', opacity: 0.9 }}>70+ bodegas – från anrika familjegods till ekologiska nykomlingar</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', marginTop: '0', marginBottom: '24px', color: '#0E7490' }}>Bästa vingårdarna att besöka</h2>
        <div style={grid}>
          {vingårdar.map((v, i) => (
            <div key={i} style={kort}>
              <Image src={v.bild} alt={v.namn} width={600} height={180} style={{ width: '100%', height: '180px', objectFit: 'cover' }} loading="lazy" />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#0E7490', fontWeight: 'bold', fontSize: '0.8rem' }}>#{i + 1}</span>
                  <span>{v.prisklass}</span>
                </div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', margin: '0 0 2px' }}>{v.namn}</h3>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '6px' }}>📍 {v.plats} · ⏰ {v.öppet}</div>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 4px' }}>{v.info}</p>
                <p style={{ fontSize: '0.85rem', color: '#0E7490', fontStyle: 'italic', margin: '0 0 8px' }}>{v.vin}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <a href={v.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '6px 14px', background: '#F59E0B', color: '#1F2937', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 'bold' }}>Visa på karta</a>
                  {v.web && (
                    <a href={v.web} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '6px 14px', background: 'white', color: '#0E7490', border: '2px solid #0E7490', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 'bold' }}>
                      Hemsida →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
