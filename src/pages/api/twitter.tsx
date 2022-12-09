export const getTwitterFollowers = async (req: any, res: any) => {
  const twitter_id = req.query.twitter_id;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${twitter_id}?user.fields=public_metrics`,
    options
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  res.json(JSON.stringify(response.data));
};
export default getTwitterFollowers;
