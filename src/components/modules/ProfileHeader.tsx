import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

import { DropdownBox } from "@/components/modules/DropdownBox";
import { DropdownLink } from "@/components/modules/DropdownLink";
import { ProfileCount } from "@/components/modules/ProfileCount";
import { ProfileLink } from "@/components/modules/ProfileLink";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { pageHistoryAtom, userProfileAtom } from "@/state/utilities.state";
import type { Profile } from "@/types/profile";

export const ProfileHeader: FC = () => {
  const pageHistory = useAtom(pageHistoryAtom);

  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = router.asPath;
  const { order, page, search, sort, tab, term, type, username } = router.query;
  console.log(order, page, search, sort, tab, term, type, username);

  const [, setUserProfile] = useAtom(userProfileAtom);
  const { userProfile } = useGetUserProfile();
  if (userProfile && username !== userProfile.username) {
    setUserProfile(undefined);
  }
  const { avatar_url, description, instagram_id, label, liked_count, links, name, stars_count, twitter_id } =
    userProfile as Profile;
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
  const slicedDescription = description && description.length > 80 ? description.slice(0, 80) + "…" : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const onClickHandler = (url: string) => {
    window.open(`${url}`, "_blank");
  };
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-5 px-2">
        <button
          onClick={() => {
            if (pageHistory[0].length > 1 && currentPath !== pageHistory[0][1] && pageHistory[0][1]) {
              router.push(pageHistory[0][1]);
            } else {
              router.push("/");
            }
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-500 shadow-xl shadow-sky-50"
        >
          <FiArrowLeft />
        </button>
        <DropdownBox
          icon={<BsThreeDots className="" />}
          title="Links"
          dropdown={requestDropdown}
          setDropdown={setRequestDropdown}
        >
          {requestMenus.map((menu, index) => {
            return (
              // <button
              //   onClick={() => {
              //     onClickHandler(menu.url);
              //   }}
              //   className="flex items-center gap-3 px-5 py-3 text-sm normal-case text-gray-400"
              //   key={index}
              // >
              //   {menu.icon}
              //   {menu.title}
              // </button>
              <div key={index} className="w-full">
                <DropdownLink title={menu.title} link={menu.url} />
              </div>
            );
          })}
        </DropdownBox>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="mx-auto flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-gray-200">
          <div className="flex flex-col gap-1 px-5 pt-5 pb-4">
            <div className="relative flex items-center gap-4">
              <div
                className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-gray-300`}
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
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.jp/42/333/ffffff/150x150.png?text=N&css=%7B%22color%22%3A%22%20%23333%22%7D`;
                    }}
                  />
                )}
              </div>
              <div className="fle flex-1 flex-col gap-2">
                <h1 className={`inline items-center justify-center text-xl font-bold text-sky-800`}>
                  {name ? name : username}
                </h1>
                <p className="flex items-center gap-1 text-sm font-normal text-sky-800 opacity-50">@{username}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {description && (
                <div className="flex max-w-5xl flex-col gap-1">
                  {description && (
                    <>
                      <p className="mt-1 break-all text-justify text-sm font-normal leading-relaxed text-sky-800 opacity-60 transition-all duration-200 md:text-[15px] ">
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
                </div>
              )}
            </div>
          </div>
          <div className="flex border-t border-slate-100 px-5 py-[14px]">
            <div className="flex gap-5">
              <ProfileCount label="Liked" count={liked_count ? liked_count : 0} />
              <ProfileCount label="Stars" count={stars_count ? stars_count : 0} />
              <ProfileCount label="Hidden(only you)" count={stars_count ? stars_count : 0} />
            </div>
          </div>
        </div>
        <div className={`relative flex flex-col rounded-2xl bg-white shadow-lg shadow-gray-200`}>
          {links &&
            links.map((link, index) => {
              return (
                <div key={index} className="w-full border-b border-gray-100 px-3 py-2 last:border-b-0">
                  <ProfileLink label={link.label} property="default" url={`https://${link.url}`} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
