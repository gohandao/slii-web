import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import { JP } from "country-flag-icons/react/3x2";
import { FaEthereum } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CardLinks } from "@/components/CardLinks";
import { TagList } from "@/components/TagList";
import { Label } from "@/components/Label";
import { LikeViews } from "@/components/LikeViews";

import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { VoteButton } from "./VoteButton";
import { LikeButton } from "./LikeButton";
import { BookmarkButton } from "./BookmarkButton";
import { Collection } from "@/types/collection";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";

type Props = {
  collections: any[];
  limit?: number;
};
export const CollectionList = ({ collections, limit }: Props) => {
  const router = useRouter();

  const { order, sortBy, term } = router.query;

  const [liked, setLiked] = useState<boolean>(false);
  const addLikeHandler = async () => {
    setLiked(true);
  };
  const removeLikeHandler = async () => {
    setLiked(false);
  };

  //const collections = useContext(CollectionsContext);
  const [filteredCollections, setFilteredCollections] = useState(collections);
  //console.log("collectionsaaaa");
  useEffect(() => {
    if (limit) {
      let new_collections = [] as any[];
      for (let index = 0; index < limit; index++) {
        new_collections = [...new_collections, collections[index]];
      }
      setFilteredCollections(new_collections);
    }
  }, []);
  const currentCollections = limit ? filteredCollections : collections;

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
  return (
    <div className="grid grid-cols-1 gap-3 w-full justify-center">
      {currentCollections.length > 0 &&
        currentCollections.map((collection, index) => {
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
                      <div className="rounded border-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-100 border-[5px] border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
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
                    </div>
                    <div className="flex flex-col w-full flex-1  max-w-full min-w-[0px]">
                      <div className="flex items-center pl-3 py-2 relative justify-between -mr-1 max-w-full">
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
                            />
                            {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between pl-3 w-full">
                        <div
                          className={`relative flex justify-center items-center gap-2 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize text-gray-400`}
                        >
                          <JP
                            title="Japan"
                            className="h-3 rounded-sm w-5 flex-1"
                          />
                          <div className="flex item-center gap-1 justify-start">
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
                          <div className="flex item-center gap-1 justify-start">
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
                        <div className=" w-full">
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
                  {/*collection.tags && (
                    <div className="flex gap-2 justify-start w-full flex-wrap pt-1 pb-2">
                      {collection.tags.map((tag, index) => (
                        <Label key={index} name={tag} type="collection" />
                      ))}
                    </div>
                      )*/}
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
