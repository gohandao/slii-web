import { createContext } from "react";

import type { Utilities } from "@/types/utilities";

export const UtilitiesContext = createContext<Utilities>({
  keyword: "",
  loginModal: false,
  NFTKeyword: "",
  setKeyword: () => {
    return;
  },
  setLoginModal: () => {
    return;
  },
  setNFTKeyword: () => {
    return;
  },
  setUserProfile: () => {
    return;
  },
});
