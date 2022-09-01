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
  sortAction: false,
  setSortAction: () => {},
  creatorType: "all",
  setCreatorType: () => {},
  collectionsSort: "",
  setCollectionsSort: () => {},
  creatorCategory: "",
  setCreatorCategory: () => {},
  collectionCategory: "",
  setCollectionCategory: () => {},
  breadcrumbList: undefined,
  setBreadcrumbList: () => {},
});
