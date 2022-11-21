import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/legacy/image";
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
      <div className="w-4 flex items-center">
        <Image src="/icon-eth.svg" width={16} height={16} alt="" className="" />
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
        className={`relative flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-[2px] z-10 rounded text-xs md:text-xs capitalize text-gray-500 `}
      >
        {icon}
        {text}
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full justify-center">
      {collections.length > 0 &&
        collections.map((collection, index) => {
          return (
            <div
              className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              key={index}
            >
              <Link href={`/collection/${collection.slug}`} legacyBehavior>
                <a className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden pb-2">
                  <div className="absolute top-0 right-0 z-20  text-gray-400 opacity-60 flex gap-1 items-center">
                    <p className="text-gray-400 text-xs text-center mt-[2px]">
                      {collection.stats && collection.stats.num_owners} /
                      {collection.stats && collection.stats.total_supply}
                    </p>
                    <div className="flex justify-center items-center gap-2 py-[2px] px-2 rounded-bl-lg text-xs md:text-xs capitalize bg-gray-900">
                      {collection.type}
                      <JP title="Japan" className="h-3 rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute -left-[1px] -top-[1px] z-10 opacity-60">
                    <div className="lt-triangle"></div>
                  </div>
                  <div className="flex absolute left-[6px] top-1 z-20">
                    <p className="text-gray-500 text-xs">
                      #{" "}
                      {limit
                        ? index + 1 + (currentPage - 1) * limit
                        : index + 1}
                    </p>
                  </div>
                  <div className="flex w-full h-20 overflow-hidden opacity-[30%] relative border-4 border-transparent">
                    <div className="w-full h-full bg-gray-500 rounded">
                      {collection.banner_image_url && (
                        <Image
                          //@ts-ignore
                          src={collection.banner_image_url}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          quality={10}
                        />
                      )}
                    </div>
                  </div>
                  <div className="px-4 w-full">
                    <div className="flex w-full gap-2 items-center">
                      <div className="relative -mt-[60px]">
                        <div className="rounded border-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-600 border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
                          {collection.image_url && (
                            <Image
                              //@ts-ignore
                              src={collection.image_url}
                              layout="fill"
                              objectFit="cover"
                              alt=""
                              quality={10}
                            />
                          )}
                        </div>
                        {(collection.twitter_followers ||
                          collection.discord_members) && (
                          <div className="absolute bottom-[22px] left-full flex items-start gap-0 ml-2 z-10 flex-col w-full">
                            <div className="flex bg-gray-900 gap-2 rounded-full px-3 py-[2px] opacity-80">
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
                    <div className="flex flex-col w-full flex-1  max-w-full min-w-[0px] gap-1">
                      <div className="flex items-center pt-[6px] relative justify-between -mr-1 max-w-full">
                        <h3 className="text-sm items-center  font-bold ellipsis text-gray-100 ellipsis max-w-full min-w-[0] pr-3">
                          {collection.name}
                          {collection.safelist_request_status == "verified" && (
                            <MdVerified className="-mt-[2px] text-gray-500 ml-2 inline-block" />
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
                      <div className="flex gap-5 justify-between items-end">
                        <div className="flex gap-5">
                          <div className="">
                            <p className="text-gray-500 text-xs sp:text-sm font-bold">
                              Floor Price
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 font-bold -ml-1">
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
                            <p className="text-gray-500 text-xs sp:text-sm font-bold">
                              {term == "all" || !term
                                ? "Total"
                                : term == "24h"
                                ? "24h"
                                : term == "7d"
                                ? "7d"
                                : term == "30d" && "30d"}{" "}
                              Volume
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 font-bold -ml-1">
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
