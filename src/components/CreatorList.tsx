import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { JP } from "country-flag-icons/react/3x2";
import { FaEthereum } from "react-icons/fa";

import { CreatorsContext } from "@/contexts/CreatorsContext";

import { TagList } from "@/components/TagList";
import { Label } from "@/components/Label";

import { Creator } from "@/types/creator";

type Props = {
  creators: Creator[];
};
export const CreatorList = ({ creators }: Props) => {
  //const creators = useContext(CreatorsContext);
  //console.log(creators);

  return (
    <div className="flex gap-4 flex-wrap">
      {creators &&
        creators.map((creator, index) => (
          <Link
            href={`/${creator.username}`}
            as={`/${creator.username}`}
            key={index}
          >
            <a className="relative flex flex-col border-2 border-gray-100 rounded w-60 items-center shadow-lg">
              <div
                className={`absolute left-2 top-2 flex py-[2px] px-3 z-10 rounded-full text-sm text-white ${
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
              <div className="-mt-10 rounded-full border-4 border-white overflow-hidden flex items center justify-center z-10 bg-gray-100">
                {creator.avatar && (
                  <Image
                    //@ts-ignore
                    src={creator.avatar[0].thumbnails.large.url}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt=""
                  />
                )}
              </div>
              <div className="pt-1 pb-5">
                <h3 className="font-bold line-crump-1 mb-2">
                  {creator.username}
                </h3>
                <p className="flex justify-center gap-2">
                  <JP title="Japan" className="h-5 border rounded" />
                  <Image src="/icon-eth.svg" width={16} height={16} alt="" />
                </p>
              </div>
              {creator.tags && (
                <div className="flex gap-2 -mt-2 pb-5 justify-start w-full px-3">
                  {creator.tags.map((tag, index) => (
                    <Label key={index} name={tag} type="creator" />
                  ))}
                </div>
              )}
            </a>
          </Link>
        ))}
    </div>
  );
};
