import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";

import { JP } from "country-flag-icons/react/3x2";
import { FaClipboardList, FaEthereum } from "react-icons/fa";
import { MdChecklist, MdVerified } from "react-icons/md";

import { CreatorsContext } from "@/contexts/CreatorsContext";

import { CardLinks } from "@/components/CardLinks";
import { TagList } from "@/components/TagList";
import { Label } from "@/components/Label";
import { LikeViews } from "@/components/LikeViews";

import { Creator } from "@/types/creator";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { VoteButton } from "./VoteButton";
import { BookmarkButton } from "./BookmarkButton";
import { BsTwitter } from "react-icons/bs";
import { TbChecklist } from "react-icons/tb";
import { IoMdListBox } from "react-icons/io";
import { ProfileLinks } from "./ProfileLinks";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  creators: Creator[];
  limit?: number;
};
export const CreatorList = ({ creators, limit }: Props) => {
  const router = useRouter();
  const { page, order, sort, term, type, search } = router.query;

  const params = process.browser && location.search;
  const { setHiddenParams } = useContext(UtilitiesContext);

  const currentPage = page ? Number(page) : 1;
  const [currentCreators, setCurrentCreators] = useState<Creator[]>(creators);

  const [liked, setLiked] = useState<boolean>(false);
  const addLikeHandler = async () => {
    setLiked(true);
  };
  const removeLikeHandler = async () => {
    setLiked(false);
  };

  useEffect(() => {
    setCurrentCreators(creators);
    console.log("uuu currnet creators");
    console.log(currentCreators);
    console.log(creators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creators]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full justify-center">
      {currentCreators.length > 0 &&
        currentCreators.map((creator, index) => {
          return (
            <div
              className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              key={index}
            >
              <Link
                href={`/creator/${creator.username}?ref=index`}
                legacyBehavior
                // href={{
                //   pathname: `/?username=${creator.username}`,
                //   query: {
                //     page,
                //     order,
                //     sort,
                //     term,
                //     type,
                //     search,
                //   },
                // }}
                // as={`/creator/${creator.username}`}
              >
                <a
                  // onClick={async () => {
                  //   await setHiddenUrl(`/${params}`);
                  //   router.push(
                  //     {
                  //       pathname: `/`,
                  //       query: {
                  //         page: page,
                  //         order: order,
                  //         sort: sort,
                  //         term: term,
                  //         type: type,
                  //         search: search,
                  //         username: creator.username,
                  //       },
                  //     },
                  //     `/creator/${creator.username}`,
                  //     { scroll: false }
                  //   );
                  // }}
                  className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden pb-2"
                >
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
                      {creator.background && (
                        <Image
                          //@ts-ignore
                          src={creator.background}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          loading="lazy"
                          className="rounded"
                          quality={20}
                        />
                      )}
                    </div>
                  </div>
                  <div className="px-4 w-full">
                    <div className="flex w-full gap-2 items-center">
                      <div className="relative -mt-[60px]">
                        <div className="rounded-full border-[5px] -ml-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-100 border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
                          {creator.avatar && (
                            <Image
                              //@ts-ignore
                              src={creator.avatar}
                              width={80}
                              height={80}
                              objectFit="cover"
                              alt=""
                              quality={20}
                            />
                          )}
                        </div>
                        <div className="absolute bottom-[22px] left-full flex items-center gap-1 ml-2 z-10">
                          <ProfileLinks
                            address={creator.address}
                            twitter_id={creator.twitter_id}
                            instagram_id={creator.instagram_id}
                            discord_url={creator.discord_url}
                            website_url={creator.website_url}
                            opensea_username={creator.username}
                          />
                        </div>
                      </div>
                      {/* <div
                          className={`relative flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize bg-gray-700 text-gray-400 `}
                        >
                          <div
                            className={`absolute left-[3px] top-[2px] w-2 h-2 z-10 rounded-full ${
                              creator.type == "creator"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <JP title="Japan" className="h-3 rounded-sm" />
                          {creator.type}
                        </div> */}
                    </div>
                    <div className="flex flex-col w-full flex-1  max-w-full min-w-[0px] gap-1">
                      <div className="flex items-center pt-1 relative justify-between max-w-full">
                        <h3 className="text-sm items-center  font-bold ellipsis text-gray-100 max-w-full min-w-[0] pr-3">
                          {creator.username}
                          {creator.verified == true && (
                            <MdVerified className="-mt-[2px] text-gray-500 ml-2 inline-block" />
                          )}
                        </h3>
                        <div className="flex gap-2">
                          <BookmarkButton
                            id={creator.username}
                            type="creator"
                            property="simple"
                          />
                          <div className="-mr-[2px]">
                            <VoteButton
                              property="simple"
                              type="creator"
                              id={creator.username}
                              count={
                                creator.upvotes_count
                                  ? creator.upvotes_count
                                  : 0
                              }
                            />
                            {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <div
                          className={`relative flex justify-between items-center -mx-1 gap-4 py-[2px] z-10 rounded text-xs md:text-xs capitalize text-gray-500 flex-1`}
                        >
                          {creator.twitter_followers && (
                            <div
                              className={`relative flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-[2px] z-10 rounded text-xs md:text-xs capitalize text-gray-500 `}
                            >
                              <BsTwitter />
                              {creator.twitter_followers.toLocaleString()}
                            </div>
                          )}
                          {creator.listed_at && (
                            <div className="flex items-center gap-2 ml-auto">
                              <IoMdListBox />
                              <Moment format="DD.MM.YYYY">
                                {creator.listed_at}
                              </Moment>
                            </div>
                          )}
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
