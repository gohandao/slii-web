export const getOSUser = async (username: string) => {
  const data = await fetch(`https://api.opensea.io/user/${username}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};
