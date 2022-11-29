import Image from "next/image";
import React, { ReactNode } from "react";

import { FaDiscord, FaRegChartBar } from "react-icons/fa";
import { BsTwitter, BsInstagram, BsGlobe2 } from "react-icons/bs";

type Props = {
  address?: string;
  twitter_id?: string;
  instagram_id?: string;
  discord_url?: string;
  website_url?: string;
  opensea_username?: string;
  opensea_slug?: string;
};
type ButtonProps = {
  url: string;
  children: ReactNode;
};
export const ProfileLinks = ({
  address,
  twitter_id,
  instagram_id,
  discord_url,
  website_url,
  opensea_username,
  opensea_slug,
}: Props) => {
  const Button = ({ children, url }: ButtonProps) => {
    return (
      <button
        onClick={() => {
          //router.push(`https://twitter.com/${twitter_id}`);
          window.open(`${url}`, "_blank");
        }}
        className=" flex h-7 w-6 items-center justify-center text-xs text-white opacity-80"
      >
        {children}
      </button>
    );
  };
  return (
    <div className="flex justify-center">
      <div className="mt-auto flex w-auto max-w-lg items-center justify-center overflow-hidden rounded-full bg-gray-900 px-2 opacity-70">
        {address && (
          <Button url={`https://etherscan.io/address/${address}`}>
            <FaRegChartBar />
          </Button>
        )}
        {opensea_slug && (
          <Button url={`https://opensea.io/collection/${opensea_slug}`}>
            <Image
              src="/icon-opensea.svg"
              width={14}
              height={14}
              alt=""
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "12px",
              }}
            />
          </Button>
        )}
        {opensea_username && (
          <Button url={`https://opensea.io/${opensea_username}`}>
            <Image
              src="/icon-opensea.svg"
              width={14}
              height={14}
              alt=""
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "12px",
              }}
            />
          </Button>
        )}
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <BsTwitter />
          </Button>
        )}
        {instagram_id && (
          <Button url={`https://instagram.com/${instagram_id}`}>
            <BsInstagram />
          </Button>
        )}
        {website_url && (
          <Button url={`${website_url}`}>
            <BsGlobe2 />
          </Button>
        )}
        {discord_url && (
          <Button url={`${discord_url}`}>
            <FaDiscord />
          </Button>
        )}
      </div>
    </div>
  );
};
