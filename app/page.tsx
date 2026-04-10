import styles from './page.module.css';
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
          <span className="mobile-quicklink-icon emoji-icon">🏖️</span>
          <div>
            <div className="mobile-quicklink-title">Bästa stränderna</div>
            <div className="mobile-quicklink-desc">30 utvalda stränder på Mallorca</div>
          </div>
        </a>
        <a href="/byar" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon emoji-icon">🏙️</span>
          <div>
            <div className="mobile-quicklink-title">Städer &amp; byar</div>
            <div className="mobile-quicklink-desc">18 destinationer runt hela ön</div>
          </div>
        </a>
        <a href="/kontakt" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon emoji-icon">🗺️</span>
          <div>
            <div className="mobile-quicklink-title">Planera din resa</div>
            <div className="mobile-quicklink-desc">Få personlig hjälp och tips</div>
          </div>
        </a>
        <a href="/evenemang" className="mobile-quicklink-card">
          <span className="mobile-quicklink-icon emoji-icon">🎉</span>
          <div>
            <div className="mobile-quicklink-title">Evenemang</div>
            <div className="mobile-quicklink-desc">60 evenemang under 2026</div>
          </div>
        </a>
      </div>
      <div className={styles.container}>
        <section style={{ background: '#FDF8F2', padding: 'var(--section-padding-md, 6rem 0)' }}>
          <div className="section-inner" style={{ padding: '0 60px' }}>
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
                  <div style={{ fontSize: '1.5rem', marginBottom: '12px', lineHeight: 1, verticalAlign: 'middle' }}>{item.icon}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', color: '#1F2937', marginBottom: '8px', textTransform: 'uppercase' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.7 }}>{item.desc}</div>
                  <div style={{ marginTop: '16px', fontSize: 'var(--btn-font-size, 0.8125rem)', color: 'var(--turkos)', fontWeight: 700, letterSpacing: 'var(--btn-letter-spacing, 0.08em)', textTransform: 'uppercase' }}>LÄS MER →</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section style={{ background: '#FDF8F2', padding: 'var(--section-padding-md, 6rem 0)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="editorial-split">
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
              <div style={{ display: 'flex', gap: '48px', marginBottom: '36px' }}>
                {[
                  { siffra: '200+', text: 'Stränder och vikar' },
                  { siffra: '22', text: 'Golfbanor' },
                  { siffra: '300', text: 'Soldagar per år' },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1F2937', margin: 0, letterSpacing: '0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.siffra}</p>
                    <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: '4px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.text}</p>
                  </div>
                ))}
              </div>
              <a href="/byar" className="btn-primary">
                UTFORSKA ÖN →
              </a>
            </div>
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
        <section style={{background:'#fdf8f2', padding:'80px 60px'}}>
          <div style={{maxWidth:'1280px', margin:'0 auto', display:'grid',
                       gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center'}}>

            {/* BILD VÄNSTER */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800&q=80"
                alt="Mallorca — solig terrassdag"
                style={{width:'100%', height:'520px', objectFit:'cover',
                        borderRadius:'4px', display:'block'}}
              />
            </div>

            {/* TEXT HÖGER */}
            <div>
              <p style={{fontSize:'11.52px', letterSpacing:'0.18em',
                         textTransform:'uppercase', color:'#4b5563',
                         fontWeight:600, marginBottom:'12px'}}>
                UPPLEV SKILLNADEN
              </p>
              <h2 style={{fontFamily:'"Playfair Display", Georgia, serif',
                          fontSize:'51.2px', lineHeight:1.1,
                          letterSpacing:'-0.512px', color:'#1f2937',
                          fontWeight:700, marginBottom:'24px', wordSpacing:'normal'}}>
                Din guide till Mallorca — inifrån och ut
              </h2>
              <div style={{width:'48px', height:'2px', background:'#c9a96e',
                           marginBottom:'32px'}} />
              <p style={{fontSize:'16px', lineHeight:1.75, color:'#4b5563',
                         marginBottom:'20px', maxWidth:'52ch'}}>
                De flesta reser till Mallorca. Vi hjälper dig att uppleva den.
                Det är skillnaden mellan ett hotellpool-semester och en morgon
                på en okänd strand i nordväst — där vattnet är turkost och du
                är ensam om den.
              </p>
              <p style={{fontSize:'16px', lineHeight:1.75, color:'#4b5563',
                         marginBottom:'32px', maxWidth:'52ch'}}>
                MyMallorca är byggt av människor som älskar ön på riktigt —
                inte av resebolag med provision. Guider, stränder och
                upplevelser som faktiskt håller. Utvalda med omdöme.
              </p>
              <a href="/guider"
                 style={{display:'inline-block', background:'#1f2937',
                         color:'#fff', padding:'12px 28px', fontSize:'15.2px',
                         letterSpacing:'1.824px', textTransform:'uppercase',
                         textDecoration:'none'}}>
                SE VÅRA GUIDER →
              </a>
            </div>
          </div>
        </section>
        <div className="mobile-order-7"><SectionSeason /></div>
        <div className="mobile-order-4"><SectionPlanner /></div>
        <div className="mobile-order-6"><SectionEvents /></div>
        <section style={{background:'#fdf8f2', padding:'80px 60px'}}>
          <div style={{maxWidth:'1280px', margin:'0 auto'}}>
            <p style={{fontSize:'11.52px', letterSpacing:'0.18em', textTransform:'uppercase',
                       color:'#4b5563', fontWeight:600, marginBottom:'12px', textAlign:'center'}}>
              UTFORSKA ÖN
            </p>
            <h2 style={{fontFamily:'"Playfair Display", Georgia, serif', fontSize:'51.2px',
                        lineHeight:1.1, letterSpacing:'-0.512px', color:'#1f2937', fontWeight:700,
                        marginBottom:'16px', textAlign:'center', wordSpacing:'normal'}}>
              Städer &amp; byar på Mallorca
            </h2>
            <p style={{fontSize:'16px', lineHeight:1.75, color:'#4b5563', textAlign:'center',
                       margin:'0 auto 48px', maxWidth:'55ch'}}>
              Klicka på en stad för att utforska insider-tips, sevärdheter och lokala favoriter.
            </p>

            {/* INTERAKTIV MALLORCA-KARTA SVG */}
            <div style={{position:'relative', maxWidth:'800px', margin:'0 auto'}}>
              <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg"
                   width="800" height="420"
                   style={{width:'100%', height:'auto', display:'block'}}>

                {/* Hav-bakgrund */}
                <rect width="800" height="420" fill="#d4e9f7" rx="12"/>

                {/* Mallorca ö-form */}
                <path d="M 120 200
                         C 130 160, 160 130, 200 120
                         C 240 110, 290 105, 340 108
                         C 390 111, 430 118, 470 125
                         C 510 132, 550 140, 590 155
                         C 630 170, 660 185, 670 210
                         C 680 235, 670 260, 650 278
                         C 630 296, 600 305, 565 310
                         C 530 315, 490 312, 460 318
                         C 430 324, 410 340, 385 348
                         C 360 356, 330 355, 305 345
                         C 280 335, 260 318, 240 305
                         C 220 292, 195 282, 170 268
                         C 145 254, 115 240, 110 215
                         Z"
                      fill="#f5e6c8" stroke="#c9a96e" strokeWidth="2"/>

                {/* Bergskedja Serra de Tramuntana */}
                <path d="M 135 195 L 155 175 L 175 185 L 195 165 L 220 178 L 245 160 L 268 172 L 285 155 L 305 168 L 320 150 L 340 165"
                      fill="none" stroke="#8b7355" strokeWidth="1.5" opacity="0.5"/>

                {/* Palma — sydväst centrum */}
                <a href="/palma-de-mallorca">
                  <circle cx="245" cy="265" r="9" fill="#1f2937" stroke="white" strokeWidth="2"/>
                  <text x="245" y="290" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="600" fontFamily="sans-serif">Palma</text>
                </a>

                {/* Sóller — nordväst */}
                <a href="/soller">
                  <circle cx="210" cy="185" r="7" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="210" y="175" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Sóller</text>
                </a>

                {/* Valldemossa */}
                <a href="/valldemossa">
                  <circle cx="195" cy="210" r="7" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="165" y="207" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Valldemossa</text>
                </a>

                {/* Deià */}
                <a href="/deia">
                  <circle cx="178" cy="200" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="148" y="198" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Deià</text>
                </a>

                {/* Andratx */}
                <a href="/andratx">
                  <circle cx="148" cy="255" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="133" y="272" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Andratx</text>
                </a>

                {/* Pollença */}
                <a href="/pollenca">
                  <circle cx="440" cy="138" r="7" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="440" y="128" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Pollença</text>
                </a>

                {/* Alcúdia */}
                <a href="/alcudia">
                  <circle cx="480" cy="148" r="7" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="505" y="146" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Alcúdia</text>
                </a>

                {/* Inca */}
                <a href="/inca">
                  <circle cx="360" cy="210" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="360" y="228" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Inca</text>
                </a>

                {/* Sineu */}
                <a href="/sineu">
                  <circle cx="420" cy="230" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="420" y="248" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Sineu</text>
                </a>

                {/* Artà */}
                <a href="/arta">
                  <circle cx="575" cy="195" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="597" y="193" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Artà</text>
                </a>

                {/* Capdepera */}
                <a href="/capdepera">
                  <circle cx="615" cy="178" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="635" y="176" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Capdepera</text>
                </a>

                {/* Felanitx */}
                <a href="/felanitx">
                  <circle cx="510" cy="290" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="535" y="288" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Felanitx</text>
                </a>

                {/* Santanyí */}
                <a href="/santanyi">
                  <circle cx="470" cy="330" r="7" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="470" y="348" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Santanyí</text>
                </a>

                {/* Porto Colom */}
                <a href="/porto-colom">
                  <circle cx="555" cy="300" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="578" y="310" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Porto Colom</text>
                </a>

                {/* Porto Petro */}
                <a href="/porto-petro">
                  <circle cx="500" cy="315" r="6" fill="#c9a96e" stroke="white" strokeWidth="2"/>
                  <text x="495" y="330" textAnchor="middle" fontSize="10" fill="#1f2937" fontFamily="sans-serif">Porto Petro</text>
                </a>

                {/* Kompass */}
                <text x="695" y="385" fontSize="10" fill="#4b5563" fontFamily="sans-serif" opacity="0.6">N ↑</text>

                {/* Medelhavs-text */}
                <text x="90" y="140" fontSize="12" fill="#4b8fb5" fontFamily="Georgia, serif"
                      fontStyle="italic" opacity="0.7" transform="rotate(-15, 90, 140)">Medelhavet</text>
              </svg>

              {/* Förklaring */}
              <div style={{display:'flex', gap:'24px', justifyContent:'center', marginTop:'24px', flexWrap:'wrap'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#1f2937'}}/>
                  <span style={{fontSize:'13px', color:'#4b5563'}}>Huvudstad</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#c9a96e'}}/>
                  <span style={{fontSize:'13px', color:'#4b5563'}}>Städer &amp; byar</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


