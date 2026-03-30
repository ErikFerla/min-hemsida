"use client";
import styles from './Gallery.module.css';
import { useState, useEffect, MouseEvent } from 'react';

type GalleryImage = {
  url: string;
  caption: string;
};

type GalleryProps = {
  images: GalleryImage[];
  title?: string;
};

export default function Gallery({ images, title = 'Bildgalleri' }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => {
          if (prev === null) return 0;
          return prev === 0 ? images.length - 1 : prev - 1;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => {
          if (prev === null) return 0;
          return prev === images.length - 1 ? 0 : prev + 1;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const goToNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.galleryTitle}>{title}</h2>
      
      <div className={styles.galleryGrid}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img
              src={image.url}
              alt={image.caption}
              className={styles.galleryImage}
            />
            <div className={styles.galleryOverlay}>
              <span className={styles.zoomIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedIndex !== null && (
        <div className={styles.lightbox} onClick={handleBackdropClick}>
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Stang lightbox"
          >
            ✕
          </button>

          <button
            className={styles.prevButton}
            onClick={goToPrevious}
            aria-label="Foreg bild"
          >
            ❮
          </button>

          <div className={styles.lightboxContent}>
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].caption}
              className={styles.lightboxImage}
            />
            <p className={styles.imageCaption}>{images[selectedIndex].caption}</p>
          </div>

          <button
            className={styles.nextButton}
            onClick={goToNext}
            aria-label="Nasta bild"
          >
            ❯
          </button>

          <div className={styles.imageCounter}>
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
