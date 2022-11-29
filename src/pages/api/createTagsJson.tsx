const fs = require("fs");
import { getTags } from "@/utilities/getTags";
import { createJson } from "@/utilities/createJson";

const createTagsJson = async (req: any, res: any) => {
  let pathName = "tags.json";
  const source = await getTags("tags");
  let json = JSON.stringify(source);
  await createJson(pathName, json);
  res.end();
};

export default createTagsJson;
