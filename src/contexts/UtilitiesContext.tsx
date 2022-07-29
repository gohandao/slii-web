import React, { createContext, useState } from "react";
import { Utilities } from "@/types/utilities";

export const UtilitiesContext = createContext<Utilities>({
  search: "",
  setSearch: () => {},
  indexTab: undefined,
  setIndexTab: () => {},
  page: 1,
  setPage: () => {},
  creatorsSort: "",
  setCreatorsSort: () => {},
  collectionsSort: "",
  setCollectionsSort: () => {},
});
