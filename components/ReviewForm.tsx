'use client';

import { FormEvent, useCallback, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Button } from '@radix-ui/themes';
import Modal from './Modal';
import styles from '@/styles/ReviewForm.module.css';
import MyToast from './Toast';
import { useFormCommon } from '@/hooks/useFormCommon';

interface ReviewFormProps {
  readonly onSuccess: () => void;
}

export default function ReviewFormWithModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSuccess = () => {
    setIsOpenModal(false);
    setShowToast(true);
    const timeout = setTimeout(() => {
      setShowToast(false);
      clearTimeout(timeout);
    }, 3000);
  };

  return (
    <>
      <Button
        className={styles.buttonReview}
        onClick={() => setIsOpenModal(true)}
      >
        Оставить отзыв
      </Button>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <ReviewForm onSuccess={handleSuccess} />
        </Modal>
      )}
      {showToast && (
        <MyToast open={showToast} setOpen={setShowToast}>
          Спасибо за отзыв!
        </MyToast>
      )}
    </>
  );
}

function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { error, showError, name, phone, setPhone, handleNameChange } =
    useFormCommon();
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, title, text }),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message);
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        console.error('Неизвестная ошибка');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Оставить отзыв</h2>
      <input
        name="name"
        placeholder="Ваше имя"
        autoComplete="name"
        value={name}
        onChange={handleNameChange}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <IMaskInput
        mask="+7 (000) 000-00-00"
        value={phone}
        onAccept={(value) => setPhone(value)}
        placeholder="Ваш номер телефона"
        autoComplete="tel"
        name="phone"
        type="tel"
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <input
        type="text"
        name="title"
        placeholder="Заголовок отзыва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <textarea
        name="text"
        id="text-of-review"
        placeholder="Текст отзыва"
        className={`${styles.textarea} ${error ? styles.inputError : ''}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.message}>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <Button type="submit" className={styles.formButton}>
        Оставить отзыв
      </Button>
    </form>
  );
}
