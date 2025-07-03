import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Section, Strong } from '@radix-ui/themes';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name');
    const phone = formData.get('phone');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ name, phone }),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message);
      }
      setSuccess(res.message);
      const timeout = setTimeout(() => {
        setSuccess('');
        clearTimeout(timeout);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        const timeout = setTimeout(() => {
          setError('');
          clearTimeout(timeout);
        }, 2000);
      } else {
        console.error('Неизвестная ошибка');
      }
    }
  };

  const onClickLearnMore = () => {
    const button = document.getElementById('presentation');
    button!.click();
  };
  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Барокамеры Эверест" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Strong>Барокамеры Эверест</Strong> - капсулы нового поколения
        </h1>
        <Button className={styles.learnMore} onClick={onClickLearnMore}>
          Узнать подробнее
        </Button>
        <Section>
          <ul className={styles.list}>
            <li>
              Изготовление wellness-оборудования по индивидуальным заказам
            </li>
            <li>Инновационная разработка бескаркасных портативных моделей</li>
            <li>Обучение работе специалистов</li>
            <li>Доставка по всей России</li>
          </ul>
        </Section>
        <Section className={styles.marketing}>
          <Button className={styles.button}>Заказать барокамеру</Button>
          <h2 className={styles.description}>
            Компания “Эверест” - официальный производитель кислородных камер
            нового поколения
          </h2>
          <Section className={styles.advantages}>
            <div className={styles.cost}>
              <img src={'/ruble.svg'} />
              <div>Привлекательная стоимость и высокое качество продукции</div>
            </div>
            <div className={styles.production}>
              <img src={'/production.svg'} />
              <div>Собственное производство</div>
            </div>
            <div className={styles.consulting}>
              <img src={'/consulting.svg'} />
              <div>Консультации клиента при подборе оборудования</div>
            </div>
            <div className={styles.area}>
              <img src={'/area.svg'} />
              <div className={styles.strongText}>350 м²</div>
              <div>Производственных площадей</div>
            </div>
            <div className={styles.projects}>
              <img src={'/projects.svg'} />
              <div className={styles.strongText}>247</div>
              <div>Реализованных проектов</div>
            </div>
            <div className={styles.years}>
              <img src={'/years.svg'} />
              <div className={styles.strongText}>5 лет</div>
              <div>Опыта работы компании</div>
            </div>
          </Section>
        </Section>
        <Section className={styles.links}>
          <Link href="/">
            <h3 className={styles.moreAbout}>Подробнее о компании</h3>
          </Link>
          <Link href="/">
            <h3 className={styles.allBaros}>Все барокамеры</h3>
          </Link>
        </Section>
        <Section className={styles.methods}>
          <div className={styles.methodsLeft}>
            <h2 className={styles.methodsTitle}>
              Эффективные и проверенные методики профилактики, оздоровления,
              лечения и реабелитации
            </h2>
            <h3 className={styles.methodsDescription}>
              Доказанная эффективность во многих областях, в том числе:
            </h3>
            <div className={styles.methodsNames}>
              <div className={styles.methodName}>Лечение кислородом</div>
              <div className={styles.methodName}>Медицина</div>
              <div className={styles.methodName}>ГБО терапия</div>
              <div className={styles.methodName}>Беременность</div>
              <div className={styles.methodName}>COVID-19</div>
              <div className={styles.methodName}>ГБО</div>
              <div className={styles.methodName}>Сон</div>
              <div className={styles.methodName}>Реабилитация после ковида</div>
              <div className={styles.methodName}>Процедура для детей</div>
            </div>
          </div>
          <div className={styles.methodsImages}>
            <div className={styles.methodImage}>
              Помощь
              <br /> в косметологии
            </div>
            <div className={styles.methodImage}>
              Кислородная капсула при беременности
            </div>
            <div className={styles.methodImage}>
              Показания и противопоказания
            </div>
            <div className={styles.methodImage}>
              Спорт и фитнес
              <br />с барокамерой
            </div>
          </div>
        </Section>
        <Section className={styles.challenges}>
          <h2 className={styles.titleChallenges}>
            Барокамеры Эверест успешно прошли испытания и соответствуют всем
            стандартам
          </h2>
          <h3 className={styles.descriptionChallenges}>
            Вся необходимая документация для использования в
            лечебно-профилактических учереждениях
          </h3>
          <img
            src={'/background_challenges.svg'}
            className={styles.challengesImages}
          />
        </Section>
        <Section className={styles.connect}>
          <h2 className={styles.titleConnect}>
            Получите бесплатную консультацию от эксперта
          </h2>
          <form className={styles.form} action={handleSubmit}>
            <input
              name="name"
              placeholder="Ваше имя"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
            <input
              name="phone"
              placeholder="Ваш номер телефона"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
            <div className={styles.message}>
              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>{success}</p>}
            </div>
            <Button type="submit" className={styles.formButton}>
              Оставить заявку
            </Button>
          </form>
          <img
            src="/connect.svg"
            alt="connect.svg"
            className={styles.imageConnect}
          />
        </Section>
      </main>
    </>
  );
}
