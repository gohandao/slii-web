import React from "react";

export const getOSUserAvatar = async (username: string) => {
  //api.opensea.io/user/ProjuiceAudio
  let avatar = "";
  const data = await fetch(`https://api.opensea.io/user/${username}`)
    .then((response) => response.json())
    .then((response) => {
      //console.log("JSON.parse(response)");
      //console.log(JSON.parse(response));
      // const data = JSON.parse(response);
      let data = response;
      avatar = data && (data.account.profile_img_url as string);
      //setTwitterData(JSON.parse(response));
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return avatar as string;
};
