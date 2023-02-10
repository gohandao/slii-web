import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";
import { authUserAtom } from "@/state/auth.state";
import type { Bookmark } from "@/types/bookmark";

export const useGetAuthBookmarks = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authBookmarks, setAuthBookmarks] = useState<Bookmark[]>([]);

  const getUserBookmarks = useCallback(async () => {
    if (!authUser) return;
    const { data, error } = await supabase.from("bookmarks").select().eq("user_id", authUser.id);
    if (error) {
      console.log(error);
    }
    if (data) {
      data as Bookmark[];
      setAuthBookmarks(data);
    }
  }, [authUser]);
  useEffect(() => {
    getUserBookmarks();
  }, [getUserBookmarks]);

  return { authBookmarks };
};
