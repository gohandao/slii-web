const getTwitterFollowers = async (req, res) => {
  const twitter_id = req.query.twitter_id;
  var options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
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
