'use client';

import { Button } from '@radix-ui/themes';
import styles from '@/styles/LearnMoreButton.module.css';

interface Props {
  readonly children: string;
}

export default function LinkToPresentation({ children }: Props) {
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
