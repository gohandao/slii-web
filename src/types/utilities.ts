import { IconType } from "react-icons";
import { Creator } from "./creator";
import { Params } from "./params";
import { Profile } from "./profile";

export type Utilities = {
  // creatorSocial: boolean;
  baseUrl?: string;
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenParams: Params;
  setHiddenParams: React.Dispatch<React.SetStateAction<Params>>;
  keyword?: string;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  NFTKeyword?: string;
  setNFTKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  headerIcon: {
    type?: string;
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
      type?: string;
    }>
  >;
  userProfile?: Profile;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  scrollY?: number;
  setScrollY: React.Dispatch<React.SetStateAction<number | undefined>>;
  prevHeight?: number;
  setPrevHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  tempCreators: Creator[];
  setTempCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
  tempCollections: any[];
  setTempCollections: React.Dispatch<React.SetStateAction<any[]>>;
};
