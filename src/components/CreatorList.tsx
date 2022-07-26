import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { JP } from "country-flag-icons/react/3x2";
import { FaEthereum } from "react-icons/fa";

import { CreatorsContext } from "@/contexts/CreatorsContext";

import { Creator } from "@/types/creator";

type Props = {
  creators: Creator[];
};
export const CreatorList = ({ creators }: Props) => {
  //const creators = useContext(CreatorsContext);
  console.log(creators);

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
              <div className="absolute left-2 top-2 bg-yellow-500 flex py-[2px] px-3 z-10 rounded-full text-sm text-white">
                {creator.type}
              </div>
              <div className="flex relative w-full h-20 overflow-hidden">
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
              <div className="-mt-10 rounded-full border-4 border-white overflow-hidden flex items center justify-center z-10">
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
            </a>
          </Link>
        ))}
    </div>
  );
};
