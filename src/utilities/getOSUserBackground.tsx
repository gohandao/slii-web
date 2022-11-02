import collections from "@/json/collections.json";

export const getOSUserBackground = async (username: string) => {
  //api.opensea.io/user/ProjuiceAudio
  const filteredCollections =
    collections &&
    collections.filter((collection) => collection.creator_id == username);
  const background_image =
    filteredCollections.length > 0 &&
    filteredCollections[0].banner_image_url &&
    filteredCollections[0].banner_image_url;
  return background_image;
};
