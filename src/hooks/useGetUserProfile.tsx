import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import { supabase } from "@/libs/supabase";
import { userProfileAtom } from "@/state/utilities.state";
import type { Profile } from "@/types/profile";

export const useGetUserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const getUserProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
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
      data as Profile;
      if (data) {
        data as Profile;
        setUserProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }, [setUserProfile, username]);

  useEffect(() => {
    username && !userProfile && getUserProfile();
  }, [getUserProfile, userProfile, username]);

  return { getUserProfile, userProfile };
};
