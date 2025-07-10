'use client';
import { useCallback, useState } from 'react';
import styles from '@/styles/Reviews.module.css';

const mockReviews = [
  { id: 1, src: '/review_example.svg' },
  { id: 2, src: '/review_example.svg' },
  { id: 3, src: '/review_example.svg' },
];

export default function Reviews() {
  const [isOpen, setIsOpen] = useState(false);

  const memoizedOpen = useCallback(() => setIsOpen(true), []);
  const memoizedClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div
        className={styles.reviewBlock}
        onClick={memoizedOpen}
        onKeyDown={memoizedOpen}
        role='button'
      >
        <img
          src="/reviews_clear.svg"
          alt="reviews.svg"
          className={styles.image}
        />
        <img
          src="/reviews_hover.svg"
          alt="reviews.svg"
          className={styles.hover}
        />
      </div>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={memoizedClose}
          onKeyDown={memoizedClose}
          role="button"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="button"
          >
            {mockReviews.length === 0 ? (
              <p>Отзывов пока нет.</p>
            ) : (
              <div className={styles.reviewList}>
                {mockReviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <img
                      src={review.src}
                      alt="review"
                      className={styles.reviewImage}
                    />
                  </div>
                ))}
              </div>
            )}
            <button className={styles.closeButton} onClick={memoizedClose} />
          </div>
        </div>
      )}
    </>
  );
}
