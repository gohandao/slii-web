import React from "react";

const getDiscordMembers = async (req, res) => {
  //let { twitter_id, type } = req.query;
  const discord_id = req.query.discord_id;

  var options = {
    method: "GET",
  };
  const response = await fetch(
    `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`,
    options
  )
    .then((response) => {
      discordMembers = response.approximate_member_count;
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  res.json(JSON.stringify(response.approximate_member_count));
};
export default getDiscordMembers;
