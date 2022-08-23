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
import { MdVerified } from "react-icons/md";

type Props = {
  creator: Creator;
};

export const CreatorProfile = ({ creator }: Props) => {
  return (
    <section className="">
      <div className="flex relative w-full h-32 md:h-60 overflow-hidden bg-gray-800">
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
      <div className="mx-auto  max-w-2xl">
        <div className="-mt-[60px] relative flex justify-center">
          <div className="relative flex">
            <div className="rounded-full border-[5px] border-gray-800 overflow-hidden flex items-center justify-center z-10 mb-2 bg-gray-800">
              {creator.avatar && creator.avatar.length > 0 ? (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].thumbnails.large.url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                />
              ) : (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                />
              )}
            </div>
            <p
              className={`absolute bottom-6 left-full -ml-6 text-white pl-5 pr-3 rounded-tr-full rounded-br-full text-sm capitalize ${
                creator.type == "creator" ? "bg-yellow-500" : "bg-blue-500"
              }`}
            >
              {creator.type}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 px-5">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl sm:text-3xl text-gray-100 font-bold inline justify-center items-center">
              {creator.username}{" "}
              {creator.verified == true && (
                <MdVerified className="text-gray-500 text-xl inline ml-1" />
              )}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image src="/icon-eth.svg" width={16} height={16} alt="" />
              <Link
                href={`https://etherscan.io/address/${creator.address}`}
                target="_blank"
              >
                <a className="ellipsis max-w-[100px]">{creator.address}</a>
              </Link>
            </div>
            <p className="text-gray-100 mt-1 text-justify px-3 text-sm sm:text-base">
              {creator.description}
            </p>
          </div>
          {creator.tags && (
            <div className="flex gap-2 justify-center w-full">
              {creator.tags.map((tag, index) => (
                <Label key={index} name={tag} type="creator" />
              ))}
            </div>
          )}
          <ProfileLinks
            twitter_id={creator.twitter_id}
            instagram_id={creator.instagram_id}
            discord_url={creator.discord_url}
            website_url={creator.website_url}
            opensea_username={creator.username}
          />
        </div>
      </div>
    </section>
  );
};
