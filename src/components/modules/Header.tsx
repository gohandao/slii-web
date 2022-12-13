import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { BiHomeAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { TbDiamond } from "react-icons/tb";

import { HeaderIcon } from "@/components/modules/HeaderIcon";
import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";

export const Header: FC = () => {
  const router = useRouter();
  const { avatar, profile, user } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const delQuery = (url: string) => {
    return url.split("?")[0];
  };
  let currentPath = router.asPath;
  currentPath = delQuery(currentPath);

  const [homeClass, setHomeClass] = useState<string>("hidden");
  const [statsClass, setStatsClass] = useState<string>("hidden");
  const [tagsClass, setTagsClass] = useState<string>("hidden");

  useEffect(() => {
    if (currentPath != "/" && currentPath != "/collections" && currentPath != "/login") {
      setHomeClass("");
    } else {
      setHomeClass("hidden");
    }
    if (currentPath != "/stats") {
      setStatsClass("");
    } else {
      setStatsClass("hidden");
    }
    if (currentPath != "/tags") {
      setTagsClass("");
    } else {
      setTagsClass("hidden");
    }
  }, [currentPath]);

  return (
    <header className="relative z-50 py-3" x-data="{expanded: false}">
      <div className="header-triangle"></div>
      <div className="mx-auto flex justify-between px-5 md:px-8">
        <div className="flex flex-1 items-center justify-between gap-20">
          <div className="flex flex-shrink-0 items-center gap-8">
            <HeaderIcon />
          </div>
          <div className="hidden gap-10 pr-16 lg:flex ">
            <Link href="/" legacyBehavior>
              <a className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${homeClass}`}>
                <span className="mr-2 -mt-[1px] text-xl">
                  <BiHomeAlt />
                </span>
                Home
              </a>
            </Link>
            <Link href="/stats" legacyBehavior>
              <a className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${statsClass}`}>
                <span className="mr-2 -mt-[1px] text-xl">
                  <TbDiamond />
                </span>
                Stats
              </a>
            </Link>
            <Link href="/tags" legacyBehavior>
              <a className={`flex items-center text-sm font-bold tracking-wider text-gray-100 ${tagsClass}`}>
                <span className="mr-2 -mt-[1px] text-xl">
                  <BiPurchaseTagAlt />
                </span>
                Tags
              </a>
            </Link>
          </div>
        </div>
        <div className="relative flex items-center gap-5">
          {!user ? (
            <button
              onClick={() => {
                setLoginModal(true);
              }}
              className="flex h-10 w-10 items-center justify-center gap-3 rounded-full border border-gray-700 bg-gray-800 font-bold text-gray-400"
            >
              <FaRegUser />
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
                  quality={10}
                  fill
                  sizes="100px"
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
                  quality={10}
                  sizes="100px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
              {/*<FaRegUser />*/}
            </button>
          )}
          {dropdown && (
            <div className={`absolute top-full right-0 z-20 mt-2 w-40 rounded border border-gray-700 bg-gray-800`}>
              {user && (
                <>
                  <Link href={`/${profile.username}`} legacyBehavior>
                    <a className="block border-b border-gray-700 px-5 py-3 text-sm text-gray-400">Profile</a>
                  </Link>
                  <Link href="/account" legacyBehavior>
                    <a className="block border-b border-gray-700 px-5 py-3 text-sm text-gray-400">Account</a>
                  </Link>
                  <button
                    onClick={async () => {
                      if (supabase) {
                        await supabase.auth.signOut();
                        location.reload();
                      }
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
