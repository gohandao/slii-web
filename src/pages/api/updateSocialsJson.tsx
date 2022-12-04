import collectionsJson from "@/json/collections.json";
import creatorsJson from "@/json/creators.json";
import { getDiscordMembers } from "@/libs/discord";
import { getTwitterFollowers } from "@/libs/twitter";
import type { Creator } from "@/types/creator";
import type { Social } from "@/types/social";
import { createJson } from "@/utilities/createJson";

const creators = creatorsJson as Creator[];
const collections = collectionsJson as any[];

const callback = () => {
  return console.log("waiting...");
};
const sleep = (delay = 1000) => {
  return new Promise<void>((resolve) => {
    return setTimeout(() => {
      callback();
      return resolve();
    }, delay);
  });
};

export const updateSocialsJson = async (req: any, res: any) => {
  const creators_pathName = "creators.json";
  const creators_socials = await getCreatorSocials();
  const creators_source = await updateCreatorSocials(creators_socials);
  await createJson(creators_pathName, creators_source);
  res.end();
  const collections_pathName = "collections.json";
  const collections_socials = await getColelctionSocials();
  const collections_source = await updateCollectionSocials(collections_socials);
  await createJson(collections_pathName, collections_source);
  res.end();
  const pathName = "socials.json";
  const source = [...collections_socials, ...creators_socials];
  await createJson(pathName, source);
  res.end();
};

const updateCreatorSocials = async (socials: Social[]) => {
  const new_creators = creators.map((creator: Creator, index: number) => {
    const socials_filter = socials.filter((social) => {
      return social.creator_username === collections[index].creator_id;
    });
    const twitter_followers = socials_filter[0] ? socials_filter[0].twitter_followers : null;
    creator.twitter_followers = twitter_followers as number;
    return creator;
  });
  return new_creators as Creator[];
};
const updateCollectionSocials = async (socials: Social[]) => {
  const new_collections = collections.map((collection: any) => {
    const socials_filter = socials.filter((social) => {
      return social.creator_username === collection.creator_id;
    });
    const twitter_followers = socials_filter[0] ? socials_filter[0].twitter_followers : null;
    const discord_members = socials_filter[0] ? socials_filter[0].discord_members : null;
    collection.twitter_followers = twitter_followers;
    collection.discord_members = discord_members;
    return collection;
  });
  return new_collections as any[];
};

export const getCreatorSocials = async () => {
  type Social = {
    collection_slug: string | null;
    creator_username: string | null;
    discord_members: number | null;
    twitter_followers: number | null;
  };
  let socials = [] as Social[];
  //creators
  for (let index = 0; index < creators.length; index++) {
    await sleep(1300);
    // チェック用
    // if (index % 10 == 0) {
    //   console.log((index * 300) / 1000 + "seconds");
    // }
    const data = {} as Social;
    const twitter_id = creators[index].twitter_id;
    const discord_url = creators[index].discord_url;
    const discord_id = discord_url && discord_url.substring(discord_url.lastIndexOf("/") + 1);

    // 50 per 1min
    const discord_data = discord_id && (await getDiscordMembers(discord_id));
    // 900 per 15min
    let twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

    twitter_data = twitter_data != undefined && twitter_data != false && twitter_data.data;
    const new_twitter_followers = twitter_data ? twitter_data.public_metrics.followers_count : null;
    const new_discord_members = discord_data && discord_data.code ? discord_data.approximate_member_count : null;
    data.creator_username = creators[index].username;
    data.collection_slug = null;
    data.twitter_followers = new_twitter_followers;
    data.discord_members = new_discord_members;
    socials = [...socials, data];
  }
  return socials;
};
const getColelctionSocials = async () => {
  type Social = {
    collection_slug: string | null;
    creator_username: string | null;
    discord_members: number | null;
    twitter_followers: number | null;
  };
  let socials = [] as Social[];
  for (let index = 0; index < collections.length; index++) {
    await sleep(1300);
    if (index % 10 == 0) {
      console.log((index * 300) / 1000 + "seconds");
    }
    const data = {} as Social;
    const twitter_id = collections[index].twitter_username;
    const discord_url = collections[index].discord_url;
    const discord_id = discord_url && discord_url.substring(discord_url.lastIndexOf("/") + 1);

    // 50 per 1min
    const discord_data = discord_id && (await getDiscordMembers(discord_id));

    let twitter_data: any;
    // 900 per 15min
    twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

    twitter_data = twitter_data != undefined && twitter_data != false && twitter_data.data;
    const new_twitter_followers = twitter_data ? twitter_data.public_metrics.followers_count : null;
    const new_discord_members = discord_data && discord_data.code ? discord_data.approximate_member_count : null;

    data.creator_username = null;
    data.collection_slug = collections[index].slug;
    data.twitter_followers = new_twitter_followers;
    data.discord_members = new_discord_members;
    socials = [...socials, data];
  }
  return socials;
};
export default updateSocialsJson;
