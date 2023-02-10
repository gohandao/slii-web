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

export const useGetCollections = () => {
  const [collections, setCollections] = useState<Creator[]>([]);
  type CollectionsFilterProps = {
    foreign_table?: string;
    order?: string;
    page?: number;
    search?: string;
    slug?: string;
    slugs?: string[];
    sort?: string;
    term?: string;
    type?: string;
  };
  const getCollections = async (props: CollectionsFilterProps = {}) => {
    const { foreign_table, order, page, search, slug, slugs, sort, term, type } = props;
    const start = page ? (page - 1) * limit : 0;
    const end = page ? Number(page) * limit - 1 : limit;
    let typeFilter = "";
    const rangeFilter = `.range(${start}, ${end})`;

    if (type && type != "all") {
      typeFilter = `.eq("type", type)`;
    }
    let searchFilter = "";
    if (search) {
      searchFilter = `.ilike("name", "%${search}%")`;
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
        sort_param = "name";
        break;
      case "floor_price":
        sort_param = "floor_price";
        break;
      case "volume":
      case "total_volume":
        sort_param = "total_volume";
        break;
      case "owners":
        sort_param = "num_owners";
        break;
      case "items":
        sort_param = "total_supply";
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
    switch (term) {
      case "30d":
        if (sort_param == "volume") {
          sort_param = "thirty_day_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "thirty_day_average_price";
        }
        if (sort_param == "sales") {
          sort_param = "thirty_day_sales";
        }
        if (sort_param == "change") {
          sort_param = "thirty_day_change";
        }
        break;
      case "7d":
        if (sort_param == "volume") {
          sort_param = "seven_day_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "seven_day_average_price";
        }
        if (sort_param == "sales") {
          sort_param = "seven_day_sales";
        }
        if (sort_param == "change") {
          sort_param = "seven_day_change";
        }
        break;
      case "24h":
        if (sort_param == "volume") {
          sort_param = "one_day_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "one_day_average_price";
        }
        if (sort_param == "sales") {
          sort_param = "one_day_sales";
        }
        if (sort_param == "change") {
          sort_param = "one_day_change";
        }
        break;
      case "6h":
        if (sort_param == "volume") {
          sort_param = "six_hour_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "six_hour_average_price";
        }
        if (sort_param == "sales") {
          sort_param = "six_hour_sales";
        }
        if (sort_param == "change") {
          sort_param = "six_hour_change";
        }
        break;
      case "1h":
        if (sort_param == "volume") {
          sort_param = "one_hour_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "one_hour_average_price";
        }
        if (sort_param == "sales") {
          sort_param = "one_hour_sales";
        }
        if (sort_param == "change") {
          sort_param = "one_hour_change";
        }
        break;
      default:
        if (sort_param == "volume") {
          sort_param = "total_volume";
        }
        if (sort_param == "average_price") {
          sort_param = "average_price";
        }
        if (sort_param == "sales") {
          sort_param = "total_sales";
        }
        break;
    }
    if (!sort) {
      sortFilter = `.order("upvotes_count_function", { ascending: ${orderFilter} })`;
    } else {
      sortFilter = `.order("${sort_param}", { ascending: ${orderFilter} })`;
    }
    const slugsArray = slugs?.map((slug) => {
      return `"` + slug + `"`;
    });
    const slugFilter = slug ? `.eq("slug", "${slug}").single()` : "";
    const slugsFilter = slugs ? `.in("slug", [${slugsArray}])` : "";
    const ForeignTableFilter = foreign_table ? `, ${foreign_table}` : "";
    const filter = slug
      ? `supabase.from("collections").select('"*", upvotes_count_function, bookmarks_count_function')${slugFilter}`
      : `supabase.from("collections").select('"*", upvotes_count_function, bookmarks_count_function ${ForeignTableFilter}', { count: 'exact' })${slugsFilter}${typeFilter}${searchFilter}${sortFilter}${rangeFilter}${slugFilter}`;
    const { count, data, error } = await eval(filter);
    if (error) {
      console.log(error);
    }
    if (data) {
      setCollections(data as any[]);
    }
    return { count, data };
  };

  return { collections, getCollections };
};
