import { base } from "@/libs/airtable";
import { supabase } from "@/libs/supabase";
import type { Collection } from "@/types/collection";
import { getOSUser } from "@/utilities/getOSUser";

const upsertCollections = async (req: any, res: any) => {
  const base = await getCollections();
  await upsertData(base);
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

const getCollections = async () => {
  let new_records: Collection[] = [];
  await base("collections")
    .select({
      // maxRecords: 1000,
      view: "All",
    })
    .eachPage((records: any[], fetchNextPage: () => void) => {
      records.forEach((record) => {
        try {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              category: fields.category,
              creator_address: fields.address[0],
              creator_username: fields.address[0],
              listed_at: fields.listedAt,
              name: fields.name,
              slug: fields.slug,
              tags: fields.tags,
              type: fields.type,
              // verified: fields.verified,
            } as Collection,
          ];
        } catch (error) {
          console.log(error);
          return;
        }
      });
      try {
        fetchNextPage();
      } catch (error) {
        console.log(error);
        return;
      }
    });
  return new_records;
};
const upsertData = async (collections: Collection[]) => {
  const options = { method: "GET" };
  for (let index = 0; index < collections.length; index++) {
    // for (let index = 0; index < 3; index++) {
    await sleep(300);
    if (index % 10 == 0) {
      console.log((index * 300) / 1000 + "seconds");
    }
    //1.insert social
    const OSUser = await getOSUser(collections[index].creator_address);
    const username = OSUser.username;
    //2.insert upvotes
    if (supabase) {
      const { error } = await supabase
        .from("upvotes")
        .select("id", {
          count: "exact",
          head: false,
        })
        .eq("collection_slug", collections[index].slug);
      if (error) {
        console.log("error");
        console.log(error);
      }
    }
    //3.fetch OpenSea collections
    await fetch(`https://api.opensea.io/api/v1/collection/${collections[index].slug}`, options)
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        response = response.collection;
        const data = {} as any;
        data.creator_username = username;
        data.creator_address = collections[index].creator_address;
        data.name = response.name;
        data.slug = response.slug;
        data.tags = collections[index].tags;
        data.type = collections[index].type;
        data.category = collections[index].category;
        data.listed_at = collections[index].listed_at;
        const upvotes_data =
          supabase &&
          (await supabase.from("upvotes").select("*", { count: "exact" }).eq("collection_slug", response.slug));
        const upvotes_count = upvotes_data && upvotes_data.count;
        // fetched data
        const symbols =
          response.payment_tokens &&
          response.payment_tokens.map((token: any) => {
            return token.symbol;
          });
        data.symbols = symbols;
        data.one_hour_volume = response.stats.one_hour_volume;
        data.one_hour_change = response.stats.one_hour_volume;
        data.one_hour_sales = response.stats.one_hour_sales;
        data.one_hour_sales_change = response.stats.one_hour_sales_change;
        data.one_hour_average_price = response.stats.one_hour_volume;
        data.one_hour_difference = response.stats.one_hour_average_price;
        data.six_hour_volume = response.stats.six_hour_volume;
        data.six_hour_change = response.stats.six_hour_change;
        data.six_hour_sales = response.stats.six_hour_sales;
        data.six_hour_sales_change = response.stats.six_hour_sales_change;
        data.six_hour_average_price = response.stats.six_hour_average_price;
        data.six_hour_difference = response.stats.six_hour_difference;
        data.one_day_volume = response.stats.one_day_volume;
        data.one_day_change = response.stats.one_day_change;
        data.one_day_sales = response.stats.one_day_sales;
        data.one_day_sales_change = response.stats.one_day_sales_change;
        data.one_day_average_price = response.stats.one_day_average_price;
        data.one_day_difference = response.stats.one_day_difference;
        data.seven_day_volume = response.stats.seven_day_volume;
        data.seven_day_change = response.stats.seven_day_change;
        data.seven_day_sales = response.stats.seven_day_sales;
        data.seven_day_average_price = response.stats.seven_day_average_price;
        data.seven_day_difference = response.stats.seven_day_difference;
        data.thirty_day_volume = response.stats.thirty_day_volume;
        data.thirty_day_change = response.stats.thirty_day_change;
        data.thirty_day_sales = response.stats.thirty_day_sales;
        data.thirty_day_average_price = response.stats.thirty_day_average_price;
        data.thirty_day_difference = response.stats.thirty_day_difference;
        data.total_volume = response.stats.total_volume;
        data.total_sales = response.stats.total_sales;
        data.total_supply = response.stats.total_supply;
        data.num_owners = response.stats.num_owners;
        data.average_price = response.stats.average_price;
        data.market_cap = response.stats.market_cap;
        data.floor_price = response.stats.floor_price;
        data.banner_image_url = response.banner_image_url;
        data.created_date = response.created_date;
        data.description = response.description;
        data.discord_url = response.discord_url;
        data.external_url = response.external_url;
        data.featured_image_url = response.featured_image_url;
        data.safelist_request_status = response.safelist_request_status;
        data.image_url = response.image_url;
        data.telegram_url = response.telegram_url;
        data.twitter_username = response.twitter_username;
        data.instagram_username = response.instagram_username;
        data.fees = response.fees;
        data.is_rarity_enabled = response.is_rarity_enabled;
        data.upvotes_count = upvotes_count;
        if (supabase) {
          const { error } = await supabase.from("collections").upsert(data).select();
          if (error) {
            console.log("error");
            console.log(error);
          }
        }
      })
      .catch((err) => {
        return console.error(err);
      });
  }
  return;
};
export default upsertCollections;
