import '../styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin | Paint • Vote • Earn</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
