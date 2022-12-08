import { createClient } from "@supabase/supabase-js";
import error from "next/error";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
export const supabase = supabaseUrl && supabaseAnonKey && createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = async (path: string) => {
  let url;
  if (path) {
    const storage_name = path.substr(0, path.indexOf("/"));
    const file_path = path.substr(path.indexOf("/") + 1);
    if (supabase) {
      const res = await supabase.storage.from(storage_name).download(file_path);
      url = res.data && res.data;
    }
  } else {
    return;
  }
  return url;
};
type CreatorsFilterProps = {
  order?: string;
  page?: number;
  search?: string;
  sort?: string;
  type?: string;
  username?: string;
  usernames?: string[];
};
export const getCreators = async (props: CreatorsFilterProps = {}) => {
  const { order, page, search, sort, type, username, usernames } = props;
  const limit = 100;
  const start = page ? (Number(page) - 1) * limit : 0;
  const end = page ? Number(page) * limit - 1 : 99;
  const rangeFilter = `.range(${start}, ${end})`;
  let typeFilter = "";
  if (type && type != "all") {
    typeFilter = `.eq("type", type)`;
  }
  let searchFilter = "";
  if (search) {
    searchFilter = `.textSearch("name", "${search}");`;
  }
  let sortFilter = "";
  const orderFilter = order == "asc" ? true : false;
  let sotr_param = "";
  switch (sort) {
    case "popular":
      sotr_param = "upvotes_count";
      break;
    case "newest":
    case "created_at":
      sotr_param = "created_date";
      break;
    case "new_listed":
    case "listed_at":
      sotr_param = "listed_at";
      break;
    case "name":
      sotr_param = "name";
      break;
    case "twitter":
      sotr_param = "twitter_followers";
      break;
    case "discord":
      sotr_param = "discord_members";
      break;
    default:
      sotr_param = "upvotes_count";
      break;
  }
  if (sort) {
    sortFilter = `.order("upvotes_count", { ascending: ${orderFilter} });`;
  } else {
    sortFilter = `.order("${sotr_param}", { ascending: ${orderFilter} })`;
  }
  const usernameFilter = username ? `.eq("usename", ${username}).single()` : "";
  const usernamesFilter = usernames ? `.in("username", ${usernames})` : "";
  const filter = `supabase.from("creators").select('*', { count: 'exact' })${usernamesFilter}${typeFilter}${searchFilter}${sortFilter}${usernameFilter}${rangeFilter}`;

  const { count, data } = await eval(filter);
  if (error) {
    console.log("error");
    console.log(error);
  }
  return { count, data };
};
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
export const getCollections = async (props: CollectionsFilterProps = {}) => {
  const { foreign_table, order, page, search, slug, slugs, sort, term, type } = props;
  const limit = 100;
  const start = page ? (page - 1) * limit : 0;
  const end = page ? Number(page) * limit - 1 : 99;
  let typeFilter = "";
  const rangeFilter = `.range(${start}, ${end})`;

  if (type && type != "all") {
    typeFilter = `.eq("type", type)`;
  }
  let searchFilter = "";
  if (search) {
    searchFilter = `.textSearch("name", "${search}");`;
  }
  let sortFilter = "";
  const orderFilter = order == "asc" ? true : false;
  let sotr_param = "";
  switch (sort) {
    case "popular":
      sotr_param = "upvotes_count";
      break;
    case "newest":
    case "created_at":
      sotr_param = "created_date";
      break;
    case "new_listed":
    case "listed_at":
      sotr_param = "listed_at";
      break;
    case "name":
      sotr_param = "name";
      break;
    case "floor_price":
      sotr_param = "floor_price";
      break;
    case "volume":
      sotr_param = "total_volume";
      break;
    case "owners":
      sotr_param = "num_owners";
      break;
    case "items":
      sotr_param = "total_supply";
      break;
    case "twitter":
      sotr_param = "twitter_followers";
      break;
    case "discord":
      sotr_param = "discord_members";
      break;
    default:
      sotr_param = "upvotes_count";
      break;
  }
  switch (term) {
    case "30d":
      if (sotr_param == "volume") {
        sotr_param = "thirty_day_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "thirty_day_average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "thirty_day_sales";
      }
      if (sotr_param == "change") {
        sotr_param = "thirty_day_change";
      }
      break;
    case "7d":
      if (sotr_param == "volume") {
        sotr_param = "seven_day_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "seven_day_average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "seven_day_sales";
      }
      if (sotr_param == "change") {
        sotr_param = "seven_day_change";
      }
      break;
    case "24h":
      if (sotr_param == "volume") {
        sotr_param = "one_day_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "one_day_average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "one_day_sales";
      }
      if (sotr_param == "change") {
        sotr_param = "one_day_change";
      }
      break;
    case "6h":
      if (sotr_param == "volume") {
        sotr_param = "six_hour_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "six_hour_average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "six_hour_sales";
      }
      if (sotr_param == "change") {
        sotr_param = "six_hour_change";
      }
      break;
    case "1h":
      if (sotr_param == "volume") {
        sotr_param = "one_hour_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "one_hour_average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "one_hour_sales";
      }
      if (sotr_param == "change") {
        sotr_param = "one_hour_change";
      }
      break;
    default:
      if (sotr_param == "volume") {
        sotr_param = "total_volume";
      }
      if (sotr_param == "average_price") {
        sotr_param = "average_price";
      }
      if (sotr_param == "sales") {
        sotr_param = "total_sales";
      }
      break;
  }
  if (sort) {
    sortFilter = `.order("upvotes_count", { ascending: ${orderFilter} });`;
  } else {
    sortFilter = `.order("${sotr_param}", { ascending: ${orderFilter} })`;
  }
  const slugFilter = slug ? `.eq("slug", ${slug}).single()` : "";
  const slugsFilter = slugs ? `.in("slug", ${slugs})` : "";
  const ForeignTableFilter = foreign_table ? `, ${foreign_table}` : "";
  const filter = `supabase.from("collections").select("*" ${ForeignTableFilter}, { count: 'exact' })${slugsFilter}${typeFilter}${searchFilter}${sortFilter}${rangeFilter}${slugFilter}`;
  const { count, data } = await eval(filter);
  if (error) {
    console.log("error");
    console.log(error);
  }
  return { count, data };
};

type NFTsFilterProps = {
  slugs?: string[];
};
export const getNFTs = async (props: NFTsFilterProps) => {
  const { slugs } = props;
  const limit = 25;
  const limitFilter = `.limit(${limit})`;
  const slugsFilter = slugs ? `.in("slug", ${slugs})` : "";
  const filter = `supabase.from("random_nfts").select("*", { count: "exact" })${slugsFilter}${limitFilter}`;
  const { count, data } = await eval(filter);
  if (error) {
    console.log("error");
    console.log(error);
  }
  return { count, data };
};
export const getUserUpvotes = async (user_id: string) => {
  if (supabase) {
    const { data, error } = await supabase.from("upvotes").select().eq("user_id", `${user_id}`);
    if (error) {
      console.log("error");
      console.log(error);
    }
    return data;
  }
};
export const getUserBookmarks = async (user_id: string) => {
  if (supabase) {
    const { data, error } = await supabase.from("bookmarks").select().eq("user_id", `${user_id}`);
    if (error) {
      console.log("error");
      console.log(error);
    }
    return data;
  }
};
