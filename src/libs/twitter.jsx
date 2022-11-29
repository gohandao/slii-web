export const getTwitterFollowers = async (twitter_id) => {
  var options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
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
  return response;
};
