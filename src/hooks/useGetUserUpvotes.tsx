import { useCallback, useEffect, useState } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import type { Upvote } from "@/types/upvote";

export const useGetUserUpvotes = () => {
  const { userId } = useGetUserId();
  const [userUpvotes, setUserUpvotes] = useState<Upvote[]>([]);

  const getUserUpvotes = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("upvotes").select().eq("user_id", userId);
    if (error) {
      console.log("error at getUserUpvotes");
      console.log(error);
    }
    if (data) {
      data as Upvote[];
      setUserUpvotes(data);
    }
  }, [userId]);

  useEffect(() => {
    getUserUpvotes();
  }, [getUserUpvotes]);

  return { userUpvotes };
};
