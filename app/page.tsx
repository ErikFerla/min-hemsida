import styles from './page.module.css';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import HeroSlideshow from '@/components/HeroSlideshow';
import SectionSeason from './components/SectionSeason';
import SectionPlanner from './components/SectionPlanner';
import SectionEvents from './components/SectionEvents';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Updated: carousel title and section-black color - redeploy 2026-04-07 */}
      <HeroSlideshow />
      <div className="mobile-quicklinks">
        <a href="/strandar" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon">🏖️</span>
          <div>
            <div className="mobile-quicklink-title">Bästa stränderna</div>
            <div className="mobile-quicklink-desc">30 utvalda stränder på Mallorca</div>
          </div>
        </a>
        <a href="/byar" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon">🏙️</span>
          <div>
            <div className="mobile-quicklink-title">Städer &amp; byar</div>
            <div className="mobile-quicklink-desc">18 destinationer runt hela ön</div>
          </div>
        </a>
        <a href="/kontakt" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon">🗺️</span>
          <div>
            <div className="mobile-quicklink-title">Planera din resa</div>
            <div className="mobile-quicklink-desc">Få personlig hjälp och tips</div>
          </div>
        </a>
        <a href="/evenemang" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon">🎉</span>
          <div>
            <div className="mobile-quicklink-title">Evenemang</div>
            <div className="mobile-quicklink-desc">60 evenemang under 2026</div>
          </div>
        </a>
      </div>
      <div className={styles.container}>
        <section style={{ background: '#FDF8F2', padding: '64px 60px' }}>
          <div className="section-inner">
            <p className="section-label">VAD VILL DU UPPLEVA?</p>
            <h2 className="section-title">Upptäck Mallorca</h2>
            <div className="section-divider"></div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              marginTop: '8px',
            }}>
              {[
                { icon: '🏖️', title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
                { icon: '🏙️', title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
                { icon: '🍽️', title: 'Mat & Vin', desc: 'Restaurangtips, lokala vindistriktet och Michelinstjärnor', href: '/mat' },
                { icon: '⛳', title: 'Golf', desc: '22 banor i världsklass – boka rätt bana för din nivå', href: '/aktiviteter/golf' },
                { icon: '🎉', title: 'Evenemang 2026', desc: 'Festivaler, marknader och lokala fester hela säsongen', href: '/evenemang' },
                { icon: '✈️', title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
              ].map((item) => (
                <a key={item.title} href={item.href} className="feature-card" style={{
                  display: 'block',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.04em', color: '#1F2937', marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</div>
                  <div style={{ marginTop: '16px', fontSize: '0.8rem', color: '#1F2937', fontWeight: 700, letterSpacing: '0.06em' }}>LÄS MER →</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background: '#FDF8F2', padding: '80px 60px' }}>
          <div className="split-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Vänster: Text */}
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 600, marginBottom: '16px' }}>
                VARFÖR MALLORCA
              </p>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', letterSpacing: '0.04em', color: '#1F2937', lineHeight: 1.05, marginBottom: '24px' }}>
                En ö med allt – hela året om
              </h2>
              <div style={{ width: '48px', height: '2px', background: '#F59E0B', marginBottom: '28px', borderRadius: '2px' }} />
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#4B5563', marginBottom: '20px' }}>
                Mallorca är mer än sol och sand. Det är klippor som faller rakt ner i turkost hav, medeltida bergbyar dolda bland olivlundar och en matkultur som sträcker sig från enkla fiskrestauranger till Michelinstjärnor.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#4B5563', marginBottom: '36px' }}>
                Öns nordvästra bergsmassiv, Serra de Tramuntana, är ett UNESCO-världsarv. Längs kusterna hittar du 200 stränder med vatten så klart att det knappast verkar verkligt. Och mitt i allt detta – en levande lokal kultur som pågår oberoende av turistsäsongen.
              </p>
              <div style={{ display: 'flex', gap: '48px', marginBottom: '36px' }}>
                {[
                  { siffra: '200+', text: 'Stränder och vikar' },
                  { siffra: '22', text: 'Golfbanor' },
                  { siffra: '300', text: 'Soldagar per år' },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', color: '#1F2937', margin: 0, letterSpacing: '0.05em' }}>{s.siffra}</p>
                    <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.text}</p>
                  </div>
                ))}
              </div>
              <a href="/byar" style={{ display: 'inline-block', padding: '12px 28px', background: '#1F2937', color: 'white', borderRadius: '3px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.95rem', letterSpacing: '0.12em', textDecoration: 'none' }}>
                UTFORSKA ÖN →
              </a>
            </div>
            {/* Höger: Bild */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=900&q=85"
                alt="Mallorca – charmig gränd i Valldemossa"
                loading="lazy"
                style={{ width: '100%', height: '620px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: '3px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#1F2937', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Valldemossa</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#9CA3AF' }}>UNESCO-skyddat världsarv</p>
              </div>
            </div>
          </div>
        </section>
        <div className="mobile-order-7"><SectionSeason /></div>
        <div className="mobile-order-4"><SectionPlanner /></div>
        <div className="mobile-order-6"><SectionEvents /></div>
        <div className="mobile-order-5">
        <section className="section-black">
          <Carousel title={'Hitta smultronen som bara "locals" känner till'} label="DESTINATIONER">
            {[
              { namn: 'Porto Colom', href: '/porto-colom', desc: 'Pittoresk fiskeby på östkusten', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
              { namn: 'Santanyi', href: '/santanyi', desc: 'Charmig marknadsby i söder', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80' },
              { namn: 'Porto Petro', href: '/porto-petro', desc: 'Exklusiv och lugn marinaby', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80' },
              { namn: 'Soller', href: '/soller', desc: 'Bergsby med historisk spårvagn', bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80' },
              { namn: 'Palma', href: '/palma-de-mallorca', desc: 'Öns pulserande huvudstad', bild: 'https://images.unsplash.com/photo-1499678329028-101435549a02?w=1600&q=85' },
              { namn: 'Alcudia', href: '/byar', desc: 'Historisk kuststad i norr', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80' },
            ].map((stad) => (
              <a key={stad.namn} href={stad.href} style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', background: '#FDF8F2', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <div style={{ height: 'clamp(160px, 25vw, 200px)', backgroundImage: `url('${stad.bild}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: '#2C1A0E', marginBottom: '4px'}}>{stad.namn}</div>
                  <div style={{fontSize: '0.82rem', color: '#7D6650'}}>{stad.desc}</div>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#0E7490', fontWeight: '700', letterSpacing: '0.05em' }}>
                    Utforska →
                  </div>
                </div>
              </a>
            ))}
          </Carousel>
        </section>
        </div>
      </div>
    </div>
  );
}


