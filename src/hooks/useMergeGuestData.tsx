import { useAtom } from "jotai";

import { supabase } from "@/libs/supabase";
import { authBookmarksAtom, authHiddensAtom, authUpvotesAtom, authUserAtom } from "@/state/auth.state";
import { guestBookmarksAtom, guestHiddensAtom, guestUpvotesAtom } from "@/state/guest.state";
import type { Upvote } from "@/types/upvote";

export const useMergeGuestData = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authUpvotes, setAuthUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks, setAuthBookmarks] = useAtom(authBookmarksAtom);
  const [authHiddens, setAuthHiddens] = useAtom(authHiddensAtom);
  const [guestUpvotes, setGuestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks, setGuestBookmarks] = useAtom(guestBookmarksAtom);
  const [guestHiddens, setGuestHiddens] = useAtom(guestHiddensAtom);
  const mergeGuestData = async () => {
    if (authUser) {
      const mergeableUpvotedList = removeDuplicates(authUpvotes, guestUpvotes);
      const mergeableBookmarkedList = removeDuplicates(authBookmarks, guestBookmarks);
      const mergeableHiddenList = removeDuplicates(authHiddens, guestHiddens);
      try {
        if (mergeableUpvotedList.length === 0) {
          const fetchData = async () => {
            const { data, error } = await supabase.from("upvotes").insert(mergeableUpvotedList).select();
            if (error) {
              console.log(error);
            }
            return data as Upvote[];
          };
          const data = await fetchData();
          data && setAuthUpvotes([...authUpvotes, ...data]);
          setGuestUpvotes([]);
        }
        if (mergeableBookmarkedList.length === 0) {
          const fetchData = async () => {
            const { data, error } = await supabase.from("bookmarks").insert(mergeableBookmarkedList).select();
            if (error) {
              console.log(error);
            }
            return data as Upvote[];
          };
          const data = await fetchData();
          data && setAuthBookmarks([...authBookmarks, ...data]);
          setGuestBookmarks([]);
        }
        if (mergeableHiddenList.length === 0) {
          const fetchData = async () => {
            const { data, error } = await supabase.from("hiddens").insert(mergeableHiddenList).select();
            if (error) {
              console.log(error);
            }
            return data as Upvote[];
          };
          const data = await fetchData();
          data && setAuthHiddens([...authHiddens, ...data]);
          setGuestHiddens([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return { mergeGuestData };
};

const removeDuplicates = (authList: Upvote[], guestList: Upvote[]) => {
  const uniqueCreatorList = [];
  const uniqueCollectionList = [];
  const uniqueUsernames = new Set();
  const uniqueSlugs = new Set();
  for (let i = 0; i < guestList.length; i++) {
    let duplicate = false;
    for (let j = 0; j < authList.length; j++) {
      if (guestList[i].creator_username === authList[j].creator_username) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      uniqueCreatorList.push(guestList[i]);
      uniqueUsernames.add(guestList[i].creator_username);
    }
    for (let j = 0; j < authList.length; j++) {
      if (guestList[i].collection_slug === authList[j].collection_slug) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      uniqueCollectionList.push(guestList[i]);
      uniqueSlugs.add(guestList[i].collection_slug);
    }
  }
  const uniqueList = [...uniqueCreatorList, uniqueCollectionList];
  return uniqueList;
};
