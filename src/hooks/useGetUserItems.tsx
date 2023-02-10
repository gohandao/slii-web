import { useAtom } from "jotai";
import { useState } from "react";

import { useGetCombinedList } from "@/hooks/useGetCombinedList";
import { userBookmarksAtom, userUpvotesAtom } from "@/state/user.state";
import { profileTabAtom } from "@/state/utilities.state";
import type { TCard } from "@/types/tinder";

export const useGetUserItems = () => {
  const [userItems, setUserItems] = useState<TCard[]>([]);
  const { getCombinedList } = useGetCombinedList();

  const [profileTab] = useAtom(profileTabAtom);
  const [userUpvotes] = useAtom(userUpvotesAtom);
  const [userBookmarks] = useAtom(userBookmarksAtom);

  const upvoted_usernames = userUpvotes
    .filter((upvote) => {
      return upvote.creator_username;
    })
    .map((upvote) => {
      return upvote.creator_username;
    });
  const upvoted_slugs = userUpvotes
    .filter((upvote) => {
      return upvote.collection_slug;
    })
    .map((upvote) => {
      return upvote.collection_slug;
    });
  const bookmarked_usernames = userBookmarks
    .filter((bookmark) => {
      return bookmark.creator_username;
    })
    .map((bookmark) => {
      return bookmark.creator_username;
    });
  const bookmarked_slugs = userBookmarks
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

  const getUserItems = async () => {
    const fetchCombiledListData = async () => {
      const props = {
        ids: ids,
      };
      const { data } = await getCombinedList(props);
      if (data != userItems) {
        const combined_list = data as TCard[];
        setUserItems(combined_list);
      }
    };
    await fetchCombiledListData();
  };

  return { getUserItems, userItems };
};
