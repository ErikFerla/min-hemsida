"use client";
import { useState } from 'react';
import styles from '../page.module.css';

const resplan: Record<string, string[]> = {
  Strand: ['Besok Cala des Moro tidigt pa morgonen', 'Snorkla i Cala Mondrago naturreservat', 'Soldag pa Es Trenc - Mallorcas vackraste strand'],
  Kultur: ['Utforska Palmas gotiska gamla stad och La Seu', 'Besok Coves del Drach i Porto Cristo', 'Prova lokala marknaden i Santanyi pa lordagen'],
  Mat: ['Frukostera pa ett lokalt cafe i Porto Colom', 'Middagsreservation pa hamnen i Palma', 'Besok vingardsvistering i Binissalem'],
  Aventyr: ['Vandra Cala Boquer-leden', 'Kajakpaddla runt Porto Petro', 'Cykla nerfor berget fran Soller'],
  Familj: ['Hidropark i Alcudia', 'Safari Zoo i Porto Cristo', 'Glasbottenbat fran Cala dOr'],
};

export default function SectionPlanner() {
  const [resDagar, setResDagar] = useState(7);
  const [intressen, setIntressen] = useState<string[]>([]);
  const toggleIntresse = (i: string) => setIntressen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <section className={styles.plannerSection}>
      <div className={styles.plannerInner}>
        <h2 className={styles.plannerTitle}>Skräddarsy din resa</h2>
        <p className={styles.plannerSub}>Berätta vad du gillar - få en personlig resplan för Mallorca</p>
        <div className={styles.plannerForm}>
          <div className={styles.plannerStep}>
            <h3 className={styles.plannerStepTitle}>Hur länge reser du?</h3>
            <div className={styles.daysRow}>
              {[3,5,7,10,14].map(d => (
                <button key={d} className={`${styles.dayBtn} ${resDagar === d ? styles.dayBtnActive : ''}`} onClick={() => setResDagar(d)}>{d} dagar</button>
              ))}
            </div>
          </div>
          <div className={styles.plannerStep}>
            <h3 className={styles.plannerStepTitle}>Vad intresserar dig? (välj flera)</h3>
            <div className={styles.interestRow}>
              {[{k:'Strand',e:'🏖️'},{k:'Kultur',e:'🏛️'},{k:'Mat',e:'🍽️'},{k:'Aventyr',e:'🧗'},{k:'Familj',e:'👨‍👩‍👧'}].map(({k,e}) => (
                <button key={k} className={`${styles.interestBtn} ${intressen.includes(k) ? styles.interestBtnActive : ''}`} onClick={() => toggleIntresse(k)}>{e} {k}</button>
              ))}
            </div>
          </div>
          {intressen.length > 0 && (
            <div className={styles.plannerResult}>
              <h3 className={styles.plannerResultTitle}>Din personliga {resDagar}-dagarsplan 🌟</h3>
              <ul className={styles.plannerList}>
                {intressen.flatMap(i => resplan[i] || []).slice(0, resDagar).map((tip, idx) => (
                  <li key={idx} className={styles.plannerItem}>
                    <span className={styles.plannerDay}>Dag {idx + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
