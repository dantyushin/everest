import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Барокамеры Эверест" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="svg" href="/logo.svg" />
      </Head>
      <main className={styles.main}>
        
      </main>
    </>
  );
}
