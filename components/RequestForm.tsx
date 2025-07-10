'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { IMaskInput } from 'react-imask';
import styles from '@/styles/Modal.module.css';

interface RequestFormProps {
  readonly onSuccess: () => void;
}

export default function RequestForm({ onSuccess }: RequestFormProps) {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ-\s]/g, '');
    setName(lettersOnly);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.titleConnect}>
        Заполните форму и наш эксперт свяжется с вами.
      </h2>
      <input
        name="name"
        placeholder="Ваше имя"
        value={name}
        onChange={handleNameChange}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
      />
      <IMaskInput
        mask="+7 (000) 000-00-00"
        value={phone}
        onAccept={(value) => setPhone(value)}
        placeholder="Ваш номер телефона"
        name="phone"
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
