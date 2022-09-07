import React, { useContext, useEffect, useState } from "react";
import { base } from "@/libs/airtable";

import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { BaseContext } from "@/contexts/BaseContext";
import { Social } from "@/types/social";

type Props = {
  record_id?: string | null;
  creator_username?: string;
  collection_slug?: string;
  twitter_id?: string;
  twitter_followers: number | null;
  discord_id?: string;
  discord_members: number | null;
};
export const SocialCount = ({
  record_id,
  creator_username,
  collection_slug,
  twitter_id,
  twitter_followers,
  discord_members,
  discord_id,
}: Props) => {
  console.log("start SocialCount");
  console.log(discord_id);
  const { socials, setSocials } = useContext(BaseContext);

  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

  const [twitterData, setTwitterData] = useState<any>();
  const [discordData, setDiscordData] = useState<any>();
  // const new_twitter_followers = twitterData
  //   ? twitterData.public_metrics.followers_count
  //   : twitter_followers;
  // const new_discord_members = discordData
  //   ? discordData.approximate_presence_count
  //   : discord_members;

  const checkExistence = () => {
    if (socials) {
      //set collection
      const socials_filter = socials.filter(
        (social) =>
          (creator_username && social.creator_username === creator_username) ||
          (collection_slug && social.collection_slug === collection_slug)
      );
      console.log("socials_filter");
      console.log(socials_filter);
      if (socials_filter.length > 0) {
        return true;
      }
      return false;
    }
  };

  type Props = {
    twitter_followers: number;
    discord_members: number;
  };
  const updateSocialCount = async ({
    twitter_followers,
    discord_members,
  }: Props) => {
    console.log(twitter_followers);
    console.log(discord_members);
    const exsistence = checkExistence();

    let new_records: Social;

    if (exsistence) {
      console.log("start update");

      await base("social").update([
        {
          id: record_id,
          fields: {
            creator_username: creator_username,
            collection_slug: collection_slug,
            twitter_followers: twitter_followers,
            discord_members: discord_members,
          },
        },
      ]);
      console.log("end update");
    } else {
      console.log("start create");

      await base("social").create([
        {
          fields: {
            creator_username: creator_username,
            collection_slug: collection_slug,
            twitter_followers: twitter_followers,
            discord_members: discord_members,
          },
        },
      ]);
      new_records = {
        creator_username: creator_username ? creator_username : null,
        collection_slug: collection_slug ? collection_slug : null,
        twitter_followers: twitter_followers,
        discord_members: discord_members,
      };
      const new_socials = [...socials, new_records];
      setSocials(new_socials);
      //setCreated(true);
      console.log("end create");
    }
  };

  let show = false;
  if (twitterData || discordData) {
    show = true;
  }
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const getDiscordMembers = async () => {
    let members;
    await fetch(
      `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("JSON.parse(response)");
        console.log(response);
        //setDiscordData(response);
        members = response;
        return members;
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    return members;
  };
  const getTwitterFollowers = async () => {
    if (baseUrl && twitter_id && !twitterData) {
      let followers;
      await fetch(`${baseUrl}/api/twitter?twitter_id=${twitter_id}`)
        .then((response) => response.json())
        .then((response) => {
          //console.log("JSON.parse(response)");
          //console.log(JSON.parse(response));
          followers = JSON.parse(response);
          //setTwitterData(JSON.parse(response));
          return followers;
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
      return followers;
    }
  };

  useEffect(() => {
    (async () => {
      console.log("1111111");
      //discord_id && !discordData && (await getDiscordMembers());
      console.log("22222222");

      //await getTwitterFollowers();

      let discord_data: any;
      discord_data = discord_id && (await getDiscordMembers());
      let twitter_data: any;
      twitter_data = await getTwitterFollowers();
      setDiscordData(discord_data);
      setTwitterData(twitter_data);
      console.log("2.5");
      // console.log(new_twitter_followers);
      // console.log(new_discord_members);
      // console.log(twitterData);
      // console.log(discordData);
      console.log(twitter_data);
      console.log(discord_data);

      const new_twitter_followers = twitter_data
        ? twitter_data.public_metrics.followers_count
        : twitter_followers;
      const new_discord_members =
        discord_data && discord_data.code
          ? discord_data.approximate_presence_count
          : discord_members;

      if (
        (new_twitter_followers != twitter_followers &&
          new_twitter_followers > 0) ||
        (new_discord_members != discord_members && new_discord_members > 0)
      ) {
        console.log("3333333");

        if (socials) {
          await updateSocialCount({
            twitter_followers: new_twitter_followers,
            discord_members: new_discord_members,
          });
        }
      }
      console.log("44444");
    })();
    //getTwitterFollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
          {discordData && discordData.approximate_member_count > 0 && (
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
