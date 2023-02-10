import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import { userUpvotesAtom } from "@/state/user.state";
import type { Upvote } from "@/types/upvote";

export const useGetUserUpvotes = () => {
  const { userId } = useGetUserId();
  const [, setUserUpvotes] = useAtom(userUpvotesAtom);

  const getUserUpvotes = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("upvotes").select().eq("user_id", userId);
    if (error) {
      console.log(error);
    }
    if (data) {
      data as Upvote[];
      setUserUpvotes(data);
    }
  }, [setUserUpvotes, userId]);

  useEffect(() => {
    getUserUpvotes();
  }, [getUserUpvotes]);

  return;
};
