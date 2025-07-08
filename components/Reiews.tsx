'use client';
import React, { useState } from 'react';
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
      <div
        className={styles.reviewBlock}
        onClick={() => setIsOpen(true)}
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
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
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
                      alt="review"
                      className={styles.reviewImage}
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
