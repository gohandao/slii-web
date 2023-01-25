import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";

import { authProfileAtom } from "../state/auth.state";

export const useGetUserBookmarks = () => {
  const [authUser] = useAtom(authProfileAtom);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[]>([]);
  const getUserBookmarks = useCallback(async () => {
    if (!authUser) return;
    const { data, error } = await supabase.from("bookmarks").select().eq("user_id", authUser.id);
    if (error) {
      console.log("error at getUserBookmarks");
      console.log(error);
    }
    if (data) {
      data as Bookmark[];
      setUserBookmarks(data);
    }
  }, [authUser]);
  useEffect(() => {
    getUserBookmarks();
  }, [getUserBookmarks]);

  return { userBookmarks };
};
