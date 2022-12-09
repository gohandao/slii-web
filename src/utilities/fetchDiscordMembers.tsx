export const fetchDiscordMembers = async (discord_id: string) => {
  let members;
  await fetch(`https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      members = response;
      return members;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return members;
};
