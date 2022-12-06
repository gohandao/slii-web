import { base } from "@/libs/airtable";
import { supabase } from "@/libs/supabase";
import type { Creator } from "@/types/creator";
import { getOSData } from "@/utilities/getOSData";
import { getOSUser } from "@/utilities/getOSUser";

const upsertCreators = async (req: any, res: any) => {
  const creators = await getCreators();
  await upsertData(creators);
  console.log("finished");
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

const upsertData = async (creators: Creator[]) => {
  for (let index = 0; index < creators.length; index++) {
    await sleep(300);
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
    await supabase.from("creators").upsert(creators[index]).select();
  }
  return creators;
};
export default upsertCreators;
