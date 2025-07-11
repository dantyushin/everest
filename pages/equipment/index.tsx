import Head from 'next/head';
import { Section } from '@radix-ui/themes';
import BaroCard from '@/components/BaroCard';
import { mockBarocams } from '@/data/barocams';
import styles from '@/styles/Equipment.module.css';

export default function Equipment() {
  return (
    <>
      <Head>
        <title>Оборудование</title>
        <meta name="description" content="Барокамеры Эверест" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Section className={styles.equipment}>
        <h1 className={styles.title}>Кислородные барокамеры Эверест</h1>
        <div className={styles.cards}>
          {mockBarocams.map(({ id, title, description, cost, img }) => (
            <BaroCard
              key={id}
              id={id}
              img={img}
              alt={title}
              title={title}
              description={description}
              cost={cost}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
