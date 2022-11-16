import creators from "@/json/creators.json";
import collections from "@/json/collections.json";
import { getDiscordMembers } from "@/libs/discord";
import { getTwitterFollowers } from "@/libs/twitter";
import { createJson } from "@/utilities/createJson";
export const createSocialsJson = async (req: any, res: any) => {
  const pathName = "socials.json";
  const source = await getSocials();
  await createJson(pathName, source);
  res.end();
};
export const getSocials = async () => {
  type Social = {
    creator_username: string | null;
    collection_slug: string | null;
    twitter_followers: number | null;
    discord_members: number | null;
  };
  let socials = [] as Social[];
  //creators
  const timer = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1300);
    });
  };

  const callback = () => console.log("timeout!");

  const sleep = (delay = 1000) => {
    return new Promise<void>((resolve) => {
      return setTimeout(() => {
        callback();
        return resolve();
      }, delay);
    });
  };
  await Promise.all(
    creators &&
      creators.map(async (creator, index) => {
        // await new Promise((resolve) =>
        //   setTimeout(() => {
        // setTimeout(async () => {
        await sleep(1500);

        let data = {} as Social;
        const twitter_id = creator.twitter_id;
        const discord_url = creator.discord_url;
        const discord_id =
          discord_url &&
          discord_url.substring(discord_url.lastIndexOf("/") + 1);

        let discord_data: any;
        // 50 per 1min
        discord_data = discord_id && (await getDiscordMembers(discord_id));

        let twitter_data: any;
        // 900 per 15min
        twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

        twitter_data =
          twitter_data != undefined &&
          twitter_data != false &&
          twitter_data.data;
        console.log("discord_data hhh");
        console.log(discord_id);
        console.log(discord_data);
        // console.log(twitter_data["data"]);
        const new_twitter_followers = twitter_data
          ? twitter_data.public_metrics.followers_count
          : null;
        const new_discord_members =
          discord_data && discord_data.code
            ? discord_data.approximate_member_count
            : null;
        data.creator_username = creator.username;
        data.collection_slug = null;
        data.twitter_followers = new_twitter_followers;
        data.discord_members = new_discord_members;
        socials = [...socials, data];
        // }, 1300 * index);
        //   }, 1000)
        // );
      })
  );
  //collections
  await Promise.all(
    collections &&
      collections.map(async (collection) => {
        await sleep(1500);

        let data = {} as Social;
        const twitter_id = collection.twitter_username;
        const discord_url = collection.discord_url;
        const discord_id =
          discord_url &&
          discord_url.substring(discord_url.lastIndexOf("/") + 1);

        let discord_data: any;
        // 50 per 1min
        discord_data = discord_id && (await getDiscordMembers(discord_id));

        let twitter_data: any;
        // 900 per 15min
        twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

        twitter_data =
          twitter_data != undefined &&
          twitter_data != false &&
          twitter_data.data;
        console.log("discord_data hhh");
        console.log(discord_id);
        console.log(discord_data);
        // console.log(twitter_data["data"]);
        const new_twitter_followers = twitter_data
          ? twitter_data.public_metrics.followers_count
          : null;
        const new_discord_members =
          discord_data && discord_data.code
            ? discord_data.approximate_member_count
            : null;

        data.creator_username = null;
        data.collection_slug = collection.slug;
        data.twitter_followers = new_twitter_followers;
        data.discord_members = new_discord_members;
        socials = [...socials, data];
      })
  );
  return socials;
};
export default createSocialsJson;
