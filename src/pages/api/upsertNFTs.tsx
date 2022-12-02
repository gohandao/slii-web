import creatorsJson from "@/json/creators.json";
import collectionsJson from "@/json/collections.json";
const collections = JSON.parse(JSON.stringify(collectionsJson)) as any[];
// libs
import { supabase } from "@/libs/supabase";

export const upsertNFTs = async (req: any, res: any) => {
  // const collection_slug = "the-double-face";
  const getData = async (collection_slug: string) => {
    const fetchData = async (next: any) => {
      const limit = 200;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7d272bbc71msh85074e7a4ce303ep18b7a2jsndfbba676b9a9",
          "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
        },
      };
      let new_next = next && next.length > 0 ? next : "";
      const data = await fetch(
        `https://opensea-data-query.p.rapidapi.com/api/v1/assets?collection_slug=${collection_slug}&order_direction=desc&limit=${limit}&cursor=${new_next}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          return response;
        })
        .catch((err) => console.error(err));
      return data;
    };
    let assets = [] as any[];
    let next;
    for (let index = 0; index < 10000; index++) {
      console.log(index + "times");
      const data: any = await fetchData(next);
      assets = data && data.assets ? [...assets, ...data.assets] : assets;
      next = data && data.next;
      if (!data || !data.next || data.next == null) {
        break;
      }
    }
    return assets;
  };
  for (let index = 0; index < collections.length; index++) {
    // for (let index = 0; index < 3; index++) {
    // if (index % 10 == 0) {
    //   console.log(index + " collections");
    // }
    const assets = await getData(collections[index].slug);
    const upsertData = async (assets: any) => {
      let new_assets = [] as any[];
      assets.length > 0 &&
        assets.map(async (asset: any, index: any) => {
          if (asset && asset.collection && asset.collection.slug) {
            const new_data = {
              id: asset.id,
              collection_slug: asset.collection.slug,
              name: asset.name,
              description: asset.name,
              image_url: asset.image_url,
              image_original_url: asset.image_original_url,
              image_thumbnail_url: asset.image_thumbnail_url,
              permalink: asset.permalink,
              last_sale_symbol:
                asset.last_sale && asset.last_sale.payment_token.symbol,
              last_sale_price:
                asset.last_sale && Number(asset.last_sale.total_price),
              num_sales: asset.num_sales,
              token_id: asset.token_id,
            };
            new_assets = [...new_assets, new_data];
          }
        });
      const { data, error } = await supabase
        .from("nfts")
        .upsert(new_assets, {
          returning: "minimal", // Don't return the value after inserting
        })
        // .upsert({ id: 1, name: "Albania" })
        .select();
      return;
    };
    assets && (await upsertData(assets));
  }
  console.log("finished");
  res.end();
};
export default upsertNFTs;
