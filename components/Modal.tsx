'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal} onClick={onClose} role="button">
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="button"
      >
        <img
          src="/close_icon.svg"
          alt="close_icon.svg"
          onClick={onClose}
          className={styles.closeButton}
          role='button'
        />
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
