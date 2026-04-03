import Link from 'next/link';

const städer = [
  { namn: 'Palma de Mallorca', href: '/palma-de-mallorca', region: 'Sydväst', beskrivning: 'Öns pulserande huvudstad med La Seu-katedralen, gamla stan och livlig restaurangscen', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Palma_de_Mallorca_Cathedral_La_Seu.jpg/640px-Palma_de_Mallorca_Cathedral_La_Seu.jpg', tips: 'Bästa utsikten från Bellver slott' },
  { namn: 'Sóller', href: '/soller', region: 'Nordväst', beskrivning: 'Bergsby omgiven av apelsinlundar med historisk spårvagn ner till havet', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/S%C3%B3ller%2C_Mallorca%2C_Spain.JPG/640px-S%C3%B3ller%2C_Mallorca%2C_Spain.JPG', tips: 'Ta spårvagnen till Port de Sóller' },
  { namn: 'Porto Colom', href: '/porto-colom', region: 'Öst', beskrivning: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Porto_Colom_harbour.jpg/640px-Porto_Colom_harbour.jpg', tips: 'Fiskarna säljer direkt från båten på morgonen' },
  { namn: 'Santanyi', href: '/santanyi', region: 'Syd', beskrivning: 'Charmig marknadsby känd för onsdagsmarknaden och närheten till Cala Llombards', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Santany%C3%AD_Kirche.jpg/640px-Santany%C3%AD_Kirche.jpg', tips: 'Onsdagsmarknaden är bättre än lördagen' },
  { namn: 'Porto Petro', href: '/porto-petro', region: 'Syd', beskrivning: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Porto_Petro_%28Mallorca%29.jpg/640px-Porto_Petro_%28Mallorca%29.jpg', tips: 'Perfekt för kvällspromenad längs hamnen' },
  { namn: 'Alcúdia', href: '/byar', region: 'Norr', beskrivning: 'Historisk kuststad med välbevarade medeltida murar och romarteater', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alcudia_mallorca.jpg/640px-Alcudia_mallorca.jpg', tips: 'Besök den romerska teatern och gamla stan' },
  { namn: 'Valldemossa', href: '/sevardheter', region: 'Nordväst', beskrivning: 'UNESCO-skyddad bergsby känt för Chopin och George Sands vistelse', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Valldemossa_2.jpg/640px-Valldemossa_2.jpg', tips: 'Besök kartusianerklostret tidigt på morgonen' },
  { namn: 'Deià', href: '/byar', region: 'Nordväst', beskrivning: 'Konstnärsby i Tramuntana-bergen med bohemisk atmosfär och havsutsikt', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Deia_Mallorca.jpg/640px-Deia_Mallorca.jpg', tips: 'Robert Graves museum är ett måste' },
  { namn: 'Pollença', href: '/byar', region: 'Norr', beskrivning: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pollensa_calvary.jpg/640px-Pollensa_calvary.jpg', tips: 'Klättra upp till Calvari för fantastisk utsikt' },
  { namn: 'Sineu', href: '/byar', region: 'Inland', beskrivning: 'Mallorcas geografiska hjärta med öns äldsta marknad sedan 1306', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sineu_Mallorca_fira_mercat.jpg/640px-Sineu_Mallorca_fira_mercat.jpg', tips: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen' },
  { namn: 'Artà', href: '/byar', region: 'Öst', beskrivning: 'Historisk bergsstad med imponerande borg och vackra gränder', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Arta_Mallorca.jpg/640px-Arta_Mallorca.jpg', tips: 'Besök borgen Santuari de Sant Salvador' },
  { namn: 'Felanitx', href: '/byar', region: 'Öst', beskrivning: 'Traditionell stad känd för keramik, vin och söndagsmarknad', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Felanitx_Mallorca.jpg/640px-Felanitx_Mallorca.jpg', tips: 'Köp lokal keramik direkt från hantverkarna' },
  { namn: 'Manacor', href: '/byar', region: 'Öst', beskrivning: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Manacor_town_hall.jpg/640px-Manacor_town_hall.jpg', tips: 'Besök en pärlafabrik och se hur de tillverkas' },
  { namn: 'Inca', href: '/byar', region: 'Inland', beskrivning: 'Läderstaden med berömd torsdagsmarknad och källarviner', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Inca_Mallorca.jpg/640px-Inca_Mallorca.jpg', tips: 'November – kom på den stora lädermässan' },
  { namn: 'Binissalem', href: '/byar', region: 'Inland', beskrivning: 'Mallorcas vinbygd med vingårdar och vinmarknad i oktober', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Binissalem_Mallorca.jpg/640px-Binissalem_Mallorca.jpg', tips: 'Besök José L. Ferrer – öns äldsta vingård' },
  { namn: 'Andratx', href: '/byar', region: 'Sydväst', beskrivning: 'Lugn stadskärna i sydväst nära Port d\'Andratx med fin marina', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Port_d%27Andratx_harbour.jpg/640px-Port_d%27Andratx_harbour.jpg', tips: 'Port d Andratx har öns snyggaste marina' },
  { namn: 'Campos', href: '/byar', region: 'Syd', beskrivning: 'Lantlig stad nära Es Trenc känd för salt, kapers och lördagsmarknad', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Campos_Mallorca.jpg/640px-Campos_Mallorca.jpg', tips: 'Perfekt stopp på väg till Es Trenc' },
  { namn: 'Llucmajor', href: '/byar', region: 'Syd', beskrivning: 'Historisk stad med medeltida rötter och vackert torg', bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Llucmajor_Mallorca.jpg/640px-Llucmajor_Mallorca.jpg', tips: 'Prova den lokala ensaimadan på torgets café' },
];

export default function ByadSida() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '50vh',
        backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Palma_de_Mallorca_aerial_view.jpg/1280px-Palma_de_Mallorca_aerial_view.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Utforska Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Städer och Byar</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>{städer.length} utvalda destinationer runt hela ön</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {städer.map((stad, i) => (
            <Link key={i} href={stad.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}>
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
