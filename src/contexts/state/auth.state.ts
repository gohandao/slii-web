import type { User } from "@supabase/supabase-js";
import { atom } from "jotai";

import type { Bookmark } from "../../types/bookmark";
import type { Upvote } from "../../types/upvote";

export const userAtom = atom<User | null>(null);
export const bookmarkAtom = atom<Bookmark[]>([]);
export const upvoteAtom = atom<Upvote[]>([]);
