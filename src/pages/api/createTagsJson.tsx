import { createJson } from "@/utilities/createJson";
import { getTags } from "@/utilities/getTags";

const createTagsJson = async (req: any, res: any) => {
  const pathName = "tags.json";
  const source = await getTags("tags");
  await createJson(pathName, source);
  res.end();
};

export default createTagsJson;
