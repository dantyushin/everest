import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header>
      <div className={styles.logo}></div>
      <div className={styles.contacts}>
        <span className={styles.email}></span>
        <span className={styles.phone}></span>
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
    </header>
  );
}
