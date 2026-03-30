import styles from '../page.module.css';

export default function SectionSeason() {
  return (
    <section className={styles.seasonSection}>
      <div className={styles.seasonInner}>
        <h2 className={styles.seasonTitle}>När ska du åka?</h2>
        <p className={styles.seasonSub}>Mallorca är fantastiskt hela året - men varje säsong erbjuder något unikt</p>
        <div className={styles.seasonGrid}>
          <div className={styles.seasonCard} style={{borderTop: '4px solid #a8e6a3'}}>
            <span className={styles.seasonEmoji}>🌸</span>
            <h3 className={styles.seasonName}>Våren</h3>
            <p className={styles.seasonMonths}>Mars - Maj</p>
            <ul className={styles.seasonList}>
              <li>✓ Mandelblomning i februari</li>
              <li>✓ Perfekt för vandring i Tramuntana</li>
              <li>✓ Få turister, lägre priser</li>
              <li>✓ Behagliga 18-22 grader</li>
              <li>✗ Lite kyligt för bad</li>
            </ul>
            <span className={styles.seasonBadge} style={{background: '#a8e6a3', color: '#1a5c1a'}}>Bäst för: Natur & vandring</span>
          </div>
          <div className={styles.seasonCard} style={{borderTop: '4px solid #ffc400'}}>
            <span className={styles.seasonEmoji}>☀️</span>
            <h3 className={styles.seasonName}>Sommaren</h3>
            <p className={styles.seasonMonths}>Juni - Augusti</p>
            <ul className={styles.seasonList}>
              <li>✓ 28-32 grader, garanterat sol</li>
              <li>✓ Allt är öppet och i gång</li>
              <li>✓ Livligt nattliv och evenemang</li>
              <li>✗ Mest turister och högsta priser</li>
              <li>✗ Stränder kan vara fullsatta</li>
            </ul>
            <span className={styles.seasonBadge} style={{background: '#ffc400', color: '#5c3d00'}}>Bäst för: Bad & nöjesliv</span>
          </div>
          <div className={styles.seasonCard} style={{borderTop: '4px solid #f5a623'}}>
            <span className={styles.seasonEmoji}>🍂</span>
            <h3 className={styles.seasonName}>Hösten</h3>
            <p className={styles.seasonMonths}>September - November</p>
            <ul className={styles.seasonList}>
              <li>✓ Havet fortfarande varmt (24°)</li>
              <li>✓ Färre turister än sommaren</li>
              <li>✓ Bäst för mat och kultur</li>
              <li>✓ Skördefester och marknader</li>
              <li>✗ Regnigare i oktober</li>
            </ul>
            <span className={styles.seasonBadge} style={{background: '#f5a623', color: '#5c2d00'}}>Bäst för: Mat & kultur</span>
          </div>
          <div className={styles.seasonCard} style={{borderTop: '4px solid #90caf9'}}>
            <span className={styles.seasonEmoji}>❄️</span>
            <h3 className={styles.seasonName}>Vintern</h3>
            <p className={styles.seasonMonths}>December - Februari</p>
            <ul className={styles.seasonList}>
              <li>✓ Lugnt och autentiskt</li>
              <li>✓ Billigaste priserna</li>
              <li>✓ Cyklister och vandrare</li>
              <li>✓ Mild 14-18 grader</li>
              <li>✗ Många affärer stängda</li>
            </ul>
            <span className={styles.seasonBadge} style={{background: '#90caf9', color: '#0a2a5c'}}>Bäst för: Avkoppling & cykling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
