const fs = require("fs");
import { getTags } from "@/utilities/getTags";
import { createJson } from "@/utilities/createJson";

const createTagsJson = async (req: any, res: any) => {
  let pathName = "tags.json";
  const source = await getTags("tags");
  await createJson(pathName, source);
  res.end();
};

export default createTagsJson;
