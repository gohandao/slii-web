import React from "react";

import { TwitterApi } from "twitter-api-v2";

const getTwitterFollowers = async (req, res) => {
  //let { twitter_id, type } = req.query;
  const twitter_id = req.query.twitter_id;

  console.log("twitter_id");
  console.log(twitter_id);

  // Instantiate with desired auth type (here's Bearer v2 auth)
  /*
  const TWITTER_API_KEY = process.env.NEXT_PUBLIC_TWITTER_API_KEY;
  const NEXT_PUBLIC_TWITTER_BEARER_TOKEN =
    process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
  //YOUR_APP_USER_TOKEN
  if (NEXT_PUBLIC_TWITTER_BEARER_TOKEN) {
    const twitterClient = new TwitterApi(NEXT_PUBLIC_TWITTER_BEARER_TOKEN);

    // Tell typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly;

    // Play with the built in methods
    const user = await readOnlyClient.v2.userByUsername("ik_takagishi", {
      "user.fields": public_metrics,
    });
    console.log("twitter user");
    console.log(user);
    res.json(JSON.stringify(user));
    */

  //await twitterClient.v1.tweet("Hello, this is a test.");
  // You can upload media easily!
  //await twitterClient.v1.uploadMedia("./big-buck-bunny.mp4");

  var options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAIc8gQEAAAAA7thtQNPI%2Bg7IFFPUNHAmH7vhym8%3DxL9dSqxmxVLOAathsxLlqf7ddwOdOwbkiomYzLm0IdWBXRJcUG",
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${twitter_id}?user.fields=public_metrics`,
    options
  )
    .then((response) => {
      console.log("success");
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  res.json(JSON.stringify(response.data));
};
export default getTwitterFollowers;
