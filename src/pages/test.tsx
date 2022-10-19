import { supabase } from "@/libs/supabase";
import React, { useEffect } from "react";
// const ethers = require("ethers");
import { ethers } from "ethers";

const Test = () => {
  const hhh = async () => {
    const test = "6Wi6RC1Vz1sD9Ngsk72jQsxNKROmKKIlQVa28-I3ZwkfdqUB";
    await fetch(
      `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections?sort_by=name&order=desc`,
      {
        headers: { Authorization: `Bearer: ${test}` },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("JSON.parse(response)");
        console.log(response);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    console.log("owattanoka");

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
    hhh();
  }, []);

  return (
    <div>
      <p>hhhhh</p>
    </div>
  );
};

export default Test;
