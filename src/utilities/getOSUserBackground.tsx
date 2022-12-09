import { supabase } from "@/libs/supabase";

export const getOSUserBackground = async (username: string) => {
  if (supabase) {
    const { data, error } = await supabase.from("collections").select().eq("creator_username", username).single();
    if (error) {
      console.log("error");
      console.log(error);
    }
    const collection = data;
    const background_image = collection && collection.banner_image_url && collection.banner_image_url;
    return background_image;
  }
};
