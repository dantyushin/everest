import type { AppProps } from 'next/app';
import '@radix-ui/themes/styles.css';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import ClientHeaderWrapper from '@/components/ClientHeaderWrapper';

if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
) {
  import('../mocks').then(({ startMockWorker }) => {
    startMockWorker();
  });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientHeaderWrapper />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
