import '../styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store/reducers';
import '../configs/flow';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin | Genesis Drop</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default CustomApp;
