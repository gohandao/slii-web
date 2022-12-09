import { supabase } from "@/libs/supabase";

export const getOSData = async (username: string) => {
  if (supabase) {
    const { data } = await supabase.from("collections").select().eq("creator_username", username);
    // if (error) {
    //   console.log("error");
    //   console.log(error);
    // }
    const collections_data = data ? data : [];
    const collections = sortCollections(collections_data);
    const token_symbol = collections.length > 0 && collections[0].symbols > 0 ? collections[0].symbols[0] : undefined;
    const total_volume = collections.reduce((prev: any, collection: any) => {
      const new_total_volume = (prev + collection.total_volume) as number;
      return new_total_volume;
    }, 0);
    const average_volume = total_volume / collections.length;
    let average_num = 0;
    const total_floor_price = collections.reduce((prev: number | null, collection: any) => {
      const floor_price = collection.floor_price ? collection.floor_price : null;
      let new_total_floor_price = null;
      if (floor_price != null && prev != null) {
        new_total_floor_price = (prev + floor_price) as number;
        average_num++;
      } else if (floor_price != null) {
        new_total_floor_price = floor_price as number;
        average_num++;
      }
      return new_total_floor_price;
    }, null);
    const average_floor_price = total_floor_price && total_floor_price / average_num;
    const total_collections = collections.length;
    const total_supply = collections.reduce((prev: any, collection: any) => {
      const new_total_supply = (prev + collection.total_supply) as number;
      return new_total_supply;
    }, 0);
    const total_sales = collections.reduce((prev: any, collection: any) => {
      const new_total_sales = (prev + collection.total_sales) as number;
      return new_total_sales;
    }, 0);
    const background_image =
      collections.length > 0 && collections[0].banner_image_url && collections[0].banner_image_url;

    const result = {
      average_floor_price: average_floor_price,
      average_volume: average_volume,
      background_image: background_image,
      token_symbol: token_symbol,
      total_collections: total_collections,
      total_sales: total_sales,
      total_supply: total_supply,
      total_volume: total_volume,
    };
    return result;
  }
};

const sortCollections = (collections: any[]) => {
  const new_collections = collections.sort((a: any, b: any) => {
    if (a.total_volume !== a.total_volume && b.total_volume !== b.total_volume) return 0;
    if (a.total_volume !== a.total_volume) return 1;
    if (b.total_volume !== b.total_volume) return -1;

    if (a.total_volume == null && b.total_volume == null) return 0;
    if (a.total_volume == null) return 1;
    if (b.total_volume == null) return -1;

    if (a.total_volume === "" && b.total_volume === "") return 0;
    if (a.total_volume === "") return 1;
    if (b.total_volume === "") return -1;

    const sig = 1;
    return a.total_volume < b.total_volume ? sig : a.total_volume > b.total_volume ? -sig : 0;
  });
  return new_collections;
};
