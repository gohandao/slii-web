import { atom } from "jotai";

import type { Bookmark } from "@/types/bookmark";
import type { Profile } from "@/types/profile";
import type { TCard } from "@/types/tinder";
import type { Upvote } from "@/types/upvote";

export const userProfileAtom = atom<Profile | null>(null);
export const userUpvotesAtom = atom<Upvote[]>([]);
export const userBookmarksAtom = atom<Bookmark[]>([]);
export const userHiddensAtom = atom<Upvote[]>([]);
export const userUpvotedItemsAtom = atom<TCard[]>([]);
export const userBookmarkedItemsAtom = atom<TCard[]>([]);
