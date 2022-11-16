import React from "react";
const ethers = require("ethers");

export const getNFTs = async (collection_name: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_BLOCKDAEMON_API_KEY;
  // const contracts = [];
  const getCollection = async (collection_name: string) => {
    const data = await fetch(
      // `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?contract_id=0xce6e3a14b5f8ce2b05af0f117dc922769779aa3b`,
      `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=${collection_name}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    return data;
  };
  const getAssets = async (collection_id: string, next_page_token?: string) => {
    const limit = 50;
    let page_token = next_page_token ? next_page_token : "";
    const data = await fetch(
      `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?collection_id=${collection_id}&sort_by=token_id&page_size=${limit}&page_token=${page_token}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log("JSON.parse(response)");
        // console.log(response);
        return response;
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    return data;
  };
  const collection_data = await getCollection(collection_name);
  console.log("await collection_data a");
  console.log(collection_name);
  console.log(collection_data);

  let assets = [] as any[];
  if (collection_data.data.length > 0) {
    const collection_id = collection_data.data[0].id;
    let next_page;
    for (let index = 0; index < 10000; index++) {
      if (index == 0 || next_page) {
        const data: any = await getAssets(collection_id, next_page);
        console.log("data in for");
        console.log(data);

        assets = data ? [...assets, data.data] : assets;
        next_page =
          data &&
          data.meta &&
          data.meta.paging &&
          data.meta.paging.next_page_token;
        console.log("next_page");
        console.log(next_page);
      } else {
        break;
      }
    }
    console.log("after loop assets");
    console.log(assets);
    return assets;
  }

  return;
  // let NFTs = [];
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://restless-solemn-seed.discover.quiknode.pro/f765e691d1c48a12614928972392451ebe5638a3/"
  // );
  // // provider.connection.headers = { "x-qn-api-version": 1 };
  // const heads = await provider.send("qn_fetchNFTs", {
  //   // wallet: contracts[0],
  //   // omitFields: ["provenance", "traits"],
  //   page: 1,
  //   perPage: 100,
  //   contracts: [
  //     "0x8f2cef1cbff23d7d657ddbae39650bb860e87132",
  //     // "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  //   ],
  // });
  // console.log("heads");
  // console.log(contracts);
  // console.log(heads);
  // return heads;
};
