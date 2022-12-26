import Image from "next/image";
import type { FC } from "react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { BookmarkButton } from "@/components/elements/BookmarkButton";
import { Label } from "@/components/elements/Label";
import { Stats } from "@/components/elements/Stats";
import { StatsBox } from "@/components/elements/StatsBox";
import { UpvoteButton } from "@/components/elements/UpvoteButton";
import { ProfileDropdown } from "@/components/modules/ProfileDropdown";
import { ProfileLinks } from "@/components/modules/ProfileLinks";

type Props = {
  id: string;
  avatar_url?: string;
  background_url?: string;
  description?: string;
  discord_members?: number | null;
  discord_url?: string;
  instagram_id?: string;
  links: {
    address?: string;
    discord_url?: string;
    instagram_id?: string;
    opensea_username?: string;
    twitter_id?: string;
    website_url?: string;
  };
  page: string;
  stats?: { field: any; value: any }[];
  sub_title?: any;
  tags?: any[];
  title: any;
  twitter_followers?: number | null;
  twitter_id?: string;
  upvotes_count?: number | null;
};
export const ProfileHeader: FC<Props> = ({
  id,
  avatar_url,
  background_url,
  description,
  links,
  page,
  stats,
  sub_title,
  tags,
  title,
  upvotes_count,
}) => {
  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  // const [shareDropdown, setShareDropdown] = useState<boolean>(false);

  // let baseUrl = "" as string;
  // if (process.env.NODE_ENV != "test") {
  //   baseUrl = {
  //     development: "http://localhost:3000",
  //     production: "https://nftotaku.xyz",
  //   }[process.env.NODE_ENV];
  // }
  // シェアボタンのリンク先
  // const currentUrl = baseUrl + router.asPath;
  // let twitterShareUrl = "https://twitter.com/intent/tweet";
  // twitterShareUrl += "?text=" + encodeURIComponent("ツイート内容テキスト");
  // twitterShareUrl += "&url=" + encodeURIComponent(currentUrl);
  // const shareMenus = [
  //   {
  //     icon: <BsTwitter />,
  //     title: "Share on Twitter",
  //     url: twitterShareUrl,
  //   },
  // ];
  const requestMenus = [
    {
      icon: <FaRegFlag />,
      title: "Report",
      url: "https://google.com",
    },
  ];
  // description
  const slicedDescription = description && description.length > 160 ? description.slice(0, 160) + "…" : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <section>
      <div className="relative -mt-[68px] flex h-40 w-full overflow-hidden border-x-[10px] border-t-[10px] border-transparent md:h-60 ">
        <div className="h-full w-full overflow-hidden rounded-lg bg-gray-800 opacity-50">
          <div className="relative h-full w-full opacity-40">
            {background_url && background_url != "false" && (
              <Image
                src={background_url}
                alt=""
                loading="lazy"
                className="rounded-lg"
                quality={10}
                fill
                sizes="300px"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-2 px-5 lg:px-8">
        <div className={`relative -mt-[38px] flex items-end justify-between lg:-mt-[43px]`}>
          <div className="relative flex">
            <div
              className={`relative z-10 flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full border-[5px] border-gray-800 bg-gray-800 lg:h-[100px] lg:w-[100px]`}
            >
              {avatar_url && (
                <Image
                  src={avatar_url}
                  width={100}
                  height={100}
                  alt=""
                  quality={10}
                  sizes="200px"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div className={`absolute top-1 left-full ml-2 flex items-center gap-4`}>
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
                    <UpvoteButton id={id} property="default" type={page} count={upvotes_count} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-between gap-16">
          <div className="flex flex-col gap-2">
            <h1 className={`inline items-center justify-center text-2xl font-bold text-gray-100`}>{title}</h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">{sub_title}</div>
            {description && tags && (
              <div className="flex max-w-5xl flex-col gap-1">
                {description && (
                  <>
                    <p className="mt-1 break-all text-justify text-sm text-gray-100 transition-all duration-200 md:text-[15px] ">
                      {showDescription ? description : slicedDescription}
                    </p>
                    {description.length > 80 && (
                      <>
                        <button
                          className="inline-flex items-center gap-1 text-sm text-gray-500"
                          onClick={() => {
                            showDescription ? setShowDescription(false) : setShowDescription(true);
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
                  </>
                )}
                <div className="-mt-1 flex w-full gap-2">
                  {tags &&
                    tags.map((tag, index) => {
                      return <Label key={index} name={tag} type="creator" />;
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        {stats && stats.length > 0 && (
          <div className="mt-2 flex flex-wrap items-start gap-4">
            {stats.map((data, index) => {
              return (
                <div key={index}>
                  <StatsBox>
                    {data.field && data.value && data.value != 0 && (
                      <Stats
                        field={data.field}
                        value={<div className="flex w-full items-center justify-end gap-2">{data.value}</div>}
                      />
                    )}
                  </StatsBox>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
