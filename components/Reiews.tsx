'use client';

import { useEffect, useState } from 'react';
import { mockReviews } from '@/data/reviews';
import styles from '@/styles/Reviews.module.css';

export default function Reviews() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div
        className={styles.reviewBlock}
        role="button"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
        tabIndex={0}
      >
        <img src="/reviews_clear.svg" alt="Отзывы" className={styles.image} />
        <img
          src="/reviews_hover.svg"
          alt=""
          className={styles.hover}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Закрыть модальное окно"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {mockReviews.length === 0 ? (
              <p>Отзывов пока нет.</p>
            ) : (
              <div className={styles.reviewList}>
                {mockReviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <img
                      src={review.src}
                      alt="Отзыв"
                      className={styles.reviewImage}
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label='Закрыть модальное окно'
            />
          </div>
        </div>
      )}
    </>
  );
}
