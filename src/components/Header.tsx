import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Searchbox } from "@/components/Searchbox";
import { AuthContext } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { RiHeartsFill, RiHeartsLine } from "react-icons/ri";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { useRouter } from "next/router";
import { HeaderIcon } from "./HeaderIcon";

export const Header = () => {
  const router = useRouter();

  const user = useContext(AuthContext);
  const { headerIcon } = useContext(UtilitiesContext);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const currentPath = router.pathname;

  return (
    <header className="py-3 " x-data="{expanded: false}">
      <div className="mx-auto px-5 md:px-8 flex justify-between">
        <div className="flex items-center gap-20 justify-between flex-1">
          <div className="flex flex-shrink-0 gap-8 items-center">
            <HeaderIcon />
            <div className="w-[360px] hidden lg:block">
              <Searchbox />
            </div>
          </div>
          <div className="gap-10 hidden lg:flex pr-16 ">
            {currentPath != "/" && (
              <Link href="/">
                <a className="font-bold text-gray-100 tracking-wider">
                  <span className="mr-2">🏠</span>Home
                </a>
              </Link>
            )}
            {currentPath != "/creators" && (
              <Link href="/creators">
                <a className="font-bold text-gray-100 tracking-wider">
                  <span className="mr-2 text-sm">😎</span>Creators
                </a>
              </Link>
            )}
            {currentPath != "/collections" && (
              <Link href="/collections">
                <a className="font-bold text-gray-100 tracking-wider">
                  <span className="mr-2 text-sm">🗂</span>Collections
                </a>
              </Link>
            )}
            {currentPath != "/tags" && (
              <Link href="/tags">
                <a className="font-bold text-gray-100 tracking-wider">
                  <span className="mr-2 text-sm">📌</span>Tags
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="relative flex items-center gap-5">
          <RiHeartsFill className="text-pink-500 text-xl" />
          <RiHeartsLine className="text-gray-500 text-xl" />
          {!user ? (
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className="bg-gray-800 text-gray-400 border border-gray-700 font-bold w-10 h-10 rounded-full flex justify-center items-center gap-3"
            >
              <FaRegUser />
            </button>
          ) : (
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className="bg-gray-800 text-gray-400 border border-gray-700 font-bold w-10 h-10 rounded-full flex justify-center items-center gap-3"
            >
              <FaRegUser />
            </button>
          )}
          {dropdown && (
            <div
              className={`absolute top-full right-0 rounded border border-gray-700 bg-gray-800 w-40 mt-2 z-20`}
            >
              {!username && (
                <>
                  <Link href="/login">
                    <a className="block px-5 py-3 text-sm text-gray-400 border-b border-gray-700">
                      Login
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="block px-5 py-3 text-sm text-gray-400">
                      Signup
                    </a>
                  </Link>
                </>
              )}
              {username && (
                <>
                  <Link href="/account">
                    <a className="block px-5 py-3 border-b border-gray-700 text-sm text-gray-400">
                      Account
                    </a>
                  </Link>
                  <Link href={`/likes/${username}`}>
                    <a className="block px-5 py-3 text-sm text-gray-400">
                      Liked songs
                    </a>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
