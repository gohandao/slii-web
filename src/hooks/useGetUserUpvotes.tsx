import { useCallback, useEffect, useState } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import type { Upvote } from "@/types/upvote";

export const useGetUserUpvotes = () => {
  const { userId } = useGetUserId();
  const [userUpvotes, setUserUpvotes] = useState<Upvote[]>([]);
  const getUserUpvotes = useCallback(async (user_id: string) => {
    const { data, error } = await supabase.from<Upvote>("upvotes").select().eq("user_id", `${user_id}`);
    if (error) {
      console.log("error at getUserUpvotes");
      console.log(error);
    }
    if (data) {
      setUserUpvotes(data);
    }
  }, []);

  useEffect(() => {
    if (userId) getUserUpvotes(userId);
  }, [getUserUpvotes, userId]);

  return { userUpvotes };
};