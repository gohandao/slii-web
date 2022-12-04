import Image from "next/image";
import type { ReactNode } from "react";
import { BsGlobe2, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaRegChartBar } from "react-icons/fa";

type Props = {
  address?: string;
  discord_url?: string;
  instagram_id?: string;
  opensea_slug?: string;
  opensea_username?: string;
  twitter_id?: string;
  website_url?: string;
};
type ButtonProps = {
  children: ReactNode;
  url: string;
};
export const ProfileLinks = ({
  address,
  discord_url,
  instagram_id,
  opensea_slug,
  opensea_username,
  twitter_id,
  website_url,
}: Props) => {
  const Button = ({ children, url }: ButtonProps) => {
    return (
      <button
        onClick={() => {
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
                height: "12px",
                maxWidth: "100%",
                width: "auto",
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
                height: "12px",
                maxWidth: "100%",
                width: "auto",
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
