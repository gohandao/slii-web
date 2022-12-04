import { base } from "@/libs/airtable";
import type { Tag } from "@/types/tag";

export const getTags = async (baseName: "tags" | "creator_tags" | "collections_tags") => {
  let new_records = [] as Tag[];
  await base(baseName)
    .select({
      maxRecords: 100,
      view: "All",
    })
    .eachPage((records: any[], fetchNextPage: () => void) => {
      records.forEach((record) => {
        const fields = record.fields;
        new_records = [
          ...new_records,
          {
            collections: fields.collections_slug,
            collections_count: fields.collections_count,
            count: fields.count,
            createdAt: fields.createdAt,
            creators: fields.creators,
            creators_count: fields.creators_count,
            name: fields.name,
          } as Tag,
        ];
      });
      //sort
      new_records = new_records.sort((a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;
      });
      new_records = Array.from(new Set(new_records));

      try {
        fetchNextPage();
      } catch (error) {
        console.log(error);
        return;
      }
    });
  return new_records;
};
