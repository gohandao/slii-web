import React from "react";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";

type StatsProps = {
  title: string;
  element: any;
};
export const CollectionCard = ({ collection }: any) => {
  console.log("collection");
  console.log(collection);
  const Stats = ({ title, element }: StatsProps) => {
    return (
      <div className="inline-flex min-w-[120px] rounded border-2 border-gray-100 bg-gray-50 flex-col p-2">
        <p className="text-xs font-medium tracking-wide text-gray-400">
          {title}
        </p>
        <p className="mt-1 text-sm font-bold text-gray-800">{element}</p>
      </div>
    );
  };
  const unit =
    collection.payment_tokens && " " + collection.payment_tokens[0].symbol;
  return (
    <Link href={`/collection/${collection.slug}`}>
      <a className="block relative w-full overflow-hidden bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
        <div className="p-4">
          <div className="relative overflow-hidden h-32 w-full rounded-lg">
            {collection.featured_image_url && (
              <Image
                //@ts-ignore
                src={collection.featured_image_url}
                layout="fill"
                height="100%"
                objectFit="cover"
              />
            )}
          </div>
          <div className="px-10 -mt-10">
            <div className="relative object-cover w-20 h-20 rounded-lg overflow-hidden mb-2">
              {collection.image_url && (
                <Image
                  //@ts-ignore
                  src={collection.image_url}
                  layout="fill"
                  width="100%"
                  objectFit="cover"
                />
              )}
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">
              {collection.name}
            </p>
            <p className="text-sm text-gray-500 mb-5">
              {collection.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {collection.stats && collection.payment_tokens && (
                <>
                  <Stats
                    title="Floor Price"
                    element={collection.stats.floor_price + unit}
                  />
                  <Stats
                    title="Created"
                    element={
                      <Moment format="YYYY/MM/DD">
                        {collection.created_date}
                      </Moment>
                    }
                  />
                  <Stats
                    title="Royalty"
                    element={collection.dev_seller_fee_basis_points / 100 + "%"}
                  />
                  <Stats
                    title="Opensea Fees"
                    element={
                      collection.opensea_seller_fee_basis_points / 100 + "%"
                    }
                  />
                  <Stats
                    title="Safelist"
                    element={collection.safelist_request_status}
                  />
                  <Stats title="Owners" element={collection.stats.num_owners} />
                  <Stats
                    title="7d Ave."
                    element={
                      abbreviateNumber(
                        collection.stats.seven_day_average_price
                      ) + unit
                    }
                  />
                  <Stats
                    title="3d Ave."
                    element={
                      abbreviateNumber(
                        collection.stats.seven_day_average_price
                      ) + unit
                    }
                  />
                  <Stats
                    title="1d Ave."
                    element={
                      collection.stats.one_day_average_price! + 0
                        ? abbreviateNumber(
                            collection.stats.one_day_average_price
                          ) + unit
                        : "-"
                    }
                  />
                  <Stats
                    title="Total Volume"
                    element={
                      abbreviateNumber(collection.stats.total_volume) + unit
                    }
                  />
                  <Stats
                    title="Total Supply"
                    element={
                      abbreviateNumber(collection.stats.total_supply, true) +
                      " NFTs"
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
