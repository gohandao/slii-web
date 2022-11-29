import { Upvote } from "@/types/upvote";
import { Bookmark } from "@/types/bookmark";
import React, { createContext, useState } from "react";

type Props = {
  profile: any;
  user: any;
  avatar?: File;
  setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  upvotes: Upvote[];
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
};
export const AuthContext = createContext<Props>({
  profile: {},
  user: {},
  setAvatar: () => {},
  bookmarks: [],
  setBookmarks: () => {},
  upvotes: [],
  setUpvotes: () => {},
});
