import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import type { TCard } from "@/types/tinder";

export const SwipeCard: FC<TCard> = ({ above_tags, below_tags, image, label, name, path, verified = false }) => {
  const image_src = image ? image : "/dummy-nft.jpg";
  return (
    <Link href={path} className="flex flex-col rounded-lg bg-white p-2">
      <div
        className="relative flex"
        style={{
          paddingTop: "100%",
        }}
      >
        {above_tags && (
          <div className="absolute top-3 left-3">
            {above_tags.map((tag, index) => {
              return (
                <div className="flex bg-black bg-opacity-50 text-white" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        )}
        {below_tags && (
          <div className="absolute bottom-3 left-3">
            {below_tags.map((tag, index) => {
              return (
                <div className="flex bg-black bg-opacity-50 text-white" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        )}
        <Image src={image_src} className="w-full rounded-t-lg" alt="" fill sizes="300px" />
      </div>
      <div className="bg-gradient flex flex-col rounded-b-lg px-5 py-5 text-white">
        <h2 className="w-full text-2xl">
          {name}
          {verified && "icon"}
        </h2>
        <p className="text-sm opacity-50">{label}</p>
      </div>
    </Link>
  );
};
