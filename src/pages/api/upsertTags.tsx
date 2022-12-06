import { supabase } from "@/libs/supabase";
import { getTags } from "@/utilities/getTags";

const upsertTags = async (req: any, res: any) => {
  const source = await getTags("tags");
  await supabase
    .from("tags")
    .upsert(source, {
      returning: "minimal", // Don't return the value after inserting
    })
    .select();
  res.end();
};

export default upsertTags;
