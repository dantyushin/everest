import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешён' });
  }

  const { name, phone } = req.body;

  if (!name || !phone) {
    return res
      .status(400)
      .json({ message: 'Заполните все поля и попробуйте снова.' });
  }

  const patternOnName = /[A-ZА-Яa-zа-я\-]+/;
  const digits = phone.replace(/\D/g, '');
  const patternOnPhone = /^(7|8)\d{10}$/;

  if (!patternOnName.test(name) || !patternOnPhone.test(digits)) {
    return res
      .status(400)
      .json({ message: 'Заполните все поля правильно и попробуйте снова.' });
  }

  const now = new Date();
  const moscowTime = now.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour12: false,
  });

  const logLine = `${moscowTime} — Имя: ${name}, Номер телефона: ${phone}\n`;
  
  const filePath = path.join(process.cwd(), '/data/form_submissions.txt');

  fs.appendFile(filePath, logLine, (err) => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
      return res
        .status(500)
        .json({ message: 'Ошибка сервера при сохранении данных.' });
    }
    return res.status(200).json({ message: 'Заявка оформлена!' });
  });
}
