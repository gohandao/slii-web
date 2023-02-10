/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

import { limit } from "@/constant/settings.const";
import type { Creator } from "@/types/creator";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetCreators = () => {
  type CreatorsFilterProps = {
    order?: string;
    page?: number;
    removeList?: string[];
    search?: string;
    sort?: string;
    type?: string;
    username?: string;
    usernames?: string[];
  };
  const [creators, setCreators] = useState<Creator[]>([]);
  const getCreators = async ({
    order,
    page,
    removeList,
    search,
    sort,
    type,
    username,
    usernames,
  }: CreatorsFilterProps = {}) => {
    const start = page ? (Number(page) - 1) * limit : 0;
    const end = page ? Number(page) * limit - 1 : limit;
    const rangeFilter = `.range(${start}, ${end})`;
    let typeFilter = "";
    if (type && type != "all") {
      typeFilter = `.eq("type", type)`;
    }
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
    const usernameFilter = username ? `.eq("username", "${username}").single()` : "";
    const usernamesArray = usernames?.map((username) => {
      return `"` + username + `"`;
    });
    const usernamesFilter = usernames && usernames.length > 0 ? `.in("username", [${usernamesArray}])` : "";
    const removeUsernamesArray = removeList?.map((username) => {
      return `"` + username + `"`;
    });
    const removeUsernamesFilter =
      removeList && removeList.length > 0 ? `.not("username", "in", '(${removeUsernamesArray})')` : "";
    const filter = username
      ? `supabase.from("creators").select('"*", upvotes_count_function, bookmarks_count_function')${usernameFilter}`
      : `supabase.from("creators").select('"*", upvotes_count_function, bookmarks_count_function', { count: 'exact' })${usernamesFilter}${removeUsernamesFilter}${typeFilter}${searchFilter}${sortFilter}${usernameFilter}${rangeFilter}`;

    const { count, data, error } = await eval(filter);
    if (error) {
      console.log(error);
    }
    if (data) {
      setCreators(data as Creator[]);
    }
    return { count, data };
  };

  return { creators, getCreators };
};
