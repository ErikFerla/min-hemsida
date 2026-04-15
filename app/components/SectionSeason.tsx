'use client';
import { useState } from 'react';
import styles from '../page.module.css';
import { IconFlower, IconSun, IconLeaf, IconSnow } from '@/components/Icons';
import type { ComponentType } from 'react';

type Sasong = {
  Icon: ComponentType<{ size?: number }>;
  namn: string;
  månader: string;
  färg: string;
  textFärg: string;
  fördelar: string[];
  nackdel: string;
  bästFör: string;
  borderColor: string;
};

const säsonger: Sasong[] = [
  {
    Icon: IconFlower,
    namn: 'Våren',
    månader: 'Mars – Maj',
    färg: '#a8e6a3',
    textFärg: '#1a5c1a',
    fördelar: ['Mandelblomning i februari', 'Perfekt för vandring i Tramuntana', 'Få turister och lägre priser', 'Behagliga 18–22 grader'],
    nackdel: 'Lite kyligt för bad',
    bästFör: 'Natur & vandring',
    borderColor: '#a8e6a3',
  },
  {
    Icon: IconSun,
    namn: 'Sommaren',
    månader: 'Juni – Augusti',
    färg: '#ffc400',
    textFärg: '#5c3d00',
    fördelar: ['28–32 grader, garanterat sol', 'Allt är öppet och i gång', 'Livligt nattliv och evenemang'],
    nackdel: 'Mest turister och högsta priser',
    bästFör: 'Bad & nöjesliv',
    borderColor: '#ffc400',
  },
  {
    Icon: IconLeaf,
    namn: 'Hösten',
    månader: 'September – November',
    färg: '#f5a623',
    textFärg: '#5c2d00',
    fördelar: ['Havet fortfarande varmt (24°)', 'Färre turister än sommaren', 'Bäst för mat och kultur', 'Skördefester och marknader'],
    nackdel: 'Regnigare i oktober',
    bästFör: 'Mat & kultur',
    borderColor: '#f5a623',
  },
  {
    Icon: IconSnow,
    namn: 'Vintern',
    månader: 'December – Februari',
    färg: '#90caf9',
    textFärg: '#0a2a5c',
    fördelar: ['Lugnt och autentiskt', 'Billigaste priserna', 'Cyklister och vandrare', 'Mild 14–18 grader'],
    nackdel: 'Många affärer stängda',
    bästFör: 'Avkoppling & cykling',
    borderColor: '#90caf9',
  },
];

export default function SectionSeason() {
  const [öppen, setÖppen] = useState<number | null>(null);

  return (
    <section className={styles.seasonSection}>
      <div className={styles.seasonInner}>
        <h2 className={styles.seasonTitle}>När ska du åka?</h2>
        <p className={styles.seasonSub}>Mallorca är fantastiskt hela året – men varje säsong erbjuder något unikt</p>

        {/* Desktop-grid – oförändrat */}
        <div className={`${styles.seasonGrid} season-desktop`}>
          {säsonger.map((s, i) => (
            <div key={i} className={styles.seasonCard} style={{ borderTop: `4px solid ${s.borderColor}` }}>
              <span className={styles.seasonEmoji} style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><s.Icon size={28} /></span>
              <h3 className={styles.seasonName}>{s.namn}</h3>
              <p className={styles.seasonMonths}>{s.månader}</p>
              <ul className={styles.seasonList}>
                {s.fördelar.map((f, j) => <li key={j}>✓ {f}</li>)}
                <li>✗ {s.nackdel}</li>
              </ul>
              <span className={styles.seasonBadge} style={{ background: s.färg, color: s.textFärg }}>
                Bäst för: {s.bästFör}
              </span>
            </div>
          ))}
        </div>

        {/* Mobilaccordion – visas bara på mobil */}
        <div className="season-mobile-accordion">
          {säsonger.map((s, i) => (
            <div key={i} className="season-accordion-item" style={{ borderLeft: `4px solid ${s.borderColor}` }}>
              <button
                className="season-accordion-header"
                onClick={() => setÖppen(öppen === i ? null : i)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><s.Icon size={22} /></span>
                  <span>
                    <span className="season-accordion-title">{s.namn}</span>
                    <span className="season-accordion-months">{s.månader}</span>
                  </span>
                </span>
                <span style={{ fontSize: '0.8rem', color: '#0E7490', transition: 'transform 0.2s', display: 'inline-block', transform: öppen === i ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              {öppen === i && (
                <div className="season-accordion-body">
                  <ul className="season-accordion-list">
                    {s.fördelar.slice(0, 3).map((f, j) => (
                      <li key={j} className="season-accordion-pro">✓ {f}</li>
                    ))}
                    <li className="season-accordion-con">✗ {s.nackdel}</li>
                  </ul>
                  <span className="season-accordion-badge" style={{ background: s.färg, color: s.textFärg }}>
                    Bäst för: {s.bästFör}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

