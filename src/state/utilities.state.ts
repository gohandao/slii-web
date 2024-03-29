import { atom } from "jotai";

import type { Creator } from "@/types/creator";
import type { Params } from "@/types/params";
import type { TCard } from "@/types/tinder";

export const pageHistoryAtom = atom<any[]>([]);
export const overlayAtom = atom<boolean>(false);
export const loginModalAtom = atom<boolean>(false);
export const screenModalAtom = atom<boolean>(false);
export const screenQueryAtom = atom<string>("");
export const resetCardsAtom = atom<boolean>(false);
export const showSideNavigationAtom = atom<boolean>(false);
export const currentPageAtom = atom<number>(1);

// profile page
export const profileTabAtom = atom<"liked" | "stars">("liked");
export const profileCategoryAtom = atom<"all" | "creators" | "collections">("all");
// list
export const combinedListAtom = atom<TCard[] | undefined>(undefined);
export const creatorsListAtom = atom<Creator[] | undefined>(undefined);
export const collectionsListAtom = atom<Creator[] | undefined>(undefined);
// keyword
export const combinedKeywordAtom = atom<string | undefined>("");
export const creatorsKeywordAtom = atom<string | undefined>("");
export const collectionsKeywordAtom = atom<string | undefined>("");
// filter
/*eslint-disable*/
export const combinedFilterParamsAtom = atom<Params>({ sort: "upvotes_count", order: "desc" });
export const creatorsFilterParamsAtom = atom<Params>({ order: "desc", sort: "upvotes_count" });
export const collectionsFilterParamsAtom = atom<Params>({ order: "desc", sort: "upvotes_count" });
