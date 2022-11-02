import { Collection } from "@/types/collection";
import { base } from "@/libs/airtable";
import { getImageUrl, supabase } from "@/libs/supabase";
import { sortList } from "@/libs/sortList";
import { Social } from "@/types/social";

export const getSocials = async () => {
  let new_records = [] as Social[];
  await base("social")
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 1000,
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
              creator_username: fields.creator_username,
              collection_slug: fields.collection_slug,
              twitter_followers: fields.twitter_followers,
              discord_members: fields.discord_members,
              record_id: fields.record_id,
            } as Social,
          ];
          //console.log("creators", new_records);
          //console.log("Retrieved", record.fields);
        });
        new_records = Array.from(new Set(new_records));
        try {
          fetchNextPage();
        } catch (error) {
          console.log(error);
          return;
        }
      },
      function done(err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  return new_records;
};
