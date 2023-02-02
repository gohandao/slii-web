import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";
import { getAuthUserAtom } from "@/state/auth.state";
import type { Upvote } from "@/types/upvote";

export const useGetAuthUpvotes = () => {
  const authUser = useAtomValue(getAuthUserAtom);
  const [authUpvotes, setAuthUpvotes] = useState<Upvote[]>([]);

  const getAuthUpvotes = useCallback(async () => {
    if (!authUser) return;
    const { data, error } = await supabase.from("upvotes").select().eq("user_id", authUser.id);
    if (error) {
      console.log("error at getAuthUserUpvotes");
      console.log(error);
    }
    if (data) {
      data as Upvote[];
      setAuthUpvotes(data);
    }
  }, [authUser]);

  useEffect(() => {
    getAuthUpvotes();
  }, [getAuthUpvotes]);

  return { authUpvotes };
};
