import { supabase } from "@/libs/supabase";
import React from "react";

export const getNFTs = async (collection_slug: string) => {
  const { data, error } = await supabase
    .from("nfts")
    .select("*", {
      count: "exact",
      head: false,
    })
    .eq("collection_slug", `${collection_slug}`);
  console.log("data ");
  console.log(data);

  return data;
};
