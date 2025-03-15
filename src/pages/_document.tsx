import { Head, NextScript, Html } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <title>Plantly</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <body>
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
