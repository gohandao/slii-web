import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { FaBell } from "react-icons/fa";

import { loginModalAtom, showSideNavigationAtom } from "@/state/utilities.state";

import { authProfileAtom } from "../../state/auth.state";

export const Header: FC = () => {
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [authProfile] = useAtom(authProfileAtom);
  const [showSideNavigation, setShowSideNavigation] = useAtom(showSideNavigationAtom);

  const avatar_src = authProfile?.avatar_url ? authProfile.avatar_url : "/default-avatar.jpg";

  return (
    <header className="relative z-30 h-[68px] w-full py-3">
      <div className="fixed right-0 top-3 mx-auto flex w-full flex-row-reverse items-center justify-between px-5 lg:w-[calc(100%-320px)]">
        <div className="relative flex items-center gap-5">
          {!authProfile && (
            <button
              onClick={() => {
                setLoginModal(true);
              }}
              className="mt-[1px] flex items-center justify-center rounded-full border-2 border-sky-500 bg-white py-1 px-5 font-bold text-sky-500 shadow transition-all duration-300 hover:bg-sky-500 hover:text-white"
            >
              Login
            </button>
          )}
          <Link
            href="https://iktakagishi.notion.site/Slii-Nortifications-e99e2bad898d4c3fa065e829fe93db98"
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white font-bold text-gray-900 shadow lg:h-[44px] lg:w-[44px] "
            target="_blank"
            rel="noreferrer"
          >
            <div className="absolute right-[5px] top-[7px] h-2 w-2 rounded-full bg-yellow-300 lg:right-[9px] lg:top-[10px]"></div>
            <FaBell />
          </Link>
        </div>
        <button
          onClick={() => {
            setShowSideNavigation(!showSideNavigation);
          }}
          className="relative flex h-8 w-8 overflow-hidden rounded-full shadow lg:hidden"
        >
          <Image src={avatar_src} fill alt="avatar" />
        </button>
      </div>
    </header>
  );
};
