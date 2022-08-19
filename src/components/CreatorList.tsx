import React, { useContext } from "react";
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

import { Creator } from "@/types/creator";

type Props = {
  creators: Creator[];
};
export const CreatorList = ({ creators }: Props) => {
  //const creators = useContext(CreatorsContext);
  //console.log(creators);
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-full justify-center">
      {creators &&
        creators.map((creator, index) => (
          <div
            className="relative flex hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            key={index}
          >
            <Link href={`/${creator.username}`} as={`/${creator.username}`}>
              <a className="relative flex flex-col border border-gray-800 rounded-lg w-full items-center shadow-lg bg-gray-800 overflow-hidden">
                <div
                  className={`absolute left-0 top-0 flex py-[2px] px-3 z-10 rounded-br-lg text-xs md:text-sm text-white capitalize ${
                    creator.type == "creator" ? "bg-yellow-500" : "bg-blue-500"
                  }`}
                >
                  {creator.type}
                </div>
                <div className="flex relative w-full h-20 overflow-hidden bg-gray-100">
                  {creator.background && (
                    <Image
                      //@ts-ignore
                      src={creator.background[0].thumbnails.large.url}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="-mt-10 rounded-full border-[5px] border-gray-800 overflow-hidden flex items center justify-center z-10 bg-gray-100">
                  {creator.avatar && (
                    <Image
                      //@ts-ignore
                      src={creator.avatar[0].thumbnails.large.url}
                      width={80}
                      height={80}
                      objectFit="cover"
                      alt=""
                    />
                  )}
                </div>
                <div className="pt-1 pb-3 w-full">
                  <div className="flex justify-center items-center mb-2">
                    <h3 className="px-5 items-center  font-bold ellipsis text-gray-100">
                      {creator.username}
                      {creator.verified == true && (
                        <MdVerified className="-mt-[2px] text-gray-500 ml-2 inline-block" />
                      )}
                    </h3>
                  </div>
                  <p className="flex justify-center gap-2">
                    <JP title="Japan" className="h-5 border rounded" />
                    <Image src="/icon-eth.svg" width={16} height={16} alt="" />
                  </p>
                </div>
                {creator.tags && (
                  <div className="flex gap-2 pb-4 justify-start w-full px-3 flex-wrap">
                    {creator.tags.map((tag, index) => (
                      <Label key={index} name={tag} type="creator" />
                    ))}
                  </div>
                )}
                <div className="pb-10"></div>
              </a>
            </Link>
            <div className="absolute bottom-0 left-0 w-full">
              <CardLinks
                twitter_id={creator.twitter_id}
                instagram_id={creator.instagram_id}
                discord_url={creator.discord_url}
                website_url={creator.website_url}
                opensea_url={creator.username}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
