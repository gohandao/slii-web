import React, { createContext, useState } from "react";
import { Utilities } from "@/types/utilities";

export const UtilitiesContext = createContext<Utilities>({
  keyword: "",
  setKeyword: () => {},
  headerIcon: {
    title: "",
    emoji: "",
    avatar: "",
    path: "",
  },
  setHeaderIcon: () => {},
  breadcrumbList: undefined,
  setBreadcrumbList: () => {},
});
