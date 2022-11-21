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
    description && description.length > 80
      ? description.slice(0, 80) + "…"
      : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  //discord_id
  // const discord_id =
  //   discord_url && discord_url.substring(discord_url.lastIndexOf("/") + 1);

  // useEffect(() => {
  //   if (socials && page) {
  //     //set collection
  //     let socials_filter = [] as any[];
  //     if (page == "creator") {
  //       socials_filter = socials.filter(
  //         (social) => id === social.creator_username
  //       );
  //     }
  //     if (page == "collection") {
  //       socials_filter = socials.filter(
  //         (social) => id === social.collection_slug
  //       );
  //     }
  //     socials_filter.length > 0 && setSocial(socials_filter[0]);
  //     if (socials_filter.length == 0) {
  //       setSocial({
  //         collection_slug: "",
  //         creator_username: "",
  //         twitter_followers: null,
  //         discord_members: null,
  //         record_id: null,
  //       });
  //     }
  //   }
  // }, [socials]);

  // update social
  // const getSocialCounts = async () => {
  //   const data =
  //     social &&
  //     (await updateSocial({
  //       record_id: social.record_id,
  //       creator_username: page == "creator" ? "id" : undefined,
  //       collection_slug: page == "collection" ? "id" : undefined,
  //       twitter_id: twitter_id,
  //       twitter_followers: social.twitter_followers,
  //       discord_id: discord_id,
  //       discord_members: social.discord_members,
  //       socials: socials,
  //       setSocials: setSocials,
  //     }));
  //   setTwitterFollowers(data && data.twitter_followers);
  //   setDiscordMembers(data && data.discord_members);
  //   setCheckSocial(true);
  // };
  // !checkSocial && social && getSocialCounts();
  return (
    <section>
      <div className="flex relative w-full h-40 md:h-60 overflow-hidden -mt-[68px] border-t-[10px] border-x-[10px] border-transparent ">
        <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden opacity-50">
          <div className="relative opacity-40 w-full h-full">
            {background_url && (
              <Image
                //@ts-ignore
                src={background_url}
                layout="fill"
                objectFit="cover"
                alt=""
                loading="lazy"
                className="rounded-lg"
                quality={10}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto px-5 lg:px-8 flex flex-col gap-3">
        <div className="-mt-[58px] relative flex justify-between items-end">
          <div className="relative flex">
            <div className="relative rounded-full border-[5px] border-gray-800 overflow-hidden flex items-center justify-center z-10 bg-gray-800 w-[110px] h-[110px]">
              {avatar_url && (
                <Image
                  //@ts-ignore
                  src={avatar_url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                  quality={10}
                />
              )}
            </div>

            <div className="absolute top-5 left-full flex items-center gap-4 ml-2">
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
          <div className="flex justify-between flex-1 w-full ml-3 h-[44px]">
            <div className=" gap-5 capitalize flex justify-center items-center">
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
        <div className="flex flex-1 gap-16 justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl text-gray-100 font-bold inline justify-center items-center">
              {title}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {sub_title}
              {/* <Image src="/icon-eth.svg" width={16} height={16} alt="" />
              <CopyText text={address} alertText="ETH address has copied!" /> */}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-100 mt-1 text-justify break-all text-sm sm:text-base transition-all duration-200 ">
                {showDescription ? description : slicedDescription}
              </p>
              {description && description.length > 80 && (
                <>
                  <button
                    className="inline-flex text-gray-500 items-center gap-1"
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
              <div className="flex gap-2 w-full -mt-1">
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
            <div key={index} className="flex flex-col items-start mt-1">
              <StatsBox>
                {twitter_followers && (
                  <Stats
                    field="Followers"
                    value={
                      <div className="flex gap-2 items-center w-full justify-end">
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
