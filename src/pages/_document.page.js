import Document, { Head, Html, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "@/libs/gtag";

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
          <link rel="stylesheet" href="https://use.typekit.net/xbj6ysr.css" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className="font-digital">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
