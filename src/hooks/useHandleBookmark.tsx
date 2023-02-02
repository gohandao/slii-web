import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";
import { authBookmarksAtom, getAuthUserAtom } from "@/state/auth.state";

import { loginModalAtom } from "../state/utilities.state";
import type { Bookmark } from "../types/bookmark";

export const useHandleBookmark = (id: string, type: string) => {
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const creator_username = (() => {
    if (type === "creator") return id;
  })();
  const collection_slug = (() => {
    if (type === "collection") return id;
  })();

  const user = useAtomValue(getAuthUserAtom);
  const [bookmarks, setBookmarks] = useAtom(authBookmarksAtom);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchData = async () => {
        const { data, error } = await supabase.from("bookmarks").select("*");
        if (error) {
          console.log("error at useHandleBookmark");
          console.log(error);
        }
        return data as Bookmark[];
      };
      const data = await fetchData();
      if (data) setBookmarks(data);
    };
    fetchBookmarks();
  }, [setBookmarks]);

  const addBookmark = useCallback(async () => {
    if (user) {
      const checkBookmarked = bookmarks.filter((bookmark) => {
        return bookmark.creator_username === id;
      });
      if (checkBookmarked.length == 0) {
        const fetchData = async () => {
          const { data, error } = await supabase
            .from("bookmarks")
            .insert([
              {
                collection_slug: collection_slug,
                created_at: new Date(),
                creator_username: creator_username,
                user_id: user.id,
              },
            ])
            .select();
          if (error) {
            console.log("error at useHandleBookmark");
            console.log(error);
          }
          return data as Bookmark[];
        };
        const data = await fetchData();

        data && setBookmarks([...bookmarks, ...data]);
        setIsBookmarked(true);
      }
    } else {
      setLoginModal(true);
    }
  }, [bookmarks, collection_slug, creator_username, id, setBookmarks, setLoginModal, user]);

  const removeBookmark = useCallback(async () => {
    if (user) {
      if (type == "creator") {
        await supabase.from("bookmarks").delete().match({ creator_username: creator_username, user_id: user.id });
        const removedBookmarks = bookmarks.filter((bookmark) => {
          return bookmark.creator_username !== creator_username;
        });
        setBookmarks(removedBookmarks);
        setIsBookmarked(false);
      }
      if (type == "collection") {
        await supabase.from("bookmark").delete().match({ collection_slug: collection_slug, user_id: user.id });
        const removedBookmarks = bookmarks.filter((bookmark) => {
          return bookmark.collection_slug != id;
        });
        setBookmarks(removedBookmarks);
        setIsBookmarked(false);
      }
    }
  }, [bookmarks, collection_slug, creator_username, id, setBookmarks, type, user]);

  const checkBookmarked = useCallback(() => {
    let filterdBookmarkes = [];
    if (type == "creator") {
      filterdBookmarkes = bookmarks.filter((bookmark) => {
        return bookmark.creator_username === id;
      });
    }
    if (type == "collection") {
      filterdBookmarkes = bookmarks.filter((bookmark) => {
        return bookmark.collection_slug === id;
      });
    }
    if (filterdBookmarkes.length > 0) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmarks, id, type]);

  return { addBookmark, bookmarks, checkBookmarked, isBookmarked, removeBookmark, setLoginModal };
};
