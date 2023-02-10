import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsThreeDots, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaRegFlag } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiShip2Fill } from "react-icons/ri";

import { NavButton } from "@/components/elements/NavButton";
import { ArticleArea } from "@/components/layouts/ArticleArea";
import { DropdownBox } from "@/components/modules/DropdownBox";
import { DropdownLink } from "@/components/modules/DropdownLink";
import { LikedBox } from "@/components/modules/LikedBox";
import { LikedItem } from "@/components/modules/LikedItem";
import { ProfileCount } from "@/components/modules/ProfileCount";
import type { Creator } from "@/types/creator";

type Props = {
  category?: string;
  collections?: any[];
  creator?: Creator;
  description?: string;
  image?: string;
  label: string;
  liked_counts: number;
  links: {
    discord_url?: string;
    instagram_id?: string;
    opensea_url?: string;
    twitter_id?: string;
    website_url?: string;
  };
  nfts?: any[];
  stars_counts: number;
  tags?: string[];
  title: string;
};
export const BasePageTemplate: FC<Props> = ({
  category,
  collections,
  creator,
  description,
  image,
  label,
  liked_counts,
  links,
  nfts,
  stars_counts,
  tags,
  title,
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  const slicedDescription = description && description.length > 80 ? description.slice(0, 80) + "…" : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://slii.xyz",
    }[process.env.NODE_ENV];
  }
  // シェアボタンのリンク先
  const currentUrl = baseUrl + router.asPath;
  let twitterShareUrl = "https://twitter.com/intent/tweet";
  twitterShareUrl += "?text=" + encodeURIComponent("");
  twitterShareUrl += "&url=" + encodeURIComponent(currentUrl);
  const requestMenus = [
    {
      icon: <AiOutlineTwitter />,
      title: "Share on Twitter",
      url: twitterShareUrl,
    },
    {
      icon: <FaRegFlag />,
      title: "Report",
      url: "https://google.com",
    },
  ];
  const image_src = image ? image : "/dummy-nft.jpg";
  return (
    <ArticleArea addClass="shadow-2xl rounded-2xl shadow-2xl overflow-hidden bg-slate-100">
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden">
        <Image src={image_src} sizes="300px" width={400} height={400} className="w-full" alt="" />
      </div>
      <div className="absolute left-0 top-3 flex w-full justify-between px-4">
        <button
          // className="flex h-8 w-8 items-center justify-center rounded-full bg-black opacity-50"
          onClick={() => {
            router.back();
          }}
        >
          <NavButton>
            {pathname == "/creators" || pathname == "/collections" || pathname == "/" ? <IoClose /> : <FiArrowLeft />}
          </NavButton>
        </button>
        <DropdownBox
          icon={<BsThreeDots className="" />}
          title="Links"
          dropdown={requestDropdown}
          setDropdown={setRequestDropdown}
        >
          {requestMenus.map((menu, index) => {
            return (
              <div key={index} className="w-full">
                <DropdownLink title={menu.title} link={menu.url} />
              </div>
            );
          })}
        </DropdownBox>
      </div>
      <div className="relative -mt-10 flex flex-col gap-3 rounded-t-2xl bg-white px-5 pt-5 pb-8 lg:px-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            {category && (
              <div className="flex">
                <p className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-3 py-[2px] text-sm font-normal">
                  {category}
                </p>
              </div>
            )}
            <ul className="flex items-center justify-center gap-4 text-xl text-gray-400">
              {links.opensea_url && (
                <a href={links.opensea_url} className="" target="_blank" rel="noreferrer">
                  <RiShip2Fill />
                </a>
              )}
              {links.twitter_id && (
                <a href={links.twitter_id} className="" target="_blank" rel="noreferrer">
                  <BsTwitter />
                </a>
              )}
              {links.instagram_id && (
                <a href={links.instagram_id} className="" target="_blank" rel="noreferrer">
                  <AiFillInstagram />
                </a>
              )}
              {links.discord_url && (
                <a href={links.discord_url} className="" target="_blank" rel="noreferrer">
                  <FaDiscord />
                </a>
              )}
              {links.website_url && (
                <a href={links.website_url} className="" target="_blank" rel="noreferrer">
                  <HiOutlineGlobeAlt />
                </a>
              )}
            </ul>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {label && <p className="text-sm font-normal text-gray-500">{label}</p>}
        </div>
        <div className="flex gap-5">
          <ProfileCount label="Liked" count={liked_counts} />
          <ProfileCount label="Stars" count={stars_counts} />
        </div>
        {description && (
          <>
            <p className="whitespace-pre-wrap break-all text-justify text-sm font-normal transition-all duration-200 md:text-[15px]">
              {showDescription ? description : slicedDescription}
            </p>
            {description.length > 80 && (
              <>
                <button
                  className="inline-flex items-center gap-1 text-sm font-bold text-sky-500"
                  onClick={() => {
                    showDescription ? setShowDescription(false) : setShowDescription(true);
                  }}
                >
                  {showDescription ? <>Show less</> : <>Read more</>}
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
        {creator && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Creator</h2>
            <>
              <LikedBox>
                <div className="">
                  <Link href={`/creator/${creator.username}`}>
                    <LikedItem id={creator.username} type="collection" image={creator.avatar} label="" />
                  </Link>
                </div>
              </LikedBox>
            </>
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
                          <Link href={`/collection/${collection.slug}`}>
                            <LikedItem id={collection.slug} type="collection" image={collection.image_url} label="" />
                          </Link>
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
                          <LikedItem id={nft.id} type="nft" image={nft.image_thumbnail_url} label="" />
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
