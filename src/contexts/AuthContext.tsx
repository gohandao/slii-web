import { Like } from "@/types/like";
import { Upvote } from "@/types/upvote";
import React, { createContext, useState } from "react";
//import { Auth } from "@/types/auth";

type Props = {
  profile: any;
  user: any;
  avatar?: File;
  setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>;
  likes: Like[];
  setLikes: React.Dispatch<React.SetStateAction<Like[]>>;
  upvotes: Upvote[];
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
};
export const AuthContext = createContext<Props>({
  profile: {},
  user: {},
  setAvatar: () => {},
  likes: [],
  setLikes: () => {},
  upvotes: [],
  setUpvotes: () => {},
});
