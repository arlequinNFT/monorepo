import '../styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { store } from '../store/reducers';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin Painter</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
