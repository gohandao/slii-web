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
import { LikeButton } from "./LikeButton";
import { BookmarkButton } from "./BookmarkButton";
import { Collection } from "@/types/collection";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { BsTwitter, BsXDiamondFill } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import Moment from "react-moment";
import { IoMdListBox } from "react-icons/io";

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
    <div className="grid grid-cols-1 gap-3 w-full justify-center">
      {collections.length > 0 &&
        collections.map((collection, index) => {
          return (
            <div
              className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              key={index}
            >
              <Link href={`/collection/${collection.slug}`}>
                <a className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden py-3 md:py-3">
                  <div className="flex absolute left-0 top-0 w-[87px] h-full overflow-hidden rounded-tr-3xl rounded-br-3xl mb-2 opacity-[30%]">
                    {collection.banner_image_url && (
                      <Image
                        //@ts-ignore
                        src={collection.banner_image_url}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex w-full pl-3 pr-4 items-center">
                    <div className="relative">
                      <div className="rounded border-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-100 border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
                        {collection.image_url && (
                          <Image
                            //@ts-ignore
                            src={collection.image_url}
                            layout="fill"
                            objectFit="cover"
                            alt=""
                          />
                        )}
                      </div>
                      <p className="text-gray-400 pt-1 text-xs text-center">
                        {collection.stats && collection.stats.num_owners} /
                        {collection.stats && collection.stats.total_supply}
                      </p>
                    </div>
                    <div className="flex flex-col w-full flex-1  max-w-full min-w-[0px] gap-1">
                      <div className="flex items-center pl-3 pt-2 relative justify-between -mr-1 max-w-full">
                        <h3 className="items-center  font-bold ellipsis text-gray-100 ellipsis max-w-full min-w-[0] pr-3">
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
                      <div className="flex pl-3 w-full gap-2">
                        <div
                          className={`relative flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize bg-gray-700 text-gray-400 `}
                        >
                          <div
                            className={`absolute left-[3px] top-[2px] w-2 h-2 z-10 rounded-full ${
                              collection.type == "creator"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <JP title="Japan" className="h-3 rounded-sm" />
                          {collection.type}
                        </div>
                        <p className="text-gray-500 text-sm">
                          #{" "}
                          {limit
                            ? index + 1 + (currentPage - 1) * limit
                            : index + 1}
                        </p>
                      </div>
                      <div className="flex justify-between pl-3 w-full">
                        <div
                          className={`relative flex justify-center items-center gap-4 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize text-gray-400`}
                        >
                          {(sort == "created_at" || sort == "listed_at") && (
                            <>
                              <Stats
                                icon={<AiOutlineDotChart />}
                                text={
                                  <Moment format="DD.MM.YYYY">
                                    {collection.listed_at}
                                  </Moment>
                                }
                              />
                              <Stats
                                icon={<AiOutlineDotChart />}
                                text={
                                  <Moment format="DD.MM.YYYY">
                                    {collection.listed_at}
                                  </Moment>
                                }
                              />
                            </>
                          )}
                          <Stats
                            icon={<BsTwitter />}
                            text={collection.twitter_followers}
                          />
                          <Stats
                            icon={<FaDiscord />}
                            text={collection.discord_members}
                          />
                        </div>
                        <div className="hidden md:block">
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
                      <div className="flex justify-between pl-3 w-full -mt-1">
                        <div
                          className={`relative flex justify-center items-center gap-4 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize text-gray-500`}
                        >
                          <div className="flex items-center gap-1 justify-start">
                            <AiOutlineDotChart />
                            {collection.payment_tokens &&
                              collection.payment_tokens[0].symbol == "ETH" && (
                                <EthIcon />
                              )}
                            {collection.stats &&
                            collection.stats.floor_price > 0 ? (
                              abbreviateNumber(collection.stats.floor_price)
                            ) : (
                              <Hyphen />
                            )}
                          </div>
                          <div className="flex items-center gap-1 justify-start">
                            <AiOutlineAreaChart />
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
                        <div className="hidden md:block">
                          <CardLinks
                            twitter_id={collection.twitter_username}
                            instagram_id={collection.instagram_username}
                            discord_url={collection.discord_url}
                            website_url={collection.external_url}
                            opensea_url={collection.slug}
                          />
                        </div>
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
