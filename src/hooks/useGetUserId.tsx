import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

type Profile = {
  id: string;
  username: string;
};

export const useGetUserId = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userId, setUserId] = useState<Profile["id"]>("");
  const getUserId = useCallback(async (userName: string) => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: false,
        })
        .eq("username", `${userName}`)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        data as Profile;
        setUserId(data.id);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }, []);

  useEffect(() => {
    if (typeof username === "string") getUserId(username);
  }, [getUserId, username]);

  return { getUserId, userId };
};
