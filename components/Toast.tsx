'use client';

import { Dispatch, SetStateAction } from 'react';
import * as Toast from '@radix-ui/react-toast';
import styles from '@/styles/Toast.module.css';

interface ToastProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: string;
}

export default function MyToast({
  open,
  setOpen,
  children,
}: Readonly<ToastProps>) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={styles.toastRoot}
        open={open}
        onOpenChange={setOpen}
        duration={3000}
      >
        <Toast.Title className={styles.toastTitle}>{children}</Toast.Title>
        <Toast.Action className={styles.toastAction} asChild altText="Закрыть">
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setOpen(false)}
          >
            <img
              src="/close_icon.svg"
              alt="Закрыть"
              className={styles.closeIcon}
            />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
