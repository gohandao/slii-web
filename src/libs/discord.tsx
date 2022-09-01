import React from "react";
import axios from "axios";

export const getDiscordMembers = async (discord_id: string) => {
  let discordData;
  let discordMembers;
  if (discord_id) {
    await fetch(
      `https://discord.com/api/v9/invites/animjp?with_counts=true&with_expiration=true`
    )
      .then((response) => response.json())
      .then((response) => {
        discordMembers = response.approximate_member_count;
        //newList.current[index].discord_members = discordMembers;
        console.log("grtdiscord_id");
        console.log(response);
        console.log(discordMembers);
        return discordMembers;
      })
      .catch((error) => {
        console.log(`error ${discord_id}`);
        //console.log(error);
      });
    //console.log("getDiscordMembersCount");
    //console.log(discordMembers);
  }
  return discordMembers;
};

export const aaagetDiscordMembers = async (discord_id: string) => {
  console.log("apidiscordId");
  console.log(discord_id);
  if (discord_id) {
    try {
      const apiResult = await axios({
        data: {},
        method: "get",
        url: `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`,
      });
      //@ts-ignore
      const discordMembers = apiResult.approximate_member_count;

      console.log("apiResult");
      console.log(apiResult);
      return discordMembers;
    } catch (err) {
      console.log(err);
    }
  }
};
