const fs = require("fs");
import socials from "@/json/socials.json";

import { Collection } from "@/types/collection";
import { base } from "@/libs/airtable";
import { Social } from "@/types/social";
import { getImageUrl, supabase } from "@/libs/supabase";
import { sortList } from "@/libs/sortList";
import { getSocials } from "@/utilities/getSocials";
import { createJson } from "@/utilities/createJson";

const createCollectionJson = async (req: any, res: any) => {
  let pathName = "collections.json";
  let base = await getCollections();
  let data = await getOSCollections(base);
  let source = await sortCollections(data);
  await createJson(pathName, source);
  res.end();
};

const getCollections = async () => {
  let new_records: Collection[] = [];
  await base("collections")
    .select({
      maxRecords: 100,
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
          //console.log("collections", new_records);
          //console.log("Retrieved", record.fields);
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
  // const socials = await getSocials();
  const getNewData = async () => {
    let new_list: any = [];
    await Promise.all(
      collections.map(async (collection, index) => {
        //1.insert social
        const socials_filter = socials.filter(
          //@ts-ignore
          (social) => social.collection_slug === collection.slug
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
          .eq("collection_slug", collection.slug);
        upvotes_count = data ? data.length : 0;
        //3.fetch OpenSea collections
        await fetch(
          `https://api.opensea.io/api/v1/collection/${collection.slug}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            //fetch data
            let data = response.collection;
            //others
            data.record_id = collection.record_id;
            data.tags = collection.tags;
            data.type = collection.type;
            data.creator_id = collection.creator_id;
            data.category = collection.category;
            data.listed_at = collection.listed_at;
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
      })
    );
    return new_list;
  };
  //await getSocialCount();
  const data = await getNewData();
  // console.log("OSnewList.current data");
  // console.log(newList.current);
  // console.log("OSnewList.current");
  // console.log(collections);
  // const new_collections = Array.from(new Set(data));
  // // const result = newOSCollections.current.filter(
  // //   (element, index, self) =>
  // //     self.findIndex((e) => e.slug === element.slug) === index
  // // );
  return data;
};

const sortCollections = async (collections: any) => {
  const args = {
    property: "collections" as "creators" | "collections",
    list: collections,
    order: "desc" as "desc" | "asc" | undefined,
    // sort: "volume",
  };
  const data = sortList(args);
  return data;
};

export default createCollectionJson;
