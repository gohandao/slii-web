import type { User } from "@supabase/supabase-js";
import { atom } from "jotai";

import type { Bookmark } from "../../types/bookmark";

export const userAtom = atom<User | null>(null);
export const bookmarkAtom = atom<Bookmark[]>([]);
