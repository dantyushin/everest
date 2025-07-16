import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import styles from '@/styles/BaroCard.module.css';

interface BaroCardProps {
  id: number;
  img: string;
  alt: string;
  title: string;
  description: string;
  cost: string;
}
const BaroCard: React.FC<BaroCardProps> = ({
  id,
  img,
  alt,
  title,
  description,
  cost,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <img className={styles.image} src={img} alt={alt} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.row}>
        <p className={styles.cost}>{cost}</p>
        <Link href={`/equipment/${id}`}>
          <Button className={styles.button}>Купить</Button>
        </Link>
      </div>
    </div>
  );
};
export default BaroCard;
