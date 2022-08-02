/* pages/api/ogp.js */
import "@/styles/style.scss";
import "@/styles/globals.css";
import Head from "next/head";
import Image from "next/image";

import ReactDOM from "react-dom/server";
import * as playwright from "playwright-aws-lambda";

const styles = `
  html, body {
    height: 100%;
    display: grid;
  }

  h1 { margin: auto }
`;

const Content = (props) => (
  <html>
    <Head></Head>
    <body>
      {/*<h1>{props.title}</h1>
      {props.subTitle && <p>{props.subTitle}</p>}
*/}
      <div className="flex w-full h-full">
        <div className="relative w-[1200px] h-[600px] font-outfit">
          <div className="absolute left-0 top-0 w-full h-full">
            <Image src="https://gachi.vercel.app/ogp-base.jpg" layout="fill" />
          </div>
          <div className="absolute w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-[70px] font-bold text-gradient mt-10">
              {props.title}
            </h1>
            {props.subTitle && (
              <p className="text-xl font-light text-[#545454] tracking-[0.4em]">
                {props.subTitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </body>
  </html>
);

export default async (req, res) => {
  // サイズの設定
  const { title, subTitle } = req.query;
  const viewport = { width: 1200, height: 630 };

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium();
  const page = await browser.newPage({ viewport });

  // HTMLの生成
  const props = { title, subTitle };
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
  const html = `<!doctype html>${markup}`;

  // HTMLをセットして、ページの読み込み完了を待つ
  //await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.setContent(html, { waitUntil: "load" });

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: "png" });
  await browser.close();

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  // Content Type を設定
  res.setHeader("Content-Type", "image/png");

  // レスポンスを返す
  //res.end(image);
  res.end(<Content {...props} />);
};
