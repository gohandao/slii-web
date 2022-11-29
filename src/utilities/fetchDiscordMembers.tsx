export const fetchDiscordMembers = async (discord_id: string) => {
  let members;
  await fetch(
    `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("JSON.parse(response)");
      console.log(response);
      //setDiscordData(response);
      members = response;
      return members;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return members;
};
