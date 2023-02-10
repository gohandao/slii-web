import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { FiArrowLeft, FiEdit } from "react-icons/fi";

import { NavButton } from "@/components/elements/NavButton";
import { DropdownBox } from "@/components/modules/DropdownBox";
import { DropdownLink } from "@/components/modules/DropdownLink";
import { ProfileBlock } from "@/components/modules/ProfileBlock";
import { ProfileCount } from "@/components/modules/ProfileCount";
import { ProfileLink } from "@/components/modules/ProfileLink";
import { authProfileAtom } from "@/state/auth.state";
import { guestBookmarksAtom, guestHiddensAtom, guestProfileAtom, guestUpvotesAtom } from "@/state/guest.state";
import { userBookmarksAtom, userHiddensAtom, userProfileAtom, userUpvotesAtom } from "@/state/user.state";
import { pageHistoryAtom } from "@/state/utilities.state";
import type { Profile } from "@/types/profile";

export const ProfileHeader: FC = () => {
  const [authProfile] = useAtom(authProfileAtom);
  const pageHistory = useAtom(pageHistoryAtom);

  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = router.asPath;
  const { username } = router.query;
  const [likedCount, setLikedCount] = useState<number>(0);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [hiddensCount, setHiddensCount] = useState<number>(0);

  const [userProfile] = useAtom(userProfileAtom);
  const [userUpvotes] = useAtom(userUpvotesAtom);
  const [userBookmarks] = useAtom(userBookmarksAtom);
  const [userHiddens] = useAtom(userHiddensAtom);
  const [guestProfile] = useAtom(guestProfileAtom);
  const [guestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks] = useAtom(guestBookmarksAtom);
  const [guestHiddens] = useAtom(guestHiddensAtom);

  const currentProfile = userProfile ? userProfile : guestProfile;
  const currentUpvotes = userProfile ? userUpvotes : guestUpvotes;
  const currentBookmarks = userProfile ? userBookmarks : guestBookmarks;
  const currentHiddens = userProfile ? userHiddens : guestHiddens;

  const { avatar_url, description, instagram_id, links, name, twitter_id } = currentProfile as Profile;
  const dummy_image = "/default-avatar.jpg";
  const [avatarSrc, setAvatarSrc] = useState<string>(dummy_image);

  useEffect(() => {
    avatar_url ? setAvatarSrc(avatar_url) : setAvatarSrc(dummy_image);
  }, [avatar_url]);

  useEffect(() => {
    setLikedCount(currentUpvotes.length);
    setStarsCount(currentBookmarks.length);
    setHiddensCount(currentHiddens.length);
  }, [currentBookmarks.length, currentUpvotes.length, currentHiddens.length]);

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
  // description
  const slicedDescription = description && description.length > 80 ? description.slice(0, 80) + "…" : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-5">
        <button
          onClick={() => {
            if (pageHistory[0].length > 1 && currentPath !== pageHistory[0][1] && pageHistory[0][1]) {
              router.push(pageHistory[0][1]);
            } else {
              router.push("/");
            }
          }}
          className=""
        >
          <NavButton>
            <FiArrowLeft />
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
      <div className="flex w-full flex-col gap-4">
        <ProfileBlock>
          <div className="flex flex-col gap-1 px-5 pt-5 pb-4">
            <div className="relative flex items-center gap-4">
              <div
                className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-gray-300`}
              >
                <Image
                  src={avatarSrc}
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
                  onError={() => {
                    setAvatarSrc(dummy_image);
                    // e.currentTarget.src = `https://placehold.jp/42/333/ffffff/150x150.png?text=N&css=%7B%22color%22%3A%22%20%23333%22%7D`;
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h1
                  className={`inline items-center justify-center text-lg font-bold leading-tight text-sky-800 lg:text-xl`}
                >
                  {name ? name : username}
                </h1>
                <p className="flex items-center gap-1 text-sm font-normal text-sky-800 opacity-50">
                  @{username ? username : guestProfile.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {description && (
                <div className="flex max-w-5xl flex-col gap-1">
                  {description && (
                    <>
                      <p className="mt-1 whitespace-pre-wrap break-all text-justify text-sm font-normal leading-relaxed text-sky-800 opacity-60 transition-all duration-200 md:text-[15px]">
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
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-[14px]">
            <div className="flex gap-5">
              <ProfileCount label="Liked" count={likedCount ? likedCount : 0} />
              <ProfileCount label="Stars" count={starsCount ? starsCount : 0} />
              {(authProfile && authProfile.username == username) ||
                (!authProfile && currentPath == "/guest" && (
                  <ProfileCount label="Hidden(only you)" count={hiddensCount ? hiddensCount : 0} />
                ))}
            </div>
            {authProfile && authProfile.username == username && (
              <Link
                href="/account"
                className="flex h-9 items-center justify-center gap-2 rounded-full bg-gray-900 px-3 text-sm text-white"
              >
                <FiEdit />
                Edit
              </Link>
            )}
          </div>
        </ProfileBlock>
        {(twitter_id || instagram_id || links.length > 0) && (
          <ProfileBlock>
            {twitter_id && (
              <div className="w-full border-b border-gray-100 px-3 py-2 last:border-b-0">
                <ProfileLink label={twitter_id} property="twitter" url={`https://twitter.com/${twitter_id}`} />
              </div>
            )}
            {instagram_id && (
              <div className="w-full border-b border-gray-100 px-3 py-2 last:border-b-0">
                <ProfileLink label={instagram_id} property="instagram" url={`https://instagram.com/${instagram_id}`} />
              </div>
            )}
            {links &&
              links.map((link, index) => {
                return (
                  <div key={index} className="w-full border-b border-gray-100 px-3 py-2 last:border-b-0">
                    <ProfileLink label={link.label} property="default" url={`${link.url}`} />
                  </div>
                );
              })}
          </ProfileBlock>
        )}
      </div>
    </section>
  );
};
