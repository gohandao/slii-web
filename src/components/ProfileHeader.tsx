import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { BsThreeDots, BsTwitter } from "react-icons/bs";
import { FaRegFlag, FaTwitter } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BookmarkButton } from "./BookmarkButton";
import { CopyText } from "./CopyText";
import { ProfileDropdown } from "./ProfileDropdown";
import { ProfileLinks } from "./ProfileLinks";
import { Stats } from "./Stats";
import { StatsBox } from "./StatsBox";
import { VoteButton } from "./VoteButton";
import { Label } from "./Label";

import { getTwitterFollowers } from "@/libs/twitter";
import { updateSocial } from "@/utilities/updateSocial";
import { BaseContext } from "@/contexts/BaseContext";
import { Social } from "@/types/social";

type Props = {
  page: string;
  id: string;
  title: any;
  sub_title?: any;
  avatar_url?: string | Blob | MediaSource;
  background_url?: string;
  description?: string;
  links: {
    address?: string;
    twitter_id?: string;
    instagram_id?: string;
    discord_url?: string;
    website_url?: string;
    opensea_username?: string;
  };
  tags?: any[];
  stats?: { field: string; value: string }[];
  twitter_id?: string;
  twitter_followers?: number | null;
  discord_url?: string;
  discord_members?: number | null;
  instagram_id?: string;
  upvotes_count?: number;
};
export const ProfileHeader = ({
  page,
  id,
  title,
  sub_title,
  avatar_url,
  background_url,
  description,
  links,
  tags,
  stats,
  twitter_id,
  twitter_followers,
  discord_url,
  discord_members,
  upvotes_count,
}: Props) => {
  const router = useRouter();
  const { screen } = router.query;
  // const { socials, setSocials } = useContext(BaseContext);

  // const [social, setSocial] = useState<Social>();

  // const [twitterFollowers, setTwitterFollowers] = useState<number>();
  // const [discordMembers, setDiscordMembers] = useState<number>();
  // const [checkSocial, setCheckSocial] = useState<boolean>(false);
  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  const [shareDropdown, setShareDropdown] = useState<boolean>(false);

  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  // シェアボタンのリンク先
  const currentUrl = baseUrl + router.asPath;
  var twitterShareUrl = "https://twitter.com/intent/tweet";
  twitterShareUrl += "?text=" + encodeURIComponent("ツイート内容テキスト");
  twitterShareUrl += "&url=" + encodeURIComponent(currentUrl);
  const shareMenus = [
    /*{
      icon: <FiCopy />,
      title: "Copy URL",
      url: twitterShareUrl,
    },*/
    {
      icon: <BsTwitter />,
      title: "Share on Twitter",
      url: twitterShareUrl,
    },
  ];
  const requestMenus = [
    {
      icon: <FaRegFlag />,
      title: "Report",
      url: "https://google.com",
    },
  ];
  // description
  const slicedDescription =
    description && description.length > 160
      ? description.slice(0, 160) + "…"
      : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <section>
      <div className="relative -mt-[68px] flex h-40 w-full overflow-hidden border-x-[10px] border-t-[10px] border-transparent md:h-60 ">
        <div className="h-full w-full overflow-hidden rounded-lg bg-gray-800 opacity-50">
          <div className="relative h-full w-full opacity-40">
            {background_url && (
              <Image
                //@ts-ignore
                src={background_url}
                alt=""
                loading="lazy"
                className="rounded-lg"
                quality={10}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-3 px-5 lg:px-8">
        <div
          className={`relative -mt-[38px] flex items-end justify-between ${
            screen != "modal" && "lg:-mt-[48px]"
          }`}
        >
          <div className="relative flex">
            <div
              className={`relative z-10 flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full border-[5px] border-gray-800 bg-gray-800 ${
                screen != "modal" && "lg:h-[100px] lg:w-[100px]"
              }`}
            >
              {avatar_url && (
                <Image
                  //@ts-ignore
                  src={avatar_url}
                  width={100}
                  height={100}
                  alt=""
                  quality={10}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <div
              className={`absolute top-1 left-full ml-2 flex items-center gap-4 ${
                screen != "modal" && "lg:top-3"
              }`}
            >
              {links && (
                <ProfileLinks
                  address={links.address}
                  twitter_id={links.twitter_id}
                  instagram_id={links.instagram_id}
                  discord_url={links.discord_url}
                  website_url={links.website_url}
                  opensea_username={links.opensea_username}
                />
              )}
            </div>
          </div>
          <div className="ml-3 flex h-[44px] w-full flex-1 justify-between">
            <div className=" flex items-center justify-center gap-5 capitalize">
              <ProfileDropdown
                icon={<BsThreeDots className="text-gray-500" />}
                position="left"
                dropdown={requestDropdown}
                setDropdown={setRequestDropdown}
                menus={requestMenus}
              />
            </div>
            <div className="flex items-center gap-3">
              {page != "user" && (
                <>
                  <BookmarkButton id={id} type={page} />
                  {upvotes_count != null && (
                    <VoteButton
                      id={id}
                      property="default"
                      type={page}
                      count={upvotes_count}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-between gap-16">
          <div className="flex flex-col gap-2">
            <h1
              className={`inline items-center justify-center text-2xl font-bold text-gray-100 ${
                !screen && "sm:text-3xl "
              }`}
            >
              {title}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {sub_title}
              {/* <Image src="/icon-eth.svg" width={16} height={16} alt="" />
              <CopyText text={address} alertText="ETH address has copied!" /> */}
            </div>
            <div className="flex flex-col gap-1">
              <p className="mt-1 break-all text-justify text-sm text-gray-100 transition-all duration-200 sm:text-base ">
                {showDescription ? description : slicedDescription}
              </p>
              {description && description.length > 80 && (
                <>
                  <button
                    className="inline-flex items-center gap-1 text-gray-500"
                    onClick={() => {
                      showDescription
                        ? setShowDescription(false)
                        : setShowDescription(true);
                    }}
                  >
                    {showDescription ? (
                      <>
                        <MdKeyboardArrowUp />
                        Show less
                      </>
                    ) : (
                      <>
                        <MdKeyboardArrowDown />
                        Show more
                      </>
                    )}
                  </button>
                </>
              )}
              <div className="-mt-1 flex w-full gap-2">
                {tags &&
                  tags.map((tag, index) => (
                    <Label key={index} name={tag} type="creator" />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {stats &&
          stats.length > 0 &&
          stats.map((data, index) => (
            <div key={index} className="mt-1 flex flex-col items-start">
              <StatsBox>
                {twitter_followers && (
                  <Stats
                    field="Followers"
                    value={
                      <div className="flex w-full items-center justify-end gap-2">
                        <FaTwitter className="text-sm opacity-60" />
                        {twitter_followers}
                      </div>
                    }
                  />
                )}
                <Stats field="Collections" value={twitter_followers} />
                <Stats field="Created" value={twitter_followers} />
                <Stats field="Collected" value={twitter_followers} />
                <Stats field="Views" value="100" />
              </StatsBox>
            </div>
          ))}
      </div>
    </section>
  );
};