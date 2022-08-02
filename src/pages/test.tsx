import React, { useEffect } from "react";
import axios from "axios";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

export const Test = () => {
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, isInitialized, isInitializing } = useMoralis();
  if (isInitialized) {
    /*useEffect(() => {
      if (isInitialized) {
        fetchNFTs(options);
      }
    }, [isInitialized]);*/

    const fetchNFTs = async () => {
      /*
    // get NFTs for current user on Mainnet
    const userEthNFTs = await Web3Api.account.getNFTs();
    console.log(userEthNFTs);
    // get testnet NFTs for user
    const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
      chain: "eth",
    });
    console.log(testnetNFTs);
    */

      // get polygon NFTs for address
      const fetchNFTsForContract = async () => {
        const options = {
          chain: "eth",
          address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
          token_address:
            "6809306188428173666073685742513789835067604049849918034403299330688766967809",
        };
        const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
        console.log(polygonNFTs);
      };
      console.log("polygonNFTs");
      console.log(fetchNFTsForContract());
    };
    const fetchSearchNFTs = async () => {
      const options = { q: "Pancake", chain: "bsc", filter: "name" };
      const NFTs = await Web3Api.token.searchNFTs(options);
      console.log(NFTs);
    };
    fetchNFTs();
  }
  /*
  const apiKey = "J3WnQpuzTR5dUjuuzN7BFfTGwEyxT6eP";
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
  // replace with the wallet address you want to query for NFTs
  const ownerAddr = "0xfae46f94ee7b2acb497cecaff6cff17f621c693d";

  var config = {
    method: "get",
    url: `${baseURL}?owner=${ownerAddr}`,
  };

  axios(config)
    .then((response) => console.log(JSON.stringify(response.data, null, 2)))
    .catch((error) => console.log(error));
  return <div>test</div>;
  */
};
export default Test;
