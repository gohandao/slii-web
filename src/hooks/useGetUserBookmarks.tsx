import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { useGetUserId } from "@/hooks/useGetUserId";
import { supabase } from "@/libs/supabase";
import { userBookmarksAtom } from "@/state/user.state";
import type { Bookmark } from "@/types/bookmark";

export const useGetUserBookmarks = () => {
  const { userId } = useGetUserId();
  const [, setUserBookmarks] = useAtom(userBookmarksAtom);

  const getUserBookmarks = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("bookmarks").select().eq("user_id", userId);
    if (error) {
      console.log(error);
    }
    if (data) {
      data as Bookmark[];
      setUserBookmarks(data);
    }
  }, [setUserBookmarks, userId]);

  useEffect(() => {
    getUserBookmarks();
  }, [getUserBookmarks]);

  return;
};
