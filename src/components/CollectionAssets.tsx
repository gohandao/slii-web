import React from "react";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";

import { abbreviateNumber } from "@/utilities/abbreviateNumber";

export const CollectionAssets = ({ collectionAssets }: any) => {
  return (
    <div className="flex flex-wrap gap-5">
      {collectionAssets &&
        collectionAssets.map((collectionAsset: any) => (
          <Link key={collectionAsset.id} href={collectionAsset.asset.permalink}>
            <a
              target="_blank"
              className="w-80 border-2 border-gray-900 rounded p-5"
            >
              <div className="relative object-cover w-full h-auto rounded-lg overflow-hidden mb-2">
                {collectionAsset.asset.image_thumbnail_url && (
                  <img src={collectionAsset.asset.image_thumbnail_url} alt="" />
                )}
              </div>
              <p>{collectionAsset.asset.name}</p>
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p>Price</p>
                  <p>
                    {collectionAsset.payment_token
                      ? Number(
                          collectionAsset.payment_token.eth_price
                        ).toLocaleString() +
                        " " +
                        collectionAsset.payment_token.symbol
                      : "-"}{" "}
                    / {collectionAsset.quantity}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>End date</p>
                  <p>
                    {collectionAsset.duration ? (
                      <Moment
                        format="YYYY/MM/DD"
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
            </a>
          </Link>
        ))}
    </div>
  );
};
