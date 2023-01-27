/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

import type { TCard } from "@/types/tinder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetCombinedList = () => {
  type CreatorsFilterProps = {
    order?: string;
    page?: number;
    search?: string;
    sort?: string;
    type?: string;
    username?: string;
    usernames?: string[];
  };
  const [list, setList] = useState<TCard[]>([]);
  const getCombinedList = async ({ order, page, search, sort }: CreatorsFilterProps = {}) => {
    const limit = 6;
    const start = page ? (Number(page) - 1) * limit : 0;
    const end = page ? Number(page) * limit - 1 : limit;
    const rangeFilter = `.range(${start}, ${end})`;
    let searchFilter = "";
    if (search) {
      searchFilter = `.ilike("username", "%${search}%")`;
    }
    let sortFilter = "";
    const orderFilter = order == "asc" ? true : false;
    let sort_param = "";
    switch (sort) {
      case "popular":
        sort_param = "upvotes_count_function";
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
        sort_param = "upvotes_count_function";
        break;
    }
    if (!sort) {
      sortFilter = `.order("upvotes_count_function", { ascending: ${orderFilter} })`;
    } else {
      sortFilter = `.order("${sort_param}", { ascending: ${orderFilter} })`;
    }
    const filter = `supabase.from("combined_table").select("*", { count: 'exact' })${searchFilter}${sortFilter}${rangeFilter}`;

    console.log("filter");
    console.log(filter);

    const { count, data, error } = await eval(filter);
    if (error) {
      console.log("error at getCreators");
      console.log(error);
    }
    if (data) {
      setList(data as TCard[]);
    }
    return { count, data };
  };

  return { getCombinedList, list };
};
