import socialsJson from "@/json/socials.json";
import { base } from "@/libs/airtable";
import { sortList } from "@/libs/sortList";
import { supabase } from "@/libs/supabase";
import type { Collection } from "@/types/collection";
import type { Social } from "@/types/social";
import { createJson } from "@/utilities/createJson";

const socials = JSON.parse(JSON.stringify(socialsJson));

const createCollectionJson = async (req: any, res: any) => {
  const pathName = "collections.json";
  const base = await getCollections();
  const data = await getOSCollections(base);
  const source = await sortCollections(data);
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
              creator_id: fields.creator_id[0],
              listed_at: fields.listedAt,
              name: fields.name,
              record_id: fields.record_id,
              slug: fields.slug,
              tags: fields.tags,
              type: fields.type,
              updatedAt: fields.updatedAt,
              verified: fields.verified,
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
const getOSCollections = async (collections: Collection[]) => {
  const options = { method: "GET" };
  const getNewData = async () => {
    let new_list: any = [];
    for (let index = 0; index < collections.length; index++) {
      await sleep(300);
      if (index % 10 == 0) {
        console.log((index * 300) / 1000 + "seconds");
      }
      //1.insert social
      const socials_filter = socials.filter((social: Social) => {
        return social.collection_slug === collections[index].slug;
      });
      const twitter_followers = socials_filter[0] ? socials_filter[0].twitter_followers : null;
      const discord_members = socials_filter[0] ? socials_filter[0].discord_members : null;
      //2.insert upvotes
      let upvotes_count = 0;
      const { data } = await supabase
        .from("upvotes")
        .select("id", {
          count: "exact",
          head: false,
        })
        .eq("collection_slug", collections[index].slug);
      upvotes_count = data ? data.length : 0;
      //3.fetch OpenSea collections
      await fetch(`https://api.opensea.io/api/v1/collection/${collections[index].slug}`, options)
        .then((response) => {
          return response.json();
        })
        .then(async (response) => {
          // fetched data
          const data = response.collection;
          //others
          data.record_id = collections[index].record_id;
          data.tags = collections[index].tags;
          data.type = collections[index].type;
          data.creator_id = collections[index].creator_id;
          data.category = collections[index].category;
          data.listed_at = collections[index].listed_at;
          data.upvotes_count = upvotes_count;
          data.twitter_followers = twitter_followers;
          data.discord_members = discord_members;
          //return data
          const new_data = data;
          delete new_data.traits;
          new_list = [...new_list, new_data];
          new_list = Array.from(new Set(new_list));
        })
        .catch((err) => {
          return console.error(err);
        });
    }
    return new_list;
  };
  const data = await getNewData();
  return data;
};

const sortCollections = async (collections: any) => {
  const args = {
    list: collections,
    order: "desc" as "desc" | "asc" | undefined,
    property: "collections" as "creators" | "collections",
  };
  const data = sortList(args);
  return data;
};

export default createCollectionJson;
