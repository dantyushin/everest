import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from './Modal';
import styles from '@/styles/Header.module.css';
import Head from 'next/head';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Head>
      <link rel="icon" href="/logo.png" />
    </Head>
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
            <Link href={'/'}>ОБОРУДОВАНИЕ</Link>
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
        <button
          id="presentation"
          className={styles.button}
          onClick={() => setIsOpen(true)}
        >
          ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </header>
      <div className={styles.row}></div>
    </>
  );
}
