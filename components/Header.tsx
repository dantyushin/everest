import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href={'/'}>
            <Image src={'/logo.svg'} alt={'logo'} width={60} height={33.33} />
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
            <Link href={'/application'}>ПРИМЕНЕНИЕ</Link>
          </li>
          <li>
            <Link href={'/articles'}>СТАТЬИ</Link>
          </li>
          <li>
            <Link href={'/specifications'}>ПОКАЗАНИЯ</Link>
          </li>
          <li>
            <Link href={'/about'}>О КОМПАНИИ</Link>
          </li>
          <li>
            <Link href={'/contacts'}>КОНТАКТЫ</Link>
          </li>
        </nav>
        <button className={styles.button}>ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ</button>
      </header>
      <div className={styles.row}></div>
    </>
  );
}
