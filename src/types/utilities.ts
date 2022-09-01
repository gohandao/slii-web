import { BreadcrumbList } from "@/types/breadcrumbList";

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
  creatorType: string;
  setCreatorType: React.Dispatch<React.SetStateAction<string>>;
  creatorsSort?: string;
  setCreatorsSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  collectionsSort?: string;
  setCollectionsSort: React.Dispatch<React.SetStateAction<string>>;
  creatorCategory?: string;
  setCreatorCategory: React.Dispatch<React.SetStateAction<string>>;
  collectionCategory?: string;
  setCollectionCategory: React.Dispatch<React.SetStateAction<string>>;
  breadcrumbList: BreadcrumbList;
  setBreadcrumbList: React.Dispatch<React.SetStateAction<BreadcrumbList>>;
};
