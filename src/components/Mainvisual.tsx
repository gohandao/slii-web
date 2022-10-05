import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
};
export const Mainvisual = () => {
  const Button = ({ href, children }: Props) => {
    return (
      <Link href={href}>
        <a className="border-2 border-gray-900 inline-flex w-32 text-center py-2 rounded-lg justify-center text-sm xl:text-base">
          {children}
        </a>
      </Link>
    );
  };
  return (
    <div className="pt-3">
      <div className="flex gap-3 items-center mb-2">
        <span className="text-2xl">🔎</span>
        <h2 className="text-gradient flex-inline text-lg font-bold leading-[1.2]">
          Find your favorites!!
          {/* Welcome to NFT Otaku!! */}
          {/* Japanese NFT Creators / Collections Database */}
        </h2>
      </div>
      {/*<h2 className="text-gradient flex-inline text-3xl font-bold xl:text-7xl xl:leading-[1.2] mb-3">
        Japanese NFT
        <br />
        <span className="inline">Creators / Collections</span>{" "}
        <span className="inline">Database</span>
      </h2>
      <p className="tracking-wider">Search creators, collections and NFTs.</p>
      <div className="flex gap-3 mt-8">
        <Button href="/creators">Creators</Button>
        <Button href="/collections">Collections</Button>
        <Button href="/tags">Tags</Button>
  </div>*/}
    </div>
  );
};
