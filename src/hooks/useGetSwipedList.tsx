import { useAtom } from "jotai";

import { guestBookmarksAtom, guestHiddensAtom, guestUpvotesAtom } from "@/state/guest.state";

import { authBookmarksAtom, authHiddensAtom, authUpvotesAtom, authUserAtom } from "../state/auth.state";

export const useGetSwipedList = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks] = useAtom(authBookmarksAtom);
  const [authHiddens] = useAtom(authHiddensAtom);
  const [guestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks] = useAtom(guestBookmarksAtom);
  const [guestHiddens] = useAtom(guestHiddensAtom);

  const currentUpvotes = authUser ? authUpvotes : guestUpvotes;
  const currentBookmarks = authUser ? authBookmarks : guestBookmarks;
  const currentHiddens = authUser ? authHiddens : guestHiddens;

  const upvotedCreatorsList = currentUpvotes
    .filter((upvote) => {
      return upvote.creator_username && upvote.creator_username.length > 0;
    })
    .map((upvote) => {
      return upvote.creator_username as string;
    });
  const bookmarkedCreatorsList = currentBookmarks
    .filter((bookmark) => {
      return bookmark.creator_username && bookmark.creator_username.length > 0;
    })
    .map((bookmark) => {
      return bookmark.creator_username as string;
    });
  const hiddenCreatorsList = currentHiddens
    .filter((hidden) => {
      return hidden.creator_username && hidden.creator_username.length > 0;
    })
    .map((hidden) => {
      return hidden.creator_username as string;
    });
  const upvotedCollectionsList = currentUpvotes
    .filter((upvote) => {
      return upvote.collection_slug && upvote.collection_slug.length > 0;
    })
    .map((upvote) => {
      return upvote.collection_slug as string;
    });
  const bookmarkedCollectionsList = currentBookmarks
    .filter((bookmark) => {
      return bookmark.collection_slug && bookmark.collection_slug.length > 0;
    })
    .map((bookmark) => {
      return bookmark.collection_slug as string;
    });
  const hiddenCollectionsList = currentHiddens
    .filter((hidden) => {
      return hidden.collection_slug && hidden.collection_slug.length > 0;
    })
    .map((hidden) => {
      return hidden.collection_slug as string;
    });

  // list
  const swipedCombinedList = Array.from(
    new Set(
      upvotedCreatorsList
        .concat(bookmarkedCreatorsList)
        .concat(hiddenCreatorsList)
        .concat(upvotedCollectionsList)
        .concat(bookmarkedCollectionsList)
        .concat(hiddenCollectionsList)
    )
  );
  const swipedCreatorsList = Array.from(
    new Set(upvotedCreatorsList.concat(bookmarkedCreatorsList).concat(hiddenCreatorsList))
  );
  const swipedCollectionsList = Array.from(
    new Set(upvotedCollectionsList.concat(bookmarkedCollectionsList).concat(hiddenCollectionsList))
  );

  return { swipedCollectionsList, swipedCombinedList, swipedCreatorsList };
};
