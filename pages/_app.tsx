import type { AppProps } from 'next/app';
import '@radix-ui/themes/styles.css';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import ClientHeaderWrapper from '@/components/ClientHeaderWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientHeaderWrapper />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
