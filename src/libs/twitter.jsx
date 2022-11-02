export const getTwitterFollowers = async (twitter_id) => {
  //let { twitter_id, type } = req.query;
  // const twitter_id = req.query.twitter_id;
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
      // console.log("success twitter");
      // console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return response;
  // return JSON.stringify(response);
};
