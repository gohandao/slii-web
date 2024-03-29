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
  creators.map(async (creator, index) => {
    setTimeout(async () => {
      const OSUser = await getOSUser(creator.address);
      const avatar = OSUser.account.profile_img_url;
      const username = OSUser.username;
      const verified = OSUser.account.config == "verified" ? true : false;
      const data = await getOSData(username);
      const currentTimestamp = new Date().toISOString();
      if (supabase) {
        if (data) {
          creator.token_symbol = data.token_symbol as string;
          creator.total_volume = data.total_volume as number;
          creator.average_volume = data.average_volume as number;
          creator.average_floor_price = data.average_floor_price as number | undefined;
          creator.total_collections = data.total_collections as number;
          creator.total_supply = data.total_supply as number;
          creator.total_sales = data.total_sales as number;
          creator.background = data.background_image as string | undefined;
        }
        const upvotes_data = await supabase
          .from("upvotes")
          .select("*", { count: "exact" })
          .eq("creator_username", username);
        const upvotes_count = upvotes_data && upvotes_data.count;
        creator.username = username as string;
        creator.avatar = avatar as string | undefined;
        creator.verified = verified;
        creator.upvotes_count = upvotes_count;
        creator.updated_at = currentTimestamp;
        await supabase.from("creators").upsert(creator).select();
      }
    }, index * 3000);
  });

  return creators;
};
export default upsertCreators;
