import { IconStar, IconBuilding, IconPin } from '@/components/Icons';

export default function Arta() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Östra Mallorca · Levant</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Artà</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Historisk bergsstad med imponerande medeltida borg och vackra stensatta gränder</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Artà</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Artà domineras av Santuari de Sant Salvador – ett fort och kloster högt uppe på kullen som vaktat staden i generationer. Promenaden uppför de gamla trapporna ger en magnifik panoramautsikt över hela östra Mallorca och havet bortom. Byn nedan är ett mysigt virrvarr av stensatta gränder och pittoreska torg.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>I närheten ligger Coves d&apos;Artà – en av öns mest imponerande grottor med enorma stalaktiter och stalagmiter. Tisdagsmarknaden lockar lokalbefolkning från hela regionen och är ett av de bästa tillfällena att uppleva äkta mallorcansk livsstil.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Grytes tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Borgen Santuari de Sant Salvador – fri entré och fantastisk utsikt</li>
              <li>Tisdagsmarknaden är en av öns mest autentiska – kom på förmiddagen</li>
              <li>Coves d&apos;Artà ligger 15 min bort – kombinera gärna besöken</li>
              <li>Restaurangerna runt torget serverar klassisk mallorquinska – prova frit mallorquí</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Artà</h2>
              {[
                { Icon: IconStar, text: 'Santuari de Sant Salvador – medeltida borg med panoramautsikt, fri entré' },
                { Icon: IconBuilding, text: "Coves d'Artà – en av öns vackraste grottor, kort biltur från byn" },
                { Icon: IconPin, text: 'Tisdagsmarknaden – autentisk och lokal, en av öns bästa' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 2 ? '1px solid #ede5da' : 'none' }}>
                  <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><item.Icon size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Öst, 80 km från Palma<br/>
                <strong>Bil:</strong> Ca 60 min från Palma<br/>
                <strong>Marknad:</strong> Tisdagar<br/>
                <strong>Coves d&apos;Artà:</strong> 15 min med bil<br/>
                <strong>Borgen:</strong> Fri entré, öppen dagligen
              </p>
            </div>
            <a href="https://maps.google.com/?q=Arta+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
