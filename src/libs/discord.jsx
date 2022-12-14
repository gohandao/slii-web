export const getDiscordMembers = async (discord_id) => {
  const options = {
    method: "GET",
  };
  const response = await fetch(
    `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`,
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
