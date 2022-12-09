import { base } from "@/libs/airtable";
import type { Social } from "@/types/social";

export const getSocials = async () => {
  let new_records = [] as Social[];
  await base("social")
    .select({
      maxRecords: 1000,
      view: "All",
    })
    .eachPage(
      (records: any[], fetchNextPage: () => void) => {
        records.forEach((record) => {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              collection_slug: fields.collection_slug,
              creator_username: fields.creator_username,
              discord_members: fields.discord_members,
              record_id: fields.record_id,
              twitter_followers: fields.twitter_followers,
            } as Social,
          ];
        });
        new_records = Array.from(new Set(new_records));
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
  return new_records;
};
