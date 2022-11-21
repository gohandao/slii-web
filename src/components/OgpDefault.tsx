import React from "react";
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
  verified = true,
}: Props) => {
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const new_title = (
    <>
      {title}{" "}
      {verified == true && (
        <MdVerified className="-mt-[2px] text-4xl text-gray-500 inline-block" />
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
    <div className="relative w-[1200px] h-[600px] font-digital">
      <div className="absolute left-0 top-0 w-full h-full">
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
      <div className="relative left-[84px] top-[44px] flex flex-col w-[860px] h-[540px]">
        <div className="relative flex w-full h-full rounded-tr-[20px] overflow-hidden opacity-40">
          <div className="relative w-full h-[270px] ">
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
            <div className="absolute flex items-center justify-center left-[66px] top-[90px] w-[232px] h-[232px] rounded-full border-[6px] border-gray-700 overflow-hidden -ml-[6px]">
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
            <div className="w-full h-full flex flex-col ml-[66px] max-w-full">
              <h1 className="text-[70px] font-bold ogp-text-gradient mt-[54px] leading-tight -ml-[6px] w-fit ellipsis max-w-[700px] min-w-[0]">
                {title ? new_title : "Not Found"}
              </h1>
              <p className="text-xl font-light text-gray-300 tracking-[0.4em]">
                {label ? label : "NFT Collecter"}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col ml-[66px]">
            <h1 className="text-[70px] font-bold ogp-text-gradient mt-10 leading-snug -ml-1">
              {title ? title : "Not Found"}
            </h1>
            <p className="text-xl font-light text-gray-300 tracking-[0.4em]">
              Tags
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
