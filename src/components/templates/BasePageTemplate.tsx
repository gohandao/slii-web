import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { LikedBox } from "@/components/modules/LikedBox";
import { LikedItem } from "@/components/modules/LikedItem";
import { ProfileCount } from "@/components/modules/ProfileCount";

type Props = {
  category?: string;
  collections?: any[];
  description?: string;
  image?: string;
  label: string;
  liked_counts: number;
  nfts?: any[];
  stars_counts: number;
  tags?: string[];
  title: string;
};
export const BasePageTemplate: FC<Props> = ({
  category,
  collections,
  description,
  image,
  label,
  liked_counts,
  nfts,
  stars_counts,
  tags,
  title,
}) => {
  const router = useRouter();
  const slicedDescription = description && description.length > 160 ? description.slice(0, 160) + "…" : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const image_src = image ? image : "/dummy-nft.jpg";
  return (
    <ArticleArea addClass="shadow-2xl">
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-3 z-10 flex w-full justify-between px-4">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black opacity-50"
            onClick={() => {
              router.back();
            }}
          >
            <FiArrowLeft className="text-white" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black opacity-50">
            <BiDotsHorizontalRounded className="text-white" />
          </button>
        </div>
        <Image src={image_src} sizes="300px" width={400} height={400} className="w-full" alt="" />
      </div>
      <div className="relative -mt-10 flex flex-col gap-3 rounded-t-2xl bg-white px-8 pt-5 pb-8">
        <div className="flex flex-col gap-[2px]">
          {category && (
            <div className="flex">
              <p className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-3 py-1 text-sm font-normal">
                {category}
              </p>
            </div>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
          {label && <p className="text-sm font-normal text-gray-500">{label}</p>}
        </div>
        <div className="flex gap-5">
          <ProfileCount label="Liked" count={liked_counts} />
          <ProfileCount label="Stars" count={stars_counts} />
        </div>
        {description && (
          <>
            <p className="break-all text-justify text-sm font-normal transition-all duration-200 md:text-[15px] ">
              {showDescription ? description : slicedDescription}
            </p>
            {description.length > 80 && (
              <>
                <button
                  className="inline-flex items-center gap-1 text-sm text-blue-500"
                  onClick={() => {
                    showDescription ? setShowDescription(false) : setShowDescription(true);
                  }}
                >
                  {showDescription ? <>Show less</> : <>Show more</>}
                </button>
              </>
            )}
          </>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: any, index: number) => {
                return (
                  <div className="rounded-full bg-gray-200 px-2 py-1" key={index}>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {collections && collections.length > 0 && (
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">Collections</h2>
              {collections.length > 0 ? (
                <>
                  <LikedBox>
                    {collections.map((collection: any, index: number) => {
                      return (
                        <div className="" key={index}>
                          <LikedItem
                            id={collection.slug}
                            type="collection"
                            image={collection.image_url}
                            label="100 ETH"
                            likeHandler={() => {
                              return;
                            }}
                            path={`/collection/${collection.slug}`}
                            starHandler={() => {
                              return;
                            }}
                          />
                        </div>
                      );
                    })}
                  </LikedBox>
                </>
              ) : (
                <p className="text-sm font-normal">No collections.</p>
              )}
            </div>
          )}
          {nfts && nfts.length > 0 && (
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">NFTs</h2>
              {nfts.length > 0 ? (
                <>
                  <LikedBox>
                    {nfts.map((nft: any, index: number) => {
                      return (
                        <div className="" key={index}>
                          <LikedItem
                            id={nft.id}
                            type="nft"
                            image={nft.image_thumbnail_url}
                            label="10 ETH"
                            likeHandler={() => {
                              return;
                            }}
                            path={`/nft/${nft.id}`}
                            starHandler={() => {
                              return;
                            }}
                          />
                        </div>
                      );
                    })}
                  </LikedBox>
                </>
              ) : (
                <p className="text-sm font-normal">No NFTs.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </ArticleArea>
  );
};
