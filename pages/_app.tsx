import type { AppProps } from 'next/app';
import '@radix-ui/themes/styles.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('../mocks').then(({ startMockWorker }) => {
        startMockWorker();
      });
    }
  }, []);
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
