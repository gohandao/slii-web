export const getDiscordMembers = async (req: any, res: any) => {
  const discord_id = req.query.discord_id;
  const options = {
    method: "GET",
  };
  const response = await fetch(
    `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`,
    options
  )
    .then((response: any) => {
      const discord_members = response.approximate_member_count as any;
      return discord_members;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  res.json(JSON.stringify(response));
};
export default getDiscordMembers;
