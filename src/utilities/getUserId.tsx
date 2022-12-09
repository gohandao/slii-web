import { supabase } from "@/libs/supabase";

export const getUserId = async (username: string) => {
  let userId = "";
  if (supabase) {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: false,
        })
        .eq("username", `${username}`)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      userId = data && (data.id as string);
    } catch (error: any) {
      alert(error.message);
    }
  }
  return userId;
};
