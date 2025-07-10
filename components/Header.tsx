import Link from 'next/link';
import styles from '@/styles/Header.module.css';

interface HeaderProps {
  readonly children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <img src="/logo.svg" alt="logo.svg" />
        </Link>
      </div>
      <div className={styles.contacts}>
        <a href="mailto:everest-baro@mail.ru" className={styles.email}>
          everest-baro@mail.ru
        </a>
        <a href="tel:+79111091399" className={styles.phone}>
          +7 (911) 109-13-99
        </a>
      </div>
      <nav className={styles.navList}>
        <li>
          <Link href={'/equipment'}>ОБОРУДОВАНИЕ</Link>
        </li>
        <li>
          <Link href={'/'}>ПРИМЕНЕНИЕ</Link>
        </li>
        <li>
          <Link href={'/'}>СТАТЬИ</Link>
        </li>
        <li>
          <Link href={'/'}>ПОКАЗАНИЯ</Link>
        </li>
        <li>
          <Link href={'/'}>О КОМПАНИИ</Link>
        </li>
        <li>
          <Link href={'/'}>КОНТАКТЫ</Link>
        </li>
      </nav>
      {children}
    </header>
  );
}
