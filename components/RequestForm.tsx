'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@radix-ui/themes';
import styles from '@/styles/Modal.module.css';

interface RequestFormProps {
  onSuccess: () => void;
}

export default function RequestForm({ onSuccess }: RequestFormProps) {
  const [error, setError] = useState('');

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

      onSuccess();
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

  return (
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
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
      />
      <div className={styles.error}>{error}</div>
      <Button type="submit" className={styles.formButton}>
        Оставить заявку
      </Button>
    </form>
  );
}
