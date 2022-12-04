import collectionsJson from "@/json/collections.json";

const collections = JSON.parse(JSON.stringify(collectionsJson));

export const getOSUserBackground = async (username: string) => {
  const filteredCollections =
    collections &&
    collections.filter((collection: any) => {
      return collection.creator_id == username;
    });
  const background_image =
    filteredCollections.length > 0 &&
    filteredCollections[0].banner_image_url &&
    filteredCollections[0].banner_image_url;
  return background_image;
};
