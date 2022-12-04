import Link from "next/link";
import type { FC, ReactNode } from "react";
import { useContext } from "react";
import { BiHomeAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { FaDiscord, FaRegUserCircle } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { TbDiamond, TbMailbox } from "react-icons/tb";

import { AuthContext } from "@/contexts/AuthContext";

type FixedMenuProps = {
  children: ReactNode;
  href: string;
};
export const Footer: FC = () => {
  const { user } = useContext(AuthContext);
  const FixedMenu = ({ children, href }: FixedMenuProps) => {
    return (
      <Link href={href} legacyBehavior>
        <a className="flex w-full items-center justify-center border-r border-gray-700 px-3 py-[14px] text-2xl text-gray-400 last:border-none">
          {children}
        </a>
      </Link>
    );
  };
  const buttonClass =
    "relative flex justify-center gap-4 items-center w-[240px] max-w-[90%] mx-auto py-2 border-2 text-sm text-center rounded transition-all duration-200 transform";
  return (
    <>
      <div className="pt-16"></div>
      <div className={`mx-auto mb-5 flex max-w-3xl flex-col gap-3 md:flex-row md:gap-5`}>
        <a
          href="https://mrgishi.notion.site/about-NFT-OTAKU-41f9dcea9d89494b8986b9d18eddd791"
          target="_blank"
          rel="noreferrer"
          className={`border-gray-500 pl-4 pr-5 text-gray-500 hover:bg-gray-700 hover:text-gray-100 ${buttonClass}`}
        >
          <SiNotion className="absolute left-5 top-0 flex h-full items-center justify-center" />
          About Us
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfd0_agN6SLqM0PlYxjL4E9HiLdq6_9KN3i65Z2byNWCBj11w/viewform"
          target="_blank"
          rel="noreferrer"
          className={`border-gray-500 pl-4 pr-5 text-gray-500 hover:bg-gray-700 hover:text-gray-100 ${buttonClass}`}
        >
          <TbMailbox className="absolute left-5 top-0 flex h-full items-center justify-center" />
          Request
        </a>
        <a
          href="https://discord.gg/EAWuqPsh"
          target="_blank"
          rel="noreferrer"
          className={`border-purple-700 pr-5 pl-8 text-purple-700 hover:bg-purple-700 hover:text-purple-100 ${buttonClass}`}
        >
          <FaDiscord className="absolute left-5 top-0 flex h-full items-center justify-center" />
          Join NFT OTAKU DAO!
        </a>
      </div>
      <footer className="pb-20 md:pb-3">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <small className="flex justify-center text-center text-sm text-gray-400">©︎ NFT OTAKU 2022</small>
        </div>
      </footer>
      <div className="fixed bottom-0 left-0 z-20 mx-auto flex w-full border-t border-gray-700 bg-gray-800 md:hidden">
        <FixedMenu href="/">
          <BiHomeAlt />
        </FixedMenu>
        <FixedMenu href="/stats">
          <TbDiamond />
        </FixedMenu>
        <FixedMenu href="/tags">
          <BiPurchaseTagAlt />
        </FixedMenu>
        <FixedMenu href="/">
          <BsMailbox />
        </FixedMenu>
        {user ? (
          <FixedMenu href="/account">
            <FaRegUserCircle />
          </FixedMenu>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
