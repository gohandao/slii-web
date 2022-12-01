import Image from "next/image";

import { totalmem } from "os";
import { MdVerified } from "react-icons/md";

type Props = {
  type?: "tag" | "user";
  background?: string;
  avatar?: string;
  title?: string;
  label?: string;
  verified?: boolean;
};
export const OgpDefault = ({
  type,
  background,
  avatar,
  title,
  label,
  verified = false,
}: Props) => {
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://nftotaku.xyz",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const new_title = (
    <>
      {title}{" "}
      {verified == true && (
        <MdVerified className="-mt-[2px] inline-block text-4xl text-gray-500" />
      )}
    </>
  );
  return (
    // <div className="flex w-full h-full">
    //   <div className="relative w-[1200px] h-[600px] font-outfit">
    //     <div className="absolute left-0 top-0 w-full h-full">
    //       <Image src="/ogp-base.jpg" layout="fill" />
    //     </div>
    //     <div className="absolute w-full h-full flex flex-col items-center justify-center">
    //       <h1 className="text-[70px] font-bold ogp-text-gradient mt-10">
    //         # Illustrator
    //       </h1>
    //       <p className="text-xl font-light text-[#545454] tracking-[0.4em]">
    //         Tags
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="font-digital relative h-[600px] w-[1200px]">
      <div className="absolute left-0 top-0 h-full w-full">
        {/* <img
          src={`https://weev.media/wp-content/uploads/2022/11/ogp-base.jpg`}
          className="image-fill"
        /> */}
        <Image
          src="https://weev.media/wp-content/uploads/2022/11/ogp-base.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>
      <div className="relative left-[84px] top-[44px] flex h-[540px] w-[860px] flex-col">
        <div className="relative flex h-full w-full overflow-hidden rounded-tr-[20px] opacity-40">
          <div className="relative h-[270px] w-full ">
            {background ? (
              <Image src={background} alt="" fill sizes="100vw" />
            ) : (
              <Image
                src="https://weev.media/wp-content/uploads/2022/11/ogp-bg.jpg"
                alt=""
                fill
                sizes="100vw"
              />
            )}
          </div>
        </div>
        {type == "user" ? (
          <>
            <div className="absolute left-[66px] top-[90px] -ml-[6px] flex h-[232px] w-[232px] items-center justify-center overflow-hidden rounded-full border-[6px] border-gray-700">
              {avatar ? (
                <Image src={avatar} alt="" fill sizes="300px" />
              ) : (
                <Image
                  src={`https://weev.media/wp-content/uploads/2022/11/default-avatar.jpg`}
                  alt=""
                  fill
                  sizes="300px"
                />
              )}
            </div>
            <div className="ml-[66px] flex h-full w-full max-w-full flex-col">
              <h1 className="ogp-text-gradient ellipsis mt-[54px] -ml-[6px] w-fit min-w-[0] max-w-[700px] text-[70px] font-bold leading-tight">
                {title ? new_title : "Not Found"}
              </h1>
              <p className="text-xl font-light tracking-[0.4em] text-gray-300">
                {label ? label : "NFT Collecter"}
              </p>
            </div>
          </>
        ) : (
          <div className="ml-[66px] flex h-full w-full flex-col">
            <h1 className="ogp-text-gradient mt-10 -ml-1 text-[70px] font-bold leading-snug">
              {title ? title : "Not Found"}
            </h1>
            <p className="text-xl font-light tracking-[0.4em] text-gray-300">
              Tags
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
