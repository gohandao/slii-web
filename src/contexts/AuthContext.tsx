import { createContext } from "react";

import type { Upvote } from "@/types/upvote";

type Props = {
  profile: any;
  setUpvotes: React.Dispatch<React.SetStateAction<Upvote[]>>;
  upvotes: Upvote[];
};
export const AuthContext = createContext<Props>({
  profile: {},
  setUpvotes: () => {
    return;
  },
  upvotes: [],
});
