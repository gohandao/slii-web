const fs = require("fs");
import socialsJson from "@/json/socials.json";

import { Creator } from "@/types/creator";
import { base } from "@/libs/airtable";
import { getSocials } from "@/utilities/getSocials";
import { sortList } from "@/libs/sortList";

import { getImageUrl, supabase } from "@/libs/supabase";
import { getOSUser } from "@/utilities/getOSUser";
import { getOSUserBackground } from "@/utilities/getOSUserBackground";
import { createJson } from "@/utilities/createJson";
import { getOSData } from "@/utilities/getOSData";
import { getDiscordMembers } from "@/libs/discord";
import { getTwitterFollowers } from "@/libs/twitter";

const socials = JSON.parse(socialsJson);

const createCreatorJson = async (req: any, res: any) => {
  let pathName = "creators.json";
  let creators = await getCreators();
  let data = await getCreatorOptions(creators);
  let update_data = await updateSocial(data);
  let source = await sortCreators(update_data);
  let json = JSON.stringify(source);
  await createJson(pathName, json);
  res.end();
};

const callback = () => console.log("waiting...");
const sleep = (delay = 1000) => {
  return new Promise<void>((resolve) => {
    return setTimeout(() => {
      callback();
      return resolve();
    }, delay);
  });
};

const getCreators = async () => {
  let creators = [] as Creator[];
  let new_records: Creator[] = [...creators];
  await base("creators")
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 10,
      view: "All",
    })
    .eachPage(
      //@ts-ignore
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(async function (record) {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              // username: fields.username,
              description: fields.description,
              // avatar: OSUserAvatar,
              // background: OSUserBackground,
              address: fields.address,
              website_url: fields.website_url,
              twitter_id: fields.twitter_id,
              instagram_id: fields.instagram_id,
              discord_url: fields.discord_url,
              type: fields.type,
              verified: fields.verified,
              updatedAt: fields.updatedAt,
              collections: fields.collections,
              category: fields.category,
              tags: fields.tags,
              //掲載された日
              listed_at: fields.listedAt,
            } as Creator,
          ];
          //console.log("creators", new_records);
          //console.log("Retrieved", record.fields);
        });
        try {
          fetchNextPage();
        } catch (error) {
          console.log(error);
          return;
        }
        return new_records as Creator[];
      }
    );
  return new_records;
};

const getCreatorOptions = async (creators: Creator[]) => {
  // await Promise.all(
  //   creators.map(async (creator) => {
  for (let index = 0; index < creators.length; index++) {
    await sleep(300);
    if (index % 10 == 0) {
      console.log((index * 300) / 1000 + "seconds");
    }
    // insert social
    const socials_filter = socials.filter(
      //@ts-ignore
      (social) => social.collection_slug === collections[index].slug
    );
    const twitter_followers = socials_filter[0]
      ? socials_filter[0].twitter_followers
      : null;
    const discord_members = socials_filter[0]
      ? socials_filter[0].discord_members
      : null;
    // others
    const OSUser = await getOSUser(creators[index].address);
    const avatar = OSUser.account.profile_img_url;
    const username = OSUser.username;
    const verified = OSUser.account.config == "verified" ? true : false;
    // const OSUserBackground = await getOSUserBackground(creator.username);
    const data = await getOSData(creators[index].username);
    creators[index].username = username as string;
    creators[index].avatar = avatar as string | undefined;
    creators[index].token_symbol = data.token_symbol as string;
    creators[index].total_volume = data.total_volume as number;
    creators[index].average_volume = data.average_volume as number;
    creators[index].average_floor_price = data.average_floor_price as
      | number
      | undefined;
    creators[index].total_collections = data.total_collections as number;
    creators[index].total_supply = data.total_supply as number;
    creators[index].total_sales = data.total_sales as number;
    creators[index].background = data.background_image as string | undefined;
    creators[index].verified = verified;
    creators[index].twitter_followers = twitter_followers;
    creators[index].discord_members = discord_members;
  }
  return creators;
};

const updateSocial = async (creators: Creator[]) => {
  // const socials = await getSocials();
  let new_creators = [] as any[];
  // await Promise.all(
  //   creators.map(async (creator, index) => {
  for (let index = 0; index < creators.length; index++) {
    let new_creator = creators[index];
    //1.add upvotes
    const { data, error, status } = await supabase
      .from("upvotes")
      .select("id", {
        count: "exact",
        head: false,
      })
      .eq("creator_id", creators[index].username);
    new_creator.upvotes_count = data ? data.length : 0;
    new_creators = [...new_creators, new_creator];
  }
  return new_creators;
};
const sortCreators = async (creators: Creator[]) => {
  const args = {
    property: "creators" as "creators" | "collections",
    list: creators,
    order: "desc" as "desc" | "asc" | undefined,
  };
  const data = sortList(args);
  return data;
};
export default createCreatorJson;
