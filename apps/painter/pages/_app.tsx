import '../styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { BrowserView, MobileView } from 'react-device-detect';
import { Provider } from 'react-redux';
import '../configs/flow';

import { store } from '../store/store';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin Painter</title>
      </Head>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserView className="h-full">
            <Component {...pageProps} />
          </BrowserView>
          <MobileView>
            <div className="bg-primary h-screen grid-rows-[auto 1fr]">
              <header>
                <div className="w-full p-4 ">
                  <a
                    href="http://arlequin.gg/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-rainbow font-extrabold text-5xl"
                  >
                    Arlequin
                  </a>
                </div>
              </header>

              <main className="flex items-center justify-center">
                <p className="text-white text-3xl">
                  Experience not yet available on mobile
                </p>
              </main>
            </div>
          </MobileView>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default App;
