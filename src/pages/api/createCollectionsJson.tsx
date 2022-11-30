import socialsJson from "@/json/socials.json";
const socials = JSON.parse(JSON.stringify(socialsJson));
// libs
import { base } from "@/libs/airtable";
import { supabase } from "@/libs/supabase";
import { sortList } from "@/libs/sortList";
// utilities
import { createJson } from "@/utilities/createJson";
// types
import { Collection } from "@/types/collection";

const createCollectionJson = async (req: any, res: any) => {
  let pathName = "collections.json";
  let base = await getCollections();
  let data = await getOSCollections(base);
  let source = await sortCollections(data);
  await createJson(pathName, source);
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

const getCollections = async () => {
  let new_records: Collection[] = [];
  await base("collections")
    .select({
      // maxRecords: 1000,
      // maxRecords: 10,
      view: "All",
    })
    .eachPage(
      //@ts-ignore
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(function (record) {
          try {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                record_id: fields.record_id,
                name: fields.name,
                slug: fields.slug,
                creator_id: fields.creator_id[0],
                type: fields.type,
                listed_at: fields.listedAt,
                updatedAt: fields.updatedAt,
                category: fields.category,
                verified: fields.verified,
                tags: fields.tags,
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
      }
    );
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
      //2.insert upvotes
      let upvotes_count = 0;
      const { data, error, status } = await supabase
        .from("upvotes")
        .select("id", {
          count: "exact",
          head: false,
        })
        .eq("collection_slug", collections[index].slug);
      upvotes_count = data ? data.length : 0;
      //3.fetch OpenSea collections
      await fetch(
        `https://api.opensea.io/api/v1/collection/${collections[index].slug}`,
        options
      )
        .then((response) => response.json())
        .then(async (response) => {
          // fetched data
          let data = response.collection;
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
          let new_data = data;
          delete new_data.traits;
          new_list = [...new_list, new_data];
          new_list = Array.from(new Set(new_list));
        })
        .catch((err) => console.error(err));
    }
    return new_list;
  };
  const data = await getNewData();
  return data;
};

const sortCollections = async (collections: any) => {
  const args = {
    property: "collections" as "creators" | "collections",
    list: collections,
    order: "desc" as "desc" | "asc" | undefined,
  };
  const data = sortList(args);
  return data;
};

export default createCollectionJson;
