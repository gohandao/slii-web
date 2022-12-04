import { supabase } from "@/libs/supabase";

export const getNFTs = async (collection_slug: string) => {
  const { data } = await supabase
    .from("nfts")
    .select("*", {
      count: "exact",
      head: false,
    })
    .eq("collection_slug", `${collection_slug}`);
  return data;
};
