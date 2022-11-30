import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IconEth } from "@/components/IconEth";

type Props = {
  assets: any[];
};
export const NFTList = ({ assets }: Props) => {
  const router = useRouter();
  const { screen } = router.query;
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  useEffect(() => {
    setCurrentAssets((currentAssets) => assets);
  }, [assets]);

  return (
    <div
      className={`mb-10 grid w-full grid-cols-3 justify-center  overflow-hidden rounded-lg sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ${
        screen != "modal" && "lg:gap-3 xl:grid-cols-8 2xl:grid-cols-10"
      }`}
    >
      {currentAssets.map((asset, index) => (
        <div className="" key={asset.id}>
          <a
            href={asset.permalink}
            target="_blank"
            rel="noreferrer"
            className={`relative flex bg-gray-700 ${
              screen != "modal" && "overflow-hidden rounded "
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
              className="absolute top-1 right-1 z-20 h-[10px] w-[10px]"
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "10px",
              }}
            />
            {asset.image_thumbnail_url && (
              <Image
                src={asset.image_thumbnail_url}
                alt=""
                loading="lazy"
                width={300}
                height={300}
                className="w-full"
                quality={10}
                sizes="300px"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            )}
            <div className="absolute left-0 bottom-0 rounded-tr-lg bg-gray-800 bg-opacity-90 px-3 py-[2px]	">
              <div className="-ml-1 flex items-center gap-1 text-xs font-bold text-gray-400">
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
                  asset.last_sale_symbol == "WETH") && <IconEth />}
                {asset.last_sale_price / 1000000000000000000}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
