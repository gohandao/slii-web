/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAtom } from "jotai";
import { useState } from "react";

import { useGetCombinedList } from "@/hooks/useGetCombinedList";
import { guestBookmarksAtom, guestUpvotesAtom } from "@/state/guest.state";
import { profileTabAtom } from "@/state/utilities.state";
import type { TCard } from "@/types/tinder";

export const useGetGuestItems = () => {
  const [guestItems, setGuestItems] = useState<TCard[]>([]);
  const [profileTab] = useAtom(profileTabAtom);
  const { getCombinedList } = useGetCombinedList();
  const [guestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks] = useAtom(guestBookmarksAtom);

  const upvoted_usernames = guestUpvotes
    .filter((upvote) => {
      return upvote.creator_username;
    })
    .map((upvote) => {
      return upvote.creator_username;
    });
  const upvoted_slugs = guestUpvotes
    .filter((upvote) => {
      return upvote.collection_slug;
    })
    .map((upvote) => {
      return upvote.collection_slug;
    });
  const bookmarked_usernames = guestBookmarks
    .filter((bookmark) => {
      return bookmark.creator_username;
    })
    .map((bookmark) => {
      return bookmark.creator_username;
    });
  const bookmarked_slugs = guestBookmarks
    .filter((bookmark) => {
      return bookmark.collection_slug;
    })
    .map((bookmark) => {
      return bookmark.collection_slug;
    });

  const liked_usernames = upvoted_usernames.length > 0 ? (upvoted_usernames as string[]) : [];
  const liked_slugs = upvoted_slugs.length > 0 ? (upvoted_slugs as string[]) : [];
  const stars_usernames = bookmarked_usernames.length > 0 ? (bookmarked_usernames as string[]) : [];
  const stars_slugs = bookmarked_slugs.length > 0 ? (bookmarked_slugs as string[]) : [];

  const liked_ids = [...liked_usernames, ...liked_slugs];
  const stars_ids = [...stars_usernames, ...stars_slugs];

  const ids = profileTab != "stars" ? liked_ids : stars_ids;
  const usernames = profileTab != "stars" ? liked_usernames : stars_usernames;
  const slugs = profileTab != "stars" ? liked_slugs : stars_slugs;

  const getGuestItems = async () => {
    const fetchCombiledListData = async () => {
      if (!ids || ids.length == 0) {
        return [];
      }
      const props = {
        ids: ids,
      };
      const { data } = await getCombinedList(props);
      if (data != guestItems) {
        const combined_list = data as TCard[];
        setGuestItems(combined_list);
      }
    };
    await fetchCombiledListData();
  };

  return { getGuestItems, guestItems };
};
