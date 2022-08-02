/* pages/api/ogp.js */
import "@/styles/style.scss";
import "@/styles/globals.css";
import Head from "next/head";
import Image from "next/image";

import ReactDOM from "react-dom/server";
import * as playwright from "playwright-aws-lambda";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap");
  html, body {
    height: 100%;
    display: grid;
  }
.text-gradient {
    background: linear-gradient(90deg, #4ac7fa 0%, #e649f5 100%);
            background-clip: text;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
}
  .container {
    font-family: 'Outfit', sans-serif;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .background img {
    width: 100%;
    height: auto;
  }
  .text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 70px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 40px;
  }
  .subTitle {
    font-size: 24px;
    font-weight: light;
    font-weight: 300;
    color: #545454;
    letter-spacing: 0.4em;
  }
`;

const Content = (props) => (
  <html>
    <head>
      <style>{styles}</style>
    </head>
    <body>
      {/*<h1>{props.title}</h1>
      {props.subTitle && <p>{props.subTitle}</p>}
*/}
      <div className="container relative w-[1200px] h-[600px] font-outfit">
        <div className="background absolute left-0 top-0 w-full h-full">
          <img src="https://gachi.vercel.app/ogp-base.jpg" alt="" />
        </div>
        <div className="text absolute w-full h-full flex flex-col items-center justify-center">
          <h1 className="title text-[70px] font-bold text-gradient mt-10">
            {props.title}
          </h1>
          {props.subTitle && (
            <p className="subTitle text-xl font-light text-[#545454] tracking-[0.4em]">
              {props.subTitle}
            </p>
          )}
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
  res.end(image);
};
