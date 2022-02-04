import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/OktaNeue/OktaNeue-Bold.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/OktaNeue/OktaNeue-Heavy.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/OktaNeue/OktaNeue-Light.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/OktaNeue/OktaNeue-Medium.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/OktaNeue/OktaNeue-Regular.otf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
