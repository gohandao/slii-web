import { base } from "@/libs/airtable";
import type { Social } from "@/types/social";

type Props = {
  collection_slug?: string;
  creator_username?: string;
  discord_id?: string;
  discord_members: number | null;
  record_id?: string | null;
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
  socials: Social[];
  twitter_followers: number | null;
  twitter_id?: string;
};

export const updateSocial = async ({
  collection_slug,
  creator_username,
  discord_id,
  discord_members,
  record_id,
  setSocials,
  socials,
  twitter_followers,
  twitter_id,
}: Props) => {
  const checkExistence = () => {
    if (socials) {
      //set collection
      const socials_filter = socials.filter((social) => {
        return (
          (creator_username && social.creator_username === creator_username) ||
          (collection_slug && social.collection_slug === collection_slug)
        );
      });
      if (socials_filter.length > 0) {
        return true;
      }
      return false;
    }
  };
  // 1.get social counts
  // let discord_data: any;
  const discord_data = discord_id && ((await getDiscordMembers(discord_id)) as any);
  const twitter_data = twitter_id && ((await getTwitterFollowers(twitter_id)) as any);
  const new_twitter_followers = twitter_data ? twitter_data.public_metrics.followers_count : twitter_followers;
  const new_discord_members =
    discord_data && discord_data.code ? discord_data.approximate_member_count : discord_members;

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
            collection_slug: collection_slug,
            creator_username: creator_username,
            discord_members: new_discord_members,
            twitter_followers: new_twitter_followers,
          },
        },
      ]);
      new_records = {
        collection_slug: collection_slug ? collection_slug : null,
        creator_username: creator_username ? creator_username : null,
        discord_members: discord_members,
        twitter_followers: twitter_followers,
      };

      const new_socials = socials.map((social) => {
        if (social.creator_username === creator_username) {
          return {
            ...social,
            discord_members: new_discord_members,
            twitter_followers: new_twitter_followers,
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
            collection_slug: collection_slug,
            creator_username: creator_username,
            discord_members: new_discord_members,
            twitter_followers: new_twitter_followers,
          },
        },
      ]);
      new_records = {
        collection_slug: collection_slug ? collection_slug : null,
        creator_username: creator_username ? creator_username : null,
        discord_members: discord_members,
        twitter_followers: twitter_followers,
      };
      const new_socials = [...socials, new_records];
      setSocials(new_socials);
      console.log("end create");
    }
  }
  // 4.return
  const data = {
    discord_members: new_discord_members,
    twitter_followers: new_twitter_followers,
  };
  return data;
};

const getDiscordMembers = async (discord_id: string) => {
  let members;
  await fetch(`https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
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
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }
  let followers;
  await fetch(`${baseUrl}/api/twitter?twitter_id=${twitter_id}`)
    .then((response) => {
      return response.json();
    })
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
