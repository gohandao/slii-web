import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import { JP } from "country-flag-icons/react/3x2";
import { FaDiscord, FaEthereum } from "react-icons/fa";
import { IoAppsSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CardLinks } from "@/components/CardLinks";
import { TagList } from "@/components/TagList";
import { Label } from "@/components/Label";
import { LikeViews } from "@/components/LikeViews";

import {
  AiFillHeart,
  AiOutlineAreaChart,
  AiOutlineDotChart,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { VoteButton } from "./VoteButton";
import { BookmarkButton } from "./BookmarkButton";
import { Collection } from "@/types/collection";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { BsTwitter, BsXDiamondFill } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import Moment from "react-moment";
import { IoMdListBox } from "react-icons/io";
import { ProfileLinks } from "./ProfileLinks";

type Props = {
  collections: any[];
  limit?: number;
};
export const CollectionList = ({ collections, limit }: Props) => {
  const router = useRouter();
  const { page } = router.query;
  const currentPath = router.pathname;
  const currentPage = page ? Number(page) : 1;
  const { order, sort, term } = router.query;

  const [liked, setLiked] = useState<boolean>(false);
  const addLikeHandler = async () => {
    setLiked(true);
  };
  const removeLikeHandler = async () => {
    setLiked(false);
  };

  //const collections = useContext(CollectionsContext);
  // const [filteredCollections, setFilteredCollections] = useState(collections);
  // //console.log("collectionsaaaa");
  // useEffect(() => {
  //   if (limit) {
  //     let new_collections = [] as any[];
  //     for (let index = 0; index < limit; index++) {
  //       new_collections = [...new_collections, collections[index]];
  //     }
  //     setFilteredCollections(new_collections);
  //   }
  // }, []);
  // const currentCollections = limit ? filteredCollections : collections;

  const Hyphen = () => {
    return <span className="text-gray-400">-</span>;
  };
  const EthIcon = () => {
    return (
      <div className="relative flex w-4 items-center">
        <Image
          src="/icon-eth.svg"
          width={16}
          height={16}
          alt=""
          sizes="16px"
          className=""
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  };

  type StatsProps = {
    icon: JSX.Element | JSX.Element[];
    text: JSX.Element | JSX.Element[];
  };
  const Stats = ({ icon, text }: StatsProps) => {
    return (
      <div
        className={`relative left-0 top-0 z-10 flex items-center justify-center gap-2 rounded py-[2px] px-[2px] text-xs capitalize text-gray-500 md:text-xs `}
      >
        {icon}
        {text}
      </div>
    );
  };

  const modal_param = currentPath == "/collections" ? "?screen=modal" : "";

  return (
    <div className="grid w-full grid-cols-1 justify-center gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {collections.length > 0 &&
        collections.map((collection, index) => {
          return (
            <div
              className="relative flex transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              key={index}
            >
              <Link
                href={`/collection/${collection.slug}${modal_param}`}
                legacyBehavior
              >
                <a className="relative flex w-full flex-col items-center overflow-hidden rounded-lg border border-gray-800 bg-gray-800 pb-2 shadow-lg">
                  <div className="absolute top-0 right-0 z-20  flex items-center gap-1 text-gray-400 opacity-60">
                    <p className="mt-[2px] text-center text-xs text-gray-400">
                      {collection.stats && collection.stats.num_owners} /
                      {collection.stats && collection.stats.total_supply}
                    </p>
                    <div className="flex items-center justify-center gap-2 rounded-bl-lg bg-gray-900 py-[2px] px-2 text-xs capitalize md:text-xs">
                      {collection.type}
                      <JP title="Japan" className="h-3 rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute -left-[1px] -top-[1px] z-10 opacity-60">
                    <div className="lt-triangle"></div>
                  </div>
                  <div className="absolute left-[6px] top-1 z-20 flex">
                    <p className="text-xs text-gray-500">
                      #{" "}
                      {limit
                        ? index + 1 + (currentPage - 1) * limit
                        : index + 1}
                    </p>
                  </div>
                  <div className="relative flex h-20 w-full overflow-hidden border-4 border-transparent opacity-[30%]">
                    <div className="relative h-full w-full rounded bg-gray-500">
                      {collection.banner_image_url && (
                        <Image
                          //@ts-ignore
                          src={collection.banner_image_url}
                          alt=""
                          quality={10}
                          fill
                          sizes="300px"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="flex w-full items-center gap-2">
                      <div className="relative -mt-[60px]">
                        <div className="relative z-10 flex h-[70px] w-[70px] min-w-[70px] items-center justify-center overflow-hidden rounded  border-[5px] border-gray-700 bg-gray-600">
                          {collection.image_url && (
                            <Image
                              //@ts-ignore
                              src={collection.image_url}
                              alt=""
                              quality={10}
                              fill
                              sizes="200px"
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                        {(collection.twitter_followers ||
                          collection.discord_members) && (
                          <div className="absolute bottom-[22px] left-full z-10 ml-2 flex w-full flex-col items-start gap-0">
                            <div className="flex gap-2 rounded-full bg-gray-900 px-3 py-[2px] opacity-80">
                              {collection.twitter_followers && (
                                <Stats
                                  icon={<BsTwitter />}
                                  text={collection.twitter_followers}
                                />
                              )}
                              {collection.discord_members && (
                                <Stats
                                  icon={<FaDiscord />}
                                  text={collection.discord_members}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full min-w-[0px] max-w-full  flex-1 flex-col gap-1">
                      <div className="relative -mr-1 flex max-w-full items-center justify-between pt-[6px]">
                        <h3 className="ellipsis ellipsis  min-w-[0] max-w-full items-center pr-3 text-sm font-bold text-gray-100">
                          {collection.name}
                          {collection.safelist_request_status == "verified" && (
                            <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />
                          )}
                        </h3>
                        <div className="flex gap-2">
                          <BookmarkButton
                            id={collection.slug}
                            type="collection"
                            property="simple"
                          />
                          <div className="-mr-[2px]">
                            <VoteButton
                              property="simple"
                              type="collection"
                              id={collection.slug}
                              count={collection.upvotes_count}
                            />
                            {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between gap-5">
                        <div className="flex gap-5">
                          <div className="">
                            <p className="sp:text-sm text-xs font-bold text-gray-500">
                              Floor Price
                            </p>
                            <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
                              {collection.payment_tokens &&
                                collection.payment_tokens[0].symbol ==
                                  "ETH" && <EthIcon />}
                              {collection.stats &&
                              collection.stats.floor_price > 0 ? (
                                abbreviateNumber(collection.stats.floor_price)
                              ) : (
                                <Hyphen />
                              )}
                            </div>
                          </div>
                          <div className="">
                            <p className="sp:text-sm text-xs font-bold text-gray-500">
                              {term == "all" || !term
                                ? "Total"
                                : term == "24h"
                                ? "24h"
                                : term == "7d"
                                ? "7d"
                                : term == "30d" && "30d"}{" "}
                              Volume
                            </p>
                            <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
                              {term == "all" ||
                              (!term &&
                                collection.stats &&
                                collection.stats.total_volume > 0) ? (
                                <>
                                  {collection.payment_tokens &&
                                    collection.payment_tokens[0].symbol ==
                                      "ETH" && <EthIcon />}
                                  {abbreviateNumber(
                                    collection.stats.total_volume
                                  )}
                                </>
                              ) : term == "24h" &&
                                collection.stats.one_day_volume > 0 ? (
                                <>
                                  {collection.payment_tokens &&
                                    collection.payment_tokens[0].symbol ==
                                      "ETH" && <EthIcon />}
                                  {abbreviateNumber(
                                    collection.stats.one_day_volume
                                  )}
                                </>
                              ) : term == "7d" &&
                                collection.stats.seven_day_volume > 0 ? (
                                <>
                                  {collection.payment_tokens &&
                                    collection.payment_tokens[0].symbol ==
                                      "ETH" && <EthIcon />}
                                  {abbreviateNumber(
                                    collection.stats.seven_day_volume
                                  )}
                                </>
                              ) : term == "30d" &&
                                collection.stats.thirty_day_volume > 0 ? (
                                <>
                                  {collection.payment_tokens &&
                                    collection.payment_tokens[0].symbol ==
                                      "ETH" && <EthIcon />}
                                  {abbreviateNumber(
                                    collection.stats.thirty_day_volume
                                  )}
                                </>
                              ) : (
                                <Hyphen />
                              )}
                            </div>
                          </div>
                        </div>
                        {collection.listed_at && (
                          <Stats
                            icon={<IoMdListBox />}
                            text={
                              <Moment format="DD.MM.YYYY">
                                {collection.listed_at}
                              </Moment>
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
