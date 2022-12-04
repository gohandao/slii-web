import { createContext } from "react";

import type { Utilities } from "@/types/utilities";

export const UtilitiesContext = createContext<Utilities>({
  headerIcon: {
    avatar: "",
    emoji: "",
    path: "",
    title: "",
  },
  hiddenParams: {},
  keyword: "",
  loginModal: false,
  NFTKeyword: "",
  prevHeight: undefined,
  scrollY: undefined,
  setHeaderIcon: () => {
    return;
  },
  setHiddenParams: () => {
    return;
  },
  setKeyword: () => {
    return;
  },
  setLoginModal: () => {
    return;
  },
  setNFTKeyword: () => {
    return;
  },
  setPrevHeight: () => {
    return;
  },
  setScrollY: () => {
    return;
  },
  setTempCollections: () => {
    return;
  },
  setTempCreators: () => {
    return;
  },
  setUserProfile: () => {
    return;
  },
  tempCollections: [],
  tempCreators: [],
});
