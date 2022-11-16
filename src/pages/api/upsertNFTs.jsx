import creators from "@/json/creators.json";
import collections from "@/json/collections.json";
import { getDiscordMembers } from "@/libs/discord";
import { getTwitterFollowers } from "@/libs/twitter";
import { createJson } from "@/utilities/createJson";
import { getNFTs } from "@/utilities/getNFTs";
import { supabase } from "@/libs/supabase";

export const upsertNFTs = async (req, res) => {
  const collection_slug = "the-double-face";
  const assets = await getData(collection_slug);

  const getData = async (collection_slug) => {
    const fetchData = async (next) => {
      let limit = 100;
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
          console.log(response);
          return response;
        })
        .catch((err) => console.error(err));
      return data;
    };
    let assets = [];
    let next;
    for (let index = 0; index < 1000; index++) {
      const data = await fetchData(next);
      assets = data.assets;
      next = data.next;
      if (!data.next || data.next == null) {
        break;
      }
    }
    // console.log("last assets");
    // console.log(assets);

    return assets;
  };
  const upsertData = async (assets) => {
    let new_assets = [];
    assets.map(async (asset, index) => {
      console.log("get nft data");
      console.log(asset);

      const new_data = {
        id: asset.id,
        collection_slug: collection_slug,
        name: asset.name,
        description: asset.name,
        image_url: asset.image_url,
        image_original_url: asset.image_original_url,
        image_thumbnail_url: asset.image_thumbnail_url,
        permalink: asset.permalink,
        last_sale_symbol: asset.last_sale.payment_token.symbol,
        last_sale_price: Number(asset.last_sale.total_price),
        num_sales: asset.num_sales,
        token_id: asset.token_id,
      };
      new_assets = [...new_assets, new_data];
    });
    const { data, error } = await supabase
      .from("nfts")
      .upsert(new_assets, {
        returning: "minimal", // Don't return the value after inserting
      })
      // .upsert({ id: 1, name: "Albania" })
      .select();
    // console.log("result");
    // console.log(data);
    // console.log(error);
    return;
  };
  await upsertData(assets);
  res.end();
};
export default upsertNFTs;
