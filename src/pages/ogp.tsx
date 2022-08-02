import React from "react";
import Image from "next/image";

const OGP = () => {
  return (
    <div className="flex w-full h-full">
      <div className="relative w-[1200px] h-[600px] font-outfit">
        <div className="absolute left-0 top-0 w-full h-full">
          <Image src="/ogp-base.jpg" layout="fill" />
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-[70px] font-bold text-gradient mt-10">
            # Illustrator
          </h1>
          <p className="text-xl font-light text-[#545454] tracking-[0.4em]">
            Tags
          </p>
        </div>
      </div>
    </div>
  );
};
export default OGP;
