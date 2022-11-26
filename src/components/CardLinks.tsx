import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FaDiscord } from "react-icons/fa";
import { BsTwitter, BsInstagram, BsGlobe2 } from "react-icons/bs";

type Props = {
  twitter_id?: string;
  instagram_id?: string;
  discord_url?: string;
  website_url?: string;
  opensea_url?: string;
};
export const CardLinks = ({
  twitter_id,
  instagram_id,
  discord_url,
  website_url,
  opensea_url,
}: Props) => {
  return (
    <div className="mt-auto flex w-full items-center justify-end gap-3 py-1 opacity-30">
      {/*twitter_id && (
        <object>
          <Link href={`https://twitter.com/${twitter_id}`}>
            <a>
              <Image src="/icon-opensea.svg" width={20} height={20} />
            </a>
          </Link>
        </object>
      )*/}
      {opensea_url && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`${opensea_url}`, "_blank");
          }}
          className="flex items-center"
        >
          <Image
            src="/icon-opensea.svg"
            className=""
            alt=""
            width={14}
            height={14}
            sizes="14px"
            style={{
              maxWidth: "100%",
              width: "auto",
              height: "12px",
            }}
          />
        </button>
      )}
      {twitter_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://twitter.com/${twitter_id}`, "_blank");
          }}
          className="text-sm text-white"
        >
          <BsTwitter />
        </button>
      )}
      {instagram_id && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`https://instagram.com/${instagram_id}`, "_blank");
          }}
          className="text-sm text-white"
        >
          <BsInstagram />
        </button>
      )}
      {discord_url && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`${discord_url}`, "_blank");
          }}
          className="text-sm text-white"
        >
          <FaDiscord />
        </button>
      )}
      {website_url && (
        <button
          onClick={() => {
            //router.push(`https://twitter.com/${twitter_id}`);
            window.open(`${website_url}`, "_blank");
          }}
          className="text-sm text-white"
        >
          <BsGlobe2 />
        </button>
      )}
    </div>
  );
};
