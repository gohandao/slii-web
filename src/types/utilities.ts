import { BreadcrumbList } from "@/types/breadcrumbList";
import { IconType } from "react-icons";

export type Utilities = {
  creatorSocial: boolean;
  keyword?: string;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  headerIcon: {
    title: string;
    subTitle?: any;
    emoji: string;
    avatar: any;
    element?: any;
    path: string;
  };
  setHeaderIcon: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subTitle?: any;
      avatar: any;
      emoji: string;
      element?: any;
      path: string;
    }>
  >;
  breadcrumbList: BreadcrumbList;
  setBreadcrumbList: React.Dispatch<React.SetStateAction<BreadcrumbList>>;
};
