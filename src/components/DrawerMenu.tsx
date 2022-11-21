import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
import { BsArrowLeftCircle } from "react-icons/bs";

type Props = {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DrawerMenu = ({ status, setStatus }: Props) => {
  //setStatus(true);
  const menus = [
    {
      path: "/",
      emoji: "🏠",
      title: "Home",
    },
    {
      path: "/creators",
      emoji: "😎",
      title: "Creators",
    },
    {
      path: "/collections",
      emoji: "🗂",
      title: "Collections",
    },
    {
      path: "/tags",
      emoji: "📌",
      title: "Tags",
    },
    {
      path: "/login",
      emoji: "📟",
      title: "Login",
    },
  ];
  const base_duration = "transition-all duration-500";
  const statusClass = !status ? "-left-full" : "w-full left-0";
  return (
    <div
      className={`max-w-[360px] fixed h-screen left-0 top-0 bg-gray-800 z-50 ${statusClass} transition-all duration-500`}
    >
      <div className={`relative flex justify-center pt-4 mb-2 `}>
        <Link href="/" legacyBehavior>
          <a className="relative flex h-7">
            <Image src="/logo.svg" width={142} height={20} alt="" />
          </a>
        </Link>
        <button
          className="absolute right-4 top-5"
          onClick={() => {
            setStatus(!status);
          }}
        >
          <BsArrowLeftCircle
            className={`text-gray-500 ml-3 text-xl ${
              !status && "rotate-180"
            } transition-all duration-700`}
          />
        </button>
      </div>
      <p className={`text-gray-500 mb-4 text-center text-xs sm:text-sm `}>
        Japanese NFT Creators / Collections Database
      </p>
      <div className={`flex flex-col`}>
        {menus.map((menu, index) => (
          <Link href={menu.path} key={index} legacyBehavior>
            <a
              className={`relative  font-bold text-base text-white tracking-wider flex items-center py-3 px-5 odd:bg-gray-700`}
            >
              <span className={`text-3xl mr-3 -mt-[2px]`}>{menu.emoji}</span>
              {menu.title}
            </a>
            {/*<a className="relative flex h-7">
            <Image src="/logo.svg" width={142} height={20} alt="" />
      </a>*/}
          </Link>
        ))}
      </div>
    </div>
  );
};
