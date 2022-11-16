import collections from "@/json/collections.json";

export const getOSUserBackground = async (username: string) => {
  //api.opensea.io/user/ProjuiceAudio
  const filteredCollections =
    collections &&
    collections.filter((collection) => collection.creator_id == username);
  const background_image =
    filteredCollections.length > 0 &&
    filteredCollections[0].banner_image_url &&
    filteredCollections[0].banner_image_url;
  return background_image;
};

export const getOSData = async (username: string) => {
  const filteredCollections =
    collections &&
    collections.filter((collection) => collection.creator_id == username);

  const token_symbol = filteredCollections[0].payment_tokens[0].symbol;
  const total_volume = filteredCollections.reduce((prev, collection) => {
    const new_total_volume = (prev + collection.stats.total_volume) as number;
    return new_total_volume;
  }, 0);
  const average_volume = total_volume / filteredCollections.length;
  let average_num = 0;
  const total_floor_price = filteredCollections.reduce(
    (prev: number | null, collection) => {
      const floor_price = collection.stats.floor_price
        ? collection.stats.floor_price
        : null;
      let new_total_floor_price = null;
      if (floor_price != null && prev != null) {
        new_total_floor_price = (prev + floor_price) as number;
        average_num++;
      } else if (floor_price != null) {
        new_total_floor_price = floor_price as number;
        average_num++;
      }
      return new_total_floor_price;
    },
    null
  );
  const average_floor_price =
    total_floor_price && total_floor_price / average_num;

  const total_collections = filteredCollections.length;
  let total_supply = filteredCollections.reduce((prev, collection) => {
    const new_total_supply = (prev + collection.stats.total_supply) as number;
    return new_total_supply;
  }, 0);
  let total_sales = filteredCollections.reduce((prev, collection) => {
    const new_total_sales = (prev + collection.stats.total_sales) as number;
    return new_total_sales;
  }, 0);

  const background_image =
    filteredCollections.length > 0 &&
    filteredCollections[0].banner_image_url &&
    filteredCollections[0].banner_image_url;

  const data = {
    token_symbol: token_symbol,
    total_volume: total_volume,
    average_volume: average_volume,
    average_floor_price: average_floor_price,
    total_collections: total_collections,
    total_supply: total_supply,
    total_sales: total_sales,
    background_image: background_image,
  };
  return data;
};
