'use client';

import { Dispatch, SetStateAction } from 'react';
import * as Toast from '@radix-ui/react-toast';
import styles from '@/styles/Toast.module.css';

interface ToastProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MyToast({ open, setOpen }: ToastProps) {
  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={styles.toastRoot}
          open={open}
          onOpenChange={setOpen}
          duration={3000}
        >
          <Toast.Title className={styles.toastTitle}>
            Заявка оформлена!
          </Toast.Title>
          <Toast.Action
            className={styles.toastAction}
            asChild
            altText="Закрыть"
          >
            <img
              src="/close_icon.svg"
              alt="close_icon.svg"
              className={styles.closeButton}
              onClick={() => setOpen(false)}
            />
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={styles.toastViewport} />
      </Toast.Provider>
    </>
  );
}
