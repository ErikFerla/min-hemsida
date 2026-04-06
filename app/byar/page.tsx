'use client';
import Link from 'next/link';

const städer = [
  { namn: 'Palma de Mallorca', href: '/stad/palma-de-mallorca', region: 'Sydväst', beskrivning: 'Öns pulserande huvudstad med La Seu-katedralen, gamla stan och livlig restaurangscen', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', tips: 'Bästa utsikten från Bellver slott', top3: ['La Seu-katedralen', 'Gamla stan (Casc Antic)', 'Bellver Slott'] },
  { namn: 'Sóller', href: '/stad/soller', region: 'Nordväst', beskrivning: 'Bergsby omgiven av apelsinlundar med historisk spårvagn ner till havet', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tips: 'Ta spårvagnen till Port de Sóller', top3: ['Historiska spårvagnen', 'Apelsinlundarna', 'Firó-festivalen i maj'] },
  { namn: 'Porto Colom', href: '/stad/porto-colom', region: 'Öst', beskrivning: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tips: 'Fiskarna säljer direkt från båten på morgonen', top3: ['Naturhamnen', 'Färska fisken på morgonen', 'Kvällspromenaden längs vattnet'] },
  { namn: 'Santanyi', href: '/stad/santanyi', region: 'Syd', beskrivning: 'Charmig marknadsby känd för onsdagsmarknaden och närheten till Cala Llombards', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', tips: 'Onsdagsmarknaden är bättre än lördagen', top3: ['Onsdagsmarknaden', 'Cala Llombards (5 min)', 'Gallerierna i gamla stan'] },
  { namn: 'Porto Petro', href: '/stad/porto-petro', region: 'Syd', beskrivning: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', tips: 'Perfekt för kvällspromenad längs hamnen', top3: ['Marinan med lyxbåtar', 'Kvällspromenaden', 'Cala Mondragó (10 min)'] },
  { namn: 'Alcúdia', href: '/stad/alcudia', beskrivning: 'Historisk kuststad med välbevarade medeltida murar och romarteater', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', tips: 'Besök den romerska teatern och gamla stan', top3: ['Medeltida stadsmurarna', 'Romerska teatern Pollentia', 'Playa de Muro (5 min)'] },
  { namn: 'Valldemossa', href: '/stad/valldemossa', region: 'Nordväst', beskrivning: 'UNESCO-skyddad bergsby känt för Chopin och George Sands vistelse', bild: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80', tips: 'Besök kartusianerklostret tidigt på morgonen', top3: ['Kartusianerklostret', 'Chopins pianosalong', 'Utsikten från byplatsen'] },
  { namn: 'Deià', href: '/stad/deia', beskrivning: 'Konstnärsby i Tramuntana-bergen med bohemisk atmosfär och havsutsikt', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tips: 'Robert Graves museum är ett måste', top3: ['Robert Graves museum', 'Cala Deià (bad)', 'Utsikten från kyrkan'] },
  { namn: 'Artà', href: '/stad/arta', med imponerande borg och vackra gränder', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', tips: 'Besök borgen Santuari de Sant Salvador', top3: ["Santuari de Sant Salvador", "Coves d'Artà (nära)", 'Tisdagsmarknaden'] },
  { namn: 'Andratx', href: '/stad/andratx', beskrivning: "Lugn stadskärna i sydväst nära Port d'Andratx med fin marina", bild: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80', tips: "Port d'Andratx har öns snyggaste marina", top3: ["Port d'Andratx marina", 'Camp de Mar-stranden', 'Centre Cultural Andratx'] },
  { namn: 'Pollença', href: '/stad/pollenca', beskrivning: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', tips: 'Klättra upp till Calvari för fantastisk utsikt', top3: ['365 trappsteg till Calvari', 'Söndagsmarknaden', 'Jazz-festivalen i juli'] },
  { namn: 'Sineu', href: '/stad/sineu', hjärta med öns äldsta marknad sedan 1306', bild: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80', tips: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen', top3: ['Onsdagsmarknaden (sedan 1306)', 'Sa Placa-torget', 'Kyrkan Mare de Déu dels Àngels'] },
  { namn: 'Felanitx', href: '/stad/felanitx', beskrivning: 'Traditionell stad känd för keramik, vin och söndagsmarknad', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tips: 'Köp lokal keramik direkt från hantverkarna', top3: ['Lokal keramik & hantverk', 'Söndagsmarknaden', 'Castell de Santueri (nära)'] },
  { namn: 'Manacor', href: '/stad/manacor', beskrivning: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', tips: 'Besök en pärlafabrik och se hur de tillverkas', top3: ['Majórica pärlafabrik', 'Rafa Nadal Academy', 'Måndagsmarknaden'] },
  { namn: 'Inca', href: '/stad/inca', beskrivning: 'Läderstaden med berömd torsdagsmarknad och källarviner', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', tips: 'November – kom på den stora lädermässan', top3: ['Torsdagsmarknaden', 'Läderskor & väskor till rea', 'Cellers (källarrestauranger)'] },
  { namn: 'Capdepera', href: '/stad/capdepera', och pittoresk by i nordöst med panoramautsikt över havet', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', tips: 'Besök Castell de Capdepera i solnedgången', top3: ['Castell de Capdepera', 'Cala Rajada (nära)', 'Utsikten vid solnedgång'] },
  { namn: 'Port de Sóller', href: '/stad/port-de-soller', beskrivning: 'Charmig hamnby med en av Mallorcas vackraste vikar, nådd med historisk spårvagn', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tips: 'Ta den historiska spårvagnen från Sóller', top3: ['Spårvagnsresan från Sóller', 'Solnedgången vid hamnen', 'Snorkling i viken'] },
  { namn: 'Campos', href: '/stad/campos', beskrivning: 'Lantlig stad nära Es Trenc känd för salt, kapers och lördagsmarknad', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', tips: 'Perfekt stopp på väg till Es Trenc', top3: ['Es Trenc-stranden (10 min)', 'Saltpannorna Salines', 'Lördagsmarknaden'] },
];

export default function ByadSida() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(20px, 5vw, 60px) clamp(16px, 5vw, 80px)',
        marginBottom: 0
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.8 }}>Utforska Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: '1' }}>Städer och Byar</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginTop: '16px', lineHeight: '1.6', opacity: 0.85 }}>{städer.length} utvalda destinationer runt hela ön</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {städer.map((stad, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={stad.bild} alt={stad.namn} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#0E7490', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  {stad.region}
                </div>
              </div>
              <div style={{ padding: '22px' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', margin: '0 0 8px', lineHeight: '1.15', color: '#111' }}>{stad.namn}</h2>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.7', margin: '0 0 12px' }}>{stad.beskrivning}</p>
                <div style={{ margin: '12px 0' }}>
                  {stad.top3.map((sak, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', borderBottom: j < 2 ? '1px solid #f0ebe3' : 'none' }}>
                      <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>
                        {j === 0 ? '⭐' : j === 1 ? '🏛️' : '📍'}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#374151' }}>{sak}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#444', marginTop: '10px', marginBottom: '14px', lineHeight: '1.6' }}>
                  💡 {stad.tips}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stad.namn + ' Mallorca')}`} target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, textAlign: 'center', padding: '8px 12px', background: '#F59E0B', color: '#1F2937', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>
                    🗺️ Visa på karta
                  </a>
                  <Link href={stad.href}
                    style={{ flex: 1, textAlign: 'center', padding: '8px 12px', background: 'white', color: '#0E7490', border: '2px solid #0E7490', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>
                    Utforska →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
