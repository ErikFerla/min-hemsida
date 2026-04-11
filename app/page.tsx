import styles from './page.module.css';
import HeroSlideshow from '@/components/HeroSlideshow';
import SectionSeason from './components/SectionSeason';
import SectionPlanner from './components/SectionPlanner';
import SectionEvents from './components/SectionEvents';
import MallorcaMapWrapper from '@/components/MallorcaMapWrapper';
import FeatureCards from './components/FeatureCards';
import MobileFeatureCards from '@/components/MobileFeatureCards';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Updated: carousel title and section-black color - redeploy 2026-04-07 */}
      <HeroSlideshow />

      <div className={styles.container}>
        <section style={{ background: '#FDF8F2', padding: 'var(--section-padding-md, 6rem 0)' }}>
          <div className="section-inner">
            <p className="section-label">VAD VILL DU UPPLEVA?</p>
            <h2 className="section-title">Upptäck Mallorca</h2>
            <div className="section-divider"></div>
            {/* MOBIL: kompakta kort */}
            <div className="mobile-only">
              <MobileFeatureCards />
            </div>
            {/* DESKTOP: feature-cards med hover */}
            <div className="desktop-only">
              <FeatureCards />
            </div>
          </div>
        </section>

        {/* Mobilbild — endast synlig på mobil */}
        <div className="mobile-hero-image">
          <img
            src="https://images.unsplash.com/photo-1617532189645-ff762b19c6f7?w=800&q=85"
            alt="Mallorca — olivlundar och medeltida bergsby"
            style={{
              width: '100%',
              height: '260px',
              objectFit: 'cover',
              objectPosition: 'center 50%',
              display: 'block',
            }}
          />
        </div>

        <section
          className="page-section"
          style={{background:'#fdf8f2', overflow:'hidden'}}
        >
          <div className="varfor-mallorca-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gap: '80px', alignItems: 'center', width: '100%' }}>
            <div>
              <p className="section-label">
                VARFÖR MALLORCA
              </p>
              <h2 className="section-title" style={{ letterSpacing: '-0.512px' }}>
                En ö med allt – hela året om
              </h2>
              <div style={{ width: '48px', height: '2px', background: '#F59E0B', marginBottom: '28px', borderRadius: '2px' }} />
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4B5563', marginBottom: '1.25rem', maxWidth: '65ch' }}>
                Mallorca är mer än sol och sand. Det är klippor som faller rakt ner i turkost hav, medeltida bergbyar dolda bland olivlundar och en matkultur som sträcker sig från enkla fiskrestauranger till Michelinstjärnor.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4B5563', marginBottom: '2.25rem', maxWidth: '65ch' }}>
                Öns nordvästra bergsmassiv, Serra de Tramuntana, är ett UNESCO-världsarv. Längs kusterna hittar du 200 stränder med vatten så klart att det knappast verkar verkligt. Och mitt i allt detta – en levande lokal kultur som pågår oberoende av turistsäsongen.
              </p>
              <div className="stats-row">
                {[
                  { siffra: '200+', text: 'Stränder och vikar' },
                  { siffra: '22', text: 'Golfbanor' },
                  { siffra: '300', text: 'Soldagar per år' },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1F2937', margin: 0, letterSpacing: '0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.siffra}</p>
                    <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.text}</p>
                  </div>
                ))}
              </div>
              <a href="/byar" className="btn-primary">
                UTFORSKA ÖN →
              </a>
            </div>
          </div>
        </section>
        <section className="page-section" style={{background:'#fdf8f2'}}>
          <div className="din-guide-grid" style={{maxWidth:'1280px', margin:'0 auto', display:'grid',
                       gap:'80px', alignItems:'center'}}>

            {/* BILD VÄNSTER */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800&q=80"
                alt="Mallorca — solig terrassdag"
                className="din-guide-image"
                style={{width:'100%', objectFit:'cover',
                        borderRadius:'4px', display:'block'}}
              />
            </div>

            {/* TEXT HÖGER */}
            <div>
              <p className="section-label">
                UPPLEV SKILLNADEN
              </p>
              <h2 className="section-title">
                Din guide till Mallorca — inifrån och ut
              </h2>
              <div className="section-divider" style={{background:'#c9a96e'}} />
              <p style={{lineHeight:1.75, color:'#4b5563',
                         marginBottom:'20px', maxWidth:'52ch'}}>
                De flesta reser till Mallorca. Vi hjälper dig att uppleva den.
                Det är skillnaden mellan ett hotellpool-semester och en morgon
                på en okänd strand i nordväst — där vattnet är turkost och du
                är ensam om den.
              </p>
              <p style={{lineHeight:1.75, color:'#4b5563',
                         marginBottom:'32px', maxWidth:'52ch'}}>
                MyMallorca är byggt av människor som älskar ön på riktigt —
                inte av resebolag med provision. Guider, stränder och
                upplevelser som faktiskt håller. Utvalda med omdöme.
              </p>
              <a href="/guider" className="btn-primary">
                SE VÅRA GUIDER →
              </a>
            </div>
          </div>
        </section>
        <div className="mobile-order-7"><SectionSeason /></div>
        <div className="mobile-order-4"><SectionPlanner /></div>
        <div className="mobile-order-6"><SectionEvents /></div>
        <section className="page-section" style={{background:'#fdf8f2'}}>
          <div style={{maxWidth:'1280px', margin:'0 auto'}}>
            <p className="section-label" style={{textAlign:'center'}}>
              UTFORSKA ÖN
            </p>
            <h2 className="section-title" style={{textAlign:'center'}}>
              Städer &amp; byar på Mallorca
            </h2>
            <p style={{lineHeight:1.75, color:'#4b5563', textAlign:'center',
                       margin:'0 auto 48px', maxWidth:'55ch'}}>
              Klicka på en stad för att utforska insider-tips, sevärdheter och lokala favoriter.
            </p>
            <MallorcaMapWrapper />
          </div>
        </section>
      </div>
    </div>
  );
}

