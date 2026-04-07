'use client';
import Link from 'next/link';
import Image from 'next/image';
import AffiliateCard from '@/app/components/AffiliateCard';

const aktiviteter = [
  {
    titel: 'Golf på Mallorca',
    beskrivning: 'Mallorca har 22 golfbanor i världsklass – från nybörjarvänliga till europeisk toppklass med fantastisk havsutsikt.',
    emoji: '⛳',
    href: '/aktiviteter/golf',
    bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    highlights: ['22 golfbanor', 'Alla nivåer', 'Havsutsikt'],
  },
  {
    titel: 'Vandring i Tramuntana',
    beskrivning: 'Serra de Tramuntana är ett UNESCO-världsarv med spektakulära vandringsleder genom olivlundar och bergsdalar.',
    emoji: '🥾',
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    highlights: ['UNESCO-världsarv', 'GR-221 leden', 'Alla svårigheter'],
  },
  {
    titel: 'Vattensport',
    beskrivning: 'Kristallklart vatten och perfekta vindförhållanden gör Mallorca till ett paradis för segling, kajakpaddling och snorkling.',
    emoji: '🤿',
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80',
    highlights: ['Segling', 'Kajakpaddling', 'Snorkling'],
  },
  {
    titel: 'Barn & Familj',
    beskrivning: 'Vattenparker, djurparker, grottor och äventyr – Mallorca är ett av Europas bästa resmål för barnfamiljer.',
    emoji: '👨‍👩‍👧',
    href: '/barn',
    bild: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80',
    highlights: ['Vattenparker', 'Djurparker', 'Grottor'],
  },
  {
    titel: 'Cykling',
    beskrivning: 'Mallorca är cyklisternas mekka – professionella lag tränar här på vintern. Välj mellan bergsetapper och kustvägar.',
    emoji: '🚴',
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    highlights: ['Mallorca 312', 'Tramuntana', 'Cykeluthyrning'],
  },
  {
    titel: 'Båtliv & Segling',
    beskrivning: 'Utforska Mallorcas dramatiska kustlinje från havet – charter, guidade båtturer och glassbottenbåtar.',
    emoji: '⛵',
    href: '/aktiviteter',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    highlights: ['Båtcharter', 'Guidade turer', 'Glassbottenbåt'],
  },
];

export default function AktiviteterPage() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        position: 'relative', height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.8 }}>Upplev Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: '1' }}>Aktiviteter på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginTop: '16px', lineHeight: '1.6', opacity: 0.85 }}>Golf, vandring, vattensport och mycket mer – för alla smaker</p>
        </div>
      </div>

      {/* Innehåll */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px,4vw,60px) clamp(16px,4vw,60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px,100%), 1fr))', gap: '24px' }}>
          {aktiviteter.map((a, i) => (
            <Link key={i} href={a.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer', height: '100%',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}
              >
                <Image src={a.bild} alt={a.titel} width={600} height={200} style={{ width: '100%', height: '200px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{a.emoji}</div>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.05em', margin: '0 0 10px', lineHeight: '1.15', color: '#1F2937' }}>{a.titel}</h2>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.7', margin: '0 0 16px' }}>{a.beskrivning}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {a.highlights.map((h, j) => (
                      <span key={j} style={{ background: '#F0EBE3', color: '#0E7490', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: 'inline-block', padding: '10px 24px', background: '#F59E0B', color: '#1F2937', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem' }}>
                    Utforska →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #ede5da' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0E7490', fontWeight: '600', marginBottom: '8px' }}>BOKA DIREKT</p>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '32px', color: '#1F2937' }}>Populära upplevelser just nu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: '20px' }}>
            <AffiliateCard
              typ="aktivitet"
              titel="Helikoptertur över Mallorca"
              beskrivning="Se hela ön från ovan. 30 minuters privat rundflygning med plats för 3 personer."
              pris="från 2 450 kr/pers"
              betyg={4.9}
              badge="⭐ Premiumupplevelse"
              länk="https://www.getyourguide.com/mallorca-l234/helicopter-tours-tc253/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=75"
            />
            <AffiliateCard
              typ="aktivitet"
              titel="Vandring i Tramuntana med guide"
              beskrivning="Lokal guide tar dig på GR-221 med lunch och transport inkluderat."
              pris="från 895 kr"
              betyg={4.8}
              länk="https://www.getyourguide.com/mallorca-l234/hiking-tc133/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=75"
            />
            <AffiliateCard
              typ="aktivitet"
              titel="Båttur till okända vikar"
              beskrivning="Heldagstur med liten grupp (max 12 pers). Lunch, snorkling och frisvimmning ingår."
              pris="från 1 195 kr"
              betyg={4.9}
              badge="Slutsåld senaste veckan"
              länk="https://www.getyourguide.com/mallorca-l234/boat-tours-tc55/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
