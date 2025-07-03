'use client';

import { useState } from 'react';
import Modal from './Modal';
import RequestForm from './RequestForm';
import MyToast from './Toast';
import Header from './Header';
import styles from '@/styles/Header.module.css';

export default function ClientHeaderWrapper() {
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
      <Header>
        <button
          id="presentation"
          className={styles.button}
          onClick={() => setIsOpenModal(true)}
        >
          ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
        </button>
      </Header>

      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <RequestForm onSuccess={handleSuccess} />
        </Modal>
      )}

      {showToast && <MyToast open={showToast} setOpen={setShowToast} />}

      <div className={styles.row}></div>
    </>
  );
}
