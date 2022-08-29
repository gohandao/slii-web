import React, { ReactNode } from "react";
import Image from "next/image";

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
        className=" w-9 h-9 flex items-center text-sm justify-center text-white transition-all duration-200 transform hover:bg-gray-600 border-r border-white last:border-none"
      >
        {children}
      </button>
    );
  };
  return (
    <div className="flex justify-center">
      <div className="flex mt-auto w-auto justify-center items-center max-w-lg border border-white rounded opacity-40 overflow-hidden">
        {address && (
          <Button url={`https://etherscan.io/address/${address}`}>
            <FaRegChartBar />
          </Button>
        )}
        {opensea_slug && (
          <Button url={`https://opensea.io/collection/${opensea_slug}`}>
            <Image src="/icon-opensea.svg" width={14} height={14} />
          </Button>
        )}
        {opensea_username && (
          <Button url={`https://opensea.io/${opensea_username}`}>
            <Image src="/icon-opensea.svg" width={14} height={14} />
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
