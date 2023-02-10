import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import { userHiddensAtom } from "@/state/user.state";
import type { Upvote } from "@/types/upvote";

export const useGetUserHiddens = () => {
  const { userId } = useGetUserId();
  const [userHiddens, setUserHiddens] = useAtom(userHiddensAtom);

  const getUserHiddens = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("hiddens").select().eq("user_id", userId);
    if (error) {
      console.log(error);
    }
    if (data) {
      data as Upvote[];
      setUserHiddens(data);
    }
  }, [setUserHiddens, userId]);

  useEffect(() => {
    getUserHiddens();
  }, [getUserHiddens]);

  return { userHiddens };
};
