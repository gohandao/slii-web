import { base } from "@/libs/airtable";
import { Tag } from "@/types/tag";

export const getTags = async (
  baseName: "tags" | "creator_tags" | "collections_tags"
) => {
  let new_records = [] as Tag[];
  await base(baseName)
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 100,
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
              name: fields.name,
              createdAt: fields.createdAt,
              collections: fields.collections_slug,
              creators: fields.creators,
              creators_count: fields.creators_count,
              collections_count: fields.collections_count,
              count: fields.count,
            } as Tag,
          ];
        });
        //sort
        new_records = new_records.sort(function (a, b) {
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
      }
    );
  return new_records;
};
