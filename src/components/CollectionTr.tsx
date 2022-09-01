import React, { useState, useEffect, useContext, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { MdVerified } from "react-icons/md";
import { SocialsContext } from "@/contexts/SocialsContext";

type Props = {
  children: ReactNode;
};
export const CollectionTr = ({ item, index }: any) => {
  //console.log("item");
  //console.log(item);
  const { socials } = useContext(SocialsContext);

  const { collectionsSort } = useContext(UtilitiesContext);

  /*const [list, setList] = useState<any[]>([]);
  const options = { method: "GET" };
  const getCollection = () => {
    fetch(
      `https://api.opensea.io/api/v1/collection/${collection.slug}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setList([...list, response.collection]);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    if (collectionsSort) {
      console.log("Start");

      let new_list = [];
      switch (collectionsSort) {
        case "volume":
          new_list = list.sort(function (a, b) {
            if (a.stats.total_volume < b.stats.total_volume) return -1;
            if (a.stats.total_volume > b.stats.total_volume) return 1;
            return 0;
          });
          console.log("new_list");
          console.log(new_list);
          setList(new_list);
          break;

        default:
          break;
      }
    }
  }, [collectionsSort]);*/

  const Td = ({ children }: Props) => {
    return (
      <td
        scope="col"
        className="px-3 py-4 text-sm font-medium text-right text-gray-100 sm:px-6 whitespace-nowrap"
      >
        {children}
      </td>
    );
  };

  const Hyphen = () => {
    return <span className="text-gray-400">-</span>;
  };
  return (
    <>
      {item && item.creator_id && (
        <tr key={item.slug} className="even:bg-gray-900">
          <td scope="col" className="">
            <div className="flex item-center text-gray-500 w-7 justify-center text-sm -ml-[2px]">
              {index + 1}
            </div>
          </td>
          <td className="relative py-4 pr-3 ">
            <Link href={`/${item.creator_id}/${item.slug}`}>
              <a className="block">
                <div className="flex items-center">
                  <img
                    className="object-cover w-10 h-10 rounded shadow-lg shrink-0"
                    src={item.image_url}
                    alt=""
                  />
                  <div className="ml-4 grid min-w-[160px] lg:w-[320px]">
                    <p className="text-base text-gray-100 line-clamp-1 pr-3 flex gap-2 items-center">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 ellipsis pr-3">
                      {item.creator_id}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </td>
          <Td>
            {item.twitter_followers ? (
              <span className="text-blue-400">{item.twitter_followers}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          <Td>
            {item.discord_members ? (
              <span className="text-violet-400">{item.discord_members}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          <Td>
            <div className="flex item-center gap-1 justify-end">
              {item.payment_tokens &&
                item.payment_tokens[0].symbol == "ETH" && (
                  <Image src="/icon-eth.svg" width={16} height={16} alt="" />
                )}
              {item.stats && item.stats.total_volume ? (
                abbreviateNumber(item.stats.total_volume)
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          <Td>
            <div className="flex item-center gap-1 justify-end">
              {item.payment_tokens &&
                item.payment_tokens[0].symbol == "ETH" && (
                  <Image src="/icon-eth.svg" width={16} height={16} alt="" />
                )}
              {item.stats && item.stats.floor_price ? (
                abbreviateNumber(item.stats.floor_price)
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          <Td>
            <span
              className={`${
                item.stats.one_day_change > 0 && "text-green-500"
              } ${item.stats.one_day_change < 0 && "text-red-500"}`}
            >
              {item.stats && item.stats.one_day_change != 0 ? (
                (item.stats.one_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : (
                <Hyphen />
              )}
            </span>
          </Td>
          <Td>
            <span
              className={`${
                item.stats.seven_day_change > 0 && "text-green-500"
              } ${item.stats.seven_day_change < 0 && "text-red-500"}`}
            >
              {item.stats && item.stats.seven_day_change != 0 ? (
                (item.stats.seven_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : (
                <Hyphen />
              )}
            </span>
          </Td>
          <Td>
            <span
              className={`${
                item.stats.thirty_day_change > 0 && "text-green-500"
              } ${item.stats.thirty_day_change < 0 && "text-red-500"}`}
            >
              {item.stats && item.stats.thirty_day_change != 0 ? (
                (item.stats.thirty_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : (
                <Hyphen />
              )}
            </span>
          </Td>
          <Td>{item.stats && item.stats.num_owners}</Td>
          <Td>{item.stats && item.stats.total_supply}</Td>
        </tr>
      )}
    </>
  );
  /*return (
    <>
      {list &&
        list.map((item, index) => (
          <tr key={item.slug}>
            <td className="relative py-4 pl-4 pr-3 bg-white sm:pl-6">
              <Link href={`/${collection.creator_id}/${collection.slug}`}>
                <a className="block">
                  <div className="flex items-center">
                    <img
                      className="object-cover w-10 h-10 rounded-full shrink-0"
                      src={item.image_url}
                      alt=""
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">
                        {collection.creator_id}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </td>
            <Td>
              {abbreviateNumber(item.stats.total_volume)}{" "}
              {item.payment_tokens[0].symbol}
            </Td>
            <Td>
              {abbreviateNumber(item.stats.floor_price)}{" "}
              {item.payment_tokens[0].symbol}
            </Td>
            <Td>
              {abbreviateNumber(
                item.stats.one_day_average_price / item.stats.floor_price
              )}
              %
            </Td>
            <Td>
              {abbreviateNumber(
                item.stats.seven_day_average_price / item.stats.floor_price
              )}
              %
            </Td>
            <Td>{item.stats.num_owners}</Td>
            <Td>{item.stats.total_supply}</Td>
          </tr>
        ))}
    </>
  );*/
};
