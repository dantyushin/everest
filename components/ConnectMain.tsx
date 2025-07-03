'use client';

import { useState } from 'react';
import { Button, Section } from '@radix-ui/themes';
import styles from '@/styles/ConnectMain.module.css';

export default function Connect() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name');
    const phone = formData.get('phone');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ name, phone }),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message);
      }
      setSuccess(res.message);
      const timeout = setTimeout(() => {
        setSuccess('');
        clearTimeout(timeout);
      }, 2000);
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
    <Section className={styles.connect}>
      <h2 className={styles.titleConnect}>
        Получите бесплатную консультацию от эксперта
      </h2>
      <form className={styles.form} action={handleSubmit}>
        <input
          name="name"
          placeholder="Ваше имя"
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        <input
          name="phone"
          placeholder="Ваш номер телефона"
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        <div className={styles.message}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
        <Button type="submit" className={styles.formButton}>
          Оставить заявку
        </Button>
      </form>
      <img
        src="/connect.svg"
        alt="connect.svg"
        className={styles.imageConnect}
      />
    </Section>
  );
}
