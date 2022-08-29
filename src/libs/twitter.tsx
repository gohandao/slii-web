import React from "react";

export const getTwitterFollowers = async (
  twitter_id: string,
  index: number
) => {
  let twitterData: any;
  if (baseUrl && twitter_id) {
    await fetch(
      `${baseUrl}/api/twitter?twitter_id=${twitter_id}&type=collection`
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log("JSON.parse(response)");
        //console.log(JSON.parse(response));
        twitterData = JSON.parse(response);
        const twitterFollowers =
          twitterData && twitterData.public_metrics.followers_count;
        newList.current[index].twitter_followers = twitterFollowers;
        console.log("twitterFollowers");
        console.log(twitterFollowers);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }
};
