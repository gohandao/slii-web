export const fetchTwitterFollowers = async (twitter_id: string) => {
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }
  let twitter_followers;
  await fetch(`${baseUrl}/api/twitter?twitter_id=${twitter_id}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      twitter_followers = JSON.parse(response);
      return twitter_followers;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return twitter_followers;
};
