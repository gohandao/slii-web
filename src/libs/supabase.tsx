import { createClient } from "@supabase/supabase-js";

import { getNFTListings } from "@/libs/opensea";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = async (path: string) => {
  let url: Blob | null;
  if (path) {
    const storage_name = path.substr(0, path.indexOf("/"));
    const file_path = path.substr(path.indexOf("/") + 1);
    const res = await supabase.storage.from(storage_name).download(file_path);
    url = res.data && res.data;
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
  const usernamesArray = usernames?.map((username) => {
    return `"` + username + `"`;
  });
  const usernameFilter = username ? `.eq("username", "${username}").single()` : "";
  const usernamesFilter = usernames ? `.in("username", [${usernamesArray}])` : "";
  const filter = username
    ? `supabase.from("creators").select('"*", upvotes_count_function')${usernameFilter}`
    : `supabase.from("creators").select('"*", upvotes_count_function', { count: 'exact' })${usernamesFilter}${typeFilter}${searchFilter}${sortFilter}${usernameFilter}${rangeFilter}`;
  const { count, data, error } = await eval(filter);
  if (error) {
    console.log("error at getCreators");
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
  const limit = 20;
  const start = page ? (page - 1) * limit : 0;
  const end = page ? Number(page) * limit - 1 : 99;
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
    ? `supabase.from("collections").select('"*", upvotes_count_function')${slugFilter}`
    : `supabase.from("collections").select('"*", upvotes_count_function ${ForeignTableFilter}', { count: 'exact' })${slugsFilter}${typeFilter}${searchFilter}${sortFilter}${rangeFilter}${slugFilter}`;
  const { count, data, error } = await eval(filter);
  if (error) {
    console.log("error at getCollections");
    console.log(error);
  }
  return { count, data };
};

type NFTsFilterProps = {
  slugs?: string[];
};
export const getNFTs = async (props: NFTsFilterProps) => {
  const { slugs } = props;
  const limit = 24;
  const limitFilter = `.limit(${limit})`;
  const slugsArray = slugs?.map((slug) => {
    return `"` + slug + `"`;
  });
  const slugsFilter = slugs ? `.in("collection_slug", [${slugsArray}])` : "";
  const filter = `supabase.from("random_nfts").select("*", { count: "exact" })${slugsFilter}${limitFilter}`;

  const { count, data, error } = await eval(filter);
  if (error) {
    console.log(error);
  }
  return { count, data };
};
export const upsertNFTPrices = async (collection_slug: string) => {
  const checkUpdatedAt = async (collection_slug: string) => {
    if (supabase) {
      const { data, error } = await supabase
        .from("nfts")
        .select("updated_at")
        .eq("collection_slug", collection_slug)
        .order("updated_at", { ascending: false })
        .single();
      if (error) {
        console.log("error at getUserBookmarks");
        console.log(error);
      }
      return data && (data.updated_at as Date);
    }
  };
  // 更新が10分以内の場合は再更新を無視する
  const last_updated_at = await checkUpdatedAt(collection_slug);
  const now = Date.now();
  const past = last_updated_at && last_updated_at.getTime();
  const diff = past && now - past;
  const diffMinutes = diff && diff / 1000 / 60;
  //timestampは現在時刻より10分以上前です
  if (!diffMinutes || diffMinutes > 10) {
    const listings = await getNFTListings({ collection_slug: collection_slug });
    if (listings) {
      const new_listings = listings.map((listing) => {
        const currentTimestamp = new Date().toISOString();
        const data = {
          id: collection_slug + "_" + listing.token_id,
          current_price: listing.current_price,
          current_sale_symbol: listing.symbol,
          updated_at: currentTimestamp,
        };
        return data;
      });
      if (supabase) {
        const { error } = await supabase.from("nfts").upsert(new_listings).select();
        if (error) {
          console.log("error");
          console.log(error);
        }
      }
    }
  }
  return;
};
