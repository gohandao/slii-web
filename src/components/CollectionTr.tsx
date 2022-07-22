import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";

import { abbreviateNumber } from "@/utilities/abbreviateNumber";

type Props = {
  children: ReactNode;
};
export const CollectionTr = ({ collection }: any) => {
  const [data, setData] = useState<any>();
  const options = { method: "GET" };
  console.log("collectioaaan");
  console.log(collection);
  const getCollection = () => {
    fetch(
      `https://api.opensea.io/api/v1/collection/${collection.slug}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response.collection");
        console.log(response.collection);
        setData(response.collection);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getCollection();
  }, []);

  const Td = ({ children }: Props) => {
    return (
      <td
        scope="col"
        className="px-3 py-4 text-sm font-medium text-right text-gray-900 bg-white sm:px-6 whitespace-nowrap"
      >
        {children}
      </td>
    );
  };

  return (
    <>
      {data && (
        <tr>
          <td className="relative py-4 pl-4 pr-3 bg-white sm:pl-6">
            <Link href={`/${collection.creator_id}/${collection.slug}`}>
              <a className="block">
                <div className="flex items-center">
                  <img
                    className="object-cover w-10 h-10 rounded-full shrink-0"
                    src={data.image_url}
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-base font-bold text-gray-900">
                      <a href="#" title="" className="line-clamp-1">
                        {data.name}
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                      {data.stats.total_supply} NFTs
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </td>
          <Td>
            {abbreviateNumber(data.stats.total_volume)}{" "}
            {data.payment_tokens[0].symbol}
          </Td>
          <Td>
            {abbreviateNumber(data.stats.floor_price)}{" "}
            {data.payment_tokens[0].symbol}
          </Td>
          <Td>
            {abbreviateNumber(
              data.stats.one_day_average_price / data.stats.floor_price
            )}
            %
          </Td>
          <Td>
            {abbreviateNumber(
              data.stats.seven_day_average_price / data.stats.floor_price
            )}
            %
          </Td>
          <Td>{data.stats.num_owners}</Td>
        </tr>
      )}
    </>
  );
};
