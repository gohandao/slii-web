import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { userAtom } from "@/contexts/state/auth.state";
import { supabase } from "@/libs/supabase";
import type { Upvote } from "@/types/upvote";

export const useGetUserUpvotes = () => {
  const [user] = useAtom(userAtom);
  const [userUpvotes, setUserUpvotes] = useState<Upvote[]>([]);
  const getUserUpvotes = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from("upvotes").select().eq("user_id", user.id);
    if (error) {
      console.log("error at getUserUpvotes");
      console.log(error);
    }
    if (data) {
      data as Upvote[];
      setUserUpvotes(data);
    }
  }, [user]);

  useEffect(() => {
    getUserUpvotes();
  }, [getUserUpvotes]);

  return { userUpvotes };
};
