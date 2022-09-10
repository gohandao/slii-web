import React, { ReactNode, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { TbUsers } from "react-icons/tb";
import { BsCollection, BsMailbox, BsTags } from "react-icons/bs";
import { BreadCrumbs } from "./BreadCrumbs";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
//import "https://files.coinmarketcap.com/static/widget/coinMarquee.js";

type ButtonProps = {
  url: string;
  title: string;
};
type FixedMenuProps = {
  href: string;
  children: ReactNode;
};
export const Footer = () => {
  const { breadcrumbList } = useContext(UtilitiesContext);
  const Button = ({ url, title }: ButtonProps) => {
    return (
      <Link href={url}>
        <a className="flex justify-center items-center px-5 py-5 rounded bg-gray-900 text-white">
          {title}
        </a>
      </Link>
    );
  };
  const FixedMenu = ({ href, children }: FixedMenuProps) => {
    return (
      <Link href={href}>
        <a className="flex items-center justify-center px-3 py-4 text-xl w-full text-gray-400 border-r border-gray-700 last:border-none">
          {children}
        </a>
      </Link>
    );
  };
  return (
    <>
      {/*<div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl flex justify-center mb-10">
        <div className="flex gap-5">
          <Button url="https://google.com" title="NFT OTAKU" />
          <Button url="https://google.com" title="Request" />
        </div>
  </div>*/}
      <div className="pt-16">
        <BreadCrumbs list={breadcrumbList} />
      </div>
      <footer className="pb-20 md:pb-3">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          {/*<div className="justify-center items-center flex text-center mb-2">
            <Link href="/">
              <a className="relative flex h-8">
                <Image src="/logo.svg" width={138} height={24} alt="" />
              </a>
            </Link>
</div>*/}
          <small className="text-gray-400 text-sm text-center flex justify-center">
            ©︎ NFT OTAKU 2022
          </small>
        </div>
      </footer>
      <div className="fixed bottom-2 left-3 right-3 rounded bg-gray-800 flex md:hidden max-w-lg mx-auto border border-gray-700 z-20">
        <FixedMenu href="/">
          {/*<AiOutlineHome />*/}
          🏠
        </FixedMenu>
        <FixedMenu href="/creators">
          {/*<TbUsers />*/}
          😎
        </FixedMenu>
        <FixedMenu href="/collections">
          {/*<BsCollection />*/}
          🗂
        </FixedMenu>
        <FixedMenu href="/tags">
          {/*<BsTags />*/}
          📌
        </FixedMenu>
        <FixedMenu href="/">{/*<BsMailbox />*/}📪</FixedMenu>
      </div>
    </>
  );
};
