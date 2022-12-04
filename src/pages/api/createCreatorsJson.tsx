import collectionsJson from "@/json/collections.json";
import socialsJson from "@/json/socials.json";
import { base } from "@/libs/airtable";
import { sortList } from "@/libs/sortList";
import { supabase } from "@/libs/supabase";
import type { Creator } from "@/types/creator";
import type { Social } from "@/types/social";
import { createJson } from "@/utilities/createJson";
import { getOSData } from "@/utilities/getOSData";
import { getOSUser } from "@/utilities/getOSUser";

const collections = JSON.parse(JSON.stringify(collectionsJson)) as any[];
const socials = JSON.parse(JSON.stringify(socialsJson));

const createCreatorJson = async (req: any, res: any) => {
  const pathName = "creators.json";
  const creators = await getCreators();
  const data = await getCreatorOptions(creators);
  const update_data = await updateSocial(data);
  const source = await sortCreators(update_data);
  await createJson(pathName, source);
  res.end();
};

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

const getCreators = async () => {
  const creators = [] as Creator[];
  let new_records: Creator[] = [...creators];
  await base("creators")
    .select({
      // Selecting the first 3 records in All:
      // maxRecords: 10,
      view: "All",
    })
    .eachPage((records: any[], fetchNextPage: () => void) => {
      records.forEach(async (record) => {
        const fields = record.fields;
        new_records = [
          ...new_records,
          {
            address: fields.address,
            category: fields.category,
            collections: fields.collections,
            description: fields.description,
            discord_url: fields.discord_url,
            instagram_id: fields.instagram_id,
            //掲載された日
            listed_at: fields.listedAt,
            tags: fields.tags,
            twitter_id: fields.twitter_id,
            type: fields.type,
            updatedAt: fields.updatedAt,
            verified: fields.verified,
            website_url: fields.website_url,
          } as Creator,
        ];
      });
      try {
        fetchNextPage();
      } catch (error) {
        console.log(error);
        return;
      }
      return new_records as Creator[];
    });
  return new_records;
};

const getCreatorOptions = async (creators: Creator[]) => {
  for (let index = 0; index < creators.length; index++) {
    await sleep(300);
    // insert social
    const socials_filter = socials.filter((social: Social) => {
      return social.collection_slug === collections[index].slug;
    });
    const twitter_followers = socials_filter[0] ? socials_filter[0].twitter_followers : null;
    const discord_members = socials_filter[0] ? socials_filter[0].discord_members : null;
    // others
    const OSUser = await getOSUser(creators[index].address);
    const avatar = OSUser.account.profile_img_url;
    const username = OSUser.username;
    const verified = OSUser.account.config == "verified" ? true : false;
    const data = await getOSData(username);
    creators[index].username = username as string;
    creators[index].avatar = avatar as string | undefined;
    creators[index].token_symbol = data.token_symbol as string;
    creators[index].total_volume = data.total_volume as number;
    creators[index].average_volume = data.average_volume as number;
    creators[index].average_floor_price = data.average_floor_price as number | undefined;
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
  let new_creators = [] as any[];
  for (let index = 0; index < creators.length; index++) {
    const new_creator = creators[index];
    //1.add upvotes
    const { data } = await supabase
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
    list: creators,
    order: "desc" as "desc" | "asc" | undefined,
    property: "creators" as "creators" | "collections",
  };
  const data = sortList(args);
  return data;
};
export default createCreatorJson;
