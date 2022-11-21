import React from "react";
import Image from "next/image";

const OGP = () => {
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
    <div className="flex w-full h-full">
      <div className="relative w-[1200px] h-[600px] font-digital">
        <div className="absolute left-0 top-0 w-full h-full">
          <Image src="/ogp-base.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="absolute left-[84px] top-[42px] flex flex-col w-[860px] h-[540px]">
          <div className="relative flex w-full h-full rounded-tr-[20px] overflow-hidden">
            <div className="relative w-full h-[270px]">
              <Image src="/ogp-bg.jpg" alt="" fill sizes="100vw" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col ml-[66px]">
            <h1 className="text-[70px] font-bold ogp-text-gradient mt-10 leading-tight -ml-1">
              # Illustrator
            </h1>
            <p className="text-xl font-light text-gray-300 tracking-[0.4em]">
              Tags
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OGP;
