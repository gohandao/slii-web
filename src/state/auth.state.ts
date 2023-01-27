import type { User } from "@supabase/supabase-js";
import { atom } from "jotai";

import type { Bookmark } from "../types/bookmark";
import type { Profile } from "../types/profile";
import type { Upvote } from "../types/upvote";

export const userAtom = atom<User | null>(null);
export const bookmarkAtom = atom<Bookmark[]>([]);
export const upvoteAtom = atom<Upvote[]>([]);
export const profileAtom = atom<Profile | null>(null);

export const authUserAtom = atom<User | null>(null);
export const authBookmarksAtom = atom<Bookmark[]>([]);
export const authUpvotesAtom = atom<Upvote[]>([]);
export const authProfileAtom = atom<Profile | null>(null);
