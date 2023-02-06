/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { Creator } from "@/types/creator";
import type { TCard } from "@/types/tinder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetTinderList = () => {
  const router = useRouter();
  const current_path = router.pathname;
  const { order, page, search, sort, type, username, usernames } = router.query;
  const [list, setList] = useState<TCard>();
  useEffect(() => {
    switch (current_path) {
      case "/":
        break;
      case "/creators":
        break;
      case "/collections":
        break;

      default:
        break;
    }
  }, [router.query, current_path]);

  type CreatorsFilterProps = {
    order?: string;
    page?: number;
    search?: string;
    sort?: string;
    type?: string;
    username?: string;
    usernames?: string[];
  };
  const [creators, setCreators] = useState<Creator[]>([]);
  const getCreators = async ({ order, page, search, sort, type, username, usernames }: CreatorsFilterProps = {}) => {
    const limit = 6;
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
    const usernamesArray = usernames?.map((username) => {
      return `"` + username + `"`;
    });
    const usernameFilter = username ? `.eq("username", "${username}").single()` : "";
    const usernamesFilter = usernames ? `.in("username", [${usernamesArray}])` : "";
    const filter = username
      ? `supabase.from("creators").select('"*", upvotes_count_function')${usernameFilter}`
      : `supabase.from("creators").select('"*", upvotes_count_function', { count: 'exact' })${usernamesFilter}${typeFilter}${searchFilter}${sortFilter}${usernameFilter}${rangeFilter}`;

    console.log("filter");
    console.log(filter);

    const { count, data, error } = await eval(filter);
    if (error) {
      console.log("error at getCreators");
      console.log(error);
    }
    if (data) {
      setCreators(data as Creator[]);
    }
    return { count, data };
  };

  return { creators, getCreators };
};
