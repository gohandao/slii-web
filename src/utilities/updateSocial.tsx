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
  socials: Social[];
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
};

export const updateSocial = async ({
  record_id,
  creator_username,
  collection_slug,
  twitter_id,
  twitter_followers,
  discord_members,
  discord_id,
  socials,
  setSocials,
}: Props) => {
  const checkExistence = () => {
    if (socials) {
      //set collection
      const socials_filter = socials.filter(
        (social) =>
          (creator_username && social.creator_username === creator_username) ||
          (collection_slug && social.collection_slug === collection_slug)
      );
      if (socials_filter.length > 0) {
        return true;
      }
      return false;
    }
  };
  // 1.get social counts
  let discord_data: any;
  discord_data = discord_id && (await getDiscordMembers(discord_id));
  let twitter_data: any;
  twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));
  const new_twitter_followers = twitter_data
    ? twitter_data.public_metrics.followers_count
    : twitter_followers;
  const new_discord_members =
    discord_data && discord_data.code
      ? discord_data.approximate_member_count
      : discord_members;

  // 2.check database
  const exsistence = checkExistence();

  // 3.update socials
  let new_records: Social;
  if (
    (new_twitter_followers != twitter_followers && new_twitter_followers > 0) ||
    (new_discord_members != discord_members && new_discord_members > 0)
  ) {
    if (exsistence) {
      console.log("start update");
      await base("social").update([
        {
          id: record_id,
          fields: {
            creator_username: creator_username,
            collection_slug: collection_slug,
            twitter_followers: new_twitter_followers,
            discord_members: new_discord_members,
          },
        },
      ]);
      new_records = {
        creator_username: creator_username ? creator_username : null,
        collection_slug: collection_slug ? collection_slug : null,
        twitter_followers: twitter_followers,
        discord_members: discord_members,
      };

      const new_socials = socials.map((social) => {
        if (social.creator_username === creator_username) {
          return {
            ...social,
            twitter_followers: new_twitter_followers,
            discord_members: new_discord_members,
          };
        }
        return social;
      });
      setSocials(new_socials);
      console.log("end update");
    } else {
      console.log("start create");
      await base("social").create([
        {
          fields: {
            creator_username: creator_username,
            collection_slug: collection_slug,
            twitter_followers: new_twitter_followers,
            discord_members: new_discord_members,
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
  }
  // 4.return
  const data = {
    twitter_followers: new_twitter_followers,
    discord_members: new_discord_members,
  };
  return data;
};

const getDiscordMembers = async (discord_id: string) => {
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
const getTwitterFollowers = async (twitter_id: string) => {
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://nftotaku.xyz",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  let followers;
  await fetch(`${baseUrl}/api/twitter?twitter_id=${twitter_id}`)
    .then((response) => response.json())
    .then((response) => {
      followers = JSON.parse(response);
      return followers;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return followers;
};
