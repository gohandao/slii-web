import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";
import type { Profile } from "@/types/profile";

export const useGetUserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { setUserProfile, userProfile } = useContext(UtilitiesContext);

  const getUserProfile = useCallback(async () => {
    console.log(username);
    try {
      const { data, error, status } = await supabase
        .from<Profile>("profiles")
        .select("*", {
          count: "exact",
          head: false,
        })
        .eq("username", `${username}`)
        .single()
        .then((response) => {
          return response;
        });
      if (error && status !== 406) {
        throw error;
      }
      if (data) setUserProfile(data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }, [setUserProfile, username]);

  useEffect(() => {
    username && !userProfile && getUserProfile();
  }, [getUserProfile, userProfile, username]);

  return { getUserProfile, userProfile };
};
