'use client';

import { Button } from '@radix-ui/themes';
import styles from '@/styles/LearnMoreButton.module.css';

export default function LinkToPresentation({ children }: { children: string }) {
  const onClickLearnMore = () => {
    const button = document.getElementById('presentation');
    button!.click();
  };
  return (
    <Button className={styles.learnMore} onClick={onClickLearnMore}>
      {children}
    </Button>
  );
}
