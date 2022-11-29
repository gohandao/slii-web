import React, { createContext, useState } from "react";
import { Utilities } from "@/types/utilities";

export const UtilitiesContext = createContext<Utilities>({
  loginModal: false,
  setLoginModal: () => {},
  keyword: "",
  setKeyword: () => {},
  NFTKeyword: "",
  setNFTKeyword: () => {},
  hiddenParams: {},
  setHiddenParams: () => {},
  headerIcon: {
    title: "",
    emoji: "",
    avatar: "",
    path: "",
  },
  setHeaderIcon: () => {},
  setUserProfile: () => {},
  scrollY: undefined,
  setScrollY: () => {},
  prevHeight: undefined,
  setPrevHeight: () => {},
  tempCreators: [],
  setTempCreators: () => {},
  tempCollections: [],
  setTempCollections: () => {},
});
