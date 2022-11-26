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
  const currentPath = router.pathname;

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
    // console.log("uuu currnet creators");
    // console.log(currentCreators);
    // console.log(creators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creators]);

  let modal_param = "";
  if (currentPath == "/") {
    modal_param = "?screen=modal";
  }

  return (
    <div className="grid w-full grid-cols-1 justify-center gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {currentCreators.length > 0 &&
        currentCreators.map((creator, index) => {
          return (
            <div
              className="relative flex transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              key={index}
            >
              <Link
                href={`/creator/${creator.username}${modal_param}`}
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
                  className="relative flex w-full flex-col items-center overflow-hidden rounded-lg border border-gray-800 bg-gray-800 pb-2 shadow-lg"
                >
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
                      {creator.background && (
                        <Image
                          //@ts-ignore
                          src={creator.background}
                          alt=""
                          loading="lazy"
                          className="rounded"
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
                        <div className="relative z-10 -ml-[5px] flex h-[70px] w-[70px] min-w-[70px] items-center justify-center overflow-hidden rounded-full border-[5px] border-gray-700 bg-gray-100">
                          {creator.avatar && (
                            <Image
                              //@ts-ignore
                              src={creator.avatar}
                              width={80}
                              height={80}
                              alt=""
                              quality={10}
                              sizes="300px"
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                        <div className="absolute bottom-[22px] left-full z-10 ml-2 flex items-center gap-1">
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
                    <div className="flex w-full min-w-[0px] max-w-full  flex-1 flex-col gap-1">
                      <div className="relative flex max-w-full items-center justify-between pt-1">
                        <h3 className="ellipsis min-w-[0]  max-w-full items-center pr-3 text-sm font-bold text-gray-100">
                          {creator.username}
                          {creator.verified == true && (
                            <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />
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
                      <div className="flex w-full justify-between">
                        <div
                          className={`relative z-10 -mx-1 flex flex-1 items-center justify-between gap-4 rounded py-[2px] text-xs capitalize text-gray-500 md:text-xs`}
                        >
                          {creator.twitter_followers && (
                            <div
                              className={`relative left-0 top-0 z-10 flex items-center justify-center gap-2 rounded py-[2px] px-[2px] text-xs capitalize text-gray-500 md:text-xs `}
                            >
                              <BsTwitter />
                              {creator.twitter_followers.toLocaleString()}
                            </div>
                          )}
                          {creator.listed_at && (
                            <div className="ml-auto flex items-center gap-2">
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
