export const getDiscordMembers = async (discord_id) => {
  //let { twitter_id, type } = req.query;
  var options = {
    method: "GET",
  };
  const response = await fetch(
    `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`,
    options
  )
    .then((response) => {
      // console.log("success discord");
      // console.log(response);
      return response.json();
    })
    // .then((response) => {
    //   const discordMembers = response.approximate_member_count;
    //   console.log("discord response response");
    //   console.log(response);
    //   console.log(discordMembers);
    //   return discordMembers;
    // })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  console.log("success discord");
  console.log(response);
  return response;
  // return JSON.stringify(response.approximate_member_count);
};
