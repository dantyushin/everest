import { FormEvent, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Button } from '@radix-ui/themes';
import styles from '@/styles/ConnectForm.module.css';

interface FormProps {
  onSuccess?: () => void;
}

export default function ConnectForm({ onSuccess }: FormProps) {
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
      if (onSuccess) onSuccess();

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

    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ\-\s]/g, '');
    setName(lettersOnly);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <div className={styles.message}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
      <Button type="submit" className={styles.formButton}>
        Оставить заявку
      </Button>
    </form>
  );
}
