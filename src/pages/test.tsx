import { supabase } from "@/libs/supabase";
import React, { useEffect } from "react";
// const ethers = require("ethers");
import { ethers } from "ethers";
const scrapeIt = require("scrape-it");

const Test = () => {
  const hhh = async (collection_name: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_BLOCKDAEMON_API_KEY;
    // const contracts = [];
    const getCollection = async (collection_name: string) => {
      const data = await fetch(
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
    const getAssets = async (collection_id: string) => {
      const data = await fetch(
        `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?collection_id=26ad2320-e483-5546-86e2-e750499b5b2d&sort_by=token_id`,
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
    // const collection_data = await getCollection(collection_name);
    // const collection_assets = await getAssets(collection_data.data.id);
    const collection_assets = await getAssets("test");
    console.log("onigiri collection_assets");
    console.log(collection_assets);

    //sample contract address
    //https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=0x495f947276749ce646f68ac8c248420045cb7b5e&token_id=6809306188428173666073685742513789835067604049849918034403299221837115817985
    //https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
    //https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=bored ape
    //https://{ubiquity_nft_url}/{protocol}/{network}/collection/{id}
    //https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&wallet_address=0x46Fd6B647Dc8C82aD8f6cf0CC6b22ACad3f6e39d

    // (async () => {
    //   const provider = new ethers.providers.JsonRpcProvider(
    //     "https://restless-solemn-seed.discover.quiknode.pro/f765e691d1c48a12614928972392451ebe5638a3/"
    //   );
    //   provider.connection.headers = { "x-qn-api-version": 1 };
    //   const heads = await provider.send("qn_fetchNFTs", {
    //     //@ts-ignore
    //     wallet: "0x91b51c173a4bdaa1a60e234fc3f705a16d228740",
    //     omitFields: ["provenance", "traits"],
    //     page: 1,
    //     perPage: 10,
    //     contracts: [
    //       "0x2106c00ac7da0a3430ae667879139e832307aeaa",
    //       "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    //     ],
    //   });
    //   console.log(heads);
    // })();
  };
  useEffect(() => {
    // hhh();
  }, []);

  return (
    <div>
      <p>hhhhh</p>
    </div>
  );
};

export default Test;
