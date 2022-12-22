import { getDiscordMembers } from "@/libs/discord";
import { supabase } from "@/libs/supabase";
import { getTwitterFollowers } from "@/libs/twitter";

const getCreators = async () => {
  if (supabase) {
    const { data, error } = await supabase.from("creators").select();
    if (error) {
      console.log("error");
      console.log(error);
    }
    return data;
  }
};
const getCollections = async () => {
  if (supabase) {
    const { data, error } = await supabase.from("collections").select();
    if (error) {
      console.log("error");
      console.log(error);
    }
    return data;
  }
};

export const updateSocials = async (req: any, res: any) => {
  await updateData();
  console.log("finished");
  res.end();
};

export const updateData = async () => {
  const creators = await getCreators();
  const collections = await getCollections();
  // 1.update creators social
  type CreatorSocial = {
    discord_members: number | null;
    twitter_followers: number | null;
    username: string | null;
  };
  if (creators) {
    creators.map(async (creator, index) => {
      setTimeout(async () => {
        // チェック用
        // if (index % 10 == 0) {
        //   console.log((index * 300) / 1000 + "seconds");
        // }
        const data = {} as CreatorSocial;
        const twitter_id = creator.twitter_id;
        const discord_url = creator.discord_url;
        const discord_id = discord_url && discord_url.substring(discord_url.lastIndexOf("/") + 1);

        // 50 per 1min
        const discord_data = discord_id && (await getDiscordMembers(discord_id));
        // 900 per 15min
        let twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

        twitter_data = twitter_data != undefined && twitter_data != false && twitter_data.data;
        const new_twitter_followers = twitter_data ? twitter_data.public_metrics.followers_count : null;
        const new_discord_members = discord_data && discord_data.code ? discord_data.approximate_member_count : null;
        data.username = creator.username;
        data.twitter_followers = new_twitter_followers;
        data.discord_members = new_discord_members;
        if (supabase) {
          const { error } = await supabase.from("creators").upsert(data).select();
          if (error) {
            console.log("error");
            console.log(error);
          }
        }
      }, index * 1300);
    });
  }
  // 2.update collections social
  type CollectionSocial = {
    discord_members: number | null;
    slug: string | null;
    twitter_followers: number | null;
  };
  if (collections) {
    collections.map(async (collection, index) => {
      setTimeout(async () => {
        // チェック用
        // if (index % 10 == 0) {
        //   console.log((index * 300) / 1000 + "seconds");
        // }
        const data = {} as CollectionSocial;
        const twitter_id = collection.twitter_username;
        const discord_url = collection.discord_url;
        const discord_id = discord_url && discord_url.substring(discord_url.lastIndexOf("/") + 1);

        // 50 per 1min
        const discord_data = discord_id && (await getDiscordMembers(discord_id));

        let twitter_data: any;
        // 900 per 15min
        twitter_data = twitter_id && (await getTwitterFollowers(twitter_id));

        twitter_data = twitter_data != undefined && twitter_data != false && twitter_data.data;
        const new_twitter_followers = twitter_data ? twitter_data.public_metrics.followers_count : null;
        const new_discord_members = discord_data && discord_data.code ? discord_data.approximate_member_count : null;

        data.slug = collection.slug;
        data.twitter_followers = new_twitter_followers;
        data.discord_members = new_discord_members;
        if (supabase) {
          const { error } = await supabase.from("collections").upsert(data).select();
          if (error) {
            console.log("error");
            console.log(error);
          }
        }
      }, index * 1300);
    });
  }
  return;
};
export default updateSocials;
