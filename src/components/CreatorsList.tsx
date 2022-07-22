import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { CreatorsContext } from "@/contexts/CreatorsContext";

export const CreatorsList = () => {
  const creators = useContext(CreatorsContext);
  return (
    <div className="flex gap-4 flex-wrap">
      {creators &&
        creators.map((creator, index) => (
          <Link href={`/${creator.username}`} key={index}>
            <a className="flex flex-col border-2 border-gray-100 rounded w-60 items-center shadow-lg">
              <div className="flex relative w-full h-20 overflow-hidden">
                {creator.background && (
                  <Image
                    //@ts-ignore
                    src={creator.background[0].thumbnails.large.url}
                    layout="fill"
                    height="100%"
                    objectFit="cover"
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
                  />
                )}
              </div>
              <div className="pt-1 pb-5">
                <h3 className="font-bold line-crump-1">{creator.username}</h3>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};
