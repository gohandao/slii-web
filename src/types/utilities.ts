import { BreadcrumbList } from "@/types/breadcrumbList";

export type Utilities = {
  creatorSocial: boolean;
  keyword?: string;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  headerIcon: {
    title: string;
    emoji: string;
    avatar: any;
    path: string;
  };
  setHeaderIcon: React.Dispatch<
    React.SetStateAction<{
      title: string;
      avatar: any;
      emoji: string;
      path: string;
    }>
  >;
  breadcrumbList: BreadcrumbList;
  setBreadcrumbList: React.Dispatch<React.SetStateAction<BreadcrumbList>>;
};
