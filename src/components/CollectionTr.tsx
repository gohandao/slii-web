import React, { useState, useEffect, useContext, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { MdVerified } from "react-icons/md";
import { SocialsContext } from "@/contexts/SocialsContext";
import router, { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { BookmarkButton } from "./BookmarkButton";
import { VoteButton } from "./VoteButton";

type Props = {
  children: ReactNode;
};
export const CollectionTr = ({ item, index, limit }: any) => {
  //console.log("item");
  //console.log(item.slug);
  //console.log(item);
  const router = useRouter();
  const { order, sort, term, page } = router.query;
  const currentPage = page ? Number(page) : 1;

  // const { socials } = useContext(BaseContext);

  let changeClass;
  switch (term) {
    case "24h":
      if (item.stats.one_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.one_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
    case "7d":
      if (item.stats.seven_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.seven_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
    case "30d":
      if (item.stats.thirty_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.thirty_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
  }

  const Td = ({ children }: Props) => {
    return (
      <td
        scope="col"
        className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium text-gray-100 sm:px-6"
      >
        {children}
      </td>
    );
  };

  const Hyphen = () => {
    return <span className="text-gray-400">-</span>;
  };
  const EthIcon = () => {
    return (
      <div className="flex w-4 items-center">
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
    <>
      {item && item.creator_id && (
        <tr key={item.slug} className="even:bg-gray-900">
          <td scope="col" className="">
            <div className="item-center -ml-[2px] flex w-7 rotate-90 justify-center whitespace-nowrap text-sm text-gray-500">
              # {limit ? index + 1 + (currentPage - 1) * limit : index + 1}{" "}
            </div>
          </td>
          <td className="relative min-w-[240px] py-4 pr-3">
            <Link href={`/collection/${item.slug}`} legacyBehavior>
              <a className="relative block">
                <div className="custom-tdbg absolute left-0 right-0">
                  {item.banner_image_url && (
                    <Image
                      //@ts-ignore
                      src={item.banner_image_url}
                      alt=""
                      quality={10}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div className="relative z-10 flex items-center">
                  <div className="relative h-[46px] w-[46px] overflow-hidden rounded border-[3px] border-gray-700 bg-gray-600">
                    {item.image_url && (
                      <Image
                        //@ts-ignore
                        src={item.image_url}
                        alt=""
                        quality={10}
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div className="ml-4 grid">
                    <div className="flex w-[200px] items-center justify-between md:w-[280px]">
                      <p className="ellipsis min-w-[0] max-w-full items-center pr-2 pr-2 text-base font-bold text-gray-100">
                        {item.name}
                        {item.safelist_request_status == "verified" && (
                          <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />
                        )}
                      </p>
                      <div className="-mr-1">
                        <BookmarkButton id={item.slug} type="collection" />
                        {/* <AiOutlineHeart className=" text-gray-400 opacity-50" /> */}
                      </div>
                    </div>
                    <p className="ellipsis pr-3 text-sm text-gray-500">
                      {item.creator_id}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </td>
          {/*upvote*/}
          <Td>
            {item.slug ? (
              <VoteButton
                id={item.slug}
                type="collection"
                property="simple"
                count={item.upvotes_count}
              />
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*twitter*/}
          <Td>
            {item.twitter_followers ? (
              <span className="text-blue-400">{item.twitter_followers}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*discord*/}
          <Td>
            {item.discord_members ? (
              <span className="text-violet-400">{item.discord_members}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*floor_price*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {item.payment_tokens &&
                item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
              {item.stats && item.stats.floor_price > 0 ? (
                abbreviateNumber(item.stats.floor_price)
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*total_volume*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {term == "all" ||
              (!term && item.stats && item.stats.total_volume > 0) ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.total_volume)}
                </>
              ) : term == "1h" && item.stats.one_hour_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.one_hour_volume)}
                </>
              ) : term == "6h" && item.stats.six_hour_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.six_hour_volume)}
                </>
              ) : term == "24h" && item.stats.one_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.one_day_volume)}
                </>
              ) : term == "7d" && item.stats.seven_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.seven_day_volume)}
                </>
              ) : term == "30d" && item.stats.thirty_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.thirty_day_volume)}
                </>
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*average_price*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {term == "all" ||
              (!term && item.stats && item.stats.average_price > 0) ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.average_price)}
                </>
              ) : term == "1h" && item.stats.one_hour_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.one_hour_average_price)}
                </>
              ) : term == "6h" && item.stats.six_hour_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.six_hour_average_price)}
                </>
              ) : term == "24h" && item.stats.one_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.one_day_average_price)}
                </>
              ) : term == "7d" && item.stats.seven_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.seven_day_average_price)}
                </>
              ) : term == "30d" && item.stats.thirty_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                  {abbreviateNumber(item.stats.thirty_day_average_price)}
                </>
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*change*/}
          <Td>
            <span className={`${changeClass}`}>
              {term != "all" &&
              term &&
              item.stats &&
              term == "24h" &&
              item.stats.one_day_change ? (
                (item.stats.one_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "1h" && item.stats.one_hour_change ? (
                (item.stats.one_hour_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "6h" && item.stats.six_hour_change ? (
                (item.stats.six_hour_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "7d" && item.stats.seven_day_change ? (
                (item.stats.seven_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "30d" && item.stats.thirty_day_change ? (
                (item.stats.thirty_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : (
                <Hyphen />
              )}
            </span>
          </Td>
          {/*sales*/}
          <Td>
            {term == "all" ||
            (!term && item.stats && item.stats.total_sales > 0) ? (
              abbreviateNumber(item.stats.total_sales, true)
            ) : term == "24h" && item.stats.one_day_sales > 0 ? (
              abbreviateNumber(item.stats.one_day_sales, true)
            ) : term == "7d" && item.stats.seven_day_sales > 0 ? (
              abbreviateNumber(item.stats.seven_day_sales, true)
            ) : term == "30d" && item.stats.thirty_day_sales > 0 ? (
              abbreviateNumber(item.stats.thirty_day_sales, true)
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*owners*/}
          <Td>{item.stats && item.stats.num_owners}</Td>
          {/*items*/}
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
