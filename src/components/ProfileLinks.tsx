import React, { ReactNode } from 'react'
import Image from "next/image"

import { FaDiscord } from "react-icons/fa";
import { BsTwitter, BsInstagram, BsGlobe2 } from "react-icons/bs";

type Props = {
  twitter_id: string,
  instagram_id: string,
  discord_url: string,
  website: string,
  opensea_url: string,
};
type ButtonProps = {
  url: string
  children: ReactNode
}
export const ProfileLinks = ({
  twitter_id,
  instagram_id,
  discord_url,
  website,
  opensea_url,
}: Props) => {

  const Button = ({ children, url }: ButtonProps) => {
    return (
      <button
        onClick={() => {
          //router.push(`https://twitter.com/${twitter_id}`);
          window.open(`${url}`, "_blank");
        }}
        className="border rounded w-10 h-10 flex items-center justify-center"
      >
        {children}
      </button>
    );
  };
  return (
    <div className="flex justify-center">
      <div className="flex gap-2 mt-auto w-auto justify-center items-center max-w-lg">
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <Image src="/icon-opensea.svg" width={20} height={20} />
          </Button>
        )}
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <BsTwitter />
          </Button>
        )}
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <BsInstagram />
          </Button>
        )}
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <BsGlobe2 />
          </Button>
        )}
        {twitter_id && (
          <Button url={`https://twitter.com/${twitter_id}`}>
            <FaDiscord />
          </Button>
        )}
      </div>
    </div>
  );
};
