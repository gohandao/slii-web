import type { Profile } from "@/types/profile";

export type Utilities = {
  keyword?: string;
  loginModal: boolean;
  NFTKeyword?: string;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNFTKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  userProfile?: Profile;
};
