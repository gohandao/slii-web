/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

import { limit } from "@/constant/settings.const";
import type { TCard } from "@/types/tinder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetCombinedList = () => {
  type CombinedFilterProps = {
    ids?: string[];
    order?: string;
    page?: number;
    removeList?: string[];
    search?: string;
    sort?: string;
    type?: string;
  };
  const [list, setList] = useState<TCard[]>([]);
  const getCombinedList = async ({ ids, order, page, removeList, search, sort }: CombinedFilterProps = {}) => {
    const start = page ? (Number(page) - 1) * limit : 0;
    const end = page ? Number(page) * limit - 1 : limit;
    const rangeFilter = `.range(${start}, ${end})`;
    let searchFilter = "";
    if (search) {
      searchFilter = `.ilike("id", "%${search}%")`;
    }
    let sortFilter = "";
    const orderFilter = order == "asc" ? true : false;
    let sort_param = "";
    switch (sort) {
      case "popular":
        sort_param = "upvotes_count";
        break;
      case "newest":
      case "created_at":
        sort_param = "created_date";
        break;
      case "new_listed":
      case "listed_at":
        sort_param = "listed_at";
        break;
      case "name":
      case "username":
        sort_param = "name";
        break;
      case "twitter":
        sort_param = "twitter_followers";
        break;
      case "discord":
        sort_param = "discord_members";
        break;
      default:
        sort_param = "upvotes_count";
        break;
    }
    if (!sort) {
      sortFilter = `.order("upvotes_count", { ascending: ${orderFilter} })`;
    } else {
      sortFilter = `.order("${sort_param}", { ascending: ${orderFilter} })`;
    }
    const idsArray = ids?.map((id) => {
      return `"` + id + `"`;
    });
    const idsFilter = ids && ids.length > 0 ? `.in("id", [${idsArray}])` : "";
    const removeListArray = removeList?.map((id) => {
      return `"` + id + `"`;
    });
    const removeListFilter = removeList && removeList.length > 0 ? `.not("id", "in", '(${removeListArray})')` : "";
    const filter = `supabase.from("combined_table").select("*", { count: 'exact' })${searchFilter}${sortFilter}${removeListFilter}${idsFilter}${rangeFilter}`;
    // const filter = `supabase.from("combined_table").select("*", { count: 'exact' })${searchFilter}${sortFilter}${rangeFilter}`;

    console.log("filter");
    console.log(filter);

    const { count, data, error } = await eval(filter);
    if (error) {
      console.log("error at getCombinedList");
      console.log(error);
    }
    if (data) {
      setList(data as TCard[]);
    }
    console.log("dataaaa");
    console.log(data);

    return { count, data };
  };

  return { getCombinedList, list };
};
