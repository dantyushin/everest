'use client';

import { useState } from 'react';
import styles from '@/styles/Reviews.module.css';

const mockReviews = [
  { id: 1, src: '/review_example.svg' },
  { id: 2, src: '/review_example.svg' },
  { id: 3, src: '/review_example.svg' },
];

export default function Reviews() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.reviewBlock}
        onClick={() => setIsOpen(true)}
      >
        <img src="/reviews_clear.svg" alt="Отзывы" className={styles.image} />
        <img
          src="/reviews_hover.svg"
          alt=""
          className={styles.hover}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
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
            />
          </div>
        </div>
      )}
    </>
  );
}
