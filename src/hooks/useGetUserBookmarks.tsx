import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";

import { userAtom } from "../contexts/state/auth.state";

export const useGetUserBookmarks = () => {
  const [user] = useAtom(userAtom);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[]>([]);
  const getUserBookmarks = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from("bookmarks").select().eq("user_id", user.id);
    if (error) {
      console.log("error at getUserBookmarks");
      console.log(error);
    }
    if (data) {
      data as Bookmark[];
      setUserBookmarks(data);
    }
  }, [user]);
  useEffect(() => {
    getUserBookmarks();
  }, [getUserBookmarks]);

  return { userBookmarks };
};
