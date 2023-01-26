import { createContext } from "react";

import type { Bookmark } from "@/types/bookmark";
import type { Upvote } from "@/types/upvote";

type Props = {
  bookmarks: Bookmark[];
  profile: any;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  upvotes: Upvote[];
  user: any;
};
export const AuthContext = createContext<Props>({
  bookmarks: [],
  profile: {},
  setBookmarks: () => {
    return;
  },
  setProfile: () => {
    return;
  },
  setUpvotes: () => {
    return;
  },
  setUser: () => {
    return;
  },
  upvotes: [],
  user: {},
});
