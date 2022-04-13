import '../styles/main.scss';
import '../configs/flow';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Layout from '../components/layout/layout';
import { ChakraProvider } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin: The Artists Metaverse</title>
      </Head>
      <Provider store={store}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
