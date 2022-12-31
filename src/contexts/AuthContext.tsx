import { createContext } from "react";

import type { Bookmark } from "@/types/bookmark";
import type { Upvote } from "@/types/upvote";

type Props = {
  bookmarks: Bookmark[];
  profile: any;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
  upvotes: Upvote[];
};
export const AuthContext = createContext<Props>({
  bookmarks: [],
  profile: {},
  setBookmarks: () => {
    return;
  },
  setUpvotes: () => {
    return;
  },
  upvotes: [],
});
