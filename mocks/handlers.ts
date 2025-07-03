import { http, HttpResponse } from 'msw';

function parsePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');

  if (digits.startsWith('8')) {
    return digits.slice(1);
  } else if (digits.startsWith('7')) {
    return digits.slice(1);
  }

  return digits;
}

export const handlers = [
  http.post('/api/send', async ({ request }) => {
    const body = await request.json();
    const { name, phone } = body as { name: string; phone: string };

    if (!name || !phone) {
      return HttpResponse.json(
        { message: 'Заполните все поля и попробуйте снова.' },
        { status: 400 }
      );
    }

    const patternOnName = /[A-ZА-Яa-zа-я]+/;
    const digits = parsePhone(phone);
    const patternOnPhone = /(\d{10})/;

    if (!patternOnName.test(name) || !patternOnPhone.test(digits)) {
      return HttpResponse.json(
        { message: 'Заполните все поля правильно и попробуйте снова.' },
        { status: 400 }
      );
    }

    return HttpResponse.json({ message: 'Заявка оформлена!' }, { status: 200 });
  }),
];
