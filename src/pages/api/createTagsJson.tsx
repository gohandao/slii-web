const fs = require("fs");
import { Collection } from "@/types/collection";
import { base } from "@/libs/airtable";
import { Tag } from "@/types/tag";
import { getImageUrl, supabase } from "@/libs/supabase";
import { sortList } from "@/libs/sortList";
import { getTags } from "@/utilities/getTags";
import { createJson } from "@/utilities/createJson";

const createTagsJson = async () => {
  let pathName = "tags.json";
  const source = await getTags("tags");
  await createJson(pathName, source);
  return;
};

export default createTagsJson;
