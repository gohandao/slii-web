import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";

import { Creator } from "@/types/creator";

type Props = {
  id: string;
  creator: Creator;
};

export const Card = ({ creator }: Props) => {
  return (
    <Link
      href={`/creator/${creator.username}`}
      scroll={false}
      className="flex w-full"
    >
      <a className="relative border-2 border-gray-900 rounded-lg flex pointer text-sm">
        <div className="relative flex justify-center items-center w-40 h-40 overflow-hidden">
          <div className="relative w-80 h-56">
            {creator.avatar && (
              <>
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].thumbnails.large.url}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 px-5 py-7">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold line-clamp-1">
              {creator.username}
            </h3>
            <p className="text-xs text-gray-500">{creator.type}</p>
            <p className="text-xs text-gray-500">{creator.website}</p>
            <p className="text-xs text-gray-500">{creator.twitter_id}</p>
            <p className="text-xs text-gray-500">{creator.instagram_id}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {creator.tags &&
              creator.tags.map((tag, index) => (
                <p
                  key={index}
                  className="border border-gray-900 rounded-full py-1 px-3 inline-flex text-xs"
                >
                  {tag}
                </p>
              ))}
          </div>
        </div>
      </a>
    </Link>
  );
};
