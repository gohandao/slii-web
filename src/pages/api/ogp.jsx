/* pages/api/ogp.js */
import "@/styles/style.scss";
import "@/styles/ogp.scss";
import "@/styles/globals.css";
import { OgpDefault } from "@/components/OgpDefault";
import Head from "next/head";
import Image from "next/legacy/image";
import Script from "next/script";

import ReactDOM from "react-dom/server";
import * as playwright from "playwright-aws-lambda";

const styles = `
  @import url("https://use.typekit.net/xbj6ysr.css");
  html, body {
    height: 100%;
    display: grid;
  }
  .font-digital {
    // font-weight: 400;
    font-style: normal;
    font-weight: 700;
    font-family: lores-12, sans-serif;
}
.ogp-text-gradient {
    //background: linear-gradient(to right, #ee9ca7, #ffdde1, #2193b0, #6dd5ed);
    // background: linear-gradient(90deg, #4ac7fa 0%, #e649f5 100%);
    background: linear-gradient(90deg, #4ac7fa 0%, #e649f5 100%);
            background-clip: text;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
    // background-size: 300%;
    -webkit-text-fill-color: transparent;
}
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  // .container {
  //   font-family: 'Outfit', sans-serif;
  //   position: relative;
  //   width: 100%;
  //   height: 100%;
  // }
`;

const Content = (props) => (
  <>
    <Head>
      <style>{styles}</style>
    </Head>
    <body>
      <Script src="https://cdn.tailwindcss.com"></Script>
      {/*<h1>{props.title}</h1>
      {props.subTitle && <p>{props.subTitle}</p>}
*/}
      <div className="container relative w-[1200px] h-[600px] font-digital">
        {/* <div className="background absolute left-0 top-0 w-full h-full">
          <img src="https://gachi-collection.vercel.app/ogp-base.jpg" alt="" />
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
        </div> */}
        <OgpDefault
          type={props.type}
          title={props.title}
          label={props.label}
          avatar={props.avatar}
          background={props.background}
          verified={props.verified}
        />
      </div>
    </body>
  </>
);

export const OGPImage = async (req, res) => {
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
export default OGPImage;
