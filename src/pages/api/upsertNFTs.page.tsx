import { supabase } from "@/libs/supabase";

const getCollections = async () => {
  if (supabase) {
    const { data, error } = await supabase.from("collections").select();
    if (error) {
      console.log("error");
      console.log(error);
    }
    return data;
  }
};

export const upsertNFTs = async (req: any, res: any) => {
  const collections = await getCollections();
  const getData = async (collection_slug: string) => {
    const fetchData = async (next: any) => {
      const limit = 200;
      const X_RAPIDAPI_KEY = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;
      const options = X_RAPIDAPI_KEY && {
        headers: {
          "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
          "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        },
        method: "GET",
      };
      const new_next = next && next.length > 0 ? next : "";
      const data =
        options &&
        (await fetch(
          `https://opensea-data-query.p.rapidapi.com/api/v1/assets?collection_slug=${collection_slug}&order_direction=desc&limit=${limit}&cursor=${new_next}`,
          options
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            return response;
          })
          .catch((err) => {
            return console.error(err);
          }));
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
  if (collections) {
    // for (let index = 0; index < collections.length; index++) {
    for (let index = 0; index < 30; index++) {
      // 動作チェック用
      if (index % 10 == 0) {
        console.log(index + " collections");
      }
      const assets = await getData(collections[index].slug);
      const upsertData = async (assets: any) => {
        let new_assets = [] as any[];
        // const addresses = assets.length > 0 && assets.map(async (asset: any) => {
        //   return
        // };
        const contract_address = assets[0] && assets[0].asset_contract && (assets[0].asset_contract.address as string);
        if (contract_address) {
          assets.length > 0 &&
            assets.map(async (asset: any) => {
              if (asset && asset.collection && asset.collection.slug) {
                const currentTimestamp = new Date().toISOString();
                const new_data = {
                  id: `${asset.collection.slug}_${asset.token_id}`,
                  collection_slug: asset.collection.slug,
                  contract_address: asset.asset_contract.address,
                  description: asset.name,
                  image_original_url: asset.image_original_url,
                  image_thumbnail_url: asset.image_thumbnail_url,
                  image_url: asset.image_url,
                  last_sale_price: asset.last_sale && Number(asset.last_sale.total_price),
                  last_sale_symbol: asset.last_sale && asset.last_sale.payment_token.symbol,
                  name: asset.name,
                  num_sales: asset.num_sales,
                  permalink: asset.permalink,
                  token_id: asset.token_id,
                  updated_at: currentTimestamp,
                };
                new_assets = [...new_assets, new_data];
              }
            });

          if (supabase) {
            const { error } = await supabase.from("nfts").upsert(new_assets).select();
            if (error) {
              console.log("error");
              console.log(error);
            }
          }
          return;
        }
      };
      assets && (await upsertData(assets));
    }
  }
  console.log("finished");
  res.end();
};
export default upsertNFTs;
