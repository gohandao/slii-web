import { supabase } from "@/libs/supabase";

export const getUserId = async (username: string) => {
  let test = "";
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

    //@ts-ignore
    test = data && (data.id as string);
  } catch (error: any) {
    alert(error.message);
  } finally {
    //setLoading(false)
  }
  console.log("getuserId");
  console.log(test);

  return test;
};
