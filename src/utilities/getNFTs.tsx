import React from "react";
const ethers = require("ethers");

export const getNFTs = async (contracts: string[]) => {
  let NFTs = [];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://restless-solemn-seed.discover.quiknode.pro/f765e691d1c48a12614928972392451ebe5638a3/"
  );
  // provider.connection.headers = { "x-qn-api-version": 1 };

  const heads = await provider.send("qn_fetchNFTs", {
    wallet: "0x91b51c173a4bdaa1a60e234fc3f705a16d228740",
    // omitFields: ["provenance", "traits"],
    page: 1,
    perPage: 10,
    contracts: [
      "0x495f947276749ce646f68ac8c248420045cb7b5e",
      // "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    ],
  });
  console.log("heads");
  console.log(heads);
  return heads;
};
