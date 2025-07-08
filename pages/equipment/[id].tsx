import { useRouter } from 'next/router';
import { barocams } from '@/data/barocams';
import { Button, Section } from '@radix-ui/themes';
import styles from '@/styles/EquipmentDetail.module.css';
import Reviews from '@/components/Reiews';
import ConnectForm from '@/components/ConnectForm';
import ReviewFormWithModal from '@/components/ReviewForm';
import Head from 'next/head';

export default function EquipmentDetail() {
  const router = useRouter();
  const { id } = router.query;

  const barocam = barocams.find((item) => item.id === Number(id));
  const { title, description, cost, img, images, information, video } =
    barocam || {};
  if (!barocam) {
    return <p>Барокамера не найдена</p>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Section className={styles.detail}>
        <div className={styles.images}>
          <img src={img} alt="" className={styles.mainImage} />
          <div className={styles.minImages}>
            {images?.map((image) => (
              <img
                key={image}
                src={image}
                alt={barocam.title}
                className={styles.image}
              />
            ))}
          </div>
        </div>
        <Section className={styles.description}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.descriptionTitles}>{description}</h3>
          <h3 className={styles.descriptionTitles}>
            Принцип работы барокамеры
          </h3>
          <p className={styles.principle}>{information?.principle}</p>
          {information?.characters.length ? (
            <h3 className={styles.descriptionTitles}>Характеристики</h3>
          ) : null}
          <ul className={styles.list}>
            {information?.characters.map((character) => (
              <li key={character} className={styles.character}>
                - {character}
              </li>
            ))}
          </ul>
          <div className={styles.cost}>{cost}</div>
        </Section>
        <Section className={styles.reviews}>
          <div className={styles.texts}>
            <h4 className={styles.review}>Отзывы клиентов</h4>
            <ReviewFormWithModal />
            <h4 className={styles.review}>Наши социальные сети</h4>
          </div>
          <div className={styles.socials}>
            <div className={styles.reviewsModal}>
              <Reviews />
            </div>
            <div className={styles.qrCodes}>
              <a href="https://vk.com/everest.baro" target="_blank">
                <img src="/qr_to_vk.svg" alt="https://vk.com/everest.baro" />
              </a>
              <a href="https://www.youtube.com/@everest-baro" target="_blank">
                <img
                  src="/qr_to_youtube.svg"
                  alt="https://www.youtube.com/@everest-baro"
                />
              </a>
              <a href="https://rutube.ru/channel/32282876/" target="_blank">
                <img
                  src="/qr_to_rutube.svg"
                  alt="https://rutube.ru/channel/32282876/"
                />
              </a>
            </div>
          </div>
        </Section>
        <Section className={styles.presentation}>
          <h4 className={styles.presentationTitle}>Видеопрезентация</h4>
          <div>
            <iframe src={video} className={styles.video} />
          </div>
          <h4 className={styles.presentationTitle}>
            Получите бесплатную консультацию от эксперта
          </h4>
          <div className={styles.form}>
            <ConnectForm />
          </div>
        </Section>
      </Section>
    </>
  );
}
