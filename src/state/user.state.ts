import { atom } from "jotai";

import type { Bookmark } from "../types/bookmark";
import type { Profile } from "../types/profile";
import type { Upvote } from "../types/upvote";

export const userBookmarksAtom = atom<Bookmark[]>([]);
export const userUpvotesAtom = atom<Upvote[]>([]);
export const userProfileAtom = atom<Profile | null>(null);
