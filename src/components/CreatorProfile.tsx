import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";

import { ProfileLinks } from "@/components/ProfileLinks";
import { Label } from "@/components/Label";

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
            objectFit="cover"
            alt=""
            loading="lazy"
          />
        )}
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="-mt-10 relative inline-flex">
          <div className="rounded-full border-4 border-white overflow-hidden inline-flex items center justify-center z-10">
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
          <p className="absolute bottom-4 left-full -ml-6 bg-yellow-500 text-white pl-5 pr-3 rounded-tr-full rounded-br-full text-sm">
            {creator.type}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-5 px-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold line-clamp-1">
              {creator.username}
            </h1>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <Image src="/icon-eth.svg" width={16} height={16} alt="" />
              {creator.address}
            </p>
            <p className="text-gray-900 mt-1">{creator.description}</p>
          </div>
          {creator.tags && (
            <div className="flex gap-2 justify-start w-full">
              {creator.tags.map((tag, index) => (
                <Label key={index} name={tag} type="creator" />
              ))}
            </div>
          )}
          <ProfileLinks
            twitter_id={creator.twitter_id}
            instagram_id={creator.instagram_id}
            discord_url={creator.discord_url}
            website={creator.website}
            opensea_url={creator.username}
          />
        </div>
      </div>
    </section>
  );
};
