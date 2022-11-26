import Link from "next/link";
import React from "react";
import Image from "next/image";
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
      className={`fixed left-0 top-0 z-50 h-screen max-w-[360px] bg-gray-800 ${statusClass} transition-all duration-500`}
    >
      <div className={`relative mb-2 flex justify-center pt-4 `}>
        <Link href="/" legacyBehavior>
          <a className="relative flex h-7">
            <Image
              src="/logo.svg"
              width={142}
              height={20}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </a>
        </Link>
        <button
          className="absolute right-4 top-5"
          onClick={() => {
            setStatus(!status);
          }}
        >
          <BsArrowLeftCircle
            className={`ml-3 text-xl text-gray-500 ${
              !status && "rotate-180"
            } transition-all duration-700`}
          />
        </button>
      </div>
      <p className={`mb-4 text-center text-xs text-gray-500 sm:text-sm `}>
        Japanese NFT Creators / Collections Database
      </p>
      <div className={`flex flex-col`}>
        {menus.map((menu, index) => (
          <Link href={menu.path} key={index} legacyBehavior>
            <a
              className={`relative  flex items-center py-3 px-5 text-base font-bold tracking-wider text-white odd:bg-gray-700`}
            >
              <span className={`mr-3 -mt-[2px] text-3xl`}>{menu.emoji}</span>
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
