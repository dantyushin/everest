'use client';

import { FormEvent, useState } from 'react';
import { Button, Section } from '@radix-ui/themes';
import styles from '@/styles/ConnectMain.module.css';
import { IMaskInput } from 'react-imask';

export default function Connect() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState('');

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

      setSuccess(res.message);
      setName('');
      setPhone('');

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    setName(lettersOnly);
  };
  return (
    <Section className={styles.connect}>
      <h2 className={styles.titleConnect}>
        Получите бесплатную консультацию от эксперта
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Ваше имя"
          value={name}
          onChange={handleNameChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        <IMaskInput
          mask="+7 (000) 000-00-00"
          value={phone}
          onAccept={(value) => setPhone(value)}
          placeholder="Ваш номер телефона"
          name="phone"
          type="tel"
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
