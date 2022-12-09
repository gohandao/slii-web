import Image from "next/image";
import { useEffect, useState } from "react";

import { IconEth } from "@/components/IconEth";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";

type Props = {
  assets: any[];
};
export const NFTList = ({ assets }: Props) => {
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  useEffect(() => {
    setCurrentAssets(() => {
      return assets;
    });
  }, [assets]);

  return (
    <div
      className={`grid w-full grid-cols-3 justify-center  overflow-hidden rounded-lg sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10`}
    >
      {currentAssets.map((asset: any) => {
        return (
          <div className="" key={asset.id}>
            <a href={asset.permalink} target="_blank" rel="noreferrer" className={`relative flex bg-gray-700`}>
              <div className="os-triangle absolute right-0 top-0 z-10"></div>
              <Image
                src="/icon-opensea.svg"
                alt=""
                loading="lazy"
                width={10}
                height={10}
                className="absolute top-1 right-1 z-10 h-[10px] w-[10px]"
                style={{
                  height: "10px",
                  maxWidth: "100%",
                  width: "auto",
                }}
              />
              <div className="square_wrap">
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
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              {asset.last_sale_price && asset.last_sale_price != 0 && (
                <div className="absolute left-0 bottom-0 rounded-tr-lg bg-gray-800 bg-opacity-90 px-3 py-[2px]	">
                  <div className="-ml-1 flex items-center gap-1 text-xs font-bold text-gray-400">
                    <span className="">cf.</span>
                    {(asset.last_sale_symbol == "ETH" || asset.last_sale_symbol == "WETH") && <IconEth />}
                    {abbreviateNumber(asset.last_sale_price / 1000000000000000000)}
                  </div>
                </div>
              )}
            </a>
          </div>
        );
      })}
    </div>
  );
};
