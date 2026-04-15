import styles from '../page.module.css';
import { IconWave, IconForkKnife, IconSparkle } from '@/components/Icons';

export default function SectionPersonal() {
  return (
    <section className={styles.personalSection}>
      <div className={styles.personalInner}>
        <div className={styles.personalHeader}>
          <div className={styles.personalAvatar}>EG</div>
          <div>
            <h2 className={styles.personalTitle}>Grytes Personliga Tips</h2>
            <p className={styles.personalSub}>Rekommendationer från en som kan Mallorca utan och innan</p>
          </div>
        </div>
        <div className={`${styles.personalGrid} personal-mobile-scroll`}>
          <div className={`${styles.personalCard} personal-mobile-card`}>
            <span className={styles.personalEmoji} style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconWave size={26} /></span>
            <h3>Min favoritstrand</h3>
            <p>Cala des Moro är utan tvekan den vackraste stranden jag hittat. Den kräver en liten promenad men belönar dig med kristallklart turkost vatten och dramatiska klippor. Kom tidigt - efter 10 år är den fullsatt.</p>
            <span className={styles.personalTag}>Östkusten · 20 min promenad</span>
          </div>
          <div className={`${styles.personalCard} personal-mobile-card`}>
            <span className={styles.personalEmoji} style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconForkKnife size={26} /></span>
            <h3>Bästa matupplevelsen</h3>
            <p>Skippa turistkrogarna vid hamnen i Porto Colom och gå istället till de små restaurangerna på baksidan av torget. Fråga efter dagens catch - fisken är alltid fångad samma dag och tillagas enkelt med olivolja och citron.</p>
            <span className={styles.personalTag}>Porto Colom · Lokalt tips</span>
          </div>
          <div className={`${styles.personalCard} personal-mobile-card`}>
            <span className={styles.personalEmoji} style={{ color: '#1f2937', display: 'inline-flex', alignItems: 'center' }}><IconSparkle size={26} /></span>
            <h3>Gömda pärlan</h3>
            <p>De flesta turister missar byn Cala Figuera. Här finns inga stora hotell, ingen kommersiell turistindustri - bara vita hus, fiskebåtar och en atmosfär som tar dig tillbaka 50 år i tiden. Besök det tidigt på morgonen när fiskarna är ute.</p>
            <span className={styles.personalTag}>Santanyi · Off the beaten track</span>
          </div>
        </div>
      </div>
    </section>
  );
}
