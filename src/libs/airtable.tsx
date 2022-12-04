import type { Collection } from "@/types/collection";
import type { Creator } from "@/types/creator";

const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  endpointUrl: "https://api.airtable.com",
});
export const base = Airtable.base("appFYknMhbtkUTFgt");

//for SSG
export const getCreators = () => {
  let new_records: Creator[] = [];
  base("creators")
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 100,
      view: "All",
    })
    .eachPage(
      (records: any[], fetchNextPage: () => void) => {
        records.forEach((record) => {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              address: fields.address,
              avatar: fields.avatar,
              background: fields.background,
              description: fields.description,
              instagram_id: fields.instagram_id,
              listed_at: fields.createdAt,
              tags: fields.tags,
              twitter_id: fields.twitter_id,
              type: fields.type,
              updatedAt: fields.updatedAt,
              username: fields.username,
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
      },
      (err: any) => {
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
      maxRecords: 100,
      view: "All",
    })
    .eachPage(
      (records: any[], fetchNextPage: () => void) => {
        records.forEach((record) => {
          try {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                creator_id: fields.creator_id[0],
                listed_at: fields.createdAt,
                slug: fields.slug,
                tags: fields.tags,
                type: fields.type,
                updatedAt: fields.updatedAt,
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
      },
      (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  return new_records as Collection[];
};
