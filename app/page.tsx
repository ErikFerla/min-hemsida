import styles from './page.module.css';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import HeroSlideshow from '@/components/HeroSlideshow';
import SectionPersonal from './components/SectionPersonal';
import SectionSeason from './components/SectionSeason';
import SectionPlanner from './components/SectionPlanner';
import SectionInsider from './components/SectionInsider';
import SectionEvents from './components/SectionEvents';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Updated: carousel title and section-black color */}
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
        <section className="section-light desktop-intro">
          <div className="section-inner">
            <p className="section-label">DIN PERSONLIGA GUIDE</p>
            <h2 className="section-title">Mallorca</h2>
            <p style={{ fontSize: '1.2rem', color: '#c0392b', fontWeight: '600', marginBottom: '24px', fontStyle: 'italic' }}>
              Din personliga guide till Mallorcas bästa hemligheter – utan turistfällor
            </p>
            <div className="section-divider"></div>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px'}}>Mallorca är mer än bara en semesterö - det är en upplevelse som stannar kvar länge efter att du kommit hem. Här möter du krispigt turkost hav, doftande apelsinlundar, vitputsade fiskebyar och en livlig matkultur som får smaklökarna att dansa. Med över 300 soldagar om året och ett klimat som är behagligt från april till november finns det knappt något bättre ställe i Europa att ladda batterierna på. Oavsett om du söker stillhet, äventyr, romantik eller familjesemester - Mallorca har det du letar efter.</p>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px'}}><strong>Stränder och natur</strong><br />Föreställ dig att vakna upp, promenera fem minuter och sätta fötterna i sand vit som pudrat socker. På Mallorca är det vardagsliv. Ön över 200 stränder och vikar erbjuder allt från breda familjevänliga sandstränder till dolda paradisvikar som bara nås till fots. Es Trenc i söder - ofta kallad Mallorcas Karibien - lockar med sitt kristallklara vatten och orörda naturmiljö. Cala Mondragó är naturskyddad och ovanligt obefolkad. Och Serra de Tramuntana, UNESCOs världsarv, reser sig dramatiskt mot himlen med vandringsleder som belönar dig med utsikter du aldrig glömmer.</p>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '24px'}}><strong>Mat och kultur</strong><br />Mallorcansk matkultur är en kärlekshistoria mellan havet, jorden och generationer av tradition. Frukostera på ett lokalt café med ensaimada - den karakteristiska snigelbullen - och njut av en cortado i morgonsolens sken. Till lunch serveras färsk fisk direkt från hamnen, tillagad med olivolja pressad från öns egna oliver. På kvällen lockar Palmas restaurangscen med allt från enkla tapasrestauranger till stjärnkrogarnas avantgardistiska tolkning av mallorcansk husmanskost. Och vinerna? Ön vingårdar i Binissalem producerar rödviner som tar upp kampen med Spaniens bästa.</p>
            <Link href="/kontakt" className={styles.ctaBtn}>UPPLEV MALLORCA</Link>
          </div>
        </section>
        <div className="mobile-order-3"><SectionPersonal /></div>
        <div className="mobile-order-7"><SectionSeason /></div>
        <div className="mobile-order-4"><SectionPlanner /></div>
        <div className="mobile-order-8"><SectionInsider /></div>
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


