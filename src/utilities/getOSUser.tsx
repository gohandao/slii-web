import React from "react";

export const getOSUser = async (username: string) => {
  //api.opensea.io/user/ProjuiceAudio
  const data = await fetch(`https://api.opensea.io/user/${username}`)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};
