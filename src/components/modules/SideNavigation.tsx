import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLink } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

import { CloseButton } from "@/components/elements/CloseButton";
import { ProfileCount } from "@/components/modules/ProfileCount";
import { authBookmarksAtom, authProfileAtom, authUpvotesAtom } from "@/state/auth.state";
import { showSideNavigationAtom } from "@/state/utilities.state";

export const SideNavigation = () => {
  const [, setShowSideNavigation] = useAtom(showSideNavigationAtom);

  const router = useRouter();
  const currentPath = router.pathname;
  const currentAsPath = router.asPath;
  const [authProfile] = useAtom(authProfileAtom);
  const [authUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks] = useAtom(authBookmarksAtom);

  const liked_count = authUpvotes ? authUpvotes.length : 0;
  const stars_count = authBookmarks ? authBookmarks.length : 0;
  const avatar_url = authProfile?.avatar_url ? authProfile.avatar_url : "/default-avatar.jpg";
  const name = authProfile ? authProfile.name : "Guest";
  const username = authProfile ? authProfile.username : "guest";
  type Menu = {
    icon: JSX.Element;
    path: string;
    text: string;
  };

  const menus = [
    { icon: <HiHome />, path: "/", text: "Home" },
    { icon: <FaUserAlt />, path: `/${authProfile ? authProfile.username : "guest"}`, text: "Profile" },
    { icon: <BsGearFill />, path: "/settings", text: "Settings" },
  ] as Menu[];
  return (
    <div className="flex w-full flex-col p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex h-[44px] w-[44px] overflow-hidden rounded-full shadow-lg">
                <Image src={avatar_url} alt="avatar" width={44} height={44} />
              </div>
              <button
                onClick={() => {
                  setShowSideNavigation(false);
                }}
                className="lg:hidden"
              >
                <CloseButton property="arrow" />
              </button>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-sky-800 line-clamp-1">{name}</p>
              <p className="text-sm font-medium text-sky-800 opacity-50 line-clamp-1">@{username}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <ProfileCount label="Liked" count={liked_count} />
            <ProfileCount label="Stars" count={stars_count} />
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            {menus.map((menu: Menu, index: number) => {
              const status =
                currentAsPath == menu.path ||
                (currentPath == "/account" && menu.path == `/${authProfile?.username}`) ||
                (currentPath == "/creators" && menu.path == `/${authProfile?.username}`) ||
                (currentPath == "/collections" && menu.path == `/${authProfile?.username}`);
              const border = status ? "bg-sky-500" : "";
              const icon_color = status ? "text-sky-500" : "text-gray-400";
              const text_color = status ? "text-sky-700" : "text-gray-700";
              return (
                <li key={index}>
                  <Link
                    href={menu.path}
                    className={`${text_color} relative -mx-5 flex w-full cursor-pointer items-center gap-5 py-[15px] px-5 text-lg font-bold`}
                    onClick={() => {
                      setShowSideNavigation(false);
                    }}
                  >
                    <div
                      className={`absolute left-0 top-1 bottom-1 w-[6px] rounded-br-full rounded-tr-full ${border}`}
                    ></div>
                    <div className={`text-xl ${icon_color}`}>{menu.icon}</div>
                    {menu.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <a
          href="https://www.google.com/"
          className="flex cursor-pointer items-center gap-2 font-normal text-sky-700 underline transition-all duration-200 hover:no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineLink />
          Privacy policy
        </a>
        <a
          href="https://www.google.com/"
          className="flex cursor-pointer items-center gap-2 font-normal text-sky-700 underline transition-all duration-200 hover:no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineLink />
          Join our Discord
        </a>
      </div>
    </div>
  );
};
