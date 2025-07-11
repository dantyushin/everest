import { Section } from '@radix-ui/themes';
import BaroCard from '@/components/BaroCard';
import { mockBarocams } from '@/data/barocams';
import styles from '@/styles/Equipment.module.css';

export default function Equipment() {
  return (
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
  );
}
