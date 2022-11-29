/* pages/api/ogp.js */
import "@/styles/ogp.scss";
import type { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { MdVerified } from "react-icons/md";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};
type Data = {
  name: string;
};
const font = fetch(
  new URL("../../assets/PressStart2P-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const OGPImage = async (
  req: NextRequest,
  res: NextApiResponse<Data>
) => {
  const fontData = await font;

  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : undefined;
    const hasLabel = searchParams.has("label");
    const label = hasLabel
      ? searchParams.get("label")?.slice(0, 100)
      : undefined;
    const hasType = searchParams.has("type");
    const type = hasType ? searchParams.get("type")?.slice(0, 100) : undefined;
    const hasAvatar = searchParams.has("avatar");
    const avatar = hasAvatar ? searchParams.get("avatar") : undefined;
    const hasBackground = searchParams.has("background");
    const background = hasBackground
      ? searchParams.get("background")?.slice(0, 100)
      : undefined;
    const hasVerified = searchParams.has("verified");
    const verified = hasVerified ? searchParams.get("verified") : undefined;

    const new_title = (
      <>
        {title}{" "}
        {verified == "true" &&
          // <MdVerified tw="-mt-[2px] text-4xl text-gray-500 inline-block" />
          ""}
      </>
    );
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            fontFamily: "lores-12",
            fontWeight: "700",
          }}
        >
          <div tw="flex absolute left-0 top-0 w-full h-full">
            <img
              src={`https://weev.media/wp-content/uploads/2022/11/ogp-base.jpg`}
              tw="image-fill"
            />
          </div>
          <div tw="font-digital relative left-[84px] top-[44px] flex flex-col w-[860px] h-[540px] z-10">
            <div tw="relative flex w-full h-[270px] rounded-tr-[20px] overflow-hidden opacity-40">
              <div
                tw="relative flex w-full h-full "
                style={{
                  height: "270px",
                }}
              >
                {background ? (
                  <img src={background} alt="" tw="flex" />
                ) : (
                  <img
                    src="https://weev.media/wp-content/uploads/2022/11/ogp-bg.jpg"
                    alt=""
                    tw=""
                  />
                )}
              </div>
            </div>
            {type == "user" ? (
              <>
                <div tw="absolute flex flex-col items-center justify-center left-[60px] -top-[180px] w-[220px] h-[220px] rounded-full border-[6px] border-gray-700 overflow-hidden -ml-[6px] object-cover">
                  {avatar ? (
                    <img src={avatar} alt="" tw="max-w-full max-h-full" />
                  ) : (
                    <img
                      src={`https://weev.media/wp-content/uploads/2022/11/default-avatar.jpg`}
                      alt=""
                      tw="max-w-full max-h-full"
                    />
                  )}
                </div>
                <div tw="w-full h-full flex flex-col ml-[66px] max-w-full">
                  <h1
                    tw="flex text-[60px] font-bold ogp-text-gradient pt-[80px] leading-tight -ml-[6px] w-fit ellipsis max-w-[700px] min-w-[0]"
                    style={{
                      background:
                        "linear-gradient(90deg, #4ac7fa 0%, #e649f5 100%)",
                      color: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {title ? new_title : "Not Found"}{" "}
                    {verified == "true" && (
                      <MdVerified className="ml-1 inline text-xl text-gray-500" />
                    )}
                  </h1>
                  <p tw="-mt-1 flex text-xl font-light text-gray-300 tracking-[0.4em]">
                    {label ? label : "NFT Collecter"}
                  </p>
                </div>
              </>
            ) : (
              <div tw="flex flex-col ml-[66px]">
                <h1
                  tw="flex text-[60px] font-bold ogp-text-gradient pt-12 leading-snug -ml-1"
                  style={{
                    background:
                      "linear-gradient(90deg, #4ac7fa 0%, #e649f5 100%)",
                    color: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {title ? title : "Not Found"}
                </h1>
                <p tw="-mt-1 flex text-xl text-gray-300 ">Tags</p>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Press Start 2P",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response("OGP画像の生成に失敗", { status: 500 });
  }
};
export default OGPImage;
