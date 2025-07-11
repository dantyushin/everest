import { useCallback, useState } from 'react';

export function useFormCommon() {
  const [error, setError] = useState('');

  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 2000);
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ\-\s]/g, '');
    setName(lettersOnly);
  };

  return {
    error,
    showError,
    name,
    setName,
    phone,
    setPhone,
    handleNameChange,
  };
}
