import Link from 'next/link';

export default function AktiviteterPage() {
  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{
        background: '#111',
        color: 'white',
        padding: '80px 60px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '12px' }}>
            Mallorca
          </p>
          <h1 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>
            Aktiviteter
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#aaa', marginTop: '16px', maxWidth: '600px' }}>
            Mallorca erbjuder aktiviteter för alla – golf, vandring, vattensport och mycket mer
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 60px' }}>

        <a href="/aktiviteter/golf" style={{ display: 'block', textDecoration: 'none', marginBottom: '32px' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '200px', cursor: 'pointer' }}>
            <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=90" alt="Golf på Mallorca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1))', display: 'flex', alignItems: 'center', padding: '40px' }}>
              <div style={{ color: 'white' }}>
                <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>Aktivitet</p>
                <h2 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', margin: '0 0 8px' }}>Golf på Mallorca</h2>
                <p style={{ opacity: 0.9, fontSize: '1rem', margin: 0 }}>8 utvalda banor – från nybörjare till europeisk toppklass →</p>
              </div>
            </div>
          </div>
        </a>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '16px' }}>
          {[
            { titel: 'Vandring', ikon: '🥾', text: 'Serra de Tramuntana erbjuder vandringsleder för alla nivåer med fantastiska vyer.', href: '/aktiviteter#vandring', bild: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
            { titel: 'Vattensport', ikon: '🤿', text: 'Dykning, snorkling, kayak och segling längs Mallorcas kristallklara kust.', href: '/aktiviteter#vattensport', bild: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
            { titel: 'Cykling', ikon: '🚴', text: 'Mallorca är ett paradis för cyklister – från kustvägar till utmanande bergspass.', href: '/aktiviteter#cykling', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
            { titel: 'Barn på Mallorca', ikon: '👨‍👩‍👧', text: 'Vattenparker, lekplatser och barnvänliga stränder för en perfekt familjesemester.', href: '/barn', bild: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80' },
          ].map((a) => (
            <a key={a.titel} href={a.href} style={{ textDecoration: 'none', display: 'block', background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ height: '180px', backgroundImage: `url(${a.bild})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{a.ikon}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 8px', color: '#111' }}>{a.titel}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>{a.text}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '60px', background: '#111', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Planera dina aktiviteter
          </h2>
          <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 28px' }}>
            Vill du ha hjälp att planera och boka aktiviteter på Mallorca?
          </p>
          <Link href="/kontakt" style={{ display: 'inline-block', padding: '14px 40px', background: '#c0392b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Planera min resa →
          </Link>
        </div>
      </div>
    </div>
  );
}
