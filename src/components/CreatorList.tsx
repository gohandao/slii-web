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
import { LikeButton } from "./LikeButton";
import { BookmarkButton } from "./BookmarkButton";
import { BsTwitter } from "react-icons/bs";
import { TbChecklist } from "react-icons/tb";
import { IoMdListBox } from "react-icons/io";

type Props = {
  creators: Creator[];
  limit?: number;
};
export const CreatorList = ({ creators, limit }: Props) => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = page ? Number(page) : 1;

  const [liked, setLiked] = useState<boolean>(false);
  const addLikeHandler = async () => {
    setLiked(true);
  };
  const removeLikeHandler = async () => {
    setLiked(false);
  };

  //const creators = useContext(CreatorsContext);
  // const [filteredCreators, setFilteredCreators] = useState(creators);
  //console.log("creatorsaaaa");
  // useEffect(() => {
  //   if (limit) {
  //     let start;
  //     let end;
  //     if (!currentPage || currentPage == 1) {
  //       start = 0;
  //       end = limit - 1;
  //     } else {
  //       start = limit * (currentPage - 1);
  //       end = limit * currentPage - 1;
  //     }
  //     if (limit) {
  //       let new_creators = [] as Creator[];
  //       for (let index = start; index < end; index++) {
  //         if (creators[index]) {
  //           new_creators = [...new_creators, creators[index]];
  //         }
  //       }
  //       setFilteredCreators(new_creators);
  //     }
  //   }
  // }, [creators, page]);

  // const currentCreators = limit ? filteredCreators : creators;

  return (
    <div className="grid grid-cols-1 gap-3 w-full justify-center">
      {creators.length > 0 &&
        creators.map((creator, index) => {
          const upvotes_count = creator.upvotes_count
            ? creator.upvotes_count
            : 0;

          return (
            <div
              className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              key={index}
            >
              <Link href={`/creator/${creator.username}`}>
                <a className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden py-3 md:py-3">
                  <div className="flex absolute left-0 top-0 w-[87px] h-full overflow-hidden rounded-tr-full rounded-br-full mb-2 opacity-[30%] ">
                    {creator.background && creator.background.length > 0 && (
                      <>
                        {
                          //@ts-ignore
                          creator.background[0].thumbnails ? (
                            <Image
                              //@ts-ignore
                              src={creator.background[0].thumbnails.large.url}
                              layout="fill"
                              objectFit="cover"
                              alt=""
                              loading="lazy"
                              className=""
                            />
                          ) : (
                            <Image
                              //@ts-ignore
                              src={creator.background[0].url}
                              layout="fill"
                              objectFit="cover"
                              alt=""
                              loading="lazy"
                              className=""
                            />
                          )
                        }
                      </>
                    )}
                  </div>
                  <div className="flex w-full pl-3 pr-4 items-center">
                    <div className="relative">
                      <div className="rounded-full border-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-100 border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
                        {creator.avatar && (
                          <Image
                            //@ts-ignore
                            src={creator.avatar[0].thumbnails.large.url}
                            // width={80}
                            // height={80}
                            objectFit="cover"
                            layout="fill"
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-full flex-1  max-w-full min-w-[0px] gap-1">
                      <div className="flex items-center pl-3 pt-2 relative justify-between -mr-1 max-w-full">
                        <h3 className="items-center  font-bold ellipsis text-gray-100 ellipsis max-w-full min-w-[0] pr-3">
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
                              count={upvotes_count}
                            />
                            {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex pl-3 w-full gap-2 ">
                        <div
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
                          className={`relative flex justify-start items-center gap-4 py-[2px] z-10 rounded text-xs md:text-xs capitalize text-gray-400 flex-1`}
                        >
                          {creator.twitter_followers && (
                            <div
                              className={`relative flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-[2px] z-10 rounded text-xs md:text-xs capitalize text-gray-400 `}
                            >
                              <BsTwitter />
                              {creator.twitter_followers.toLocaleString()}
                            </div>
                          )}
                          {creator.listed_at && (
                            <div className="flex items-center gap-2">
                              <IoMdListBox />
                              <Moment format="DD.MM.YYYY">
                                {creator.listed_at}
                              </Moment>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <CardLinks
                            twitter_id={creator.twitter_id}
                            instagram_id={creator.instagram_id}
                            discord_url={creator.discord_url}
                            website_url={creator.website_url}
                            opensea_url={creator.username}
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
