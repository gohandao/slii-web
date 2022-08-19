import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Searchbox } from "@/components/Searchbox";

export const Header = () => {
  return (
    <header className="py-4 " x-data="{expanded: false}">
      <div className="mx-auto px-5 md:px-8">
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
              <a className="font-bold text-gray-100 tracking-wider">Creators</a>
            </Link>
            <Link href="/collections">
              <a className="font-bold text-gray-100 tracking-wider">
                Collections
              </a>
            </Link>
            <Link href="/tags">
              <a className="font-bold text-gray-100 tracking-wider">Tags</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
