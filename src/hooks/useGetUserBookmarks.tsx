import { useCallback, useEffect, useState } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";

export const useGetUserBookmarks = () => {
  const { userId } = useGetUserId();
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[]>([]);
  const getUserBookmarks = useCallback(async (user_id: string) => {
    const { data, error } = await supabase.from<Bookmark>("bookmarks").select().eq("user_id", `${user_id}`);
    if (error) {
      console.log("error at getUserBookmarks");
      console.log(error);
    }
    if (data) {
      setUserBookmarks(data);
    }
  }, []);
  useEffect(() => {
    if (userId) getUserBookmarks(userId);
  }, [getUserBookmarks, userId]);

  return { userBookmarks };
};
