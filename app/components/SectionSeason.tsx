'use client';
import { useState } from 'react';
import styles from './SectionSeason.module.css';
import { IconFlower, IconSun, IconLeaf, IconSnow } from '@/components/Icons';
import type { ComponentType, CSSProperties } from 'react';

type Sasong = {
  Icon: ComponentType<{ size?: number }>;
  namn: string;
  månader: string;
  /** Statusfärg (token) – bara som tunn kant och liten text, aldrig som bakgrund */
  färg: string;
  fördelar: string[];
  nackdel: string;
  bästFör: string;
};

const säsonger: Sasong[] = [
  {
    Icon: IconFlower,
    namn: 'Våren',
    månader: 'mars–maj',
    färg: 'var(--color-success)',
    fördelar: ['Perfekt för vandring i Tramuntana', 'Blommande landskap och gröna dalar', 'Färre turister och lägre priser', 'Behagliga 18–22 °C'],
    nackdel: 'Lite kyligt för bad',
    bästFör: 'Natur och vandring',
  },
  {
    Icon: IconSun,
    namn: 'Sommaren',
    månader: 'juni–augusti',
    färg: 'var(--color-warning)',
    fördelar: ['28–32 °C och nästan alltid sol', 'Allt är öppet och i gång', 'Livligt nattliv och evenemang'],
    nackdel: 'Mest turister och högsta priser',
    bästFör: 'Bad och familjesemester',
  },
  {
    Icon: IconLeaf,
    namn: 'Hösten',
    månader: 'september–november',
    färg: 'var(--color-accent)',
    fördelar: ['Havet är varmt i september (ca 25 °C)', 'Färre turister än sommaren', 'Bäst för mat och kultur', 'Skördefester och marknader'],
    nackdel: 'Regnigare i oktober',
    bästFör: 'Mat och kultur',
  },
  {
    Icon: IconSnow,
    namn: 'Vintern',
    månader: 'december–februari',
    färg: 'var(--color-info)',
    fördelar: ['Lugnt och autentiskt', 'Mandelblomning i februari', 'Bra för cykling och vandring', 'Milt, ofta 14–17 °C på dagen'],
    nackdel: 'Många affärer stängda',
    bästFör: 'Avkoppling och cykling',
  },
];

export default function SectionSeason() {
  const [öppen, setÖppen] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Planera</p>
        <h2 className={styles.title}>När ska du åka?</h2>
        <p className={styles.sub}>Mallorca går att besöka hela året – och varje årstid har något eget</p>

        {/* Desktop-grid */}
        <div className={styles.grid}>
          {säsonger.map((s, i) => (
            <div key={i} className={styles.card} style={färger(s)}>
              <span className={styles.icon}><s.Icon size={28} /></span>
              <h3 className={styles.cardTitle}>{s.namn}</h3>
              <p className={styles.months}>{s.månader}</p>
              <ul className={styles.list}>
                {s.fördelar.map((f, j) => <li key={j}>✓ {f}</li>)}
                <li>✗ {s.nackdel}</li>
              </ul>
              <span className={styles.badge}>
                Bäst för: {s.bästFör}
              </span>
            </div>
          ))}
        </div>

        {/* Mobilaccordion – visas bara på mobil */}
        <div className={styles.accordion}>
          {säsonger.map((s, i) => (
            <div key={i} className={styles.item} style={färger(s)}>
              <button
                type="button"
                className={styles.header}
                aria-expanded={öppen === i}
                onClick={() => setÖppen(öppen === i ? null : i)}
              >
                <span className={styles.headerText}>
                  <span className={styles.headerIcon}><s.Icon size={22} /></span>
                  <span>
                    <span className={styles.itemTitle}>{s.namn}</span>
                    <span className={styles.itemMonths}>{s.månader}</span>
                  </span>
                </span>
                <span className={öppen === i ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron} aria-hidden="true">▼</span>
              </button>

              {öppen === i && (
                <div className={styles.body}>
                  <ul className={styles.bodyList}>
                    {s.fördelar.slice(0, 3).map((f, j) => (
                      <li key={j} className={styles.pro}>✓ {f}</li>
                    ))}
                    <li className={styles.con}>✗ {s.nackdel}</li>
                  </ul>
                  <span className={styles.itemBadge}>
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

/** Säsongens färger som CSS-variabler (dynamiska värden från data). */
function färger(s: Sasong) {
  return { '--season-color': s.färg } as CSSProperties;
}
