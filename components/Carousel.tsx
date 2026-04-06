'use client';
import { useRef } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  title: string;
  label?: string;
  children: React.ReactNode[];
}

export default function Carousel({ title, label, children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carousel} style={{ background: '#EDE4D8' }}>
      {label && <p className="section-label" style={{ padding: '0 60px', color: '#0E7490' }}>{label}</p>}
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle} style={{ color: '#1F2937' }}>{title}</h2>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll('left')} aria-label="Föregående">&#8592;</button>
          <button className={styles.arrow} onClick={() => scroll('right')} aria-label="Nästa">&#8594;</button>
        </div>
      </div>
      <div className="section-divider" style={{ margin: '0 60px 24px' }}></div>
      <div className={styles.track} ref={scrollRef}>
        {children.map((child, i) => (
          <div key={i} className={styles.slide}>{child}</div>
        ))}
      </div>
    </div>
  );
}
