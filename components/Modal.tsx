import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Callout, Section } from '@radix-ui/themes';
import styles from '@/styles/Modal.module.css';
import MyToast from './Toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message);
      }

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        const timeout = setTimeout(() => {
          setError('');
          clearTimeout(timeout);
        }, 2000);
      } else {
        console.error('Неизвестная ошибка');
      }
    }
  };

  if (!isOpen) return null;
  if (isSuccess) {
    return createPortal(
      <div onClick={onClose}>
        <MyToast open={isSuccess} setOpen={onClose} />
      </div>,
      document.getElementById('modal-root')!
    );
  }

  return createPortal(
    <Section className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img
          src="/close_icon.svg"
          alt="close_icon.svg"
          className={styles.closeButton}
          onClick={onClose}
        />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titleConnect}>
            Заполните форму и наш эксперт свяжется с вами.
          </h2>
          <input
            name="name"
            placeholder="Ваше имя"
            className={`${styles.input} ${error ? styles.errorInput : ''}`}
          />
          <input
            name="phone"
            placeholder="Ваш номер телефона"
            type="tel"
            defaultValue={'+7'}
            className={`${styles.input} ${error ? styles.errorInput : ''}`}
          />
          <div className={styles.error}>{error}</div>
          <Button type="submit" className={styles.formButton}>
            Оставить заявку
          </Button>
        </form>
      </div>
    </Section>,
    document.getElementById('modal-root')!
  );
}
