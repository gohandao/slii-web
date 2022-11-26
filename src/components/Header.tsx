import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Searchbox } from "@/components/Searchbox";
import { AuthContext } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import {
  RiHeartsFill,
  RiHeartsLine,
  RiLoginBoxFill,
  RiLoginBoxLine,
} from "react-icons/ri";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { useRouter } from "next/router";
import { HeaderIcon } from "./HeaderIcon";
import { VscSignIn } from "react-icons/vsc";
import { BsDoorOpen } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { getImageUrl, supabase } from "@/libs/supabase";
import { BiHomeAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { TbDiamond } from "react-icons/tb";

export const Header = () => {
  const router = useRouter();

  const { user, profile, avatar, setAvatar } = useContext(AuthContext);
  // const [avatar, setAvatar] = useState<File>();

  // let avatar_url;
  // let avatar_blob;

  // const getAvatarBlob = async () => {
  //   avatar_blob =
  //     profile && profile.avatar_url && (await getImageUrl(profile.avatar_url));
  //   setAvatar(avatar_blob);
  // };
  // profile && !avatar && getAvatarBlob;
  // useEffect(() => {
  //   !avatar && getAvatarBlob();
  // }, [profile]);

  const { loginModal, setLoginModal, headerIcon } =
    useContext(UtilitiesContext);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  function delQuery(url: string) {
    return url.split("?")[0];
  }
  let currentPath = router.asPath;
  currentPath = delQuery(currentPath);
  let loginPath = "/login?prev=" + currentPath;
  if (currentPath == "/") {
    let loginPath = "/login";
  }

  const [homeClass, setHomeClass] = useState<string>("hidden");

  const [statsClass, setStatsClass] = useState<string>("hidden");

  const [tagsClass, setTagsClass] = useState<string>("hidden");

  useEffect(() => {
    if (
      currentPath != "/" &&
      currentPath != "/collections" &&
      currentPath != "/login"
    ) {
      setHomeClass("");
    }
    if (currentPath != "/stats") {
      setStatsClass("");
    }
    if (currentPath != "/tags") {
      setTagsClass("");
    }
  }, [currentPath]);

  return (
    <header className="relative z-50 py-3" x-data="{expanded: false}">
      <div className="mx-auto flex justify-between px-5 md:px-8">
        <div className="flex flex-1 items-center justify-between gap-20">
          <div className="flex flex-shrink-0 items-center gap-8">
            <HeaderIcon />
            {/* <div className="w-[360px] hidden lg:block">
              <Searchbox />
            </div> */}
          </div>
          {/* <a className="absolute left-0 right-0 top-0 mx-auto inline-flex justify-center h-6 bg-gray-800 w-[100px] rounded-b-lg py-2 opacity-90">
            <Image src="/logo.svg" width={100} height={14} alt="" />
          </a> */}
          <div className="hidden gap-10 pr-16 lg:flex ">
            <Link href="/" legacyBehavior>
              <a
                className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${homeClass}`}
              >
                <span className="mr-2 -mt-[1px] text-xl">
                  <BiHomeAlt />
                </span>
                Home
              </a>
            </Link>
            <Link href="/stats" legacyBehavior>
              <a
                className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${statsClass}`}
              >
                <span className="mr-2 -mt-[1px] text-xl">
                  <TbDiamond />
                </span>
                Stats
              </a>
            </Link>
            <Link href="/tags" legacyBehavior>
              <a
                className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${tagsClass}`}
              >
                <span className="mr-2 -mt-[1px] text-xl">
                  <BiPurchaseTagAlt />
                </span>
                Tags
              </a>
            </Link>
          </div>
        </div>
        <div className="relative flex items-center gap-5">
          {/* <RiHeartsFill className="text-pink-500 text-xl" /> */}
          {/*<RiHeartsLine className="text-gray-500 text-xl" />*/}
          {!user ? (
            <button
              onClick={() => {
                setLoginModal(true);
              }}
              className="flex h-10 w-10 items-center justify-center gap-3 rounded-full border border-gray-700 bg-gray-800 font-bold text-gray-400"
            >
              <RiLoginBoxLine />
            </button>
          ) : (
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className="relative flex h-[44px] w-[44px] items-center justify-center gap-3 overflow-hidden rounded-full border-[3px] border-gray-700 bg-gray-800 text-xl font-bold text-gray-400"
            >
              {avatar ? (
                <Image
                  src={URL.createObjectURL(avatar)}
                  alt=""
                  loading="lazy"
                  className=""
                  quality={20}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  src="/default-avatar.jpg"
                  alt=""
                  loading="lazy"
                  className=""
                  fill
                  sizes="300px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
              {/*<FaRegUser />*/}
            </button>
          )}
          {dropdown && (
            <div
              className={`absolute top-full right-0 z-20 mt-2 w-40 rounded border border-gray-700 bg-gray-800`}
            >
              {user && (
                <>
                  <Link href={`/${profile.username}`} legacyBehavior>
                    <a className="block border-b border-gray-700 px-5 py-3 text-sm text-gray-400">
                      Profile
                    </a>
                  </Link>
                  <Link href="/account" legacyBehavior>
                    <a className="block border-b border-gray-700 px-5 py-3 text-sm text-gray-400">
                      Account
                    </a>
                  </Link>
                  <button
                    onClick={async () => {
                      const { error } = await supabase.auth.signOut();
                      location.reload();
                    }}
                    className="block px-5 py-3 text-sm text-gray-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
