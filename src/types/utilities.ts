import type { Creator } from "@/types/creator";
import type { Params } from "@/types/params";
import type { Profile } from "@/types/profile";

export type Utilities = {
  baseUrl?: string;
  headerIcon: {
    avatar: any;
    element?: any;
    emoji: string;
    path: string;
    subTitle?: any;
    title: string;
    type?: string;
  };
  hiddenParams: Params;
  keyword?: string;
  loginModal: boolean;
  NFTKeyword?: string;
  prevHeight?: number;
  scrollY?: number;
  setHeaderIcon: React.Dispatch<
    React.SetStateAction<{
      avatar: any;
      element?: any;
      emoji: string;
      path: string;
      subTitle?: any;
      title: string;
      type?: string;
    }>
  >;
  setHiddenParams: React.Dispatch<React.SetStateAction<Params>>;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNFTKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPrevHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setScrollY: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTempCollections: React.Dispatch<React.SetStateAction<any[]>>;
  setTempCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  tempCollections: any[];
  tempCreators: Creator[];
  userProfile?: Profile;
};
