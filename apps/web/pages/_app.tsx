import '../styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

import Faq from '@components/faq/faq.component';
import Footer from '@components/footer/footer.component';
import Header from '@components/header/header.component';
import Intro from '@components/intro/intro.component';
import Roadmap from '@components/roadmap/roadmap.component';
import Team from '@components/team/team.component';
import WhatIsArlequin from '@components/what-is-arlequin/what-is-arlequin.component';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arlequin - The Artists Metaverse</title>
      </Head>
      <div className="bg-homepage bg-fixed bg-cover">
        <Header></Header>
        <Intro></Intro>
      </div>

      <WhatIsArlequin></WhatIsArlequin>

      <Roadmap></Roadmap>

      <Team></Team>
      <Faq></Faq>

      <div className="bg-homepage bg-fixed bg-cover">
        <Footer></Footer>
      </div>
    </>
  );
}

export default CustomApp;
