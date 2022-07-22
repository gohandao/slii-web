import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Searchbox } from "@/components/Searchbox";

export const Header = () => {
  return (
    <header
      className="py-4 bg-white border-b border-gray-100"
      x-data="{expanded: false}"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="relative flex h-7">
                <Image src="/logo.svg" width={98} height={28} />
              </a>
            </Link>
          </div>
          <div className="w-[360px] ml-24">
            <Searchbox />
          </div>
          <div className="flex gap-10">
            <Link href="/creators">
              <a className="font-bold">Creators</a>
            </Link>
            <Link href="/collections">
              <a className="font-bold">Collections</a>
            </Link>
            <Link href="/tags">
              <a className="font-bold">Tags</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
