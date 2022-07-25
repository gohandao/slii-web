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
  creator: Creator;
};

export const CreatorProfile = ({ creator }: Props) => {
  return (
    <section className="">
      <div className="flex relative w-full h-60 overflow-hidden">
        {creator.background && (
          <Image
            //@ts-ignore
            src={creator.background[0].thumbnails.large.url}
            layout="fill"
            height="100%"
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="-mt-10 rounded-full border-4 border-white overflow-hidden inline-flex items center justify-center z-10">
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
        <div className="flex flex-1 flex-col gap-5 px-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold line-clamp-1">
              {creator.username}
            </h1>
            <p className="text-xs text-gray-500">{creator.address}</p>
            <p className="text-gray-900 mt-1">{creator.description}</p>
          </div>
          {creator.tags && (
            <div className="flex flex-wrap gap-3">
              {creator.tags.map((tag: string, index: number) => (
                <p
                  key={index}
                  className="border border-gray-900 rounded-full py-1 px-3 inline-flex text-xs"
                >
                  {tag}
                </p>
              ))}{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
