import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import Moment from "react-moment";

import { abbreviateNumber } from "@/utilities/abbreviateNumber";

export const CollectionAssets = ({ collectionAssets }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full justify-center">
      {collectionAssets &&
        collectionAssets.map((collectionAsset: any) => (
          // <Link key={collectionAsset.id} href={collectionAsset.asset.permalink}>
          <a
            key={collectionAsset.id}
            target="_blank"
            href={collectionAsset.asset.permalink}
            className="relative border border-gray-700 rounded bg-gray-800 overflow-hidden transition-all duration-200 transform hover:-translate-y-1"
            rel="noreferrer"
          >
            <div className="absolute right-0 top-0 rounded-bl-full bg-blue-500 z-10 w-6 h-6 flex items-center justify-center pl-[6px] pb-1">
              <Image src="/icon-opensea.svg" width={12} height={12} alt="" />
            </div>
            <div className="relative object-cover w-full h-auto overflow-hidden mb-2">
              {collectionAsset.asset.image_thumbnail_url && (
                <Image
                  src={collectionAsset.asset.image_thumbnail_url}
                  layout="fill"
                  alt=""
                  quality={10}
                />

                // <img src={collectionAsset.asset.image_thumbnail_url} alt="" />
              )}
            </div>
            <div className="px-4 pt-1 pb-3">
              <h4 className="text-gray-100 mb-2">
                {collectionAsset.asset.name}
              </h4>
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="flex item-center gap-1 text-sm text-gray-100 -ml-1">
                    {collectionAsset.payment_token &&
                      collectionAsset.payment_token.symbol == "ETH" && (
                        <Image
                          src="/icon-eth.svg"
                          width={16}
                          height={16}
                          alt=""
                        />
                      )}
                    {collectionAsset.payment_token
                      ? Number(
                          collectionAsset.payment_token.eth_price
                        ).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-400">End date</p>
                  <p className="text-sm text-gray-300">
                    {collectionAsset.duration ? (
                      <Moment
                        format="DD.MM.YYYY"
                        add={{ seconds: collectionAsset.duration }}
                      >
                        {collectionAsset.event_timestamp}
                      </Moment>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </a>
          // </Link>
        ))}
    </div>
  );
};
