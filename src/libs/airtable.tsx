import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Tag } from "@/types/tag";

//const base = require('airtable').base('appDF2UQxmr5KBu4T')
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});
export const base = Airtable.base("appFYknMhbtkUTFgt");

//for SSG
export const getCreators = () => {
  let new_records: Creator[] = [];
  base("creators")
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 10,
      view: "All",
    })
    .eachPage(
      //@ts-ignore
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(function (record) {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              username: fields.username,
              description: fields.description,
              avatar: fields.avatar,
              background: fields.background,
              address: fields.address,
              website_url: fields.website_url,
              twitter_id: fields.twitter_id,
              instagram_id: fields.instagram_id,
              type: fields.type,
              createdAt: fields.createdAt,
              updatedAt: fields.updatedAt,
              tags: fields.tags,
            } as Creator,
          ];
          //console.log("creators", new_records);
          //console.log("Retrieved", record.fields);
        });
        fetchNextPage();
      },
      function done(err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  return new_records as Creator[];
};

export const getCollections = () => {
  let new_records: Collection[] = [];
  base("collections")
    .select({
      maxRecords: 10,
      view: "All",
    })
    .eachPage(
      //@ts-ignore
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(function (record) {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              slug: fields.slug,
              creator_id: fields.creator_id[0],
              type: fields.type,
              createdAt: fields.createdAt,
              updatedAt: fields.updatedAt,
              tags: fields.tags,
            } as Collection,
          ];
          //console.log("collections", new_records);
          //console.log("Retrieved", record.fields);
        });
        fetchNextPage();
      },
      function done(err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  return new_records as Collection[];
};
