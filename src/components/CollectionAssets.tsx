import React from "react";
import Image from "next/image";
import Moment from "react-moment";
export const CollectionAssets = ({ collectionAssets }: any) => {
  return (
    <div className="grid w-full grid-cols-2 justify-center gap-4 md:grid-cols-4 xl:grid-cols-6">
      {collectionAssets &&
        collectionAssets.map((collectionAsset: any) => (
          <a
            key={collectionAsset.id}
            target="_blank"
            href={collectionAsset.asset.permalink}
            className="relative transform overflow-hidden rounded border border-gray-700 bg-gray-800 transition-all duration-200 hover:-translate-y-1"
            rel="noreferrer"
          >
            <div className="absolute right-0 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-bl-full bg-blue-500 pl-[6px] pb-1">
              <Image
                src="/icon-opensea.svg"
                width={12}
                height={12}
                alt=""
                style={{
                  maxWidth: "100%",
                  width: "auto",
                  height: "10px",
                }}
              />
            </div>
            <div className="relative mb-2 h-auto w-full overflow-hidden object-cover">
              {collectionAsset.asset.image_thumbnail_url && (
                <Image
                  src={collectionAsset.asset.image_thumbnail_url}
                  alt=""
                  quality={10}
                  fill
                  sizes="100vw"
                />
              )}
            </div>
            <div className="px-4 pt-1 pb-3">
              <h4 className="mb-2 text-gray-100">
                {collectionAsset.asset.name}
              </h4>
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="item-center -ml-1 flex gap-1 text-sm text-gray-100">
                    {collectionAsset.payment_token &&
                      collectionAsset.payment_token.symbol == "ETH" && (
                        <Image
                          src="/icon-eth.svg"
                          width={16}
                          height={16}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
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
        ))}
    </div>
  );
};
