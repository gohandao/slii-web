import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { JP } from "country-flag-icons/react/3x2";
import { FaEthereum } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import { CreatorsContext } from "@/contexts/CreatorsContext";

import { CardLinks } from "@/components/CardLinks";
import { TagList } from "@/components/TagList";
import { Label } from "@/components/Label";
import { LikeViews } from "@/components/LikeViews";

import { Creator } from "@/types/creator";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

type Props = {
  creators: Creator[];
  limit?: number;
};
export const CreatorList = ({ creators, limit }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const addLikeHandler = async () => {
    setLiked(true);
  };
  const removeLikeHandler = async () => {
    setLiked(false);
  };

  //const creators = useContext(CreatorsContext);
  const [filteredCreators, setFilteredCreators] = useState(creators);
  //console.log("creatorsaaaa");
  const router = useRouter();
  useEffect(() => {
    if (limit) {
      let new_creators = [] as Creator[];
      for (let index = 0; index < limit; index++) {
        new_creators = [...new_creators, creators[index]];
      }
      setFilteredCreators(new_creators);
    }
  }, []);
  const currentCreators = limit ? filteredCreators : creators;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full justify-center">
      {currentCreators.length > 0 &&
        currentCreators.map((creator, index) => {
          return (
            <div
              className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              key={index}
            >
              <Link href={`/${creator.username}`} as={`/${creator.username}`}>
                <a className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden py-3 md:py-3">
                  <div className="flex absolute left-0 top-0 w-full md:w-[47px] h-full w-full overflow-hidden mb-2 opacity-[10%] ">
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
                    <div className="rounded-full border-[5px] overflow-hidden flex items-center justify-center z-10 bg-gray-100 border-[5px] border-gray-700 relative w-[70px] h-[70px] min-w-[70px]">
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
                    <div className="flex flex-col w-full flex-1  max-w-full">
                      <div className="flex items-center pl-3 py-2 relative justify-between -mr-1 max-w-full">
                        <h3 className="items-center  font-bold ellipsis text-gray-100 ellipsis max-w-full min-w-[0] pr-3">
                          {creator.username}
                          {creator.verified == true && (
                            <MdVerified className="-mt-[2px] text-gray-500 ml-2 inline-block" />
                          )}
                        </h3>
                        <div className="-mr-1">
                          <AiOutlineHeart className="text-xl text-gray-200 opacity-50" />
                        </div>
                      </div>
                      <div className="flex flex-between pl-3">
                        <div
                          className={`flex justify-center items-center gap-2 left-0 top-0 py-[2px] px-2 z-10 rounded text-xs md:text-xs capitalize bg-gray-700 text-gray-400 ${
                            creator.type == "creator___"
                              ? "bg-yellow-500 text-yellow-100"
                              : ""
                          }`}
                        >
                          <JP title="Japan" className="h-3 rounded-sm" />
                          {creator.type}
                        </div>
                        <div className=" bottom-0 left-0 w-full">
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
                  {/*creator.tags && (
                    <div className="flex gap-2 justify-start w-full flex-wrap pt-1 pb-2">
                      {creator.tags.map((tag, index) => (
                        <Label key={index} name={tag} type="creator" />
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
