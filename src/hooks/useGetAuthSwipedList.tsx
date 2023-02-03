import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { authBookmarksAtom, authUpvotesAtom } from "../state/auth.state";

export const useGetAuthSwipedList = () => {
  const [authUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks] = useAtom(authBookmarksAtom);
  const [swipedCombinedList, setSwipedCombinedList] = useState<string[]>();
  const [swipedCreatorsList, setSwipedCreatorsList] = useState<string[]>();
  const [swipedCollectionsList, setSwipedCollectionsList] = useState<string[]>();

  useEffect(() => {
    const upvotedCreatorsList = authUpvotes
      .filter((upvote) => {
        return upvote.creator_username && upvote.creator_username.length > 0;
      })
      .map((upvote) => {
        return upvote.creator_username as string;
      });
    const bookmarkedCreatorsList = authBookmarks
      .filter((bookmark) => {
        return bookmark.creator_username && bookmark.creator_username.length > 0;
      })
      .map((bookmark) => {
        return bookmark.creator_username as string;
      });
    const upvotedCollectionsList = authUpvotes
      .filter((upvote) => {
        return upvote.collection_slug && upvote.collection_slug.length > 0;
      })
      .map((upvote) => {
        return upvote.creator_username;
      });
    const bookmarkedCollectionsList = authBookmarks
      .filter((bookmark) => {
        return bookmark.collection_slug && bookmark.collection_slug.length > 0;
      })
      .map((bookmark) => {
        return bookmark.collection_slug;
      });

    // list
    const new_swipedCombinedList = Array.from(new Set(upvotedCreatorsList.concat(bookmarkedCreatorsList)));
    const new_swipedCreatorsList = Array.from(new Set(upvotedCreatorsList.concat(bookmarkedCreatorsList)));
    const new_swipedCollectionsList = Array.from(new Set(upvotedCollectionsList.concat(bookmarkedCollectionsList)));
    setSwipedCombinedList(new_swipedCombinedList);
    setSwipedCreatorsList(new_swipedCreatorsList);
    // setSwipedCollectionsList(new_swipedCollectionsList);
  }, [authBookmarks, authUpvotes]);

  return { swipedCollectionsList, swipedCombinedList, swipedCreatorsList };
};
