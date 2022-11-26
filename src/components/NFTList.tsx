import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  assets: any[];
};
export const NFTList = ({ assets }: Props) => {
  const router = useRouter();
  const { screen } = router.query;
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  useEffect(() => {
    console.log("worked");

    setCurrentAssets((currentAssets) => assets);
  }, [assets]);

  const Hyphen = () => {
    return <span className="text-gray-400">-</span>;
  };
  const EthIcon = () => {
    return (
      <div className="w-4 flex items-center">
        <Image
          src="/icon-eth.svg"
          width={16}
          height={16}
          alt=""
          className=""
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  };
  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6  w-full justify-center mb-10 overflow-hidden rounded-lg ${
        screen != "modal" && "xl:grid-cols-8 2xl:grid-cols-10 lg:gap-3"
      }`}
    >
      {currentAssets.map((asset, index) => (
        <div className="" key={asset.id}>
          <a
            href={asset.permalink}
            target="_blank"
            rel="noreferrer"
            className={`relative flex bg-gray-700 ${
              screen != "modal" && "rounded overflow-hidden "
            }`}
          >
            <div className="os-triangle absolute right-0 top-0 z-10"></div>
            {/* <img
              src="/icon-opensea.svg"
              className="absolute top-1 right-1 w-[10px] h-[10px] z-20"
            /> */}
            <Image
              src="/icon-opensea.svg"
              alt=""
              loading="lazy"
              width={10}
              height={10}
              className="absolute top-1 right-1 w-[10px] h-[10px] z-20"
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "10px",
              }}
            />
            <Image
              src={asset.image_thumbnail_url}
              alt=""
              loading="lazy"
              width={300}
              height={300}
              className="w-full"
              quality={10}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />

            <div className="absolute left-0 bottom-0 px-3 py-[2px] bg-gray-800 rounded-tr-lg bg-opacity-90	">
              <div className="flex items-center gap-1 text-gray-400 font-bold -ml-1 text-xs">
                <span className="">
                  Last
                  <span
                    className={`hidden ${screen != "modal" && "sm:inline "}`}
                  >
                    {" "}
                    Price
                  </span>
                </span>
                {(asset.last_sale_symbol == "ETH" ||
                  asset.last_sale_symbol == "WETH") && <EthIcon />}
                {asset.last_sale_price / 1000000000000000000}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
