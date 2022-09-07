import React from "react";

export const getTwitterFollowers = async (twitter_id: string) => {
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  let twitterData: any;
  let twitterFollowers;
  if (baseUrl && twitter_id) {
    await fetch(
      `${baseUrl}/api/twitter?twitter_id=${twitter_id}&type=collection`
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log("JSON.parse(response)");
        //console.log(JSON.parse(response));
        twitterData = JSON.parse(response);
        twitterFollowers =
          twitterData && twitterData.public_metrics.followers_count;
        //newList.current[index].twitter_followers = twitterFollowers;
        console.log("twitterFollowers");
        console.log(twitterFollowers);
        return twitterFollowers;
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    return twitterFollowers;
  }
};
