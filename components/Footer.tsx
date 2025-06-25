import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.schedule}>
        <span className={styles.workingDays}>Пн-Пт</span>
        <span className={styles.workingHours}>8:00 - 19:00</span>
        <div className={styles.location}>
          Россия, Санкт-Петербург, <br />
          пр. Большевиков, д. 3, корп. 1
        </div>
      </div>
      <div className={styles.social}>
        <div className={styles.links}>
          <Link href={'/'}>
            <Image src={'/telegram.svg'} alt={'logo'} width={44} height={36} />
          </Link>
          <Link href={'/'}>
            <Image src={'/whatsapp.svg'} alt={'logo'} width={44} height={43} />
          </Link>
          <Link href={'/'}>
            <Image src={'/email.svg'} alt={'logo'} width={46} height={37} />
          </Link>
        </div>
        <div className={styles.license}>(c) ООО “Эверест” 2011-2024</div>
      </div>
      <div className={styles.contacts}>
        <a href='mailto:everest-baro@mail.ru' className={styles.email}>everest-baro@mail.ru</a>
        <a href='tel:+79111091399' className={styles.phone}>+7 (911) 109-13-99</a>
      </div>
    </footer>
  );
}
