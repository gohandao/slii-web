export type Utilities = {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  indexTab?: "all" | "op" | "ed";
  setIndexTab: React.Dispatch<
    React.SetStateAction<"all" | "op" | "ed" | undefined>
  >;
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
  sortAction?: boolean;
  setSortAction: React.Dispatch<React.SetStateAction<boolean>>;
  creatorType: "all";
  setCreatorType: React.Dispatch<React.SetStateAction<string>>;
  creatorsSort?: string;
  setCreatorsSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  collectionsSort?: string;
  setCollectionsSort: React.Dispatch<React.SetStateAction<string>>;
  creatorCategory?: string;
  setCreatorCategory: React.Dispatch<React.SetStateAction<string>>;
  collectionCategory?: string;
  setCollectionCategory: React.Dispatch<React.SetStateAction<string>>;
  totalVolumeOrder: "desc" | "asc";
  setTotalVolumeOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  oneDayChangeOrder: "desc" | "asc";
  setOneDayChangeOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  threeDayChangeOrder: "desc" | "asc";
  setThreeDayChangeOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  sevenDayChangeOrder: "desc" | "asc";
  setSevenDayChangeOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  ownersOrder: "desc" | "asc";
  setOwnersOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  itemsOrder: "desc" | "asc";
  setItemsOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  collectionNameOrder: "desc" | "asc";
  setCollectionNameOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
};
