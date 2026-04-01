import Link from 'next/link';

const städer = [
  { namn: 'Palma de Mallorca', href: '/palma-de-mallorca', region: 'Sydväst', beskrivning: 'Öns pulserande huvudstad med La Seu-katedralen, gamla stan och livlig restaurangscen', bild: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80', tips: 'Bästa utsikten från Bellver slott' },
  { namn: 'Sóller', href: '/soller', region: 'Nordväst', beskrivning: 'Bergsby omgiven av apelsinlundar med historisk spårvagn ner till havet', bild: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80', tips: 'Ta spårvagnen till Port de Sóller' },
  { namn: 'Porto Colom', href: '/porto-colom', region: 'Öst', beskrivning: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tips: 'Fiskarna säljer direkt från båten på morgonen' },
  { namn: 'Santanyi', href: '/santanyi', region: 'Syd', beskrivning: 'Charmig marknadsby känd för onsdagsmarknaden och närheten till Cala Llombards', bild: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', tips: 'Onsdagsmarknaden är bättre än lördagen' },
  { namn: 'Porto Petro', href: '/porto-petro', region: 'Syd', beskrivning: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', tips: 'Perfekt för kvällspromenad längs hamnen' },
  { namn: 'Alcúdia', href: '/byar', region: 'Norr', beskrivning: 'Historisk kuststad med välbevarade medeltida murar och romarteater', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', tips: 'Besök den romerska teatern och gamla stan' },
  { namn: 'Valldemossa', href: '/sevardheter', region: 'Nordväst', beskrivning: 'UNESCO-skyddad bergsby känt för Chopin och George Sands vistelse', bild: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80', tips: 'Besök kartusianerklostret tidigt på morgonen' },
  { namn: 'Deià', href: '/byar', region: 'Nordväst', beskrivning: 'Konstnärsby i Tramuntana-bergen med bohemisk atmosfär och havsutsikt', bild: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=600&q=80', tips: 'Robert Graves museum är ett måste' },
  { namn: 'Pollença', href: '/byar', region: 'Norr', beskrivning: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari', bild: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80', tips: 'Klättra upp till Calvari för fantastisk utsikt' },
  { namn: 'Sineu', href: '/byar', region: 'Inland', beskrivning: 'Mallorcas geografiska hjärta med öns äldsta marknad sedan 1306', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', tips: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen' },
  { namn: 'Artà', href: '/byar', region: 'Öst', beskrivning: 'Historisk bergsstad med imponerande borg och vackra gränder', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80', tips: 'Besök borgen Santuari de Sant Salvador' },
  { namn: 'Felanitx', href: '/byar', region: 'Öst', beskrivning: 'Traditionell stad känd för keramik, vin och söndagsmarknad', bild: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', tips: 'Köp lokal keramik direkt från hantverkarna' },
  { namn: 'Manacor', href: '/byar', region: 'Öst', beskrivning: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal', bild: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80', tips: 'Besök en pärlafabrik och se hur de tillverkas' },
  { namn: 'Inca', href: '/byar', region: 'Inland', beskrivning: 'Läderstaden med berömd torsdagsmarknad och källarviner', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80', tips: 'November – kom på den stora lädermässan' },
  { namn: 'Binissalem', href: '/byar', region: 'Inland', beskrivning: 'Mallorcas vinbygd med vingårdar och vinmarknad i oktober', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', tips: 'Besök José L. Ferrer – öns äldsta vingård' },
  { namn: 'Andratx', href: '/byar', region: 'Sydväst', beskrivning: 'Lugn stadskärna i sydväst nära Port d\'Andratx med fin marina', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', tips: 'Port d Andratx har öns snyggaste marina' },
  { namn: 'Campos', href: '/byar', region: 'Syd', beskrivning: 'Lantlig stad nära Es Trenc känd för salt, kapers och lördagsmarknad', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tips: 'Perfekt stopp på väg till Es Trenc' },
  { namn: 'Llucmajor', href: '/byar', region: 'Syd', beskrivning: 'Historisk stad med medeltida rötter och vackert torg', bild: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80', tips: 'Prova den lokala ensaimadan på torgets café' },
];

export default function ByadSida() {
  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '50vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '60px 80px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Utforska Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Städer och Byar</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>{städer.length} utvalda destinationer runt hela ön</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {städer.map((stad, i) => (
            <Link key={i} href={stad.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={stad.bild} alt={stad.namn} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                    {stad.region}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.05em', margin: '0 0 8px', color: '#111' }}>{stad.namn}</h2>
                  <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{stad.beskrivning}</p>
                  <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#444' }}>
                    💡 {stad.tips}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
