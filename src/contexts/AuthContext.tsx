import { createContext } from "react";

import type { Bookmark } from "@/types/bookmark";
import type { Upvote } from "@/types/upvote";

type Props = {
  avatar?: File;
  bookmarks: Bookmark[];
  profile: any;
  setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
  upvotes: Upvote[];
  user: any;
};
export const AuthContext = createContext<Props>({
  bookmarks: [],
  profile: {},
  setAvatar: () => {
    return;
  },
  setBookmarks: () => {
    return;
  },
  setUpvotes: () => {
    return;
  },
  upvotes: [],
  user: {},
});
