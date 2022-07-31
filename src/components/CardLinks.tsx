import React from 'react'
import Image from "next/image"
import Link from "next/link"

import { FaDiscord } from "react-icons/fa";
import { BsTwitter, BsInstagram, BsGlobe2 } from "react-icons/bs";

type Props = {
  twitter_id: string,
  instagram_id: string,
  discord_url: string,
  website: string,
  opensea_url: string,
};
export const CardLinks = ({twitter_id, instagram_id, discord_url, website, opensea_url}: Props) => {
  return (
    <div className="flex gap-4 mt-auto border-t w-full justify-center py-[10px] items-center">
      {twitter_id && (
        <object>
          <Link href={`https://twitter.com/${twitter_id}`}>
            <a>
              <Image src="/icon-opensea.svg" width={20} height={20} />
            </a>
          </Link>
        </object>
      )}
      {twitter_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://twitter.com/${twitter_id}`, "_blank");
          }}
        >
          <BsTwitter />
        </button>
      )}
      {twitter_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://twitter.com/${twitter_id}`, "_blank");
          }}
        >
          <BsInstagram />
        </button>
      )}
      {twitter_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://twitter.com/${twitter_id}`, "_blank");
          }}
        >
          <BsGlobe2 />
        </button>
      )}
      {twitter_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://twitter.com/${twitter_id}`, "_blank");
          }}
        >
          <FaDiscord />
        </button>
      )}
    </div>
  );
}
