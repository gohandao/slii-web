import React, { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

type Props = {
  twitter_id?: string;
  discord_id?: string;
};
export const SocialCount = ({ twitter_id, discord_id }: Props) => {
  const [twitterData, setTwitterData] = useState<any>();
  const [discordData, setDiscordData] = useState<any>();

  let show = false;
  if (twitterData || discordData) {
    show = true;
  }
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const getDiscordMembers = () => {
    fetch(
      `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("JSON.parse(response)");
        console.log(response);
        setDiscordData(response);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  useEffect(() => {
    discord_id && !discordData && getDiscordMembers();
    //getTwitterFollowers();
    if (baseUrl && twitter_id && !twitterData) {
      fetch(`${baseUrl}/api/twitter?twitter_id=${twitter_id}&type=creator`)
        .then((response) => response.json())
        .then((response) => {
          //console.log("JSON.parse(response)");
          //console.log(JSON.parse(response));
          setTwitterData(JSON.parse(response));
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }, []);
  type StatsProps = {
    icon: any;
    title01: string;
    title02: string;
    stats01: number;
    stats02: number;
  };
  const SocialStats = ({
    icon,
    title01,
    title02,
    stats01,
    stats02,
  }: StatsProps) => {
    return (
      <div className="flex pl-[14px] pr-1 py-2 items-center bg-gray-800 border-gray-700 last:border-none md:border-r border-b md:border-b-0">
        <div className="-mr-1">{icon}</div>
        <div className="flex flex-col px-3 w-20 text-center w-1/2 md:w-auto">
          <p className="text-xs tracking-wide text-gray-400">{title01}</p>
          <div className="mt-[2px] text-sm font-medium text-gray-100 tracking-wide inline-flex items-center gap-1 justify-center">
            {stats01}
          </div>
        </div>
        <div className="flex flex-col px-3 border-l border-gray-700 w-20 text-center w-1/2 md:w-auto">
          <p className="text-xs tracking-wide text-gray-400">{title02}</p>
          <div className="mt-[2px] text-sm font-medium text-gray-100 tracking-wide inline-flex items-center gap-1 justify-center">
            {stats02}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {show && (
        <div className="justify-center max-w-md md:max-w-2xl inline-flex rounded border border-gray-700 overflow-hidden mt-1 flex-col md:flex-row max-w-sm w-full md:w-auto mx-auto">
          {twitterData && twitterData.public_metrics && (
            <SocialStats
              icon={<BsTwitter className="text-gray-500" />}
              title01="Following"
              stats01={twitterData.public_metrics.following_count as number}
              title02="Followers"
              stats02={twitterData.public_metrics.followers_count}
            />
          )}
          {discordData && (
            <SocialStats
              icon={<FaDiscord className="text-gray-500" />}
              title01="Online"
              stats01={discordData.approximate_presence_count as number}
              title02="Members"
              stats02={discordData.approximate_member_count}
            />
          )}
        </div>
      )}
    </>
  );
};
