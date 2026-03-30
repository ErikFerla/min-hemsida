import dynamic from 'next/dynamic';
import styles from './page.module.css';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { Suspense } from 'react';

const SectionPersonal = dynamic(() => import('./components/SectionPersonal'));
const SectionSeason = dynamic(() => import('./components/SectionSeason'));
const SectionPlanner = dynamic(() => import('./components/SectionPlanner'));
const SectionInsider = dynamic(() => import('./components/SectionInsider'));
const SectionEvents = dynamic(() => import('./components/SectionEvents'));

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://immobilien-portocolom.com/images/slide/Portocolom-Altstadt-Fisherhafen.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroBgText} aria-hidden="true">MALLORCA</div>
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>BIENVENIDOS A</p>
          <h1 className={styles.heroTitle}>Mallorca</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Mallorca</h2>
          <p>Mallorca är mer än bara en semesterö - det är en upplevelse som stannar kvar länge efter att du kommit hem. Här möter du krispigt turkost hav, doftande apelsinlundar, vitputsade fiskebyar och en livlig matkultur som får smaklökarna att dansa. Med över 300 soldagar om året och ett klimat som är behagligt från april till november finns det knappt något bättre ställe i Europa att ladda batterierna på. Oavsett om du söker stillhet, äventyr, romantik eller familjesemester - Mallorca har det du letar efter.</p>
          <p><strong>Stränder och natur</strong><br />Föreställ dig att vakna upp, promenera fem minuter och sätta fötterna i sand vit som pudrat socker. På Mallorca är det vardagsliv. Ön över 200 stränder och vikar erbjuder allt från breda familjevänliga sandstränder till dolda paradisvikar som bara nås till fots. Es Trenc i söder - ofta kallad Mallorcas Karibien - lockar med sitt kristallklara vatten och orörda naturmiljö. Cala Mondragó är naturskyddad och ovanligt obefolkad. Och Serra de Tramuntana, UNESCOs världsarv, reser sig dramatiskt mot himlen med vandringsleder som belönar dig med utsikter du aldrig glömmer.</p>
          <p><strong>Mat och kultur</strong><br />Mallorcansk matkultur är en kärlekshistoria mellan havet, jorden och generationer av tradition. Frukostera på ett lokalt café med ensaimada - den karakteristiska snigelbullen - och njut av en cortado i morgonsolens sken. Till lunch serveras färsk fisk direkt från hamnen, tillagad med olivolja pressad från öns egna oliver. På kvällen lockar Palmas restaurangscen med allt från enkla tapasrestauranger till stjärnkrogarnas avantgardistiska tolkning av mallorcansk husmanskost. Och vinerna? Ön vingårdar i Binissalem producerar rödviner som tar upp kampen med Spaniens bästa.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>UPPLEV MALLORCA</Link>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionPersonal />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionSeason />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionPlanner />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionInsider />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionEvents />
        </Suspense>
        <section style={{background: '#d8d8d8'}}>
          <Carousel title="UTFORSKA STÄDERNA">
            {[
              { namn: 'Porto Colom', href: '/porto-colom', desc: 'Pittoresk fiskeby på östkusten', bild: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=600&q=80' },
              { namn: 'Santanyi', href: '/santanyi', desc: 'Charmig marknadsby i söder', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
              { namn: 'Porto Petro', href: '/porto-petro', desc: 'Exklusiv och lugn marinaby', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
              { namn: 'Soller', href: '/soller', desc: 'Bergsby med historisk spårvagn', bild: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
              { namn: 'Palma', href: '/palma', desc: 'Öns pulserande huvudstad', bild: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80' },
              { namn: 'Alcudia', href: '/alcudia', desc: 'Historisk kuststad i norr', bild: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80' },
            ].map((stad) => (
              <a key={stad.namn} href={stad.href} style={{textDecoration: 'none', display: 'block', borderRadius: '12px', overflow: 'hidden', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                <div style={{height: '200px', backgroundImage: `url('${stad.bild}')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <div style={{padding: '16px'}}>
                  <div style={{fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', color: '#2C1A0E', marginBottom: '4px'}}>{stad.namn}</div>
                  <div style={{fontSize: '0.82rem', color: '#7D6650'}}>{stad.desc}</div>
                </div>
              </a>
            ))}
          </Carousel>
        </section>
      </div>
    </div>
  );
}


