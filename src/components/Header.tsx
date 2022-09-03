import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Searchbox } from "@/components/Searchbox";
import { AuthContext } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export const Header = () => {
  const user = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <header className="py-4 " x-data="{expanded: false}">
      <div className="mx-auto px-5 md:px-8 flex justify-between">
        <div className="flex items-center gap-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="relative flex h-7">
                <Image src="/logo.svg" width={98} height={28} alt="" />
              </a>
            </Link>
          </div>
          <div className="w-[360px] ml-24 hidden lg:block">
            <Searchbox />
          </div>
          <div className="gap-10 hidden lg:flex">
            <Link href="/creators">
              <a className="font-bold text-gray-100 tracking-wider">
                😎<span className="ml-[6px]">Creators</span>
              </a>
            </Link>
            <Link href="/collections">
              <a className="font-bold text-gray-100 tracking-wider">
                🗂<span className="ml-[6px]">Collections</span>
              </a>
            </Link>
            <Link href="/tags">
              <a className="font-bold text-gray-100 tracking-wider">
                📌<span className="ml-[6px]">Tags</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="relative flex items-center">
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
