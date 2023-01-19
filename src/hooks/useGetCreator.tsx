/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

import type { Creator } from "@/types/creator";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetCreator = () => {
  type CreatorsFilterProps = {
    order?: string;
    page?: number;
    search?: string;
    sort?: string;
    type?: string;
    username?: string;
  };
  const [creator, setCreator] = useState<Creator>();
  const getCreator = async ({ order, page, search, sort, type, username }: CreatorsFilterProps = {}) => {
    const limit = 20;
    const start = page ? (Number(page) - 1) * limit : 0;
    const end = page ? Number(page) * limit - 1 : 99;
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
    const usernameFilter = username ? `.eq("username", "${username}")` : "";
    const filter = username
      ? `supabase.from("creators").select('"*", upvotes_count_function')${usernameFilter}`
      : `supabase.from("creators").select('"*", upvotes_count_function', { count: 'exact' })${typeFilter}${searchFilter}${sortFilter}${usernameFilter}.limit(1).single()`;
    console.log("filter");
    console.log(filter);

    const { count, data, error } = await eval(filter);
    console.log("data");
    console.log(data);

    if (error) {
      console.log("error at getCreators");
      console.log(error);
    }
    if (data) {
      setCreator(data as Creator);
    }
    return { count, data };
  };

  return { creator, getCreator };
};
