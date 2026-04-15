import { IconStar, IconBuilding, IconPin } from '@/components/Icons';

export default function Felanitx() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>ÖSTRA MALLORCA · KERAMIK &amp; MARKNAD</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Felanitx</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Autentisk inlandsstad känd för sin fina keramik, lokala viner och livlig söndagsmarknad</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Felanitx</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Felanitx är en autentisk inland-stad känd för sin fina keramik, lokala viner och en livlig söndagsmarknad. Nära Cala d&apos;Or och Portocolom – ett perfekt mellanstopp på en dag längs östkusten.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Uppe på Puig de Sant Salvador (509 m) finns ett kloster med fantastisk utsikt över hela östra Mallorca – ett besök värt att planera in. Nere i staden präglas torget av den imponerande kyrkan Sant Miquel.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Grytes tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Söndagsmarknaden startar tidigt – bäst läge är vid öppning kl 08</li>
              <li>Köp lokal keramik direkt från hantverkarna, priserna är rimliga</li>
              <li>Kör upp till Castell de Santueri för fantastisk panoramautsikt</li>
              <li>Kombinera med Portocolom (20 min) för en hel dagsutflykt</li>
            </ul>
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>Höjdpunkter</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconStar size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Söndagsmarknaden med lokal keramik</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconBuilding size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Castell de Santueri med panoramautsikt</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconPin size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Lokalt vin från Felanitx-vingårdarna</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Östra Mallorca, 46 km från Palma<br/>
                <strong>Bil:</strong> Ca 45 min från Palma<br/>
                <strong>Marknad:</strong> Söndag<br/>
                <strong>Känd för:</strong> Keramik, vin, medeltida borg<br/>
                <strong>Stränder nearby:</strong> Cala d&apos;Or, Portocolom
              </p>
            </div>
            <a href="https://maps.google.com/?q=Felanitx+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
