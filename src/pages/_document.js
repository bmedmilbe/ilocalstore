import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            property="og:title"
            content="iLocalStore - Receive your item within 2 hours"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Fram a to Z you can buy and receive your item within 2 hours in LU1 Area"
          />
          <meta property="og:url" content="https://www.ilocalstore.com" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dybteyiju/image/upload/v1676350423/logo-color_-_Copy_g3cuup.png"
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
