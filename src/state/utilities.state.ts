import { atom } from "jotai";

import type { Profile } from "@/types/profile";

export const pageHistoryAtom = atom<any[]>([]);
export const keywordAtom = atom<string | undefined>("");
export const loginModalAtom = atom<boolean>(false);
// 使われていないかも？
export const NFTKeywordAtom = atom<string>("");
export const userProfileAtom = atom<Profile | undefined>(undefined);
